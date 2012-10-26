define(['underscore', 'bumpslide/view', 'jv/media', 'jv/facebook', 'bumpslide/canvasUtil', 'jv/dispatcher', 'jv/projection', 'quasimondo/stackBlur'],
    function (_, view, media, facebook, canvasUtil, dispatcher, projection, stackBlur) {


        // static

        var DEG_TO_RAD = Math.PI / 180;

        return function (id) {

            var stage = canvasUtil.create(960, 540);
            var wall_img;
            var userName = "Fred Jones";
            var mediaReady = false;

            var self = view.extend({
                template:'<div class="scene HD" id="phone_screen_'+id+'"></div>',
                name:'phoneScreenProjection',
                onInit:onInit,
                onShow:onShow,
                onHide:onHide
            });



            function onInit() {
                wall_img = media.getImage('img/phoneZoom0'+id+'c.png');
                //wall_img = media.getImage('img/phoneZoom02c_guide.jpg');

                facebook.bind('username', setUserName, true);
                dispatcher.bind('mediaLoadComplete', onMediaReady);
            }

            function setUserName(val) {
                userName = val;
                render();
            }

            function getDisplayName() {
                if(userName==null) return "";
                var names = userName.split(' ');
                var label = names[0];
                if(names.length>1) {
                    label += ' ' + names[names.length-1].substr(0,1);
                }
                return label;
            }

            function onMediaReady() {
                mediaReady = true;
                render();
            }

            function skew(skewX, skewY) {
                skewX = skewX * DEG_TO_RAD;
                skewY = skewY * DEG_TO_RAD;
                return [ Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), 0, 0];
            }

            function render() {

                if (!mediaReady) return;

                // render to stage
                var ctx = stage.getContext('2d');
                var w = stage.width;
                var h = stage.height;

                // black background
                ctx.fillRect(0, 0, w, h);
                ctx.save();

                if (id == 2) {

                    ctx.translate(299, 240);
                    ctx.transform.apply(ctx, skew(33.5, 16.5));
                    ctx.scale(.733, .66);
                    ctx.rotate(0.005);
                    ctx.font = "32px Segoe,Trebuchet,Arial,sans-serif";
                    ctx.fillStyle = "rgba(255,255,255,.9)";
                    ctx.fillText(getDisplayName(), 4, 33, 400);
                    stackBlur(stage, .6);
                } else {
                    ctx.translate(501, 68);
                    ctx.transform.apply(ctx, skew(34, 18));
                    ctx.scale(1.06, .92);
                    ctx.rotate(0.003);
                    ctx.font = "38px Segoe,Trebuchet,Arial,sans-serif";
                    ctx.fillStyle = "#fff";
                    ctx.fillText(getDisplayName(), 0, 50, 400);
                    stackBlur(stage, 1.0);
                }

                ctx.restore();

                // draw overlay
                ctx.save();
                //ctx.globalAlpha = .5;
                ctx.drawImage(wall_img, 0, 0);
                ctx.restore();


            }

            function onShow() {
                self.el.append(stage);
            }

            function onHide() {
                self.el.children().remove();
            }

            return self;

        };
    });



