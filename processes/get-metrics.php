<?php
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: POST, GET");      
	
include 'db-conn.php';


$site_id = intval($_SERVER['HTTP_SITE_ID']);


$log = Array();

//if($stmt = $conn->prepare("SELECT visitor_id, visit_ts, last_ts FROM visitor_site_log WHERE site_id = ? ORDER BY site_id ASC")){
    if($stmt = $conn->prepare("SELECT visitor_id, visit_ts, last_ts FROM visitor_site_log WHERE site_id=?")){
    $stmt->bind_param('i', $site_id);
    $stmt->bind_result($visitor_id, $visit_ts, $last_ts);
    $stmt->execute();
    $index = 0;
    while($stmt->fetch()){
        $log[$index] = new StdClass();
        $log[$index]->visitor_id = $visitor_id;
        $log[$index]->visit_ts = $visit_ts;
        $log[$index]->last_ts = $last_ts;
        $index++;
    }
    $stmt->close();
}

$locations = Array();

if($stmt = $conn->prepare("SELECT visitor_id, lat, lng, region FROM visitor_location")){
	$stmt->bind_result($visitor_id, $lat, $lng, $region);
	$stmt->execute();
	$index = 0;
	while($stmt->fetch()){
		$locations[$index] = new StdClass();
		$locations[$index]->visitor_id = $visitor_id;
		$locations[$index]->lat = $lat;
		$locations[$index]->lng = $lng;
		$locations[$index]->region = $region;
		$index++;
	}
	$stmt->close();
}

$device_type = Array();

if($stmt = $conn->prepare("SELECT visitor_id, device_type FROM visitor_device_type")){
	$stmt->bind_result($visitor_id_fetch, $device_type_fetch);
	$stmt->execute();
	$index = 0;
	while($stmt->fetch()){
		$device_type[$index] = new StdClass();
		$device_type[$index]->visitor_id = $visitor_id_fetch;
		$device_type[$index]->device_type = $device_type_fetch;
		$index++;
	}
	$stmt->close();
}



$referrer = Array();

if($stmt = $conn->prepare("SELECT visitor_id, domain, path  FROM visitor_referrer")){
	$stmt->bind_result($visitor_id_fetch, $domain_fetch, $path_fetch);
	$stmt->execute();
	$index = 0;
	while($stmt->fetch()){
		$referrer[$index] = new StdClass();
		$referrer[$index]->visitor_id = $visitor_id_fetch;
		$referrer[$index]->domain = $domain_fetch;
		$referrer[$index]->path = $path_fetch;
		$index++;
	}
	$stmt->close();
}

$site = new StdClass();
$site->log = Array();
$site->visitors = Array();

$visitor_added = Array();

for($i = 0; $i < count($log); $i++){
	
	$index = $log[$i]->site_id;
		
	$log_index = count($site->log);
	$site->log[$log_index] = new StdClass();
	$site->log[$log_index]->visitor_id = $log[$i]->visitor_id;
	$site->log[$log_index]->visit_ts = $log[$i]->visit_ts;
	$site->log[$log_index]->last_ts = $log[$i]->last_ts;
	
	$added_to_visitors = false;
	for($j = 0; $j < count($site->visitors); $j++){
		if($site->visitors[$j]->visitor_id === $log[$i]->visitor_id){
			$added_to_visitors = true;
			$site->visitors[$j]->visits = $site->visitors[$j]->visits + 1;
		}
	}
	
	if($added_to_visitors === false){
		for($j = 0; $j < count($locations); $j++){
			if($locations[$j]->visitor_id === $log[$i]->visitor_id){
				$visitor_index = count($site->visitors);
				//add lat and lng, visitor count, and index to new array
				$site->visitors[$visitor_index] = new StdClass();
				$site->visitors[$visitor_index]->visitor_id = $locations[$j]->visitor_id;
				$site->visitors[$visitor_index]->lat = $locations[$j]->lat;
				$site->visitors[$visitor_index]->lng = $locations[$j]->lng;
				$site->visitors[$visitor_index]->visits = 1;
				$site->visitors[$visitor_index]->region = $locations[$j]->region;
				$site->visitors[$visitor_index]->device_type = '';
				$site->visitors[$visitor_index]->referrer = new StdClass();
				$site->visitors[$visitor_index]->referrer->domain = '';
				$site->visitors[$visitor_index]->referrer->path = '';
			}
		}
	}
}

for($l = 0; $l < count($site->visitors); $l++){
    for($j = 0; $j < count($device_type); $j++){
        if($device_type[$j]->visitor_id === $site->visitors[$l]->visitor_id){
            //add lat and lng, visitor count, and index to new array
            $site->visitors[$l]->device_type = $device_type[$j]->device_type;
        }
    }
    for($j = 0; $j < count($referrer); $j++){
        if($referrer[$j]->visitor_id === $site->visitors[$l]->visitor_id){
            //add lat and lng, visitor count, and index to new array
            $site->visitors[$l]->referrer->domain = $referrer[$j]->domain;
            $site->visitors[$l]->referrer->path = $referrer[$j]->path;
        }
    }
}


echo json_encode($site);

exit();