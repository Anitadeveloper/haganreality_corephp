<?php 

	$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

	include($_SERVER['DOCUMENT_ROOT'].'/processes/db-conn.php');

	//get array of all users without locations

	$visitor_ip = Array();

	if($stmt = $conn->prepare("SELECT * FROM visitor_ip")){
		$stmt->execute();
		$stmt->bind_result($visitor_id_fetch, $ip_fetch);
		$index = 0;
		while($stmt->fetch()){
			$visitor_ip[$index] = new StdClass();
			$visitor_ip[$index]->visitor_id = $visitor_id_fetch;
			$visitor_ip[$index]->ip = $ip_fetch;
			$index++;
		}
		$stmt->close();
	}

	$visitor_id_location = Array();

	if($stmt = $conn->prepare("SELECT visitor_id FROM visitor_location")){
		$stmt->execute();
		$stmt->bind_result($visitor_id_fetch);
		$index = 0;
		while($stmt->fetch()){
			$visitor_id_location[$index] = $visitor_id_fetch;
			$index++;
		}
		$stmt->close();
	}

	$unset_locations = Array();
	$index = 0;

	for($i = 0; $i < count($visitor_ip); $i++){
		$set = false;
		for($j = 0; $j < count($visitor_id_location); $j++){
			if($visitor_id_location[$j] === $visitor_ip[$i]->visitor_id){
				$set = true;
			}
		}
		if($set === false){
			$unset_locations[$index] = new StdClass();
			$unset_locations[$index]->visitor_id = $visitor_ip[$i]->visitor_id;
			$unset_locations[$index]->ip = $visitor_ip[$i]->ip;
			$geo = json_decode(file_get_contents("http://extreme-ip-lookup.com/json/".$visitor_ip[$i]->ip));
			$unset_locations[$index]->lat = $geo->lat;
			$unset_locations[$index]->lng = $geo->lon;
			$index++;
		}
	}

	for($i = 0; $i < count($unset_locations); $i++){
		$visitor_id = $unset_locations[$i]->visitor_id;
		$lat = $unset_locations[$i]->lat;
		$lng = $unset_locations[$i]->lng;
		if($stmt2 = $conn->prepare("INSERT INTO visitor_location VALUES (?,?,?)")){
			$stmt2->bind_param('idd', $visitor_id, $lat, $lng);
			$stmt2->execute();
			$stmt2->close();
		}
	}

?>
