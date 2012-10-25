/// <reference path="../../reference.js" />
var MouseBlocker = new function () {

    var _container = {};

    var _onResize = function () {
        _container.style.width = StageReference.stageWidth + "px";
        _container.style.height = StageReference.stageHeight + "px";
    }

    this.init = function () {

        _container = document.getElementById("mouseBlocker");
        DisplayObjectUtil.addTo(_container, StageReference.getLayer("mouseBlocker"));
        _container.addEventListener("mouseover", function () {  }, false);
        StageReference.registerStageResizeFunc(_onResize);
    }

    this.show = function () {
        _container.style.display = "inline";
    }
    this.hide = function () {
        _container.style.display = "none";
    }

}