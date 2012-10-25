/// <reference path="../../reference.js" />
var AssetManager = new function () {

    var IMAGE_PATH = "images/";
    var MUSIC_PATH = "audios/";
    //var SONG_PATH = "audios/";
    var SONG_PATH = "audios/";

    this.preload = function () {
        
        /* firefox 3.6 doesnt support svg as image */
        var svgpng = ".svg";
        var arr = navigator.userAgent.toString().toLowerCase().split("firefox/");
        if (arr.length > 1) if (parseInt(arr[1][0]) < 4) svgpng = ".png";

        EKLoader.resetListeners(Preloader.setPercentage, _onLoaded);
        TimeScale.loadAssets(IMAGE_PATH);
        MusicManager.load(IMAGE_PATH, MUSIC_PATH, SONG_PATH);
        WhatIsThis.loadAssets(IMAGE_PATH);
        BackgroundManager.loadImages(IMAGE_PATH, svgpng);
        BakedImageManager.loadAssets(IMAGE_PATH);
        FloatImageManager.loadAssets(IMAGE_PATH, svgpng);
        EKLoader.start();
    };
    var _onLoaded = function () {
        TimeScale.init();
        MusicManager.init();
    };

}