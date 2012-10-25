/// <reference path="../../reference.js" />
var TopBar = new function () {


    var _container;

    var _what_is_this;
    var _instruction;
    var _highest_scores;

    this.HEIGHT = 60;

    var _render = function () {

    };

    var _onResize = function () {
        _container.style.width = StageReference.stageWidth + "px";
    };

    /* @public */
    this.init = function () {

        _container = document.getElementById("top");
        _what_is_this = document.getElementById("what_is_this_btn");
        _instruction = document.getElementById("instruction_btn");
        _highest_scores = document.getElementById("highest_scores_btn");

        SectionManager.addSection(_what_is_this, WhatIsThis);
        SectionManager.addSection(_instruction, Instruction);
        SectionManager.addSection(_highest_scores, HighestScores);

        DisplayObjectUtil.removeItself(_container);
        DisplayObjectUtil.addTo(_container, StageReference.getLayer("top"));

        StageReference.registerStageResizeFunc(_onResize);

    }

    this.show = function () {
        _container.style.display = "inline";
        _container.style.margin = -TopBar.HEIGHT + "px 0px";
        EKTweener.to(_container.style, 1, 0, { margin: 0, suffix: { margin: "px 0px" } });
    }
}