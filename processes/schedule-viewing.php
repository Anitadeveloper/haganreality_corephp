<?php
session_start();
	
include 'db-conn.php';
	
$first_name = mysqli_real_escape_string($conn, $_SERVER['HTTP_FIRST_NAME']);
$last_name = mysqli_real_escape_string($conn, $_SERVER['HTTP_LAST_NAME']);
$email = mysqli_real_escape_string($conn, $_SERVER['HTTP_EMAIL']);
$phone_number = mysqli_real_escape_string($conn, $_SERVER['HTTP_PHONE_NUMBER']);
$section_id = mysqli_real_escape_string($conn, $_SERVER['HTTP_SECTION_ID']);

$ts = mysqli_real_escape_string($conn, $_SERVER['HTTP_TS']);

if($ts > -1){
	$date = date('l jS \of F Y h:i:s A', $ts);
} else {
	$date = 'any date or time';
}

$to_mail = $email;

$subject_mail = 'Viewing Booking | Hagan Realty';

$headers_mail = "From: " . "jed@haganrealty.com" . "\r\n";
$headers_mail .= "Reply-To: ". "jed@haganrealty.com" . "\r\n";
$headers_mail .= "MIME-Version: 1.0\r\n";
$headers_mail .= "Content-Type: text/html; charset=UTF-8\r\n";

include($_SERVER['DOCUMENT_ROOT'].'/Emails/Schedule-To-Client/email.php');

mail($to_mail, $subject_mail, $message_mail, $headers_mail);


if($stmt = $conn->prepare("SELECT email FROM site_section_09_emails WHERE section_id=?")){
	$stmt->bind_param('i', $section_id);
	//execute query
	$stmt->execute();
	//store result
	$stmt->bind_result($realtor_email);
	//create array of results
	while ($stmt->fetch()) {
		
		$to_mail = $realtor_email;
		
		$subject_mail = 'Viewing Booking - New Client | Hagan Realty';

		$headers_mail = "From: " . "jed@haganrealty.com" . "\r\n";
		$headers_mail .= "Reply-To: ". "jed@haganrealty.com" . "\r\n";
		$headers_mail .= "MIME-Version: 1.0\r\n";
		$headers_mail .= "Content-Type: text/html; charset=UTF-8\r\n";

		include($_SERVER['DOCUMENT_ROOT'].'/Emails/Scheduled-Viewing/email.php');

		mail($to_mail, $subject_mail, $message_mail, $headers_mail);

	}
	$stmt->close();
}
