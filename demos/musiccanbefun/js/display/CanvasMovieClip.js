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

function CanvasMovieClip(ctx) {

    var _frames = [];
    var _isStop = false;
    var _direction = 1;

    this.totalFrames = 0;
    this.currentFrame = 0;
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.scaleX = 1;
    this.scaleY = 1;

    this.addFrame = function (frame, offsetX, offsetY) {
        _frames.push([frame, , offsetX, offsetY]);
        _amount++;
    }

    this.draw = function () {
        var ctx = this.ctx;
        var frame = _frames[this.currentFrame];
        ctx.drawImage(frame[0], this.x + frame[1] * this.scaleX, this.y + frame[2] * this.scaleY, frame[0].width * this.scaleX, frame[0].height * this.height);
        this.update();
    }

    this.update = function () {
        if (_isStop) {
            this.currentFrame += _direction;
            if (this.currentFrame < 0) this.currentFrame = this.totalFrames - 1;
            if (this.currentFrame >= this.totalFrames) this.currentFrame = 0;
        }
    }

    this.play = function (next) {
        _isStop = false;
        _direction = next == null ? 1 : -1;
    }

    this.stop = function (next) {
        _isStop = true;
    }

    this.gotoAndStop = function (frame) {
        _isStop = true;
        this.currentFrame = frame;
    }

    this.gotoAndPlay = function (frame) {
        _isStop = false;
        this.currentFrame = frame;
    }
}