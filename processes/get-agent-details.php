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
$return[] = new StdClass();




if($sql = $conn->prepare("SELECT display_name, description, occupation, mobile_number, office_number, facebook_src, display_email, website_src FROM admin_user_agent_data WHERE user_id=?")){
	$sql->bind_param('i', $user_id);
	//execute query
	$sql->execute();
	$sql->bind_result($display_name, $description, $occupation, $mobile_number, $office_number, $facebook_src, $display_email, $website_src);
	$sql->fetch();
	$return[0]->display_name = $display_name;
	$return[0]->description = $description;
	$return[0]->occupation = $occupation;
	$return[0]->mobile_number = $mobile_number;
	$return[0]->office_number = $office_number;
	$return[0]->facebook_src = $facebook_src;
	$return[0]->display_email = $display_email;
	$return[0]->website_src = $website_src;
	$sql->close();
}


if($sql = $conn->prepare("SELECT agent_src FROM admin_user_images WHERE user_id=?")){
	$sql->bind_param('i', $user_id);
	//execute query
	$sql->execute();
	$sql->bind_result($agent_src);
	$sql->fetch();
	$return[1]->src = $agent_src;
	$sql->close();
}

//profile pic

$image_type = 2;

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




