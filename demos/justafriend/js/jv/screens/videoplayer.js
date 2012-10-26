// This is the controller for the main interactive video sequence

define(['underscore', 'bumpslide/view', 'text!./videoplayer.html',
    'jv/media', 'jv/sceneManager', 'jv/data/config',
    'jv/scenes/wall1', 'jv/scenes/wall2', 'jv/scenes/circleGame',
    'jv/scenes/danceGame', 'jv/scenes/scoreboardProjection', 'jv/scenes/phoneScreenProjection', 'jv/scenes/pushGame',
    'jv/scenes/videoScene', 'jv/scenes/imageScene', 'jv/frameCodeReader', 'jv/scenes/imageSprite',
    'jv/scenes/bowlingGame', 'jv/dispatcher', 'bumpslide/timeline', 'jv/scenes/endScreen', 'jv/scenes/endProjection', 'jv/scenes/modifiedShareOverlay'],
    function (_, view, template, media, sceneManager, config, wall1, wall2, circleGame, danceGame, scoreboardProjection, phoneScreenProjection, pushGame, videoScene, imageScene, frameCodeReader, imageSprite, bowlingGame, dispatcher, timeline, endScreen, endProjection, modifiedShareOverlay) {

        var holder;
        var video;
        var $video;
        var time = timeline(render);
        var endFrame = 5050;
        var frame_reader;
        var zoomed = false;
        var returnVisitor = false;

        var self = view.extend({
            template:template,
            name:'video',
            pageName:'Video',
            onInit:onInit,
            onShow:onShow,
            onHide:onHide,
            getVideo:function () {
                return video;
            }
        });

        return self;

        function onInit() {

            holder = $('#holder', self.el);

            // connect our scene manager to this holder DIV
            sceneManager.setHolder(holder);

            // When we get the preloadStart signal, start loading stuff
            dispatcher.bind('preloadStart', startLoading);

            initControls();

            // uncomment this to check for return visitor
//            returnVisitor = $.cookie('returnVisitor');
//            console.log('returnVisitor:', returnVisitor);
        }


        function startLoading() {

            // start loading and attach video to holder
            video = media.getVideo('video/JAZ_V', true);
            $video = $(video);
            $video.hide();

            var offset = 0;

            sceneManager.addScene(scoreboardProjection(), offset + 1010, offset + 1083);
            sceneManager.addScene(pushGame(), offset + 3562, offset + 3796);
            sceneManager.addScene(bowlingGame(), offset + 1122, offset + 1611);
            sceneManager.addScene(danceGame(), offset + 3916, offset + 4660);
            sceneManager.addScene(circleGame(), offset + 2305, offset + 2770);
            sceneManager.addScene(wall1(), offset + 108, offset + 144);
            sceneManager.addScene(wall2(), offset + 71, offset + 108);
            sceneManager.addScene(phoneScreenProjection(2), offset + 287, offset + 319);
            sceneManager.addScene(phoneScreenProjection(1), offset + 347, offset + 404);

            // TODO: Add support for 'onTouchStart' family of touch events to bowling and push games
            var isTouch = (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1);// || ('ontouchstart' in document.documentElement);

            // message sprite x, y, width, and height
            var msg_x = (960 - 281) / 2;
            var msg_y = 454;
            var msg_width = 281;
            var msg_height = 37;

            // add message sprites
            sceneManager.addScene(imageSprite('messages.png', msg_x, msg_y, msg_width, msg_height, 0), offset + 1111, offset + 1150); // bowl 1
            sceneManager.addScene(imageSprite('messages.png', msg_x, msg_y, msg_width, msg_height, isTouch ? 6 : 1), offset + 1170, offset + 1226); // bowl 2
            sceneManager.addScene(imageSprite('messages.png', msg_x, msg_y, msg_width, msg_height, isTouch ? 7 : 2), offset + 3513, offset + 3560); // push 1
            sceneManager.addScene(imageSprite('messages.png', msg_x, msg_y, msg_width, msg_height, 3), offset + 3855, offset + 3910); // dance 1
            sceneManager.addScene(imageSprite('messages.png', msg_x, msg_y, msg_width, msg_height, 4), offset + 3916, offset + 4000); // dance 2
            sceneManager.addScene(imageSprite('messages.png', msg_x, msg_y, msg_width, msg_height, 5), offset + 2290, offset + 2340); // chase 1

            sceneManager.addScene(endScreen(), 4991 + offset, offset + endFrame + 9999);
            sceneManager.addScene(endProjection(), 4867 + offset, offset + endFrame + 9999);
            sceneManager.addScene(modifiedShareOverlay(), 4867 + offset, offset + endFrame + 9999);

            sceneManager.initViews();

            frame_reader = frameCodeReader(video, 23.976216);
            time.getCurrentFrame = frame_reader.getCurrentFrame;

            $(window).resize(updateZoom);
        }


        function onShow() {

            //console.log('[videoPlayer] onShow()', video, holder);

            time.setMedia(video);
            holder.prepend(video);

            _.delay( function() {
                //console.log( 'goto and play');
                time.gotoAndPlay(0);
            }, 10);


            initEvents();

        }

        function onHide() {
            removeEvents();
        }

        function initEvents() {
            $(document).bind('keypress', onKeyPress);
            $(document).bind('contextmenu', killEvent);
            $(document).bind('selectstart', killEvent);
        }

        function removeEvents() {
            $(document).unbind('keypress', onKeyPress);
            $(document).unbind('contextmenu', killEvent);
            $(document).unbind('selectstart', killEvent);
        }

        function onKeyPress(event) {
            switch (event.which) {
                case 100:
                    $('#controls').toggle(500);
                    break;
                case 102:
                    // toggleZoom();
                    break;
            }
        }

        function killEvent(event) {
            event.stopImmediatePropagation();
            event.preventDefault();
        }

        function render(frame) {

            //console.log('render '+frame);
            $('#frameNum', self.el).text('Frame: ' + frame + ' (' + time.getTimecode() + ')');

            // because of bleep at start
            try {
                if (video.muted && frame > 3) video.muted = false;
            } catch (e) {
                console.log(e);
            }

            sceneManager.renderFrame(frame);

            if (frame > endFrame && !time.isSeeking()) {
                time.gotoAndStop(endFrame);
                $video.hide();
                video.muted = true;
                //console.log('video end');
                dispatcher.trigger('videoEnd');

                $.cookie('returnVisitor', '1', { expires:7, path:'/' });

            } else {

                if (!$video.is(':visible') && frame < endFrame - 2) {
                    $video.show();
                    video.muted = false;
                    //console.log('video start');
                    dispatcher.trigger('videoStart');
                }
            }


        }

        function initControls() {

            $('#pauseBtn', self.el).click(playPause);

            $('.gotoFrameBtn', document).live('click',
                function (evt) {
                    evt.preventDefault();
                    //time.play();
                    time.gotoAndPlay($(this).data('frame'));
                    dispatcher.trigger('videoStart');
                });

            $('#minusBtn', self.el).click(
                function () {
                    time.gotoAndStop(time.getCurrentFrame() - 1);
                });

            $('#plusBtn', self.el).click(
                function () {
                    time.gotoAndStop(time.getCurrentFrame() + 1);
                });

            $('#backBtn', self.el).click(
                function () {
                    time.gotoAndPlay(time.getCurrentFrame() - 24);
                });
            $('#forwardBtn', self.el).click(
                function () {
                    time.gotoAndPlay(time.getCurrentFrame() + 24);
                });
            $('#muteBtn', self.el).click(toggleMute);

            $('#zoomBtn', self.el).click(toggleZoom);

            $("#container").dblclick(function (event) {
                if (event.target == $('#container')[0]) toggleZoom();
            });


        }

        function toggleZoom() {
            zoomed = !zoomed;
            updateZoom();
            $(window).resize();

        }

        function toggleMute() {
            var btn = $(this);
            btn.toggleClass('selected');
            video.muted = btn.hasClass('selected');
            btn.text(video.muted ? 'Unmute' : 'Mute');
        }

        function playPause() {
            if (video.paused) {
                time.play();
            } else {
                time.pause();
            }
        }


        function updateZoom() {

            if (zoomed) {
                holder.css({zoom:$(window).width() / 960});
                $('#container').addClass('zoomed');
            } else {
                holder.css({zoom:1.0});
                $('#container').removeClass('zoomed');

            }

        }


    });