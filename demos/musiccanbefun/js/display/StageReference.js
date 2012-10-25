/**
*
* Version: 	0.01
* Author:	Edan Kwan
* Contact: 	info@edankwan.com
* Website:	http://www.edankwan.com/
* Twitter:	@edankwan
*
* Copyright (c) 2011 Edan Kwan
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
**/

var StageReference = new function () {
    /* @private */
    var _onStageResizeFunc = [];
    var _onRenderFunc = [];
    var _layers = [];
    var _intervalId = {};

    var _statMode = false;
    var _time = 0;
    var _frame = 0;
    var _lastFrameTime = 0;
    var _memoryEnable = false;
    var _memory = -1;
    var _stat = {};


    /* @public */
    this.stage = {};
    this.frameRate = 60;
    this.stageWidth = 0;
    this.stageHeight = 0;
    this.mouseXCenterRatio = 0;
    this.mouseYCenterRatio = 0;
    this.isRendering = false;

    /* quality 2: high, 1: normal, 0: low */
    this.quality = 2;

    /* browser version */
    this.isIE = false;
    this.isFF = false;
    this.isSa = false;
    this.isOp = false;
    this.isNN = false;
    this.isCh = false;
    this.isMa = false;
    this.isOther = false;
    this.browserPrefix = "";

    this.init = function (stage, fps, statMode) {
        StageReference.stage = stage;
        this.frameRate = fps;
        _statMode = statMode
        if (statMode) {
            _stat = DisplayObjectUtil.create("div");
            _stat.style.fontFamily = 'Arial';
            _stat.style.fontSize = '9px';
            _stat.style.color = '#CCC';
            _stat.style.backgroundColor = '#333';
            _stat.style.width = '64px';
            _stat.style.height = '24px';
            _stat.style.padding = '3px';
            _stat.style.display = "none";
            try {
                if (typeof (performance.memory.totalJSHeapSize) != "undefined") {
                    _memoryEnable = true;
                }
            } catch (e) { };
            document.body.appendChild(_stat);
        }

        var sAgent = navigator.userAgent.toLowerCase();
        StageReference.isIE = (sAgent.indexOf("msie") != -1); //IE6.0-7
        StageReference.isFF = (sAgent.indexOf("firefox") != -1); //firefox
        StageReference.isSa = (sAgent.indexOf("safari") != -1); //safari
        StageReference.isOp = (sAgent.indexOf("opera") != -1); //opera
        StageReference.isNN = (sAgent.indexOf("netscape") != -1); //netscape
        StageReference.isCh = (sAgent.indexOf("chrome") != -1); //chrome
        StageReference.isMa = StageReference.isIE; //marthon
        StageReference.isOther = (!StageReference.isIE && !StageReference.isFF && !StageReference.isSa && !StageReference.isOp && !StageReference.isNN && !StageReference.isSa); //unknown Browser
        StageReference.browserPrefix = StageReference.isIE ? "-ms-" : StageReference.isFF ? "-moz-" : StageReference.isOp ? "-o-" : "-webkit-";
        window.onresize = StageReference.onResize;
    };

    /*******************************
    *
    * RESIZE FUNCTIONS
    * 
    *******************************/
    this.registerStageResizeFunc = function (func) {
        found = false;
        for (var i = 0; i < _onStageResizeFunc.length; i++) {
            if (_onStageResizeFunc[i] == func) {
                found = true;
                return;
            }
        }
        if (!found) _onStageResizeFunc.push(func);
    };
    this.deregisterStageResizeFunc = function (func) {
        found = false;
        for (var i = 0; i < _onStageResizeFunc.length; i++) {
            if (_onStageResizeFunc[i] == func) {
                found = true;
                break;
            }
        }
        if (found) _onStageResizeFunc.splice(i, 1);
    };

    this.onResize = function () {
        StageReference.stageWidth = window.innerWidth;
        StageReference.stageHeight = window.innerHeight;
        for (var i = 0; i < _onStageResizeFunc.length; ++i) _onStageResizeFunc[i]();
    };



    /*******************************
    *
    * LAYER FUNCTIONS
    * 
    *******************************/
    this.addLayer = function (layerName) {
        if (!_layers[layerName]) {
            var layer = DisplayObjectUtil.create("div");
            StageReference.stage.appendChild(layer);
            _layers[layerName] = layer;
        }
    };
    this.getLayer = function (layerName) {
        return _layers[layerName];
    };

    /*******************************
    * 
    * RENDER FUNCTIONS
    * 
    *******************************/
    this.startRender = function () {
        if (!StageReference.isRendering) {
            if (_statMode) {
                _frame = 0;
                _lastFrameTime = new Date().getTime();
                _stat.style.display = "";
            }
            StageReference.isRendering = true;
            _intervalId = setInterval(StageReference.render, 1000 / StageReference.frameRate);
        }
    };
    this.stopRender = function () {
        if (StageReference.isRendering) {
            if (_statMode) {
                _stat.style.display = "none";
            }
            StageReference.isRendering = false;
            clearInterval(_intervalId);
        }
    };
    this.registerRenderFunc = function (func) {
        found = false;
        for (var i = 0; i < _onRenderFunc.length; i++) {
            if (_onRenderFunc[i] == func) {
                found = true;
                return;
            }
        }
        if (!found) _onRenderFunc.push(func);
    };
    this.deregisterRenderFunc = function (func) {
        found = false;
        for (var i = 0; i < _onRenderFunc.length; i++) {
            if (_onRenderFunc[i] == func) {
                found = true;
                break;
            }
        }
        if (found) _onRenderFunc.splice(i, 1);
    };

    this.render = function () {
        for (var i = 0; i < _onRenderFunc.length; ++i) {
            _onRenderFunc[i]();
        }
        if (_statMode) {
            _frame++;
            _time = new Date().getTime();
            if (_time > _lastFrameTime + 1000) {
                if (_memoryEnable) _memory = performance.memory.usedJSHeapSize * .00000095367;
                _stat.innerHTML = 'FPS: ' + _frame + '<br/>MEM: ' + Math.round(_memory) + 'MB';
                _frame = 0;
                _lastFrameTime = _time;
            }
        }
    };

    this.getOuterFitScreenRatio = function (width, height) {
        if (StageReference.stageWidth / width > StageReference.stageHeight / height) return StageReference.stageWidth / width;
        return StageReference.stageHeight / height;
    };
    this.getInnerFitScreenRatio = function (width, height) {
        if (StageReference.stageWidth / width < StageReference.stageHeight / height) return StageReference.stageWidth / width;
        return StageReference.stageHeight / height;
    }

    this.calculateMouseXYCenterRatio = function (mouseX, mouseY) {
        this.mouseXCenterRatio = 2.0 * mouseX / this.stageWidth - 1.0;
        this.mouseXCenterRatio = this.mouseXCenterRatio > 1.0 ? 1.0 : this.mouseXCenterRatio < -1.0 ? -1.0 : this.mouseXCenterRatio;
        this.mouseYCenterRatio = 2.0 * mouseY / this.stageHeight - 1.0;
        this.mouseYCenterRatio = this.mouseYCenterRatio > 1.0 ? 1.0 : this.mouseYCenterRatio < -1.0 ? -1.0 : this.mouseYCenterRatio;
    }

};
