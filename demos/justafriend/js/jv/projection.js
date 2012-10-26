/**
 * Image Projection using Canvas
 *
 * This function returns an object that manages an image projection
 *
 * Original Experiment
 * (c) Steven Wittens 2008
 * http://www.acko.net/
 *
 * This version refactored for requireJS by
 * David Knape, http://bumpslide.com/
 */

define(['acko/Matrix', 'underscore'], function (Matrix, _) {

    var DEFAULT_OPTIONS = {
        wireframe:false,
        subdivisionLimit:3,
        patchSize:16
    };

    //
    var projection = function (image, canvas, points, options) {

        if(canvas==null) {
            console.error( 'We need a canvas for this to work.');
            return null;
        }

        if (options == null) options = {};
        options = _.defaults(options, DEFAULT_OPTIONS);


        // private
        var ctx = null, transform = null;
        var iw = 0, ih = 0;

        var self = {

            destroy:function () {
                image = null;
                canvas = null;
            },

            update:update,

            setPoints:function (pts) {
                points = pts;
                update();
            },

            // set source image or canvas
            setSource:function (source_image_or_canvas) {
                image = source_image_or_canvas;
                update();
            },

            clear: function () {
                //console.log('clear');
                canvas.width=1;
                canvas.height=1;
            }
        };

        if (image != null) self.setSource(image);

        return self;


        /**
         * Update the display to match a new point configuration.
         */
        function update() {

            if (canvas == null || image == null || points == null) return;

            // Get extents.
            var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            $.each(points, function () {
                minX = Math.min(minX, Math.floor(this[0]));
                maxX = Math.max(maxX, Math.ceil(this[0]));
                minY = Math.min(minY, Math.floor(this[1]));
                maxY = Math.max(maxY, Math.ceil(this[1]));
            });

            minX--;
            minY--;
            maxX++;
            maxY++;
            var width = maxX - minX;
            var height = maxY - minY;

            // Reshape canvas.
            canvas.style.left = minX + 'px';
            canvas.style.top = minY + 'px';
            canvas.width = width;
            canvas.height = height;

            // Measure texture.
            iw = image.width;
            ih = image.height;

            if(iw==0 || ih==0) return;

            // Set up basic drawing context.
            ctx = canvas.getContext("2d");
            ctx.translate(-minX, -minY);
            //ctx.clearRect(minX, minY, width, height);


            transform = getProjectiveTransform(points);

            // Begin subdivision process.
            var ptl = transform.transformProjectiveVector([0, 0, 1]);
            var ptr = transform.transformProjectiveVector([1, 0, 1]);
            var pbl = transform.transformProjectiveVector([0, 1, 1]);
            var pbr = transform.transformProjectiveVector([1, 1, 1]);

            // clipping path
            ctx.beginPath();
            ctx.moveTo(ptl[0], ptl[1]);
            ctx.lineTo(ptr[0], ptr[1]);
            ctx.lineTo(pbr[0], pbr[1]);
            ctx.lineTo(pbl[0], pbl[1]);
            ctx.closePath();
            ctx.clip();

            ctx.strokeStyle = "#f00";

            divide(0, 0, 1, 1, ptl, ptr, pbl, pbr, options.subdivisionLimit);

            if (options.wireframe) {

                ctx.beginPath();
                ctx.moveTo(ptl[0], ptl[1]);
                ctx.lineTo(ptr[0], ptr[1]);
                ctx.lineTo(pbr[0], pbr[1]);
                ctx.lineTo(pbl[0], pbl[1]);
                ctx.closePath();
                ctx.stroke();
            }
        }


        /**
         * Render a projective patch.
         */
        function divide(u1, v1, u4, v4, p1, p2, p3, p4, limit) {
            // See if we can still divide.
            if (limit) {
                // Measure patch non-affinity.
                var d1 = [p2[0] + p3[0] - 2 * p1[0], p2[1] + p3[1] - 2 * p1[1]];
                var d2 = [p2[0] + p3[0] - 2 * p4[0], p2[1] + p3[1] - 2 * p4[1]];
                var d3 = [d1[0] + d2[0], d1[1] + d2[1]];
                var r = Math.abs((d3[0] * d3[0] + d3[1] * d3[1]) / (d1[0] * d2[0] + d1[1] * d2[1]));

                // Measure patch area.
                d1 = [p2[0] - p1[0] + p4[0] - p3[0], p2[1] - p1[1] + p4[1] - p3[1]];
                d2 = [p3[0] - p1[0] + p4[0] - p2[0], p3[1] - p1[1] + p4[1] - p2[1]];
                var area = Math.abs(d1[0] * d2[1] - d1[1] * d2[0]);

                // Check area > patchSize pixels (note factor 4 due to not averaging d1 and d2)
                // The non-affinity measure is used as a correction factor.
                if ((u1 == 0 && u4 == 1) || ((.25 + r * 5) * area > (options.patchSize * options.patchSize))) {
                    // Calculate subdivision points (middle, top, bottom, left, right).
                    var umid = (u1 + u4) / 2;
                    var vmid = (v1 + v4) / 2;
                    var pmid = transform.transformProjectiveVector([umid, vmid, 1]);
                    var pt = transform.transformProjectiveVector([umid, v1, 1]);
                    var pb = transform.transformProjectiveVector([umid, v4, 1]);
                    var pl = transform.transformProjectiveVector([u1, vmid, 1]);
                    var pr = transform.transformProjectiveVector([u4, vmid, 1]);

                    // Subdivide.
                    limit--;
                    divide(u1, v1, umid, vmid, p1, pt, pl, pmid, limit);
                    divide(umid, v1, u4, vmid, pt, p2, pmid, pr, limit);
                    divide(u1, vmid, umid, v4, pl, pmid, p3, pb, limit);
                    divide(umid, vmid, u4, v4, pmid, pr, pb, p4, limit);

                    if (options.wireframe) {
                        ctx.beginPath();
                        ctx.moveTo(pt[0], pt[1]);
                        ctx.lineTo(pb[0], pb[1]);
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.moveTo(pl[0], pl[1]);
                        ctx.lineTo(pr[0], pr[1]);
                        ctx.stroke();
                    }

                    return;
                }
            }

            // Render this patch.
            ctx.save();

            // Set clipping path.
            ctx.beginPath();
            ctx.moveTo(p1[0], p1[1]);
            ctx.lineTo(p2[0], p2[1]);
            ctx.lineTo(p4[0], p4[1]);
            ctx.lineTo(p3[0], p3[1]);
            ctx.closePath();
            //ctx.clip();

            // Get patch edge vectors.
            var d12 = [p2[0] - p1[0], p2[1] - p1[1]];
            var d24 = [p4[0] - p2[0], p4[1] - p2[1]];
            var d43 = [p3[0] - p4[0], p3[1] - p4[1]];
            var d31 = [p1[0] - p3[0], p1[1] - p3[1]];

            // Find the corner that encloses the most area
            var a1 = Math.abs(d12[0] * d31[1] - d12[1] * d31[0]);
            var a2 = Math.abs(d24[0] * d12[1] - d24[1] * d12[0]);
            var a4 = Math.abs(d43[0] * d24[1] - d43[1] * d24[0]);
            var a3 = Math.abs(d31[0] * d43[1] - d31[1] * d43[0]);
            var amax = Math.max(Math.max(a1, a2), Math.max(a3, a4));
            var dx = 0, dy = 0, padx = 0, pady = 0;

            // Align the transform along this corner.
            switch (amax) {
                case a1:
                    ctx.transform(d12[0], d12[1], -d31[0], -d31[1], p1[0], p1[1]);
                    // Calculate 1.05 pixel padding on vector basis.
                    if (u4 != 1) padx = 1.05 / Math.sqrt(d12[0] * d12[0] + d12[1] * d12[1]);
                    if (v4 != 1) pady = 1.05 / Math.sqrt(d31[0] * d31[0] + d31[1] * d31[1]);
                    break;
                case a2:
                    ctx.transform(d12[0], d12[1], d24[0], d24[1], p2[0], p2[1]);
                    // Calculate 1.05 pixel padding on vector basis.
                    if (u4 != 1) padx = 1.05 / Math.sqrt(d12[0] * d12[0] + d12[1] * d12[1]);
                    if (v4 != 1) pady = 1.05 / Math.sqrt(d24[0] * d24[0] + d24[1] * d24[1]);
                    dx = -1;
                    break;
                case a4:
                    ctx.transform(-d43[0], -d43[1], d24[0], d24[1], p4[0], p4[1]);
                    // Calculate 1.05 pixel padding on vector basis.
                    if (u4 != 1) padx = 1.05 / Math.sqrt(d43[0] * d43[0] + d43[1] * d43[1]);
                    if (v4 != 1) pady = 1.05 / Math.sqrt(d24[0] * d24[0] + d24[1] * d24[1]);
                    dx = -1;
                    dy = -1;
                    break;
                case a3:
                    // Calculate 1.05 pixel padding on vector basis.
                    ctx.transform(-d43[0], -d43[1], -d31[0], -d31[1], p3[0], p3[1]);
                    if (u4 != 1) padx = 1.05 / Math.sqrt(d43[0] * d43[0] + d43[1] * d43[1]);
                    if (v4 != 1) pady = 1.05 / Math.sqrt(d31[0] * d31[0] + d31[1] * d31[1]);
                    dy = -1;
                    break;
            }

            // Calculate image padding to match.
            var du = (u4 - u1);
            var dv = (v4 - v1);
            var padu = padx * du;
            var padv = pady * dv;

            ctx.drawImage(
                image,
                u1 * iw,
                v1 * ih,
                Math.min(u4 - u1 + padu, 1) * iw,
                Math.min(v4 - v1 + padv, 1) * ih,
                dx, dy,
                1 + padx, 1 + pady
            );

            ctx.restore();
        }

        /**
         * Create a canvas at the specified coordinates.
         */
        function createCanvas(x, y, width, height) {
            // Create <canvas>
            var canvas;
            if (typeof G_vmlCanvasManager != 'undefined') {
                canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                $('#canvas').appendChild(canvas);
                canvas = G_vmlCanvasManager.initElement(canvas);
            }
            else {
                canvas = $('<canvas width="' + width + '" height="' + height + '"></canvas>');
                $('#canvas').append(canvas);
                canvas = canvas[0];
            }

            return canvas;
        }

        /**
         * Calculate a projective transform that maps [0,1]x[0,1] onto the given set of points.
         */
        function getProjectiveTransform(points) {
            var eqMatrix = new Matrix(9, 8, [
                [ 1, 1, 1, 0, 0, 0, -points[3][0], -points[3][0], -points[3][0] ],
                [ 0, 1, 1, 0, 0, 0, 0, -points[2][0], -points[2][0] ],
                [ 1, 0, 1, 0, 0, 0, -points[1][0], 0, -points[1][0] ],
                [ 0, 0, 1, 0, 0, 0, 0, 0, -points[0][0] ],

                [ 0, 0, 0, -1, -1, -1, points[3][1], points[3][1], points[3][1] ],
                [ 0, 0, 0, 0, -1, -1, 0, points[2][1], points[2][1] ],
                [ 0, 0, 0, -1, 0, -1, points[1][1], 0, points[1][1] ],
                [ 0, 0, 0, 0, 0, -1, 0, 0, points[0][1] ]

            ]);

            var kernel = eqMatrix.rowEchelon().values;
            var transform = new Matrix(3, 3, [
                [-kernel[0][8], -kernel[1][8], -kernel[2][8]],
                [-kernel[3][8], -kernel[4][8], -kernel[5][8]],
                [-kernel[6][8], -kernel[7][8], 1]
            ]);
            return transform;
        }

    };

    return projection;
});