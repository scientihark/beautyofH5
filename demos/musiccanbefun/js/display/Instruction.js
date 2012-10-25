/// <reference path="../../reference.js" />
var Instruction = new function () {
    
    /* section variables */
    this.scetionId = 0;

    this.LINE_TOP = "115px";
    this.LINE_LEFT = "-25px";
    this.LINE_ANGLE = -45;
    this.LINE_WIDTH = 320;


    var _container = {};
    var _canvas = {};
    var _ctx = {};

    var _title = {};

    var _instructions = [];
    var _instructions_top = [];

    var _icons = [];
    var _iconsContainer = {};

    this.isAnimating = false;
    this.outerRadius = 0;
    this.innerRadius = 0;

    var CANVAS_WIDTH = 420; // add some buffer for animation
    var CANVAS_HEIGHT = 420;
    var CANVAS_HALF_WIDTH = CANVAS_WIDTH >> 1;
    var CANVAS_HALF_HEIGHT = CANVAS_HEIGHT >> 1;


    this.init = function () {
        var i = 0;
        _container = DisplayObjectUtil.create("div");
        DisplayObjectUtil.addTo(_container, SectionManager.container);

        _canvas = DisplayObjectUtil.create("canvas");
        _canvas.setAttribute("width", CANVAS_WIDTH);
        _canvas.setAttribute("height", CANVAS_HEIGHT);
        _canvas.style.top = -CANVAS_HALF_WIDTH + "px";
        _canvas.style.left = -CANVAS_HALF_HEIGHT + "px";
        _ctx = _canvas.getContext("2d");
        DisplayObjectUtil.addTo(_canvas, _container);

        _title = document.getElementById("instruction_title");
        _title.style.opacity = 0;
        _title.style.display = "none";
        DisplayObjectUtil.addTo(_title, _container);

        var instructions = document.getElementsByClassName("instruction_line");
        for (i = 0; i < instructions.length; i++) {
            _instructions.push(instructions[i]);
            _instructions_top[i] = parseInt(_instructions[i].style.top);
            _instructions[i].style.opacity = 0;
            _instructions[i].style.display = "none";
        }
        for (i = 0; i < _instructions.length; i++) DisplayObjectUtil.addTo(_instructions[i], _container);


    }

    this.show = function () {
        Preloader.show();
        Preloader.container.style.top = "100px";
        Preloader.container.style.left = "100px";
        if (Instruction.isAnimating) return;
        var i = 0;
        _container.style.display = "inline";
        EKTweener.killTweensOf(_title.style);
        _title.style.display = "inline";
        EKTweener.to(_title.style, 2, 0, { opacity: 1 });

        for (i = 0; i < _instructions.length; i++) {
            EKTweener.killTweensOf(_instructions[i].style);
            _instructions[i].style.display = "inline";
            _instructions[i].style.top = _instructions_top[i] - 20 + "px";
            EKTweener.to(_instructions[i].style, 1.5, i * .25, { opacity: 1, top: _instructions_top[i], suffix: { top: "px"} });
        }

        for (i = 0; i < _icons.length; i++) {
            EKTweener.killTweensOf(_icons[i].style);
            _icons[i].style.display = "inline";
            EKTweener.to(_icons[i].style, 2, 0, { opacity: .1 });
        }
        EKTweener.killTweensOf(Instruction);
        EKTweener.to(Instruction, 2, 0, { outerRadius: 155, ease: EKTweenFunc.easeOutBack });
        EKTweener.to(Instruction, 2.5, 0, { innerRadius: 145, onUpdate: _redraw, ease: EKTweenFunc.easeOutBack, onComplete: function () { SectionManager.showComplete(); Instruction.isAnimating = false; } });

        Instruction.isAnimating = true;
    }

    this.hide = function () {
        Preloader.hide();
        if (Instruction.isAnimating) return;
        var i = 0;
        EKTweener.killTweensOf(_title.style);
        EKTweener.to(_title.style, 2, 0, { opacity: 0, onComplete: function () { _title.style.display = "none"; } });

        for (i = 0; i < _instructions.length; i++) {
            var id = i;
            EKTweener.killTweensOf(_instructions[i].style);
            EKTweener.to(_instructions[i].style, 1.5, i * .25, { opacity: 0, top: _instructions_top[i] - 20, suffix: { top: "px" }, onComplete: function () { _instructions[id].style.display = "none"; } });
        }

        for (i = 0; i < _icons.length; i++) {
            var id = i;
            EKTweener.killTweensOf(_icons[i].style);
            EKTweener.to(_icons[i].style, 2, 0, { opacity: 0, onComplete: function () { _icons[id].style.display = "none"; } });
        }
        EKTweener.killTweensOf(Instruction);
        EKTweener.to(Instruction, 2, 0, { outerRadius: 0, ease: EKTweenFunc.easeInBack });
        EKTweener.to(Instruction, 2.5, 0, { innerRadius: 0, onUpdate: _redraw, ease: EKTweenFunc.easeInBack, onComplete: function () { SectionManager.hideComplete(); Instruction.isAnimating = false; _container.style.display = "none" } });

        Instruction.isAnimating = true;
    }

    var _redraw = function () {
        Line.redraw();

        _ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _ctx.fillStyle = "#FFF";
        _ctx.beginPath();
        _ctx.arc(CANVAS_HALF_WIDTH, CANVAS_HALF_HEIGHT, Instruction.outerRadius, 0, Math.PI * 2, true);
        _ctx.fill();
        _ctx.strokeStyle = "#e5e5e5";
        _ctx.fillStyle = "#f6f6f6";
        _ctx.beginPath();
        _ctx.arc(CANVAS_HALF_WIDTH, CANVAS_HALF_HEIGHT, Instruction.innerRadius, 0, Math.PI * 2, true);
        _ctx.fill();
        _ctx.stroke();
    }

    this.updateCanvas = function () {

    }

}
