define(['underscore', 'bumpslide/view', 'jv/media', 'jv/frameCodeReader', 'bumpslide/canvasUtil', './circleSprite', 'bumpslide/animation', './imageSprite', 'bumpslide/mouseWatcher', 'jv/tracker'], function (_, view, media, frameCodeReader, canvasUtil, circleSprite, animation, imageSprite, mouseWatcher, tracker) {

    return function () {

        var sprite, reactVideo, cta_img, cta_text_img, cta_canvas, cta_ctx, bigFinger;
        var _completed = false;
        var offset = 2;
        var currentFrame = 0;
        var lastFrame = 275 + offset;
        var totalFrames = 378; // of main video (not including react)
        var _reactMode = false;
        var _success = false;
        var _targetPos = {x:480, y:0};
        var _currentPos = {x:480, y:0};
        var fingerFrame = 280;
        var cursorHolder;
        var _cursorToggled = false;

        var CURSOR_FINGER_COORDS = [
            {left:-2, top:-2, w:17, h:22, x:-9, y:-11},
            {left:-21, top:-2, w:20, h:25, x:-10, y:-12},
            {left:-43, top:-2, w:21, h:27, x:-10, y:-13},
            {left:-66, top:-2, w:35, h:38, x:-17, y:-18},
            {left:-103, top:-2, w:97, h:111, x:-48, y:-54},
            {left:-202, top:-2, w:192, h:149, x:-96, y:-74},
            {left:-396, top:-2, w:214, h:166, x:-107, y:-83},
            {left:-612, top:-2, w:220, h:170, x:-110, y:-85},
            {left:-2, top:-174, w:220, h:170, x:-110, y:-85},
            {left:-224, top:-174, w:220, h:170, x:-110, y:-85},
            {left:-446, top:-174, w:221, h:170, x:-124, y:-85},
            {left:-669, top:-174, w:221, h:170, x:-137, y:-85},
            {left:-2, top:-346, w:221, h:170, x:-147, y:-85},
            {left:-225, top:-346, w:221, h:170, x:-152, y:-85},
            {left:-448, top:-346, w:221, h:170, x:-148, y:-85},
            {left:-671, top:-346, w:221, h:170, x:-137, y:-85},
            {left:-2, top:-518, w:221, h:170, x:-117, y:-85},
            {left:-225, top:-518, w:221, h:170, x:-118, y:-85},
            {left:-448, top:-518, w:221, h:170, x:-121, y:-85},
            {left:-671, top:-518, w:221, h:170, x:-116, y:-85},
            {left:-2, top:-690, w:221, h:170, x:-113, y:-85},
            {left:-225, top:-690, w:221, h:170, x:-112, y:-85},
            {left:-448, top:-690, w:220, h:170, x:-110, y:-85}
        ];

        //var spriteMovement = animation( positionSprite );

        var mouseWatch = mouseWatcher();
        var cursorRenderer = animation(drawCursor);

        var T = 0, X = 1, Y = 2;
        var path = [
            [72 + offset, 580, 110],
            [96 + offset, 584, 95],
            [120 + offset, 625, 85],
            [144 + offset, 650, 100],
            [168 + offset, 610, 90],
            [192 + offset, 575, 110],
            [216 + offset, 540, 135],
            [240 + offset, 530, 100],
            [250 + offset, 550, 110],
            [264 + offset, 580, 120]
        ];


        var self = view.extend({
            template:'<div class="scene HD" id="circle_game"></div>',
            name:'circleGame',
            onInit:onInit,
            onShow:onShow,
            onHide:onHide,
            draw:draw,
            pageName: "Circle Game"
        });

        return self;

        function reset() {
            _completed = false;
            _success = false;
            _reactMode = false;
            _cursorToggled = false;
            try {
                reactVideo.currentTime = .01;
            } catch (e) {
            }
            reactVideo.pause();

            bigFinger.hide();
            setCursor('default');

            //_success=true;
            //fingerFrame = 100;


        }

        function onInit() {
            reactVideo = media.getVideo('video/18_Cafe_React_B_10bit');

            sprite = circleSprite();
            sprite.init();

            bigFinger = imageSprite('cursorFinger.png', 0, 0, 0, 0, null, CURSOR_FINGER_COORDS);
            bigFinger.init();

            // create canvas for call to action sprite animation
            cta_img = media.getImage('img/circle_cta_sprite2.png');
            cta_text_img = media.getImage('img/circle_cta_bg.png');

            cta_canvas = canvasUtil.create(392, 64);
            cta_ctx = cta_canvas.getContext('2d');

            cursorHolder = $('<div>').addClass('overlay');

        }

        function onShow() {

            reset();

            self.el.append(cta_canvas);
            self.el.append(sprite.el);
            //console.log('show sprite');
            sprite.show();
            sprite.hide();
            sprite.el.css({top:-200});
            _targetPos = {x:480, y:0};
            _currentPos = {x:480, y:0};

            self.el.append(cursorHolder);
            cursorHolder.append(bigFinger.el);

            //console.log(cursorHolder);
            //console.log(bigFinger.el);

            sprite.bind('score', onScore);

            //console.log(self.el);

            mouseWatch.start();
            cursorRenderer.run();
        }

        function onHide() {
            //console.log('onHide');
            self.el.children().remove();
            sprite.hide();
            sprite.unbind('score', onScore);

            mouseWatch.stop();
            cursorRenderer.pause();
            reset();
        }

        function setCursor(cursorType) {
            //console.log('setting cursor to: ', cursorType);
            $('body').css('cursor', cursorType);
        }

        function onScore(event, score) {

            //console.log('SCORE:' + score);
            _success = score > .5;
            _completed = true;
            self.el.removeClass('active');

        }

        var _ctaVisible = false;


        function draw(f) {

            currentFrame = f;

            positionSprite(f);

            var ctaAnimStart = 45;

            if (f > ctaAnimStart) {
                if(!_ctaVisible) {
                    // show CTA
                    $(cta_canvas).stop(true, true).css({top:435+100, left:(960 - cta_canvas.width) / 2 }).show().animate({top:435}, 900, 'easeOutElasticSmooth');
                }
                _ctaVisible = true;
                renderCta(f - ctaAnimStart);

                if(!_cursorToggled) {
                    //console.log('toggling cursor');
                    setCursor('none');
                    _cursorToggled = true;
                }
                
                bigFinger.el.show();
            } else {
                $(cta_canvas).hide();
                _ctaVisible = false;
                setCursor('pointer');
                bigFinger.el.hide();
            }


            if (f > totalFrames && !_reactMode) {
                _reactMode = true;

                if (!_success) {
                    tracker.trackView( 'Circle Game Fail', mouseWatch.passive );
                    //console.log('showing FAIL Reaction');
                } else {
                    tracker.trackView( 'Circle Game Success', mouseWatch.passive );
                    self.el.append(reactVideo);
                    try {
                        reactVideo.currentTime = .01;
                    } catch (e) {
                    }
                    reactVideo.play();
                    //console.log('showing SUCCESS Reaction');

                }
            }

        }

        function drawCursor() {
            var pos = mouseWatch.getLocal(self.el);

            // keep on top
            self.el.append( cursorHolder );
            cursorHolder.css({left: pos.x, top: pos.y, position: 'relative', height:'200px'});

            try {
                if (_success && currentFrame > fingerFrame) {
                    bigFinger.gotoFrame( Math.floor( (currentFrame - fingerFrame - 1 ) / 2 ) );
                } else {
                    bigFinger.gotoFrame(0);
                }
            } catch (e) {
            }


        }

        function positionSprite(f) {
            var keyframe_index = null;
            var n = path.length;

            // find most recently passed keyframe
            for (var i = 0; i < n; i++) {
                // find last keyframe
                if (path[i][T] <= f) {
                    keyframe_index = i;
                }
            }

            if (keyframe_index != null && f < lastFrame) {

                // draw target circle at location along spline
                var p0 = path[Math.max(0, (keyframe_index - 1))];
                var p1 = path[keyframe_index];
                var p2 = path[Math.min((keyframe_index + 1), n - 1)];
                var p3 = path[Math.min((keyframe_index + 2), n - 1)];

                var pct = (f - p1[T]) / (p2[T] - p1[T]);
                var qx = spline(p0[X], p1[X], p2[X], p3[X], pct);
                var qy = spline(p0[Y], p1[Y], p2[Y], p3[Y], pct);

                _targetPos = {x:qx - 36, y:qy - 36};
                _currentPos.x += (_targetPos.x - _currentPos.x) * .1; // tween
                _currentPos.y += (_targetPos.y - _currentPos.y) * .1;

                sprite.el.css({left:_currentPos.x, top:_currentPos.y});
                sprite.show();

            } else {
                sprite.hide();
            }


        }

        function renderCta(f) {

            f -= 10;

            var spriteFrames = 24;
            var endFrame = 120;
            var easeFrames = 10;
            var easeInFrames = easeFrames * .5;
            var sprite_frame_idx = Math.min(Math.floor(f / 2), 23);

            cta_ctx.clearRect(0, 0, cta_canvas.width, cta_canvas.height);

            cta_ctx.save();

            // fade in/out
            cta_ctx.globalAlpha = 1.0;
            if (f < easeInFrames) {
                // transition In now handled with jQuery animation above
            } else if (f > (endFrame - easeFrames) && f < endFrame) {
                //cta_ctx.translate(0,100 * ease((endFrame - f) / easeFrames, 1 / 4));
                cta_ctx.globalAlpha = ease((endFrame - f) / easeFrames, 1 / 4);
            }

            if (f < 0) return;

            if (f < endFrame) {

                cta_ctx.drawImage(cta_text_img, 0, 10);

                var sx = 128 * (sprite_frame_idx % 4);
                var sy = 64 * Math.floor(sprite_frame_idx / 4);

                cta_ctx.drawImage(cta_img, sx, sy, 128, 64, 64 + 13 + 19, 4, 128, 64);
            }

            cta_ctx.restore();
        }

        function ease(val, exp) {
            if (exp == null) exp = 4;
            if (val >= 1.0) return 1.0; // save processing for when we really need it
            if (val < 0) return 0;
            var eased = Math.max(0, Math.min(1.0, Math.abs(Math.pow(val, exp))));
            //console.log('eased: ' + eased);
            return eased;
        }

        // catmull-rom spline
        // http://www.mvps.org/directx/articles/catmull/
        function spline(p0, p1, p2, p3, t) {
            return 0.5 * ((2 * p1) + t * ((-p0 + p2) + t * ((2 * p0 - 5 * p1 + 4 * p2 - p3) + t * (-p0 + 3 * p1 - 3 * p2 + p3))));
        }
    };
});
