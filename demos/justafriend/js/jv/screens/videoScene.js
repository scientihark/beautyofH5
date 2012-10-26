define(['underscore', 'bumpslide/view', 'jv/media'], function (_, view, media) {

    return function (src) {

        var video;

        var self = view.extend({
            template:'<div class="scene HD" id="video_scene_' + src + '"></div>',
            name:'videoScene',
            onInit:onInit,
            onShow:onShow,
            onHide:onHide
        });

        return self;

        function onInit() {
            video = media.getVideo('video/live/' + src);
            //self.el.append(video);
        }

        function onShow() {
            try {
                video.currentTime = .01;
            } catch (e) {
            }
            video.play();
            self.el.append(video);
        }

        function onHide() {
            try {
                video.currentTime = .01;
            } catch (e) {
            }
            video.pause();
            self.el.children().remove();
        }

    };
});



