define( ['bumpslide/dispatcher'], function (dispatcher) {

    // singleton for this app
    var self = dispatcher();
    self.logEnabled = false;
    return self;

} );