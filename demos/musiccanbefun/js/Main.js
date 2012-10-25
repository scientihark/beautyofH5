/// <reference path="../reference.js" />
var Main = new function () {
    /* @private */


    var _render = function () {

    };
    var _onResize = function () {
    };
    var _onLostFocus = function () {

    }
    /* @public */
    this.init = function () {
        /* firefox 3 is just too low */
        var isFFLowerThan4 = false;
        var arr = navigator.userAgent.toString().toLowerCase().split("firefox/");
        if (arr.length > 1) if (parseInt(arr[1][0]) < 4) isFFLowerThan4 = true;

        if (BrowserUtil.isSupportAudio && BrowserUtil.isSupportCanvasText && !isFFLowerThan4) {
            document.documentElement.style.overflowX = 'hidden';
            document.documentElement.style.overflowY = 'hidden';
            StageReference.init(document.getElementById("stage"), 60, false);
            StageReference.onResize();
            StageReference.addLayer("scene2D");
            StageReference.addLayer("scene2DOverlay");
            StageReference.addLayer("section");
            StageReference.addLayer("top");
            StageReference.addLayer("mouseBlocker");
            StageReference.addLayer("info");

            StageReference.registerStageResizeFunc(_onResize);

            MouseBlocker.init();
            SectionManager.init();
            Line.init();
            TopBar.init();
            BottomBar.init();
            BlackOverlay.init();
            SubtitleManager.init();
            Instruction.init();
            HighestScores.init();
            Preloader.init();
            Panel.init();

            EnterName.init();
            YourScore.init();

            SectionManager.show(Instruction);

            AssetManager.preload();
            StageReference.onResize();
            window.addEventListener('blur', _onLostFocus, false);

        } else {
            document.getElementById("stage").style.display = "none";
            document.getElementById("nohtml5").style.display = "inline";
        }
    }
}