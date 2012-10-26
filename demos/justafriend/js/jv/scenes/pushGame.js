// load separate video over the top

// cycle back and forth across 5 frames

// each time space bar is push, advance a frame

// if we get past a certain frame by a certain time, let him fall in the pool

// if no input, overlay separate WTF? vid


define(['underscore', 'bumpslide/view', 'jv/media', 'jv/frameCodeReader', 'bumpslide/canvasUtil', './progressBar', './progressClock', 'jv/tracker'], function (_, view, media, frameCodeReader, canvasUtil, progressBar, progressClock, tracker) {

    return function () {

        var video, reactVideo, cta_img, cta_canvas, cta_ctx;
        var _hasPressed = false;
        var _isPlaying = false;
        var _currentFrame = 1;
        var _yoyo = 0;
        var _yoyoDir = 1;
        var _skip = false;
        var _completed = false;
        var _totalFrames = 107; // of push video (not including react)
        var _reactMode = false;
        var _framedecoder;
        var _timer;
        var _introDelay;
        var _success = false;
        var _introMode = false;
        var _passive = true;

        var bar = progressBar();
        var clock = progressClock();

        var self = view.extend({
            template:'<div class="scene HD" id="push_game"></div>',
            name:'pushGame',
            pageName: 'Push Game',
            onInit:onInit,
            onShow:onShow,
            onHide:onHide,
            draw:draw
        });

        return self;


        function onInit() {
            video = media.getVideo('video/20_Push_10bit');
            reactVideo = media.getVideo('video/21_Push_React_B_10bit');
            _framedecoder = frameCodeReader(video, 23.97);

            // create canvas for call to action sprite animation
            cta_img = media.getImage('img/push_cta.png');
            cta_canvas = canvasUtil.create(262, 35);
            $(cta_canvas).css({top:484, left:(960 - cta_canvas.width) / 2 });
            cta_ctx = cta_canvas.getContext('2d');

            bar.init();
            bar.setCutOff(.5);
            clock.init();
        }

        function onShow() {
            self.el.append(video);
            //self.el.append(cta_canvas);
            self.el.append(bar.el.css({top:467, left:369}));
            self.el.append(clock.el.css({top:455, left:876}));

            reset();
            initEvents();
            self.el.focus();

            clock.show();

            video.play();
        }

        function onHide() {
            //video.currentTime = .01;
            //video.pause();
            self.el.children().remove();
            removeEvents();
            reset();
            bar.hide();
            clock.hide();
        }

        function reset() {
            _hasPressed = false;
            _isPlaying = false;
            _currentFrame = 1;
            _yoyo = 0;
            _yoyoDir = 1;
            _skip = false;
            _completed = false;
            _success = false;
            _reactMode = false;
            _introMode = true;
            _passive = true;

            try {
                video.currentTime = .01;
                reactVideo.currentTime = .01;
            } catch (e) {
            }
            video.pause();
            reactVideo.pause();
        }

        function initEvents() {
            $(document).bind('keydown', onKeyDown);
            $(document).bind('MSPointerDown', onKeyDown);
            clearInterval(_timer);
            clearTimeout(_introDelay);
            _timer = setInterval(onTimer, 166); // every 4 frames
            _introDelay = setTimeout(onIntroComplete, 1000);
        }

        function removeEvents() {
            $(document).unbind('keydown', onKeyDown);
            $(document).unbind('MSPointerDown', onKeyDown);
            clearInterval(_timer);
            clearTimeout(_introDelay);
        }

        function onIntroComplete() {
            //console.log('intro mode done')
            _introMode = false;
        }

        function onTimer() {
            if (!_hasPressed) {
                if (_introMode) {
                    if (!_isPlaying) {
                        _isPlaying = true;
                        video.play();
                    }
                    return;
                }
                video.pause();
                _isPlaying = false;
            }
            _hasPressed = false;
            //_currentFrame = Math.round(video.currentTime * 23.97); // _framedecoder.getCurrentFrame();
            //console.log('currentFrame: '+_currentFrame);
        }

        function onKeyDown(event) {
            if (event.which == 32 || _introMode || event.type === "MSPointerDown") {
                event.preventDefault();
                event.stopImmediatePropagation();
                _hasPressed = true;
                _passive = false;
                if (!_isPlaying && !_completed) {
                    _isPlaying = true;
                    video.play();
                    _yoyo = 0;
                    _yoyoDir = 1;
                }
            }
        }

        function result() {

            // Define weather you see the boyfriend fall in the pool or not.
            // if you reach 60 frames (75%), then you win.
            if (!_completed) {
                _completed = true;
                _success = (_currentFrame >= _totalFrames * .5);
                //console.log('Complete - '+(_success ? 'Success' : 'Failed'));
                tracker.trackView('Push Game '+(_success ? 'Success' : 'Fail'), _passive);
            }
        }

        function videoGotoAndStop(frame_num) {
            _currentFrame = Math.min(frame_num, _totalFrames);
            var t = Number(_currentFrame / 23.97).toFixed(2);
            //console.log('going to time: '+t + ' f'+frame_num);
            try {
                video.currentTime = t;
            } catch (e) {
            }
            //console.log('actual time: '+video.currentTime+ ' f'+Math.round(video.currentTime * 23.97));
            video.pause();
        }

        function draw(_realFrame) {


            if (_isPlaying) {
                // update current frame
                _currentFrame = Math.ceil(video.currentTime * 23.97);
            }

            clock.setPercent( 1 - (_realFrame / _totalFrames) );

            var pct = Math.pow( ((_realFrame / _totalFrames) *  (1 - ((_totalFrames - _currentFrame) / 4)  / (_totalFrames - _realFrame) )), .7);

            if (!_skip && (((_totalFrames - _currentFrame) / 4) >= (_totalFrames - _realFrame))) {
                // If you're running out of time, it turns the video to 24fps (by skipping frames),
                // so that you can reach the end of the video under the same amount of time
                //console.log('out of time - start skipping');
                pct = 1 - (_realFrame / _totalFrames);
                result();
                //removeEvents();
                _skip = true;
                _isPlaying = false;
                bar.hide();

            }

            //console.log('Real Frame:'+_realFrame, 'reactMode:', _reactMode, 'introMode:', _introMode);

            if (!_reactMode) {
                if (_skip) {
                    //console.log('skipping ahead - currentFrame: '+_currentFrame);
                    videoGotoAndStop(_currentFrame + 4);

                } else if (!_isPlaying && !_introMode) {


                    //console.log('draw realFrame:'+_realFrame+' currentFrame:'+_currentFrame);
                    // YOYO effect when then user is not pressing the spacebar
                    _yoyo += _yoyoDir;
                    if (_yoyo >= 2 || _yoyo <= -2) {
                        _yoyoDir *= -1;
                    }
                    var extra = 0;
                    if (_currentFrame <= 1) extra = 2;
                    else if (_currentFrame <= 2) extra = 1;

                    videoGotoAndStop(_currentFrame + _yoyo + extra);
                }


                //renderCta(_realFrame);

                if (_realFrame > 3 && !_reactMode && !_skip) {
                    bar.show();
                    bar.setPercent(pct);
                } else {

                    //bar.setPercent(1.0);
                    bar.hide();
                }
            }

            if (_realFrame > _totalFrames && !_reactMode) {
                _reactMode = true;


                self.el.children().remove();

                if (_success) {
                    self.el.append(reactVideo);
                    try {
                        reactVideo.currentTime = .01;
                    } catch (e) {
                    }

                    reactVideo.play();
                    reactVideo.blur();
                }

            }

//            if (_realFrame >= _totalFrames) {
//                // RESET
//                result();
//                _isPlaying = false;
//                _skip = false;
//                _realFrame = 0;
//                _yoyo = 0;
//                _yoyoDir = 1;
//                _currentFrame = 1;
//                _completed = false;
//                initEvents();
//            }

        }

        function renderCta(f) {
            var spriteFrames = 1;
            var endFrame = 30;
            var easeFrames = 10;
            var easeInFrames = easeFrames * .5;

            var sprite_frame_idx = Math.floor(f / 5) % spriteFrames;

            cta_ctx.globalAlpha = 1.0;
            cta_ctx.clearRect(0, 0, cta_canvas.width, cta_canvas.height);

            // fade in/out
            if (f < easeInFrames) {
                cta_ctx.globalAlpha = ease(f / easeInFrames);
            } else if (f > (endFrame - easeFrames) && f < endFrame) {
                cta_ctx.globalAlpha = ease((endFrame - f) / easeFrames, 1 / 4);
            }

            if (f < endFrame) {
                cta_ctx.drawImage(cta_img, 0, sprite_frame_idx * cta_canvas.height, cta_canvas.width, cta_canvas.height, 0, 0, cta_canvas.width, cta_canvas.height);
            }
        }

        function ease(val, exp) {
            if (exp == null) exp = 4;
            if (val >= 1.0) return 1.0; // save processing for when we really need it
            if (val < 0) return 0;
            var eased = Math.max(0, Math.min(1.0, Math.abs(Math.pow(val, exp))));
            //console.log('eased: ' + eased);
            return eased;
        }


    };
});



