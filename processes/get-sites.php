<?php


session_start();
	
include 'db-conn.php';


//get input
$get_info = file_get_contents('php://input');
$get_info = json_decode($get_info);

$min = mysqli_real_escape_string($conn, $get_info->minimum);
$max = mysqli_real_escape_string($conn, $get_info->maximum);
$state = intval(mysqli_real_escape_string($conn, $get_info->state));
$search = mysqli_real_escape_string($conn, $get_info->search);

$arr = array();

//will be 1 if both removed and scheduled are 0
$limit = $max - $min;

if($state === 0){
	//get data of scheduled sites
	if($sql = $conn->prepare("SELECT spd.*, sst.*, sp.* FROM site_preview_data spd LEFT JOIN site_schedule_timestamp sst ON spd.id = sst.id LEFT JOIN site_parameter sp ON spd.id = sp.id WHERE spd.id IN (SELECT id FROM site_state WHERE state=0) ORDER BY sst.schedule_ts ASC LIMIT ? OFFSET ?")){
		$sql->bind_param('ii', $limit, $min);
		//execute query
		$sql->execute();
		//store result
		$result = $sql->get_result();
		//create array of id's
		while($data = $result->fetch_assoc()){
		   $arr[] =  $data;
		}

		$sql->close();
	}
} else if($state === 1){
	//get data of active sites
	if($sql = $conn->prepare("SELECT spd.*, sbm.*, sp.* FROM site_preview_data spd LEFT JOIN site_basic_metrics sbm ON spd.id = sbm.id LEFT JOIN site_parameter sp ON spd.id = sp.id WHERE spd.id IN (SELECT id FROM site_state WHERE state=1) ORDER BY spd.id DESC LIMIT ? OFFSET ?")){
		$sql->bind_param('ii', $limit, $min);
		//execute query
		$sql->execute();
		//store result
		$result = $sql->get_result();
		//create array of id's
		while($data = $result->fetch_assoc()){
		   $arr[] =  $data;
		}

		$sql->close();
	}
} else if($state === 2) {
	//get data of deleted sites
	if($sql = $conn->prepare("SELECT spd.*, sdt.*, sp.* FROM site_preview_data spd LEFT JOIN site_delete_timestamp sdt ON spd.id = sdt.id LEFT JOIN site_parameter sp ON spd.id = sp.id WHERE spd.id IN (SELECT id FROM site_state WHERE state=2) ORDER BY sdt.delete_ts DESC LIMIT ? OFFSET ?")){
		$sql->bind_param('ii', $limit, $min);
		//execute query
		$sql->execute();
		//store result
		$result = $sql->get_result();
		//create array of id's
		while($data = $result->fetch_assoc()){
		   $arr[] =  $data;
		}

		$sql->close();
	}
} else if($state === 3){
	//get data of scheduled sites
	if($sql = $conn->prepare("SELECT spd.*, sst.*, sp.* FROM site_preview_data spd LEFT JOIN site_schedule_timestamp sst ON spd.id = sst.id LEFT JOIN site_parameter sp ON spd.id = sp.id ORDER BY sst.schedule_ts")){
		//execute query
		$sql->execute();
		//store result
		$result = $sql->get_result();
		//create array of id's
		while($data = $result->fetch_assoc()){
		   $arr[] =  $data;
		}

		$sql->close();
	}
}

if($search === ''){ 
	echo json_encode($arr);
} else {
	$arr2 = array();
	//iterate through all results and do a search
	for($i = 0; $i < count($arr); $i++){
		if(stripos($arr[$i]['name'], $search) !== false || stripos($arr[$i]['url'], $search) !== false){
			array_push($arr2, $arr[$i]);
		}
	}
	echo json_encode($arr2);
}
