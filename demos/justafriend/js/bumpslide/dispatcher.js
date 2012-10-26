// event dispatcher

define( [], function () {

    var dispatcher = function () {

        var _eventDispatcher = $({});

        return {

            logEnabled: true,

            bind: function ( event_type, handler ) {
                $.fn.bind.apply( _eventDispatcher, arguments );
            },

            unbind: function ( event_type, handler ) {
                $.fn.unbind.apply( _eventDispatcher, arguments );
            },

            trigger: function () {
                if(this.logEnabled) console.log( '[Dispatcher] trigger event:', arguments );
                $.fn.triggerHandler.apply( _eventDispatcher, arguments );
            }
        };

    };

    return dispatcher;
})