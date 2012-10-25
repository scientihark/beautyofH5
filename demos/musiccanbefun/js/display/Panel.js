/// <reference path="../../reference.js" />
var Panel = new function () {

    var _container = {};
    var _logo = {};
    var _clip = {};
    var _expandedRect = { l: 0, r: 0, t: 0, b: 0 };
    var COLLAPSED_HEIGHT = 80;
    var EXPANDED_HEIGHT = 247;
    var BORDER = 8;

    var _isOpened = false;

    var _onResize = function () {
        _container.style.left = StageReference.stageWidth - parseInt(_container.style.width) - 50 + "px";
        _expandedRect.l = parseInt(_container.style.left);
        _expandedRect.r = _expandedRect.l + parseInt(_container.style.width) + BORDER;
    }

    this.init = function () {
        _container = document.getElementById("panel");
        _logo = document.getElementById("panel_logo");
        _clip = document.getElementById("panel_clip");

        DisplayObjectUtil.removeItself(_container);
        DisplayObjectUtil.addTo(_container, StageReference.getLayer("scene2DOverlay"));
        StageReference.registerStageResizeFunc(_onResize);
        _expandedRect.t = parseInt(_container.style.top);
        _expandedRect.b = _expandedRect.t + EXPANDED_HEIGHT + BORDER;

        _logo.addEventListener("click", _onLogoClick, false);
    }

    var _onLogoClick = function (e) {
        if (_isOpened) {
            EKTweener.killTweensOf(_clip.style);
            EKTweener.killTweensOf(_container.style);
            var clipTween = EKTweener.to(_clip.style, 1, 0, { clip: COLLAPSED_HEIGHT, prefix: { clip: "rect(0px, 220px," }, suffix: { clip: "px, 0px)"} });
            clipTween.changeFrom("clip", EXPANDED_HEIGHT);
            EKTweener.to(_container.style, 1, 0, { height: COLLAPSED_HEIGHT, suffix: { height: "px"} });
        } else {
            MusicManager.playMouseOver();
            EKTweener.killTweensOf(_clip.style);
            EKTweener.killTweensOf(_container.style);
            var clipTween = EKTweener.to(_clip.style, 1, 0, { clip: 247, prefix: { clip: "rect(0px, 220px," }, suffix: { clip: "px, 0px)"} });
            _containerTween = clipTween.changeFrom("clip", COLLAPSED_HEIGHT);
            EKTweener.to(_container.style, 1, 0, { height: EXPANDED_HEIGHT, suffix: { height: "px"} });
        }
        _isOpened = !_isOpened;
    }

    this.show = function () {
        _container.style.top = _expandedRect.t - 120 + "px";
        _container.style.display = "inline";
        EKTweener.to(_container.style, 1.5, 0, { top: _expandedRect.t, suffix: { top: "px"}, ease: EKTweenFunc.easeOutBack });
    }


}