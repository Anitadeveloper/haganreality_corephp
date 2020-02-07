<?php

session_start();
	
include 'db-conn.php';


$action = intval($_SERVER['HTTP_ACTION']);
$file_id = intval($_SERVER['HTTP_FILE_ID']);
$file_src = '';
$file_preview_src = '';

if($action === 0){
	
	//check if folder
	if($stmt = $conn->prepare("SELECT file_type FROM file_type WHERE file_id=?")){
		$stmt->bind_param('i', $file_id);

		$stmt->execute();
		$stmt->bind_result($type);
		$stmt->fetch();
		$file_type = $type;
		$stmt->close();
	}
	
	if($type !== 'folder'){
		//get src of file
		if($stmt = $conn->prepare("SELECT file_src FROM file_src WHERE file_id=?")){
			$stmt->bind_param('i', $file_id);

			$stmt->execute();
			$stmt->bind_result($src);
			$stmt->fetch();
			$file_src = $src;

			$stmt->close();
		}

		//check section 0, 3, 4, 7, 11, and 12 for instances of the file
		$sections_using = [];
		$tabs_using_04 = [];

		if($stmt = $conn->prepare("SELECT section_id FROM site_section_00 WHERE image_src=?")){
			$stmt->bind_param('s', $file_src);
			$stmt->execute();
			$stmt->bind_result($section_id);
			while ($stmt->fetch()) {
				array_push($sections_using, $section_id);
			}
			$stmt->close();
		}
		if($stmt = $conn->prepare("SELECT section_id FROM site_section_03 WHERE image_src=?")){
			$stmt->bind_param('s', $file_src);
			$stmt->execute();
			$stmt->bind_result($section_id);
			while ($stmt->fetch()) {
				array_push($sections_using, $section_id);
			}
			$stmt->close();
		}
		if($stmt = $conn->prepare("SELECT tab_id FROM site_section_04_images WHERE image_src=?")){
			$stmt->bind_param('s', $file_src);
			$stmt->execute();
			$stmt->bind_result($tab_id);
			while ($stmt->fetch()) {
				array_push($tabs_using_04, $tab_id);
			}
			$stmt->close();
		}
		if($stmt = $conn->prepare("SELECT section_id FROM site_section_07_floorplans WHERE image_src=?")){
			$stmt->bind_param('s', $file_src);
			$stmt->execute();
			$stmt->bind_result($section_id);
			while ($stmt->fetch()) {
				array_push($sections_using, $section_id);
			}
			$stmt->close();
		}
		if($stmt = $conn->prepare("SELECT section_id FROM site_section_11_resources WHERE resource_src=?")){
			$stmt->bind_param('s', $file_src);
			$stmt->execute();
			$stmt->bind_result($section_id);
			while ($stmt->fetch()) {
				array_push($sections_using, $section_id);
			}
			$stmt->close();
		}
		if($stmt = $conn->prepare("SELECT section_id FROM site_section_12_agents WHERE image_src=?")){
			$stmt->bind_param('s', $file_src);
			$stmt->execute();
			$stmt->bind_result($section_id);
			while ($stmt->fetch()) {
				array_push($sections_using, $section_id);
			}
			$stmt->close();
		}

		$count = count($sections_using) + count($tabs_using_04);

		//if count is 0 then delete
		if($count === 0){

			if($stmt = $conn->prepare("SELECT file_src FROM file_src WHERE file_id=?")){
				$stmt->bind_param('i', $file_id);
				//execute query
				$stmt->execute();
				$stmt->bind_result($src);
				$stmt->fetch();
				$unlink_src = URLToFilePath($src);
				unlink($unlink_src);
				$stmt->close();
			}

			if($stmt = $conn->prepare("SELECT file_preview_src FROM file_preview_src WHERE file_id=?")){
				$stmt->bind_param('i', $file_id);
				//execute query
				$stmt->execute();
				$stmt->bind_result($src);
				$stmt->fetch();
				$unlink_src = URLToFilePath($src);
				unlink($unlink_src);
				$stmt->close();
			}

			if($stmt = $conn->prepare("DELETE FROM file_name WHERE file_id=?")){
				$stmt->bind_param('i', $file_id);
				//execute query
				$stmt->execute();
				$stmt->close();
			}
			if($stmt = $conn->prepare("DELETE FROM file_src WHERE file_id=?")){
				$stmt->bind_param('i', $file_id);
				//execute query
				$stmt->execute();
				$stmt->close();
			}
			if($stmt = $conn->prepare("DELETE FROM file_preview_src WHERE file_id=?")){
				$stmt->bind_param('i', $file_id);
				//execute query
				$stmt->execute();
				$stmt->close();
			}
			if($stmt = $conn->prepare("DELETE FROM file_parent_id WHERE file_id=?")){
				$stmt->bind_param('i', $file_id);
				//execute query
				$stmt->execute();
				$stmt->close();
			}
			if($stmt = $conn->prepare("DELETE FROM file_type WHERE file_id=?")){
				$stmt->bind_param('i', $file_id);
				//execute query
				$stmt->execute();
				$stmt->close();
			}
			if($stmt = $conn->prepare("DELETE FROM file_delete_state WHERE file_id=?")){
				$stmt->bind_param('i', $file_id);
				//execute query
				$stmt->execute();
				$stmt->close();
			}
		} else {
			//set delete flag active
			if($stmt = $conn->prepare("UPDATE file_delete_state SET state=1 WHERE file_id=?")){

				$stmt->bind_param('i', $file_id);

				$stmt->execute();

				$stmt->close();
			}

			//get all section id's and echo them
			for($i = 0; $i < count($tabs_using_04); $i++){
				if($stmt = $conn->prepare("SELECT section_id FROM site_section_04_tabs WHERE tab_id=?")){
					$stmt->bind_param('i', $tabs_using_04[$i]);
					$stmt->execute();
					$stmt->bind_result($section_id);
					$stmt->fetch();
					array_push($sections_using, $section_id);
					$stmt->close();
				}
			}

			$sites_using = [];

			for($i = 0; $i < count($sections_using); $i++){
				if($stmt = $conn->prepare("SELECT site_id FROM site_sections WHERE section_id=?")){
					$stmt->bind_param('i', $sections_using[$i]);
					$stmt->execute();
					$stmt->bind_result($site_id);
					$stmt->fetch();
					array_push($sites_using, $site_id);
					$stmt->close();
				}
			}

			$site_names_using = [];

			for($i = 0; $i < count($sites_using); $i++){
				if($stmt = $conn->prepare("SELECT name FROM site_preview_data WHERE id=?")){
					$stmt->bind_param('i', $sites_using[$i]);
					$stmt->execute();
					$stmt->bind_result($name);
					$stmt->fetch();
					array_push($site_names_using, $name);
					$stmt->close();
				}
			}

			echo json_encode($site_names_using);

		}
	} else {
		//if a folder
		
		//check if there are any files inside
		$child_count = 0;
		
		if($stmt = $conn->prepare("SELECT * FROM file_parent_id WHERE parent_id=?")){
			$stmt->bind_param('i', $file_id);
			$stmt->execute();
			$stmt->store_result();
			$child_count = $stmt->num_rows;
			$stmt->close();
		}
		
		if($child_count === 0){
			if($stmt = $conn->prepare("DELETE FROM file_name WHERE file_id=?")){
				$stmt->bind_param('i', $file_id);
				//execute query
				$stmt->execute();
				$stmt->close();
			}
			if($stmt = $conn->prepare("DELETE FROM file_src WHERE file_id=?")){
				$stmt->bind_param('i', $file_id);
				//execute query
				$stmt->execute();
				$stmt->close();
			}
			if($stmt = $conn->prepare("DELETE FROM file_preview_src WHERE file_id=?")){
				$stmt->bind_param('i', $file_id);
				//execute query
				$stmt->execute();
				$stmt->close();
			}
			if($stmt = $conn->prepare("DELETE FROM file_parent_id WHERE file_id=?")){
				$stmt->bind_param('i', $file_id);
				//execute query
				$stmt->execute();
				$stmt->close();
			}
			if($stmt = $conn->prepare("DELETE FROM file_type WHERE file_id=?")){
				$stmt->bind_param('i', $file_id);
				//execute query
				$stmt->execute();
				$stmt->close();
			}
			if($stmt = $conn->prepare("DELETE FROM file_delete_state WHERE file_id=?")){
				$stmt->bind_param('i', $file_id);
				//execute query
				$stmt->execute();
				$stmt->close();
			}
		}
	}

	
} else if($action === 1){
	$file_name = mysqli_real_escape_string($conn, $_SERVER['HTTP_FILE_NAME']);
	if($stmt = $conn->prepare("UPDATE file_name SET file_name=? WHERE file_id=?")){
		$stmt->bind_param('si', $file_name, $file_id);
		//execute query
		$stmt->execute();
		$stmt->close();
	}
} else if($action === 2){
	$new_position = 0;
	$parent_id = mysqli_real_escape_string($conn, $_SERVER['HTTP_PARENT_ID']);
	if($stmt = $conn->prepare("UPDATE file_parent_id SET parent_id=?, position=? WHERE file_id=?")){
		$stmt->bind_param('iii', $parent_id, $new_position, $file_id);
		//execute query
		$stmt->execute();
		$stmt->close();
	}
	
	//get the highest position in this folder
	if($stmt = $conn->prepare("SELECT position FROM file_parent_id WHERE parent_id=? ORDER BY position DESC LIMIT 1")){
		$stmt->bind_param('i', $parent_id);
		//execute query
		$stmt->execute();
		$stmt->bind_result($position);
		$stmt->fetch();
		$new_position = $position + 1;
		$stmt->close();
	}
	
	if($stmt = $conn->prepare("UPDATE file_parent_id SET position=? WHERE file_id=?")){
		$stmt->bind_param('ii', $new_position, $file_id);
		//execute query
		$stmt->execute();
		$stmt->close();
	}
	
	echo $parent_id;
} else if($action === 3){
	if($stmt = $conn->prepare("UPDATE file_delete_state SET state=0 WHERE file_id=?")){
		$stmt->bind_param('i', $file_id);
		//execute query
		$stmt->execute();
		$stmt->close();
	}
	
	exit();
} else if($action === 4){
	
	//echo section 0, 3, 4, 7, 11, and 12 for instances of the file
	$sections_using = [];
	$tabs_using_04 = [];

	if($stmt = $conn->prepare("SELECT section_id FROM site_section_00 WHERE image_src=?")){
		$stmt->bind_param('s', $file_src);
		$stmt->execute();
		$stmt->bind_result($section_id);
		while ($stmt->fetch()) {
			array_push($sections_using, $section_id);
		}
		$stmt->close();
	}
	if($stmt = $conn->prepare("SELECT section_id FROM site_section_03 WHERE image_src=?")){
		$stmt->bind_param('s', $file_src);
		$stmt->execute();
		$stmt->bind_result($section_id);
		while ($stmt->fetch()) {
			array_push($sections_using, $section_id);
		}
		$stmt->close();
	}
	if($stmt = $conn->prepare("SELECT tab_id FROM site_section_04_images WHERE image_src=?")){
		$stmt->bind_param('s', $file_src);
		$stmt->execute();
		$stmt->bind_result($tab_id);
		while ($stmt->fetch()) {
			array_push($tabs_using_04, $tab_id);
		}
		$stmt->close();
	}
	if($stmt = $conn->prepare("SELECT section_id FROM site_section_07_floorplans WHERE image_src=?")){
		$stmt->bind_param('s', $file_src);
		$stmt->execute();
		$stmt->bind_result($section_id);
		while ($stmt->fetch()) {
			array_push($sections_using, $section_id);
		}
		$stmt->close();
	}
	if($stmt = $conn->prepare("SELECT section_id FROM site_section_11_resources WHERE resource_src=?")){
		$stmt->bind_param('s', $file_src);
		$stmt->execute();
		$stmt->bind_result($section_id);
		while ($stmt->fetch()) {
			array_push($sections_using, $section_id);
		}
		$stmt->close();
	}
	if($stmt = $conn->prepare("SELECT section_id FROM site_section_12_agents WHERE image_src=?")){
		$stmt->bind_param('s', $file_src);
		$stmt->execute();
		$stmt->bind_result($section_id);
		while ($stmt->fetch()) {
			array_push($sections_using, $section_id);
		}
		$stmt->close();
	}
	
	//get all section id's and echo them
	for($i = 0; $i < count($tabs_using_04); $i++){
		if($stmt = $conn->prepare("SELECT section_id FROM site_section_04_tabs WHERE tab_id=?")){
			$stmt->bind_param('i', $tabs_using_04[$i]);
			$stmt->execute();
			$stmt->bind_result($section_id);
			$stmt->fetch();
			array_push($sections_using, $section_id);
			$stmt->close();
		}
	}

	$sites_using = [];

	for($i = 0; $i < count($sections_using); $i++){
		if($stmt = $conn->prepare("SELECT site_id FROM site_sections WHERE section_id=?")){
			$stmt->bind_param('i', $sections_using[$i]);
			$stmt->execute();
			$stmt->bind_result($site_id);
			$stmt->fetch();
			array_push($sites_using, $site_id);
			$stmt->close();
		}
	}

	$site_names_using = [];

	for($i = 0; $i < count($sites_using); $i++){
		if($stmt = $conn->prepare("SELECT name FROM site_preview_data WHERE id=?")){
			$stmt->bind_param('i', $sites_using[$i]);
			$stmt->execute();
			$stmt->bind_result($name);
			$stmt->fetch();
			array_push($site_names_using, $name);
			$stmt->close();
		}
	}

	echo json_encode($site_names_using);
	
	//get src of file
	if($stmt = $conn->prepare("SELECT file_src FROM file_src WHERE file_id=?")){
		$stmt->bind_param('i', $file_id);
		//execute query
		$stmt->execute();
		$stmt->bind_result($src);
		$stmt->fetch();
		$file_src = $src;
		$unlink_src = URLToFilePath($src);
		unlink($unlink_src);
		$stmt->close();
	}
	
	if($stmt = $conn->prepare("SELECT file_preview_src FROM file_preview_src WHERE file_id=?")){
		$stmt->bind_param('i', $file_id);
		//execute query
		$stmt->execute();
		$stmt->bind_result($src);
		$stmt->fetch();
		$unlink_src = URLToFilePath($src);
		unlink($src);
		$stmt->close();
	}

	if($stmt = $conn->prepare("DELETE FROM file_name WHERE file_id=?")){
		$stmt->bind_param('i', $file_id);
		//execute query
		$stmt->execute();
		$stmt->close();
	}
	if($stmt = $conn->prepare("DELETE FROM file_src WHERE file_id=?")){
		$stmt->bind_param('i', $file_id);
		//execute query
		$stmt->execute();
		$stmt->close();
	}
	if($stmt = $conn->prepare("DELETE FROM file_preview_src WHERE file_id=?")){
		$stmt->bind_param('i', $file_id);
		//execute query
		$stmt->execute();
		$stmt->close();
	}
	if($stmt = $conn->prepare("DELETE FROM file_parent_id WHERE file_id=?")){
		$stmt->bind_param('i', $file_id);
		//execute query
		$stmt->execute();
		$stmt->close();
	}
	if($stmt = $conn->prepare("DELETE FROM file_type WHERE file_id=?")){
		$stmt->bind_param('i', $file_id);
		//execute query
		$stmt->execute();
		$stmt->close();
	}
	if($stmt = $conn->prepare("DELETE FROM file_delete_state WHERE file_id=?")){
		$stmt->bind_param('i', $file_id);
		//execute query
		$stmt->execute();
		$stmt->close();
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