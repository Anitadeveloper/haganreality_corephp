<?php

ob_start();
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: POST, GET");      
	
$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

session_start();

$user_id = $_SESSION['user-id'];

include 'db-conn.php';

$center_x = $_SERVER['HTTP_CENTER_X'];
$center_y = $_SERVER['HTTP_CENTER_Y'];
$scale = $_SERVER['HTTP_SCALE'];

if(isset($_FILES['file']['name'])){
	
	// DO NOT TRUST $_FILES['upfile']['mime'] VALUE !!
	// Check MIME Type by yourself.

	$finfo = new finfo(FILEINFO_MIME_TYPE);
	$finfo->file($file);
	$file_type = $finfo->file($_FILES['file']['tmp_name']);

	$info = pathinfo($_FILES['file']['name']);
	$ext = $info['extension']; // get the extension of the file
	
	$newname = '';
	
	$generated_name = false;
	
	while($generated_name === false){
		$rand_name = RandomString();
		$rand_name_file = $root.'images/user-agent-photo/' . $rand_name . '.' . $ext;
		$num_rows = 1;
		if($stmt = $conn->prepare("SELECT * FROM admin_user_images WHERE agent_src=?")){
			$stmt->bind_param('s', $rand_name_file);
			
			$stmt->execute();

			$stmt->store_result();
			
			$num_rows = $stmt->num_rows;
			
			$stmt->close();
		}
		if($num_rows === 0){
			$newname = $rand_name . '.' . $ext;
			$generated_name = true;
		}
	}
	
	//delete old image
	
	if($sql = $conn->prepare("SELECT agent_src FROM admin_user_images WHERE user_id=?")){
		$sql->bind_param('i', $user_id);
		//execute query
		$sql->execute();
		$sql->bind_result($src);
		$sql->fetch();
		$src = URLToFilePath($src);
		if($src != $_SERVER['DOCUMENT_ROOT'].'/images/user-agent-photo/default.jpg'){
			unlink($src);
		}
		$sql->close();
	}

	//save new image
	$target = $_SERVER['DOCUMENT_ROOT'] . '/images/user-agent-photo/' . $newname;
	$result = copy($_FILES['file']['tmp_name'], $target);
	
	$file_name = $root . 'images/user-agent-photo/' . $newname;
	//store name in database
	if($sql = $conn->prepare("UPDATE admin_user_images SET agent_src=? WHERE user_id=?")){
		$sql->bind_param('si', $file_name, $user_id);
		//execute query
		$sql->execute();
		$sql->close();
	}
}

if($sql = $conn->prepare("UPDATE admin_image_positioning SET center_x=?, center_y=?, scale=? WHERE image_type=2 AND user_id=?")){
	$sql->bind_param('dddi', $center_x, $center_y, $scale, $user_id);
	//execute query
	$sql->execute();
	$sql->close();
}

if($sql = $conn->prepare("SELECT agent_src FROM admin_user_images WHERE user_id=?")){
	$sql->bind_param('i', $user_id);
	//execute query
	$sql->execute();
	$sql->bind_result($src);
	$sql->fetch();
	echo $src;
	$sql->close();
}

function RandomString(){
	
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randstring = '';
    for ($i = 0; $i < 100; $i++) {
        $randstring .= $characters[rand(0, strlen($characters))];
    }
    return $randstring;
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

