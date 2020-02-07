<?php 
	$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

	session_start();
	
	if(isset($_SESSION['user-id'])){
	include '../../processes/db-conn.php';
	error_reporting(0);
	//disable browser caching !!IMPORTANT
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Access-Control-Allow-Credentials: true");
	header("Pragma: no-cache");
	header("Access-Control-Allow-Origin: http://www.klemequestrianestates.com");

	$page_title = "agent";

	if(isset($_REQUEST['edit_id'])){
		
		 $query = "SELECT * FROM `agent` where id='".$_REQUEST['edit_id']."'";
		 
		$result = mysqli_query($conn, $query) or die ( mysqli_error());
		$row = mysqli_fetch_assoc($result); 
		
			$page_name = 'Edit Agent';
		}
		else{
			$page_name = 'Add Agent';
		}


	$content_only = isset($_SERVER['HTTP_CONTENT_ONLY']) && ($_SERVER['HTTP_CONTENT_ONLY'] == 1);

	header('Page-Name: ' . $page_name); 
	header('Page-Title: ' . $page_title); 
	
	$version = '1.00.00';
	include($_SERVER['DOCUMENT_ROOT'].'/admin/header_agent.php');
?>

<div id="div-00">
	<script type='text/javascript'>
		var switch_page = false;
		var DOCUMENT_ROOT = '<?php echo $root ?>';
	</script>

<aside id='asd-00-div-00'>
	<div class='div-00-asd-00-div-00'>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/details-and-profile'>
			Details &amp; Profile
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/agent-section' style='color: rgb(130,0,255)'>
			Agent Section
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/emails-and-notifications'>
			Emails &amp; Notifications
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/agent-section-list'>
			Agent List
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/team-section-list'>
			Team Section
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
	</div>
</aside>
<div><h2></h2></div>
<br><br>
<?php if(isset($_REQUEST['edit_id'])){ echo '<a href="agent.php" style="color:currentColor;cursor:pointer;text-decoration:none;padding:20px 200px;font-size:18px;" align="right">Add Agent</a>'; } ?>
<a href='<?php echo $root ?>admin/settings/agent-section-list.php' style="color:currentColor;cursor:pointer;text-decoration:none;padding:20px 200px;font-size:18px;" align="right">Back</a>
<div style="margin-bottom: 30px;" align="center">
<form action="/processes/action_agent.php" method="post" enctype="multipart/form-data">
<h2><?php if(isset($_REQUEST['edit_id'])){ echo 'Edit'; } else { echo 'Add'; } ?> Agent</h2><br><br>
<select class="mdb-select md-form" name="select_dp[]" multiple>
  <option value="" disabled selected>Choose your Agent</option>
<?php 
 $result = $conn->query("select id,full_name from agent");
 // echo ($selectedRaceID == $row['raceID']) ? ' selected' : '';
 while ($row = $result->fetch_assoc()) {
	unset($id, $name);
	$id = $row['id'];
	$name = $row['full_name']; 
	echo '<option value="'.$id.'">'.$name.'</option>';
}

?>
</select>
<button class="btn-save btn btn-primary btn-sm" type="submit" name="save_dropdwn">Save</button>
</form>
		<!-- <script type='text/javascript' src='<?php echo $root ?>admin/settings/agent.js'></script> -->

		
		</div>
	</div>
	
<?php 

//include($_SERVER['DOCUMENT_ROOT'].'/admin/footer.php');

} else {
	$url_parameter = substr($_SERVER['REQUEST_URI'], 1);
	$url_parameter = preg_replace("/\//", "~", $url_parameter);
	$url_parameter = preg_replace("/\?/", "%", $url_parameter);
	$url_parameter = preg_replace("/\&/", "+", $url_parameter);
	
	header('Location: '.$root.'admin/login.php?url='.$url_parameter);
}?>
