define(['bumpslide/view', 'text!./endScreen.html', 'bumpslide/animation', 'jv/facebook', 'jv/pics', 'jv/media', 'jv/tracker', 'underscore'], function (view, template, animation, facebook, pics, media, tracker, _) {

    return function () {

        // CONSTANTS
        var DANCER, GLASSES, REPLAY, RECORD, TWITTER, FACEBOOK;
        DANCER = DANCER = [{left:0, top:0, w:250, h:242, x:710, y:298},{left:-250, top:0, w:250, h:242, x:710, y:298},{left:-500, top:0, w:250, h:242, x:710, y:298},{left:-750, top:0, w:250, h:242, x:710, y:298},{left:0, top:-242, w:250, h:242, x:710, y:298},{left:-250, top:-242, w:250, h:242, x:710, y:298},{left:-500, top:-242, w:250, h:242, x:710, y:298},{left:-750, top:-242, w:250, h:242, x:710, y:298},{left:0, top:-484, w:250, h:242, x:710, y:298},{left:-250, top:-484, w:250, h:242, x:710, y:298},{left:-500, top:-484, w:250, h:242, x:710, y:298},{left:-750, top:-484, w:250, h:242, x:710, y:298},{left:0, top:-726, w:250, h:242, x:710, y:298},{left:-250, top:-726, w:250, h:242, x:710, y:298},{left:-500, top:-726, w:250, h:242, x:710, y:298},{left:-750, top:-726, w:250, h:242, x:710, y:298},{left:0, top:-968, w:250, h:242, x:710, y:298},{left:-250, top:-968, w:250, h:242, x:710, y:298},{left:-500, top:-968, w:250, h:242, x:710, y:298},{left:-750, top:-968, w:250, h:242, x:710, y:298},{left:0, top:-1210, w:250, h:242, x:710, y:298},{left:-250, top:-1210, w:250, h:242, x:710, y:298},{left:-500, top:-1210, w:250, h:242, x:710, y:298}];
        GLASSES = [{left:-852, top:-181, w:284, h:181, x:91, y:0},{left:-852, top:0, w:284, h:181, x:91, y:0},{left:-568, top:-181, w:284, h:181, x:91, y:0},{left:-568, top:0, w:284, h:181, x:91, y:0},{left:-284, top:-181, w:284, h:181, x:91, y:0},{left:-284, top:0, w:284, h:181, x:91, y:0},{left:0, top:-181, w:284, h:181, x:91, y:0},{left:0, top:0, w:284, h:181, x:91, y:0}];
	    REPLAY = [{left:0, top:0, w:165, h:170, x:270, y:262},{left:-165, top:0, w:165, h:170, x:270, y:262},{left:-330, top:0, w:165, h:170, x:270, y:262},{left:0, top:-170, w:165, h:170, x:270, y:262},{left:-165, top:-170, w:165, h:170, x:270, y:262},{left:-330, top:-170, w:165, h:170, x:270, y:262},{left:0, top:-340, w:165, h:170, x:270, y:262},{left:-165, top:-340, w:165, h:170, x:270, y:262},{left:-330, top:-340, w:165, h:170, x:270, y:262},{left:0, top:-510, w:165, h:170, x:270, y:262},{left:-165, top:-510, w:165, h:170, x:270, y:262},{left:-330, top:-510, w:165, h:170, x:270, y:262},{left:0, top:-680, w:165, h:170, x:270, y:262},{left:-165, top:-680, w:165, h:170, x:270, y:262},{left:-330, top:-680, w:165, h:170, x:270, y:262},{left:0, top:-850, w:165, h:170, x:270, y:262},{left:-165, top:-850, w:165, h:170, x:270, y:262},{left:-330, top:-850, w:165, h:170, x:270, y:262},{left:0, top:-1020, w:165, h:170, x:270, y:262},{left:-165, top:-1020, w:165, h:170, x:270, y:262},{left:-330, top:-1020, w:165, h:170, x:270, y:262}];
        RECORD = [{left:0, top:0, w:225, h:154, x:681, y:88},{left:0, top:-154, w:225, h:154, x:681, y:88},{left:0, top:-308, w:225, h:154, x:681, y:88}];
        TWITTER = [{left:0, top:0, w:67, h:70, x:187, y:431},{left:-67, top:0, w:67, h:70, x:187, y:431},{left:-134, top:0, w:67, h:70, x:187, y:431},{left:-201, top:0, w:67, h:70, x:187, y:431},{left:-268, top:0, w:67, h:70, x:187, y:431},{left:-335, top:0, w:67, h:70, x:187, y:431},{left:-402, top:0, w:67, h:70, x:187, y:431},{left:0, top:-70, w:67, h:70, x:187, y:431},{left:-67, top:-70, w:67, h:70, x:187, y:431},{left:-134, top:-70, w:67, h:70, x:187, y:431},{left:-201, top:-70, w:67, h:70, x:187, y:431},{left:-268, top:-70, w:67, h:70, x:187, y:431},{left:-335, top:-70, w:67, h:70, x:187, y:431},{left:-402, top:-70, w:67, h:70, x:187, y:431},{left:0, top:-140, w:67, h:70, x:187, y:431},{left:-67, top:-140, w:67, h:70, x:187, y:431},{left:-134, top:-140, w:67, h:70, x:187, y:431},{left:-201, top:-140, w:67, h:70, x:187, y:431},{left:-268, top:-140, w:67, h:70, x:187, y:431},{left:-335, top:-140, w:67, h:70, x:187, y:431}];
	    FACEBOOK = [{left:0, top:0, w:45, h:70, x:142, y:431},{left:-45, top:0, w:45, h:70, x:142, y:431},{left:-90, top:0, w:45, h:70, x:142, y:431},{left:-135, top:0, w:45, h:70, x:142, y:431},{left:-180, top:0, w:45, h:70, x:142, y:431},{left:0, top:-70, w:45, h:70, x:142, y:431},{left:-45, top:-70, w:45, h:70, x:142, y:431},{left:-90, top:-70, w:45, h:70, x:142, y:431},{left:-135, top:-70, w:45, h:70, x:142, y:431},{left:-180, top:-70, w:45, h:70, x:142, y:431},{left:0, top:-140, w:45, h:70, x:142, y:431},{left:-45, top:-140, w:45, h:70, x:142, y:431},{left:-90, top:-140, w:45, h:70, x:142, y:431},{left:-135, top:-140, w:45, h:70, x:142, y:431},{left:-180, top:-140, w:45, h:70, x:142, y:431}];

        // VARIABLES
        var _dancerRender, _dancerFrame, _dancerTotalFrames, _glassesRender, _glassesFrame,
            _glassesTotalFrames, _replayRender, _replayFrame, _replayTotalFrames, _recordRender,
            _recordFrame, _recordTotalFrames, _twitterRender, _twitterFrame, _twitterTotalFrames,
            _facebookRender, _facebookFrame, _facebookTotalFrames, _phoneNumber, _isCalling;

        var userName = "Fred Jones";

        var self = view.extend({
            template:template,
            name:'endScreen',
            pageName: "End Scene",
            transitionIn:function () {
                self.el.stop(true,true).hide().fadeIn(400);
            },
            onInit:onInit,
            onShow:onShow,
            onHide:onHide

        });

        return self;

        function onInit() {

            _dancerRender = animation(renderDancer);
            _glassesRender = animation(renderGlasses);
            _replayRender = animation(renderReplay);
            _recordRender = animation(renderRecord);
            _twitterRender = animation(renderTwitter);
            _facebookRender = animation(renderFacebook);

            // STOP MOTION SPEED
            _dancerTotalFrames = DANCER.length * (60 / 24);
            _glassesTotalFrames = GLASSES.length * (60 / 12);
            _replayTotalFrames = REPLAY.length * (60 / 20);
            _recordTotalFrames = RECORD.length * (60 / 10);
            _twitterTotalFrames = TWITTER.length * (60 / 60);
            _facebookTotalFrames = FACEBOOK.length * (60 / 24);

            facebook.bind('username', setUserName, true);
        }

        // PUBLIC METHODS
        function onShow() {
            //console.log('onShow');
            initialState();
            initEvents();
        }

        function onHide() {
            //console.log('onHide');
            if (_dancerRender) _dancerRender.pause();
            if (_glassesRender) _glassesRender.pause();
            if (_replayRender) _replayRender.pause();
            if (_recordRender) _recordRender.pause();
            if (_twitterRender) _twitterRender.pause();
            if (_facebookRender) _facebookRender.pause();
            cancelCall();
            removeEvents();
        }

        function setUserName(val) {
            userName = val;
        }

        function getDisplayName() {
            var names = userName.split(' ');
            var label = names[0];
            if (names.length > 1) {
                label += ' ' + names[names.length - 1].substr(0, 1);
            }
            return label;
        }

        function initialState() {
            _phoneNumber = "";
            _isCalling = false;
            _dancerFrame = 0;
            _glassesFrame = 0;
            _replayFrame = 0;
            _recordFrame = 0;
            _twitterFrame = 0;
            _facebookFrame = 0;
            renderDancer();
            renderGlasses();
            renderReplay();
            renderRecord();
            renderTwitter();
            renderFacebook();
        }

        function initEvents() {
            // CLICKS

            $("#end-record", self.el).bind("click", onRecord);
            $("#end-twitter", self.el).bind("click", onTwitter);
            $("#end-facebook", self.el).bind("click", onFacebook);

            // ROLLOVERS
            $("#end-dancer", self.el).bind("mouseover", onOverDancer);
            $("#end-dancer", self.el).bind("mouseout", onOutDancer);
            $("#end-glasses", self.el).bind("mouseover", onOverGlasses);
            $("#end-glasses", self.el).bind("mouseout", onOutGlasses);
            $("#end-replay", self.el).bind("mouseover", onOverReplay);
            $("#end-replay", self.el).bind("mouseout", onOutReplay);
            $("#end-record", self.el).bind("mouseover", onOverRecord);
            $("#end-record", self.el).bind("mouseout", onOutRecord);
            $("#end-twitter", self.el).bind("mouseover", onOverTwitter);
            $("#end-twitter", self.el).bind("mouseout", onOutTwitter);
            $("#end-facebook", self.el).bind("mouseover", onOverFacebook);
            $("#end-facebook", self.el).bind("mouseout", onOutFacebook);

            // PHONE EVENTS
			$(".end-keypad-item", self.el).bind("mouseover", onKeypadOver);
			$(".end-keypad-item", self.el).bind("mouseout", onKeypadOut);
			$(".end-keypad-item", self.el).bind("click", onKeypadUp);
            $(window).bind("keypress", onKeyPress);
            $(window).bind("keyup", onKeyUp);
            $("#end-erase", self.el).bind("click", onErase);
            $("#end-call", self.el).bind("click", onCall);

            facebook.bind('savingPic', onSavingPicChanged );
        }

        function onSavingPicChanged( weAreBusySaving ) {
            if(weAreBusySaving) showSaving();
            else hideSaving();
        }


        function removeEvents() {
            // CLICKS
            $("#end-dancer", self.el).unbind("click");
            $("#end-glasses", self.el).unbind("click");
            $("#end-replay", self.el).unbind("click");
            $("#end-record", self.el).unbind("click");
            $("#end-twitter", self.el).unbind("click");
            $("#end-facebook", self.el).unbind("click");

            // ROLLOVERS
            $("#end-dancer", self.el).unbind("mouseover");
            $("#end-dancer", self.el).unbind("mouseout");
            $("#end-glasses", self.el).unbind("mouseover");
            $("#end-glasses", self.el).unbind("mouseout");
            $("#end-replay", self.el).unbind("mouseover");
            $("#end-replay", self.el).unbind("mouseout");
            $("#end-record", self.el).unbind("mouseover");
            $("#end-record", self.el).unbind("mouseout");
            $("#end-twitter", self.el).unbind("mouseover");
            $("#end-twitter", self.el).unbind("mouseout");
            $("#end-facebook", self.el).unbind("mouseover");
            $("#end-facebook", self.el).unbind("mouseout");

            // PHONE EVENTS
			$(".end-keypad-item", self.el).unbind("mouseover");
			$(".end-keypad-item", self.el).unbind("mouseout");
			$(".end-keypad-item", self.el).unbind("click");
            $(window).unbind("keypress");
            $(window).unbind("keyup");
            $("#end-erase", self.el).unbind("click");
            $("#end-call", self.el).unbind("click");
        }

        function onRecord(event) {
            var $this = $(this);
            event.preventDefault();
            // el, type, name, eventID, eVar, prop)
            tracker.trackEvent( this, 'd', 'Remix Download', 'event14', 'prop16', 'eVar16');
            _.delay(function(){
                window.location = $this.attr('href');
            }, 800);
        }

        function onTwitter(event) {
            event.preventDefault();
            Atlas.logJS($(this).data('atlas'));
            tracker.trackEvent( this, 'o', 'Twitter Share Click', 'event5', 'prop12', 'eVar12');
            facebook.tweetPic();
        }

        function onFacebook(event) {
            event.preventDefault();
            Atlas.logJS($(this).data('atlas'));
            tracker.trackEvent( this, 'o', 'Facebook Share Click', 'event5', 'prop12', 'eVar12');
            facebook.postPic();
        }
    
    	function onKeypadOver(event) {
    		event.preventDefault();
    		$(this).stop().css({opacity:0}).animate({opacity:1}, 50);
    	}
    
    	function onKeypadOut(event) {
    		event.preventDefault();
    		$(this).stop().css({opacity:1}).delay(150).animate({opacity:0}, 100);
    	}
    
    	function onKeypadUp(event) {
    		event.preventDefault();
    		var id = event.currentTarget.id;
    		var idSplit = id.split("-");
    		var index = idSplit[idSplit.length - 1];
    		var char = index;
    		if (char == "star") char = "*";
    		else if (char == "pound") char = "#";
    		addNumber(char);
    	}

        function onKeyPress(event) {
            event.preventDefault();
            var key = String.fromCharCode(event.which);
            var element = "#";

            switch (key) {
                case "1":
                    element += "end-keypad-1";
                    break;
                case "2":
                    element += "end-keypad-2";
                    break;
                case "3":
                    element += "end-keypad-3";
                    break;
                case "4":
                    element += "end-keypad-4";
                    break;
                case "5":
                    element += "end-keypad-5";
                    break;
                case "6":
                    element += "end-keypad-6";
                    break;
                case "7":
                    element += "end-keypad-7";
                    break;
                case "8":
                    element += "end-keypad-8";
                    break;
                case "9":
                    element += "end-keypad-9";
                    break;
                case "*":
                    element += "end-keypad-star";
                    break;
                case "0":
                    element += "end-keypad-0";
                    break;
                case "#":
                    element += "end-keypad-pound";
                    break;
            }

            if (element != "#") {
                $(element, self.el).stop().css({opacity:0}).animate({opacity:1}, 50).delay(150).animate({opacity:0}, 50);
                addNumber(key);
            }
        }

        function onKeyUp(event) {
            if (event.which == 8) {
                event.preventDefault();
                erase();
            }
        }

        function addNumber(number) {
            _phoneNumber += number;
            updateNumber();
        }

        function onErase(event) {
            event.preventDefault();
            erase();
        }

        function erase() {
            _phoneNumber = _phoneNumber.substr(0, _phoneNumber.length - 1);
            updateNumber();
        }

        function updateNumber() {
            var value;
            if (_phoneNumber.length > 10 || _phoneNumber.length <= 3) {
                value = _phoneNumber;
            } else if (_phoneNumber.length >= 8) {
                value = "(" + _phoneNumber.substr(0, 3) + ") " + _phoneNumber.substr(3, 3) + "-" + _phoneNumber.substr(6, _phoneNumber.length - 6);
            } else if (_phoneNumber.length >= 4) {
                value = _phoneNumber.substr(0, 3) + "-" + _phoneNumber.substr(3, _phoneNumber.length - 3);
            }

            $("#end-number").text(value);
        }

        function onCall(event) {
            event.preventDefault();
            doCall();
        }

        function doCall() {


            // dknape: TROPO CODE

            // remove all non-digits
            var number = _phoneNumber.replace(/[^\d.]/g, '');

            // enforce less than 11 digit phone number
            if (number.toString().length > 11) {
                alert('Please enter a valid phone number.');
                //cancelCall();
                return false;
            }

            _isCalling = true;

            $("#end-phone-calling-name").text(getDisplayName());
            $("#end-phone-calling-number").text($("#end-number").text());

            $("#end-phone-calling").show();
            $("#end-phone-calling", self.el).bind("click", onEndCall);

            //console.log('calling number: ', number);

            var message_num = Math.ceil(Math.random()*7);
            $.getJSON('api/tropo/call/' + number + '/' + message_num, function (data) {

                //console.log("Result", data);
                if(data.error != null) {
                    if(data.error.code == 400) {
                         alert('Sorry, Jasmine can only call each number once a day!');
                         cancelCall();
                    }
                }

            }).error( function () {
                    //console.log('Error', arguments);
            });
            return false;

        }

        function onEndCall(event) {
            event.preventDefault();
            cancelCall();
        }

        function cancelCall() {
            if (_isCalling) {
                _isCalling = false;
                _phoneNumber = "";
                updateNumber();
                $("#end-phone-calling", self.el).unbind("click");
                $("#end-phone-calling").hide();
            }
        }

        // DANCER
        function onOverDancer(event) {
            _dancerRender.run();
        }

        function onOutDancer(event) {
            _dancerRender.pause();
            resetDancer();
        }

        function resetDancer() {
            _dancerFrame = 0;
            renderDancer();
        }

        function renderDancer() {
            var newFrame = _dancerFrame * (DANCER.length / _dancerTotalFrames);
            newFrame = Math.min(DANCER.length, Math.max(0, Math.round(newFrame)));

            if (newFrame >= DANCER.length) {
                _dancerFrame = (_dancerTotalFrames / DANCER.length);
            } else {
                $("#end-dancer-spritesheet").css({left:DANCER[newFrame].left, top:DANCER[newFrame].top});
                $("#end-dancer").css({left:DANCER[newFrame].x, top:DANCER[newFrame].y, width:DANCER[newFrame].w, height:DANCER[newFrame].h});
                _dancerFrame++;
            }
        }

        // GLASSES
        function onOverGlasses(event) {
            _glassesRender.run();
        }

        function onOutGlasses(event) {
            _glassesRender.pause();
            resetGlasses();
        }

        function resetGlasses() {
            _glassesFrame = 0;
            renderGlasses();
        }

        function renderGlasses() {
            var newFrame = _glassesFrame * (GLASSES.length / _glassesTotalFrames);
            newFrame = Math.min(GLASSES.length, Math.max(0, Math.round(newFrame)));

            if (newFrame >= GLASSES.length) {
                _glassesFrame = 0;
            } else {
                $("#end-glasses-spritesheet", self.el).css({left:GLASSES[newFrame].left, top:GLASSES[newFrame].top});
                $("#end-glasses", self.el).css({left:GLASSES[newFrame].x, top:GLASSES[newFrame].y, width:GLASSES[newFrame].w, height:GLASSES[newFrame].h});
                _glassesFrame++;
            }
        }

        // REPLAY
        function onOverReplay(event) {
            _replayRender.run();
        }

        function onOutReplay(event) {
            _replayRender.pause();
            resetReplay();
        }

        function resetReplay() {
            _replayFrame = 0;
            renderReplay();
        }

        function renderReplay() {
            var newFrame = _replayFrame * (REPLAY.length / _replayTotalFrames);
            newFrame = Math.min(REPLAY.length, Math.max(0, Math.round(newFrame)));

            if (newFrame >= REPLAY.length) {
                _replayFrame = 0;
            } else {
                $("#end-replay-spritesheet", self.el).css({left:REPLAY[newFrame].left, top:REPLAY[newFrame].top});
                $("#end-replay", self.el).css({left:REPLAY[newFrame].x, top:REPLAY[newFrame].y, width:REPLAY[newFrame].w, height:REPLAY[newFrame].h});
                _replayFrame++;
            }
        }

        // RECORD
        function onOverRecord(event) {
            _recordRender.run();
        }

        function onOutRecord(event) {
            _recordRender.pause();
            resetRecord();
        }

        function resetRecord() {
            _recordFrame = 0;
            renderRecord();
        }

        function renderRecord() {
            var newFrame = _recordFrame * (RECORD.length / _recordTotalFrames);
            newFrame = Math.min(RECORD.length, Math.max(0, Math.round(newFrame)));

            if (newFrame >= RECORD.length) {
                _recordFrame = (_recordTotalFrames / RECORD.length);
            } else {
                $("#end-record-spritesheet", self.el).css({left:RECORD[newFrame].left, top:RECORD[newFrame].top});
                $("#end-record", self.el).css({left:RECORD[newFrame].x, top:RECORD[newFrame].y, width:RECORD[newFrame].w, height:RECORD[newFrame].h});
                _recordFrame++;
            }
        }

        // TWITTER
        function onOverTwitter(event) {
            _twitterRender.run();
        }

        function onOutTwitter(event) {
            _twitterRender.pause();
            resetRecord();
        }

        function resetTwitter() {
            _twitterFrame = 0;
            renderTwitter();
        }

        function renderTwitter() {
            var newFrame = _twitterFrame * (TWITTER.length / _twitterTotalFrames);
            newFrame = Math.min(TWITTER.length, Math.max(0, Math.round(newFrame)));

            if (newFrame >= TWITTER.length) {
                _twitterFrame = (_twitterTotalFrames / TWITTER.length);
            } else {
                $("#end-twitter-spritesheet", self.el).css({left:TWITTER[newFrame].left, top:TWITTER[newFrame].top});
                $("#end-twitter", self.el).css({left:TWITTER[newFrame].x, top:TWITTER[newFrame].y, width:TWITTER[newFrame].w, height:TWITTER[newFrame].h});
                _twitterFrame++;
            }
        }

        // FACEBOOK
        function onOverFacebook(event) {
            _facebookRender.run();
        }

        function onOutFacebook(event) {
            _facebookRender.pause();
            resetFacebook();
        }

        function resetFacebook() {
            _facebookFrame = 0;
            renderFacebook();
        }

        function renderFacebook() {
            var newFrame = _facebookFrame * (FACEBOOK.length / _facebookTotalFrames);
            newFrame = Math.min(FACEBOOK.length, Math.max(0, Math.round(newFrame)));

            if (newFrame >= FACEBOOK.length) {
                _facebookFrame = (_facebookTotalFrames / FACEBOOK.length);
            } else {
                $("#end-facebook-spritesheet").css({left:FACEBOOK[newFrame].left, top:FACEBOOK[newFrame].top});
                $("#end-facebook").css({left:FACEBOOK[newFrame].x, top:FACEBOOK[newFrame].y, width:FACEBOOK[newFrame].w, height:FACEBOOK[newFrame].h});
                _facebookFrame++;
            }
        }
        
        // SAVING
    	function showSaving() {
    		$("#end-saving").stop(true, true).delay(500).fadeIn(150);
    	}
    
    	function hideSaving() {
    		$("#end-saving").stop(true,true).fadeOut(150);
    	}

    }
});