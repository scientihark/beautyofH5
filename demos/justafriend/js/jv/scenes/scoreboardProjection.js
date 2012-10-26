define(['underscore', 'bumpslide/view', './assets/scoreboardData', 'jv/projection', 'jv/media', 'jv/facebook', 'bumpslide/canvasUtil', 'toxi/geom/Vec2D', 'jv/dispatcher'], function (_, view, scoreboardData, projection,  media, facebook, canvasUtil, Vec, dispatcher) {

    function scoreboardProjection(frame_offset) {

        if (frame_offset == null) frame_offset = 0;
        var frame_data, canvas, proj;
        var scale_factor = 960 / 1920;
        var zoom_factor = 1.03;
        var player_up = false,
            media_ready = false,
            player_name = 'Somebody',
            score_img_1,
            score_img_2,
            overlay,
            board_canvas,
            score_canvas_1,
            score_canvas_2;

        var self = view.extend({
            template:'<div class="scene HD" id="scoreboard_projection"></div>',
            name:'scoreboardProjection',
            pageName: 'Bowling Scoreboard',
            onInit:onInit,
            onShow:onShow,
            onHide:onHide,
            draw:draw
        });

        return self;

        function onInit() {

            score_img_1 = media.getImage('img/bowlingscore1.png');
            score_img_2 = media.getImage('img/bowlingscore2.png');
            overlay = media.getImage('img/bowlingscore_overlay.png');

            var scale_down_to_blur = .75;
            board_canvas = canvasUtil.create(Math.floor(800 * scale_down_to_blur), Math.floor(450 * scale_down_to_blur));
            score_canvas_1 = canvasUtil.create(800, 450);
            score_canvas_2 = canvasUtil.create(800, 450);

            canvas = canvasUtil.create(10, 10);

            proj = projection(board_canvas, canvas, null, {
                wireframe:false,
                subdivisionLimit:3,
                patchSize:32
            });

            facebook.bind('username', setUsername, true);

            dispatcher.bind('mediaLoadComplete', onMediaReady);


            loadTrackingPoints();
        }


        function setUsername(username) {

            username = (username === undefined || username === '') ? 'Name' : username;

            player_name = String(username.split(' ')[0]).substring(0, 8);

            updateCanvii();
        }

        function onMediaReady() {
            media_ready = true;
            updateCanvii();
        }

        function updateCanvii() {

            if(!media_ready) return;
            var ctx1 = score_canvas_1.getContext('2d');
            var ctx2 = score_canvas_2.getContext('2d');

            ctx1.globalAlpha = 1;
            ctx2.globalAlpha = 1;

            ctx1.drawImage(score_img_1, 0, 0);
            ctx2.drawImage(score_img_2, 0, 0);

            renderNames(ctx1, '#55f3e8');
            renderNames(ctx2, '#000000');

            ctx1.globalAlpha = .4;
            ctx2.globalAlpha = .4;
            ctx1.drawImage(overlay, 0, 0);
            ctx2.drawImage(overlay, 0, 0);
        }

        function renderNames(ctx, text_color) {
            var names = [player_name, 'craig', 'jasmine', 'carrine'];
            ctx.font = "bold 35px Arial";
            ctx.textBaseline = "top";
            for (var n = 0; n < 4; n++) {
                ctx.fillStyle = n == 0 ? text_color : '#55f3e8';
                ctx.fillText(names[n].toUpperCase(), 52, 115 + 88 * n);
            }
        }

        function onShow() {

            updateCanvii();
            board_canvas.getContext('2d').drawImage(score_canvas_1, 0, 0, 800, 450, 0, 0, board_canvas.width, board_canvas.height);
            setTimeout(showScreen2, 700);
            self.el.append(canvas);
        }

        function onHide() {
            $(canvas).remove();
            proj.clear();
        }

        function showScreen2() {
            board_canvas.getContext('2d').drawImage(score_canvas_2, 0, 0, 800, 450, 0, 0, board_canvas.width, board_canvas.height);
        }

        function draw(frame_num) {

            var coords;

            if (null == frame_data || undefined == (coords = frame_data[frame_num - frame_offset])) {
                proj.clear();
            } else {
                //console.log('rendering scoreboard frame', frame_num - frame_offset, coords);
                proj.setPoints([
                    [ coords[0], coords[1]],
                    [ coords[2], coords[3]],
                    [ coords[4], coords[5]],
                    [ coords[6], coords[7]]
                ]);
            }
        }

        // Load tracking points from CSV file
        function loadTrackingPoints() {
            //$.get(media.getBasePath() + 'data/scoreboard2.csv', onTrackingPointsLoaded);
            onTrackingPointsLoaded( scoreboardData );
        }

        function onTrackingPointsLoaded(data) {
            frame_data = [];
            _.each(data, function (cols) {
                var n = parseInt(cols.shift());
                frame_data[n] = _.map(cols, function (col) {
                    return Number(col) * scale_factor;
                });
                frame_data[n] = zoomCoords(translateCoords(frame_data[n]), zoom_factor);
            });
            // add extra frame of data
            frame_data.push(frame_data[frame_data.length-1]);
            //console.log('loaded frame data', frame_data);
        }

        function translateCoords(coords) {
            var off_x = coords[8] - (1920 * scale_factor) / 2;
            var off_y = coords[9] - (1080 * scale_factor) / 2;
            return [coords[0] + off_x, coords[1] + off_y, coords[2] + off_x, coords[3] + off_y, coords[4] + off_x, coords[5] + off_y, coords[6] + off_x, coords[7] + off_y ];
        }

        function zoomCoords(coords, zoom) {
            // create vector for each corner
            var tl = new Vec(coords[0], coords[1]);
            var tr = new Vec(coords[2], coords[3]);
            var bl = new Vec(coords[4], coords[5]);
            var br = new Vec(coords[6], coords[7]);

            // determine center-point
            var cp = br.sub(tl).scale(.5).add(tl);

            // make each corner slightly farther from the center-point
            tl = tl.sub(cp).scale(zoom).add(cp);
            tr = tr.sub(cp).scale(zoom).add(cp);
            bl = bl.sub(cp).scale(zoom).add(cp);
            br = br.sub(cp).scale(zoom).add(cp);

            // return updated coordinates
            return [ tl.x, tl.y, tr.x, tr.y, bl.x, bl.y, br.x, br.y, coords[8], coords[9] ];
        }


    }

    return scoreboardProjection;
});



