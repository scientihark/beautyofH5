define(['underscore', './data/config'], function(_, config) {

    // Singleton service used to save pictures to the server

    // see http://permadi.com/blog/2010/10/html5-saving-canvas-image-data-using-php-and-ajax/



    return {

        saveUrl: config.apiPath + 'pic/',

        // Save a snapshot of the canvas to a PHP script that
        save: function ( canvas, onComplete, onError ) {

            var canvasData = canvas.toDataURL("image/png");

            $.ajax({
              type: 'POST',
              url: this.saveUrl,
              data: canvasData,
              success: function(data) {
                  console.log('result', data);
                  onComplete.call( null, data.result );
              },
              error: function () {onError.call( null, arguments[0] );},
              processData: false
            });

        },

        proxyURL: function (url) {
            return 'http://' + document.location.hostname + this.saveUrl + 'proxy?url=' + escape( url );
        }
    }


});