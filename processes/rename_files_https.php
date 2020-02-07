<?php

session_start();
	
include 'db-conn.php';

$tab_id = Array();
$image_id = Array();
$position = Array();
$image_src = Array();
$image_title = Array();
$image_description = Array();

//check if folder
if($stmt = $conn->prepare("SELECT tab_id, image_id, position, image_src, image_title, image_description FROM site_section_04_images")){
	$stmt->execute();
	$stmt->bind_result($tab_id_fetch, $image_id_fetch, $position_fetch, $image_src_fetch, $image_title_fetch, $image_description_fetch);
	$stmt->fetch();
	while ($stmt->fetch()) {
		$tab_id[] = $tab_id_fetch;
		$image_id[] = $image_id_fetch;
		$position[] = $position_fetch;
		$image_src[] = str_replace('http', 'https', $image_src_fetch);
		$image_title[] = $image_title_fetch;
		$image_description[] = $image_description_fetch;
    }
	$stmt->close();
}

for($i = 0; $i < count($tab_id); $i++){
	
	$tab_id_insert = $tab_id[$i];
	$image_id_insert = $image_id[$i];
	$position_insert = $position[$i];
	$image_src_insert = $image_src[$i];
	$image_title_insert = $image_title[$i];
	$image_description_insert = $image_description[$i];
	
	if($insert = $conn->prepare("INSERT INTO site_section_04_images_temp VALUES(?,?,?,?,?,?)")){
		$insert->bind_param("iiisss", $tab_id_insert, $image_id_insert, $position_insert, $image_src_insert, $image_title_insert, $image_description_insert);
		$insert->execute();
		$insert->close();
	}
}