/// <reference path="../../../reference.js" />
var BakedImageManager = new function () {
    //var _cache

    var _inks = [];
    var _inkId = 0;

    this.useBlack = true;

    this.loadAssets = function (imagePath) {
        var bakedImage;
        for (var i = 0; i < 4; i++) {
            _inks.push(bakedImage = new BakedImage());
            EKLoader.add(imagePath + "ink_" + i + ".png", bakedImage.addImage, null, null, null, 10);
        }
    }

    this.drawInk = function (ctx, x, y) {
        _inks[_inkId].draw(BakedImageManager.useBlack, ctx, x, y, 0)
        _inkId = _inkId + 1 == _inks.length ? 0 : _inkId + 1;
    }
}

function BakedImage() {
    var _white = {};
    var _black = {};
    var _offsetX = 0;
    var _offsetY = 0;

    this.addImage = function (imageSource) {
        _black = imageSource.source;
        _white = DisplayObjectUtil.create("canvas");
        _white.setAttribute("width", _black.width);
        _white.setAttribute("height", _black.height);
        _offsetX = -_black.width >> 1;
        _offsetY = -_black.height >> 1;
        var _white_ctx = _white.getContext("2d");
        _white_ctx.drawImage(_black, 0, 0);
        CanvasUtil.tintCanvasCtx(_white_ctx, 255, 255, 255, 0, 0, _white.width, _white.height);
    }

    this.draw = function (isBlack, ctx, x, y, r) {
        if (r == null) {
            ctx.drawImage(isBlack ? _black : _white, x + _offsetX, y + _offsetY);
        } else {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(r);
            ctx.drawImage(isBlack ? _black : _white, _offsetX, _offsetY);
            ctx.restore();
        }
    }
}