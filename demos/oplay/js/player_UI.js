function full_screen_dect(){
	$isfullscreen=0;
	document.getElementById('header_subcon_fullscreen').innerHTML="全屏";
	if (document.fullscreen){  
        	$isfullscreen=1;
			document.getElementById('header_subcon_fullscreen').innerHTML="恢复";
    }else if(document.mozFullScreen){  
        	$isfullscreen=1;
			document.getElementById('header_subcon_fullscreen').innerHTML="恢复";
    }else if(document.webkitIsFullScreen){  
        	$isfullscreen=1;
			document.getElementById('header_subcon_fullscreen').innerHTML="恢复";
    }
}
function full_screen(){
	var docElm = document.documentElement;  
	if($isfullscreen==0){
    	if (docElm.requestFullscreen) {  
        	docElm.requestFullscreen();  
    	}else if (docElm.mozRequestFullScreen) {  
        	docElm.mozRequestFullScreen();  
   		}else if (docElm.webkitRequestFullScreen) {  
    	    docElm.webkitRequestFullScreen();  
    	} 
	}else{
		if (document.exitFullscreen) {  
       		document.exitFullscreen();  
    	}else if (document.mozCancelFullScreen) {  
     	   document.mozCancelFullScreen();  
    	}else if (document.webkitCancelFullScreen) {  
    	    document.webkitCancelFullScreen();  
    	}  
	}
}
function plst_lst_fadein(id){
	if(id>$plst_itemcount){return;}
	if(document.getElementById('pl_'+id).innerHTML!=""){
		document.getElementById('pl_'+id).className="noneplay2";
		if(($nowplay==(id+($now_lst_page-1)*$plst_itemcount))&&($now_lst_page==getpagenum($nowplay,$plst_itemcount))){
			var tt="document.getElementById('pl_"+id+"').className=\"nowplay\";";
		}else{
			var tt="document.getElementById('pl_"+id+"').className=\"noplay\";";
		}
		setTimeout(tt,500);
	}
	var aa="plst_lst_fadein("+(id+1)+");";
	setTimeout(aa,100);
}
function plst_lst_fadeout(id){
	if(id>$plst_itemcount){return;}
	if(document.getElementById('pl_'+id)){
		document.getElementById('pl_'+id).className="noneplay";
	}
	var aa="plst_lst_fadeout("+(id+1)+");";
	setTimeout(aa,100);
}
function player_album_pic(ipt){
	var $i=1;
	for($i=1;$i<6;$i++){
		document.getElementById('al_pic_'+$i).className="al_pic_"+$i+"_"+ipt;
	}
}
function inti_styles(){
	var mw=document.body.clientWidth;
	console.log("窗体初始化/Resize:  当前窗体宽度："+mw);
	document.getElementById('bodys').style.width=(mw+100)*2+"px";
	document.getElementById('lsts').style.width=(mw+30)+"px";
	document.getElementById('lrcs').style.left=(mw+30)+"px";
	document.getElementById('fft').style.left=(((mw+30)/2)-256)+"px";
	document.getElementById('fft2').style.left=(((mw+30)/2)-256)+"px";
	document.getElementById('lrcs').style.width=(mw+30)+"px";
	document.getElementById('al_bg').style.width=(mw+30)+"px";
	var ta=(((mw+30)/2)-(mw+30)*0.45)+"px";
	$(".lrc_1").css('left',ta);
	$(".lrc_2").css('left',ta);
	$(".lrc_3").css('left',ta);
	$(".lrc_4").css('left',ta);
	$(".lrc_5").css('left',ta);
	$(".lrc_6").css('left',ta);
	document.getElementById('player_list').style.left=(((mw+30)/2)-(mw+30)*0.3)+"px";
	var $cged=$screen_statue;
	if(mw<=300){
		$plst_itemcount=5;
		$screen_statue=0;
		document.getElementById('header_con_pres').style.display="none";
		document.getElementById('header_con_pre').style.display="none";
		document.getElementById('header_con_next').style.display="none";
		document.getElementById('fft').style.display="none";
		document.getElementById('fft2').style.display="none";
		document.getElementById('header_subcon_lst').style.width="50px";
		document.getElementById('header_subcon_lrc').style.width="50px";
		document.getElementById('header_subcon_lst').style.fontSize="0.8em";
		document.getElementById('header_subcon_lrc').style.fontSize="0.8em";
		document.getElementById('header_subcon_lst').style.left="10px";
		document.getElementById('header_subcon_lrc').style.left="60px";
		document.getElementById('header_subcon_lst').style.height="15px";
		document.getElementById('header_subcon_lrc').style.height="15px";
		document.getElementById('header_subcon_lst').style.top="100px";
		document.getElementById('header_subcon_lrc').style.top="100px";
		document.getElementById('header_subcon_lst').innerHTML="列表";
		document.getElementById('header_subcon_lrc').innerHTML="歌词";
		document.getElementById('player_list').style.fontSize="0.8em";
		document.getElementById('header_con_p').style.left="0px";
		document.getElementById('header_con_pres').style.left="0px";
		document.getElementById('header_con_nexts').style.left="0px";
		document.getElementById('player_list_pre').style.left="40px";
		document.getElementById('player_list_next').style.right="40px";
		document.getElementById('header_info_name').style.fontSize="0.7em";
		document.getElementById('header_info_al').style.fontSize="0.55em";
		document.getElementById('header_info_singer').style.fontSize="0.55em";
		document.getElementById('header_info_rate').style.fontSize="0.55em";
		document.getElementById('header_info_chanel').style.fontSize="0.55em";
		document.getElementById('header_info_frameb').style.fontSize="0.55em";
		document.getElementById('header_con_soundctn').style.display="none";
		document.getElementById('header_subcon').style.display="none";
		document.getElementById('player_list_pre').style.fontSize="1.2em";
		document.getElementById('player_list_next').style.fontSize="1.2em";
		document.getElementById('loading_ver').style.fontSize="0.5em";
	}else if(mw<=480){
		$plst_itemcount=10;
		$screen_statue=1;
		document.getElementById('header_con_pres').style.display="inline-block";
		document.getElementById('header_con_pre').style.display="none";
		document.getElementById('header_con_next').style.display="none";
		document.getElementById('fft').style.display="inline-block";
		document.getElementById('fft2').style.display="inline-block";
		document.getElementById('header_subcon_lst').style.width="50px";
		document.getElementById('header_subcon_lrc').style.width="50px";
		document.getElementById('header_subcon_lst').style.fontSize="0.8em";
		document.getElementById('header_subcon_lrc').style.fontSize="0.8em";
		document.getElementById('header_subcon_lst').style.left="10px";
		document.getElementById('header_subcon_lrc').style.left="60px";
		document.getElementById('header_subcon_lst').style.height="15px";
		document.getElementById('header_subcon_lrc').style.height="15px";
		document.getElementById('header_subcon_lst').style.top="100px";
		document.getElementById('header_subcon_lrc').style.top="100px";
		document.getElementById('header_subcon_lst').innerHTML="列表";
		document.getElementById('header_subcon_lrc').innerHTML="歌词";
		document.getElementById('player_list').style.fontSize="0.8em";
		document.getElementById('header_con_p').style.left="0px";
		document.getElementById('header_con_pres').style.left="0px";
		document.getElementById('header_con_nexts').style.left="0px";
		document.getElementById('player_list_pre').style.left="40px";
		document.getElementById('player_list_next').style.right="40px";
		document.getElementById('header_info_name').style.fontSize="0.85em";
		document.getElementById('header_info_al').style.fontSize="0.75em";
		document.getElementById('header_info_singer').style.fontSize="0.75em";
		document.getElementById('header_info_rate').style.fontSize="0.75em";
		document.getElementById('header_info_chanel').style.fontSize="0.75em";
		document.getElementById('header_info_frameb').style.fontSize="0.75em";
		document.getElementById('header_con_soundctn').style.display="none";
		document.getElementById('header_subcon').style.display="none";
		document.getElementById('player_list_pre').style.fontSize="1.5em";
		document.getElementById('player_list_next').style.fontSize="1.5em";
		document.getElementById('loading_ver').style.fontSize="0.5em";
	}else if(mw<=600){
		$plst_itemcount=12;
		$screen_statue=2;
		document.getElementById('header_con_pres').style.display="inline-block";
		document.getElementById('header_con_pre').style.display="none";
		document.getElementById('header_con_next').style.display="none";
		document.getElementById('fft').style.display="inline-block";
		document.getElementById('fft2').style.display="inline-block";
		document.getElementById('header_subcon_lst').style.width="50px";
		document.getElementById('header_subcon_lrc').style.width="50px";
		document.getElementById('header_subcon_lst').style.fontSize="0.8em";
		document.getElementById('header_subcon_lrc').style.fontSize="0.8em";
		document.getElementById('header_subcon_lst').style.left="10px";
		document.getElementById('header_subcon_lrc').style.left="60px";
		document.getElementById('header_subcon_lst').style.height="15px";
		document.getElementById('header_subcon_lrc').style.height="15px";
		document.getElementById('header_subcon_lst').style.top="100px";
		document.getElementById('header_subcon_lrc').style.top="100px";
		document.getElementById('header_subcon_lst').innerHTML="列表";
		document.getElementById('header_subcon_lrc').innerHTML="歌词";
		document.getElementById('player_list').style.fontSize="0.8em";
		document.getElementById('header_con_p').style.left="5px";
		document.getElementById('header_con_pres').style.left="5px";
		document.getElementById('header_con_nexts').style.left="5px";
		document.getElementById('player_list_pre').style.left="50px";
		document.getElementById('player_list_next').style.right="50px";
		document.getElementById('header_info_name').style.fontSize="1.6em";
		document.getElementById('header_info_al').style.fontSize="0.98em";
		document.getElementById('header_info_singer').style.fontSize="0.8em";
		document.getElementById('header_info_rate').style.fontSize="0.8em";
		document.getElementById('header_info_chanel').style.fontSize="0.8em";
		document.getElementById('header_info_frameb').style.fontSize="0.8em";
		document.getElementById('header_con_soundctn').style.display="none";
		document.getElementById('header_subcon').style.display="none";
		document.getElementById('player_list_pre').style.fontSize="2em";
		document.getElementById('player_list_next').style.fontSize="2em";
		document.getElementById('loading_ver').style.fontSize="0.7em";
	}else if(mw<=1000){
		$plst_itemcount=20;
		$screen_statue=3;
		document.getElementById('header_con_pres').style.display="inline-block";
		document.getElementById('header_con_pre').style.display="none";
		document.getElementById('header_con_next').style.display="none";
		document.getElementById('fft').style.display="inline-block";
		document.getElementById('fft2').style.display="inline-block";
		document.getElementById('header_subcon_lst').style.width="60px";
		document.getElementById('header_subcon_lrc').style.width="60px";
		document.getElementById('header_subcon_lst').style.fontSize="0.8em";
		document.getElementById('header_subcon_lrc').style.fontSize="0.8em";
		document.getElementById('header_subcon_lst').style.left="260px";
		document.getElementById('header_subcon_lrc').style.left="320px";
		document.getElementById('header_subcon_lst').style.height="20px";
		document.getElementById('header_subcon_lrc').style.height="20px";
		document.getElementById('header_subcon_lst').style.top="95px";
		document.getElementById('header_subcon_lrc').style.top="95px";
		document.getElementById('header_subcon_lst').innerHTML="列表";
		document.getElementById('header_subcon_lrc').innerHTML="歌词";
		document.getElementById('player_list').style.fontSize="1em";
		document.getElementById('header_con_p').style.left="5px";
		document.getElementById('header_con_pres').style.left="5px";
		document.getElementById('header_con_nexts').style.left="5px";
		document.getElementById('header_info_name').style.fontSize="1.6em";
		document.getElementById('header_info_al').style.fontSize="0.8em";
		document.getElementById('header_info_singer').style.fontSize="0.8em";
		document.getElementById('header_info_rate').style.fontSize="0.8em";
		document.getElementById('header_info_chanel').style.fontSize="0.8em";
		document.getElementById('header_info_frameb').style.fontSize="0.8em";
		document.getElementById('header_con_soundctn').style.display="inline-block";
		document.getElementById('header_subcon').style.display="inline-block";
		document.getElementById('player_list_pre').style.fontSize="4em";
		document.getElementById('player_list_next').style.fontSize="4em";
		document.getElementById('loading_ver').style.fontSize="0.7em";
	}else{
		$plst_itemcount=20;
		$screen_statue=4;
		document.getElementById('header_con_pres').style.display="inline-block";
		document.getElementById('header_con_pre').style.display="inline-block";
		document.getElementById('header_con_next').style.display="inline-block";
		document.getElementById('fft').style.display="inline-block";
		document.getElementById('fft2').style.display="inline-block";
		document.getElementById('header_subcon_lst').style.width="100px";
		document.getElementById('header_subcon_lrc').style.width="100px";
		document.getElementById('header_subcon_lst').style.fontSize="1em";
		document.getElementById('header_subcon_lrc').style.fontSize="1em";
		document.getElementById('header_subcon_lst').style.left="260px";
		document.getElementById('header_subcon_lrc').style.left="360px";
		document.getElementById('header_subcon_lst').style.height="20px";
		document.getElementById('header_subcon_lrc').style.height="20px";
		document.getElementById('header_subcon_lst').style.top="95px";
		document.getElementById('header_subcon_lrc').style.top="95px";
		document.getElementById('header_subcon_lst').innerHTML="播放列表";
		document.getElementById('header_subcon_lrc').innerHTML="歌词秀";
		document.getElementById('player_list').style.fontSize="1em";
		document.getElementById('header_con_p').style.left="5px";
		document.getElementById('header_con_pres').style.left="5px";
		document.getElementById('header_con_nexts').style.left="5px";
		document.getElementById('header_info_name').style.fontSize="1.6em";
		document.getElementById('header_info_al').style.fontSize="0.8em";
		document.getElementById('header_info_singer').style.fontSize="0.8em";
		document.getElementById('header_info_rate').style.fontSize="0.8em";
		document.getElementById('header_info_chanel').style.fontSize="0.8em";
		document.getElementById('header_info_frameb').style.fontSize="0.8em";
		document.getElementById('header_con_soundctn').style.display="inline-block";
		document.getElementById('header_subcon').style.display="inline-block";
		document.getElementById('player_list_pre').style.fontSize="4em";
		document.getElementById('player_list_next').style.fontSize="4em";
		document.getElementById('loading_ver').style.fontSize="0.8em";
	}
	if(($loadingover==1)&&($cged!=$screen_statue)){
		$total_lst_page=getpagenum($playlist['0']['c'],$plst_itemcount);
		$now_lst_page=0;
		plst_makelst(1,$plst_itemcount);
		check_plst_btns();
	}
}
function inti_style(thems_bg){
	document.getElementById('header').style.backgroundColor=thems_bg;
	document.getElementById('header_con_proces_fill').style.backgroundColor=thems_bg;
	document.getElementById('header_con_sound_bar_fill').style.backgroundColor=thems_bg;
	document.getElementById('header_al_pic').style.backgroundColor="#000";
	document.getElementById('header_con').style.backgroundColor="#000";
	document.getElementById('bodys').style.backgroundColor=thems_bg;
	if($nowpage==2){player_showlrc();}
	document.getElementById('header_subcon_lrc').style.backgroundColor="#000";
	document.getElementById('header_subcon_lst').style.backgroundColor=$thems_bg;
}
function random_bg(){
	var ta=Array("#930093","#930093","#930093","#930093","#930093","#320442","#E5A01F","#9BB635","#51B2B9","#064F93","#692FA0","#D04C40","#0C753D","#BF2040","#00BCE1","#044889","#014051","#867C84","#69630D","#CE671A","#5435AE");
	var $radomnum=rand(0,20);
	$thems_bg=ta[$radomnum];
	inti_style($thems_bg);
}
function play_showlist(){
	var tempa=document.getElementById('player_list');
	if(tempa.className=="player_list_none"){
		tempa.className="player_list_now";
		document.getElementById('player_list_btn').className="player_lbtn_now";
	}else{
		tempa.className="player_list_none";
		document.getElementById('player_list_btn').className="player_lbtn_none";
	}
}
function player_showlst(){
	document.getElementById('bodys').style.left=0+"px";
	$nowpage=1;
	inti_style($thems_bg);
}
function player_showlrc(){
	document.getElementById('header').style.backgroundColor="#000";
	document.getElementById('header_con_proces_fill').style.backgroundColor="#fff";
	document.getElementById('header_con_sound_bar_fill').style.backgroundColor="#fff";
	document.getElementById('header_al_pic').style.backgroundColor=$thems_bg;
	document.getElementById('header_con').style.backgroundColor=$thems_bg;
	document.getElementById('bodys').style.backgroundColor="#000";
	document.getElementById('bodys').style.left=-(document.body.clientWidth+30)+"px";
	$nowpage=2;
}