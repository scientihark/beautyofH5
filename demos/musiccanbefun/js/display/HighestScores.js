/// <reference path="../../reference.js" />
var HighestScores = new function () {

    var _header = '<table width="200" border="0" cellpadding="0" cellspacing="2"><tr style="color:#666"><td>NAME</td><td>SCORE</td></tr>';
    var _footer = '</table>';

    this.name = "Nobody";
    this.score = 0;

    var READ_PATH = "get_scores.php";

    this.LINE_TOP = "-20px";
    this.LINE_LEFT = "-20px";
    this.LINE_ANGLE = 70;
    this.LINE_WIDTH = 280;

    var TESTING = true;
    var WIDTH = 650;
    var HEIGHT = 500;

    var _container = {};
    var _content = {};
    var _table = {};

    var _isLoading = false;


    this.init = function () {
        _container = DisplayObjectUtil.create("div");
        _container.style.display = "none";
        DisplayObjectUtil.addTo(_container, SectionManager.container);

        _container.style.top = -WIDTH * .5 + "px";
        _container.style.left = -HEIGHT * .5 + "px";

        _content = DisplayObjectUtil.create("div");
        _content.style.left = "10px";
        _content.style.opacity = 0;
        DisplayObjectUtil.addTo(_content, _container);

        var contentBG = DisplayObjectUtil.create("canvas");
        contentBG.setAttribute("width", 340);
        contentBG.setAttribute("height", 340);
        var contentBG_ctx = contentBG.getContext("2d");
        contentBG_ctx.fillStyle = "#FFF";
        contentBG_ctx.beginPath();
        contentBG_ctx.arc(170, 170, 170, 0, Math.PI * 2, true);
        contentBG_ctx.fill();
        contentBG_ctx.strokeStyle = "#e5e5e5";
        contentBG_ctx.fillStyle = "#f6f6f6";
        contentBG_ctx.beginPath();
        contentBG_ctx.arc(170, 170, 160, 0, Math.PI * 2, true);
        contentBG_ctx.fill();
        contentBG_ctx.stroke();
        DisplayObjectUtil.addTo(contentBG, _content);

        var contentText = document.getElementById("highest_scores");
        DisplayObjectUtil.addTo(contentText, _content);
        contentText.style.display = "inline";

        _table = document.getElementById("highest_scores_table");
    }

    this.show = function () {
        Preloader.show();
        Preloader.container.style.top = "-160px";
        Preloader.container.style.left = "110px";
        _content.style.top = "150px";
        _getData();
        _container.style.display = "inline";
        EKTweener.to(_content.style, 2.5, 0, { opacity: 1, top: 185, suffix: { top: "px" }, onUpdate: Line.redraw, onComplete: function () { SectionManager.showComplete(); } });

    }
    this.hide = function () {
        Preloader.hide();
        EKTweener.to(_content.style, 2.5, 0, { opacity: 0, top: 210, suffix: { top: "px" }, onUpdate: Line.redraw, onComplete: function () { SectionManager.hideComplete(); _container.style.display = "none"; } });
    }


    var _getData = function () {
        if (_isLoading) return;
        _table.style.opacity = 0;
        var xmlhttp;
        var link = READ_PATH + "?t=" + (new Date()).getTime() + "&n=" + EnterName.name + "&s=" + ScoreManager.getScore();
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = xmlhttpChange;
            xmlhttp.open("GET", link, true);
            xmlhttp.send(null);
        } else if (window.ActiveXObject) {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            if (xmlhttp) {
                xmlhttp.onreadystatechange = xmlhttpChange;
                xmlhttp.open("GET", link, true);
                xmlhttp.send();
            }
        }

        function xmlhttpChange() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    _table.innerHTML = _header + xmlhttp.responseText + _footer;
                    EKTweener.to(_table.style, 1, 0, { opacity: 1 });
                }
            }
        }
    };


}