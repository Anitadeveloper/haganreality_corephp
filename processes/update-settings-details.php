<?php

header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: POST, GET");  
	
$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

session_start();

$user_id = intval($_SESSION['user-id']);

include 'db-conn.php';

$input_type = $_SERVER['HTTP_INPUT_TYPE'];
$input_value = '';
if($input_type !== 'password'){
	$input_value = $_SERVER['HTTP_INPUT_VALUE'];
}


if($input_type === 'first_name'){
	if($sql = $conn->prepare("UPDATE admin_user SET first_name=? WHERE user_id=?")){
		$sql->bind_param('si', $input_value, $user_id);
		//execute query
		$sql->execute();
		$sql->close();
	}
	exit();
} 

if($input_type === 'last_name'){
	if($sql = $conn->prepare("UPDATE admin_user SET last_name=? WHERE user_id=?")){
		$sql->bind_param('si', $input_value, $user_id);
		//execute query
		$sql->execute();
		$sql->close();
	}
	exit();
} 

if($input_type === 'username'){
	if($sql = $conn->prepare("UPDATE admin_user SET username=? WHERE user_id=?")){
		$sql->bind_param('si', $input_value, $user_id);
		//execute query
		$sql->execute();
		$sql->close();
	}
	exit();
} 

if($input_type === 'email'){
	if($sql = $conn->prepare("UPDATE admin_user SET email=? WHERE user_id=?")){
		$sql->bind_param('si', $input_value, $user_id);
		//execute query
		$sql->execute();
		$sql->close();
	}
	exit();
} 

if($input_type === 'password'){
	
	$old_password = $_SERVER['HTTP_OLD_PASSWORD'];
	$new_password = $_SERVER['HTTP_NEW_PASSWORD'];
	
	if($new_password === ''){
		echo 'Password cannot be empty';
		exit();
	} else {
		
		if($stmt = $conn->prepare("SELECT password FROM admin_user WHERE user_id=?")){
			$stmt->bind_param('i', $user_id);

			$stmt->bind_result($password_res);

			$stmt->execute();

			$stmt->store_result();

			$num_rows = $stmt->num_rows;
			
			if($num_rows < 1) {
				echo 'error';
				exit();
			} else {
				while($stmt->fetch()){
					//hash comparison
					$hash_password_check = password_verify($old_password, $password_res);
					$new_password_hashed = password_hash($new_password, PASSWORD_DEFAULT);

					if($hash_password_check === true) {

						if($sql = $conn->prepare("UPDATE admin_user SET password=? WHERE user_id=?")){
							$sql->bind_param('si', $new_password_hashed, $user_id);
							//execute query
							$sql->execute();
							$sql->close();
							echo 'success';
							exit();
						}
					} else {
						echo 'Incorrect Password';
						exit();
					}
				}
			}
			echo 'error';
			exit();
		}
	}
}

