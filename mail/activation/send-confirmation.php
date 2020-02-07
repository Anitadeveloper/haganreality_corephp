<?php 

$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'];


$confirmation_state = 0;
$email_sent = 1;

if($stmt = $conn->prepare("SELECT confirmation_state, email_sent FROM admin_user_confirmation WHERE user_id=?")){
	$stmt->bind_param("i", $user_id);	
	$stmt->execute();
	$stmt->bind_result($stmt_state, $stmt_email_sent);
	while ($stmt->fetch()) {
		$confirmation_state = $stmt_state;
		$email_sent = $stmt_email_sent;
	}
	$stmt->close();
}

if($confirmation_state === 0 && $email_sent === 0){

	$to_mail = 'joshualyness@outlook.com';

	$subject_mail = 'User Confirmation | Hagan Realty Properties Admin';

	$headers_mail = "From: " . "noreply@haganrealtyproperties.com" . "\r\n";
	$headers_mail .= "Reply-To: ". "contact@haganrealtyproperties.com" . "\r\n";
	$headers_mail .= "MIME-Version: 1.0\r\n";
	$headers_mail .= "Content-Type: text/html; charset=UTF-8\r\n";

	include($_SERVER['DOCUMENT_ROOT'].'/mail/activation/confirmation.php');

	mail($to_mail, $subject_mail, $message_mail, $headers_mail);
	
	if($stmt = $conn->prepare("UPDATE admin_user_confirmation SET email_sent=1 WHERE user_id=?")){
		$stmt->bind_param("i", $user_id);	
		$stmt->execute();
		$stmt->close();
	}
}
?>