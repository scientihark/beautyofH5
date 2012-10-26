define(['underscore', './screens/welcome', './screens/loading', './screens/videoplayer', './data/model', 'jv/tracker', 'jv/media'],
    function (_, welcome, loading, videoplayer, model, tracker, media) {


        var screens = [ welcome, loading, videoplayer ];

        var appRoot = $('#app');

        // intro loop
        var video, videoLoaded = false;

        var self = {
            init:init
        };

        return self;

        function init() {
            video = media.getVideo('video/loadingloop', false, onVideoReady, onVideoError);
            video.loop = true;
            $(video).addClass('overlay').hide();

            //console.log('appending ', video);
            appRoot.append( video );

            _.each(screens, function (s) {
                s.init();
                appRoot.append(s.el);
            });

            model.bind('screen', onScreenChange, true );
        }



        function  onScreenChange(idx) {

            for (var n = 0; n < screens.length; n++) {
                var screen = screens[n];
                if (n == idx) {
                    screen.show();
                    //tracker.trackView(screen.pageName);
                } else {
                    screen.hide();
                }
            }
            if (n > 2) {
                hideVideo();
            } else {
                showVideo();
            }

        }

        function onVideoReady() {
            //console.log('loading video is ready!');
            videoLoaded = true;
            showVideo();
        }

        function showVideo() {
            if (video && videoLoaded && model.get('screen')<3) {
                $(video).fadeIn(500);
                video.play();
            }
        }

        function hideVideo() {
            $(video).stop(true, true).hide();
            if(video) video.pause();

        }


        function onVideoError() {
            //console.log('Failed to load the loading video.')
        }


    });