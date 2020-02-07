<?php


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: POST, GET"); 

$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'];

include 'db-conn.php';
	
$raw_JSON = file_get_contents('php://input');
$converted_JSON = json_decode($raw_JSON);

$valid = true;

$username = $converted_JSON->username;
$email = $converted_JSON->email;
$password = $converted_JSON->password;
$password_verify = $converted_JSON->verifypassword;


$u_space_check = preg_match('/\s/', $username);
$u_char_check = preg_match('/[^a-zA-Z0-9_-]/', $username);
$u_rows = 1;
if($stmt = $conn->prepare("SELECT * FROM admin_user WHERE username=?")){
	$stmt->bind_param("s", $username);	
	$stmt->execute();
	$stmt->store_result();
	$u_rows = $stmt->num_rows;
	$stmt->close();
	
	if($u_space_check == 0 && $u_char_check === 0 && $u_rows === 0 && $username !== ''){
		header('username: valid');
	} else if($u_space_check === 1 && $u_rows == 0 && $username !== ''){
		header('username: Spaces not allowed');
		$valid = false;
	} else if($u_char_check === 1 && $u_rows == 0 && $username !== ''){
		header('username: Special Characters not allowed');
		$valid = false;
	} else if($u_rows > 0 && $username !== '') {
		header('username: Username is taken');
		$valid = false;
	} else {
		header('username: Required Field');
		$valid = false;
	}
}



//check if email is already in use
$e_result = preg_match('/^[^@\s.][^@\s]*[^@\s.]@[^@\s.-][^@\s]*[.][^@\s]*[^@\s.]$/', $email);

$e_rows = 1;
if($stmt = $conn->prepare("SELECT * FROM admin_user WHERE email=?")){
	$stmt->bind_param("s", $email);	
	$stmt->execute();
	$stmt->store_result();
	$e_rows = $stmt->num_rows;
	$stmt->close();
	if($e_result === 1 && $e_rows === 0 && $email !== ''){
	header('email: valid');
	} else if($e_result === 0 && $e_rows === 0 && $email !== ''){
		header('email: Please enter valid email'); 
		$valid = false;
	} else if($e_result === 1 && $e_rows > 0 && $email !== '') {
		header('email: Email is already registered');
		$valid = false;
	} else {
		header('email: Required Field');
		$valid = false;
	}
}





if($password === $password_verify && $password_verify !== ''){
	header('password: valid');
} else if($password_verify === '' || $password === ''){
	header('password: Required Fields');
	$valid = false;
} else {
	header('password: Passwords do not match');
	$valid = false;
}

if($valid === true){
	include('user_register.php');
}


exit();