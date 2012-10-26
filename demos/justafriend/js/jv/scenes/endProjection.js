// load overlay

// load facebook user image
// wait for facebook to be ready

// composite into source canvas

// project source to coordinates -24, 227, 211.5, 209,  233, 422.5, -1, 439

define(['underscore', 'bumpslide/view', 'jv/media', 'jv/facebook', 'bumpslide/canvasUtil',
    'jv/dispatcher', 'jv/projection', 'quasimondo/stackBlur', 'jv/pics'],
    function (_, view, media, facebook, canvasUtil, dispatcher, projection, stackBlur, pics) {

        return function () {

            var overlay_img, user_img, source_canvas, proj;
            var mediaReady = false;
            var corners = [
                [-24, 227],
                [211.5, 209],
                [-1, 439],
                [233, 422.5]
            ];

            var render = _.debounce( doRender, 100);

            var self = view.extend({
                template:'<canvas class="overlay" />',
                name:'endProjection',
                onInit:onInit,
                onShow: render,
                onHide: clear
            });

            function onInit() {
                overlay_img = media.getImage('img/end_photo.png');
                source_canvas = canvasUtil.create();

                //console.log('init', source_canvas, self.el[0]);

                proj = projection(source_canvas, self.el[0], corners, {
                    wireframe:false,
                    subdivisionLimit:3,
                    patchSize:16
                });
                facebook.bind('profile', onFacebookProfile, true);
                dispatcher.bind('mediaLoadComplete', onMediaReady);

            }

            function onFacebookProfile(profile) {
                if(profile && profile.picture) {
                    user_img = profile.picture;
                } else {
                    user_img = media.getImage('img/defaultPhotos/endPhoto.png');
                }
                render();
            }

            function onMediaReady() {
                mediaReady = true;
                render();
            }

            function doRender() {


                if (user_img && user_img.width && overlay_img && overlay_img.width) {


                    if (source_canvas == undefined) source_canvas = canvasUtil.create();

                    source_canvas.width = overlay_img.width;
                    source_canvas.height = overlay_img.height;

                    var cropped = canvasUtil.cropImage( user_img, overlay_img.width, overlay_img.height );

                    var ctx = source_canvas.getContext('2d');
                    ctx.drawImage( cropped, 0, 0);
                    ctx.drawImage( overlay_img, 0, 0);

                    facebook.setPicCanvas( source_canvas );
                    proj.update();


                } else {
                    //console.log('clear');
                    proj.clear();

                }

            }

            function clear() {
                if(proj) proj.clear();

            }

            return self;

        };

    });