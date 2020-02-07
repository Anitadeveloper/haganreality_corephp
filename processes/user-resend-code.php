<?php
	
include 'db-conn.php';

session_start();
$id = -1;
if(isset($_SESSION['user-id'])){
	$id = $_SESSION['user-id'];
}

//enter temporary info, will be activated on activation page
$activation_hash = '';

if($stmt = $conn->prepare("UPDATE admin_user_activate SET activate_hash=?, attempts=0, activate_unix_ts=UNIX_TIMESTAMP(now()) WHERE user_id=?")){

	$stmt->bind_param("si", $activation_hash, $id);	
	$stmt->execute();
	$stmt->close();
}

include($_SERVER['DOCUMENT_ROOT'].'/mail/activation/send-activation.php');

