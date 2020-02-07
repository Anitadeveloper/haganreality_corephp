<?php
ob_start();
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: POST, GET");      
	
$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

include 'db-conn.php';

//get name and id headers
$name = mysqli_real_escape_string($conn, $_SERVER['HTTP_NAME']);
$url = mysqli_real_escape_string($conn, $_SERVER['HTTP_URL']);
$parameter = mysqli_real_escape_string($conn, $_SERVER['HTTP_PARAMETER']);
$schedule_ts = intval(mysqli_real_escape_string($conn, $_SERVER['HTTP_SCHEDULE_TS']));
$start_open_house_ts = intval(mysqli_real_escape_string($conn, $_SERVER['HTTP_START_OPEN_HOUSE_TS']));
$end_open_house_ts = intval(mysqli_real_escape_string($conn, $_SERVER['HTTP_END_OPEN_HOUSE_TS']));

//get the site id
$site_id = 0;

if($stmt = $conn->prepare("SELECT id FROM site_preview_data ORDER BY id DESC LIMIT 1")){
	$stmt->execute();

	$stmt->bind_result($id);
	//get new array
	$stmt->fetch();
	$site_id = $id + 1;

	$stmt->close();
}

//state of site - if equal to 1, it's uploaded, 0 is scheduled
$state = 1;

//set preview data
if($stmt = $conn->prepare("INSERT INTO site_preview_data VALUES (?,?,?)")){
	$stmt->bind_param('iss', $site_id, $name, $url);
	$stmt->execute();
	$stmt->close();
}

//set site parameter
if($stmt = $conn->prepare("INSERT INTO site_parameter VALUES (?,?)")){
	$stmt->bind_param('is', $site_id, $parameter);
	$stmt->execute();
	$stmt->close();
}

//set basic metrics
$views = 0;
if($stmt = $conn->prepare("INSERT INTO site_basic_metrics VALUES (?,?)")){
	$stmt->bind_param('ii', $site_id, $views);
	$stmt->execute();
	$stmt->close();
}

//set schedule site
if($stmt = $conn->prepare("INSERT INTO site_schedule_timestamp VALUES (?,?)")){
	$stmt->bind_param('ii', $site_id, $schedule_ts);
	$stmt->execute();
	$stmt->close();
}

//set schedule site
if($stmt = $conn->prepare("INSERT INTO site_open_house_timestamp VALUES (?,?,?)")){
	$stmt->bind_param('iii', $site_id, $start_open_house_ts, $end_open_house_ts);
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
if($stmt = $conn->prepare("INSERT INTO site_state VALUES (?,?)")){
	$stmt->bind_param('ii', $site_id, $state);
	$stmt->execute();
	$stmt->close();
}

//make new folder for site
$file_name = $url;
$parent_id = 0;
$folder = 'true';
$include = 'true';

include($_SERVER['DOCUMENT_ROOT'].'/processes/upload-file.php');

//set schedule site
if($stmt = $conn->prepare("INSERT INTO site_default_folder VALUES (?,?)")){
	$stmt->bind_param('ii', $site_id, $file_id);
	$stmt->execute();
	$stmt->close();
}
