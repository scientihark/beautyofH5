/// <reference path="../../../reference.js" />
var SpectrumManager = new function () {

    var _data = [];

    this.init = function (data, offset) {
        var canvas = DisplayObjectUtil.create("canvas");
        canvas.width = data.width;
        canvas.height = data.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(data, 0, 0);
        var arr = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        for (i = 0; i < arr.length; i++) {
            if (i % 4 < 3) _data.push(arr[i]);
        }
    }

    this.getLevel = function (t) {
        var f = ~~(t * 60);
        return f < 0 || f >= _data.length ? 0 : _data[f]/255;
    }
}
