/// <reference path="../../reference.js" />
var BlackOverlay = new function () {

    var _canvas = {};
    var _ctx = {};
    var _width = 0;
    var _height = 0;
    var _length = 0;
    var _gradient = {};

    this.opacity = 0;

    var _onResize = function () {
        _width = StageReference.stageWidth;
        _height = StageReference.stageHeight;
        _canvas.setAttribute("width", _width);
        _canvas.setAttribute("height", _height);
        _length = MathUtil.getXYLength(_width, _height) >> 1;

        if (_canvas.parentNode) _redraw();
    }

    this.init = function () {
        //create main canvas.
        _canvas = DisplayObjectUtil.create("canvas");
        _ctx = _canvas.getContext("2d");
        DisplayObjectUtil.addTo(_canvas, StageReference.getLayer("scene2DOverlay"));

        StageReference.registerStageResizeFunc(_onResize);

        this.show();
    }

    this.show = function () {
        EKTweener.killTweensOf(BlackOverlay);
        DisplayObjectUtil.addTo(_canvas);
        EKTweener.to(BlackOverlay, 2, 0, { opacity: .2, onUpdate: _redraw });
    }
    this.hide = function () {
        EKTweener.killTweensOf(BlackOverlay);
        EKTweener.to(BlackOverlay, 2, 0, { opacity: 0, onUpdate: _redraw, onComplete: function () { DisplayObjectUtil.removeItself(_canvas); } });
    }

    var _redraw = function () {
        _gradient = _ctx.createRadialGradient(_width >> 1, _height >> 1, 0, _width >> 1, _height >> 1, _length);
        _gradient.addColorStop(0, "rgba(0,0,0,0)");
        _gradient.addColorStop(1, "rgba(0,0,0," + BlackOverlay.opacity + ")");
        _ctx.clearRect(0, 0, _width, _height);
        _ctx.fillStyle = _gradient;
        _ctx.fillRect(0, 0, _width, _height);
    }
}