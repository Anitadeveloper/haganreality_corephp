<?php

session_start();
	
include 'db-conn.php';


//get input
$old_file_id = intval(mysqli_real_escape_string($conn, $_SERVER['HTTP_OLD_FILE_ID']));
$new_file_id = intval(mysqli_real_escape_string($conn, $_SERVER['HTTP_NEW_FILE_ID']));

$old_file_src = '';
$old_file_preview_src = '';
$new_file_src = '';
$new_file_preview_src = '';

if($sql = $conn->prepare("SELECT file_src FROM file_src WHERE file_id=?")){
	$sql->bind_param('i', $old_file_id);
	//execute query
	$sql->execute();
	//store result
	$sql->bind_result($src);
	//create array of id's
	$sql->fetch();
	
	$old_file_src = $src;

	$sql->close();
}

if($sql = $conn->prepare("SELECT file_preview_src FROM file_preview_src WHERE file_id=?")){
	$sql->bind_param('i', $old_file_id);
	//execute query
	$sql->execute();
	//store result
	$sql->bind_result($src);
	//create array of id's
	$sql->fetch();
	
	$old_file_preview_src = $src;

	$sql->close();
}

if($sql = $conn->prepare("SELECT file_src FROM file_src WHERE file_id=?")){
	$sql->bind_param('i', $new_file_id);
	//execute query
	$sql->execute();
	//store result
	$sql->bind_result($src);
	//create array of id's
	$sql->fetch();
	
	$new_file_src = $src;

	$sql->close();
}

if($sql = $conn->prepare("SELECT file_preview_src FROM file_preview_src WHERE file_id=?")){
	$sql->bind_param('i', $new_file_id);
	//execute query
	$sql->execute();
	//store result
	$sql->bind_result($src);
	//create array of id's
	$sql->fetch();
	
	$new_file_preview_src = $src;

	$sql->close();
}

//turn URLs into file system paths
$old_file_src = URLToFilePath($old_file_src);
$old_file_preview_src = URLToFilePath($old_file_preview_src);
$new_file_src = URLToFilePath($new_file_src);
$new_file_preview_src = URLToFilePath($new_file_preview_src);

//delete old images
unlink($old_file_src);
unlink($old_file_preview_src);

//rename new images to old image names
rename($new_file_src, $old_file_src);
rename($new_file_preview_src, $old_file_preview_src);

if($sql = $conn->prepare("DELETE FROM file_src WHERE file_id=?")){
	$sql->bind_param('i', $new_file_id);
	//execute query
	$sql->execute();
	//store result
	$sql->bind_result();
	//create array of id's
	$sql->fetch();
	
	$sql->close();
}

if($sql = $conn->prepare("DELETE FROM file_preview_src WHERE file_id=?")){
	$sql->bind_param('i', $new_file_id);
	//execute query
	$sql->execute();
	//store result
	$sql->bind_result();
	//create array of id's
	$sql->fetch();
	
	$sql->close();
}

if($sql = $conn->prepare("DELETE FROM file_delete_state WHERE file_id=?")){
	$sql->bind_param('i', $new_file_id);
	//execute query
	$sql->execute();
	//store result
	$sql->bind_result();
	//create array of id's
	$sql->fetch();
	
	$sql->close();
}

if($sql = $conn->prepare("DELETE FROM file_name WHERE file_id=?")){
	$sql->bind_param('i', $new_file_id);
	//execute query
	$sql->execute();
	//store result
	$sql->bind_result();
	//create array of id's
	$sql->fetch();
	
	$sql->close();
}

if($sql = $conn->prepare("DELETE FROM file_parent_id WHERE file_id=?")){
	$sql->bind_param('i', $new_file_id);
	//execute query
	$sql->execute();
	//store result
	$sql->bind_result();
	//create array of id's
	$sql->fetch();
	
	$sql->close();
}

if($sql = $conn->prepare("DELETE FROM file_type WHERE file_id=?")){
	$sql->bind_param('i', $new_file_id);
	//execute query
	$sql->execute();
	//store result
	$sql->bind_result();
	//create array of id's
	$sql->fetch();
	
	$sql->close();
}

function URLToFilePath($URL){
	if(strpos($URL, 'http://www.haganrealtyproperties.com') !== false){
		$URL = str_replace('http://www.haganrealtyproperties.com', $_SERVER['DOCUMENT_ROOT'], $URL);
	} else if(strpos($URL, 'https://www.haganrealtyproperties.com') !== false){
		$URL = str_replace('https://www.haganrealtyproperties.com', $_SERVER['DOCUMENT_ROOT'], $URL);
	} else if(strpos($URL, 'http://test.haganrealtyproperties.com') !== false){
		$URL = str_replace('http://test.haganrealtyproperties.com', $_SERVER['DOCUMENT_ROOT'], $URL);
		$URL = str_replace('HaganRealtyProperties.com','dev.haganrealtyproperties.com', $URL);
	} else if(strpos($URL, 'https://test.haganrealtyproperties.com') !== false){
		$URL = str_replace('https://test.haganrealtyproperties.com', $_SERVER['DOCUMENT_ROOT'], $URL);
		$URL = str_replace('HaganRealtyProperties.com','dev.haganrealtyproperties.com', $URL);
	}
	return $URL;
}
