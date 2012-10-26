require.config({urlArgs: JV.version});
// no cache during dev
require(['jv/controller', 'bumpslide/stats', 'jv/data/model', 'BrowserDetect', 'jv/dispatcher', 'jv/tracker'], function (controller, stats, model, _BrowserDetect, dispatcher, tracker) {

    $(init);

    var _isCover, _isExperience, _scrollWidth, _scrollHeight, _isVideo, _timer, _isPin;

    function init() {

        _isCover = true;
        _isExperience = false;
        _isVideo = false;
        _isPin = false;

        calcScrollBarDimensions();
        initEvents();
        addUserPhoto();
        showJumplist();
        logFirstPin();

        if (isBrowserOkay()) {
            controller.init();
        } else {
            showVideo();
        }

        onOverLabel();
        _timer = setTimeout(onOutLabel, 4000);

        $("#front").fadeIn(500, 'easeOutQuad');
        $("#back").fadeIn(500, 'easeOutQuad');
        $("#pin-text").html(getPinText());

        dispatcher.bind('videoEnd', onEnd);
        dispatcher.bind('videoStart', onBegin);
    }

    function addUserPhoto() {
        if (window.JV.userPic) {
            $("#back-user-photo").empty();
            $("#back-user-photo").html("<a href=\"" + window.JV.userPic + "\" target=\"_blank\" id=\"back-user-photo-link\"></a>");
            var img = $("<img />").attr("src", window.JV.userPic).load(function () {
                $("#back-user-photo-link").append(img);
                $("#back-user-photo").show();
            });
        }
    }

    function calcScrollBarDimensions() {
        var i = document.createElement("p");
        i.style.width = "100%";

        i.style.height = "200px";

        var o = document.createElement("div");
        o.style.position = "absolute";
        o.style.top = "0px";
        o.style.left = "0px";
        o.style.visibility = "hidden";
        o.style.width = "200px";
        o.style.height = "150px";
        o.style.overflow = "hidden";
        o.appendChild(i);

        document.body.appendChild(o);
        var w1 = i.offsetWidth;
        var
            h1 = i.offsetHeight;
        o.style.overflow = "scroll";
        var w2 = i.offsetWidth;
        var h2 = i.offsetHeight;
        if (w1 == w2) w2 = o.clientWidth;
        if (h1 == h2) h2 = o.clientWidth;

        document.body.removeChild(o);

        _scrollWidth = w1 - w2;
        _scrollHeight = h1 - h2;
    }

    // Mobile devices not currently supported
    function isBrowserOkay() {
        return Modernizr.audio && Modernizr.video && Modernizr.canvas && !MobileDetect.detect();
    }

    function getPinText() {

        try {
 
            // First, we need to check if the browser is in already Site Mode
            if (window.external.msIsSiteMode()) {

                // Site mode is supported and active
                return "SWEET! Thanks for pinning with the newest version of Internet Explorer. Make sure to check out the additional behind the scenes content in your Jump List.";
            } else {
                return "<img src=\"favicon.ico\" alt=\"Drag me to pin!\" class=\"msPinSite\" > SWEET! Pin this icon to your taskbar to access special Jasmine Villegas behind the scenes content.";
            }

        } catch (ex) {
            if (BrowserDetect.OS == "Windows") {
                // WIN < 7
                return "Get fresh! Upgrade to Windows 7 and the newest version of Internet Explorer to get access to additional behind the scenes radness.";
            } else {
                return "Where's the love? Check out the experience on Windows 7 and Internet Explorer to get access to additional behind the scenes radness.";
            }
        }
    }

    function showVideo() {
        _isVideo = true;
        $("#front-content").html("<iframe width=\"960\" height=\"540\" src=\"http://www.youtube.com/embed/2GnK8c7kQ6M\" frameborder=\"0\" allowfullscreen></iframe>");
        $("#app").hide();
    }

    function initEvents() {
        $("#ie-label").bind("mouseenter", onOverLabel).bind("mouseleave", onOutLabel);
        $("#credits-container").bind("mouseenter", onOverCredits).bind("mouseleave", onOutCredits);
        $("#pin").bind("mouseenter", onOverPin).bind("mouseleave", onOutPin);

        $('[data-atlas]').on('click', function(){
            Atlas.logJS($(this).data('atlas'));
        });

        $(window).bind("resize", onWindowResize);
        fixDimensions(true);
    }

    function onOverCredits() {
        $("#credits").not(':visible').stop().show().animate({"left":"-336px", "opacity":1}, 300);
    }

    function onOutCredits() {
        $("#credits").delay(200).stop().animate({"opacity":0}, 300, "linear", onOutCreditsComplete);
    }

    function onOverLabel() {
        if (_timer) {
            clearTimeout(_timer);
            _timer = null;
        } else {
            _isPin = true;
            $("#pin").stop().show().animate({"right":"-272px", "opacity":1}, 300);
        }
    }

    function onOutLabel() {
        if (_timer) {
            clearTimeout(_timer);
            _timer = null;
        }
        $("#pin").delay(200).stop().animate({"opacity":0}, 300, "linear", onOutLabelComplete);
    }

    function onOutLabelComplete() {
        _isPin = false;
        $("#pin").stop().css({"right":"-282px"}).hide();
    }

    function onOutCreditsComplete() {
        $("#credits").stop().css({"left":"-341px"}).hide();
    }

    function onOverPin() {
        if (_isPin) $("#pin").stop().css({"right":"-272px"}).animate({"opacity":1}, 100);
    }

    function onOutPin() {
        _isPin = false;
        onOutLabel();
    }

    function fixDimensions(first) {
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        var smallerWidth = (windowWidth < 960);
        var smallerHeight = (windowHeight < 637);

        if (smallerWidth != smallerHeight && first) {
            if (smallerWidth) windowHeight -= _scrollHeight;
            else windowWidth -= _scrollWidth;
        }

        var width = Math.max(960, windowWidth);
        var height = Math.max(637, windowHeight);

        $("#container").css({"width":width, "height":height});
        $("#mask").css({"width":width, "height":height});
        $("#cover").css({"width":width, "height":height});
        $(".cover-gradient").css({"width":width, "height":height});

        if (Modernizr.backgroundsize) {
            if (_isCover && (width < 1800 && height < 1309)) {
                _isCover = false;
                $("#container").css("background-size", "1800px 1309px");
            } else if (!_isCover && (width >= 1800 || height >= 1309)) {
                _isCover = true;
                $("#container").css("background-size", "cover");
            }
        }

        var leftPos = (width - $("#back").width()) * .5;
        var topPos = (height - $("#back").height()) * .5;

        $("#back").css({"left":leftPos, "top":topPos});
        $("#front").css({"left":leftPos, "top":topPos});
    }

    function onWindowResize() {
        fixDimensions(false);
    }

    function onBegin() {
        if (!_isExperience) {
            _isExperience = true;
            //console.log('BEGIN');
            //console.log('BEGIN');
            $("#cover").stop(true, true).delay(300).fadeIn(500, "easeOutQuad");
            $("#experience-black").stop(true, true).hide().delay(300).fadeOut(500, "easeOutQuad");
            $("#experience-white").stop(true, true).hide().delay(300).fadeIn(500, "easeOutQuad");
            $("#behind-front, #behind-back").stop(true, true).fadeOut(500, "easeOutQuad");
        }
    }

    function onEnd() {
        if (_isExperience) {
            _isExperience = false;
            // console.log('END');
            $("#cover").stop(true, true).fadeOut(500, "easeOutQuad");
            $("#experience-black").stop(true, true).fadeIn(500, "easeInQuad");
            $("#experience-white").stop(true, true).fadeOut(500, "easeInQuad");
            $("#behind-front, #behind-back").stop(true, true).fadeIn(500, "easeOutQuad");
            onOverLabel();
            _timer = setTimeout(onOutLabel, 6000);
        }
    }

    function showJumplist() {
        try {
 
            if (window.external.msIsSiteMode()) {
                window.external.msSiteModeClearJumpList();
                window.external.msSiteModeCreateJumpList("Behind the Scenes");
                window.external.msSiteModeAddJumpListItem('On the Set With Jasmine', '/pinning/#video', "/favicon.ico", "blank");
                window.external.msSiteModeAddJumpListItem('Behind the Scenes Photo Gallery', '/pinning/#photo-gallery', "/favicon.ico", "blank");
            }

        } catch (ex) {
            // Fail silently
        }
    }

    function logFirstPin() {
        try {
            if (window.external.msIsSiteMode()) {
                // Detect first launch from the Start menu.
                if (window.external.msIsSiteModeFirstRun(false) == 1) {
                    tracker.trackEvent( this, 'o', 'First Pin', 'event13', 'prop14', 'eVar14');
                    Atlas.logJS('SMG_MRTINX_SITE_JasmineV_Pin');
                }
            }
        }
        catch (ex) {
            // Fail silently. Pinned Site API not supported.
        }
    }

});