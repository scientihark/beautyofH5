/// <reference path="../../../reference.js" />
var BackgroundManager = new function () {

    var _ctx;
    var _backgrounds = [];
    var _current = {};
    this.id = 0;

    var _width = 0;
    var _height = 0;

    var _offsetX = 0;
    var _offsetY = 0;

    var _count = 0;

    this.init = function (ctx) {
        _ctx = ctx;
        this.setBackground(0);
    }

    this.setBackground = function (id) {
        this.id = id;
        _current = _backgrounds[id];
        _current.updateCache(_width, _height);
    }

    this.onResize = function (w, h) {
        _current.updateCache(_width = w, _height = h);
    };

    this.loadImages = function (imagesPath, svgpng) {
        _backgrounds.push(new Background(imagesPath + "paper_texture.jpg"));

        /* 1-4 are for monster animation */
        _backgrounds.push(new Background(imagesPath + "monster_0" + svgpng)); // left
        _backgrounds.push(new Background(imagesPath + "monster_1" + svgpng)); // middle
        _backgrounds.push(new Background(imagesPath + "monster_2" + svgpng)); // right
        _backgrounds.push(_backgrounds[2]); // middle 

        _backgrounds.push(new Background(imagesPath + (StageReference.isFF?"star_sky.png":"star_sky.svg")));
    };

    this.draw = function (offsetX, offsetY) {
        if (this.id > 0 && this.id < 5){
            if (_count++ % 10 == 0) {
                this.setBackground(this.id=this.id+1==5?1:this.id+1);
            }
        }
        _offsetX += _offsetX + offsetX < -_current.srcWidth ? offsetX + _current.srcWidth : _offsetX + offsetX > 0 ? offsetX - _current.srcWidth : offsetX;
        _offsetY += _offsetY + offsetY < -_current.srcHeight ? offsetY + _current.srcHeight : _offsetY + offsetY > 0 ? offsetY - _current.srcHeight : offsetY;
        _ctx.drawImage(_current.cache, _offsetX, _offsetY);
        
    }

}

function Background(filename) {
    var _this = this;
    var _src = {};
    var _pattern = {}
    
    this.cache = {};
    this.ctx = {};
    
    this.srcWidth = 0;
    this.srcHeight = 0;

    this.width = 0;
    this.height = 0;

    var PAPER_WIDTH = 200;
    var PAPER_HEIGHT = 200;

    var _pw = 0;
    var _ph = 0;


    var _onLoaded = function (imageSource) {
        _src = CanvasUtil.createCache(imageSource.source, 0, 0, _this.srcWidth = imageSource.source.width, _this.srcHeight = imageSource.source.height);
        _pattern = _src.getContext("2d").createPattern(_src, 'repeat');
        _this.cache = DisplayObjectUtil.create("canvas");
        _this.ctx = _this.cache.getContext("2d");
        
    }

    this.updateCache = function (w, h) {
        if (_pw == w && _ph == h) return;
        _this.cache.setAttribute("width", _this.width = (Math.ceil(w / _this.srcWidth) + 1) * _this.srcWidth);
        _this.cache.setAttribute("height", _this.height = (Math.ceil(h / _this.srcHeight) + 1) * _this.srcHeight);
        _this.ctx.fillStyle = _pattern;
        _this.ctx.fillRect(0, 0, _this.width, _this.height);
        _pw = w;
        _ph = h;
    }

    EKLoader.add(filename, _onLoaded);
}