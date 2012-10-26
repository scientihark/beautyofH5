define( [], function() {

    // tweaked version of Paul Irish's requestAnimFrame
    // shim layer with setTimeout fallback - see https://gist.github.com/979055
    (function(){
        window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(b,a){return window.setTimeout(function(){b(+new Date)},1000/60)}})();
        window.cancelRequestAnimFrame=(function(){return window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout})()
    })();

    /**
     * Wrapper around requestAnimFrame (included)
     *
     * Example:
     *
     * var myIntroAnim = animation( renderIntro );
     *
     * function renderIntro( time ) {
     *   intro.css({left: Math.sin( time/1000 * Math.PI*2 ) * 200 });
     * }
     *
     * myIntroAnim.run();
     *
     * setTimeout( function() {
     *   myIntroAnim.pause();
     * }, 3000 );
     *
     * 
     */
    
    return function ( render_function, element_scope ) {
        
        var paused = false,
            render = render_function,
            animRequest = null;
        
        // animation object
        return {
            run: function(){
                paused = false;
                doRender();
            },

            pause: function () {
                paused = true;
                cancelRequestAnimFrame( animRequest );
            },

            setRenderFunction: function ( render_function ) {
                render = render_function;
            }
        }
        
        
        
        function doRender(time) {
            // cancel doesn't work on mozilla yet?
            // return if paused (don't request another frame)
            if(paused) return;
            
            // call the render function
            if(typeof render == 'function') {
                render(time);
            }

            cancelRequestAnimFrame( animRequest );


            // run again
            animRequest = requestAnimFrame( doRender, element_scope );
        }
    };
    
    
});