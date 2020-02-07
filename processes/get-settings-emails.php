<?php

header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: POST, GET");      
	
$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

session_start();

$user_id = $_SESSION['user-id'];

include 'db-conn.php';

$return = array();

if(isset($_SESSION['user-id'])){
	if($sql = $conn->prepare("SELECT email_id, email, scheduled_viewings_notifications, site_metrics_notifications, user_requests_notifications, site_updates_notifications FROM admin_user_emails WHERE user_id=?")){
		$sql->bind_param('i', $user_id);
		//execute query
		$sql->execute();
		$sql->bind_result($email_id, $email, $scheduled_viewings_notifications, $site_metrics_notifications, $user_requests_notifications, $site_updates_notifications);
		$index = 0;
		while ($sql->fetch()) {
			$return[$index] = new StdClass();
			$return[$index]->email_id = $email_id;
			$return[$index]->email = $email;
			$return[$index]->scheduled_viewings_notifications = $scheduled_viewings_notifications;
			$return[$index]->site_metrics_notifications = $site_metrics_notifications;
			$return[$index]->user_requests_notifications = $user_requests_notifications;
			$return[$index]->site_updates_notifications = $site_updates_notifications;
			$index++;
		}
		$sql->close();
	}
}

echo json_encode($return);




