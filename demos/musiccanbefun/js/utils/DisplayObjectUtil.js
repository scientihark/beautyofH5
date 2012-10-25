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

var DisplayObjectUtil = new function () {
    /* @private */

    /*******************************
    *
    * CONTAINER FUNCTIONS
    * 
    *******************************/

    this.setParent = function (target, parent) {
        if (!target.parentNode || (target.parentNode && target.parentNode != parent)) {
            if (parent) target.parent = parent;
        }
    };
    this.addTo = function (target, parent) {
        if (!target.parentNode || (target.parentNode && target.parentNode != parent)) {
            if (parent) target.parent = parent;
            target.parent.appendChild(target);
        }
    };
    this.removeItself = function (target) {
        if (target.parentNode) {
            target.parentNode.removeChild(target);
        }
    };

    /*******************************
    *
    * DISPLAY OBJECT FUNCTIONS
    * 
    *******************************/

    this.create = function (elementName) {
        var element = document.createElement(elementName);
        element.style.margin = "0px auto";
        element.style.position = "absolute";
        return element;
    }

    this.defaultMouseText = "this.style.cursor = 'default'; return false;";
};