/// <reference path="../../../reference.js" />
var BallManager = new function () {

    var _sparks = [];
    var _balls = [];
    var _blueBalls = [];
    var _redBalls = [];
    var _ctx = {};

    var MAX_BALL_RADIUS = 40;
    var MIN_BALL_RADIUS = 15;

    /* screen left, right, bottom */
    var _sl = -MAX_BALL_RADIUS;
    var _sr = 0;
    var _st = -MAX_BALL_RADIUS;
    var _sb = 0;


    this.init = function (ctx) {
        _ctx = ctx;
    }

    this.onResize = function (w, h) {
        _sr = w + MAX_BALL_RADIUS;
        _sb = h + MAX_BALL_RADIUS;
    }

    this.addBlueBall = function () {
        _addBall(_blueBalls, true);
    }

    this.addRedBall = function () {
        _addBall(_redBalls, false);
    }

    var _addBall = function (arr, isBlue) {

        /* find if there is any inactive ball*/
        for (var i = 0; i < arr.length; i++) {
            if (!arr[i].active) {
                _resetBall(arr[i], isBlue);
                return;
            }
        }

        /* add a new ball*/
        var ball = new Ball(isBlue);
        _resetBall(ball);
        arr.push(ball);
        _balls.push(ball);
    }

    var _resetBall = function (ball) {
        ball.radius = 0;
        ball.radius_target = MIN_BALL_RADIUS + Math.random() * (MAX_BALL_RADIUS - MIN_BALL_RADIUS);
        ball.x = _sr;
        ball.y = _st + Math.random() * (_sb + MAX_BALL_RADIUS);
        ball.active = true;
    }

    this.killAllBalls = function () {
        for (var i = 0; i < arr.length; i++) {
            arr[i].active = false;
        }
    }

    this.update = function (offsetX, offsetY) {
        var ball;
        var gradient;
        for (var i = 0; i < _balls.length; i++) {
            ball = _balls[i];
            if (ball.active) {
                ball.x += offsetX;
                ball.y += offsetY;
                if (ball.isInside(Game.pointX, Game.pointY, 40) && !Game.isEnd) {
                    if (ball.isBlue) {
                        ScoreManager.addScore(100, Game.pointX, Game.pointY);

                        /* combo mode */
                        if (ScoreManager.combo > 4) {
                            CanvasManager.changeColor(255, 255, 255);
                            CanvasManager.beatColor = "rgba(0,255,255,.06)";
                            CanvasManager.beatLighter = true;
                            SubtitleManager.changeColor("#FFF");
                            ScoreManager.changeColor("#FFF");
                            BakedImageManager.useBlack = false;
                            FloatImageManager.useBlack = false;
                            BackgroundManager.setBackground(5);
                        } else {
                            CanvasManager.changeColor(0, 0, 0);
                            CanvasManager.beatColor = "rgba(0,0,0,.06)";
                            CanvasManager.beatLighter = false;
                            SubtitleManager.changeColor("#777");
                            ScoreManager.changeColor("#777");
                            BakedImageManager.useBlack = true;
                            FloatImageManager.useBlack = true;
                            BackgroundManager.setBackground(0);
                        }
                        Game.spotlightR = 0;
                        Game.spotlightG = 255;
                        Game.spotlightB = 255;
                    } else {
                        ScoreManager.addScore(-100, Game.pointX, Game.pointY);
                        CanvasManager.changeColor(255, 255, 255);
                        CanvasManager.beatColor = "rgba(255,255,0,.06)";
                        CanvasManager.beatLighter = true;
                        SubtitleManager.changeColor("#FFF");
                        ScoreManager.changeColor("#FFF");
                        BakedImageManager.useBlack = false;
                        FloatImageManager.useBlack = false;
                        BackgroundManager.setBackground(1);
                        Game.shakeFactor = 30;
                        Game.spotlightR = 255;
                        Game.spotlightG = 0;
                        Game.spotlightB = 0;
                    }

                    ball.active = false;
                } else if (ball.x > _sl) {
                    ball.radius += (ball.radius_target - ball.radius) * .05;
                    _ctx.beginPath();

                    gradient = _ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.radius);
                    gradient.addColorStop(.8, "rgba(" + ball.color + ",.7)");
                    gradient.addColorStop(.8, "rgba(" + ball.color + ",1)");
                    gradient.addColorStop(1, "rgba(" + ball.color + ",0)");
                    _ctx.fillStyle = gradient;

                    _ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
                    _ctx.fill();

                } else {
                    ball.active = false;
                }
            }
        }
    }
}


function Ball(isBlue) {

    this.isBlue = isBlue;
    this.color = isBlue? "0,255,255": "235,18,79";
    this.radius_target = 0;
    this.radius = 0;
    this.x = 0;
    this.y = 0;
    this.active = true;

    /* fast but not accurate, but who cares */
    this.isInside = function (x, y, radius) {
        return x - radius < this.x ? x + radius > this.x ? y - radius < this.y ? y + radius > this.y ? true : false : false : false : false;
    }
}
function BallSpark() {
    
}