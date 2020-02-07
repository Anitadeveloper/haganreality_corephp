<?php
error_reporting(0);
ob_start();
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: POST, GET");      
	
$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

include 'db-conn.php';

if(isset($include) === false){
	//get name and id headers
	
	$file_name = mysqli_real_escape_string($conn, $_SERVER['HTTP_FILE_NAME']);
	$parent_id = intval(mysqli_real_escape_string($conn, $_SERVER['HTTP_PARENT_ID']));
	//$parent_id = 28;
	$folder = mysqli_real_escape_string($conn, $_SERVER['HTTP_FOLDER']);
	$file = $_FILES['file']['tmp_name'];
}

if(isset($_FILES['file']['name']) && $folder === 'false'){
	
	// DO NOT TRUST $_FILES['upfile']['mime'] VALUE !!
	// Check MIME Type by yourself.

	$finfo = new finfo(FILEINFO_MIME_TYPE);
	$finfo->file($file);
	$file_type = $finfo->file($_FILES['file']['tmp_name']);

	$info = pathinfo($_FILES['file']['name']);
	$ext = $info['extension']; // get the extension of the file
	
	$newname = '';
	
	$generated_name = false;
	
	while($generated_name === false){
		$rand_name = RandomString();
		$rand_name_file = $root.'files/' . $rand_name . '.' . $ext;
		$num_rows = 1;
		if($stmt = $conn->prepare("SELECT * FROM file_src WHERE file_src=?")){
			$stmt->bind_param('s', $rand_name_file);
			
			$stmt->execute();

			$stmt->store_result();
			
			$num_rows = $stmt->num_rows;
			
			$stmt->close();
		}
		if($num_rows === 0){
			$newname = $rand_name;
			$generated_name = true;
		}
	}

	$target = $_SERVER['DOCUMENT_ROOT'] . '/files/' . $newname . '.' . $ext;
	$result = copy($_FILES['file']['tmp_name'], $target);

	//get the file id
	$file_id = 1;

	$generated_number = false;
	
	while($generated_number === false){
		$rand_num = mt_rand(0,99999999);
		$num_rows = 1;
		if($stmt = $conn->prepare("SELECT * FROM file_name WHERE file_id=?")){
			$stmt->bind_param('i', $rand_num);
			
			$stmt->execute();

			$stmt->store_result();
			
			$num_rows = $stmt->num_rows;
			
			$stmt->close();
		}
		if($num_rows === 0){
			$file_id = $rand_num;
			$generated_number = true;
		}
	}
	
	//set the name of file in the database
	if($stmt = $conn->prepare("INSERT INTO file_name VALUES (?,?)")){
		$stmt->bind_param('is', $file_id, $file_name);
		$stmt->execute();
		$stmt->close();
	}

	//set the src of file in database
	$file_src = $root.'files/'.$newname . '.' . $ext;
	if($stmt = $conn->prepare("INSERT INTO file_src VALUES (?,?)")){
		$stmt->bind_param('is', $file_id, $file_src);
		$stmt->execute();
		$stmt->close();
	}
	$file_preview_src = $root.'file-previews/'.$newname.'.jpg';
	if($stmt = $conn->prepare("INSERT INTO file_preview_src VALUES (?,?)")){
		$stmt->bind_param('is', $file_id, $file_preview_src);
		$stmt->execute();
		$stmt->close();
	}

	//set the parent_id in the database
	$position = 0;
	
	if($stmt = $conn->prepare("INSERT INTO file_parent_id VALUES(?,?,?)")){
		$stmt->bind_param('iii', $file_id, $parent_id, $position);
		$stmt->execute();
		$stmt->close();
	}
	
	//insert into delete state
	if($stmt = $conn->prepare("INSERT INTO file_delete_state VALUES(?,0)")){
		$stmt->bind_param('i', $file_id);
		$stmt->execute();
		$stmt->close();
	}
	
	//get the highest position in this folder
	if($sql = $conn->prepare("SELECT position FROM file_parent_id WHERE parent_id=? ORDER BY position DESC LIMIT 1")){
		$sql->bind_param('i', $parent_id);
		$sql->execute();
		$sql->bind_result($highest_position);
		$sql->fetch();
		$position = $highest_position + 1;
		$sql->close();
	}
	
	if($sql = $conn->prepare("UPDATE file_parent_id SET position=? WHERE file_id=?")){
		$sql->bind_param('ii', $position, $file_id);
		$sql->execute();
		$sql->close();
	}

	//set the parent_id in the database
	if($stmt = $conn->prepare("INSERT INTO file_type VALUES(?,?)")){
		$stmt->bind_param('is', $file_id, $file_type);
		$stmt->execute();
		$stmt->close();
	}
		
	//create and uoload a low quality preview
	$valid_file_types = array('image/gif', 'image/png', 'image/jpeg', 'image/bmp');
	
	//check that input is an image to begin with
	if(in_array($file_type, $valid_file_types)){
		
		list($width, $height) = getimagesize($file);
		//if image is larger than 1000 x 1000
		if ($width > 1000 || $height > 1000){
			$ratio = $height/$width;
			//make sure not to stretch image
			if( $ratio > 1) {
				$new_width = 1000;
				$new_height = 1000 * $ratio;
			} else {
				$new_width = 1000;
				$new_height = 1000 * $ratio;
			}
		} else {
			$new_width = $width;
			$new_height = $height;
		}
		if($file_type === 'image/gif'){
			$src = imagecreatefromgif($file);
		} else if($file_type === 'image/png'){
			$src = imagecreatefrompng($file);
		} else if($file_type === 'image/jpeg'){
			$src = imagecreatefromjpeg($file);
		} else if($file_type === 'image/bmp'){
			$src = imagecreatefrombmp($file);
		}
		$dst = imagecreatetruecolor($new_width, $new_height);
		imagecopyresampled($dst, $src, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
		$preview_target = $_SERVER['DOCUMENT_ROOT'] . '/file-previews/' . $newname . '.jpg';
		imagejpeg($dst, $preview_target, 20); // adjust format as needed
		imagedestroy($dst);
		imagedestroy($src);
		
		//return file data
		if($sql = $conn->prepare("SELECT fpi.*, fsrc.*, fn.*, ft.*, fpsrc.* FROM file_parent_id fpi LEFT JOIN file_src fsrc ON fpi.file_id = fsrc.file_id LEFT JOIN file_name fn ON fpi.file_id = fn.file_id LEFT JOIN file_type ft ON fpi.file_id = ft.file_id LEFT JOIN file_preview_src fpsrc ON fpi.file_id = fpsrc.file_id WHERE fpi.file_id=?")){
			$sql->bind_param('i', $file_id);
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
} else if($folder === 'true'){
	
	$file_type = 'folder';
	$file_src = '';
	$file_preview_src = '';
	//get the file id
	$file_id = 1;

	$generated_number = false;
	
	while($generated_number === false){
		$rand_num = mt_rand(0,99999999);
		$num_rows = 1;
		if($stmt = $conn->prepare("SELECT * FROM file_name WHERE file_id=?")){
			$stmt->bind_param('i', $rand_num);
			
			$stmt->execute();

			$stmt->store_result();
			
			$num_rows = $stmt->num_rows;
			
			$stmt->close();
		}
		if($num_rows === 0){
			$file_id = $rand_num;
			$generated_number = true;
		}
	}
		
	if($stmt = $conn->prepare("INSERT INTO file_src VALUES (?,?)")){
		$stmt->bind_param('is', $file_id, $file_src);
		$stmt->execute();
		$stmt->close();
	}
	if($stmt = $conn->prepare("INSERT INTO file_preview_src VALUES (?,?)")){
		$stmt->bind_param('is', $file_id, $file_preview_src);
		$stmt->execute();
		$stmt->close();
	}

	//set the name of file in the database
	if($stmt = $conn->prepare("INSERT INTO file_name VALUES (?,?)")){
		$stmt->bind_param('is', $file_id, $file_name);
		$stmt->execute();
		$stmt->close();
	}

	//set the parent_id in the database
	$position = 0;
	
	if($stmt = $conn->prepare("INSERT INTO file_parent_id VALUES(?,?,?)")){
		$stmt->bind_param('iii', $file_id, $parent_id, $position);
		$stmt->execute();
		$stmt->close();
	}
	
	//get the highest position in this folder
	if($sql = $conn->prepare("SELECT position FROM file_parent_id WHERE parent_id=? ORDER BY position DESC LIMIT 1")){
		$sql->bind_param('i', $parent_id);
		$sql->execute();
		$sql->bind_result($highest_position);
		$sql->fetch();
		$position = $highest_position + 1;
		$sql->close();
	}
	
	if($sql = $conn->prepare("UPDATE file_parent_id SET position=? WHERE file_id=?")){
		$sql->bind_param('ii', $position, $file_id);
		$sql->execute();
		$sql->close();
	}

	//set the parent_id in the database
	if($stmt = $conn->prepare("INSERT INTO file_type VALUES(?,?)")){
		$stmt->bind_param('is', $file_id, $file_type);
		$stmt->execute();
		$stmt->close();
	}
	
	//insert into delete state
	if($stmt = $conn->prepare("INSERT INTO file_delete_state VALUES(?,0)")){
		$stmt->bind_param('i', $file_id);
		$stmt->execute();
		$stmt->close();
	}
}

function RandomString(){
	
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randstring = '';
    for ($i = 0; $i < 100; $i++) {
        $randstring .= $characters[rand(0, strlen($characters))];
    }
    return $randstring;
}
