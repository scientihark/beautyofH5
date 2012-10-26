define(['underscore', 'bumpslide/view', 'bumpslide/canvasUtil'], function (_, view, canvasUtil) {

    return function () {

        var canvas,
            ctx,
            percent = 0;

        var self = view.extend({
            template:'<canvas id="circle_sprite" width="36" height="36">',
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
            }
        });

        function onInit() {
            canvas = self.el[0];
            ctx = canvas.getContext('2d');
        }

        function onShow() {
            // reset
            percent = 0;
        }

        function onHide() {

        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // rendered on animationFrame to keep it smooth
        function render() {

            var w = canvas.width,
                radius = w / 2 - 4,
                cx = w / 2,
                cy = w / 2,
                startingAngle = -Math.PI / 2; // -45 degrees (12 O'Clock)

            clearCanvas();

            // start from center
            ctx.save();
            ctx.translate(cx, cy);

            ctx.strokeStyle = 'rgba(255,255,255,.9)';
            ctx.fillStyle = 'rgba(255,255,255,.9)';
            ctx.lineWidth = 2;

            // outer circle
            ctx.beginPath();
            ctx.arc(0, 0, radius + 3, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.stroke();

            // inner clock face
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, startingAngle, startingAngle + percent * Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        }


        return self;

    }
});