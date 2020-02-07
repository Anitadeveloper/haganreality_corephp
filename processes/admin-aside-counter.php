<?php

session_start();
	
include 'db-conn.php';

//count manage sites 
if($stmt = $conn->prepare("SELECT id FROM site_state WHERE state=1")){
	
	$stmt->execute();

	$stmt->store_result();

	$num_rows = $stmt->num_rows;

	header("Manage-Sites-Count: ".$num_rows);
	
	$stmt->close();
}

//count removed sites 
if($stmt = $conn->prepare("SELECT id FROM site_state WHERE state=2")){
	
	$stmt->execute();

	$stmt->store_result();

	$num_rows = $stmt->num_rows;

	header("Removed-Sites-Count: ".$num_rows);
	
	$stmt->close();
}

//count scheduled sites 
if($stmt = $conn->prepare("SELECT id FROM site_state WHERE state=0")){
	
	$stmt->execute();

	$stmt->store_result();

	$num_rows = $stmt->num_rows;

	header("Schedule-Sites-Count: ".$num_rows);
	
	$stmt->close();
}
