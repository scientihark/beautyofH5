define(['underscore', 'bumpslide/canvasUtil', 'toxi/geom/Vec2D'], function (_, canvasUtil, Vec) {

    return function (dancegame, image, target_y, targetFrame, speed) {

        //console.log( 'New Dance Shape: ', arguments);
        var FPS = 23.976216;
        var BPM = 100;
        var FRAMES_PER_BEAT = FPS * 60 / BPM;

        var fieldWidth = 800;

        var canvas, ctx;
        var imageData;
        var particles;
        var exploding = false;
        var hitPaddle = false;
        var type = image.src.split('/').pop().split('.').shift();

        //console.log('sprite ', type);

        reset();

        return {
            reset:reset,
            getCanvas:function () {
                return canvas;
            },
            render:render
        };


        // create canvas and draw image onto it
        function reset() {

            exploding = false;
            hitPaddle = false;
            particles = [];

            if (canvas && canvas.parent) $(canvas).remove();

            canvas = canvasUtil.create(image.width, image.height);

            ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }


        function render(currentFrame, gameContext) {

            switch(type) {
                // red
                case 'shape4':
                    speed =  12;
                    break;

                default:
                    speed = 8;

            }

            // where are we?
            var start_frame = targetFrame - fieldWidth / speed;
            var frame_offset = currentFrame - start_frame;
            var pos_x = frame_offset * speed - image.width / 2;
            var pos_y = target_y - image.height / 2;

            // Exit now if you are not on screen
            if (pos_x < 0 || pos_x > 1200) return;

            //console.log('render ', pos_x, pos_y);
            var o = ((frame_offset % FRAMES_PER_BEAT) / FRAMES_PER_BEAT);
            var scale = 1.0;

            function curve(val, freq, offset) {
                if(offset==null) offset=0;
                return Math.cos(((offset + (val % freq) / freq)) * 2 * Math.PI);
            }

            switch (type) {

                // red
                case 'shape4':
                    //pos_x += 10 * ease(Math.cos((o) * (2) * Math.PI), 3);
                    pos_y -= 15 * ease(curve( frame_offset, 2*FRAMES_PER_BEAT, 1), 3);
                    pos_x -= 10 * ease(curve( frame_offset, 2*FRAMES_PER_BEAT, .5), 5);
                    break;

                // yellow
                case 'shape3':
                    pos_y += 30 * curve( frame_offset, FRAMES_PER_BEAT*2, .75);
                    break;

                // IE
                case 'ieSprite':
                    pos_y += 100 * Math.pow( curve( frame_offset, FRAMES_PER_BEAT*4), 4 ) - 50;
                    break;

                case 'shape1':
                    var delta = 220 * ease( (800-pos_x+150)/800, 7);
                    if(pos_y>250) pos_y-=delta; else
                        pos_y+=delta;
                    break;

                // big white
                case 'shape5':
                    var pct = ease(curve( frame_offset, FRAMES_PER_BEAT*2, -1), 7);
                    scale = 1 + .2*pct;
                    //pos_x-=pct*16;
                    break;
            }

            //console.log(o);

            if (pos_x + canvas.width < 800) {
                gameContext.save();
                var scale_offset_x = (scale-1.0) * (canvas.width/2);
                var scale_offset_y = (scale-1.0) * (canvas.height/2);
                gameContext.translate(pos_x-scale_offset_x, pos_y-scale_offset_y);
                gameContext.scale(scale,scale);
                gameContext.drawImage(canvas, 0, 0, canvas.width, canvas.height);
                gameContext.restore();
                return;
            }

            // EXPLODE!!
            if (!exploding) {

                // check for collision with paddle
                var half_paddle = dancegame.getPaddleHeight() / 2;
                var mouse = dancegame.getMouse();
                if (pos_y < mouse.y + half_paddle && pos_y + image.height > mouse.y - half_paddle) {
                    hitPaddle = true;
                }

                initParticles(pos_x, pos_y);

                var current_color = dancegame.getColor();
                var game_is_black = (current_color[0] == 0 && current_color[2] == 0);

                if (hitPaddle) {
                    var c = particles[0].rgba.slice(0, 3).concat(.7);

                    // If we hit a white shape
                    if (c[0] > 200 && c[1] > 200 && c[2] > 200) {

                        // and the game is black
                        if (game_is_black) {
                            // set color to grey that will fade out quickly like other colors
                            // but not be shown as black - this will also be the color of the tail
                            dancegame.setColor([200, 200, 200, .2]);
                        }
                        // game is some other color, let it be
                    } else {

                        // change to new color
                        dancegame.setColor(c);
                    }

                    dancegame.hit();

                    if(type=='ieSprite') {
                        var color =  {'shape1':'white', 'shape3':'yellow', 'shape4':'pink', 'ieSprite': 'blue' }[type];
                        dancegame.colorEffect( color );
                    }

                } else {

                    if (game_is_black) {
                        // increase the black-ness
                        dancegame.setColor([0, 0, 0, Math.min(1.0, current_color[3] + (.8 - current_color[3]) * .3)]);
                    } else {
                        // set to 30% black
                        dancegame.setColor([0, 0, 0, .3]);
                    }
                    dancegame.miss();
                }

                exploding = true;
            }
            renderParticles(gameContext);

            //gameContext.putImageData( imageData,pos_x-canvas.width/2, pos_y-canvas.height/2);

        }

        function initParticles(pos_x, pos_y) {
            particles = [];

            var idx, n;
            var data = imageData.data;
            var mouse = dancegame.getMouse();
            for (n = 0, idx = 0; n < data.length; n = ++idx * 4) {
                var rgba = [data[n], data[n + 1], data[n + 2], data[n + 3] / 255];
                //var pixelData = ctx.createImageData(1, 1);
                //for (var i = 0; i < 4; i++)  pixelData.data[i] = data[i + n];
                var pos = new Vec(idx % imageData.width, Math.floor(idx / imageData.width));
                pos.addSelf(pos_x, pos_y);

                // throw out pixels that are barely visible
                if (rgba[3] < .5) continue;

                var weight = Math.random(); // for variation, try basing this on color   //(rgba[0]/255 + rgba[1]/255 + rgba[2]/255)/3;
                var vel = Vec.randomVector().scaleSelf((1 - weight) + .5);
                if (hitPaddle) {
                    // those we catch, get sucked straight back
                    //vel.x = Math.abs(vel.x);
                }
                particles.push({ age:0, rgba:rgba, pos:pos, weight:weight, vel:vel, paddleY:mouse.y });
            }
        }

        function renderParticles(gameContext) {

            gameContext.save();

            var maxAge = 30; // frames
            var deadParticles = [];
            var n, f, g;

            // waves of gravity
            var d = +new Date;
            var gx = hitPaddle ? .6 : 1.5;
            var gy = 0;//hitPaddle ?  Math.sin((d / 500 )) : -1;

            var bounds = {
                top:Number.MAX_VALUE,
                left:Number.MAX_VALUE,
                right:-Number.MAX_VALUE,
                bottom:-Number.MAX_VALUE
            };


            // animate
            _.each(particles, function (p) {

                p.vel.scaleSelf(.98); // friction

                // trail target position
                var dist_from_trail = dancegame.getTailPositionY(p.pos.x) - p.pos.y;
                var pull = ease((p.pos.x - 800) / 160, 1 / 3);

                // gravitate vertically in relation to trail
                // collected beats in, missed beats out
                gy = -dist_from_trail / 200;
                if (hitPaddle) {
                    gy = pull * dist_from_trail / 10;
                }
                g = new Vec(gx, gy).scaleSelf(p.weight * 2);
                f = p.vel.add(g); // add gravity
                f.scaleSelf(5.0); // speed
                p.pos.addSelf(f);
                p.rgba[3] *= ((hitPaddle ? .8 : .6) + .1 * (1 - p.weight)); // fade out
                //p.pixelData.data[3] = 255 * p.rgba[3];
                p.age += 1;

                if (p.age > maxAge || p.rgba[3] < .1 || p.x > 960) {
                    deadParticles.push(p);
                } else {
                    // calculate min and max positions of all particles that are still living
                    bounds.top = Math.min(bounds.top, p.pos.y);
                    bounds.bottom = Math.max(bounds.bottom, p.pos.y);
                    bounds.left = Math.min(bounds.left, p.pos.x);
                    bounds.right = Math.max(bounds.right, p.pos.x);
                }
            });

            bounds.top = Math.floor(bounds.top);
            bounds.left = Math.floor(bounds.left);
            bounds.bottom = Math.ceil(bounds.bottom);
            bounds.right = Math.ceil(bounds.right);

            // bring out the dead
            for (n = 0; n < deadParticles.length; n++) {
                particles.splice(particles.indexOf(n), 1);
            }

            if (!particles.length) return;

            canvas.width = bounds.right - bounds.left;
            canvas.height = bounds.bottom - bounds.top;

            //$(stage).css({ top:bounds.top, left:bounds.left });

            // render
            _.each(particles, function (p) {
                //ctx.putImageData(p.pixelData, (p.pos.x - bounds.left), (p.pos.y - bounds.top));
                //gameContext.putImageData(p.pixelData, p.pos.x, p.pos.y);

                var size = Math.round(p.weight * 2);

                ctx.fillStyle = 'rgba(' + p.rgba + ')';
                ctx.fillRect((p.pos.x - bounds.left), (p.pos.y - bounds.top), size, size);

                //gameContext.fillStyle = 'rgba(' + p.rgba + ')';
                //gameContext.fillRect(Math.round(p.pos.x - size / 2), Math.round(p.pos.y - size / 2), size, size);
            });


            gameContext.drawImage(canvas, bounds.left, bounds.top, canvas.width, canvas.height);
            gameContext.restore();


        }

        /* exponential easing */
        function ease(val, exp) {
            if (exp == null) exp = 4;
            if (val >= 1.0) return 1.0; // save processing for when we really need it
            if (val < 0) return 0;
            return Math.max(0, Math.min(1.0, Math.abs(Math.pow(val, exp))));
        }

    };

});