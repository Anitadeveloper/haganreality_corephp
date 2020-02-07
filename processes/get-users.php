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
	if($sql = $conn->prepare("SELECT au.*, aui.*, aup.* FROM admin_user au LEFT JOIN admin_user_images aui ON au.user_id = aui.user_id LEFT JOIN admin_user_privileges aup ON au.user_id = aup.user_id WHERE au.user_id IN (SELECT user_id FROM admin_user_confirmation WHERE confirmation_state=1) ORDER BY au.created_ts ASC LIMIT ? OFFSET ?")){
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
	//get data of all verified users
	if($sql = $conn->prepare("SELECT au.user_id,au.first_name,au.last_name,au.username,au.email, aui.*, aup.* FROM admin_user au LEFT JOIN admin_user_images aui ON au.user_id = aui.user_id LEFT JOIN admin_user_privileges aup ON au.user_id = aup.user_id WHERE au.user_id IN (SELECT user_id FROM admin_user_confirmation WHERE confirmation_state=1) ORDER BY au.created_ts ASC LIMIT ? OFFSET ?")){
		$sql->bind_param('ii', $limit, $min);
		//execute query
		$sql->execute();
		//store result
		$result = $sql->get_result();
		//create array of id's
		while($data = $result->fetch_assoc()){
		   $arr[] = $data;
		}

		$sql->close();
	}
	
	for($i = 0; $i < count($arr); $i++){
		$obj[] = ToObject($arr[$i]);
	}
	
	if($sql = $conn->prepare('SELECT * FROM admin_image_positioning WHERE image_type=0')){
		$sql->execute();
		
		$result = $sql->get_result();
		//add to array
		while($data = $result->fetch_assoc()){
			for($i = 0; $i < count($obj); $i++){
				if($data['user_id'] === $obj[$i]->user_id){
					$obj[$i]->image_positioning_profile = new StdClass();
					$obj[$i]->image_positioning_profile = ToObject($data);
				}
			}
		}
		
		$sql->close();
	}
	
	if($sql = $conn->prepare('SELECT * FROM admin_image_positioning WHERE image_type=1')){
		$sql->execute();
		
		$result = $sql->get_result();
		//add to array
		while($data = $result->fetch_assoc()){
			for($i = 0; $i < count($obj); $i++){
				if($data['user_id'] === $obj[$i]->user_id){
					$obj[$i]->image_positioning_cover = new StdClass();
					$obj[$i]->image_positioning_cover = ToObject($data);
				}
			}
		}
		
		$sql->close();
	}
	
} else if($state === 2) {
	if($sql = $conn->prepare("SELECT au.*, aui.*, aup.* FROM admin_user au LEFT JOIN admin_user_images aui ON au.user_id = aui.user_id LEFT JOIN admin_user_privileges aup ON au.user_id = aup.user_id WHERE au.user_id IN (SELECT user_id FROM admin_user_confirmation WHERE activated_state=1) ORDER BY au.created_ts ASC LIMIT ? OFFSET ?")){
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
}

if($search === ''){ 
	echo json_encode($obj);
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



function ToObject($Array) { 
      
    // Create new stdClass object 
    $object = new stdClass(); 
      
    // Use loop to convert array into 
    // stdClass object 
    foreach ($Array as $key => $value) { 
        if (is_array($value)) { 
            $value = ToObject($value); 
        } 
        $object->$key = $value; 
    } 
    return $object; 
} 
