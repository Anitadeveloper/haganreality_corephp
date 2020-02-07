<?php
session_start();
	
include 'db-conn.php';

$login_input = file_get_contents('php://input');
$login_input = json_decode($login_input);

$username = mysqli_real_escape_string($conn, $login_input->username);
$password = mysqli_real_escape_string($conn, $login_input->password);

//check if inputs are empty
if(empty($username)) {
	header('Response: error');
	exit();
} else if(empty($password)) {
	header('Response: error');
	exit();
} else {
	if($stmt = $conn->prepare("SELECT user_id,username,password FROM admin_user WHERE username=?")){
		$stmt->bind_param('s', $username);
		
		$stmt->bind_result($user_id_res,$username_res,$password_res);

		$stmt->execute();
		
		$stmt->store_result();
			
		$num_rows = $stmt->num_rows;
							
		if($num_rows < 1) {
			header("Response: error");
			exit();
		} else {
			while($stmt->fetch()){
				//hash comparison
				$hash_password_check = password_verify($password, $password_res);
				$password_hashed = password_hash($password, PASSWORD_DEFAULT);

				if($hash_password_check === true) {
					
					$_SESSION['user-id'] = $user_id_res;
					
					if($stmt2 = $conn->prepare("SELECT activated_state FROM admin_user_activate WHERE user_id=?")){
						$stmt2->bind_param('i', $user_id_res);

						$stmt2->bind_result($activated_state);

						$stmt2->execute();

						while ($stmt2->fetch()) {
							if($activated_state === 0){
								header("Response: unactivated");
								exit();
							}
						}
						
						$stmt2->close();
					}
					
					if($stmt2 = $conn->prepare("SELECT confirmation_state FROM admin_user_confirmation WHERE user_id=?")){
						$stmt2->bind_param('i', $user_id_res);

						$stmt2->bind_result($confirmation_state);

						$stmt2->execute();

						while ($stmt2->fetch()) {
							if($confirmation_state === 0){
								header("Response: unconfirmed");
								exit();
							}
						}
						
						$stmt2->close();
					}
					
					//correct login in details, log in user
					$_SESSION['valid'] = true;
					header("Response: valid");
					exit();
				}
			}
		}
		header("Response: error");
		exit();
	}
}
