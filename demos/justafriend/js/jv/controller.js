// manages facebook connection and updates view state based on facebook and preload status
define(['underscore', 'jv/data/config', 'jv/data/model', 'jv/facebook', 'jv/media',
    'jv/sceneManager', 'jv/dispatcher', 'jv/mainView'],
    function (_, config, model, facebook, media, sceneManager, dispatcher, mainView) {

        var controller = {

            init:function () {

                mainView.init();

                dispatcher.bind('facebookLogin', facebook.login);
                dispatcher.bind('usernameConnect', onUsernameConnect);
                dispatcher.bind('differentUser', facebook.differentUser);
                dispatcher.bind('continueOn', facebook.continueOn);

                 if (config.skipFacebook ) {
                    startPreloading();
                } else {
                    // init facebook
                    facebook.init(config.fbAppId, 'email,user_hometown,user_photos,publish_stream');
                    facebook.bind('profile', onFacebookReady, true);
                }
            }
        };

        function onUsernameConnect(event, username) {
            facebook.set('username', username);
            //$.cookie('username', username );
            startPreloading();

        }

        function onFacebookReady(profile) {
            if (profile) {
                startPreloading();
                facebook.preloadImages();
            } else {
                model.set('screen', 0);
            }
        }

        function startPreloading() {
            model.set('screen', 1);
            dispatcher.trigger('preloadStart');
            dispatcher.bind('mediaLoadComplete', onPreloadComplete);
        }


        function onPreloadComplete() {
            model.set('screen', 2);
        }



        return controller;

    });