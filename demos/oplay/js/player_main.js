player_inti_a();
function player_inti_a(){
	console.log("Oplay-inti: Oplay-开放视界，聆听生活-"+$version+" "+$version_b);
	document.body.addEventListener("mouseover",full_screen,false);
	var yyy=function(){
		document.body.removeEventListener("mouseover",full_screen,false);
	}
	setTimeout(yyy,1000);
	document.title="Oplay-开放视界，聆听生活-"+$version+" "+$version_b;
	if (!window.Audio || !('mozWriteAudio' in new Audio()) && !window.AudioContext && !window.webkitAudioContext) {
    	unsupported = true;
    	alert("不推荐的浏览器，请使用Firefox 13+(最佳体验),或chrome 16+(无波谱分析)");
		console.error("不推荐的浏览器，请使用Firefox 13+(最佳体验),或chrome 16+(无波谱分析)");
	}
	var mw=document.body.clientWidth;
	var aa=(mw+30)/2;
	document.getElementById('loading_1').style.left=(aa-30)+"px";
	document.getElementById('loading_2').style.left=(aa-10)+"px";
	document.getElementById('loading_3').style.left=(aa+10)+"px";
	document.getElementById('loading_4').style.left=(aa+30)+"px";
	//document.getElementById('loading_logo').style.left=(aa-100)+"px";
	//document.getElementById('loading_sta').style.left=(aa+40)+"px";
	//document.getElementById('loading_text').style.left=(aa-100)+"px";
	//document.getElementById('loading_cloud').style.left=(aa-690)+"px";
	document.getElementById('loading_img').style.left=(aa-150)+"px";
	document.getElementById('loading_img').style.top=(document.getElementById('loading_1').offsetTop-500)+"px";
	document.getElementById('loading').style.width=(mw+30)+"px";
	document.getElementById('loading').style.left="0px";
	document.getElementById('loading_img').className="loading_img_now";
	inti_styles();
	document.getElementById('loading_ver').innerHTML="Oplay | "+$version+" | | "+$version_b+" | Scientihark | |copyright 2012| |<a href=\"http://scientihark.github.com/oplay/\" >Fork me on Github</a>|";
	player_inti_loading(1,1);
	window.onload=setTimeout(player_inti_b,3000);
	/*popschange=function (event) {
		if(event.state.action){
			player_play(event.state.action);
		}
	};
	window.addEventListener("popstate",popschange,false);*/
}
function player_inti_loading($ida,$idb){
	var $cgd=0;
	if($ida==5){
		$ida=1;
		$idb++;
		if($idb==2){
			$cgd=1;
		}
	}
	if($idb==3){
		$idb=0;
	}
	if($loadingover==0){
		var aa="player_inti_loading_do("+$ida+","+$idb+");";
		if($cgd==0){
			setTimeout(aa,300);
		}else{
			setTimeout(aa,1000);
		}
	}
}
function player_inti_loading_do($ida,$idb){
	var ta=Array("loading_none","loading_now","loading_over");
	document.getElementById('loading_'+$ida).className=ta[$idb];
	$ida++;
	player_inti_loading($ida,$idb);
}
function player_inti_b(){
	random_bg();
	setTimeout(player_inti_c,2000);
}
function player_inti_c(){
	document.getElementById('loading').style.left=-(document.body.clientWidth+30)+"px";
	setTimeout(player_inti_d,1000);
}
function player_inti_d(){
	$loadingover=1;
	if(!$playlist){
		console.error("error!无法找到播放列表，请确保$playlist在播放器初始化前加载!");
		return;
	}
	if($playlist['0']['c']==-1){
		autocontsrc();
	}
	$total_lst_page=getpagenum($playlist['0']['c'],$plst_itemcount);
	plst_makelst(1,$plst_itemcount);
	player_plays=function(){player_play(-2);};
	document.getElementById('header_con_p').addEventListener("click",player_plays,false);
	document.getElementById('header_con_pres').addEventListener("click",play_pre,false);
	document.getElementById('header_con_nexts').addEventListener("click",play_next,false);
	document.getElementById('header_subcon_loop').addEventListener("click",play_loop,false);
	document.getElementById('header_con_sound').addEventListener("click",play_silent,false);
	document.getElementById('header_subcon_lrc').addEventListener("click",player_showlrc,false);
	document.getElementById('header_subcon_lst').addEventListener("click",player_showlst,false);
	document.getElementById('header_subcon_skin').addEventListener("click",random_bg,false);
	document.getElementById('header_subcon_fullscreen').addEventListener("click",full_screen,false);
	document.addEventListener("fullscreenchange",full_screen_dect,false);
	document.addEventListener("mozfullscreenchange",full_screen_dect,false);
	document.addEventListener("webkitfullscreenchange",full_screen_dect,false);
	window.addEventListener("resize",inti_styles,false);
	//document.getElementById('progress-bar-gradient-clicker').addEventListener("click",player_pro_click,false);
	//document.getElementById('progress-bar-gradient-clicker2').addEventListener("click",player_vol_click,false);
	//document.getElementById('player_list_btn').addEventListener("click",play_showlist,false);
	check_plst_btns();
	var player=document.getElementById('player');
	player.autobuffer=1;
	$('#header_con_proces_mask').slider({
		step:0.1,
		slide: function(event, ui) {
		play_goto_go(play_goto(parseInt(player.duration* ui.value / 100)));
		},
		stop: function(event, ui) {
		play_goto_go(play_goto(parseInt(player.duration* ui.value / 100)));
		} 
	});
	$('#header_con_sound_bar_mask').slider({
		step:0.1,
		slide: function(event, ui) {
		$vol=parseInt(ui.value);
		player_set_vol($vol);
		},
		stop: function(event, ui) {
		$vol=parseInt(ui.value);
		player_set_vol($vol);
		} 
	});
	player_set_vol(100);
	$tepa=window.location;
	$tepa=String($tepa).split("?");
	if($tepa[1]){
		$tepa=String($tepa[1]).split("|:|");
		
		var aa="player_play("+$tepa[0]+");";
		setTimeout(aa,2000);
	}else{
		setTimeout(check_autoplay,2000);
	}
	
	
}
function plst_lst_gopage(ipt){
	check_plst_pre_fout(document.getElementById('player_list_pre'));
	check_plst_next_fout(document.getElementById('player_list_next'));
	var deta=ipt-$now_lst_page;
	if(deta>0){
		if($now_lst_page+deta<=$total_lst_page){
			$now_lst_page=$now_lst_page+deta;
			plst_lst_fadeout(1);
			var aa="plst_makelst("+(($now_lst_page-1)*$plst_itemcount+1)+","+($now_lst_page*$plst_itemcount+1)+")";
			setTimeout(aa,2200);
		}
	}else if(deta<0){
		if($now_lst_page+deta>=1){
			$now_lst_page=$now_lst_page+deta;
			plst_lst_fadeout(1);
			var aa="plst_makelst("+(($now_lst_page-1)*$plst_itemcount+1)+","+($now_lst_page*$plst_itemcount+1)+")";
			setTimeout(aa,2200);
		}
	}
	setTimeout(check_plst_btns,1000);
}
function plst_lst_gonext(){
	plst_lst_gopage($now_lst_page+1);
}
function plst_lst_gopre(){
	plst_lst_gopage($now_lst_page-1);
}
function check_plst_pre_fout(a_p){
	a_p.removeEventListener("click",plst_lst_gopre,false);
	a_p.className="player_list_pre_none";
}
function check_plst_pre_fin(a_p){
	a_p.addEventListener("click",plst_lst_gopre,false);
	a_p.className="player_list_pre_now";
}
function check_plst_next_fin(a_n){
	a_n.addEventListener("click",plst_lst_gonext,false);
	a_n.className="player_list_next_now";
}
function check_plst_next_fout(a_n){
	a_n.removeEventListener("click",plst_lst_gonext,false);
	a_n.className="player_list_next_none";
}
function check_plst_btns(){
	var a_p=document.getElementById('player_list_pre');
	var a_n=document.getElementById('player_list_next');
	if(($now_lst_page-1)<=0){
		check_plst_pre_fout(a_p);
	}else{
		check_plst_pre_fin(a_p);
	}
	if(($now_lst_page+1)>$total_lst_page){
		check_plst_next_fout(a_n);
	}else{
		check_plst_next_fin(a_n);
	}
}
function check_autoplay(){
	$play_auto_next=$playlist['0']['autonext'];
	if($playlist['0']['autoplay']==0){
		return;
	}else if($playlist['0']['autoplay']==-1){
		var $radomnum=rand(1,$playlist['0']['c']);
		player_play($radomnum);
		return;
	}else{
		player_play($playlist['0']['autoplay']);
		return;
	}
}
function plst_makelst(start,end){
	var $i=1,$j=1;
	var $output="";
	var $count=$playlist['0']['c'];
	for($i=start;$i<=end;$i++,$j++){
		if($output!=""){$output=$output+"\n";}
		if($i<=$count){var ca=$playlist[$i]['t']}else{var ca="";}
		$output=$output+"\n<section id=\"pl_"+$j+"\" onclick=\"player_play("+$i+");\" class=\"noneplay\">"+ca+"</section>";
	}
	document.getElementById('player_list').innerHTML=$output;
	setTimeout("plst_lst_fadein(1);",100);
}
function load_album_pic(id){
	random_bg();
	player_album_pic("none");
	if($audio_info["pic"]!="NULL"){
		$opt="<img src=\""+$audio_info["pic"]+"\" width=\"76\" height=\"76\">";
	}else if($playlist[id]['p']){
		$opt="<img src=\""+$playlist[id]['p']+"\" width=\"76\" height=\"76\">";
	}else{
		$opt="<section>\n<a>O</a>play\n</section>\n<section id=\"al_pic_6\">\n开放视界，\n</section>\n<section id=\"al_pic_7\">\n聆听生活\n</section>";
	}
	document.getElementById('al_pic_1').innerHTML=$opt;
	var tt="player_album_pic(\"now\");";
	setTimeout(tt,1000);
	document.getElementById('al_bg').className="al_bg_none";
	if($playlist[id]['bg']){
		$opt="url('"+$playlist[id]['bg']+"')";
	}else{
		$opt="none";
	}
	document.getElementById('al_bg').style.backgroundImage=$opt;
	var tt="document.getElementById('al_bg').className=\"al_bg_now\";";
	setTimeout(tt,1000);
}
function player_play(id){
	var player=document.getElementById('player');
	if(id==-2){
		if($ispaused==1){
			if($now_audio_type=="OGG"){
				player.play();
			}else{
				$audio_decoder_info.play();
			}
			$ispaused=0;
			document.getElementById('header_con_p').className="header_con_p_pause";
			return;
		}
		if(($ispaused==0)&&($isstoped!=1)){
			player.pause();
			if($audio_decoder_info&&$audio_decoder_info!=0){
				$audio_decoder_info.pause();
			}
			$ispaused=1;
			document.getElementById('header_con_p').className="header_con_p_play";
			return;
		}
		return;
	}
	if(id==$nowplay){
		return;
	}
	if(!$playlist[id]||!$playlist[id]['src']||$playlist[id]['src']==""){
		console.error("error!无法找到文件!"+id);
		return;
	}
	player.pause();
	if($audio_decoder_info&&$audio_decoder_info!=0){
		$audio_decoder_info.stop();
	}
	$ispaused=1;
	$isstoped=1;
	player_album_pic("none");
	var acc="document.getElementById('pl_'+"+(parseInt(id-(getpagenum(id,$plst_itemcount)-1)*$plst_itemcount))+").className=\"nowplay\";";
	console.log(acc);
	var nowurl=$playlist[id]['src'];
	var pgn=getpagenum(id,$plst_itemcount);
	if(($nowplay!=0)&&($now_lst_page==getpagenum($nowplay,$plst_itemcount))){
		document.getElementById('pl_'+(parseInt($nowplay-(getpagenum($nowplay,$plst_itemcount)-1)*$plst_itemcount))).className="noplay";
		console.log('pl_'+(parseInt($nowplay-(getpagenum($nowplay,$plst_itemcount)-1)*$plst_itemcount)));
	}
	if(pgn!=$now_lst_page){
		plst_lst_gopage(pgn);
	}else{
		setTimeout(acc,500);
	}
	$nowplay=id;
	document.getElementById('header_info_name').innerHTML=$playlist[id]['t'];
	document.getElementById('header_con_p').className="header_con_p_pause";
	document.getElementById('header_info_al').innerHTML="未知专辑";
	document.getElementById('header_info_singer').innerHTML="未知歌手";
	document.getElementById('header_info_gen').innerHTML="未知流派";
	document.getElementById('header_info_rate').innerHTML="";
	document.getElementById('header_info_chanel').innerHTML="";
	var tt="正在播放-"+$playlist[id]['t']+" -Oplay";
	var $state={
		tittle:tt+"-开放视界，聆听生活-"+$version+" "+$version_b,
		url:$baseurl+"?"+id+"|:|"+$playlist[id]['t'],
		action:id
	}
	history.pushState($state,$state['tittle'],$state['url']);
	document.title=$state['tittle'];
	console.log(tt);
	get_audio_info(music_pro_dect(nowurl),id);
	clearfft();
	
	$now_audio_type=music_type_dect(nowurl);
	console.log($now_audio_type);
	$goplay=0;
	
	play(music_pro_dect(nowurl));
	var caat=read_lrc(id);
	if(caat==1||caat==-1){
		$now_lrc=-1;
		setTimeout(buffering,1000);
		//player.play();
		$ispaused=0;
		$isstoped=0;
	}
}
function buffering(){
	if($now_audio_type=="FLAC"){
		if($audio_decoder_info.buffered>=100){
			setTimeout("$audio_decoder_info.play();play_goto(0);",3000);
		}else{
			setTimeout(buffering,1000);
		}
	}else if($now_audio_type=="ALAC"){
		if($audio_decoder_info.buffered>=100){
			setTimeout("$audio_decoder_info.play();play_goto(0);",3000);
		}else{
			setTimeout(buffering,1000);
		}
	}else if($now_audio_type=="AAC"){
		if($audio_decoder_info.buffered>=90){
			setTimeout("$audio_decoder_info.play();play_goto(0);",3000);
		}else{
			setTimeout(buffering,1000);
		}
	}else if($now_audio_type=="MP3"){
		if($audio_decoder_info.buffered>=20){
			setTimeout("$audio_decoder_info.play();play_goto(0);",3000);
		}else{
			setTimeout(buffering,1000);
		}
	}else{
		setTimeout("player.play();play_goto(0);",3000);
	}
}
function play(url){
	$btncheck_pre_over=0;
	$btncheck_next_over=0;
	if($now_audio_type=="NULL"){
		return;
	}else if($now_audio_type=="OGG"){
		play_ogg(url);
	}else if(($now_audio_type=="MP3")||($now_audio_type=="AAC")||($now_audio_type=="FLAC")||($now_audio_type=="ALAC")){
		
		play_pro_fix(url)
	}
}
function play_mp3_flac_aac_alac(url){
	$decoder_dure=360000;
	$decoder_buff=0;
	$audio_decoder = new audioDecoder(Player.fromURL(url));
	var $goplay="$audio_decoder_info.play();play_goto(0);";
	document.getElementById('header_con_pre').className="header_pre_none";
	document.getElementById('header_con_pre').removeEventListener("click",jump_pre,false);
	document.getElementById('header_con_next').className="header_next_none";
	document.getElementById('header_con_next').removeEventListener("click",jump_next,false);
}
function play_ogg(url){
	player.addEventListener("timeupdate",player_times,false);
	if(window.webkitAudioContext&&$webkitloaded==0){
			source.disconnect();
			analyser.disconnect();
	}
	player.src=url;
	player.load();
	if(window.webkitAudioContext&&$webkitloaded==0){
		//  window.addEventListener('load', webkitreadaudio, false);
		  webkitreadaudio();
		  $webkitloaded=1;
	}
}
function play_pro_fix(file){
	var ttr=function(){play_mp3_flac_aac_alac(file);};
	if($use_pro==1){
		jQuery.get(file);
		setTimeout(ttr,100);
	}else{
		setTimeout(ttr,100);
	}
}
	 
function get_audio_info(url,id){
	 $audio_file=url;
	 //read_audio_info();
	 setTimeout(get_audio_info_do,3000);
	 var aa="load_album_pic("+id+")";
	setTimeout(aa,1000);
}
function get_audio_info_do(){
	 if(($audio_info["album"]!="NULL")&&document.getElementById('header_info_al').innerHTML=="未知专辑"){
		 document.getElementById('header_info_al').innerHTML=$audio_info["album"];
	 }
	 if(($audio_info["artist"]!="NULL"&&document.getElementById('header_info_singer').innerHTML=="未知歌手")){
		 document.getElementById('header_info_singer').innerHTML=$audio_info["artist"];
	 }
	 if(($audio_info["genre"]!="NULL"&&document.getElementById('header_info_gen').innerHTML=="未知流派")){
		 document.getElementById('header_info_gen').innerHTML=$audio_info["genre"];
	 }
	 if($now_audio_type!="OGG"&&$audio_decoder_info.device&&$audio_decoder_info.device.sampleRate){
		document.getElementById('header_info_rate').innerHTML=roundFun(($audio_decoder_info.device.sampleRate/1000),1)+"KHz ";
	 }
	 if($now_audio_type!="OGG"&&$audio_decoder_info.device&&$audio_decoder_info.device.channels){
		 document.getElementById('header_info_chanel').innerHTML=$audio_decoder_info.device.channels+" 声道 "+roundFun(($audio_decoder_info.format.bitrate/1000),1)+" kbps "+$audio_decoder_info.format.formatID;
	 }
}
function player_times(dc_t){
	$tmer++;
	var player=document.getElementById('player');
	var pro_a=document.getElementById('header_con_proces_fill');
	var timedis=document.getElementById('player_time');
	if($now_audio_type=="OGG"){
			var nowtime=Math.floor(player.currentTime);
			var fulltime=Math.floor(player.duration);
	}else{
			var nowtime=dc_t/1000;
			var fulltime=$decoder_dure/1000;
	}
	if(nowtime>0){
		var pl_min_now=parseInt(nowtime/60);
		var pl_s_now=parseInt(nowtime%60);
		var pl_min_full=parseInt(fulltime/60);
		var pl_s_full=parseInt(fulltime%60);
		timedis.innerHTML="<table id=\"player_times\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n<tr>\n<td>"+get_with_0_str(pl_min_now,10)+"</td>\n<td>:</td>\n<td>"+get_with_0_str(pl_s_now,10)+"</td>\n<td>/</td>\n<td>"+get_with_0_str(pl_min_full,10)+"</td>\n<td>:</td>\n<td>"+get_with_0_str(pl_s_full,10)+"</td>\n</tr>\n</table>";
	}else{
		timedis.innerHTML="加载中···";
	}
	var percentn=nowtime/fulltime;
	var tt=document.getElementById('header_con_proces_bar').offsetWidth;
	var noww=parseInt((percentn*tt));
	pro_a.style.width=noww+"px";
	if($now_audio_type=="OGG"){
			var noet2=roundFun(player.currentTime,2);
	}else{
			var noet2=roundFun(dc_t/1000,2);
	}
	show_lrc(noet2);
	if($now_audio_type=="OGG"){
	if($btncheck_pre_over!=2){
		//console.log(nowtime);
		if((nowtime<=10)&&($btncheck_pre_over==0)){
			document.getElementById('header_con_pre').className="header_pre_none";
			document.getElementById('header_con_pre').removeEventListener("click",jump_pre,false);
			$btncheck_pre_over=1;
		}else if((nowtime>10)&&($btncheck_pre_over==1)){
			document.getElementById('header_con_pre').className="header_pre_now";
			document.getElementById('header_con_pre').addEventListener("click",jump_pre,false);
			$btncheck_pre_over=2;
		}
	}
	if($btncheck_next_over!=2){
		if((nowtime<fulltime-10)&&($btncheck_next_over==0)){
			document.getElementById('header_con_next').className="header_next_now";
			document.getElementById('header_con_next').addEventListener("click",jump_next,false);
			$btncheck_next_over=1;
		}else if((nowtime>=fulltime-10)&&($btncheck_next_over==1)){
			document.getElementById('header_con_next').className="header_next_none";
			document.getElementById('header_con_next').removeEventListener("click",jump_next,false);
			$btncheck_next_over=2;
		}
	}
	}
	if(fulltime!=0&&nowtime>=20&&nowtime<=30){
		$trr_next=0;
	}
	if($now_audio_type=="OGG"){
		if((nowtime!=0)&&(nowtime==fulltime)){
			$play_pro_fixed=0;
			play_end();
			return;
		}
	}else{
		if(fulltime==360){
			if((nowtime>10)&&(nowtime<fulltime)&&($audio_decoder_info.buffered==100)){
				setTimeout(check_play_end,1000);
				return;
			}
		}else{
			if((nowtime!=0)&&(nowtime==fulltime)&&($audio_decoder_info.buffered==100)){
				setTimeout(check_play_end,3000);
				return;
			}
		}
		
	}
}
function check_play_end(){
	if(($audio_decoder_info.playing==false)&&($ispaused==0)&&($trr_next==0)){
		$trr_next=1;
		play_end();
	}
}
function play_end(){
	$lfulltime=0;
	$isstoped=1;
	player_album_pic("none");
		if($play_loop==0){//无循环
			if($nowplay!=$playlist['0']['c']){
				play_next();
			}
			return;
		}
		if($play_loop==1){//单曲循环
			var tempa=$nowplay;
			$nowplay=0;
			player_play(tempa);
			return;
		}
		if($play_loop==2){//随机循环
			var $radomnum=rand(1,$playlist['0']['c']);
			for(;;){
				if($radomnum!=$nowplay){
					break;
				}else{
					$radomnum=rand(1,$playlist['0']['c']);
				}
			}
			player_play($radomnum);
			return;
		}
		if($play_auto_next!=0){
			play_next();
			return;
		}
}
function jump_pre(){
	var player=document.getElementById('player');
	var deta=player.currentTime-$jumprate;
	play_goto(parseInt(deta));
}
function jump_next(){
	var player=document.getElementById('player');
	var deta=player.currentTime+$jumprate;
	play_goto(parseInt(deta));
}
function play_next(){
	var $jid=1;
	if($nowplay!=$playlist['0']['c']){
		$jid=$nowplay-1+2;
	}
	player_play($jid);
}
function play_pre(){
	var $jid=$playlist['0']['c'];
	if($nowplay!=1){
		$jid=$nowplay-1;
	}
	player_play($jid);
}
function play_loop(){
	var tempa=document.getElementById('header_subcon_loop');
	if($play_loop==0){
		$play_loop=1;
		tempa.className="header_loop_single";
	}else if($play_loop==1){
		$play_loop=2;
		tempa.className="header_loop_random";
	}else if($play_loop==2){
		$play_loop=3;
		tempa.className="header_loop_lst";
	}else{
		$play_loop=0;
		tempa.className="header_loop_none";
	}
}
function play_goto_go($sec){
	if($now_audio_type=="ogg"){
		play_goto($sec);
	}
}
function play_goto($sec){
	var player=document.getElementById('player');
	if(!player||!player.currentTime){
		return;
	}
	if($now_audio_type=="OGG"){
		if($sec>player.duration){
			alert("error play_goto($sec)  "+$sec+">"+player.duration);
			return;
		}
		player.currentTime=$sec;
	}
	var $i=0;
	if($pllrc[0]&&$pllrc[0]['t']){
		if($sec<$pllrc[0]['t']){
			play_lrcgo(0);
			return;
		}
		for($i=0;;$i++){
			if($pllrc[$i]&&$pllrc[$i]['t']){
				if($pllrc[$i+1]&&$pllrc[$i+1]['t']){
					var $j=$i+1;
					if(($sec>=$pllrc[$i]['t'])&&($sec<=$pllrc[$j]['t'])){
						play_lrcgo($i);
						return;
					}
				}else{
						play_lrcgo($i);
						return;
				}
			}else{
				alert("error lrc");
				return;
			}
		}
	}
}
function player_set_vol($vol){
	if($vol>100||$vol<-1){
		return;
	}
	var player=document.getElementById('player');
	var pro_a=document.getElementById('header_con_sound_bar_fill');
	if($vol==-1){
		player_set_vol_do(0);
		return;
	}
	if($issilent==1){
		return;
	}
	if($vol==0){
		player_set_vol_do(0);
		$play_vol=0;
	}else{
		player_set_vol_do($vol);
		$play_vol=$vol;
	}
	pro_a.style.width=$vol+"px";
}
function player_set_vol_do($vol){
	if($now_audio_type=="ogg"){
		player.volume=$vol/100;
	}else{
		$audio_decoder_info.volume=$vol;
	}
}
function play_silent(){
	if($nowpage==1){
		var ta=$thems_bg;
	}else{
		var ta="#fff";
	}
	var tempa=document.getElementById('header_con_sound');
	if($issilent==0){
		$issilent=1;
		tempa.className="header_sound_off";
		player_set_vol(-1);
		document.getElementById('header_con_sound_bar_fill').style.backgroundColor="#666";
	}else{
		$issilent=0;
		tempa.className="header_sound_on";
		player_set_vol($play_vol);
		document.getElementById('header_con_sound_bar_fill').style.backgroundColor=ta;
	}
}