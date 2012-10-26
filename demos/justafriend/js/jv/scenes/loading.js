// loading screen -

define(['bumpslide/view', 'text!./loading.html', 'jv/dispatcher', 'jv/sceneManager', 'jv/media', 'underscore', 'jv/scenes/progressBar', 'bumpslide/animation'], function (view, template, dispatcher, sceneManager, media, _, progressBar, animation) {

    var progress_bar;
    var percent_loaded=0;
    var target_percent_loaded=0;
    var anim = animation( render );
    var self = view.extend({
        template:template,
        name:'loading',
        pageName: 'Load',

        onInit: function () {
            progress_bar = progressBar();
            progress_bar.init();

        },

        onShow:function () {
            dispatcher.bind('mediaProgress', updateProgress);
            progress_bar.show();
            anim.run();
            $('.loader_message', self.el).text('');
            $('.loader_message', self.el).append( progress_bar.el );
        },
        onHide:function () {
            dispatcher.unbind('mediaProgress', updateProgress);
            progress_bar.hide();
            anim.pause();
            progress_bar.el.remove();
        }
    });

    return self;

    function updateProgress(event, progress) {
        //$('.loader_message').text('LOADING ' + Math.round(progress * 100) + '%');
        target_percent_loaded = Math.pow( progress, .5);// get us to pink
    }

    function render() {
        percent_loaded += (target_percent_loaded - percent_loaded) * .1;
        progress_bar.setPercent(percent_loaded);
    }

});