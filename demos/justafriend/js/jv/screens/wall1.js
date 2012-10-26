define(['underscore', 'bumpslide/view', 'jv/media', 'jv/facebook', 'bumpslide/canvasUtil', 'jv/dispatcher'], function (_, view, media, facebook, canvasUtil, dispatcher) {

    return function ( ) {

        var wall_img;

        // x, y, width, height, rotation
        var coords1 = [250,163,276,269, -3.5];
        var coords2 = [582, 96, 256, 259, 1.75];

        var stage = canvasUtil.create( 960, 540 );

        var img1, img2;
        var cropped1, cropped2;

        var rendered = false;

        var self = view.extend({
            template:'<div class="scene HD" id="wall1"></div>',
            name:'imageScene',
            onInit:onInit,
            onShow:onShow,
            onHide:onHide,
            pageName: "Photo Wall"
        });

        return self;

        function onInit() {
            wall_img = media.getImage('img/wall01.png');
            facebook.bind('images', onFacebookImagesDefined, true);
            dispatcher.bind('mediaLoadComplete', onMediaReady);
            self.el.append(stage);
        }

        function onFacebookImagesDefined(images) {
            img1 = images[0];
            img2 = images[2];
            if(img1==null) img1 = media.getImage('img/defaultPhotos/wall01a.jpg');
            if(img2==null) img2 = media.getImage('img/defaultPhotos/wall01b.jpg');
        }

        function onMediaReady() {
            if(!rendered && img1 && img2 && img1.width && img2.width) {
                render();
            }
        }

        function render() {

            rendered = true;

            // crop images
            cropped1 = canvasUtil.cropImage( img1, coords1[2], coords1[3]);
            cropped2 = canvasUtil.cropImage( img2, coords2[2], coords2[3]);

            // render to stage
            var ctx = stage.getContext('2d');

            ctx.save();
            ctx.translate(coords1[0], coords1[1]);
            ctx.rotate(coords1[4] * Math.PI/180);
            ctx.drawImage(cropped1, 0, 0, coords1[2], coords1[3]);
            ctx.restore();

            ctx.save();
            ctx.translate(coords2[0], coords2[1]);
            ctx.rotate(coords2[4] * Math.PI/180);
            ctx.drawImage(cropped2, 0, 0, coords2[2], coords2[3]);
            ctx.restore();

            // draw overlay
            ctx.drawImage(wall_img, 0, 0, stage.width, stage.height);

        }

        function onShow() {
            //self.el.append(stage);
        }

        function onHide() {
            //self.el.children().remove();
        }

    };
});



