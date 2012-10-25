/// <reference path="../../reference.js" />
var Preloader = new function () {


    /* @private */
    var _container = {};
    this.container = {};

    this.percentage = 0;
    var _preloaded = false;
    this.isAnimated = false;

    this.playTextOpacity = 1;

    this.outerRadius = 0;
    this.innerRadius = 0;
    this.mouseOverAngle = 0;

    var CANVAS_WIDTH = 150; // add some buffer for animation
    var CANVAS_HEIGHT = 150;
    var CANVAS_HALF_WIDTH = CANVAS_WIDTH >> 1;
    var CANVAS_HALF_HEIGHT = CANVAS_HEIGHT >> 1;

    this.init = function () {
        _container = DisplayObjectUtil.create("div");
        DisplayObjectUtil.addTo(_container, SectionManager.container);
        this.container = _container;

        _canvas = DisplayObjectUtil.create("canvas");
        _canvas.setAttribute("width", CANVAS_WIDTH);
        _canvas.setAttribute("height", CANVAS_HEIGHT);
        _ctx = _canvas.getContext("2d");
        DisplayObjectUtil.addTo(_canvas, _container);



        this.show();
    }

    this.show = function () {
        Preloader.mouseOverAngle = 0;
        _container.style.display = "inline";
        EKTweener.to(Preloader, 2, 0, { outerRadius: 55, ease: EKTweenFunc.easeOutBack });
        EKTweener.to(Preloader, 2.5, 0, { innerRadius: 45, onUpdate: _redraw, ease: EKTweenFunc.easeOutBack });
        if (_preloaded) EKTweener.to(Preloader, 2, 0, { playTextOpacity: 1 });
    }
    this.hide = function () {
        EKTweener.to(Preloader, 2, 0, { outerRadius: 0, ease: EKTweenFunc.easeInBack });
        EKTweener.to(Preloader, 2.5, 0, { innerRadius: 0, onUpdate: _redraw, ease: EKTweenFunc.easeInBack, onComplete: function () { _container.style.display = "none" } });
        if (_preloaded) EKTweener.to(Preloader, 2, 0, { playTextOpacity: 0 });
    }

    this.setPercentage = function (percentage) {
        EKTweener.to(Preloader, 2, 0, { percentage: percentage, onUpdate: _redraw, ease: EKTweenFunc.linear });
    }

    var _redraw = function () {
        if (!_preloaded && Preloader.percentage == 1) _onPreloaded();

        _ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        if (!_preloaded) {
            _ctx.fillStyle = "rgba(255,255,255,.3)";
            _ctx.beginPath();
            _ctx.arc(CANVAS_HALF_WIDTH, CANVAS_HALF_HEIGHT, Preloader.outerRadius, 0, Math.PI * 2, true);
            _ctx.fill();
        }

        _ctx.fillStyle = "#FFF";
        _ctx.beginPath();
        _ctx.moveTo(CANVAS_HALF_WIDTH, CANVAS_HALF_HEIGHT);
        _ctx.arc(CANVAS_HALF_WIDTH, CANVAS_HALF_HEIGHT, Preloader.outerRadius, Math.PI * 1.5, Math.PI * 1.5 + Math.PI * 2 * Preloader.percentage, false);
        _ctx.fill();

        _ctx.strokeStyle = "#e5e5e5";
        _ctx.fillStyle = "#f6f6f6";
        _ctx.beginPath();
        _ctx.arc(CANVAS_HALF_WIDTH, CANVAS_HALF_HEIGHT, Preloader.innerRadius, 0, Math.PI * 2, true);
        _ctx.fill();
        _ctx.stroke();

        if (_preloaded) {
            _ctx.fillStyle = "#000";
            _ctx.beginPath();
            _ctx.arc(CANVAS_HALF_WIDTH, CANVAS_HALF_HEIGHT, Preloader.innerRadius, Math.PI * (.25 - Preloader.mouseOverAngle), Math.PI * (.25 + Preloader.mouseOverAngle), false);
            _ctx.fill();
        }

        _ctx.font = "italic 20px Georgia";
        _ctx.textAlign = "center";
        var greyLevel = ~ ~(127 + Preloader.mouseOverAngle * 128);
        _ctx.fillStyle = "rgba(" + greyLevel + "," + greyLevel + "," + greyLevel + "," + Preloader.playTextOpacity + ")";
        _ctx.fillText(_preloaded ? Game.isPlaying ? "Resume" : "Play!" : parseInt(Preloader.percentage * 100) + "%", CANVAS_HALF_WIDTH, CANVAS_HALF_HEIGHT + 8);

    }

    var _onPreloaded = function () {
        EKTweener.killTweensOf(Preloader);
        _preloaded = true;
        TopBar.show();
        BottomBar.show();
        Game.init();
        StageReference.startRender();
        _canvas.style.cursor = "pointer";
        _canvas.addEventListener("mouseover", _onMouseOver, false);
        _canvas.addEventListener("mouseout", _onMouseOut, false);
        _canvas.addEventListener("click", _onClick, false);
        Panel.show();
        MouseBlocker.hide();
    }

    var _onMouseOver = function () {
        if (SectionManager.isAnimating) return;

        MusicManager.playMouseOver();
        EKTweener.to(Preloader, 1, 0, { mouseOverAngle: 1, onUpdate: _redraw });
        EKTweener.to(Preloader, 1, 0, { outerRadius: 40 });
        EKTweener.to(Preloader, .6, 0, { innerRadius: 60 });
    }

    var _onMouseOut = function () {
        if (SectionManager.isAnimating) return;

        MusicManager.playMouseOver();
        EKTweener.to(Preloader, 1, 0, { mouseOverAngle: 0, onUpdate: _redraw });
        EKTweener.to(Preloader, 1, 0, { outerRadius: 55 });
        EKTweener.to(Preloader, .6, 0, { innerRadius: 45 });

    }

    var _onClick = function () {
        SectionManager.hide();
    }

}