<?php
include 'db-conn.php';
session_start();

if($conn == FALSE)
{
echo "connnection is not done";
}
if(isset($_POST['insert_agent'])){
	$full_name = $_POST['full_name'];
	$occupation = $_POST['occupation'];
	$email = $_POST['email'];
	$phoneno = $_POST['phone_no'];
	$officeph = $_POST['office_phno'];
	$facebooklink = $_POST['facebook_link'];
	$website = $_POST['website'];
	$description = $_POST['description'];
	$uploadtime = date("Y-m-d H:i:s");
	$cname = $_FILES['sfile']['name'];
}
if(!empty($cname))	{	
				//$tname = $_FILES['sfile']['tmp_name'];
						$tname = $_FILES['sfile']['tmp_name'];
						$size	= $_FILES['sfile']['size'];
						$name =  $full_name.date("his");
						$fext = pathinfo($cname, PATHINFO_EXTENSION);
						$fire = pathinfo($name,PATHINFO_FILENAME);
						$savename = $fire.".".$fext;
						$finalfile = "upload/$savename";
			       }
		if(!empty($cname)){
	 			if($size < 500000){
					$check = move_uploaded_file($tname,$finalfile);
				if($check){
			   	 	$qry1 = "INSERT INTO 
							`image`
							(`full_name`, `occupation`, `email`,`phone_no`, `office_phno`, `facebook_link`,`website`, `description`, `imagename`, `time`) 
							VALUES 
							('$full_name','$occupation','$email','$phoneno','$officeph','$facebooklink','$website','$description','$savename','$uploadtime')";
					$test =	mysqli_query($conn,$qry1);
				if($test = TRUE){?>
				<script>if(confirm("File Uploaded Sucessfully!!!"))
				{	
					document.location = '/admin/settings/agent.php';
				}
				else
				{
					
					document.location = '/admin/settings/agent.php';
				}
				</script>
				<?php
				}
				else 
				{
				?>
				<script>if(confirm("file is not uploaded"))
				{
						document.location = 'index.php';
				}
				else
				{
					document.location = 'index.php';
				}</script>
				<?php
						echo "file is not uploaded";
				}
			}
	 }
	 else{
		 echo "file size is too large";	
	 }
 }else
 {	
	echo "Please select an file to upload";
 }												
 ?>