// Application state singleton

define(['bumpslide/bindable'], function (bindable) {

    var model = bindable({
        screen: 0,
        savingPic: false
    });

    return model;

});