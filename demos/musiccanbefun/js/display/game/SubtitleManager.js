/// <reference path="../../../reference.js" />

var SubtitleManager = new function () {

    var _container = {};
    var _previousLine = {};
    var _currentLine = {};
    var _nextText = "";
    var _isChanging = false;


    var CONTAINER_OFFSET_Y = -140;
    var TRANSITION_OFFSET_Y = 30;

    var DURATION = .5;

    var _onResize = function () {
        _container.style.left = StageReference.stageWidth * .5 + "px";
        _container.style.top = StageReference.stageHeight + CONTAINER_OFFSET_Y + "px";
    }

    this.init = function () {
        _container = DisplayObjectUtil.create("div");
        DisplayObjectUtil.addTo(_container, StageReference.getLayer("scene2DOverlay"));

        _currentLine = DisplayObjectUtil.create("div");
        _previousLine = DisplayObjectUtil.create("div");

        _currentLine.style.width = _previousLine.style.width = 500 + "px";
        _currentLine.style.left = _previousLine.style.left = -250 + "px";
        _currentLine.style.textAlign = _previousLine.style.textAlign = "center";
        _currentLine.style.height = _previousLine.style.height = "40px";
        _currentLine.style.fontFamily = _previousLine.style.fontFamily = "Allan";
        _currentLine.style.fontSize = _previousLine.style.fontSize = "24px";
        _currentLine.style.fontWeight = _previousLine.style.fontWeight = "bold";
        this.changeColor("#777");

        _previousLine.setAttribute("onMouseOver", DisplayObjectUtil.defaultMouseText);
        _currentLine.setAttribute("onMouseOver", DisplayObjectUtil.defaultMouseText);
        _previousLine.setAttribute("onSelectStart", DisplayObjectUtil.defaultMouseText);
        _currentLine.setAttribute("onSelectStart", DisplayObjectUtil.defaultMouseText);

        DisplayObjectUtil.addTo(_currentLine, _container);
        DisplayObjectUtil.addTo(_previousLine, _container);
        StageReference.registerStageResizeFunc(_onResize);
    }

    this.changeColor = function (color) {
        _currentLine.style.color = _previousLine.style.color = color;
    }

    this.show = function () {
        EKTweener.to(_container.style, DURATION, 0, { opacity: 1 });
    }
    this.hide = function () {
        EKTweener.to(_container.style, DURATION, 0, { opacity: 0 });
    }
    this.changeSubtitle = function (str) {
        _nextText = str;
        if (!_isChanging) _change();
    }
    var _change = function () {
        if (_currentLine.innerHTML != _nextText) {
            _isChanging = true;
            EKTweener.killTweensOf(_previousLine.style);
            _previousLine.innerHTML = _currentLine.innerHTML;
            _previousLine.style.top = "0px";
            _previousLine.style.opacity = 1.0;
            EKTweener.to(_previousLine.style, DURATION, 0, { opacity: 0, top: -TRANSITION_OFFSET_Y, suffix: { top: "px"} });


            EKTweener.killTweensOf(_currentLine.style);
            _currentLine.innerHTML = _nextText;
            _currentLine.style.top = TRANSITION_OFFSET_Y + "px";
            _currentLine.style.opacity = 0;
            EKTweener.to(_currentLine.style, DURATION, 0, { opacity: 1, top: 0, suffix: { top: "px" }, onComplete: _onChangeComplete });
        }
    }
    var _onChangeComplete = function () {
        _isChanging = false;
        _change();
    }

}