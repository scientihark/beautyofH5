// intro screen -

define(['bumpslide/view', 'text!./welcome.html', 'jv/dispatcher' ], function (view, template, dispatcher) {

    var _defaultText;

    var _usernameInput;

    var self = view.extend({
        template:template,
        name:'welcome',
        pageName: "Welcome",
        onInit:onInit,
        transitionIn:function () {
            this.el.stop(true, true).delay(500).fadeIn(1000, 'easeOutQuad');
        }
        /*onShow:function () {
            if ($.cookie('username')) {
                _usernameInput.val($.cookie('username'));
                onNoFb();

                setTimeout( function() { dispatcher.trigger('usernameConnect', $.cookie('username')); }, 750);
            }
        }*/
    });

    self.$ = function (selector) {
        return $(selector, self.el);
    };

    // METHODS
    function onInit() {

        _usernameInput = $("#connect-field-input", self.el);
        _defaultText = _usernameInput.val();

        $(this.el).on('focus', _usernameInput, null, onFieldFocus);
        $(this.el).on('keydown', _usernameInput, null, onFieldKeyDown);
        $(this.el).on('blur', _usernameInput, null, onFieldBlur);
        $(this.el).on('click', "#connect-copy-nofb", null, onNoFb);
        $(this.el).on('click', "#connect-copy-fb", null, onFb);
        $(this.el).on('click', "#connect-fb-link", null, onFbLink);
        $(this.el).on('click', "#connect-field-btn", null, onFieldBtn);
        $(this.el).on('click', "#connect-different-user", null, onDifferentUser);
        $(this.el).on('click', "#connect-continue", null, onContinue);

    }

    function onDifferentUser(event) {
        //console.log('differentUser');
        dispatcher.trigger('differentUser');
        event.preventDefault();
    }

    function onContinue(event) {
        //console.log('continueOn');
        dispatcher.trigger('continueOn');
        event.preventDefault();
    }

    function onFbLink(event) {
        //console.log('facebookLogin');
        dispatcher.trigger('facebookLogin');
        event.preventDefault();
    }

    function onFieldBtn(event) {
        var username = _usernameInput.val();
        if (username == _defaultText) username = "Just a Friend";
        dispatcher.trigger('usernameConnect', username);
        //event.preventDefault();
    }

    function onNoFb(event) {
        if (event) event.preventDefault();
        //$("#connect-fb .connect-box", self.el).stop(true,true).hide();
        $("#connect-fb").hide();
        //$("#connect-fb .connect-copy").hide();
        $("#connect-field", self.el).stop(true,true).fadeIn();
    }

    function onFb(event) {
        if (event) event.preventDefault();
        $("#connect-fb", self.el).stop(true,true).fadeIn();
        $("#connect-field", self.el).stop(true,true).hide();
    }

    function onFieldFocus() {
        if ($(this).val() == _defaultText) {
            $(this).val("");
        }
    }

    function onFieldBlur() {
        if ($(this).val() == "") {
            $(this).val(_defaultText);
        }
    }

    function onFieldKeyDown(e) {
        // on ENTER
        if (e.keyCode === 13) {
            onFieldBlur.call(this);
            onFieldBtn();
        }

        e.stopPropagation();
        //e.preventDefault();
    }


    return self;

});