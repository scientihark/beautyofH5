// load share overlay


// composite into source canvas

define(['underscore', 'bumpslide/view', 'jv/media', 'jv/facebook', 'bumpslide/canvasUtil',
    'jv/dispatcher', 'jv/projection', 'quasimondo/stackBlur', 'jv/pics'],
    function (_, view, media, facebook, canvasUtil, dispatcher, projection, stackBlur, pics) {

        return function () {

            var modifiedShareImage;
            var mediaReady = false;

            var render = _.debounce( doRender, 100);

            var self = view.extend({
                template:'<canvas class="overlay modified" />',
                name:'modifiedShareOverlay',
                onInit:onInit,
                onShow: render,
                onHide: clear
            });


            function onInit() {

                //Modified share button
                modifiedShareImage = media.getImage('img/shareOverlay.png');   
                dispatcher.bind('mediaLoadComplete', onMediaReady);

            }

            function onMediaReady() {
                mediaReady = true;
                render();
            }

            function doRender() {

                if (modifiedShareImage && modifiedShareImage.width) {
                    self.el.css({top:443, left:0});
                    var ctx = self.el[0].getContext('2d');
                    ctx.drawImage( modifiedShareImage, 0, 0);


                } else {
                    //console.log('clear');

                }


            }

            function clear() {
                //if(proj) proj.clear();
                self.el[0].width = self.el[0].width;
            }

            return self;

        };

    });