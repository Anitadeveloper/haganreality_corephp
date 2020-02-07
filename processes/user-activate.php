<?php

session_start();

include 'db-conn.php';

if(isset($_SESSION['user-id'])){
	$user_id = $_SESSION['user-id'];
} else {
	echo 'Not logged in';
	exit();
}
$key = $_SERVER['HTTP_CODE'];
$email = '';

if($stmt = $conn->prepare("SELECT email FROM admin_user WHERE user_id=?")){
	$stmt->bind_param('i', $user_id);
	$stmt->bind_result($result_email);
	$stmt->execute();
	while ($stmt->fetch()) {
		$email = $result_email;
	}
	$stmt->close();
}

$hash = '';
$attempts = '';
$timestamp = '';

if($stmt = $conn->prepare("SELECT activate_hash, attempts, activate_unix_ts FROM admin_user_activate WHERE user_id=?")){
	$stmt->bind_param("i", $user_id);	
	$stmt->bind_result($result_hash, $result_attempts, $activate_unix_ts);
	$stmt->execute();
	while ($stmt->fetch()) {
		$hash = $result_hash;
		$attempts = $result_attempts;
		$timestamp = $activate_unix_ts;
	}
	$stmt->close();
}
		
if($attempts >= 3){
	echo 'Too many attempts. Request a new code.';
	exit(); 
}

$ts = time();
if($ts > $timestamp + 86400){
	echo 'Code has expired. Request a new code.';
	exit(); 
}
//hash comparison
$hash_activate_check = password_verify($key, $hash);

if($hash_activate_check == false) {
	if($stmt2 = $conn->prepare("UPDATE admin_user_activate SET attempts=attempts+1 WHERE user_id=?")){
		$stmt2->bind_param('i',$user_id);
		$stmt2->execute();
		$stmt2->close();
	}
	$attempts+=1;
	echo ('Wrong code entered for '.$email.'. '.(4 - $attempts).' attempts left.');
	exit();
} else if($hash_activate_check == true) {
	//set activated state to true
	if($stmt2 = $conn->prepare("UPDATE admin_user_activate SET activated_state=1 WHERE user_id=?")){
		$stmt2->bind_param('i',$user_id);
		$stmt2->execute();
		$stmt2->close();
	}
	$username = '';

	if($stmt = $conn->prepare("SELECT username FROM admin_user WHERE user_id=?")){
		$stmt->bind_param('i', $user_id);
		$stmt->bind_result($result_username);
		$stmt->execute();
		while ($stmt->fetch()) {
			$username = $result_username;
		}
		$stmt->close();
	}

	include($_SERVER['DOCUMENT_ROOT'].'/mail/activation/send-confirmation.php');

	echo ('valid');
	exit();
}


