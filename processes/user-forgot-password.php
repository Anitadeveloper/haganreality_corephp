<?php
	
include 'db-conn.php';

$email = $_SERVER['HTTP_EMAIL'];

$id = 0;

if($stmt = $conn->prepare("SELECT user_id FROM admin_user WHERE email=?")){
	$stmt->bind_param('s', $email);
	$stmt->bind_result($stmt_id);
	$stmt->execute();
	while ($stmt->fetch()) {
		$id = $stmt_id;
	}
	$stmt->close();
}

if($id === 0){
	echo 'That email is not recognised.';
	exit();
}

include($_SERVER['DOCUMENT_ROOT'].'/mail/forgot-password/send-forgot-password.php');

echo 'valid';

