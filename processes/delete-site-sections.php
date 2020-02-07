<?php

$delete_sections = [];
	
if($stmt = $conn->prepare("SELECT section_id,type FROM site_sections WHERE site_id=?")){

	$stmt->bind_param('i', $site_id);

	$stmt->execute();

	$stmt->bind_result($section_id, $type);

	//iterate through all sections
	while($stmt->fetch()){
		$tmp = new stdClass();
		$tmp->type = intval($type);
		$tmp->section_id = intval($section_id);
		array_push($delete_sections, $tmp);
	}

	$stmt->close();
}

//iterate through sections, deleting based on type
for($i = 0; $i < count($delete_sections); $i++){
	if($delete_sections[$i]->type === 0){
		if($stmt_01 = $conn->prepare("DELETE FROM site_section_00 WHERE section_id=?")){
			$stmt_01->bind_param('i', $delete_sections[$i]->section_id);

			$stmt_01->execute();
			$stmt_01->close();
		}
	} else if($delete_sections[$i]->type === 1){
		if($stmt_01 = $conn->prepare("DELETE FROM site_section_01 WHERE section_id=?")){
			$stmt_01->bind_param('i', $delete_sections[$i]->section_id);

			$stmt_01->execute();

			$stmt_01->close();
		}
	} else if($delete_sections[$i]->type === 2){
		if($stmt_01 = $conn->prepare("DELETE FROM site_section_02 WHERE section_id=?")){
			$stmt_01->bind_param('i', $delete_sections[$i]->section_id);

			$stmt_01->execute();

			$stmt_01->close();
		}
	} else if($delete_sections[$i]->type === 3){
		if($stmt_01 = $conn->prepare("DELETE FROM site_section_03 WHERE section_id=?")){
			$stmt_01->bind_param('i', $delete_sections[$i]->section_id);

			$stmt_01->execute();

			$stmt_01->close();
		}
	} else if($delete_sections[$i]->type === 4){

		$delete_image_arr = [];

		if($stmt_01 = $conn->prepare("SELECT tab_id FROM site_section_04_tabs WHERE section_id=?")){

			$stmt_01->bind_param('i', $delete_sections[$i]->section_id);

			$stmt_01->execute();

			$stmt_01->bind_result($tab_id);

			while($stmt_01->fetch()){
				array_push($delete_image_arr, $tab_id);
			}

			$stmt_01->close();
		}

		for($j = 0; $j < count($delete_image_arr); $j++){
			if($stmt_02 = $conn->prepare("DELETE FROM site_section_04_images WHERE tab_id=?")){
				$stmt_02->bind_param('i', $delete_image_arr[$j]);

				$stmt_02->execute();

				$stmt_02->close();
			}
		}

		if($stmt_01 = $conn->prepare("DELETE FROM site_section_04_tabs WHERE section_id=?")){
			$stmt_01->bind_param('i', $delete_sections[$i]->section_id);

			$stmt_01->execute();

			$stmt_01->close();
		}
	} else if($delete_sections[$i]->type === 5){
		if($stmt_01 = $conn->prepare("DELETE FROM site_section_05 WHERE section_id=?")){
			$stmt_01->bind_param('i', $delete_sections[$i]->section_id);

			$stmt_01->execute();

			$stmt_01->close();
		}
	} else if($delete_sections[$i]->type === 6){

		$delete_matterport_arr = [];

		if($stmt_01 = $conn->prepare("SELECT tab_id FROM site_section_06_tabs WHERE section_id=?")){

			$stmt_01->bind_param('i', $delete_sections[$i]->section_id);

			$stmt_01->execute();

			$stmt_01->bind_result($tab_id);

			while($stmt_01->fetch()){
				array_push($delete_matterport_arr, $tab_id);
			}

			$stmt_01->close();
		}

		for($j = 0; $j < count($delete_matterport_arr); $j++){
			if($stmt_02 = $conn->prepare("DELETE FROM site_section_06_matterport WHERE tab_id=?")){
				$stmt_02->bind_param('i', $delete_matterport_arr[$j]);

				$stmt_02->execute();

				$stmt_02->close();
			}
		}

		if($stmt_01 = $conn->prepare("DELETE FROM site_section_06_tabs WHERE section_id=?")){
			$stmt_01->bind_param('i', $delete_sections[$i]->section_id);

			$stmt_01->execute();

			$stmt_01->close();
		}
	} else if($delete_sections[$i]->type === 7){
		if($stmt_01 = $conn->prepare("DELETE FROM site_section_07_floorplans WHERE section_id=?")){
			$stmt_01->bind_param('i', $delete_sections[$i]->section_id);

			$stmt_01->execute();

			$stmt_01->close();
		}
	} else if($delete_sections[$i]->type === 8){

		$delete_map_arr = [];

		if($stmt_01 = $conn->prepare("SELECT tab_id FROM site_section_08_tabs WHERE section_id=?")){

			$stmt_01->bind_param('i', $delete_sections[$i]->section_id);

			$stmt_01->execute();

			$stmt_01->bind_result($tab_id);

			while($stmt_01->fetch()){
				array_push($delete_map_arr, $tab_id);
			}

			$stmt_01->close();
		}

		for($j = 0; $j < count($delete_map_arr); $j++){
			if($stmt_02 = $conn->prepare("DELETE FROM site_section_08_map WHERE tab_id=?")){
				$stmt_02->bind_param('i', $delete_map_arr[$j]);

				$stmt_02->execute();

				$stmt_02->close();
			}
		}
		
		for($j = 0; $j < count($delete_map_arr); $j++){
			if($stmt_02 = $conn->prepare("DELETE FROM site_section_08_walkscore WHERE tab_id=?")){
				$stmt_02->bind_param('i', $delete_map_arr[$j]);

				$stmt_02->execute();

				$stmt_02->close();
			}
		}

		if($stmt_01 = $conn->prepare("DELETE FROM site_section_08_tabs WHERE section_id=?")){
			$stmt_01->bind_param('i', $delete_sections[$i]->section_id);

			$stmt_01->execute();

			$stmt_01->close();
		}
	} else if($delete_sections[$i]->type === 9){
		if($stmt_01 = $conn->prepare("DELETE FROM site_section_09_emails WHERE section_id=?")){
			$stmt_01->bind_param('i', $delete_sections[$i]->section_id);

			$stmt_01->execute();

			$stmt_01->close();
		}
	} else if($delete_sections[$i]->type === 11){
		if($stmt_01 = $conn->prepare("DELETE FROM site_section_11_resources WHERE section_id=?")){
			$stmt_01->bind_param('i', $delete_sections[$i]->section_id);

			$stmt_01->execute();

			$stmt_01->close();
		}
	} else if($delete_sections[$i]->type === 12){
		if($stmt_01 = $conn->prepare("DELETE FROM site_section_12_agents WHERE section_id=?")){
			$stmt_01->bind_param('i', $delete_sections[$i]->section_id);

			$stmt_01->execute();

			$stmt_01->close();
		}
	}
}

if($stmt = $conn->prepare("DELETE FROM site_sections WHERE site_id=?")){
	$stmt->bind_param('i', $site_id);

	$stmt->execute();

	$stmt->close();
}
?>