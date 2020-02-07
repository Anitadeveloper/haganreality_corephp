<?php 

$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'];

$reset_num = sprintf("%06d",rand(0,999999));
$reset_hash = password_hash($reset_num, PASSWORD_DEFAULT);

if($stmt = $conn->prepare("UPDATE admin_user_password_reset SET reset_hash=? WHERE user_id=?")){
	$stmt->bind_param("si",$reset_hash, $id);	
	$stmt->execute();
	$stmt->close();
}

$to_mail = $email;

$subject_mail = 'Password Reset | Hagan Realty Properties Admin';

$headers_mail = "From: " . "noreply@haganrealtyproperties.com" . "\r\n";
$headers_mail .= "Reply-To: ". "contact@haganrealtyproperties.com" . "\r\n";
$headers_mail .= "MIME-Version: 1.0\r\n";
$headers_mail .= "Content-Type: text/html; charset=UTF-8\r\n";

include($_SERVER['DOCUMENT_ROOT'].'/mail/forgot-password/forgot-password.php');

mail($to_mail, $subject_mail, $message_mail, $headers_mail)
?>