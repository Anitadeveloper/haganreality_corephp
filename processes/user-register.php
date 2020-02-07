<?php
	
include 'db-conn.php';

$register_input = file_get_contents('php://input');
$register_input = json_decode($register_input);


$first_name = $register_input->first_name;
$last_name = $register_input->last_name;
$email = $register_input->email;
$username = $register_input->username;
$password = $register_input->password;
$password_hash = password_hash($password, PASSWORD_DEFAULT);

$response = [];

if($stmt = $conn->prepare("SELECT email FROM admin_user WHERE email=?")){
	$stmt->bind_param('s', $email);
	$stmt->bind_result($fetch_email);
	$stmt->execute();
	$stmt->store_result();
	$num_rows = $stmt->num_rows;
	if($num_rows !== 0) {
		array_push($response, 'Email address already in use');
	}
	$stmt->close();
}

if($stmt = $conn->prepare("SELECT username FROM admin_user WHERE username=?")){
	$stmt->bind_param('s', $username);
	$stmt->bind_result($fetch_username);
	$stmt->execute();
	$stmt->store_result();
	$num_rows = $stmt->num_rows;
	if($num_rows !== 0) {
		array_push($response, 'Username already in use');
	}
	$stmt->close();
}

if(count($response) !== 0){
	echo json_encode($response);
	exit();
}

//else continue running registration script

if($first_name === '' || $last_name === '' || $username === '' || $email === '' || $password === ''){
	exit();
}

$generated_num = false;

$id = -1;

while($generated_num === false){
	$rand_num = rand(1, 999999);
	$num_rows = 1;
	if($stmt = $conn->prepare("SELECT * FROM admin_user WHERE user_id=?")){
		$stmt->bind_param('i', $rand_num);

		$stmt->execute();

		$stmt->store_result();

		$num_rows = $stmt->num_rows;

		$stmt->close();
	}
	if($num_rows === 0){
		$id = $rand_num;
		$generated_num = true;
	}
}



if($stmt = $conn->prepare("INSERT INTO admin_user VALUES (?,?,?,?,?,?,UNIX_TIMESTAMP(now()))")){
	$stmt->bind_param("isssss", $id, $first_name, $last_name, $email, $username, $password_hash);	
	$stmt->execute();
	$stmt->close();
}



//enter temporary info, will be activated on activation page
$activation_hash = '';

if($stmt = $conn->prepare("INSERT INTO admin_user_activate VALUES (?,0,?,0,UNIX_TIMESTAMP(now()))")){

	$stmt->bind_param("is", $id, $activation_hash);	
	$stmt->execute();
	$stmt->close();
}

if($stmt = $conn->prepare("INSERT INTO admin_user_confirmation VALUES (?,0,0)")){

	$stmt->bind_param("i", $id);	
	$stmt->execute();
	$stmt->close();
}

//enter temporary info, privileges set to 0
$activated = 0;

if($stmt = $conn->prepare("INSERT INTO admin_user_privileges VALUES (?,0)")){
	$stmt->bind_param("i", $id);	
	$stmt->execute();
	$stmt->close();
}

if($stmt = $conn->prepare("INSERT INTO admin_user_password_reset VALUES (?,'',0,0)")){
	$stmt->bind_param("i", $id);	
	$stmt->execute();
	$stmt->close();

}

$user_profile = 'http://www.haganrealtyproperties.com/images/user-profile/default.jpg';
$user_cover = 'http://www.haganrealtyproperties.com/images/user-cover/default.jpg';
$user_agent = 'http://www.haganrealtyproperties.com/images/user-agent-photo/default.jpg';

if($stmt = $conn->prepare("INSERT INTO admin_user_photos VALUES (?,?,?,?)")){

	$stmt->bind_param("isss", $id, $user_profile, $user_cover, $user_agent);	
	$stmt->execute();
	$stmt->close();

}

include($_SERVER['DOCUMENT_ROOT'].'/mail/activation/send-activation.php');

session_start();
$_SESSION['user-id'] = $id;
echo 'complete';

