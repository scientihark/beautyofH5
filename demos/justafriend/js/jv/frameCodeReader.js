/**
 * This module returns an object with a single static method that reads a frame number
 * from a set of black and white pixels burned into the upper right corner of the video.
 */

define(['bumpslide/canvasUtil'], function (canvasUtil) {

    return function (video, fps, maxframes) {

        // maxframes is the upper bounds for sanity check on the frame counter
        if(maxframes==null) maxframes=10000;

        var frame_canvas = canvasUtil.create(1, 16),
            frame_canvas_ctx = frame_canvas.getContext('2d');

        return {
            getCurrentFrame:function () {

                // Draw the 1x16 slice of pixels from the video onto a canvas buffer
                frame_canvas_ctx.drawImage(video, 961, 0, 1, 16, 0, 0, 1, 16);

                try {
                    // get the raw image data (an array of RGBA values)
                    var timeData = frame_canvas_ctx.getImageData(0, 0, 1, 16).data;
                } catch ( e ) {
                    console.log('Error reading timecode', e);
                    return 0;
                }

                // R + G + B   (255 * 3)==Black  (0)==White
                var fifty_pct_black = 255 * 1.5;
                var frame = 0;
                var value;

                // read each pixel to see if it is black or white
                for (var i = timeData.length - 1; i >= 0; i -= 4) {

                    // If R+G+B > 50% black, then it is black (bit is on)
                    value = (timeData[i - 3] + timeData[i - 2] + timeData[i - 1]) > fifty_pct_black ? 1 : 0;

                    // combine bits to get decimal frame number
                    if (Math.floor(i / 4) == 15) {
                        frame = value << Math.floor(i / 4);
                    } else {
                        frame |= value << Math.floor(i / 4);
                    }
                }

                // If we get an invalid frame code, it means we didn't read it right,
                // so we resort to frame number calculated from the videos currentTime property.
                // This happens when frame code is garbled due to video compression artifacts.

                if ((frame == 0 || frame>maxframes) && video.currentTime > 1) {
                    frame = Math.round(video.currentTime * fps);
                    //console.log('frame code fail: '+ frame);
                    return frame;
                } else {
                    //console.log('frame code: ' + frame);
                    return frame;
                }
            }}
    }


})
