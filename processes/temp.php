<?php
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: POST, GET");      
	
include 'db-conn.php';

$log = [];
//set preview data
if($stmt = $conn->prepare("SELECT visitor_id, site_id, visit_ts FROM visitor_site_log")){
	$stmt->bind_result($visitor_id_fetch, $site_id_fetch, $visit_ts_fetch);
	$stmt->execute();
	$index = 0;
	while($stmt->fetch()){
		$log[$index] = new StdClass();
		$log[$index]->visitor_id = $visitor_id_fetch;
		$log[$index]->site_id = $site_id_fetch;
		$log[$index]->visit_ts = $visit_ts_fetch;
		$index++;
	}
	$stmt->close();
}
foreach ($log as $entry){
	$last_ts = $entry->visit_ts + rand(1,30);
	$visitor_id = $entry->visitor_id;
	$visit_ts = $entry->visit_ts;
	$site_id = $entry->site_id;
	echo '..... visitor id: ' . $visitor_id . ', visit ts: ' . $visit_ts . ', site id: ' . $site_id . ', last ts: ' . $last_ts;
	if($stmt = $conn->prepare("UPDATE visitor_site_log SET last_ts=? WHERE visitor_id=? AND site_id=? AND visit_ts=?")){
		$stmt->bind_param('iiii', $last_ts, $visitor_id, $site_id, $visit_ts);
		$stmt->execute();
		$stmt->close();
	}
}

exit();