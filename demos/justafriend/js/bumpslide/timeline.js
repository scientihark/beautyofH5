define(['underscore', './animation'], function (_, animation) {

    /**
     * A timeline is a linear animation driven by requestAnimFrame via bumpslide/animation
     *
     * The timeline class acts as a ticker for a given framerate.
     *
     * Optionally, a media element (html5 audio or video) can be assigned, and instead of using a timer,
     * we will use the media.currentTime as the driver.
     *
     * The getCurrentFrame() implementation can also be overridden to pull frame from embedded time code if desired.
     */

    var DEFAULT_OPTIONS = {
        debugMode:false,
        frameRate:23.976216, // used for time-to-frame calculations
        media:null // html media element (audio or video)
    };

    return function (onRender, options) {
        //console.log('timeline init', options);
        if (onRender == null) {
            console.error('Please provide a render function.');
            return null;
        }

        options = _.defaults(options || {}, DEFAULT_OPTIONS);

        if (options.debugMode) console.log('timeline init', options);

        var media = options.media;

        // private
        var currentFrame = 0,
            seeking = false,
            targetTime = 0,
            seekInterval = -1,
            startTime = 0,
            running = false,
            onSeekComplete = null,
            anim = animation(onAnimationFrame);

        // public
        var self = {
            play:play,
            stop:reset,
            pause:pause,

            gotoAndPlay: function (f) {
                gotoFrame( f, play );
            },
            gotoAndStop: function (f) {
                gotoFrame( f, pause );
            },
            getCurrentFrame:function () {
                return calculateCurrentFrame();
            },
            isRunning:function () {
                return running;
            },
            isSeeking:function () {
                return seeking;
            },
            getTimecode:function () {
                return secondsToTimecode(getCurrentTime(), options.frameRate);
            },
            setTimecode:function (hh_mm_ss_ff) {
                seekTo(timecodeToSeconds(hh_mm_ss_ff, options.frameRate));
            },
            setMedia:function (html_media_element) {
                if(media) media.removeEventListener('seeked', onMediaSeek);
                media = html_media_element
                media.addEventListener('seeked', onMediaSeek);
            }
        };

        return self;

        function gotoFrame(frame, on_seek) {
            onSeekComplete = on_seek;
            if (frame !== undefined) {
                // update current frame
                currentFrame = Math.abs(Math.floor(frame));

                if (media) {
                    seekTo((currentFrame / options.frameRate) + .2 / options.frameRate);
                    //console.log('going to frame: ', currentFrame, ' setting current time to: ', time, ' got frame: ', calculateCurrentFrame());
                } else {
                    // adjust start time to account for current frame setting
                    startTime = +(new Date) - Math.round((currentFrame / options.frameRate));
                }
            } else {
                console.log('cannot goto frame ' + frame);
            }

        }

        function seekTo(time) {
            targetTime = Math.max(0.00, time).toFixed(2);
            clearInterval(seekInterval);
            seeking = true;
            pause();
            seekInterval = setInterval(doSeekTargetTime, 300); // keep trying until we get it
            _.delay( doSeekTargetTime, 100 );
            //$(media).hide();
        }

        function onMediaSeek(event) {
            //console.log('seek complete', event);
            if(onSeekComplete) _.delay( onSeekComplete, 10);
            //$(media).show();
        }

        function doSeekTargetTime() {
            try {
                //console.log('Seeking to ' + targetTime);

                media.currentTime = targetTime;

                seeking = false;
                clearInterval(seekInterval);
                //onRender(currentFrame);
            } catch (e) {
                console.log('Seek Error: ' + e);
            }
        }

        function play() {
            if (media) {
                media.play();
            } else {
                // adjust start time to account for current frame setting
                startTime = +(new Date) - Math.round((currentFrame / options.frameRate));
            }
            //console.log('play frame: ', currentFrame, ' startTime: ', startTime);
            anim.run();
            running = true;

            //onRender(currentFrame);
        }

        function pause() {
            if (media) media.pause();
            anim.pause();
            running = false;
            onRender(currentFrame);
        }

        function getCurrentTime() {
            if (media) {
                return media.currentTime;
            } else {
                return ((new Date) - startTime) / 1000;
            }
        }

        function calculateCurrentFrame() {
            var round = Math.round;//($.browser.webkit ? Math.floor : Math.ceil);
            return round(getCurrentTime() * options.frameRate);
        }

        function onAnimationFrame() {
            var previousFrame = currentFrame;
            currentFrame = self.getCurrentFrame();
            //console.log( 'onAnimationFrame - calculated frame:'+currentFrame );
            if (currentFrame != previousFrame) {
                onRender(currentFrame);
            }
        }

        function reset() {
            startTime = 0;
            currentFrame = 0;
            anim.pause();
            if (media) {
                media.currentTime = 0.01;
                media.pause();
            }
            running = false;
            onRender(currentFrame);
        }

        function timecodeToSeconds(hh_mm_ss_ff, fps) {
            var tc_array = hh_mm_ss_ff.split(":");
            var tc_hh = parseInt(tc_array[0]);
            var tc_mm = parseInt(tc_array[1]);
            var tc_ss = parseInt(tc_array[2]);
            var tc_ff = parseInt(tc_array[3]);
            return ( tc_hh * 3600 ) + ( tc_mm * 60 ) + tc_ss + ( tc_ff / fps );
        }

        function secondsToTimecode(time, fps) {
            var hours = Math.floor(time / 3600) % 24;
            var minutes = Math.floor(time / 60) % 60;
            var seconds = Math.floor(time % 60);
            var frames = Math.floor(((time % 1) * fps).toFixed(3));

            return (hours < 10 ? "0" + hours : hours) + ":"
                + (minutes < 10 ? "0" + minutes : minutes) + ":"
                + (seconds < 10 ? "0" + seconds : seconds) + ":"
                + (frames < 10 ? "0" + frames : frames);
        }
    };
});
