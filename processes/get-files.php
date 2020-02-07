<?php

include 'db-conn.php';

if(isset($_SERVER['HTTP_FILE_PAGE'])){
		
	if($sql = $conn->prepare("SELECT fpi.*, fsrc.*, fn.*, ft.*, fpsrc.*, fds.* FROM file_parent_id fpi LEFT JOIN file_src fsrc ON fpi.file_id = fsrc.file_id LEFT JOIN file_name fn ON fpi.file_id = fn.file_id LEFT JOIN file_type ft ON fpi.file_id = ft.file_id LEFT JOIN file_preview_src fpsrc ON fpi.file_id = fpsrc.file_id LEFT JOIN file_delete_state fds ON fpi.file_id = fds.file_id ORDER BY fds.state DESC, fpi.parent_id ASC, fpi.position ASC, fpi.file_id ASC")){
		//execute query
		$sql->execute();
		//store result
		$result = $sql->get_result();
		//create array of results
		$arr = [];
		while($data = $result->fetch_assoc()){
		   $arr[] =  $data;
		}
		echo json_encode($arr);
		$sql->close();
		exit();
	}
	
} else {
	if($sql = $conn->prepare("SELECT fpi.*, fsrc.*, fn.*, ft.*, fpsrc.*, fds.* FROM file_parent_id fpi LEFT JOIN file_src fsrc ON fpi.file_id = fsrc.file_id LEFT JOIN file_name fn ON fpi.file_id = fn.file_id LEFT JOIN file_type ft ON fpi.file_id = ft.file_id LEFT JOIN file_preview_src fpsrc ON fpi.file_id = fpsrc.file_id LEFT JOIN file_delete_state fds ON fpi.file_id = fds.file_id WHERE fds.state=0 ORDER BY fpi.parent_id ASC, fpi.position ASC, fpi.file_id ASC")){
		//execute query
		$sql->execute();
		//store result
		$result = $sql->get_result();
		//create array of results
		$arr = [];
		while($data = $result->fetch_assoc()){
		   $arr[] =  $data;
		}
		echo json_encode($arr);
		$sql->close();
		exit();
	}
}