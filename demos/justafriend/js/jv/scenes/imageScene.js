define(['underscore', 'bumpslide/view', 'jv/media'], function (_, view, media) {

    return function (src) {

        var img;

        var self = view.extend({
            template:'<div class="scene HD" id="image_scene_' + src + '"></div>',
            name:'imageScene',
            onInit:onInit,
            onShow:onShow,
            onHide:onHide
        });

        return self;

        function onInit() {
            img = media.getImage('img/'+src);
            self.el.append(img);
        }

        function onShow() {
        }

        function onHide() {
        }

    };
});



