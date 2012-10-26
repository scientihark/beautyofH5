define(['underscore', 'bumpslide/view', 'jv/media', 'jv/dispatcher'], function (_, view, media, dispatcher) {

    return function (img_src, x, y, width, height, default_frame, coordinates /* null */) {

        if (x == undefined) x = 0;
        if (y == undefined) y = 0;
        if (width == undefined) width = 0;
        if (height == undefined) height = 0;
        if (default_frame == null) default_frame = 0;

        var img, canvas, ctx, currentFrame = default_frame, renderedFrame = -1;

        // custom jquery easing function with much subtler elasticity [see var K (.95 instead of default .3)]
        $.easing.easeOutElasticSmooth = function(f,h,e,l,k){var i=1.70158;var K=0.95;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}
        if(!j){j=k*K}if(g<Math.abs(l)){g=l;var i=j*.15}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e};

        var self = view.extend({
            mediaReady:false,
            template:'<canvas class="imageSprite overlay" />',
            name:'imageSprite',
            onInit:onInit,
            transitionIn:function (onComplete) {
                //console.log('showing image sprite ', img_src, default_frame);
                render();
                self.el.stop(true, true).show().css({top:y+100}).animate({top:y}, 600, 'easeOutElasticSmooth', function () {
                    if (onComplete) onComplete.call(self);
                });
            },
            transitionOut:function (onComplete) {
                //console.log('hiding image sprite ', img_src, default_frame);
                self.el.stop(true, true).delay(10).animate({top:y+100}, 100, 'easeInQuint', function () {
                    if (onComplete) onComplete.call(self);
                });
            },
            bind:function (f) {
                return _.bind(f, this);
            },
            clearCanvas:function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            },

            canvas:function () {
                return canvas;
            },

            // 0-based
            gotoFrame:function (f) {
                currentFrame = f;
                render();
            }

        });

        return self;

        function onInit() {
            canvas = self.el[0];
            ctx = canvas.getContext('2d');
            img = media.getImage('img/' + img_src);
            dispatcher.bind('mediaLoadComplete', function () {
                self.mediaReady = true;
                render();
            });
        }

        function render() {

            //console.log('render', img.src, 0, currentFrame * height, width, height, 0, 0, width, height);

            if(ctx==null) return;

            ctx.globalAlpha = 1.0;// + .2 * (Math.sin( +new Date / 1000 ) + 1 ) / 2;

            try {

                self.el.css({top:y, left:x});

                if(currentFrame==renderedFrame) return;

                renderedFrame = currentFrame;

                if(coordinates) {

                    var f = Math.max(0, Math.min( coordinates.length-1, currentFrame) );
                    var pos = coordinates[f];

                    //console.log( 'draw frame ', f, pos);

                    if(pos==undefined) {
                        canvas.width = 1;
                        canvas.height = 1;
                        return;
                    }

                    canvas.width = pos.w;
                    canvas.height = pos.h;

                    ctx.drawImage(img, -pos.left, -pos.top, pos.w, pos.h, 0, 0, pos.w, pos.h);

                } else {
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, currentFrame * height, width, height, 0, 0, width, height);
                }

            } catch (e) {}




        }

    };
});



