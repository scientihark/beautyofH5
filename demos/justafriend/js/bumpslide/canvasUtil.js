/**
 * Image Utilities
 *
 */

define([], function () {

    // static methods
    var self = {

        /**
         * Create a canvas of the given width and height
         * @param width
         * @param height
         */
        create:function (width, height) {
            if(width==null) width=64;
            if(height==null) height=64;
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            return canvas;
        },

        /**
         * off-screen rendering helper
         *
         * http://kaioa.com/node/103
         */
        render:function (width, height, renderFunction) {
            var canvas = self.create(width, height);
            renderFunction( canvas.getContext('2d'));
            return canvas;
        },

        /**
         * Returns canvas with image cropped to fill
         *
         * @param img
         * @param width
         * @param height
         * @param alignment (default=.5,centered 0=top/left 1=bottom/right)
         */
        cropImage: function ( img, width, height, alignment ) {

            if(alignment==null) alignment = .5;
            width = Math.round( width );
            height = Math.round( height );

            var canvas = self.create(width, height);
            var ctx = canvas.getContext('2d');

            var target_aspect = width / height;
            var w = img.width;
            var h = img.height;
            var source_aspect = w/h;

            var sw, sh, sx, sy;

            if(source_aspect>target_aspect) {
                // wider, crop off edges
                sh = h;
                sw = target_aspect * h;
                sy = 0;
                sx = Math.round((w - sw) * alignment );
            } else {
                // tall, crop off top and bottom
                sw = w;
                sh = w / target_aspect;
                sx = 0;
                sy = Math.round((h - sh) * alignment );
            }

            ctx.drawImage( img, sx, sy, sw, sh, 0, 0, width, height );
            return canvas;
        },

        /**
         * Get image data for a loaded image,
         * optionally scale the image before draw to canvas
         *
         * @param img
         * @param sw scaled width
         * @param sh scaled height
         */
        getImagePixelData: function (img, sw, sh) {
            if(sw==null) sw = img.width;
            if(sh==null) sh = img.height;

            var image_data;
            self.render( sw, sh, function (ctx) {
                ctx.drawImage( img, 0, 0, sw, sh );
                image_data = ctx.getImageData(0,0,sw,sh);
            });
            return image_data;
        },

        /**
         * Draws a rounded rectangle using the current state of the canvas.
         * If you omit the last three params, it will draw a rectangle
         * outline with a 5 pixel border radius
         *
         * http://js-bits.blogspot.com/2010/07/canvas-rounded-corner-rectangles.html
         *
         * @param {CanvasRenderingContext2D} ctx
         * @param {Number} x The top left x coordinate
         * @param {Number} y The top left y coordinate
         * @param {Number} width The width of the rectangle
         * @param {Number} height The height of the rectangle
         * @param {Number} radius The corner radius. Defaults to 5;
         * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
         * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
         */
        drawRoundRect:function (ctx, x, y, width, height, radius, fill, stroke) {
            if (typeof stroke == "undefined") {
                stroke = true;
            }
            if (typeof radius === "undefined") {
                radius = 3;
            }
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            if (stroke) {
                ctx.stroke();
            }
            if (fill) {
                ctx.fill();
            }
            ctx.restore();
        }


    };

    return self;


})