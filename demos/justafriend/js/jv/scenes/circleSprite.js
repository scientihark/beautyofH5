define(['underscore', 'bumpslide/view', 'bumpslide/canvasUtil', 'jv/media', 'bumpslide/animation', 'toxi/geom/Circle'], function (_, view, canvasUtil, media, animation, Circle) {

    return function () {

        var canvas, ctx;
        var circleGrey, circleRed, ticks;
        var anim = animation(render);
        var mouse = { x:0, y:0 };

        var _tick = 0;
        var _tickInterval = -1;
        var _hits = [];
        var _over = false;
        var _score = 0;
        var _circle = new Circle(35, 35, 33);
        var _alpha = 0;
        var _targetAlpha = 0;


        var self = view.extend({
            template:'<canvas id="circle_sprite" width="72" height="73">',
            name:'circleSprite',
            onInit:onInit,
            onShow:onShow,
            onHide:onHide,
            getMouseLoc: function() {
                return mouse;
            }
        });


        function onInit() {
            canvas = self.el[0];
            ctx = canvas.getContext('2d');
            circleGrey = media.getImage('img/circleGrey.png');
            circleRed = media.getImage('img/circleRed.png');
            ticks = media.getImage('img/tick.png');
        }

        function onShow() {

            // reset
            _hits = [];
            _tick = -1;
            _score = 0;
            _over = false;
            _alpha = 0;
            _targetAlpha = 0;

            // run
            anim.run();
            clearInterval(_tickInterval);
            _tickInterval = setInterval(tick, 7000 / 24);

            // watch the mouse
            // binding this here breaks something in IE10
            $(document).bind('mousemove', onMouseMove);
            $(document).bind('MSPointerMove',onMouseMove);

            self.el.stop(true, true).hide().fadeIn(500, 'easeOutQuad');
        }

        function onHide() {
            // clear
            //clearCanvas();

            // stop running
            anim.pause();
            clearInterval(_tickInterval);

            // stop watching mouse
            $(document).unbind('mousemove', onMouseMove);
            $(document).unbind('MSPointerMove', onMouseMove);

            self.el.stop(true, true).fadeOut(500, 'easeInQuad', function () {
                clearCanvas();
            });
        }

        /**
         * On mouse move, save the mouse loc relative to the page
         */
        function onMouseMove(e) {
            if(e.type === "MSPointerMove"){                
                e.originalEvent.preventMouseEvent();
                mouse.x = e.originalEvent.pageX;
                mouse.y = e.originalEvent.pageY;
            }else{
                mouse.x = e.pageX;
                mouse.y = e.pageY;
            }
            doHitTest();
        }        

        /**
         * Check whether or not the mouse is inside the hit area and update the _over state
         */
        function doHitTest() {
            var offset = self.el.offset();
            var mousePos = { x:mouse.x - offset.left, y:mouse.y - offset.top };
            _over = _circle.containsPoint(mousePos);

            // alpha is how much gray we want
            _targetAlpha = _over ? 1.0 : 0.0;
            if (_over) _hits[_tick] = 1;
        }

        function getScore() {
            return _.reduce(_hits, function (memo, num) {
                return memo + num;
            }, 0) / 24;
        }

        function tick() {
            _tick++;

            if (_tick >= 24) {
                clearInterval(_tickInterval);
                _score = _.reduce(_hits, function (memo, num) {
                    return memo + num;
                }, 0) / 24;
                //console.log('score', _score);
                self.trigger('score', _score);
                return;
            }
            _hits[_tick] = 0;
            if (_over) _hits[_tick] = 1;
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // rendered on animationFrame to keep it smooth
        function render() {
            var i;

            clearCanvas();

            // do hit test on every render incase it has moved and the mouse was still
            doHitTest();

            // draw bottom ticks
            for (i = 0; i < _tick; i++) drawTick(i);

            // draw color layer and border
            _alpha += (_targetAlpha - _alpha) * .05;

            // partially grey
            ctx.globalAlpha = _alpha;
            ctx.drawImage(circleGrey, 0, 0);

            // partially red
            ctx.globalAlpha = 1 - _alpha;
            ctx.drawImage(circleRed, 0, 0);

            // draw hit ticks
            ctx.globalAlpha = 1;
            for (i = 0; i < _tick; i++) if (_hits[i]) drawTick(i);

        }

        // draw a single tick from the sprite sheet
        function drawTick(n) {
            if (tickData[n] == undefined) return;
            var pos = tickData[n];
            ctx.drawImage(ticks, -pos.left, -pos.top, pos.w, pos.h, pos.x, pos.y, pos.w, pos.h);
        }

        var tickData = [
            {left:-16, top:-71, w:10, h:7, x:36, y:5},
            {left:-18, top:-28, w:18, h:11, x:36, y:4},
            {left:-2, top:-21, w:14, h:13, x:48, y:6},
            {left:-16, top:-41, w:12, h:15, x:52, y:11},
            {left:-42, top:-56, w:10, h:13, x:57, y:18},
            {left:-54, top:-67, w:8, h:9, x:60, y:27},
            {left:-54, top:-2, w:8, h:19, x:60, y:37},
            {left:-30, top:-45, w:10, h:15, x:57, y:41},
            {left:-2, top:-2, w:14, h:17, x:53, y:42},
            {left:-2, top:-53, w:12, h:13, x:49, y:52},
            {left:-36, top:-2, w:16, h:13, x:41, y:54},
            {left:-18, top:-17, w:22, h:9, x:36, y:59},
            {left:-38, top:-34, w:20, h:9, x:16, y:59},
            {left:-42, top:-45, w:16, h:9, x:15, y:58},
            {left:-18, top:-2, w:16, h:13, x:10, y:53},
            {left:-2, top:-68, w:12, h:11, x:8, y:49},
            {left:-42, top:-17, w:10, h:15, x:5, y:43},
            {left:-54, top:-56, w:8, h:9, x:4, y:36},
            {left:-54, top:-23, w:8, h:9, x:5, y:27},
            {left:-42, top:-71, w:10, h:11, x:5, y:19},
            {left:-2, top:-36, w:12, h:15, x:7, y:9},
            {left:-16, top:-58, w:12, h:11, x:13, y:8},
            {left:-30, top:-62, w:10, h:11, x:20, y:5},
            {left:-54, top:-78, w:8, h:7, x:28, y:5}
        ];

        return self;

    };


});