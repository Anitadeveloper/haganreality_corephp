<?php

header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: POST, GET");      

include 'db-conn.php';

$raw_JSON = file_get_contents('php://input');
$input = json_decode($raw_JSON);

$site_id = intval($_SERVER['HTTP_SITE_ID']);
//$site_id =28;
//remove any previous site sections
include($_SERVER['DOCUMENT_ROOT'].'/processes/delete-site-sections.php');

for($i = 0; $i < count($input); $i++){
			
	$section_id = 0;
	
	if($stmt = $conn->prepare("SELECT section_id FROM site_sections ORDER BY section_id DESC LIMIT 1")){
		$stmt->execute();

		$stmt->bind_result($id);
		//get new array
		$stmt->fetch();
		$section_id = $id + 1;

		$stmt->close();
	}
	
	$type = $input[$i]->type;
	
	
	if($stmt = $conn->prepare("INSERT INTO site_sections VALUES (?,?,?,?)")){
		$stmt->bind_param('iiii', $site_id, $section_id, $i, $type);
		$stmt->execute();
		$stmt->close();
		

	}
	
	if($type === 0){
		
		$image_src_00 = $input[$i]->image_src;
		
		if($stmt = $conn->prepare("INSERT INTO site_section_00 VALUES (?,?)")){
			$stmt->bind_param('is', $section_id, $image_src_00);
			$stmt->execute();
			$stmt->close();
		}
	}
	
	if($type === 1){
		
		$address_01 = $input[$i]->address;
		$city_01 = $input[$i]->city;
		$price_01 = $input[$i]->price;
		$description_01 = $input[$i]->description;
		
		if($stmt = $conn->prepare("INSERT INTO site_section_01 VALUES (?,?,?,?,?)")){
			$stmt->bind_param('issss', $section_id, $address_01, $city_01, $price_01, $description_01);
			$stmt->execute();
			$stmt->close();
		}
	}
	
	if($type === 2){
		
		$bedrooms_02 = $input[$i]->icon_vals[0];
		$fireplaces_02 = $input[$i]->icon_vals[1];
		$bathrooms_02 = $input[$i]->icon_vals[2];
		$year_built_02 = $input[$i]->icon_vals[3];
		$tax_02 = $input[$i]->icon_vals[4];
		$assn_fees_02 = $input[$i]->icon_vals[5];
		$house_size_02 = $input[$i]->icon_vals[6];
		$lot_size_02 = $input[$i]->icon_vals[7];
		$parking_spaces_02 = $input[$i]->icon_vals[8];
		$levels_02 = $input[$i]->icon_vals[9];
		
		
		if($stmt = $conn->prepare("INSERT INTO site_section_02 VALUES (?,?,?,?,?,?,?,?,?,?,?)")){
			$stmt->bind_param('issssssssss', $section_id, $bedrooms_02, $fireplaces_02, $bathrooms_02, $year_built_02, $tax_02, $assn_fees_02, $house_size_02, $lot_size_02, $parking_spaces_02, $levels_02);
			$stmt->execute();
			$stmt->close();
		}
	}
	
	if($type === 3){
		
		$image_src_03 = $input[$i]->image_src;
		
		if($stmt = $conn->prepare("INSERT INTO site_section_03 VALUES (?,?)")){
			$stmt->bind_param('is', $section_id, $image_src_03);
			$stmt->execute();
			$stmt->close();
		}
	}
	
	if($type === 4){
		
		for($i_04 = 0; $i_04 < count($input[$i]->tabs); $i_04++){
			
			$tab_name_04 = $input[$i]->tabs[$i_04]->tab_name;
			
			$tab_id_04 = 0;
			
			if($stmt = $conn->prepare("SELECT tab_id FROM site_section_04_tabs ORDER BY tab_id DESC LIMIT 1")){
				$stmt->execute();

				$stmt->bind_result($tab_id);
				//get new array
				$stmt->fetch();
				$tab_id_04 = $tab_id + 1;

				$stmt->close();
			}
			
			if($stmt = $conn->prepare("INSERT INTO site_section_04_tabs VALUES (?,?,?,?)")){
				$stmt->bind_param('iiis', $section_id, $tab_id_04, $i_04, $tab_name_04);
				$stmt->execute();
				$stmt->close();
			}
			
			$image_id_04 = 0;
			
			if($stmt = $conn->prepare("SELECT image_id FROM site_section_04_images ORDER BY image_id DESC LIMIT 1")){
				$stmt->execute();

				$stmt->bind_result($image_id);
				//get new array
				$stmt->fetch();
				$image_id_04 = $image_id + 1;

				$stmt->close();
			}

			for($j_04 = 0; $j_04 < count($input[$i]->tabs[$i_04]->images); $j_04++){
				//set preview data
				$image_src_04 = $input[$i]->tabs[$i_04]->images[$j_04]->image_src;
				$title_04 = $input[$i]->tabs[$i_04]->images[$j_04]->title;
				$description_04 = $input[$i]->tabs[$i_04]->images[$j_04]->description;
				
				if($stmt = $conn->prepare("INSERT INTO site_section_04_images VALUES (?,?,?,?,?,?)")){
					$stmt->bind_param('iiisss', $tab_id_04, $image_id_04, $j_04, $image_src_04, $title_04, $description_04);
					$stmt->execute();
					$image_id_04++;
					$stmt->close();
				}
			}
		}
	}
	
	if($type === 5){
		
		$video_embed_05 = $input[$i]->video_embed;
		
		if($stmt = $conn->prepare("INSERT INTO site_section_05 VALUES (?,?)")){
			$stmt->bind_param('is', $section_id, $video_embed_05);
			$stmt->execute();
			$stmt->close();
		}
	}
	
	if($type === 6){
		
		for($i_06 = 0; $i_06 < count($input[$i]->tabs); $i_06++){
			
			$tab_name_06 = $input[$i]->tabs[$i_06]->tab_name;
			
			$tab_id_06 = 0;
			
			if($stmt = $conn->prepare("SELECT tab_id FROM site_section_06_tabs ORDER BY tab_id DESC LIMIT 1")){
				$stmt->execute();

				$stmt->bind_result($tab_id);
				//get new array
				$stmt->fetch();
				$tab_id_06 = $tab_id + 1;

				$stmt->close();
			}
			
			if($stmt = $conn->prepare("INSERT INTO site_section_06_tabs VALUES (?,?,?,?)")){
				$stmt->bind_param('iiis', $section_id, $tab_id_06, $i_06, $tab_name_06);
				$stmt->execute();
				$stmt->close();
			}
			
			$embed_code = $input[$i]->tabs[$i_06]->embed_code;
			
			if($stmt = $conn->prepare("INSERT INTO site_section_06_matterport VALUES (?,?)")){
				$stmt->bind_param('is', $tab_id_06, $embed_code);
				$stmt->execute();
				$stmt->close();
			}
		}
	}
	
	if($type === 7){
		
		$image_id_07_min = 0;
			
		if($stmt = $conn->prepare("SELECT image_id FROM site_section_07_floorplans ORDER BY image_id DESC LIMIT 1")){
			$stmt->execute();

			$stmt->bind_result($image_id);
			//get new array
			$stmt->fetch();
			$image_id_07_min = $image_id + 1;

			$stmt->close();
		}
		
		for($i_07 = 0; $i_07 < count($input[$i]->images); $i_07++){
			//set preview data
			$image_src_07 = $input[$i]->images[$i_07]->image_src;
			$title_07 = $input[$i]->images[$i_07]->title;
			
			$image_id_07 = $image_id_07_min + $i_07;
			
			if($stmt = $conn->prepare("INSERT INTO site_section_07_floorplans VALUES (?,?,?,?,?)")){
				$stmt->bind_param('iiiss', $section_id, $image_id_07, $i_07, $image_src_07, $title_07);
				$stmt->execute();
				$stmt->close();
			}
		}
	}
	
	if($type === 8){
		
		for($i_08 = 0; $i_08 < count($input[$i]->tabs); $i_08++){
			
			$tab_name_08 = $input[$i]->tabs[$i_08]->tab_name;
			
			$tab_id_08 = 0;
			
			if($stmt = $conn->prepare("SELECT tab_id FROM site_section_08_tabs ORDER BY tab_id DESC LIMIT 1")){
				$stmt->execute();

				$stmt->bind_result($tab_id);
				//get new array
				$stmt->fetch();
				$tab_id_08 = $tab_id + 1;

				$stmt->close();
			}
			
			if($stmt = $conn->prepare("INSERT INTO site_section_08_tabs VALUES (?,?,?,?)")){
				$stmt->bind_param('iiis', $section_id, $tab_id_08, $i_08, $tab_name_08);
				$stmt->execute();
				$stmt->close();
			}
			
			$address = $input[$i]->tabs[$i_08]->address;
			$lat = floatval($input[$i]->tabs[$i_08]->lat);
			$lng = floatval($input[$i]->tabs[$i_08]->lng);
			$zoom = intval($input[$i]->tabs[$i_08]->zoom);
			$pin_label = $input[$i]->tabs[$i_08]->pin_label;
			$walkscore_embed_code = $input[$i]->tabs[$i_08]->walkscore_embed_code;
			
			if($stmt = $conn->prepare("INSERT INTO site_section_08_map VALUES (?,?,?,?,?,?)")){
				$stmt->bind_param('isddis', $tab_id_08, $address, $lat, $lng, $zoom, $pin_label);
				$stmt->execute();
				$stmt->close();
			}
			
			if($stmt = $conn->prepare("INSERT INTO site_section_08_walkscore VALUES (?,?)")){
				$stmt->bind_param('is', $tab_id_08, $walkscore_embed_code);
				$stmt->execute();
				$stmt->close();
			}
		}
	}
	
	if($type === 9){
		
		$email_id_09 = 0;
		
		if($stmt = $conn->prepare("SELECT email_id FROM site_section_09_emails ORDER BY email_id DESC LIMIT 1")){
			$stmt->execute();

			$stmt->bind_result($email_id);
			//get new array
			$stmt->fetch();
			$email_id_09 = $email_id + 1;

			$stmt->close();
		}
		
		for($i_09 = 0; $i_09 < count($input[$i]->emails); $i_09++){
			
			$email_09 = $input[$i]->emails[$i_09];
			
			$email_id_09 = $email_id_09 + $i_09;
			
			if($stmt = $conn->prepare("INSERT INTO site_section_09_emails VALUES (?,?,?)")){
				$stmt->bind_param('iis', $section_id, $email_id_09, $email_09);
				$stmt->execute();
				$stmt->close();
			}
		}
	}
	
	if($type === 11){
		
		for($i_11 = 0; $i_11 < count($input[$i]->resources); $i_11++){
			
			$resource_id_11 = 0;
			
			if($stmt = $conn->prepare("SELECT resource_id FROM site_section_11_resources ORDER BY resource_id DESC LIMIT 1")){
				$stmt->execute();

				$stmt->bind_result($resource_id);
				//get new array
				$stmt->fetch();
				$resource_id_11 = $resource_id + 1;

				$stmt->close();
			}
			
			$src_11 = $input[$i]->resources[$i_11]->src;
			$title_11 = $input[$i]->resources[$i_11]->title;
			$description_11 = $input[$i]->resources[$i_11]->description;
			
			if($stmt = $conn->prepare("INSERT INTO site_section_11_resources VALUES (?,?,?,?,?,?)")){
				$stmt->bind_param('iiisss', $section_id, $resource_id_11, $i_11, $src_11, $title_11, $description_11);
				$stmt->execute();
				$stmt->close();
			}
		}
	}
	
	if($type === 12){
		
		for($i_12 = 0; $i_12 < count($input[$i]->agent); $i_12++){
			$agent_id_12 = 0;
			
			if($stmt = $conn->prepare("SELECT agent_id FROM site_section_12_agents ORDER BY agent_id DESC LIMIT 1")){
				$stmt->execute();

				$stmt->bind_result($agent_id);
				//get new array
				$stmt->fetch();
				$agent_id_12 = $agent_id + 1;

				$stmt->close();
			}
			//orignal
			// $name_12 = $input[$i]->agent[$i_12]->name;
			// $occupation_12 = $input[$i]->agent[$i_12]->occupation;
			// $description_12 = $input[$i]->agent[$i_12]->description;
			// $mobile_number_12 = $input[$i]->agent[$i_12]->mobile_number;
			// $office_number_12 = $input[$i]->agent[$i_12]->office_number;
			// $facebook_link_12 = $input[$i]->agent[$i_12]->facebook_link;
			// $website_link_12 = $input[$i]->agent[$i_12]->website_link;
			// $email_link_12 = $input[$i]->agent[$i_12]->email_link;
			// $image_src_12 = $input[$i]->agent[$i_12]->image_src;
			//orignal

			$agents = implode(',',$input[$i]->agent[$i_12]->selected_agents);

			$name_12 = '';
			$occupation_12 = '';
			$description_12 = '';
			$mobile_number_12 = '';
			$office_number_12 = '';
			$facebook_link_12 = '';
			$website_link_12 = '';
			$email_link_12 = '';
			$image_src_12 = '';
			$site_section_agent_id_12 = $agents;
			
			
			if($stmt = $conn->prepare("INSERT INTO site_section_12_agents VALUES (?,?,?,?,?,?,?,?,?,?,?,?)")){
				$stmt->bind_param('iissssssssss', $section_id, $agent_id_12, $name_12, $occupation_12, $description_12, $mobile_number_12, $office_number_12, $facebook_link_12, $website_link_12, $email_link_12, $image_src_12,$site_section_agent_id_12);
				$stmt->execute();
				$stmt->close();
			}
			
		}
	}
}


//check file counts, if count is 0 and file is marked for deletion, then delete
include($_SERVER['DOCUMENT_ROOT'].'/processes/delete-unused-files.php');

