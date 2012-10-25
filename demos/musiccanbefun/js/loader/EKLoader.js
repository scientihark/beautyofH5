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

var EKLoader = new function () {

    /* @private constant */
    var _TYPE_IMAGE_EXTENSIONS = ["jpg", "png", "apng", "tiff", "svg", "jpeg", "pnga", "gif"];
    var _TYPE_TEXT_EXTENSIONS = ["txt", "htm", "html", "xml"];
    var _TYPE_AUDIO_EXTENSIONS = ["mp3", "ogg"];
    var _TYPE_JS_EXTENSIONS = ["js"];
    var _TYPE_AUDIO_MIME = ['audio/mpeg', 'audio/ogg'];
    var _TYPE_VIDEO_EXTENSIONS = [['mp4', 'mpeg', 'mpg'], ['ogv', 'oga'], ['dvx', 'divx', 'xdiv']];
    var _TYPE_VIDEO_MIME = ['video/mp4', 'video/ogg', 'video/divx'];


    /* @public constant */
    this.TYPE_IMAGE = "IMAGE";
    this.TYPE_TEXT = "TEXT";
    this.TYPE_JS = "JS";
    this.TYPE_AUDIO = "AUDIO";
    this.TYPE_VIDEO = "VIDEO";

    /* @private variables */
    var _loaderItemsArray = [];
    var _loaderItems = {};
    var _loadingFunc = {};
    var _loadedFunc = {};

    this.weightSum = 0;

    var isInArray = function (arr, target) {
        for (var i = 0; i < arr.length; i++)
            if (arr[i] === target)
                return true;
        return false;
    }
    this.resetListeners = function (loadingFunc, loadedFunc) {
        _loadingFunc = loadingFunc;
        _loadedFunc = loadedFunc;
    };
    this.get = function (url) {
        return _loaderItems[url].source;
    };
    this.add = function (url, onLoadedFunc, type, mimeType, data, weight) {
        if (!type) {
            var extension = url.split('.').pop().toLowerCase();
            type = isInArray(_TYPE_IMAGE_EXTENSIONS, extension) ? this.TYPE_IMAGE : isInArray(_TYPE_TEXT_EXTENSIONS, extension) ? this.TYPE_TEXT : isInArray(_TYPE_JS_EXTENSIONS, extension) ? this.TYPE_JS : undefined;
            var mime = "";
            // NOT IMAGE AND TEXT
            if (!type) {
                var i = _TYPE_AUDIO_EXTENSIONS.length;
                while (i--) {
                    if (extension == _TYPE_AUDIO_EXTENSIONS[i]) {
                        type = this.TYPE_AUDIO;
                        mime = _TYPE_AUDIO_MIME[i];
                        break;
                    }
                }
                if (!type) {
                    var j = _TYPE_VIDEO_EXTENSIONS.length;
                    while (j--) {
                        i = _TYPE_VIDEO_EXTENSIONS[j].length;
                        while (i--) {
                            if (_TYPE_VIDEO_EXTENSIONS[j][i] == extension) {
                                type = this.TYPE_VIDEO;
                                mime = _TYPE_VIDEO_MIME[j];
                                break;
                            }
                        };
                        if (type) break;
                    }
                }
                if (!type) { throw "File type not found."; return false; }
            }
        };
        if (_loaderItems[url]) { throw "File already exists."; return false; };
        var w = weight == null ? 1 : weight;
        this.weightSum += w;
        var loaderItem = new EKLoaderItem(url, onLoadedFunc, type, data, w);
        if (mime != "") loaderItem.mime = loaderItem.mime = mime;
        _loaderItemsArray[_loaderItemsArray.length] = _loaderItems[url] = loaderItem;
        return true;
    };

    this.start = function () {
        var loaderItem;
        for (var i in _loaderItems) {
            loaderItem = _loaderItems[i];
            if (!loaderItem.started) {
                loaderItem.started = true;
                switch (loaderItem.type) {
                    case this.TYPE_IMAGE:
                        _loadImage(loaderItem);
                        break;
                    case this.TYPE_TEXT:
                        _loadText(loaderItem);
                        break;
                    case this.TYPE_JS:
                        _loadJS(loaderItem);
                        break;
                    case this.TYPE_AUDIO:
                        _loadAudio(loaderItem);
                        break;
                    case this.TYPE_VIDEO:
                        _loadVideo(loaderItem);
                        break;
                }
            };
        };

    };

    var _loadImage = function (loaderItem) {
        loaderItem.source = new Image();
        loaderItem.source.onload = function () { _onLoad(loaderItem); };
        loaderItem.source.src = loaderItem.url;
    };
    var _loadText = function (loaderItem) {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = xmlhttpChange;
            xmlhttp.open("GET", loaderItem.url, true);
            xmlhttp.send(null);
        } else if (window.ActiveXObject) {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            if (xmlhttp) {
                xmlhttp.onreadystatechange = xmlhttpChange;
                xmlhttp.open("GET", loaderItem.url, true);
                xmlhttp.send();
            }
        }
        function xmlhttpChange() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    loaderItem.source = xmlhttp.responseText;
                    _onLoad(loaderItem);
                } else {
                    //alert("There was a problem retrieving the XML data");
                }
            }
        }
    };
    var _loadJS = function (loaderItem) {
        loaderItem.source = document.createElement('script');
        loaderItem.source.type = "text/javascript";
        loaderItem.source.onload = function () { _onLoad(loaderItem); };
        loaderItem.source.src = loaderItem.url;
        document.getElementsByTagName("head")[0].appendChild(loaderItem.source);
    };
    var _loadAudio = function (loaderItem) {
        try {
            loaderItem.source = new Audio();
        } catch (e) {
            loaderItem.source = document.createElement('audio');
        }
        loaderItem.source.addEventListener('canplaythrough', loaderItem.onLoadedListenerFunc = function () { _onMediaLoaded(loaderItem); }, true);
        loaderItem.source.addEventListener('progress', loaderItem.onLoadingListenerFunc = function () { _onMediaLoading(loaderItem); }, true);
        loaderItem.source.src = loaderItem.url;
        loaderItem.source.load();
    };
    var _loadVideo = function (loaderItem) {
        try {
            loaderItem.source = new Video();
        } catch (e) {
            loaderItem.source = document.createElement('video');
        }
        loaderItem.source.addEventListener('canplaythrough', loaderItem.onLoadedListenerFunc = function () { _onMediaLoaded(loaderItem); }, true);
        loaderItem.source.addEventListener('progress', loaderItem.onLoadingListenerFunc = function () { _onMediaLoading(loaderItem); }, true);
        loaderItem.source.src = loaderItem.url;
        loaderItem.source.load();

    };

    var _onMediaLoading = function (loaderItem) {
        if (loaderItem.source.buffered != undefined) // Firefox 3.6 doesn't suppport
            if (loaderItem.source.buffered.length > 0) {
                loaderItem.percentage = loaderItem.source.buffered.end(0) / loaderItem.source.duration;
                if (_loadingFunc) _loadingFunc(EKLoader.getPercentage());
            }
    }
    var _onMediaLoaded = function (loaderItem) {
        loaderItem.source.removeEventListener('progress', loaderItem.onLoadingListenerFunc, true);
        loaderItem.source.removeEventListener('canplaythrough', loaderItem.onLoadedListenerFunc, true);
        _onLoad(loaderItem);

    }
    var _onLoad = function (loaderItem) {
        loaderItem.loaded = true;
        // Set default values
        switch (loaderItem.type) {
            case EKLoader.TYPE_IMAGE:
                loaderItem.source.style.position = "absolute";
                loaderItem.source.style.left = "0px";
                loaderItem.source.style.top = "0px";
                loaderItem.source.style.width = loaderItem.source.width + "px";
                loaderItem.source.style.height = loaderItem.source.height + "px";
                break;
            case EKLoader.TYPE_TEXT:
                break;
            case EKLoader.TYPE_JS:
                break;
            case EKLoader.TYPE_AUDIO:
                break;
            case EKLoader.TYPE_VIDEO:
                loaderItem.source.style.position = "absolute";
                loaderItem.source.style.left = "0px";
                loaderItem.source.style.top = "0px";
                break;
        }
        loaderItem.percentage = 1;
        if (_loadingFunc) _loadingFunc(EKLoader.getPercentage());
        if (loaderItem.onLoadedFunc) loaderItem.onLoadedFunc(loaderItem);
        if (EKLoader.getPercentage() == 1) if (_loadedFunc) _loadedFunc();
    }

    this.getPercentage = function () {
        var sum = 0;
        var length = _loaderItemsArray.length;
        for (var i = 0; i < length; i++) {
            sum += _loaderItemsArray[i].percentage * _loaderItemsArray[i].weight;
        }
        return sum / EKLoader.weightSum;
    }

};




function EKLoaderItem(url, onLoadedFunc, type, data, weight){
	this.url = url;
	this.type = type;
	this.onLoadedFunc = onLoadedFunc;
	this.started = false;
	this.loaded = false;
	this.source = {};
	this.data = data;
	this.percentage = 0;
	this.onLoadedListenerFunc;
	this.onLoadingListenerFunc;
	this.weight = weight;
};