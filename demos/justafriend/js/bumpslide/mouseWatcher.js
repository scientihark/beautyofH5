define([], function () {

    return function () {

        var mouseWatcher = {

            passive: true,

            loc:{ x:0, y:0 },

            target:null,

            // start watching the mouse
            start:function () {
                this.passive = true;
                $(document).bind('mousemove', onMouseMove);
                $(document).bind('MSPointerDown', onMSPointerDown);
            },

            // stop watching the mouse
            stop:function () {
                $(document).unbind('mousemove', onMouseMove);
                $(document).unbind('MSPointerDown', onMSPointerDown);                
                $(document).unbind('MSPointerMove', onMSPointerMove);
            },

            getLocal:function (scope) {
                var offset = $(scope).offset();
                return { x:this.loc.x - offset.left, y:this.loc.y - offset.top };
            }
        };

        return mouseWatcher;

        function onMouseMove(e) {
            mouseWatcher.loc.x = e.pageX;
            mouseWatcher.loc.y = e.pageY;
            mouseWatcher.passive = false;
        }

        function onMSPointerDown(e){
            e.originalEvent.preventMouseEvent();          
            $(document).bind('MSPointerMove', onMSPointerMove);
        }

        /*function onMSPointerUp(e){
            console.log('mspointerup - mousewatcher');            
            $(document).unbind('MSPointerMove', onMSPointerMove);
        }*/

        function onMSPointerMove(e){
            e.originalEvent.preventMouseEvent();            
            mouseWatcher.loc.x = e.originalEvent.pageX;
            mouseWatcher.loc.y = e.originalEvent.pageY;
        }

    }

});