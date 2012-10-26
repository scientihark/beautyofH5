// media pre-loader and cache


// singleton actor that manages named references to audio, video, and images
// items are all preloaded and we dispatch app events via the dispatcher
// when each item is ready and when all items are ready.
// we also automatically append the right format extension for the current browser
// if no file extension is provided (for video and audio)

define(['./dispatcher', 'underscore', 'jv/data/config'], function (dispatcher, _, config) {

    // we should have Modernizr
    var mv = Modernizr.video;
    var ma = Modernizr.audio;

    // Automatically choose best format if no extension is specified
    //var video_ext = (mv.webm ? '.webm' : (mv.h264 ? '.mp4' : '.ogv' ));
    var video_ext = (mv.h264 ? '.mp4' : (mv.webm ? '.webm' : '.ogv' ));
    var audio_ext = (ma.mp3 ? '.mp3' : '.ogg');

    var cache = {}, queue = [], threads = 0, loaded = 0, count = 0, maxThreads = 4, basePath = config.mediaBasePath;

    var processQueue = _.debounce(doProcessQueue, 50);

    if (JV_DEBUG == null) var JV_DEBUG = false;
    var debug = JV_DEBUG;
    var nocache = false;
    return {

        setBasePath:function (path) {
            basePath = path;
        },

        getBasePath:function () {
            return basePath;
        },

        getVideo:function (src, allowStreaming /* false */, onComplete, onError) {
            src = normalizePath(src, basePath, video_ext);
            return getMedia('video', src, allowStreaming, onComplete, onError);
        },

        getAudio:function (src, allowStreaming /* false */, onComplete, onError) {
            src = normalizePath(src, basePath, audio_ext);
            return getMedia('audio', src, allowStreaming, onComplete, onError);
        },

        getImage:function (src, onComplete, onError) {
            src = normalizePath(src, basePath);
            return getMedia('image', src, false, onComplete, onError);
        }
    };

    /**
     * Normalize the media source path (or URL) by prepending the basePath to any URL that does not
     * have "http" in the front and optionally appending a media format extension.
     *
     * @param src
     * @param prependPath
     * @param appendExtension
     */
    function normalizePath(src, prependPath, appendExtension) {
        if (appendExtension != null && src.charAt(-4) != '.') src += appendExtension;
        if (src.substr(0, 4) != 'http') src = prependPath + src;
        return src;
    }


    /**
     * Returns image or media element and adds it to the queue
     *
     * @param src
     */
    function getMedia(type, src, allowStreaming /* false */, onComplete, onError) {

        if (cache[src] != null) return cache[src].media;

        if (nocache) src = src + '?' + (+new Date);

        var media;

        switch (type) {
            case 'image':
                media = new Image();
                break;

            case 'audio':
                media = document.createElement('audio');
                break;

            case 'video':
                media = document.createElement('video');
                break;

            default:
                console.error('Media type must be image, audio, or video');
                return null;
        }

        var item = { src:src, media:media, type:type, allowStreaming:allowStreaming, onComplete:onComplete, onError:onError  };
        cache[src] = item;
        queue.push(item);
        count++;
        processQueue();
        return media;
    }

    function doProcessQueue() {
        if (debug) console.log('[media] Processing Queue');
        while (queue.length > 0 && threads < maxThreads) {
            doLoadItem(queue.shift());
        }
        if (loaded == count) {
            setTimeout(function () {
                if (debug) console.log('[media] Queue Complete!');
                dispatcher.trigger('mediaLoadComplete');
            }, 100);
        }
    }

    function doLoadItem(item) {
        threads++;
        if (debug) console.log('[media] Loading ' + item.type + ' ' + item.src);

        if (item.type == 'image') {

            // CDN images can't be loaded as ajax, no need for that anyway
            // just load them old school

            item.media.onload = function () {
                item.media.onload = null;
                onRequestSuccess(item);
                onRequestComplete(item);
            };
            item.media.onerror = function () {
                onRequestError(item);
                onRequestComplete(item);
            };
            item.media.src = item.src;

        } else if ((item.type == 'audio' || item.type == 'video') && ((item.allowStreaming === true) || $.browser.msie)) {
            // just wait for canplaythrough
            streamMediaItem(item);
        } else {
            // download as data to ensure complete preload
            $.get(item.src).success(
                function () {
                    onRequestSuccess(item);
                }).error(
                function () {
                    onRequestError(item);
                }).complete(function () {
                    onRequestComplete(item);
                });
        }


    }


    function streamMediaItem(item) {

        var media = item.media;

        item.onCanPlayThrough = _.bind(onCanPlayThrough, item);
        item.onMediaError = _.bind(onMediaError, item);

        media.addEventListener('error', item.onMediaError, false);
        media.addEventListener('canplaythrough', item.onCanPlayThrough, false);

        media.preload = "auto";
        media.src = item.src;

        // play/pause to trigger load on browsers that shall not be named
        media.play();
        media.muted = true;
        clearTimeout(item.pendingPause);
        item.pendingPause = setTimeout(function () {
            try {
                media.pause();
                media.muted = false;
            } catch (e) {
            }
        }, 100);

        clearInterval(item.checkIt);
        item.checkIt = setInterval(function () {
            doCheckReadyState(item);
        }, 50);
    }

    function doCheckReadyState(item) {
        if (item.media.readyState >= 4) {
            //console.log('item is ready');
            onRequestSuccess(item);
            onRequestComplete(item);
        } else {
            //console.log( 'item buffer - readyState: '+item.media.readyState );
        }
    }

    // handler bound to item object (this==item)
    function onCanPlayThrough() {
        if (debug) console.log('[media] Can play through ' + this.src);
        onRequestSuccess(this);
        onRequestComplete(this);
    }

    // handler bound to item object (this==item)
    function onMediaError() {
        onRequestError(this);
        onRequestComplete(this);
    }

    function onRequestSuccess(item) {
        loaded++;
        // set src on media element
        if (item.media.src != item.src) item.media.src = item.src;
        item.media.muted = false;

        if (debug) console.log('[media] Item Complete ' + item.src + ' ' + loaded + '/' + count);

        // Send notifications
        dispatcher.trigger('mediaItemSuccess', item);
        if (_.isFunction(item.onComplete)) item.onComplete.call(null);
    }

    function onRequestError(item) {
        if (debug) console.error('[media] Error loading ' + item.src);
        dispatcher.trigger('mediaItemError', item);
        if (_.isFunction(item.onError)) {
            item.onError.call(null);
            // if error is being watched for, don't fail to indicate progress
            loaded++;
        }
    }

    // fired after either success or error
    function onRequestComplete(item) {
        if (item.onCanPlayThrough) item.media.removeEventListener('canplaythrough', item.onCanPlayThrough, false);
        if (item.onMediaError) item.media.removeEventListener('error', item.onMediaError, false);
        item.onCanPlayThrough = null;
        item.onMediaError = null;

        clearInterval(item.checkIt);
        clearTimeout(item.pendingPause);

        dispatcher.trigger('mediaItemComplete', item);
        dispatcher.trigger('mediaProgress', loaded / count);
        threads--;
        processQueue();
    }

});
