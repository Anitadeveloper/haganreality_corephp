<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: site-id,add-view");
header("Access-Control-Allow-Methods: POST, GET");  

include 'db-conn.php';


$site_id = intval($_SERVER['HTTP_SITE_ID']);
//$site_id = 28;
$add_view = 0;
if(isset($_SERVER['HTTP_ADD_VIEW'])){
	$add_view = intval($_SERVER['HTTP_ADD_VIEW']);
}
$preview_request = 0;
if(isset($_SERVER['HTTP_PREVIEW_REQUEST'])){
	$preview_request = intval($_SERVER['HTTP_PREVIEW_REQUEST']);
}

if($site_id === -1){
	echo 'No Site ID selected';
	exit();
}

if($add_view === 1){
	if($stmt = $conn->prepare("UPDATE site_basic_metrics SET views = views + 1 WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		$stmt->execute();
		$stmt->close();
	}
}


$arr = [];

if($stmt = $conn->prepare("SELECT section_id,type FROM site_sections WHERE site_id=? ORDER BY position ASC")){
	$stmt->bind_param('i', $site_id);
	//execute query
	$stmt->execute();
	//store result
	$stmt->bind_result($section_id, $type);
	//create array of results
	while ($stmt->fetch()) {
    	$tmp = new stdClass();
		$tmp->section_id = $section_id;
		$tmp->type = $type;
		array_push($arr, $tmp);
    }
	$stmt->close();
}

for($i = 0; $i < count($arr); $i++){
	
	$section_id = $arr[$i]->section_id;
	$type = intval($arr[$i]->type);
	
	if($type === 0){
		if($stmt = $conn->prepare("SELECT image_src FROM site_section_00 WHERE section_id=? LIMIT 1")){
			$stmt->bind_param('i', $section_id);
			$stmt->execute();
			$stmt->bind_result($image_src_00);
			//get new array
			$stmt->fetch();
			$arr[$i]->image_src = $image_src_00;
			$stmt->close();
			if($preview_request === 1){
				$file_id = -1;
				$test_domain = false;
				$src = $arr[$i]->image_src;
				if($stmt = $conn->prepare("SELECT file_id FROM file_src WHERE file_src=?")){
					$stmt->bind_param('s', $src);
					//execute query
					$stmt->execute();
					//store result
					$stmt->bind_result($id);
					$stmt->fetch();
					$file_id = $id;
					$stmt->close();
				}
				if($stmt = $conn->prepare("SELECT file_preview_src FROM file_preview_src WHERE file_id=?")){
					$stmt->bind_param('i', $file_id);
					//execute query
					$stmt->execute();
					//store result
					$stmt->bind_result($preview_src);
					$stmt->fetch();
					$arr[$i]->image_src = $preview_src;
					$stmt->close();
				}
			}
		}
	} else if($arr[$i]->type === 1){
		if($stmt = $conn->prepare("SELECT address,city,price,description FROM site_section_01 WHERE section_id=? LIMIT 1")){
			$stmt->bind_param('i', $section_id);
			$stmt->execute();
			$stmt->bind_result($address_01, $city_01, $price_01, $description_01);
			//get new array
			$stmt->fetch();
			$arr[$i]->address = $address_01;
			$arr[$i]->city = $city_01;
			$arr[$i]->price = $price_01;
			$arr[$i]->description = $description_01;

			$stmt->close();
		}
	} else if($arr[$i]->type === 2){
		if($stmt = $conn->prepare("SELECT bedrooms,fireplaces,bathrooms,year_built,tax,assn_fees,house_size,lot_size,parking_spaces,levels FROM site_section_02 WHERE section_id=? LIMIT 1")){
			$stmt->bind_param('i', $section_id);
			$stmt->execute();
			$stmt->bind_result($bedrooms_02,$fireplaces_02,$bathrooms_02,$year_built_02,$tax_02,$assn_fees_02,$house_size_02,$lot_size_02,$parking_spaces_02,$levels_02);
			//get new array
			$stmt->fetch();
			$arr[$i]->bedrooms = $bedrooms_02;
			$arr[$i]->fireplaces = $fireplaces_02;
			$arr[$i]->bathrooms = $bathrooms_02;
			$arr[$i]->year_built = $year_built_02;
			$arr[$i]->tax = $tax_02;
			$arr[$i]->assn_fees = $assn_fees_02;
			$arr[$i]->house_size = $house_size_02;
			$arr[$i]->lot_size = $lot_size_02;
			$arr[$i]->parking_spaces = $parking_spaces_02;
			$arr[$i]->levels = $levels_02;

			$stmt->close();
		}
	} else if($arr[$i]->type === 3){
		if($stmt = $conn->prepare("SELECT image_src FROM site_section_03 WHERE section_id=? LIMIT 1")){
			$stmt->bind_param('i', $section_id);
			$stmt->execute();
			$stmt->bind_result($image_src_03);
			//get new array
			$stmt->fetch();
			$arr[$i]->image_src = $image_src_03;

			$stmt->close();
			if($preview_request === 1){
				$file_id = -1;
				$test_domain = false;
				$src = $arr[$i]->image_src;
				if($stmt = $conn->prepare("SELECT file_id FROM file_src WHERE file_src=?")){
					$stmt->bind_param('s', $src);
					//execute query
					$stmt->execute();
					//store result
					$stmt->bind_result($id);
					$stmt->fetch();
					$file_id = $id;
					$stmt->close();
				}
				if($stmt = $conn->prepare("SELECT file_preview_src FROM file_preview_src WHERE file_id=?")){
					$stmt->bind_param('i', $file_id);
					//execute query
					$stmt->execute();
					//store result
					$stmt->bind_result($src);
					$stmt->fetch();
					$arr[$i]->image_src = $src;
					$stmt->close();
				}
			}
		}
	} else if($arr[$i]->type === 4){
		//tabs
		$arr[$i]->tabs = array();
			
		if($stmt = $conn->prepare("SELECT tab_id,tab_name FROM site_section_04_tabs WHERE section_id=? ORDER BY position ASC")){
			$stmt->bind_param('i', $section_id);
			//execute query
			$stmt->execute();
			//store result
			$stmt->bind_result($tab_id, $tab_name);
			//create array of results
			while ($stmt->fetch()) {
				$tmp = new stdClass();
				$tmp->tab_id = $tab_id;
				$tmp->tab_name = $tab_name;
				array_push($arr[$i]->tabs, $tmp);
			}
			$stmt->close();
		}
		
		for($i_04 = 0; $i_04 < count($arr[$i]->tabs); $i_04++){
			//images
			$arr[$i]->tabs[$i_04]->images = array();
			
			$tab_id_04 = $arr[$i]->tabs[$i_04]->tab_id;
			
			if($stmt = $conn->prepare("SELECT image_src,image_title,image_description FROM site_section_04_images WHERE tab_id=? ORDER BY position ASC")){
				$stmt->bind_param('i', $tab_id_04);
				//execute query
				$stmt->execute();
				//store result
				$stmt->bind_result($image_src, $image_title, $image_description);
				//create array of results
				while ($stmt->fetch()) {
					$tmp = new stdClass();
					$file_id = -1;
					$tmp->image_src = $image_src;
					$tmp->image_title = $image_title;
					$tmp->image_description = $image_description;
					array_push($arr[$i]->tabs[$i_04]->images, $tmp);
				}
				$stmt->close();
				if($preview_request === 1){
					for($y = 0; $y < 2 && $y < count($arr[$i]->tabs[$i_04]->images); $y++){
						$file_id = -1;
						$test_domain = false;
						$src = $arr[$i]->tabs[$i_04]->images[$y]->image_src;
						if($stmt = $conn->prepare("SELECT file_id FROM file_src WHERE file_src=?")){
							$stmt->bind_param('s', $src);
							//execute query
							$stmt->execute();
							//store result
							$stmt->bind_result($id);
							$stmt->fetch();
							$file_id = $id;
							$stmt->close();
						}
						if($stmt = $conn->prepare("SELECT file_preview_src FROM file_preview_src WHERE file_id=?")){
							$stmt->bind_param('i', $file_id);
							//execute query
							$stmt->execute();
							//store result
							$stmt->bind_result($src);
							$stmt->fetch();
								$arr[$i]->tabs[$i_04]->images[$y]->image_src = $src;
							$stmt->close();
						}
					}
				}
			}
		}
	} else if($arr[$i]->type === 5){
		if($stmt = $conn->prepare("SELECT embed_code FROM site_section_05 WHERE section_id=? LIMIT 1")){
			$stmt->bind_param('i', $section_id);
			$stmt->execute();
			$stmt->bind_result($embed_code_05);
			//get new array
			$stmt->fetch();
			$arr[$i]->embed_code = $embed_code_05;

			$stmt->close();
		}
	} else if($arr[$i]->type === 6){
		//tabs
		$arr[$i]->tabs = array();
			
		if($stmt = $conn->prepare("SELECT tab_id,tab_name FROM site_section_06_tabs WHERE section_id=? ORDER BY position ASC")){
			$stmt->bind_param('i', $section_id);
			//execute query
			$stmt->execute();
			//store result
			$stmt->bind_result($tab_id, $tab_name);
			//create array of results
			while ($stmt->fetch()) {
				$tmp = new stdClass();
				$tmp->tab_id = $tab_id;
				$tmp->tab_name = $tab_name;
				array_push($arr[$i]->tabs, $tmp);
			}
			$stmt->close();
		}
		
		for($i_06 = 0; $i_06 < count($arr[$i]->tabs); $i_06++){
			
			$tab_id_06 = $arr[$i]->tabs[$i_06]->tab_id;
			
			if($stmt = $conn->prepare("SELECT embed_code FROM site_section_06_matterport WHERE tab_id=? LIMIT 1")){
				$stmt->bind_param('i', $tab_id_06);
				$stmt->execute();
				$stmt->bind_result($embed_code_06);
				//get new array
				$stmt->fetch();
				$arr[$i]->tabs[$i_06]->embed_code = $embed_code_06;

				$stmt->close();
			}
		}
	} else if($arr[$i]->type === 7){
		
		$arr[$i]->floorplans = array();
		
		if($stmt = $conn->prepare("SELECT image_src, image_title FROM site_section_07_floorplans WHERE section_id=? ORDER BY position ASC")){
			$stmt->bind_param('i', $section_id);
			//execute query
			$stmt->execute();
			//store result
			$stmt->bind_result($image_src, $image_title);
			//create array of results
			while ($stmt->fetch()) {
				$tmp = new stdClass();
				$tmp->image_src = $image_src;
				$tmp->image_title = $image_title;
				array_push($arr[$i]->floorplans, $tmp);
			}
			$stmt->close();
		}
	} else if($arr[$i]->type === 8){
		//tabs
		$arr[$i]->tabs = array();
			
		if($stmt = $conn->prepare("SELECT tab_id,tab_name FROM site_section_08_tabs WHERE section_id=? ORDER BY position ASC")){
			$stmt->bind_param('i', $section_id);
			//execute query
			$stmt->execute();
			//store result
			$stmt->bind_result($tab_id, $tab_name);
			//create array of results
			while ($stmt->fetch()) {
				$tmp = new stdClass();
				$tmp->tab_id = $tab_id;
				$tmp->tab_name = $tab_name;
				array_push($arr[$i]->tabs, $tmp);
			}
			$stmt->close();
		}
		
		for($i_08 = 0; $i_08 < count($arr[$i]->tabs); $i_08++){
			
			$tab_id_08 = $arr[$i]->tabs[$i_08]->tab_id;
			
			if($stmt = $conn->prepare("SELECT address,lat,lng,zoom,pin_label FROM site_section_08_map WHERE tab_id=?")){
				$stmt->bind_param('i', $tab_id_08);
				$stmt->execute();
				$stmt->bind_result($address, $lat, $lng, $zoom, $pin_label);
				//get new array
				$stmt->fetch();
				$arr[$i]->tabs[$i_08]->address = $address;
				$arr[$i]->tabs[$i_08]->lat = $lat;
				$arr[$i]->tabs[$i_08]->lng = $lng;
				$arr[$i]->tabs[$i_08]->zoom = $zoom;
				$arr[$i]->tabs[$i_08]->pin_label = $pin_label;
				
				$stmt->close();
			}
			
			if($stmt = $conn->prepare("SELECT embed_code FROM site_section_08_walkscore WHERE tab_id=?")){
				$stmt->bind_param('i', $tab_id_08);
				$stmt->execute();
				$stmt->bind_result($embed_code_08);
				//get new array
				$stmt->fetch();
				$arr[$i]->tabs[$i_08]->walkscore_embed_code = $embed_code_08;
				
				$stmt->close();
			}
		}
	} else if($arr[$i]->type === 9){
		
		$arr[$i]->emails = array();
		
		if($stmt = $conn->prepare("SELECT email FROM site_section_09_emails WHERE section_id=?")){
			$stmt->bind_param('i', $section_id);
			//execute query
			$stmt->execute();
			//store result
			$stmt->bind_result($email);
			//create array of results
			while ($stmt->fetch()) {
				array_push($arr[$i]->emails, $email);
			}
			$stmt->close();
		}
	} else if($arr[$i]->type === 11){
		
		$arr[$i]->resources = array();
		
		if($stmt = $conn->prepare("SELECT resource_src, resource_title, resource_description FROM site_section_11_resources WHERE section_id=? ORDER BY position ASC")){
			$stmt->bind_param('i', $section_id);
			//execute query
			$stmt->execute();
			//store result
			$stmt->bind_result($resource_src, $resource_title, $resource_description);
			//create array of results
			while ($stmt->fetch()) {
				$tmp = new stdClass();
				$tmp->resource_src = $resource_src;
				$tmp->resource_title = $resource_title;
				$tmp->resource_description = $resource_description;
				array_push($arr[$i]->resources, $tmp);
			}
			$stmt->close();
		}
	} else if($arr[$i]->type === 12){

		$arr[$i]->agents = array();

		if($stmt = $conn->prepare("SELECT site_section_agent_id FROM site_section_12_agents WHERE section_id=?")){

		//if($stmt = $conn->prepare("SELECT name, occupation, description, mobile_number, office_number, facebook_link, website_link, email_link, image_src, site_section_agent_id FROM site_section_12_agents WHERE section_id=?")){
			$stmt->bind_param('i', $section_id);
			//execute query
			$stmt->execute();
			//store result
			$stmt->bind_result($site_section_agent_id);

		//	$stmt->bind_result($name, $occupation, $description, $mobile_number, $office_number, $facebook_link, $website_link, $email_link, $image_src,$site_section_agent_id);
			//create array of results
			while ($stmt->fetch()) {
				$tmp = new stdClass();
				// $tmp->name = $name;
				// $tmp->occupation = $occupation;
				// $tmp->description = $description;
				// $tmp->mobile_number = $mobile_number;
				// $tmp->office_number = $office_number;
				// $tmp->facebook_link = $facebook_link;
				// $tmp->website_link = $website_link;
				// $tmp->email_link = $email_link;
				// $tmp->image_src = $image_src;
				$tmp->site_section_agent_id = $site_section_agent_id;
				array_push($arr[$i]->agents, $tmp);
			}
			$stmt->close();
		}
	}
}

echo json_encode($arr);
exit();
