define(['underscore', './tracker'], function (_, tracker) {

    // singleton manager of timeline overlays, or scenes
    // Each scene is a view with an inFrame and an outframe

    var scenes = [];
    var holder;

    return {

        setHolder: function( scene_holder ) {
            holder = $(scene_holder);
        },

        addScene:function (view, inFrame, outFrame) {

            if(view==undefined) {
                console.error('Scene manager cannot add an undefined scene at frame '+inFrame);
                return;
            }
            scenes.push({ inFrame:inFrame, outFrame:outFrame, view:view  });
        },

        initViews:function () {
            _.each(scenes, function (s) {

                try {
                    s.view.init();
                    //console.log('initializing view and appending ', s.view.el[0], ' to ', holder[0]);
                } catch (e) {
                    console.error("error initializing "+s.view.name + " ", e);
                    return;
                }

                holder.append( s.view.el );

            });
        },

        renderFrame:function (frameNumber) {
            //console.log( '[sceneManager] renderFrame ' + frameNumber );
            _.each(scenes, function (s) {
                if (frameNumber >= s.inFrame && frameNumber <= s.outFrame) {

                    if(!s.view.visible) {
                        s.view.show();

                        //console.log('showing ', s.view.name);
                        // We are showing a new scene, track it
                        if(s.view.pageName!=null) {
                            tracker.trackView( s.view.pageName );
                        }
                    }
                    s.view.show();

                    // If there is a draw function on the scene,
                    // call it and pass in the current frame number relative to its start point
                    if(typeof s.view.draw == 'function') {
                        s.view.draw(frameNumber - s.inFrame );
                    }

                } else {
                    s.view.hide();
                }
            });
        }

    };

});

