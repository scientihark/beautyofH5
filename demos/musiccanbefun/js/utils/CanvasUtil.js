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

var CanvasUtil = new function () {

    var _canvas = {};
    var _ctx = {};

    this.init = function () {
        _canvas = DisplayObjectUtil.create("canvas");
        _ctx = canvas.getContext("2d");
    }

    this.createCache = function (img, x, y, w, h) {
        var canvas = DisplayObjectUtil.create("canvas");
        var ctx = canvas.getContext("2d");
        canvas.setAttribute("width", w);
        canvas.setAttribute("height", h);
        ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
        return canvas;
    }
    this.createBlurCaches = function (img, x, y, w, h, level) {
        var caches = [];
        var target = img;
        var canvas;
        var ctx;
        for (var i = 0; i < level; i++) {
            canvas = DisplayObjectUtil.create("canvas");
            ctx = canvas.getContext("2d");
            canvas.setAttribute("width", w + (i + 1) * 2);
            canvas.setAttribute("height", h + (i + 1) * 2);
            ctx.drawImage(target, 0, 0, w + (i + 1) * 2, h + (i + 1) * 2);
            caches.push(canvas);
            target = cnavas;
        }
        return caches;
    }
    this.tintCanvasCtx = function (ctx, r, g, b, x, y, w, h) {
        var imageData = ctx.getImageData(x, y, w, h);
        var data = imageData.data;
        var i = data.length - 1;
        while (i > 0) {
            if (data[i] > 0) {
                data[i - 3] = r;
                data[i - 2] = g;
                data[i - 1] = b;
            }
            i -= 4;
        }
        ctx.putImageData(imageData, x, y);
    }
}