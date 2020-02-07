<?php
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: POST, GET");      
	
include 'db-conn.php';

$raw_JSON = file_get_contents('php://input');
$input = json_decode($raw_JSON);

//set preview data
for($i = 0; $i < count($input); $i++){
	$visitor_id = $input[$i]->visitor_id;
	$lat = $input[$i]->lat;
	$lng = $input[$i]->lng;
	if($stmt = $conn->prepare("INSERT INTO visitor_location VALUES (?,?,?)")){
		$stmt->bind_param('idd', $visitor_id, $lat, $lng);
		$stmt->execute();
		$stmt->close();
	}
}

exit();