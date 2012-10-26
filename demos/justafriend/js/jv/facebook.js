// Facebook proxy - singleton
// 

define(['underscore', 'bumpslide/bindable', './media', './pics', 'jv/tracker'], function (_, bindable, media, pics, tracker) {

    var fbConfig = {
        appId:'000000000000000', // App ID
        //channelUrl:undefined, // Channel File
        status:true, // check login status
        cookie:true, // enable cookies to allow the server to access the session
        xfbml:true  // parse XFBML
    };

    var fbAuthScope = 'email,user_hometown,user_photos';
    var profileResponse;
    var imageSources = [];
    var picCanvas;
    var picURL = null
    var postType = null;
    var logInClicked = false;

    var self = bindable({
        status:'unknown',
        profile:null,
        username:'Demetre Arges',
        savingPic:false,
        images:[],
        picture:null
    });

    _.extend(self, {
        init:init,
        logout:logout,
        login:login,
        differentUser:differentUser,
        continueOn:continueOn,
        preloadImages:preloadImages,
        postPic:postPic,
        tweetPic:tweetPic,
        setPicCanvas:function (canvas) {
            picCanvas = canvas;
        },
        getPicCanvas:function () {
            return picCanvas;
        }
    });

    // wait for auth status to stop changing before we actually update
    var handleAuthStatusChange = _.debounce(doHandleAuthStatusChange, 250);

    return self;

    function init(appId, channelUrl, authScope) {

        if (appId != null) fbConfig.appId = appId;
        //if (channelUrl != null) fbConfig.channelUrl = channelUrl;
        if (authScope != null) fbAuthScope = authScope;

        loadFacebook();
    }

    /**
     * Load the Facebook Libs from the facebook server asynchronously
     */
    function loadFacebook() {
        //console.log('loading FB');
        // make sure we have fb-root
        var fb_root = $('#fb-root')[0];
        if (!fb_root) $('body').append('<div id="fb-root">');

        // define async callback
        window.fbAsyncInit = handleFacebookInit;

        // load the facebook connect script
        var d = document;
        var js, id = 'facebook-jssdk';
        if (d.getElementById(id)) return;
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        d.getElementsByTagName('head')[0].appendChild(js);
    }

    /**
     * Facebook API initialization callback
     *
     * Initializes the Facebook API and listens for auth status changes
     */
    function handleFacebookInit() {
        // console.log('Facebook SDK loaded. Initializing with config: ', fbConfig);
        FB.Event.subscribe('auth.statusChange', handleAuthStatusChange);
        FB.init(fbConfig);
        FB.getLoginStatus(handleAuthStatusChange);
    }

    function reloadUserProfile() {
        FB.api('/me', handleUserProfileResponse);
    }

    function handleUserProfileResponse(response) {

        // We have a username
        self.set('username', response.name);

        // wait to set profile until we have image URL's
        // store the response someplace we can get it
        profileResponse = response;

        // request profile picture
        if(logInClicked) {
            FB.api('/me/picture?type=large', handleProfilePicture );
            $("#connect-fb").hide();
            $("#connect-waiting").fadeIn();
        } else {
            //logout();

            $("#user-name").html(response.name);
            $("#connect-fb .connect-box").hide();
            $("#connect-existing-user").fadeIn();
        }

    }

    function handleProfilePicture(response) {
        // We are proxying the profile photo to avoid cross-domain issues when generating PNG's
        var profilePhoto = pics.proxyURL(response);

        // save profile pic image in profile object
        profileResponse.picture = media.getImage( profilePhoto );

        self.set('picture', profileResponse.picture );

        FB.api('/me/photos', handlePhotos );

    }

    function handlePhotos(response) {

        _.each(response.data, function (imageData) {
            imageSources.push(imageData.images[0].source);
        });

        // save image sources in profile object
        profileResponse.imageSources = imageSources;

        // update profile - triggers binding to notify the app that we have a profile
        self.set('profile', profileResponse);
    }

    function preloadImages() {
        var images = [];

        if (imageSources[1])
            images.push(media.getImage(imageSources[1]));

        if (imageSources[3])
            images.push(media.getImage(imageSources[3]));

        if (imageSources[5])
            images.push(media.getImage(imageSources[5]));

        // images are not yet loaded, but we have image objects that are loading
        // app will wait for media load complete, so this is fine
        self.set('images', images);
    }

    function doHandleAuthStatusChange(response) {

        // console.log('Facebook Auth Status:', response, self);

        // status is bindable
        self.set('status', response.status);

        if (response.status == 'connected') {

            var fbEventName = 'Facebook Sign-in Passive';

            reloadUserProfile();

            // Check to see if this was triggered by the click
            // Update the event name to reflect that
            if(logInClicked) {
                fbEventName = 'Facebook Sign-in Click to Connect';
            }

            // Track the event
            tracker.trackEvent( this, 'o', fbEventName, 'event4', 'prop11', 'eVar11');

        } else {
            $(".connect-box").show();
            // user is bindable
            self.set('user', null);
        }
       
    }

    function logout() {
        self.set('status', 'unknown');
        self.set('user', null);

        imageSources = [];
        self.set('profile', null);
        self.set('images', []);

        FB.logout(function (response) {
            //console.log('Logged out.');
        });
    }

    function login(trigger) {
        logInClicked = true;
        //console.log('login');
        FB.login(function () {
            //console.log('welcome newly logged in user');
        }, {scope:fbAuthScope});
    }

    function differentUser() {
        $(".connect-box").show();
        $("#connect-existing-user").hide();
        logout();
    }

    function continueOn() {
        FB.api('/me/picture?type=large', handleProfilePicture );
        $("#connect-waiting").fadeIn();
        $("#connect-fb").hide();
    }

    /*
     function doPostImage(image_url, message) {
     FB.api('/photos', 'post', {
     message:message,
     url:image_url
     }, function (response) {
     if (!response || response.error) {
     alert('Error occured:' + response);
     } else {
     alert('Post ID: ' + response.id);
     }
     });

     }
     */


    /**
     * Post Picture to Facebook
     */
    function postPic() {
        //if (picURL != null && picURL != 'working') {
          //  var picId = picURL.split('/').pop().split('.').shift();
            FB.ui({
                method:'feed',
                name:"Just a Friend",
                picture:"http://www.justafriend.ie/images/fb-share.jpg",
                link:"http://www.justafriend.ie",
                description:"Jasmine Villegas needs your help with some boy trouble. Star as her BFF in her new interactive video."
            });
        //} else {
          //  postType = 'facebook';
           // savePic()
        //}
    }

    /**
     * Post Picture to Twitter
     */
    function tweetPic() {
        //if (picURL != null && picURL != 'working') {
            var description = "Jasmine Villegas needs your help with some boy trouble. Star as her BFF in her new interactive video.";
            var hashtags = "justafriend";
            //var picId = picURL.split('/').pop().split('.').shift();
            //var landingPage = getPublishedURL(picId);
            var landingPage = "http://www.justafriend.ie"
            var tweetIntentURL = "https://twitter.com/intent/tweet?url=" + escape(landingPage) + "&text=" + escape(description) + "&hashtags=" + hashtags;
            var windowOptions = 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0,width=550,height=420,left=100,top=200,titlebar=yes'
            window.open(tweetIntentURL, 'tweet', windowOptions);
        //} else {
          //  postType = 'twitter';
            //savePic()
        //}
    }

    /**
     * Returns URL without anything after the last slash
     */
    function getPublishedURL(picId) {
        if (picId == null) picId = "";
        var bits = document.location.href.split('/');
        bits.pop();
        bits.push(picId);
        return bits.join('/');

    }

    function savePic() {
        if (picURL == null) {
            // console.log('saving pic');
            // save pic
            pics.save(picCanvas, onPicSaved, onPicError);
            picURL = 'working';
            self.set('savingPic', true);
        }
    }

    function onPicSaved(url) {
        picURL = url;
        self.set('savingPic', false);
        if (picURL != null) {
            if (postType == 'facebook') {
                postPic();
            } else {
                tweetPic();
            }
        }
        else {
            console.log("We don't have an image URL to post?");
        }
    }

    function onPicError() {
        console.log('Unable to save pic', arguments);
    }


});