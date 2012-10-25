/// <reference path="../../reference.js" />
var WhatIsThis = new function () {

    /* section variables */
    this.scetionId = 0;

    var _container = {};
    var _img_src = {};
    var _img = {};
    var _img_ctx = {};

    var _content = {};
    var _contact = {};

    var _imgWidth = 0;
    var _imgHeight = 0;
    var _mouseRatioX = 0;
    var _mouseRatioY = 0;

    this.LINE_TOP = "-30px";
    this.LINE_LEFT = "-220px";
    this.LINE_ANGLE = -70;
    this.LINE_WIDTH = 280;

    var WIDTH = 650;
    var HEIGHT = 500;

    this.loadAssets = function (imagePath) {
        EKLoader.add(imagePath + "mypic.png", _onLoaded);
    }

    var _onResize = function () {
        _mouseRatioCurrentX = 0;
        _mouseRatioCurrentY = 0;
    }

    var _onLoaded = function (imageSource) {

        _container = DisplayObjectUtil.create("div");
        _container.style.display = "none";
        DisplayObjectUtil.addTo(_container, SectionManager.container);
        _container.style.top = -WIDTH * .5 + "px";
        _container.style.left = -HEIGHT * .5 + "px";

        _content = DisplayObjectUtil.create("div");
        _content.style.top = "180px";
        _content.style.left = "200px";
        _content.style.opacity = 0;
        DisplayObjectUtil.addTo(_content, _container);

        var contentBG = DisplayObjectUtil.create("canvas");
        contentBG.setAttribute("width", 370);
        contentBG.setAttribute("height", 370);
        var contentBG_ctx = contentBG.getContext("2d");
        contentBG_ctx.fillStyle = "#FFF";
        contentBG_ctx.beginPath();
        contentBG_ctx.arc(185, 185, 185, 0, Math.PI * 2, true);
        contentBG_ctx.fill();
        contentBG_ctx.strokeStyle = "#e5e5e5";
        contentBG_ctx.fillStyle = "#f6f6f6";
        contentBG_ctx.beginPath();
        contentBG_ctx.arc(185, 185, 175, 0, Math.PI * 2, true);
        contentBG_ctx.fill();
        contentBG_ctx.stroke();
        DisplayObjectUtil.addTo(contentBG, _content);

        var contentText = document.getElementById("what_is_this");
        DisplayObjectUtil.addTo(contentText, _content);
        contentText.style.display = "inline";
        _contact = document.getElementById("contact");
        _contact.style.display = "inline";
        DisplayObjectUtil.addTo(_contact, _container);

        var contact_links = document.getElementsByClassName("contact_link");
        for (i = 0; i < contact_links.length; i++) {
            contact_links[i].addEventListener("mouseover", _onMouseOver, false);
        }

        _img_src = imageSource.source;
        _imgWidth = _img_src.width;
        _imgHeight = _img_src.height;
        _img = DisplayObjectUtil.create("canvas");
        _img.setAttribute("width", 190);
        _img.setAttribute("height", 190);
        _img_ctx = _img.getContext("2d");
        _img.style.left = "-45px";
        _img.style.top = "155px";
        _img.style.opacity = 0;
        DisplayObjectUtil.addTo(_img, _container);

        StageReference.registerStageResizeFunc(_onResize);

    }

    var _onMouseOver = function () {
        MusicManager.playMouseOver();
    }

    this.show = function () {
        _container.style.display = "inline";
        window.addEventListener('mousemove', _onMouseMove, false);
        StageReference.registerRenderFunc(_redrawMyPic);
        _contact.style.left = "85px";
        EKTweener.to(_content.style, 2, 0, { opacity: 1, top: 150, suffix: { top: "px"} });
        EKTweener.to(_contact.style, 2, 0, { opacity: 1, left: 65, suffix: { left: "px"} });
        EKTweener.to(_img.style, 2, 0, { opacity: 1, top: 175, suffix: { top: "px" }, onUpdate: _redraw, onComplete: function () { SectionManager.showComplete(); } });

    }
    this.hide = function () {

        EKTweener.to(_content.style, 2, 0, { opacity: 0, top: 180, suffix: { top: "px"} });
        EKTweener.to(_contact.style, 2, 0, { opacity: 0, left: 45, suffix: { left: "px"} });
        EKTweener.to(_img.style, 2, 0, { opacity: 0, top: 155, suffix: { top: "px" }, onUpdate: _redraw, onComplete: function () { SectionManager.hideComplete(); _container.style.display = "none"; window.removeEventListener('mousemove', _onMouseMove, false); StageReference.deregisterRenderFunc(_redrawMyPic); } });

    }

    var _redraw = function () {
        Line.redraw();
    }

    var _onMouseMove = function (e) {
        if (e) {
            StageReference.calculateMouseXYCenterRatio(e.clientX, e.clientY);
        }
    }
    var _redrawMyPic = function () {
        _mouseRatioX += (StageReference.mouseXCenterRatio - _mouseRatioX) * .05;
        _mouseRatioY += (StageReference.mouseYCenterRatio - _mouseRatioY) * .05;
        _img_ctx.clearRect(0, 0, 190, 190);
        _img_ctx.fillStyle = "#FFF";
        _img_ctx.beginPath();
        _img_ctx.arc(95, 95, 95, 0, Math.PI * 2, true);
        _img_ctx.fill();
        _img_ctx.save();
        _img_ctx.beginPath();
        _img_ctx.arc(95, 95, 85, 0, Math.PI * 2, false);
        _img_ctx.clip();
        _img_ctx.drawImage(_img_src, -10 - 20 * _mouseRatioX, -10 - 20 * _mouseRatioY);
        _img_ctx.restore();

        /* smooth the edge, some non ie9 browser doesnt do anti aliasing for clipped image */
        _img_ctx.strokeStyle = "#e5e5e5";
        _img_ctx.beginPath();
        _img_ctx.arc(95, 95, 85, 0, Math.PI * 2, true);
        _img_ctx.stroke();
    }

}