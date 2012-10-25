/// <reference path="../../../reference.js" />
function Ribbon(canvas_ctx, radius_min, radius_scale, t, length) {

    var _canvas_ctx = canvas_ctx;
    var _points = [];
    var _index = 0;

    var _previousAngle = 0;

    var _radius_min = radius_min;
    var _radius_scale = radius_scale;
    var _t = t;
    var _length = length;

    var _p0_x = 0;
    var _p0_y = 0;
    var _p0_radius = 0;
    var _p0_p0x = 0;
    var _p0_p0y = 0;
    var _p0_p1x = 0;
    var _p0_p1y = 0;

    var _p1_x = 0;
    var _p1_y = 0;
    var _p1_radius = 0;
    var _p1_p0x = 0;
    var _p1_p0y = 0;
    var _p1_p1x = 0;
    var _p1_p1y = 0;

    var _p2_x = 0;
    var _p2_y = 0;
    var _p2_p0x = 0;
    var _p2_p0y = 0;
    var _p2_p1x = 0;
    var _p2_p1y = 0;
    var _p2_c0x = 0;
    var _p2_c0y = 0;
    var _p2_c1x = 0;
    var _p2_c1y = 0;

    var _p3_p0x = 0;
    var _p3_p0y = 0;
    var _p3_p1x = 0;
    var _p3_p1y = 0;

    var _vx = 0;
    var _vy = 0;

    var _sparks = [];
    var SPEAKS_AMOUNT = 15;

    var _beatRadiuses = [0, 0, 0];

    for (var m = 0; m < SPEAKS_AMOUNT; m++) {
        _sparks[m] = new RibbionSpark();
    }

    this.updateAndDrawCache = function (cache_ctx, tx, ty, t, dl, speedX, speedY) {
        _t += t;
        var x = tx + Math.cos(_t) * _length;
        var y = ty + Math.sin(_t) * _length;
        var distance = MathUtil.getXYLength(x - _p0_x, y - _p0_y);
        var radius = radius_scale * Math.pow(1 - distance / CanvasManager.maxDistance, 20) + 4 * radius_scale * dl;
        if (radius < 0) radius = 0;
        radius += radius_min;

        /* shift data */
        _p3_p0x = _p2_p0x + speedX;
        _p3_p0y = _p2_p0y + speedY;
        _p3_p1x = _p2_p1x + speedX;
        _p3_p1y = _p2_p1y + speedY;

        _p2_x = _p1_x + speedX;
        _p2_y = _p1_y + speedY;
        _p2_p0x = _p1_p0x + speedX;
        _p2_p0y = _p1_p0y + speedY;
        _p2_p1x = _p1_p1x + speedX;
        _p2_p1y = _p1_p1y + speedY;

        _p1_x = _p0_x + speedX;
        _p1_y = _p0_y + speedY;
        _p1_radius = _p0_radius;

        /* set data */
        _p0_x += _vx = (x - _p0_x) * .1 + _vx * .7;
        _p0_y += _vy = (y - _p0_y) * .1 + _vy * .7;
        _p0_radius = radius;
        var angle = -Math.atan2(_p0_x - _p1_x, _p0_y - _p1_y);
        _p0_p0x = _p0_x - radius * Math.cos(angle);
        _p0_p0y = _p0_y - radius * Math.sin(angle);
        _p0_p1x = _p0_x * 2 - _p0_p0x;
        _p0_p1y = _p0_y * 2 - _p0_p0y;

        /* the law of cosine */
        var a = MathUtil.getXYLength(_p1_x - _p2_x, _p1_y - _p2_y);
        var b = MathUtil.getXYLength(_p2_x - _p0_x, _p2_y - _p0_y);
        var c = MathUtil.getXYLength(_p0_x - _p1_x, _p0_y - _p1_y);

        var baAngle = Math.atan2(_p0_y - _p1_y, _p0_x - _p1_x);
        var bcAngle = Math.atan2(_p2_y - _p1_y, _p2_x - _p1_x);
        var shortestAngle = bcAngle - baAngle;
        if (shortestAngle > Math.PI) shortestAngle -= Math.PI * 2;
        if (shortestAngle < -Math.PI) shortestAngle += Math.PI * 2;

        angle = (shortestAngle > 0 ? baAngle : bcAngle + Math.PI) + Math.acos((a * a - b * b + c * c) / (2 * a * c)) / 2;

        /* to prevert repeated position */
        if (isNaN(angle)) {
            angle = _previousAngle
        } else {
            _previousAngle = angle;
        }

        _p1_p0x = _p1_x + _p1_radius * Math.cos(angle);
        _p1_p0y = _p1_y + _p1_radius * Math.sin(angle);
        _p1_p1x = _p1_x * 2 - _p1_p0x;
        _p1_p1y = _p1_y * 2 - _p1_p0y;

        distance = MathUtil.getXYLength(_p1_p0x - _p2_p0x, _p1_p0y - _p2_p0y) * .5;
        angle = Math.atan2(_p1_p0y - _p3_p0y, _p1_p0x - _p3_p0x);
        _p2_c0x = _p2_p0x + Math.cos(angle) * distance;
        _p2_c0y = _p2_p0y + Math.sin(angle) * distance;

        distance = MathUtil.getXYLength(_p1_p1x - _p2_p1x, _p1_p1y - _p2_p1y) * .5;
        angle = Math.atan2(_p1_p1y - _p3_p1y, _p1_p1x - _p3_p1x);
        _p2_c1x = _p2_p1x + Math.cos(angle) * distance;
        _p2_c1y = _p2_p1y + Math.sin(angle) * distance;


        cache_ctx.beginPath();
        cache_ctx.moveTo(_p2_p0x, _p2_p0y);
        cache_ctx.quadraticCurveTo(_p2_c0x, _p2_c0y, _p1_p0x, _p1_p0y);
        cache_ctx.lineTo(_p1_p1x, _p1_p1y);
        cache_ctx.quadraticCurveTo(_p2_c1x, _p2_c1y, _p2_p1x, _p2_p1y);
        cache_ctx.fill();
        cache_ctx.stroke();
    }

    this.updateThickestPointXY = function (offset) {
        Game.pointX = _p0_x + offset;
        Game.pointY = _p0_y + offset;
    }
    this.getPointX = function () {
        return _p0_x;
    }
    this.getPointY = function () {
        return _p0_y;
    }

    this.drawCanvas = function (speedX, speedY, drawBeat) {

        _canvas_ctx.beginPath();
        _canvas_ctx.moveTo(_p1_p0x + speedX, _p1_p0y + speedY);
        _canvas_ctx.lineTo(_p0_p0x + speedX, _p0_p0y + speedY);
        _canvas_ctx.lineTo(_p0_p1x + speedX, _p0_p1y + speedY);
        _canvas_ctx.lineTo(_p1_p1x + speedX, _p1_p1y + speedY);
        _canvas_ctx.fill();
        _canvas_ctx.stroke();


        _canvas_ctx.beginPath();
        _canvas_ctx.arc(_p0_x + speedX, _p0_y + speedY, _p0_radius, 0, Math.PI * 2, false);
        _canvas_ctx.fill();


        /* draw Beat halo */
        if (!drawBeat) return;

        var targetBeat = MusicManager.level * 150;
        _canvas_ctx.save();
        if (CanvasManager.beatLighter) _canvas_ctx.globalCompositeOperation = "lighter";
        _canvas_ctx.fillStyle = CanvasManager.beatColor;
        for (var i = 0; i < 3; i++) {
            _canvas_ctx.beginPath();
            _beatRadiuses[i] += (MusicManager.level * (100 + i * 20) - _beatRadiuses[i]) * .2 * i;
            _canvas_ctx.arc(_p0_x + speedX, _p0_y + speedY, _beatRadiuses[i], 0, Math.PI * 2, false);
            _canvas_ctx.fill();
            if (targetBeat <= _beatRadiuses[i] + 2) _beatRadiuses[i] = 0;
        }


        for (i = 0; i < SPEAKS_AMOUNT; i++) {
            if (_sparks[i].life-- <= 0) _sparks[i].reset(_p0_x + speedX, _p0_y + speedY);
            _sparks[i].draw(_canvas_ctx);
        }

        _canvas_ctx.restore();

    }


}
function RibbionSpark() {

    var _x = 0;
    var _y = 0;
    var _vx = 0;
    var _vy = 0;
    var _radius = 0;

    this.life = -1;

    this.reset = function (x, y) {
        _x = x;
        _y = y;
        _radius = 5 + Math.random() * 15;
        _vx = Math.random() * 6 - 3;
        _vy = Math.random() * 6 - 3;
        this.life = 5 * ~ ~(Math.random() * 15);
    }

    this.draw = function (ctx) {
        ctx.save();
        ctx.globalAlpha = this.life / 20;
        ctx.beginPath();
        ctx.arc(_x += _vx, _y += _vy, _radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();
    }
}