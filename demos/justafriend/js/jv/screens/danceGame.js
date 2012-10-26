define(['underscore', 'bumpslide/view', 'bumpslide/canvasUtil', 'bumpslide/timeline', 'jv/media', './danceShape', './progressBar', './progressClock', 'bumpslide/animation', 'jv/tracker'],
    function (_, view, canvasUtil, timeline, media, danceShape, progressBar, progressClock, animation, tracker) {

        /**
         * The Dance Game
         *
         * - color should pop on and slowly get more transparent
         * - white, white, white, color
         * - potentially shufflable sequences, scripted
         * - differenct directions
         *
         * 4 tracks, 32 measures, indexed by 1/4 note
         *
         * First note lands at frame 4148.
         * Last measure ends at frame 4608.
         *
         */

        return function (video) {

            // This is the sequence. We can make this as configurable as we want.
            // For now, it is scripted.

            var tracks = [
                /*
                 |Intro          |Boom
                 ---------------------------------------------------------------------------------
                 5 + 6 + 7 + 8 + 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + |
                 --------------------------------------------------------------------------------*/
                "                      1        1  1         4         1               1         ",
                "5 1      3   3  5 1       1   1     2   2    31 5   2    1  4     1      3   3  ",
                "      1    3        2   2       5     1    3      1     2     1 5   5      3   3",
                "                            4            3                1                     "];

            // This is the global speed control
            // Beats will always be in sync. Increase velocity, and they will be
            // spaced farther apart, but land at the same intervals
            var veloc_x = 5;

            var mouse = { x:0, y:0 };
            var canvas, ctx, paddle, buffer, buffer_ctx;
            var sprites = [], sequence = [], images = [];

            var backgroundRGBA = [0, 0, 0, .2];
            var tailRGBA = [0, 0, 0, 0];
            var tailPosition = 0;
            var score = .5;

            var BPM = 100;
            var FPS = 23.976216;
            var FRAMES_PER_BEAT = FPS * 60 / BPM;
            var FRAMES_PER_BAR = Math.floor(FRAMES_PER_BEAT * 16);

            var offset = 0;
            var _complete = false;

            // scene starts at beginning of bar
            // game starts after half a bar, and we do introduction as we lead up to beginning of second bar loop
            var gameStart = FRAMES_PER_BAR / 2 + offset;

            // game lasts for 2.5 full bars, so exit frame is at 3 bars relative to scene start
            var exitFrame = Math.round(FRAMES_PER_BAR * 3) + offset;

            var bar = progressBar();
            var clock = progressClock();
            var paddleAnim = animation(drawPaddle);

            var state = "normal";

            var _passive = true;

            var self = view.extend({
                template:'<div class="scene HD" id="dancegame"></div>',
                name:'dancegame',
                pageName: "Dance Game",
                onInit:onInit,
                draw:draw,
                onShow:onShow,
                onHide:onHide,
                //transitionIn: function () {
                //    $(self.el).stop(true,true).hide().delay(1600).fadeIn(500, 'easeOutQuad');
                //},
                getMouse:function () {
                    return mouse;
                },
                getPaddleHeight:function () {
                    return paddle.height;
                },
                setColor:function (rgba) {
                    //console.log(backgroundRGBA);
                    backgroundRGBA = rgba;
                },
                getColor:function () {
                    return backgroundRGBA;
                },
                getTailPositionY:getTailPositionY,

                hit:function () {
                    score += .1 + (1 - score) * .3;
                    if (score > .9) {
                        state = "on fire";
                    } else {
                        state = "normal";
                    }
                },
                miss:function () {
                    score *= .3;
                    if (score < .05) {
                        state = "darkness";
                    } else {
                        state = "normal";
                    }
                },
                colorEffect: function(color) {
                    $("#cover-"+color).stop(true,true).fadeIn(200, "easeOutQuad").fadeOut(200, "easeInQuad");
                }
            });


            function onInit() {

                canvas = canvasUtil.create(960, 540);
                ctx = canvas.getContext('2d');

                buffer = canvasUtil.create();
                buffer_ctx = buffer.getContext('2d');

                $(canvas).addClass('overlay');
                $(canvas).addClass('crisp');

                // preload paddle image
                //paddle = media.getImage('img/paddle.png');
                paddle = canvasUtil.create(18, 100);
                var paddle_ctx = paddle.getContext('2d');
                paddle_ctx.fillStyle = '#fff';
                canvasUtil.drawRoundRect(paddle_ctx, 0, 0, paddle.width, paddle.height, 9, true, false);
                $(paddle).addClass('overlay');

                // load sprite images
                images.push(media.getImage('img/shape1.png'));
                images.push(media.getImage('img/shape4.png'));
                images.push(media.getImage('img/shape3.png'));
                images.push(media.getImage('img/ieSprite.png'));
                images.push(media.getImage('img/shape5.png'));

                // preview assets
                var assets = $('#asset_preview');
                if (assets.length) {
                    assets.append(paddle);
                    _.each(images, function (img) {
                        assets.append(img);
                    });
                }

                bar.init();
                clock.init();
            }

            function onShow() {
                clearTimeout(resetDelay);
                if (resetDelay == 0) reset();

                //$(video).hide();
                self.el.append(canvas);
                self.el.append(bar.el.css({top:467, left:369}));
                self.el.append(clock.el.css({top:455, left:876}));
                self.el.append(paddle);
                $(document).bind('mousemove', onMouseMove);
                $(document).bind('MSPointerMove', onMouseMove);                
                
                paddleAnim.run();
            }

            function reset() {
                clearTimeout(resetDelay);
                tailPosition = 0;
                backgroundRGBA = [200, 200, 200, .2];
                score = 0;
                initSprites();
            }

            var resetDelay = 0;

            function onHide() {
                paddleAnim.pause();
                $(video).show();
                self.el.children().remove();
                $(document).unbind('mousemove', onMouseMove);                
                $(document).unbind('onMSPointerMove',onMouseMove);
                clearTimeout(resetDelay);
                // User has completed the dance game
                tracker.trackView( self.pageName + '_complete', _passive );
                resetDelay = setTimeout(reset, 20);
            }
            
            function onMouseMove(e) {
                var offset = $(canvas).offset();               
                if(e.type === "MSPointerMove"){
                    e.originalEvent.preventMouseEvent();
                    mouse.x = e.originalEvent.pageX - offset.left;
                    mouse.y = e.originalEvent.pageY - offset.top;
                }else{
                    mouse.x = e.pageX - offset.left;
                    mouse.y = e.pageY - offset.top;
                }
                _passive = false;
            }

            function initSprites() {
                sprites = [];
                var track_num = 0;
                _.each(tracks, function (track) {
                    for (var beat = 0; beat < track.length; beat++) {
                        var sprite_num = parseInt(track[beat]);
                        if (sprite_num) {
                            sprites.push(danceShape(self, images[sprite_num - 1], 100 + track_num * 110, beat * FRAMES_PER_BEAT / 2 + gameStart, veloc_x));
                        }
                    }
                    track_num++;
                });
            }

            function draw(currentFrame) {

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Fade in/out globally
                ctx.globalAlpha = ease((currentFrame - 30) / 15);

                if (currentFrame > exitFrame) {

                    ctx.globalAlpha = ease((exitFrame + 15 - currentFrame) / 15, 1 / 4);
                }

                $(paddle).css({opacity:ctx.globalAlpha});

                //drawGrid(currentFrame);

                if (state == 'on fire') {
                    var o = (((currentFrame - gameStart) % (FRAMES_PER_BEAT))) / (FRAMES_PER_BEAT);
                    ctx.fillStyle = 'rgba(' + [200, 50, 140, .35 + .65 * ease(Math.cos((1 + o) * 2 * Math.PI), 4) ] + ')';
                    ctx.fillRect(0, 0, 800, 540);
                }

                drawBackground(currentFrame);
                drawTail(currentFrame);
                //drawPaddle(currentFrame);
                drawSprites(currentFrame);
                drawMeters(currentFrame);

            }


            function drawVideo(currentFrame) {

                $(video).hide();

                // blur quickly by drawing onto smaller canvas and then drawing back to larger canvas
                var blur = 1 + 1.5 * (backgroundRGBA[3]);
                buffer.width = Math.ceil((1 / blur) * canvas.width);
                buffer.height = Math.ceil((1 / blur) * canvas.height);

                buffer_ctx.drawImage(video, 0, 0, buffer.width, buffer.height);

                try {
                    ctx.drawImage(buffer, 0, 0, canvas.width, canvas.height);
                } catch (e) {
                }
            }


            // draw beat markers for reference
            function drawGrid(currentFrame) {
                ctx.save();
                ctx.strokeStyle = 'rgba(90,90,150,.5)';

                for (var beat = 0; beat < 40; beat++) {
                    var f = beat * FRAMES_PER_BEAT;
                    var x = Math.round(800 - veloc_x * (gameStart - currentFrame + f ));

                    if (x > 0 && x < 960) {
                        ctx.lineWidth = ((beat) % 2 == 0) ? 2 : 1;
                        ctx.beginPath();
                        ctx.moveTo(x - .5, 104);
                        ctx.lineTo(x - .5, 426);
                        ctx.stroke();
                    }
                }

                for (var track_num = 0; track_num < 4; track_num++) {
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(0, 100 + track_num * 110);
                    ctx.lineTo(800, 100 + track_num * 110);
                    ctx.stroke();
                }

                ctx.restore();
            }

            function drawBackground(currentFrame) {

                var sf = 36;
                ctx.save();
                ctx.globalAlpha = ease((currentFrame - sf) / 10);
                var line_pos = 800 * ease((currentFrame - sf) / 10);


                var ef = exitFrame + 25;

                if (currentFrame > ef) {

                    // transition out
                    //---------------

                    var dist = currentFrame - ef;

                    // move line to the rightdancegame.setColor([0,0,0,Math.min(1.0, current_color[3]+.1)]);
                    line_pos += Math.pow(dist, 3);

                    //console.log('out',line_pos);
                    // fade out back to transparent black
                    for (var n = 0; n < 3; n++) {
                        backgroundRGBA[n] += Math.floor(.2 * (0 - backgroundRGBA[n]));
                    }
                    backgroundRGBA[3] += .2 * (0 - backgroundRGBA[3]);

                } else {

                    // color transitions

                    if (backgroundRGBA[0] == 0 && backgroundRGBA[2] == 0) {
                        // black background should ease towards 80%
                        backgroundRGBA[3] += (.85 - backgroundRGBA[3]) * .1;
                    } else {
                        // fade to clear
                        backgroundRGBA[3] += (0 - backgroundRGBA[3]) * .08;
                    }
                }
                // color panel
                ctx.fillStyle = 'rgba(' + backgroundRGBA + ')';
                ctx.fillRect(0, 0, Math.min(line_pos, canvas.width), canvas.height);

                if (line_pos < canvas.width) {
                    // black (right) panel
                    ctx.fillStyle = 'rgba(0,0,0,.8)';
                    ctx.fillRect(line_pos, 0, canvas.width - line_pos, canvas.height);

                    // draw white vertical line
                    //ctx.globalAlpha = 1.0;
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(line_pos - 1, 0, 2, canvas.height);
                }


                ctx.restore();
            }

            function drawSprites(currentFrame) {

                //ctx.save();
                //ctx.globalAlpha = ease((currentFrame) / 20);
                _.each(sprites, function (s) {
                    s.render(currentFrame, ctx);
                });
                //ctx.restore();
            }

            function drawPaddle() {

                var min_y = 20;
                var max_y = 540 - min_y - paddle.height;
                var paddle_y = Math.max(min_y, Math.min(max_y, mouse.y - paddle.height / 2));
                $(paddle).css({top:paddle_y, left:800 - paddle.width / 2});
            }

            //  tail coming from the back of the paddle (mouse.y)
            function drawTail(currentFrame) {

                if (currentFrame > exitFrame || currentFrame < gameStart) {
                    return;
                }

                ctx.save();


                var o = (((currentFrame - gameStart) % FRAMES_PER_BEAT) / FRAMES_PER_BEAT);

                if (tailPosition == 0) {
                    tailPosition = mouse.y;
                }

                // ease tail towards mouse
                tailPosition = tease(tailPosition, mouse.y, .1);

                // wag the tail
                tailPosition += 5 * ease(Math.cos(o * 2 * Math.PI), 3);

                //console.log('tailPosition: '+tailPosition);

                ctx.beginPath();
                // draw one vertical slice at a time as rectangles
                var slice_width = 1;
                var tail_start_x = 800;
                var tail_length = 960 - tail_start_x;


                var target_rgba = ((backgroundRGBA[0] == 0) && (backgroundRGBA[3] == 0)) ? [200, 200, 200, .5] : backgroundRGBA;
                //console.log( target_rgba );

                // ease color towards background color
                for (var n = 0; n < 3; n++) {
                    tailRGBA[n] = Math.round(tease(tailRGBA[n], target_rgba[n], .1));
                }
                //tailRGBA[3] = .8;
                tailRGBA = target_rgba;
                //console.log(tailRGBA);
                ctx.fillStyle = 'rgba(' + tailRGBA + ')';
                //ctx.fillStyle = 'rgba(' + backgroundRGBA + ')';

                for (var x = tail_start_x; x < 960; x += slice_width) {

                    // tail eases from paddle to tail position
                    var pct = (x - tail_start_x) / tail_length;
                    var h = .5 + 70 * ease(1 - pct, 6);
                    var cy = getTailPositionY(x);


                    ctx.fillRect(x, cy - h / 2, slice_width, h);

                }
                ctx.closePath();
                ctx.restore();
            }

            function drawMeters(currentFrame) {

                if (currentFrame < exitFrame && currentFrame > gameStart) {

                    if (currentFrame > (gameStart + 10)) {
                        bar.show();
                        bar.setPercent(score);
                    } else {
                        bar.hide();
                    }
                } else {
                    bar.hide();
                }

                if (currentFrame < exitFrame) {
                    var clockStart = 115;
                    if (currentFrame > clockStart) {
                        var pct = (currentFrame - clockStart) / (exitFrame - clockStart);
                        clock.show();
                        clock.setPercent(1 - pct);
                    } else {
                        clock.hide();
                    }
                } else {
                    clock.hide();
                }


                $('#trace').html("Current State:" + state);

            }


            function getTailPositionY(x) {
                var pct = (x - 800) / 160;
                return mouse.y + (tailPosition - mouse.y) * ease(pct, 5);
            }

            /* exponential easing */
            function ease(val, exp) {
                if (exp == null) exp = 4;
                if (val >= 1.0) return 1.0; // save processing for when we really need it
                if (val < 0) return 0;
                return Math.max(0, Math.min(1.0, Math.abs(Math.pow(val, exp))));
            }

            function tease(val, target, easeFactor) {
                if (easeFactor == null) easeFactor = .2;
                return val + (target - val) * easeFactor;

            }

            return self;

        }


    }
)
;