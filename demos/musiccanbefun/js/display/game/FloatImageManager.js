/// <reference path="../../../reference.js" />
var FloatImageManager = new function () {
    //var _cache

    var _birds = [];
    var _notes = [];

    var _categorys = [_birds, _notes];
    var _index = -1;
    this.life = 0;

    var AMOUNT = 7;

    this.useBlack = true;

    this.loadAssets = function (imagePath, svgpng) {
        var floatImage;
        for (var i = 0; i < AMOUNT; i++) {
            _birds.push(floatImage = new FloatImage());
            EKLoader.add(imagePath + "bird_" + i + "_b" + svgpng, floatImage.addBlackImage);
            EKLoader.add(imagePath + "bird_" + i + "_w" + svgpng, floatImage.addWhiteImage);

            _notes.push(floatImage = new FloatImage());
            EKLoader.add(imagePath + "note_" + i + "_b" + svgpng, floatImage.addBlackImage);
            EKLoader.add(imagePath + "note_" + i + "_w" + svgpng, floatImage.addWhiteImage);
        }
    }

    this.create = function (x, y) {
        _index = _index + 1 == _categorys.length ? 0 : _index + 1;
        for (var i = 0; i < AMOUNT; i++) {
            _categorys[_index][i].reset(x, y);
        }
        FloatImageManager.life = 150;
    }
    this.draw = function (ctx) {
        if (FloatImageManager.life > 0) {
            for (var i = 0; i < AMOUNT; i++) {
                _categorys[_index][i].draw(ctx, FloatImageManager.useBlack);
            }
            FloatImageManager.life--;
        }
    }
}

function FloatImage() {
    var _white = {};
    var _black = {};
    var _x = 0;
    var _y = 0;
    var _vx = 0;
    var _vy = 0;
    var _tvx = 0;
    var _tvy = 0;
    var _px = 0;
    var _py = 0;
    var _angle = 0;
    
    var _offsetX = 0;
    var _offsetY = 0;

    this.addWhiteImage = function (imageSource) {
        _white = imageSource.source;
        _offsetX= -_white.width>>1;
        _offsetY= -_white.height>>1;
    }
    this.addBlackImage = function (imageSource) {
        _black = imageSource.source;
    }


    this.reset = function (x, y) {
        _px = 0;
        _py = 0;
        _x = x;
        _y = y;
        _angle = 0;
        _vx = 20 + Math.random() * 20;
        _vy = Math.random() * 10 - 5;
        _tvx = -20 - Math.random() * 20;
        _tvy = Math.random() * 30 - 15;
    }

    this.draw = function (ctx, isBlack) {
        _vx += (_tvx - _vx) * .02;
        _vy += (_tvy - _vy) * .02;
        _x += _vx;
        _y += _vy;
        _angle += (Math.atan2(_y - _py, _x - _px) - _angle) * .2;
        ctx.save();
        ctx.translate(_x, _y);
        ctx.rotate(_angle);
        ctx.drawImage(isBlack ? _black : _white, -_offsetX, -_offsetY);
        ctx.restore();
        _px = _x;
        _py = _y;
    }
}