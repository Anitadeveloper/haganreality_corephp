<?php
ob_start();
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: POST, GET");      
	
$root = $_SERVER['DOCUMENT_ROOT'];

include 'db-conn.php';

//get name and id headers
$parameter = $_SERVER['HTTP_PARAMETER'];
$url = $_SERVER['HTTP_URL'];

//remove http and www from all
if(strpos($url, 'http://') !== false){
	$url = str_replace('http://', '', $url);
}
if(strpos($url, 'https://') !== false){
	$url = str_replace('https://', '', $url);
}
if(strpos($url, 'Http://') !== false){
	$url = str_replace('Http://', '', $url);
}
if(strpos($url, 'Https://') !== false){
	$url = str_replace('Https://', '', $url);
}
if(strpos($url, 'www.') !== false){
	$url = str_replace('www.', '', $url);
}
if(strpos($url, 'Www.') !== false){
	$url = str_replace('Www.', '', $url);
}
$folder_url = $url;
$url = strtolower($url);

$www_url = $url;
//add www
$www_url = 'www.'.$www_url;

//get back to public_html folder
$last_index = strripos($root, '/');
$root = substr($root, 0, $last_index + 1);
$root .= $folder_url;

if($url !== ''){
	if($parameter !== ''){
		if(file_exists($root)){
			//if .htaccess already exists, delete
			if(file_exists($root.'/.htaccess')){
				unlink($root.'/.htaccess');
			}
			//make new htaccess file and upload to server
			$content = "RewriteEngine on".PHP_EOL."RewriteRule ^(.*) http://www.haganrealtyproperties.com/property?parameter=".$parameter." [P]";
			$file = fopen($root."/.htaccess","wt");
			fwrite($file,$content);
			fclose($file);
			echo 'Complete';
		} else {
			echo 'Invalid URL';
		}
	} else {
		echo 'Empty Parameter';
	}
} else {
	echo 'Empty URL';
}





