/// <reference path="../../../reference.js" />
var TimeScale = new function () {


    /* @private */
    var SCALE_IMAGE_FILENAME = "scale.png";
    var BAR_HEIGHT = 8;
    var TIME_WIDTH = 50;

    var _container;
    var _scale;
    var _bar;
    //var _timer;

    var _smoothWidth = 0;
    var _durationText = "";

    /* @public */



    var _render = function () {

    };
    var _onResize = function () {
        _scale.style.width = StageReference.stageWidth + "px";
    };

    this.loadAssets = function (imagesPath) {
        EKLoader.add(imagesPath + SCALE_IMAGE_FILENAME, _onLoaded);
    };
    var _onLoaded = function (imageSource) {
        _container = DisplayObjectUtil.create("div");
        DisplayObjectUtil.addTo(_container, BottomBar.container);

        _bar = DisplayObjectUtil.create("div");
        _bar.style.backgroundColor = "#ff007e";
        _bar.style.top = -BAR_HEIGHT + "px";
        _bar.style.width = "0px";
        _bar.style.height = BAR_HEIGHT + "px";
        DisplayObjectUtil.addTo(_bar, _container);

        _scale = DisplayObjectUtil.create("div");
        _scale.style.backgroundImage = "url(" + imageSource.url + ")";
        _scale.style.top = "-11px";
        _scale.style.height = "11px";
        DisplayObjectUtil.addTo(_scale, _container);

        StageReference.registerStageResizeFunc(_onResize);
    };

    this.init = function () {
        StageReference.registerRenderFunc(_update);
    };

    var _update = function () {
        var current = MusicManager.currentTime;
        var duration = MusicManager.duration;
        _smoothWidth += (current / duration * StageReference.stageWidth - _smoothWidth) * .2;

        _bar.style.width = _smoothWidth + "px";
    }

    var _getTimeText = function (t) {
        return ~ ~(t / 60) + ":" + ((~ ~t) % 60 < 10 ? "0" : "") + (~ ~t) % 60;
    }
}