/*
 * JavaScript Audio info Reader 0.1.0
 * Copyright (c) 2012 scientihark, mgbbs.mobile@gmail.com
 * Licensed by GPL
 //mod $audio_file ;
 //run read_audio_info();
 //get info in $audio_info;
 */

var $audio_file = "Lighters.mp3";
var $audio_info={"version":"NULL","artist":"NULL","title":"NULL","album":"NULL","year":"NULL","comment":"NULL","track":"NULL","genre":"NULL","pic":"NULL"};
//read_audio_info();
function get_mediainfo(){
		var audio_tags = ID3.getAllTags($audio_file);
		if(!audio_tags){
			return;
		}
		//version
		if(audio_tags.version){
			$audio_info["version"]=audio_tags.version;
		}
		//artist
		if(audio_tags.artist){
			$audio_info["artist"]=audio_tags.artist;
		}
		//title
		if(audio_tags.title){
			$audio_info["title"]=audio_tags.title;
		}
		//album
		if(audio_tags.album){
			$audio_info["album"]=audio_tags.album;
		}
		//year
		if(audio_tags.year){
			$audio_info["year"]=audio_tags.year;
		}
		//comment
		if(audio_tags.comment){
			$audio_info["comment"]=audio_tags.comment.text;
		}
		//track
		if(audio_tags.track){
			$audio_info["track"]=audio_tags.track;
		}
		//genre
		if(audio_tags.genre){
			$audio_info["genre"]=audio_tags.genre;
		}
		//pic
		if( "picture" in audio_tags ) {
		    var image = audio_tags.picture;
			$audio_info["pic"]="data:" + image.format + ";base64," + Base64.encodeBytes(image.data);
		}
		if($audio_info["version"]=="NULL"||$audio_info["artist"]=="NULL"||$audio_info["title"]=="NULL"||$audio_info["album"]=="NULL"||$audio_info["year"]=="NULL"||$audio_info["comment"]=="NULL"||$audio_info["track"]=="NULL"||$audio_info["genre"]=="NULL"){
			ID3fix.loadTags($audio_file, get_mediainfo_fix);
		}
}
function get_mediainfo_fix(){
		var audio_tags_fix = ID3fix.getAllTags($audio_file);
		//version
		if(($audio_info["version"]=="NULL")&&(audio_tags_fix["version"])){
			$audio_info["version"]=audio_tags_fix["version"];
		}
		//artist
		if(($audio_info["artist"]=="NULL")&&(audio_tags_fix["artist"])){
			$audio_info["artist"]=audio_tags_fix["artist"];
		}
		//title
		if(($audio_info["title"]=="NULL")&&(audio_tags_fix["title"])){
			$audio_info["title"]=audio_tags_fix["title"];
		}
		//album
		if(($audio_info["album"]=="NULL")&&(audio_tags_fix["album"])){
			$audio_info["album"]=audio_tags_fix["album"];
		}
		//year
		if(($audio_info["year"]=="NULL")&&(audio_tags_fix["year"])){
			$audio_info["year"]=audio_tags_fix["year"];
		}
		//comment
		if(($audio_info["comment"]=="NULL")&&(audio_tags_fix["comment"])){
			$audio_info["comment"]=audio_tags_fix["comment"];
		}
		//track
		if(($audio_info["track"]=="NULL")&&(audio_tags_fix["track"])){
			$audio_info["track"]=audio_tags_fix["track"];
		}
		//genre
		if(($audio_info["genre"]=="NULL")&&(audio_tags_fix["genre"])){
			$audio_info["genre"]=audio_tags_fix["genre"];
		}
}
	
	
	/*function output(){
		var output="";
		output+="Found: </br>\r\n";
		output+=$audio_info["version"]+$audio_info["artist"]+$audio_info["title"]+$audio_info["album"]+$audio_info["year"]+$audio_info["comment"]+$audio_info["track"]+$audio_info["genre"];
		document.getElementById('iii').innerHTML =output;
	}*/

function read_audio_info(){
	$audio_info={"version":"NULL","artist":"NULL","title":"NULL","album":"NULL","year":"NULL","comment":"NULL","track":"NULL","genre":"NULL","pic":"NULL"};
	try{
	ID3.loadTags($audio_file, get_mediainfo,{tags: ["artist", "title", "album", "year", "comment", "track", "genre", "lyrics", "picture"]});
	}catch(error){
		console.log(error);
	}
}