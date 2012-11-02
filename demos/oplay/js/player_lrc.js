function read_lrc($fid){
	if(!$playlist[$nowplay]||!$playlist[$nowplay]['lrc']){
		document.getElementById('lrcs_1').className="lrc_1";
		document.getElementById('lrcs_2').className="lrc_2";
		document.getElementById('lrcs_3').className="lrc_3";
		document.getElementById('lrcs_4').className="lrc_4";
		document.getElementById('lrcs_5').className="lrc_5";
		document.getElementById('lrcs_6').className="lrc_6";
		document.getElementById('lrcs_1').innerHTML="";
		document.getElementById('lrcs_2').innerHTML="";
		document.getElementById('lrcs_3').innerHTML="Oplay 开放视界，聆听生活";
		document.getElementById('lrcs_4').innerHTML="无歌词";
		document.getElementById('lrcs_5').innerHTML=$version+" "+$version_b;
		document.getElementById('lrcs_6').innerHTML="";
		return -1;
	}
	var nowurl=$playlist[$fid]['lrc'];
	//LoadJS('p_lrc',nowurl); 
	loadLrc(nowurl);
	var $i=0;
	$pllrc=0;
	document.getElementById('lrcs_1').innerHTML="";
	document.getElementById('lrcs_2').innerHTML="";
	document.getElementById('lrcs_3').innerHTML="";
	document.getElementById('lrcs_4').innerHTML="歌词加载中~~";
	document.getElementById('lrcs_5').innerHTML="";
	document.getElementById('lrcs_6').innerHTML="";
	document.getElementById('lrcs_1').className="lrc_1";
	document.getElementById('lrcs_2').className="lrc_2";
	document.getElementById('lrcs_3').className="lrc_3";
	document.getElementById('lrcs_4').className="lrc_4";
	document.getElementById('lrcs_5').className="lrc_5";
	document.getElementById('lrcs_6').className="lrc_6";
	return 1;
}
function show_lrc($t){
	if(!$playlist[$nowplay]||!$playlist[$nowplay]['lrc']){
		return 0;
	}
	if($pllrc[$now_lrc+1]&&$pllrc[$now_lrc+1]['t']&&$t>=$pllrc[$now_lrc+1]['t']){
		$now_lrc++;
		lrcgo();
	}
}
function lrcgo(){
	if($now_lrc==0){
		document.getElementById('lrcs_1').innerHTML="";
		document.getElementById('lrcs_2').innerHTML="";
		document.getElementById('lrcs_3').innerHTML="";
		document.getElementById('lrcs_4').innerHTML=$pllrc[0]['data'];
		document.getElementById('lrcs_5').innerHTML=$pllrc[1]['data'];
		document.getElementById('lrcs_6').innerHTML=$pllrc[2]['data'];
	}else{
	var tempa=document.getElementById('lrcs_6').className;
	document.getElementById('lrcs_6').className=document.getElementById('lrcs_5').className;
	document.getElementById('lrcs_5').className=document.getElementById('lrcs_4').className;
	document.getElementById('lrcs_4').className=document.getElementById('lrcs_3').className;
	document.getElementById('lrcs_3').className=document.getElementById('lrcs_2').className;
	document.getElementById('lrcs_2').className=document.getElementById('lrcs_1').className;
	document.getElementById('lrcs_1').className=tempa;
		if($pllrc[$now_lrc+2]&&$pllrc[$now_lrc+2]['data']){
			document.getElementsByClassName('lrc_6')[0].innerHTML=$pllrc[$now_lrc+2]['data'];
		}else{
			document.getElementsByClassName('lrc_6')[0].innerHTML="";
		}
	}
	$output="";
	for(var $i=1;$i<7;$i++){
		$output=$output+"<br>lrcs_"+$i+":   "+document.getElementById('lrcs_'+$i).className+"   "+document.getElementById('lrcs_'+$i).innerHTML;
	}
}
function play_lrcgo($ii){
	//alert($ii);
	if(!$playlist[$nowplay]||!$playlist[$nowplay]['lrc']){
		document.getElementById('lrcs_1').className="lrc_1";
		document.getElementById('lrcs_2').className="lrc_2";
		document.getElementById('lrcs_3').className="lrc_3";
		document.getElementById('lrcs_4').className="lrc_4";
		document.getElementById('lrcs_5').className="lrc_5";
		document.getElementById('lrcs_6').className="lrc_6";
		document.getElementById('lrcs_1').innerHTML="";
		document.getElementById('lrcs_2').innerHTML="";
		document.getElementById('lrcs_3').innerHTML="Oplay 开放视界，聆听生活";
		document.getElementById('lrcs_4').innerHTML="无歌词";
		document.getElementById('lrcs_5').innerHTML=$version+" "+$version_b;
		document.getElementById('lrcs_6').innerHTML="";
		return -1;
	}
	var $i=0;
	var $j=1;
	document.getElementById('lrcs_1').innerHTML="";
	document.getElementById('lrcs_2').innerHTML="";
	document.getElementById('lrcs_3').innerHTML="";
	document.getElementById('lrcs_4').innerHTML="";
	document.getElementById('lrcs_5').innerHTML="";
	document.getElementById('lrcs_6').innerHTML="";
	document.getElementById('lrcs_1').className="lrc_1";
	document.getElementById('lrcs_2').className="lrc_2";
	document.getElementById('lrcs_3').className="lrc_3";
	document.getElementById('lrcs_4').className="lrc_4";
	document.getElementById('lrcs_5').className="lrc_5";
	document.getElementById('lrcs_6').className="lrc_6";
	$now_lrc=$ii-1;
	for($i=$ii-3;$i<$ii+3;$i++){
		if($pllrc[$i]&&$pllrc[$i]['data']){
			document.getElementById('lrcs_'+$j).innerHTML=$pllrc[$i]['data'];
		}
		$j++;
	}
	$now_lrc=$ii;
}
function parseLrc(lrc) {
	var arr = lrc.split(/[\r\n]/),
	len = arr.length,
	words = {},
	times = [], i = 0;
	var musicData = {ti:'',ar:'',al:''};
	for (; i < len;) {
		var temp,doit = true,
		str = decodeURIComponent(arr[i]),
		word = str.replace(/\[\d*:\d*((\.|\:)\d*)*\]/g, '');
		'ti ar al'.replace(/\S+/g,function(a){
			if(doit && musicData[a]===''){
				temp = str.match(new RegExp('\\['+a+'\\:(.*?)\\]'));
					if(temp && temp[1]){
						doit = false;
						musicData[a] = temp[1];
					}
			}
		});
		if(word.length===0){
			word = "…… ……";
		}
		str.replace(/\[(\d*):(\d*)([\.|\:]\d*)*\]/g, function() {
			var min = arguments[1] | 0,
			sec = arguments[2] | 0,
			msec = arguments[3] | 0,
			time = min * 60 + sec+(msec/100),
			p = times.push(time);
			words[p] = word.trim();
		});
		i++;
	}
	times.sort(function(a, b) {
	return a - b;
});
return {
words: words,
times: times,
data:musicData
};
} 
function setLrc(lrc){
	lrc = lrcData = parseLrc(lrc);
	var words = lrc.words, times = lrc.times, data = lrc.data;
	var $len = times.length,$i=0;
	var $pllrcc=Array({"t":"0.10","data":"Oplay - "+$version+" - "+$version_b});
	for($i=0;$i<$len;$i++){
		var $t = times[$i],$w = words[$i+1];
		//alert($t+":"+$w);
		if($t<=0){
			$t=0.02;
		}
		$t=roundFun($t,2);
		//alert($t+":"+$w);
		$pllrcc= $pllrcc.concat({"t":$t,"data":$w});
		
	}
	if(data.al&&document.getElementById('header_info_al').innerHTML=="未知专辑"){
		document.getElementById('header_info_al').innerHTML=data.al;
	}
	if(data.ar&&document.getElementById('header_info_singer').innerHTML=="未知歌手"){
		document.getElementById('header_info_singer').innerHTML=data.ar;
	}
	$pllrc=$pllrcc;
	//data = [data.ti,data.ar,data.al].filter(function(a){return a!==''});
	//$title.html(data.join(' - '));
} 
function loadLrc(url){
	$.get(url, function(lrc){
		localStorage[url] = lrc;
		setLrc(lrc);
	});
}
