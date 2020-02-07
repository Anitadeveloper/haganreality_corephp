<?php 
//IP address stuff
include($_SERVER['DOCUMENT_ROOT'].'/processes/db-conn.php');

$visitor_ip = Array();
$index = 0;

$states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


if($stmt = $conn->prepare("SELECT visitor_id, ip FROM visitor_ip")){
	$stmt->bind_result($visitor_id_fetch, $ip_fetch);
	$stmt->execute();
	while($stmt->fetch()){
		$visitor_ip[$index] = new StdClass();
		$visitor_ip[$index]->visitor_id = $visitor_id_fetch;
		$visitor_ip[$index]->ip = $ip_fetch;
		$index++;
	}
	$stmt->close();
}

	
for($i = 0; $i < count($visitor_ip); $i++){
		
	$geo = json_decode(file_get_contents("http://extreme-ip-lookup.com/json/".$visitor_ip[$i]->ip));
		
	$country = $geo->country;
	$region = $geo->region;
	
	$contains_region = false;
	
	foreach($states as $state) {
        if (stripos($region,$state) !== false){
			$contains_region = true;
		}
    }
	
	if($contains_region === false){
		$region = 'Outside US';
	}
		
	if($country === 'United States' && $contains_region === false){
		$region = 'X-UNKNOWN-AREA: '.$geo->region;
	}
	echo $region.PHP_EOL;

	if($stmt = $conn->prepare("UPDATE visitor_location SET region=? WHERE visitor_id=?")){
		$stmt->bind_param('si', $region, $visitor_ip[$i]->visitor_id);
		$stmt->execute();
		$stmt->close();
	}
}
	


?>