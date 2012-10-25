/// <reference path="../../reference.js" />
var BottomBar = new function () {

    var _container;
    this.container = {}; ;

    this.HEIGHT = 60;

    var _render = function () {

    };
    var _onResize = function () {
        _container.style.width = StageReference.stageWidth + "px";
        _container.style.top = (StageReference.stageHeight - BottomBar.HEIGHT) + "px";
    };

    /* @public */
    this.init = function () {
        _container = document.getElementById("bottom");
        DisplayObjectUtil.removeItself(_container);
        DisplayObjectUtil.addTo(_container, StageReference.getLayer("top"));

        DisplayObjectUtil.removeItself(_container);
        DisplayObjectUtil.addTo(_container, StageReference.getLayer("top"));

        StageReference.registerStageResizeFunc(_onResize);

        this.container = _container;
    }

    this.show = function () {
        _container.style.display = "inline";
        _container.style.margin = this.HEIGHT + "px 0px";
        EKTweener.to(_container.style, 1, 0, { margin: 0, suffix: { margin: "px 0px"} });
    }
}