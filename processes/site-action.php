<?php
session_start();
	
include 'db-conn.php';

$site_id = intval(mysqli_real_escape_string($conn, $_SERVER['HTTP_SITE_ID']));
$action = intval(mysqli_real_escape_string($conn, $_SERVER['HTTP_SITE_ACTION']));

//delete site
if($action === 0) {
	//update site_state
	if($stmt = $conn->prepare("UPDATE site_state SET state=2 WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		
		$stmt->execute();
		
		$stmt->close();

	}
	
	//add to delete timestamp
	$time = time();
	if($stmt = $conn->prepare("INSERT INTO site_delete_timestamp VALUES(?,?)")){
		$stmt->bind_param('ii', $site_id,$time);
		
		$stmt->execute();
		
		$stmt->close();

	}
	
	header("Action: Removed");
	exit();
}

//restore site
if($action === 1) {
	//update site_state
	if($stmt = $conn->prepare("UPDATE site_state SET state=1 WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		
		$stmt->execute();
		
		$stmt->close();

	}
	
	//remove from delete timestamp
	if($stmt = $conn->prepare("DELETE FROM site_delete_timestamp WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		
		$stmt->execute();
		
		$stmt->close();

	}
	
	header("Action: Restored");
	exit();
}

//schedule site previously active
if($action === 2) {
	
	//get timestamp
	$schedule_ts = intval(mysqli_real_escape_string($conn, $_SERVER['HTTP_SITE_SCHEDULE_TIMESTAMP']));
	
	$curr_ts = time();
	
	if($schedule_ts > $curr_ts){
		//update site_state
		if($stmt = $conn->prepare("UPDATE site_state SET state=0 WHERE id=?")){
			$stmt->bind_param('i', $site_id);

			$stmt->execute();

			$stmt->close();

		}	

		if($stmt = $conn->prepare("INSERT INTO site_schedule_timestamp VALUES(?,?)")){
			$stmt->bind_param('ii', $site_id, $schedule_ts);

			$stmt->execute();

			$stmt->close();

		}
	}
	
	
	header("Action: Scheduled");
	exit();
}

//permanently remove site
if($action === 3) {
	//update site_state
	if($stmt = $conn->prepare("DELETE FROM site_state WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		
		$stmt->execute();
		
		$stmt->close();

	}
	
	//remove from delete timestamp
	if($stmt = $conn->prepare("DELETE FROM site_delete_timestamp WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		
		$stmt->execute();
		
		$stmt->close();
	}
	
	//remove from preview data
	if($stmt = $conn->prepare("DELETE FROM site_preview_data WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		
		$stmt->execute();
		
		$stmt->close();
	}
	
	//remove from schedule timestamp
	if($stmt = $conn->prepare("DELETE FROM site_schedule_timestamp WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		
		$stmt->execute();
		
		$stmt->close();
	}
	
	//remove from open house timestamp
	if($stmt = $conn->prepare("DELETE FROM site_open_house_timestamp WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		
		$stmt->execute();
		
		$stmt->close();
	}
	
	//remove from basic metrics
	if($stmt = $conn->prepare("DELETE FROM site_basic_metrics WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		
		$stmt->execute();
		
		$stmt->close();
	}
	
	//remove from parameter
	if($stmt = $conn->prepare("DELETE FROM site_parameter WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		
		$stmt->execute();
		
		$stmt->close();
	}
	
	//remove from default folder
	if($stmt = $conn->prepare("DELETE FROM site_default_folder WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		
		$stmt->execute();
		
		$stmt->close();
	}
	
	//check file counts, if count is 0 and file is marked for deletion, then delete
	include($_SERVER['DOCUMENT_ROOT'].'/processes/delete-unused-files.php');
	
	//remove all site sections
	include($_SERVER['DOCUMENT_ROOT'].'/processes/delete-site-sections.php');
	
	header("Action: Permanently Removed");
	exit();
}


//reschedule site
if($action === 4) {
	//get timestamp
	$schedule_ts = intval(mysqli_real_escape_string($conn, $_SERVER['HTTP_SCHEDULE_TS']));
	
	$curr_ts = time();
	
	if($schedule_ts > $curr_ts){
		//update site_state
		if($stmt = $conn->prepare("UPDATE site_state SET state=0 WHERE id=?")){
			$stmt->bind_param('i', $site_id);

			$stmt->execute();

			$stmt->close();

		}

		//update schedule timestamp
		if($stmt = $conn->prepare("UPDATE site_schedule_timestamp SET schedule_ts=? WHERE id=?")){
			$stmt->bind_param('ii', $schedule_ts, $site_id);

			$stmt->execute();

			$stmt->close();
		}
		header("Action: Rescheduled");
		exit();
	} else {
		if($stmt = $conn->prepare("UPDATE site_state SET state=1 WHERE id=?")){
			$stmt->bind_param('i', $site_id);

			$stmt->execute();

			$stmt->close();

		}

		//update schedule timestamp
		if($stmt = $conn->prepare("DELETE FROM site_schedule_timestamp WHERE id=?")){
			$stmt->bind_param('i', $site_id);

			$stmt->execute();

			$stmt->close();

		}
		header("Action: Unscheduled");
		exit();
	}
}


//unschedule site
if($action === 5) {
	//update site_state
	if($stmt = $conn->prepare("UPDATE site_state SET state=1 WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		
		$stmt->execute();
		
		$stmt->close();

	}
	
	//remove from schedule timestamp

	if($stmt = $conn->prepare("DELETE FROM site_schedule_timestamp WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		
		$stmt->execute();
		
		$stmt->close();

	}
	
	header("Action: Unscheduled");
	exit();
}

header("Action: Error");
