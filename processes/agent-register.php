<?php
	
include 'db-conn.php';

$agent_input = file_get_contents('php://input');
$agent_input = json_decode($agent_input);

print_r($agent_input);


$full_name = $agent_input->full_name;
$occupation = $agent_input->occupation;
$email = $agent_input->email;
$phone_no = $agent_input->phoneno;
$office_phno = $agent_input->office_phone_no;
$facebook_link = $agent_input->facebook_link;
$website = $agent_input->website;
$desciption = $agent_input->description;

$img = $agent_input->pic;
   
// Without optional parameter NoOfElements 
$img_1 = explode(":",$img); 
$picimg =$img_1[1]; 

// with negative NoOfElements 
$response = [];

// if($stmt = $conn->prepare("SELECT email FROM admin_user WHERE email=?")){
// 	$stmt->bind_param('s', $email);
// 	$stmt->bind_result($fetch_email);
// 	$stmt->execute();
// 	$stmt->store_result();
// 	$num_rows = $stmt->num_rows;
// 	if($num_rows !== 0) {
// 		array_push($response, 'Email address already in use');
// 	}
// 	$stmt->close();
// }

// if($stmt = $conn->prepare("SELECT username FROM admin_user WHERE username=?")){
// 	$stmt->bind_param('s', $username);
// 	$stmt->bind_result($fetch_username);
// 	$stmt->execute();
// 	$stmt->store_result();
// 	$num_rows = $stmt->num_rows;
// 	if($num_rows !== 0) {
// 		array_push($response, 'Username already in use');
// 	}
// 	$stmt->close();
// }

if(count($response) !== 0){
	echo json_encode($response);
	exit();
}

//else continue running registration script
if( $full_name === '' || 
	$occupation === '' ||
	$email === '' || 
	$phone_no === '' || 
	$office_phno === '' || 
	$facebook_link === '' ||
	$website === '' || 
	$desciption === '' ||
	$picimg === '')
	{
		exit();
	}

// $generated_num = false;

// $id = -1;

// while($generated_num === false){
// 	$rand_num = rand(1, 999999);
// 	$num_rows = 1;
// 	if($stmt = $conn->prepare("SELECT * FROM admin_user WHERE user_id=?")){
// 		$stmt->bind_param('i', $rand_num);

// 		$stmt->execute();

// 		$stmt->store_result();

// 		$num_rows = $stmt->num_rows;

// 		$stmt->close();
// 	}
// 	if($num_rows === 0){
// 		$id = $rand_num;
// 		$generated_num = true;
// 	}
// }



// if($stmt = $conn->prepare("INSERT INTO agent VALUES (?,?,?,?,?,?,?,?,?,UNIX_TIMESTAMP(now()))")){
// 	$stmt->bind_param("isssss",  $full_name, $occupation, $email, $phone_no, $office_phno,$facebook_link,$website,$desciption,$picimg);	
// 	echo $stmt;
// 	$stmt->execute();
// 	//$stmt->close();
// 	echo "New records created successfully";
// }
// else{
// 	echo 'llll';
// }
// $OriginalString = "Hello, How can we help you?"; 
// $img = explode(" \",$picimg);
// print_r($img);


$sql = "INSERT INTO agent (full_name, occupation, email, phone_no, office_phno,facebook_link,website,description,pic,created_ts)
VALUES ('$full_name', '$occupation', '$email', '$phone_no', '$office_phno','$facebook_link','$website','$desciption','$picimg',UNIX_TIMESTAMP(now()))";

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
  
// $user_profile = 'http://www.haganrealtyproperties.com/images/user-profile/default.jpg';
// $user_cover = 'http://www.haganrealtyproperties.com/images/user-cover/default.jpg';
// $user_agent = 'http://www.haganrealtyproperties.com/images/user-agent-photo/default.jpg';

// if($stmt = $conn->prepare("INSERT INTO admin_user_photos VALUES (?,?,?,?)")){

// 	$stmt->bind_param("isss", $id, $user_profile, $user_cover, $user_agent);	
// 	$stmt->execute();
// 	$stmt->close();

// }

//include($_SERVER['DOCUMENT_ROOT'].'/mail/activation/send-activation.php');

session_start();
//$_SESSION['user-id'] = $id;
echo 'complete';

