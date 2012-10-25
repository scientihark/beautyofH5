/// <reference path="../../../reference.js" />
var CanvasManager = new function () {

    var _cache0 = {};
    var _cache0_ctx = {};
    var _cache1 = {};
    var _cache1_ctx = {};

    var _current_cache = {};
    var _current_cache_ctx = {};
    var _previous_cache = {};
    var _previous_cache_ctx = {};

    var _isCache0 = true;
    var _canvas_ctx = {};
    var _ribbons = [];

    this.mouseX = 0;
    this.mouseY = 0;
    this.maxDistance = 0;

    var _gameWidth = 0;
    var _gameHeight = 0;
    var _width = 0;
    var _height = 0;
    var _previousX = 0;
    var _previousY = 0;

    var previousSpeedX = 0;
    var previousSpeedY = 0;

    var NUM_OF_RIBBONS = 5;
    var T_SPEED = .05;
    var EDGE_OFFSET = 150; // buffer, has to be integer.

    this.beatColor = "rgba(0,0,0,.06)";
    this.beatLighter = false;

    var RIBBONS_DATA = [
        [5, 20, 0, 0],
        [0, 4, 90 * MathUtil.DEGREE_TO_RAD, 10],
        [1, 5, 180 * MathUtil.DEGREE_TO_RAD, 15],
        [2, 8, 270 * MathUtil.DEGREE_TO_RAD, 20],
        [0, 7, 360 * MathUtil.DEGREE_TO_RAD, 25],
    //[radius_min, radius_scale, default angle, length]
    ]

    var _penColor = "#000";
    var _penR = 0;
    var _penG = 0;
    var _penB = 0;

    this.changeColor = function (r, g, b) {

        if (_penR == r || _penG == g || _penB == b) return;
        _penR = r;
        _penG = g;
        _penB = b;
        _penColor = "rgb(" + r + "," + g + "," + b + ")";

        /* change the color marked objects and ink trace on the cache canvas */
        CanvasUtil.tintCanvasCtx(_current_cache_ctx, r, g, b, 0, 0, _width, _height);
    }

    this.init = function (ctx) {
        _cache0 = DisplayObjectUtil.create("canvas");
        _cache0_ctx = _cache0.getContext("2d");
        _cache1 = DisplayObjectUtil.create("canvas");
        _cache1_ctx = _cache1.getContext("2d");

        _canvas_ctx = ctx;
        for (var i = 0; i < NUM_OF_RIBBONS; i++) {
            _ribbons[i] = new Ribbon(_canvas_ctx, RIBBONS_DATA[i][0], RIBBONS_DATA[i][1], RIBBONS_DATA[i][2], RIBBONS_DATA[i][3]);
        }

        _cache0_ctx.lineWidth = 1;
        _cache1_ctx.lineWidth = 1;
    }

    this.onResize = function (w, h) {
        _gameWidth = w;
        _gameHeight = h;
        _width = w + 2 * EDGE_OFFSET;
        _height = h + 2 * EDGE_OFFSET;

        this.maxDistance = MathUtil.getXYLength(_width, _height);

        _assignCache();

        _current_cache_ctx.clearRect(0, 0, _width, _height);
        _current_cache_ctx.drawImage(_previous_cache, 0, 0);

        _previous_cache.setAttribute("width", _width);
        _previous_cache.setAttribute("height", _height);
        _previous_cache_ctx.drawImage(_current_cache, 0, 0);

        _current_cache.setAttribute("width", _width);
        _current_cache.setAttribute("height", _height);

        _current_cache_ctx.drawImage(_previous_cache, 0, 0);
    }

    this.setXY = function (_x, _y) {
        this.mouseX = EDGE_OFFSET + _x;
        this.mouseY = EDGE_OFFSET + _y;
    }

    var _deltaLevel = 0;

    var _assignCache = function () {
        _previous_cache = _isCache0 ? _cache1 : _cache0;
        _previous_cache_ctx = _isCache0 ? _cache1_ctx : _cache0_ctx;
        _current_cache = _isCache0 ? _cache0 : _cache1;
        _current_cache_ctx = _isCache0 ? _cache0_ctx : _cache1_ctx;
    }

    this.update = function (speedX, speedY) {
        _assignCache();

        var i = 0;

        //_deltaLevel += (MusicManager.deltaLevel * .5 - _deltaLevel) * .2;
        _deltaLevel += (MusicManager.deltaLevel * .5 - _deltaLevel) * .2;
        _current_cache_ctx.clearRect(0, 0, _width, _height);
        _previous_cache_ctx.fillStyle = _penColor;
        _previous_cache_ctx.strokeStyle = _penColor;
        for (i = 0; i < NUM_OF_RIBBONS; i++) {
            _ribbons[i].updateAndDrawCache(_previous_cache_ctx, this.mouseX, this.mouseY, T_SPEED * (i % 2 == 0 ? -1 : 1), _deltaLevel, previousSpeedX, previousSpeedY);
        }
        /* update pointXY */
        _ribbons[0].updateThickestPointXY(-EDGE_OFFSET);
        if (!MusicManager.isEffect1Used) {
            BakedImageManager.drawInk(_previous_cache_ctx, _ribbons[0].getPointX(), _ribbons[0].getPointY());
            MusicManager.isEffect1Used = true;
            Game.shakeFactor = 10 + Math.random() * 15;
        }

        //_current_cache_ctx.globalAlpha = .98;
        /* tricky blur */
        //_current_cache_ctx.drawImage(_previous_cache, speedX - 1, speedY - 1, _width + 2, _height + 2);
        _current_cache_ctx.drawImage(_previous_cache, speedX, speedY);
        //_current_cache_ctx.globalAlpha = 1;
        _canvas_ctx.drawImage(_previous_cache, speedX - EDGE_OFFSET, speedY - EDGE_OFFSET);

        _canvas_ctx.fillStyle = _penColor;
        _canvas_ctx.strokeStyle = _penColor;
        _canvas_ctx.lineWidth = 1;
        for (i = 0; i < NUM_OF_RIBBONS; i++) {
            _ribbons[i].drawCanvas(speedX - EDGE_OFFSET, speedY - EDGE_OFFSET, i == 0);
        }

        if (!MusicManager.isEffect2Used) {
            FloatImageManager.create(_ribbons[0].getPointX() - EDGE_OFFSET, _ribbons[0].getPointY() - EDGE_OFFSET);
            MusicManager.isEffect2Used = true;
        }
        FloatImageManager.draw(_canvas_ctx);


        previousSpeedX = speedX;
        previousSpeedY = speedY;
        _isCache0 = !_isCache0;
    }
}