function audioDecoder(player) {
    this.player = player;

    var onplay, onpause, onvolume, onformat, onbuffer, onprogress, onduration, onmetadata;
    
	player.on('duration', onduration = function(duration) {
		$decoder_dure=duration?duration:360000;
    });
	
	player.on('buffer', onbuffer = function(percent) {
        $decoder_buff=percent;
    });
    
    player.on('format', onformat = function(format) {
   //
    });
    
    player.on('progress', onprogress = function(time) {
		player_times(time);
    });
    
    player.on('format', onformat = function(format) {
        //
    });
    
    function find(data, keys) {
        for (var i = 0; i < keys.length; i++) {
            var val = data[keys[i]];
            if (val) return val;
        }
        
        return 'Unknown ' + keys[0];
    }
    
    player.on('metadata', onmetadata = function(data) {
       //
    });
    
   
    player.on('error', onerror = function(e) {
        // reset state
        console.error(e);
    });
    
    player.volume = $play_vol;
    $audio_decoder_info=player;
	$audio_decoder_info.play();
	$audio_decoder_info.pause();
    this.disconnect = function() {
        if (player) player.stop();
        

        player.off('buffer', onbuffer);
        player.off('format', onformat);
        player.off('progress', onprogress);
        player.off('duration', onduration);
        player.off('metadata', onmetadata);
    }
}