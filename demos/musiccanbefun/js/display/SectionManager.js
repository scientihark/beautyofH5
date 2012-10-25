/// <reference path="../../reference.js" />
var SectionManager = new function () {

    var _sections = [];
    var _container = [];
    this.container = [];
    this.isAnimating = false;

    var _current = null;

    var _onResize = function () {
        _container.style.left = StageReference.stageWidth * .5 + "px";
        _container.style.top = StageReference.stageHeight * .5 + "px";
    }

    this.init = function () {

        _container = DisplayObjectUtil.create("div");
        _container.style.opacity = 1;
        this.container = _container;
        DisplayObjectUtil.addTo(_container, StageReference.getLayer("section"));

        StageReference.registerStageResizeFunc(_onResize);
    }

    this.addSection = function (sectionButton, target) {
        sectionButton.sectionId = target.sectionId = _sections.length;
        sectionButton.style.opacity = .7;
        sectionButton.addEventListener("mouseover", _onButtonMouseOver, false);
        sectionButton.addEventListener("mouseout", _onButtonMouseOut, false);
        sectionButton.addEventListener("click", _onButtonClick, false);
        _sections.push([sectionButton, target]);
    }

    var _onButtonMouseOver = function (e) {
        if (SectionManager.isAnimating || _current == _sections[e.target.sectionId][1]) return;
        MusicManager.playMouseOver();
        EKTweener.to(e.target.style, .5, 0, { opacity: 1 });
    }
    var _onButtonMouseOut = function (e) {
        if (SectionManager.isAnimating) return;
        EKTweener.to(e.target.style, .5, 0, { opacity: .7 });
    }
    var _onButtonClick = function (e) {
        if (SectionManager.isAnimating || _current == _sections[e.target.sectionId][1]) return;
        SectionManager.show(_sections[e.target.sectionId][1]);
    }

    this.show = function (target) {
        if (SectionManager.isAnimating) return;
        if (Game.isPlaying && !Game.isPaused) Game.pauseGame();
        SectionManager.setAnimated(true);
        if (_current) {
            _hide(_current);
            _current = target;
        } else {
            _current = target;
            SectionManager.hideComplete();
        }
    }

    this.hide = function (target) {
        if (SectionManager.isAnimating) return;
        _hide(target);
    }
    var _hide = function (target) {
        SectionManager.setAnimated(true);

        if (target == null) _current.hide(); else target.hide();
        _current = null;
        EKTweener.to(Line, 2, 0, { width: 0 });
    }


    this.hideComplete = function () {
        if (_current) {
            SectionManager.setAnimated(true);
            Line.changeSection(_current);
            EKTweener.to(Line, 2, 0, { width: Line.targetWidth });
            _current.show();
        } else {
            SectionManager.setAnimated(false);

            if (Game.isPlaying) Game.resumeGame(); else Game.startGame();
        }
    }
    this.showComplete = function () {
        SectionManager.setAnimated(false);
    }

    this.setAnimated = function (f) {
        if (SectionManager.isAnimating == f) return;
        var i = 0;
        SectionManager.isAnimating = f;
        if (f) {
            for (i = 0; i < _sections.length; i++) {
                _sections[i][0].style.cursor = "default";
                EKTweener.killTweensOf(_sections[i][0].style);
                EKTweener.to(_sections[i][0].style, .5, 0, { opacity: .7 });
            }
        } else {
            for (i = 0; i < _sections.length; i++) {
                _sections[i][0].style.cursor = _current == null ? "pointer" : i == _current.sectionId ? "default" : "pointer";
            }
        }
        if (SectionManager.isAnimating) MouseBlocker.show(); else if (Preloader.percentage == 1) MouseBlocker.hide();
    }

}