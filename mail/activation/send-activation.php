<?php 

$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'];


$activated_state = 0;


if($stmt = $conn->prepare("SELECT activated FROM admin_user_activate WHERE user_id=?")){
	$stmt->bind_param("i", $id);	
	$stmt->execute();
	$stmt->bind_result($stmt_state);
	while ($stmt->fetch()) {
		$activated_state = $stmt_state;
	}
	$stmt->close();
}

if($activated_state === 0){

	$activation_num = sprintf("%06d",rand(0,999999));
	$activation_hash = password_hash($activation_num, PASSWORD_DEFAULT);

	if($stmt = $conn->prepare("UPDATE admin_user_activate SET activate_hash=? WHERE user_id=?")){
		$stmt->bind_param("si",$activation_hash, $id);	
		$stmt->execute();
		$stmt->close();
	}


	//get email
	if($stmt = $conn->prepare("SELECT email FROM admin_user WHERE user_id=?")){
		$stmt->bind_param('i', $id);	
		$stmt->execute();
		$stmt->bind_result($stmt_email);
		while ($stmt->fetch()) {
			$email = $stmt_email;
		}
		$stmt->close();
	}

	$to_mail = $email;

	$subject_mail = 'Email Verification | Hagan Realty Properties Admin';

	$headers_mail = "From: " . "noreply@haganrealtyproperties.com" . "\r\n";
	$headers_mail .= "Reply-To: ". "contact@haganrealtyproperties.com" . "\r\n";
	$headers_mail .= "MIME-Version: 1.0\r\n";
	$headers_mail .= "Content-Type: text/html; charset=UTF-8\r\n";

	include($_SERVER['DOCUMENT_ROOT'].'/mail/activation/activate.php');

	mail($to_mail, $subject_mail, $message_mail, $headers_mail);
}
?>