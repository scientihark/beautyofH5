/// <reference path="../../reference.js" />
var YourScore = new function () {

    var _container = {};
    var _scoreText = {};
    this.tweenScore = 0;
    var _btn = {};

    var RADIUS = 100;

    var _onResize = function () {
        _container.style.left = StageReference.stageWidth * .5 + "px";
        _container.style.top = StageReference.stageHeight * .5 + "px";
    }

    this.init = function () {
        _container = DisplayObjectUtil.create("div");
        _container.style.display = "none";
        DisplayObjectUtil.addTo(_container, StageReference.getLayer("info"));
        _container.style.opacity = 0;


        var contentBG = DisplayObjectUtil.create("canvas");
        contentBG.setAttribute("width", RADIUS << 1);
        contentBG.setAttribute("height", RADIUS << 1);
        var contentBG_ctx = contentBG.getContext("2d");
        contentBG_ctx.fillStyle = "#FFF";
        contentBG_ctx.beginPath();
        contentBG_ctx.arc(RADIUS, RADIUS, RADIUS, 0, Math.PI * 2, true);
        contentBG_ctx.fill();
        contentBG_ctx.strokeStyle = "#e5e5e5";
        contentBG_ctx.fillStyle = "#f6f6f6";
        contentBG_ctx.beginPath();
        contentBG_ctx.arc(RADIUS, RADIUS, RADIUS - 10, 0, Math.PI * 2, true);
        contentBG_ctx.fill();
        contentBG_ctx.stroke();
        DisplayObjectUtil.addTo(contentBG, _container);
        contentBG.style.left = -RADIUS + "px";
        contentBG.style.top = -RADIUS + "px";

        var content = document.getElementById("your_score");
        DisplayObjectUtil.addTo(content, _container);
        content.style.display = "inline";


        _scoreText = document.getElementById("your_score_score");
        _btn = document.getElementById("your_score_btn");
        _btn.addEventListener("mouseover", _onMouseOver, false);
        _btn.addEventListener("mouseout", _onMouseOut, false);
        _btn.addEventListener("click", _onClick, false);


        StageReference.registerRenderFunc(_onResize);
    }

    this.show = function () {
        MouseBlocker.show();
        _container.style.display = "inline";
        EKTweener.to(_container.style, 1, 0, { opacity: 1 });
        YourScore.tweenScore = 0;
        EKTweener.to(YourScore, 1, 0, { tweenScore: ScoreManager.score, onUpdate: _updateScoreText });

    }

    var _updateScoreText = function () {
        _scoreText.innerHTML = ~~YourScore.tweenScore;
    }

    var _hide = function () {
        EKTweener.to(_container.style, 1, 0, { opacity: 0, onComplete: _hideComplete });
    }
    var _hideComplete = function () {
        _container.style.display = "none";
        MouseBlocker.hide();
        SectionManager.show(HighestScores);
        StageReference.deregisterStageResizeFunc(_onResize);
    }

    var _onMouseOver = function () {
        MusicManager.playMouseOver();
        _btn.style.opacity = 1;
    }

    var _onMouseOut = function () {
        _btn.style.opacity = .6;
    }

    var _onClick = function () {
        _hide();
    }
}