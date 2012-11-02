$version="pre Alpha v0.13";
$version_b="Build 2012082534";
$use_pro=0;
$nowplay=0;
$now_lst_page=1;
$total_lst_page=1;
$now_lrc=-1;
$isstoped=1;
$ispaused=0;
$istarted=0;
$play_auto_next=0;
$play_loop=0;
$play_vol=100;
$issilent=0;
$jumprate=10;
$drag_lastx=0;
$drag_firstx=0;
$drag_minmount=100;
$pllrc=Array({"t":"1","data":"Oplay"});
$thems_bg="#fff";
$tmer=0;
$nowpage=1;
$loadingover=0;
$plst_itemcount=20;
$screen_statue=4;
$isfullscreen=0;
$fftstyle=0;
$webkitloaded=1;
$now_audio_type="ogg";
$baseurl="http://localhost:8081/peerteach/demos/oplay/index.html";
$audio_decoder=0;
onplay=0;
$decoder_dure=0;
$decoder_buff=0;
$audio_decoder_info=0;
$btncheck_pre_over=0;
$btncheck_next_over=0;
$lfulltime=0;
$trr_next=0;
function autocontsrc(){
	var $i=1;
	while($playlist[$i]&&$playlist[$i]['src']){
		$i++;
	}
	$playlist['0']['c']=$i-1;
}
function getpagenum(ipt,bpt){
	var opt=ipt/bpt
	var opt2=parseInt(opt);
	if(opt2*bpt<ipt){
		return opt2+1;
	}
	return opt2;
}
function get_with_0_str($input,$wantedwei){
	var $iii=0;
	var $iij=0;
	if($input==0){
		return "00";
	}
	for($iii=0;$iii<10000;$iii++){
		var $tp=parseInt($input);
		for($iij=0;$iij<$iii;$iij++){
			$tp=$tp*10;
		}
		if($tp>($wantedwei-1)){
			break;
		}
	}
	var $ji=0;
	for($ji=0;$ji<$iii;$ji++){
		$input="0"+$input;
	}
	return $input;
}
function LoadJS(iid,fileUrl){
	var scriptTag=document.getElementById(iid);
	var oHead=document.getElementsByTagName("HEAD").item(0);
	var oScript=document.createElement("script");
	if(scriptTag){
		oHead.removeChild(scriptTag);
	}
	oScript.id=iid;
	oScript.type="text/javascript";
	oScript.src=fileUrl ;
	oHead.appendChild(oScript);
}
function rand(m,n){
	return Math.random()*(n-m)+m|0;
} 
String.prototype.colorRgb = function(){
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
 var sColor = this.toLowerCase();
 if(sColor && reg.test(sColor)){
  if(sColor.length === 4){
   var sColorNew = "#";
   for(var i=1; i<4; i+=1){
    sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1)); 
   }
   sColor = sColorNew;
  }
  //处理六位的颜色值
  var sColorChange = [];
  for(var i=1; i<7; i+=2){
   sColorChange.push(parseInt("0x"+sColor.slice(i,i+2))); 
  }
  return sColorChange;
 }else{
  return sColor; 
 }
};
function  roundFun(numberRound,roundDigit){  
	if(numberRound>=0){  
		var tempNumber = parseInt((numberRound*Math.pow(10,roundDigit)+0.5))/Math.pow(10,roundDigit);  
		return   tempNumber;  
	}else{  
  		numberRound1=-numberRound  
  		var tempNumber=parseInt((numberRound1*Math.pow(10,roundDigit)+0.5))/Math.pow(10,roundDigit);  
  		return -tempNumber;  
	}  
}
function  music_type_dect(ipt){
	var cc=ipt.split("/");
	if((cc[0].toUpperCase()=="HTTP:")||(cc[0].toUpperCase()=="FTP:")){
		var ta=ipt.split("#");
		if(ta[1]){
			return ta[1].toUpperCase();
		}else{
			var ta=ipt.split(".");
			var $t=1;
			while(ta[$t]){
				if(ta[$t].toUpperCase()=="MP3"||ta[$t].toUpperCase()=="OGG"||ta[$t].toUpperCase()=="FLAC"||ta[$t].toUpperCase()=="AAC"||ta[$t].toUpperCase()=="ALAC"){
					return ta[$t].toUpperCase();
				}
				$t++;
			}
			return "NULL";
		}
	}else{
		var ta=ipt.split(".");
		if(ta[1]){
			return ta[1].toUpperCase();
		}else{
			return "NULL";
		}
	}
}
function  music_pro_dect(ipt){
	var cc=ipt.split("/");
	if((cc[0].toUpperCase()=="HTTP:")||(cc[0].toUpperCase()=="FTP:")){
		switch(cc[2]){
			case "localhost":
				$use_pro=0;
				return ipt;
			default:
				$use_pro=1;
				return "api/proxy.php?url="+ipt;
		}
	}else{
		return ipt;
	}
}
/*  
canvasele.prototype.line = function(x1, y1, x2, y2) {
  this.lineCap = 'round';
  this.beginPath();
  this.moveTo(x1, y1);
  this.lineTo(x2, y2);
  this.closePath();
  this.stroke();
}
canvasele.prototype.circle = function(x, y, r, fill_opt) {
  this.beginPath();
  this.arc(x, y, r, 0, Math.PI * 2, true);
  this.closePath();
  if (fill_opt) {
    this.fillStyle = 'rgba(0,0,0,1)';
    this.fill();
    this.stroke();
  } else {
    this.stroke();
  }
}
canvasele.prototype.circle = function(x, y, r, fill_opt) {
  this.beginPath();
  this.arc(x, y, r, 0, Math.PI * 2, true);
  this.closePath();
  if (fill_opt) {
    this.fillStyle = 'rgba(0,0,0,1)';
    this.fill();
    this.stroke();
  } else {
    this.stroke();
  }
}
canvasele.prototype.rectangle = function(x, y, w, h, fill_opt) {
  this.beginPath();
  this.rect(x, y, w, h);
  this.closePath();
  if (fill_opt) {
    this.fillStyle = 'rgba(0,0,0,1)';
    this.fill();
  } else {
    this.stroke();
  }
}
canvasele.prototype.triangle = function(p1, p2, p3, fill_opt) {
  // Stroked triangle.
  this.beginPath();
  this.moveTo(p1.x, p1.y);
  this.lineTo(p2.x, p2.y);
  this.lineTo(p3.x, p3.y);
  this.closePath();
  if (fill_opt) {
    this.fillStyle = 'rgba(0,0,0,1)';
    this.fill();
  } else {
    this.stroke();
  }
}
canvasele.prototype.clear = function() {
  this.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
}*/