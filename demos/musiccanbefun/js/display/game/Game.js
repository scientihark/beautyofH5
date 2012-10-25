/// <reference path="../../../reference.js" />
var Game = new function () {

    /* canvas variables */
    var _canvas = {};
    this.canvas = {};
    var _ctx = {};

    var _count = 0;

    this.isPlaying = false;
    this.isPaused = false;
    this.isEnd = false;

    this.frequency = 1;
    var _frequencyCount = 0;

    var canvasX = 0;
    var canvasY = 0;

    var _width = 0;
    var _height = 0;
    var _length = 0;

    var _spotlightGradient = {};
    var _spotlightOpacity = 0;
    var _spotlightOpacityTarget = .25;
    this.spotlightR = 0;
    this.spotlightG = 0;
    this.spotlightB = 0;

    var _mouseX = 0;
    var _mouseY = 0;
    var _mouseScreenOffsetX = 0;
    var _mouseScreenOffsetY = 0;

    /* the X Y point of the head of the thickest ink */
    this.pointX = 0;
    this.pointY = 0;

    var _speedX = -12;
    var _speedY = 0;
    this.shakeFactor = 0;


    var _onResize = function () {

        /* update canvas width and height */
        _width = StageReference.stageWidth;
        _height = StageReference.stageHeight - TopBar.HEIGHT - BottomBar.HEIGHT;
        _canvas.setAttribute("width", _width);
        _canvas.setAttribute("height", _height);

        _length = MathUtil.getXYLength(_width, _height) >> 1;

        /* update managers stage size */
        CanvasManager.onResize(_width, _height);
        BallManager.onResize(_width, _height);
        ScoreManager.onResize(_width, _height);
        BackgroundManager.onResize(_width, _height);

        if (!Game.isPaused) {
            StageReference.render();
        } else {
            //_drawspotlight();
            StageReference.render();
        }

    };



    var _onMouseMove = function (e) {
        if (e && !Game.isEnd) {
            _mouseX = e.clientX - canvasX;
            _mouseY = e.clientY - canvasY - TopBar.HEIGHT;
            StageReference.calculateMouseXYCenterRatio(e.clientX, e.clientY);
            CanvasManager.setXY(_mouseX, _mouseY);
            _mouseScreenOffsetX = StageReference.mouseXCenterRatio * 5;
            _mouseScreenOffsetY = StageReference.mouseYCenterRatio * 5;
        }
    }

    this.init = function () {
        //create main canvas.
        _canvas = DisplayObjectUtil.create("canvas");
        _canvas.setAttribute("class", "canvas");
        _canvas.setAttribute("onSelectStart", "this.style.cursor='default'; return false;");
        _canvas.style.top = TopBar.HEIGHT + "px";
        this.canvas = _canvas;

        DisplayObjectUtil.addTo(_canvas, StageReference.getLayer("scene2D"));
        _ctx = _canvas.getContext("2d");

        CanvasManager.init(_ctx);
        BallManager.init(_ctx);
        ScoreManager.init(_ctx);
        BackgroundManager.init(_ctx);

        window.addEventListener('mousemove', _onMouseMove, false);
        StageReference.registerStageResizeFunc(_onResize);



        StageReference.onResize();
    }

    this.startGame = function () {

        if (EnterName.name == "") {
            EnterName.show();
            return;
        }
        EKTweener.killTweensOf(_canvas.style);
        _canvas.style.opacity = 1;
        StageReference.registerRenderFunc(this.render);
        Game.isPlaying = true;
        Game.isPaused = false;
        Game.isEnd = false;
        ScoreManager.reset();
        ScoreManager.show();
        SubtitleManager.show();

        MusicManager.reset();
        CanvasManager.changeColor(0, 0, 0);
        CanvasManager.beatColor = "rgba(0,0,0,.06)";
        CanvasManager.beatLighter = false;
        SubtitleManager.changeColor("#777");
        ScoreManager.changeColor("#777");
        BakedImageManager.useBlack = true;
        FloatImageManager.useBlack = true;
        BackgroundManager.setBackground(0);

        MusicManager.play();
    }

    this.pauseGame = function () {
        MusicManager.pause();
        StageReference.deregisterRenderFunc(this.render);
        _onResize();
        SubtitleManager.hide();
        ScoreManager.hide();
        Game.isPaused = true;
    }

    this.resumeGame = function () {
        MusicManager.resume();
        StageReference.registerRenderFunc(this.render);
        SubtitleManager.show();
        ScoreManager.show();
        Game.isPaused = false;
    }
    this.endGame = function () {
        SubtitleManager.hide();
        ScoreManager.hide();
        Game.isPaused = false;
        Game.isPlaying = false;
        Game.isEnd = true;
        EKTweener.to(_canvas.style, 1, 0, { opacity: 0, onComplete: function () { StageReference.deregisterRenderFunc(this.render); } });
        YourScore.show();
    }


    this.render = function () {
        if (Game.shakeFactor > .01) Game.shakeFactor += -Game.shakeFactor * .03;
        var speedX = _speedX + (Game.shakeFactor > .01 ? (Math.random() - .5) * Game.shakeFactor * 2 : 0);
        var speedY = _speedY + (Game.shakeFactor > .01 ? (Math.random() - .5) * Game.shakeFactor * 2 : 0);
        _mouseScreenOffsetX += (StageReference.mouseXCenterRatio * 5 - _mouseScreenOffsetX) * .02;
        _mouseScreenOffsetY += (StageReference.mouseYCenterRatio * 5 - _mouseScreenOffsetY) * .02;

        //_ctx.clearRect(0, 0, _width, _height)
        BackgroundManager.draw((speedX - _mouseScreenOffsetX) * .7, (speedY - _mouseScreenOffsetY) * .7);

        /* update the objects which marked on the canvas */
        CanvasManager.update(~ ~(speedX - _mouseScreenOffsetX), ~ ~(speedY - _mouseScreenOffsetY));

        /* update upper objects here. */

        if (!Game.isEnd) {
            if (_count % ~ ~(40 / Game.frequency) == 0) {
                if (_frequencyCount++ % 2 == 0) {
                    BallManager.addBlueBall();
                } else {
                    BallManager.addRedBall();
                }
            }
        }
        BallManager.update(speedX, speedY - _mouseScreenOffsetY);
        ScoreManager.update();

        _drawspotlight();
        _count++;
    }
    var _drawspotlight = function () {
        Game.spotlightR += -Game.spotlightR * .01;
        Game.spotlightG += -Game.spotlightG * .01;
        Game.spotlightB += -Game.spotlightB * .01;
        _spotlightOpacity += (_spotlightOpacityTarget - _spotlightOpacity) * .02;
        _spotlightGradient = _ctx.createRadialGradient(_width >> 1, _height >> 1, 0, _width >> 1, _height >> 1, _length);
        _spotlightGradient.addColorStop(0, "rgba(" + ~ ~Game.spotlightR + "," + ~ ~Game.spotlightG + "," + ~ ~Game.spotlightB + ",0)");
        _spotlightGradient.addColorStop(1, "rgba(" + ~ ~Game.spotlightR + "," + ~ ~Game.spotlightG + "," + ~ ~Game.spotlightB + "," + _spotlightOpacity + ")");
        _ctx.fillStyle = _spotlightGradient;
        _ctx.fillRect(0, 0, _width, _height);
    }
}