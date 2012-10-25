/// <reference path="../../reference.js" />
var Line = new function () {

    var _canvas = {};
    var _ctx = {};

    this.width = 0;
    this.targetWidth = 0;

    this.init = function () {
        _canvas = DisplayObjectUtil.create("canvas");
        _canvas.setAttribute("height", 1);
        _ctx = _canvas.getContext("2d");
        DisplayObjectUtil.addTo(_canvas, SectionManager.container);
    }

    this.changeSection = function (sectionClass) {
        _canvas.setAttribute("width", Line.targetWidth = sectionClass.LINE_WIDTH);
        _canvas.style.top = sectionClass.LINE_TOP;
        _canvas.style.left = sectionClass.LINE_LEFT;
        _ctx.clearRect(0, 0, this.targetWidth, 1);
        _canvas.style[StageReference.isFF ? "MozTransform" : StageReference.browserPrefix + "transform"] = "rotate(" + sectionClass.LINE_ANGLE + "deg)";
    }

    this.redraw = function () {
        _ctx.clearRect(0, 0, Line.targetWidth, 1);
        _ctx.fillStyle = "#d1d1d1";
        _ctx.fillRect(0, 0, Line.width, 1);
    }
}