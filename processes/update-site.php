<?php
ob_start();
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: POST, GET");      
	
include 'db-conn.php';

//get name and id headers
$site_id = intval(mysqli_real_escape_string($conn, $_SERVER['HTTP_ID']));
$name = mysqli_real_escape_string($conn, $_SERVER['HTTP_NAME']);
$url = mysqli_real_escape_string($conn, $_SERVER['HTTP_URL']);
$parameter = mysqli_real_escape_string($conn, $_SERVER['HTTP_PARAMETER']);
$schedule_ts = intval(mysqli_real_escape_string($conn, $_SERVER['HTTP_SCHEDULE_TS']));
$start_open_house_ts = intval(mysqli_real_escape_string($conn, $_SERVER['HTTP_START_OPEN_HOUSE_TS']));
$end_open_house_ts = intval(mysqli_real_escape_string($conn, $_SERVER['HTTP_END_OPEN_HOUSE_TS']));


//state of site - if equal to 1, it's uploaded, 0 is scheduled
$state = 1;

//set preview data
if($stmt = $conn->prepare("UPDATE site_preview_data SET name=?, url=? WHERE id=?")){
	$stmt->bind_param('ssi', $name, $url, $site_id);
	$stmt->execute();
	$stmt->close();
}

//set site parameter
if($stmt = $conn->prepare("UPDATE site_parameter SET parameter=? WHERE id=?")){
	$stmt->bind_param('si', $parameter, $site_id);
	$stmt->execute();
	$stmt->close();
}

//set schedule site
if($stmt = $conn->prepare("UPDATE site_schedule_timestamp SET schedule_ts=? WHERE id=?")){
	$stmt->bind_param('ii', $schedule_ts, $site_id);
	$stmt->execute();
	$stmt->close();
}

//set schedule site
if($stmt = $conn->prepare("UPDATE site_open_house_timestamp SET start_open_house_ts=?, end_open_house_ts=? WHERE id=?")){
	$stmt->bind_param('iii', $start_open_house_ts, $end_open_house_ts, $site_id);
	$stmt->execute();
	$stmt->close();
}

//get state
$curr_ts = time();
if($curr_ts < $schedule_ts){
	$state = 0;
} else {
	$state = 1;
}

//set site state
if($stmt = $conn->prepare("UPDATE site_state SET state=? WHERE id=?")){
	$stmt->bind_param('ii', $state, $site_id);
	$stmt->execute();
	$stmt->close();
}
