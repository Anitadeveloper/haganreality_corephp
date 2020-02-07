<?php

header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: POST, GET");  
	
$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

session_start();

$user_id = intval($_SESSION['user-id']);

include 'db-conn.php';

$input_type = $_SERVER['HTTP_INPUT_TYPE'];
$input_value = $_SERVER['HTTP_INPUT_VALUE'];


if($input_type === 'display_name'){
	if($sql = $conn->prepare("UPDATE admin_user_agent_data SET display_name=? WHERE user_id=?")){
		$sql->bind_param('si', $input_value, $user_id);
		//execute query
		$sql->execute();
		$sql->close();
	}
	exit();
} 

if($input_type === 'occupation'){
	if($sql = $conn->prepare("UPDATE admin_user_agent_data SET occupation=? WHERE user_id=?")){
		$sql->bind_param('si', $input_value, $user_id);
		//execute query
		$sql->execute();
		$sql->close();
	}
	exit();
} 

if($input_type === 'description'){
	if($sql = $conn->prepare("UPDATE admin_user_agent_data SET description=? WHERE user_id=?")){
		$sql->bind_param('si', $input_value, $user_id);
		//execute query
		$sql->execute();
		$sql->close();
	}
	exit();
} 

if($input_type === 'mobile_number'){
	if($sql = $conn->prepare("UPDATE admin_user_agent_data SET mobile_number=? WHERE user_id=?")){
		$sql->bind_param('si', $input_value, $user_id);
		//execute query
		$sql->execute();
		$sql->close();
	}
	exit();
} 

if($input_type === 'office_number'){
	if($sql = $conn->prepare("UPDATE admin_user_agent_data SET office_number=? WHERE user_id=?")){
		$sql->bind_param('si', $input_value, $user_id);
		//execute query
		$sql->execute();
		$sql->close();
	}
	exit();
} 

if($input_type === 'facebook_profile'){
	if($sql = $conn->prepare("UPDATE admin_user_agent_data SET facebook_src=? WHERE user_id=?")){
		$sql->bind_param('si', $input_value, $user_id);
		//execute query
		$sql->execute();
		$sql->close();
	}
	exit();
} 

if($input_type === 'display_email'){
	if($sql = $conn->prepare("UPDATE admin_user_agent_data SET display_email=? WHERE user_id=?")){
		$sql->bind_param('si', $input_value, $user_id);
		//execute query
		$sql->execute();
		$sql->close();
	}
	exit();
} 

if($input_type === 'website_src'){
	if($sql = $conn->prepare("UPDATE admin_user_agent_data SET website_src=? WHERE user_id=?")){
		$sql->bind_param('si', $input_value, $user_id);
		//execute query
		$sql->execute();
		$sql->close();
	}
	exit();
} 

