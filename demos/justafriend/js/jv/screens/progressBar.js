define(['underscore', 'bumpslide/view', 'bumpslide/canvasUtil', 'jv/media', 'bumpslide/animation', 'toxi/geom/Circle'], function (_, view, canvasUtil, media, animation, Circle) {

    return function () {

        var canvas,
            ctx,
            //anim = animation(render),
            pad = 4,
            percent = 0,
            currentPercent = 0,
            cutOff = 0,
            gradient;


        var self = view.extend({
            template:'<canvas class="progress_bar" width="221" height="14">',
            name:'progressBar',
            onInit:onInit,
            onShow:onShow,
            onHide:onHide,
            transitionIn:function (onComplete) {
                self.el.stop(true, true).hide().fadeIn(300, 'easeOutQuad', function () {
                    if (onComplete) onComplete.call(self);
                });
            },
            transitionOut:function (onComplete) {
                self.el.stop(true, true).fadeOut(150, 'easeInQuad', function () {
                    clearCanvas();
                    if (onComplete) onComplete.call(self);
                });
            },

            // public function setPercent( pct [0-1.0] )
            setPercent:function (pct) {
                percent = Math.max(0, Math.min(1.0, pct));
                render();
            },
            setCutOff: function ( val ) {
                cutOff = val;
                render();
            }
        });

        function onInit() {
            canvas = self.el[0];
            ctx = canvas.getContext('2d');

            // setup gradient from blue to pink
            gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            //gradient.addColorStop(0, '#c9358a');
            gradient.addColorStop(0, '#297ee5');
            gradient.addColorStop(1.0, '#c9358a');
        }

        function onShow() {

            // reset
            percent = 0;

            // run
            //anim.run();
        }

        function onHide() {

            // stop running
            //anim.pause();
        }


        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // rendered on animationFrame to keep it smooth
        function render() {

            clearCanvas();

            currentPercent += (percent-currentPercent) * .1;
            var w = canvas.width, h = canvas.height;
            var fill = Math.max(6, currentPercent * (w - 2 * pad));

            // draw white bar
            ctx.fillStyle = 'rgba(255,255,255,.9)';
            canvasUtil.drawRoundRect(ctx, 0, 0, w, h, 6, true, false);

            // draw inner bar with gradient
            ctx.fillStyle = gradient;

            var rx = false ? (w-fill)/2 : pad; // centered?
            canvasUtil.drawRoundRect(ctx, rx, pad, fill, h - 2 * pad, 3, true, false);

            // draw cut-off line
            if(cutOff>0) {
                ctx.fillStyle = 'rgba(0,0,0,.4)';
                ctx.fillRect(Math.round(pad + cutOff*(w - 2 * pad)), 0, 1, h );
            }

        }


        return self;

    };


});