/// <reference path="../../reference.js" />
var BrowserUtil = new function () {

    this.isSupportCanvas = !!document.createElement("canvas").getContext;
    var ctx = this.isSupportCanvas ? document.createElement("canvas").getContext("2d") : null;
    this.isSupportCanvasText = ctx == null ? false : typeof (ctx.fillText) == "function" ? true : false;
    this.isSupportVideo = !!document.createElement("video").canPlayType;
    this.isSupportAudio = !!document.createElement("audio").canPlayType;

}