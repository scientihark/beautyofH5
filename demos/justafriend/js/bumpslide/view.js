define(['underscore'], function (_) {

    // abstract base view
    var view = {

        name:'view',
        visible:false,
        templateProps:{},

        // returns clone of abstract view (subclass) with these additional properties
        extend:function (props) {
            var obj = _.clone(this);
            return _.extend(obj, props);
        },

        toString:function () {
            return '[views/' + this.name + '] ';
        },

        init:function (onCreationComplete) {
            var self = this;
            this.onCreationComplete = onCreationComplete;
            if (!this.template) {
                this.template = '<div>';
            }
            try {
                //console.log(this + 'init()');
                var html = _.template(this.template, this.templateProps);
                self.el = $(html);
            } catch (e) {
                //console.log( 'Error processing template.', this.templateProps );
            }
            if (this.el == null) {
                this.el = $('<div class="templateError">Error loading template for view "' + this.name + '"</div>');
            }

            // hide to start
            this.el.stop(true, true).hide();

            if (this.onInit) this.onInit.call(this);
            if (this.onCreationComplete) this.onCreationComplete(this);
        },

        doInit:function () {
            if (this.onInit) this.onInit.call(this);
            //console.log( 'creation complete', this.onCreationComplete );
            if (this.onCreationComplete) this.onCreationComplete(this);
        },

        show:function (onTransitionComplete) {
            if (this.visible) return false;
            this.visible = true;
            //console.log(this + 'show()');
            if (this.onShow) this.onShow();
            if (this.transitionIn) {
                this.transitionIn(onTransitionComplete);
            } else {
                this.el.stop(true, true).show();
                if (onTransitionComplete) onTransitionComplete();
            }
        },

        hide:function (onTransitionComplete) {
            if (!this.visible) return false;
            this.visible = false;
            //console.log(this + 'hide()');
            if (this.onHide) this.onHide();
            if (this.transitionOut) {
                this.transitionOut(onTransitionComplete);
            } else {
                this.el.stop(true, true).hide();
                if (onTransitionComplete) onTransitionComplete();
            }
        },

        destroy:function () {
            if (this.onDestroy) this.onDestroy.call(this);
            this.el.empty();
        },

        bind:function (event_type, handler) {
            this.el.bind.apply(this.el, arguments);
        },

        unbind:function (event_type, handler) {
            this.el.unbind.apply(this.el, arguments);
        },

        trigger:function () {
            //console.log('trigger ', this, arguments);
            this.el.triggerHandler.apply(this.el, arguments);
        }

    };

    return view;
});