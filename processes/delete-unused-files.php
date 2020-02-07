<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: site-id,add-view");
header("Access-Control-Allow-Methods: POST, GET");  

include 'db-conn.php';


$arr = [];

//get all files with delete flag
if($stmt = $conn->prepare("SELECT file_id FROM file_delete_state WHERE state=1")){

	$stmt->execute();
	
	$stmt->bind_result($file_id);
	
	while ($stmt->fetch()) {
		$tmp = new StdClass();
		$tmp->file_id = $file_id;
		array_push($arr, $tmp);
    }

	$stmt->close();
}

//get counts of files
for($i = 0; $i < count($arr); $i++){
	
	$file_id = $arr[$i]->file_id;
	//get src of file
	if($stmt = $conn->prepare("SELECT file_src FROM file_src WHERE file_id=?")){
		$stmt->bind_param('i', $file_id);
		$stmt->execute();
		$stmt->bind_result($file_src);
		$stmt->fetch();
		$file_src = $file_src;
		$stmt->close();
	}

	//check section 0, 3, 4, 7, 11, and 12 for instances of the file
	$count = 0;
		
		
	if($stmt = $conn->prepare("SELECT section_id FROM site_section_00 WHERE image_src=?")){
		$stmt->bind_param('s', $file_src);
		$stmt->execute();
		$stmt->bind_result($section_id);
		while ($stmt->fetch()) {
			$count++;
		}
		$stmt->close();
	}
	if($stmt = $conn->prepare("SELECT section_id FROM site_section_03 WHERE image_src=?")){
		$stmt->bind_param('s', $file_src);
		$stmt->execute();
		$stmt->bind_result($section_id);
		while ($stmt->fetch()) {
			$count++;
		}
		$stmt->close();
	}
	if($stmt = $conn->prepare("SELECT image_id FROM site_section_04_images WHERE image_src=?")){
		$stmt->bind_param('s', $file_src);
		$stmt->execute();
		$stmt->bind_result($image_id);
		while ($stmt->fetch()) {
			$count++;
		}
		$stmt->close();
	}
	if($stmt = $conn->prepare("SELECT image_id FROM site_section_07_floorplans WHERE image_src=?")){
		$stmt->bind_param('s', $file_src);
		$stmt->execute();
		$stmt->bind_result($image_id);
		while ($stmt->fetch()) {
			$count++;
		}
		$stmt->close();
	}
	if($stmt = $conn->prepare("SELECT resource_id FROM site_section_11_resources WHERE resource_src=?")){
		$stmt->bind_param('s', $file_src);
		$stmt->execute();
		$stmt->bind_result($resource_id);
		while ($stmt->fetch()) {
			$count++;
		}
		$stmt->close();
	}
	if($stmt = $conn->prepare("SELECT agent_id FROM site_section_12_agents WHERE image_src=?")){
		$stmt->bind_param('s', $file_src);
		$stmt->execute();
		$stmt->bind_result($agent_id);
		while ($stmt->fetch()) {
			$count++;
		}
		$stmt->close();
	}
		
	if($count === 0){
		
		if($sql = $conn->prepare("SELECT file_src FROM file_src WHERE file_id=?")){
			$sql->bind_param('i', $file_id);
			//execute query
			$sql->execute();
			$sql->bind_result($src);
			$sql->fetch();
			$src = URLToFilePath($src);
			unlink($src);
			$sql->close();
		}
		
		if($sql = $conn->prepare("SELECT file_preview_src FROM file_preview_src WHERE file_id=?")){
			$sql->bind_param('i', $file_id);
			//execute query
			$sql->execute();
			$sql->bind_result($src);
			$sql->fetch();
			$src = URLToFilePath($src);
			unlink($src);
			$sql->close();
		}


		if($sql = $conn->prepare("DELETE FROM file_name WHERE file_id=?")){
			$sql->bind_param('i', $file_id);
			//execute query
			$sql->execute();
			$sql->close();
		}
		if($sql = $conn->prepare("DELETE FROM file_src WHERE file_id=?")){
			$sql->bind_param('i', $file_id);
			//execute query
			$sql->execute();
			$sql->close();
		}
		if($sql = $conn->prepare("DELETE FROM file_preview_src WHERE file_id=?")){
			$sql->bind_param('i', $file_id);
			//execute query
			$sql->execute();
			$sql->close();
		}
		if($sql = $conn->prepare("DELETE FROM file_parent_id WHERE file_id=?")){
			$sql->bind_param('i', $file_id);
			//execute query
			$sql->execute();
			$sql->close();
		}
		if($sql = $conn->prepare("DELETE FROM file_type WHERE file_id=?")){
			$sql->bind_param('i', $file_id);
			//execute query
			$sql->execute();
			$sql->close();
		}
		if($sql = $conn->prepare("DELETE FROM file_delete_state WHERE file_id=?")){
			$sql->bind_param('i', $file_id);
			//execute query
			$sql->execute();
			$sql->close();
		}
	} else {
		//set delete flag active
		if($stmt = $conn->prepare("UPDATE file_delete_state SET state=1 WHERE file_id=?")){

			$stmt->bind_param('i', $file_id);

			$stmt->execute();

			$stmt->close();
		}
	}
}

function URLToFilePath($URL){
	if(strpos($URL, 'http://www.haganrealtyproperties.com') !== false){
		$URL = str_replace('http://www.haganrealtyproperties.com', $_SERVER['DOCUMENT_ROOT'], $URL);
	} else if(strpos($URL, 'https://www.haganrealtyproperties.com') !== false){
		$URL = str_replace('https://www.haganrealtyproperties.com', $_SERVER['DOCUMENT_ROOT'], $URL);
	} else if(strpos($URL, 'http://test.haganrealtyproperties.com') !== false){
		$URL = str_replace('http://test.haganrealtyproperties.com', $_SERVER['DOCUMENT_ROOT'], $URL);
		$URL = str_replace('HaganRealtyProperties.com','dev.haganrealtyproperties.com', $URL);
	} else if(strpos($URL, 'https://test.haganrealtyproperties.com') !== false){
		$URL = str_replace('https://test.haganrealtyproperties.com', $_SERVER['DOCUMENT_ROOT'], $URL);
		$URL = str_replace('HaganRealtyProperties.com','dev.haganrealtyproperties.com', $URL);
	}
	return $URL;
}
