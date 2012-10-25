/// <reference path="../../../reference.js" />
var ScoreManager = new function () {

    var _scoreLabels = [];
    var _scoreText = {};
    this.score = 0;
    var _ctx = {};

    this.combo = 0;

    this.onResize = function () {
        _scoreText.style.top = StageReference.stageHeight - 110 + "px";
        _scoreText.style.left = StageReference.stageWidth - 240 + "px";
    }

    this.init = function (ctx) {
        _ctx = ctx;
        _scoreText = DisplayObjectUtil.create("p");
        DisplayObjectUtil.addTo(_scoreText, StageReference.getLayer("scene2D"));
        this.changeColor("#777");
        _scoreText.style.width = "200px";
        _scoreText.style.textAlign = "right";
        _scoreText.style.fontFamily = "Allan";
        _scoreText.style.fontSize = "20px";
        _scoreText.style.fontWeight = "bold";
        _scoreText.style.opacity = 0;
    }

    this.changeColor = function (color) {
        _scoreText.style.color = color;
    }

    this.reset = function () {
        ScoreManager.score = 0;
        ScoreManager.combo = 0;
        _scoreText.innerHTML = "SCORE: 0";
    }

    this.show = function () {
        EKTweener.to(_scoreText.style, 1, 0, { opacity: 1 });
    }
    this.hide = function () {
        EKTweener.to(_scoreText.style, 1, 0, { opacity: 0 });
    }

    this.addScore = function (s, x, y) {
        var found = false;
        var addScore = s;
        this.combo = s > 0 ? this.combo + 1 : 0;

        if (this.combo > 4) addScore += (this.combo - 4) * 20;
        if (addScore > 300) addScore = 300;

        /* find if there is any inactive ball*/
        for (var i = 0; i < _scoreLabels.length; i++) {
            if (!_scoreLabels[i].active) {
                found = true;
                _scoreLabels[i].reset(addScore, x, y);
                break;
            }
        }
        if (!found) {
            _scoreLabels.push(new ScoreLabel(addScore, x, y));
        }
        _scoreText.innerHTML = "SCORE: " + (ScoreManager.score += addScore);
    }

    this.getScore = function () {
        var encodedScore = ScoreManager.score < 0 ? ScoreManager.score - 1 : ScoreManager.score + 1;
        if (!Game.isPlaying) ScoreManager.score = 0;
        return encodedScore;
    }

    this.update = function () {
        var label;
        var alpha = 0;
        //_ctx.font = "18px PT Sans Narrow";
        _ctx.font = "bold 28px Allan";
        _ctx.lineWidth = 1;

        for (var i = 0; i < _scoreLabels.length; i++) {
            label = _scoreLabels[i];
            if (label.active) {
                label.y += (label.ty - label.y) * .03;
                if (label.y - label.ty > .1) {
                    alpha = (label.y - label.ty) / 40;
                    _ctx.fillStyle = "rgba(" + label.colorShadow + "," + alpha * .3 + ")";
                    _ctx.fillText(label.s, label.x + 3, label.y + 3);
                    _ctx.fillStyle = "rgba(" + label.colorFill + "," + alpha + ")";
                    _ctx.fillText(label.s, label.x, label.y);
                    //_ctx.strokeStyle = "rgba(" + label.colorLine + "," + alpha + ")";
                    //_ctx.strokeText(label.s, label.x, label.y);

                } else {
                    label.active = false;
                }
            }
        }
    }
}

function ScoreLabel(s,x,y){
    this.active = true;
    this.s;
    this.x;
    this.y;
    this.ty;
    this.colorFill = "";
    this.colorShadow = "";

    this.reset = function (s, x, y) {
        this.active = true;
        this.s = s > 0 ? "+" + s : s;
        this.x = x;
        this.y = y;
        this.ty = y - 40;
        this.colorFill = s<0?"255,0,0":"0,255,255";
        this.colorShadow = s < 0 ? "50,0,0" : "0,50,50";
    }
    this.reset(s, x, y);
}