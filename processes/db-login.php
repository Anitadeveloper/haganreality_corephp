<?php

session_start();

if (isset($_POST['submit'])) {
	
	include 'db-conn.php';
	
	$email = mysqli_real_escape_string($conn, $_POST['email']);
	$password = mysqli_real_escape_string($conn, $_POST['password']);
	
	//Error Handlers
	//check if inputs are empty
	if(empty($email) || empty($password)) {
		header("Location: ../login.php?login=empty");
		exit();
	} else {
		if($sql = $conn->prepare("SELECT * FROM admin_user WHERE email=?")){
			$sql->bind_param('s', $email);
			$sql->execute();
			
			$result = $sql->get_result();

			$result_count = $result->num_rows;
			
			if($result_count < 1) {
				header("Location: ../login.php?login=notregistereduser");
				exit();
			} else {
				$arr = array();
				while($data = $result->fetch_assoc()){
					//hash comparison
					$hash_password_check = password_verify($password, $data['password']);

					if($hash_password_check == false) {
						header("Location: ../login.php?login=incorrectlogin");
						exit();
					} else if($hash_password_check == true) {
						//correct login in details, log in user
						$_SESSION['id'] = $email;
						header("Location: ../admin.php?login=success");
						exit();
					}
				}
			}
			
		}
	}
} else {
	header("Location: ../login.php?login=error");
	exit();
}