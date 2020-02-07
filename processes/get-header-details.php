<?php

header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: POST, GET");      
	
$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

session_start();

$user_id = $_SESSION['user-id'];

include 'db-conn.php';

$return = array();
$return[] = new StdClass();
$return[] = new StdClass();



if($sql = $conn->prepare("SELECT first_name, last_name, email, username FROM admin_user WHERE user_id=?")){
	$sql->bind_param('i', $user_id);
	//execute query
	$sql->execute();
	$sql->bind_result($first_name, $last_name, $email, $username);
	$sql->fetch();
	$return[0]->first_name = $first_name;
	$return[0]->last_name = $last_name;
	$return[0]->email = $email;
	$return[0]->username = $username;
	$sql->close();
}


if($sql = $conn->prepare("SELECT profile_src FROM admin_user_images WHERE user_id=?")){
	$sql->bind_param('i', $user_id);
	//execute query
	$sql->execute();
	$sql->bind_result($profile_src);
	$sql->fetch();
	$return[1]->src = $profile_src;
	$sql->close();
}

//profile pic

$image_type = 0;

if($sql = $conn->prepare("SELECT center_x, center_y, scale FROM admin_image_positioning WHERE user_id=? AND image_type=?")){
	$sql->bind_param('ii', $user_id, $image_type);
	//execute query
	$sql->execute();
	$sql->bind_result($center_x, $center_y, $scale);
	$sql->fetch();
	$return[1]->center_x = $center_x;
	$return[1]->center_y = $center_y;
	$return[1]->scale = $scale;
	$sql->close();
}

echo json_encode($return);




