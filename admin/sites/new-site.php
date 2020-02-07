<?php 

$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

session_start();

if(isset($_SESSION['user-id']) && isset($_SESSION['valid'])){

include ($_SERVER['DOCUMENT_ROOT'].'/processes/db-conn.php');

$page_title = "new-site";
	
$file_count = 0;

if($stmt = $conn->prepare("SELECT * FROM file_delete_state WHERE state=1")){
	$stmt->execute();

	$stmt->store_result();

	$file_count = $stmt->num_rows;

	$stmt->close();
}

include($_SERVER['DOCUMENT_ROOT'].'/admin/header.php');
?>


<aside id='asd-00-div-00'>
	<div class='div-00-asd-00-div-00'>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/sites/new-site.php' style='color: rgb(130,0,255)'>
			New Site
			<svg viewBox="0 0 10 10" preserveAspectRatio="none">
				<path d='M 5 0 L 5 10 M 0 5 L 10 5' style='stroke:rgb(132,0,255)'></path>
			</svg>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/sites/manage-sites.php'>
			Manage Sites
			<label class='lbl-00-a-00-div-00-asd-00-div-00'></label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/sites/removed-sites.php'>
			Removed Sites
			<label class='lbl-00-a-00-div-00-asd-00-div-00'></label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/sites/schedule-sites.php'>
			Schedule Sites
			<label class='lbl-00-a-00-div-00-asd-00-div-00'></label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/sites/files'>
			Files
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,40,40); color:white <?php if($file_count === 0){ ?> ;display:none<?php } ?>'>!</label>
		</a>
	</div>
</aside>

<div id='div-00-div-00'>
	<div id='div-00-div-00-div-00'>
		<img id='img-00-div-00-div-00-div-00' src='<?php echo $root ?>images/admin/new-site-graphic.png'>
		<a id='a-00-div-00-div-00-div-00' href='<?php echo $root ?>admin/sites/set-new-site'>
			Create a New Site
		</a>
	</div>
</div>







<?php 

include($_SERVER['DOCUMENT_ROOT'].'/admin/footer.php');

} else {
	header('Location:'.$root.'admin/login.php');
}

