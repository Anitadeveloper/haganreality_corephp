<?php 

$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

session_start();

if(isset($_SESSION['user-id'])){

//connect to database

include ($_SERVER['DOCUMENT_ROOT'].'/processes/db-conn.php');

$page_title = "emails-and-notifications-settings";

$site_count = 0;

if($stmt = $conn->prepare("SELECT * FROM site_state WHERE state=1")){
	$stmt->execute();

	$stmt->store_result();

	$site_count = $stmt->num_rows;

	$stmt->close();
}

$file_count = 0;

if($stmt = $conn->prepare("SELECT * FROM file_delete_state WHERE state=1")){
	$stmt->execute();

	$stmt->store_result();

	$file_count = $stmt->num_rows;

	$stmt->close();
}

include($_SERVER['DOCUMENT_ROOT'].'/admin/header.php');

?>

<script type='text/javascript'>
	var SITE_COUNT = <?php echo json_encode($site_count) ?>;
</script>

<aside id='asd-00-div-00'>
	<div class='div-00-asd-00-div-00'>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/details-and-profile'>
			Details &amp; Profile
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/agent-section'>
			Agent Section
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/emails-and-notifications' style='color: rgb(130,0,255)'>
			Emails &amp; Notifications
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/agent-section-list'>
		Manage Agents
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/team-section-list'>
			Team Section
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
	</div>
</aside>

<div id='div-00-div-00'>
	<div id='div-00-div-00-div-00'>
		<h4 id='h4-00-div-00-div-00-div-00'>
			Notifications
		</h4>

		<span>
			<label>
				Scheduled Viewings
			</label>
		</span>
		<span>
			<label>
				Site Metrics
			</label>
		</span>
		<span>
			<label>
				User Requests
			</label>
		</span>
		<span>
			<label>
				Site Updates
			</label>
		</span>
	</div>
	
	<div id='div-01-div-00-div-00'>
		<div class='t-div-00-div-01-div-00-div-00'>
			<h6>
				
			</h6>
			<div>
				<input type='checkbox'>
				<span></span>
				<span></span>
			</div>
			<div>
				<input type='checkbox'>
				<span></span>
				<span></span>
			</div>
			<div>
				<input type='checkbox'>
				<span></span>
				<span></span>
			</div>
			<div>
				<input type='checkbox'>
				<span></span>
				<span></span>
			</div>
			<svg viewBox="0 0 10 10" preserveAspectRatio="none">
				<circle cx='2' cy='5' r='1'></circle>
				<circle cx='5' cy='5' r='1'></circle>
				<circle cx='8' cy='5' r='1'></circle>
			</svg>
		</div>
	</div>
	
	<button id='btn-00-div-00-div-00'>
		Add Email
	</button>
</div>




<script type='text/javascript' src='<?php echo $root ?>admin/settings/emails-and-notifications.js' async></script>



<?php 

include($_SERVER['DOCUMENT_ROOT'].'/admin/footer.php');

} else {
	$url_parameter = substr($_SERVER['REQUEST_URI'], 1);
	$url_parameter = preg_replace("/\//", "~", $url_parameter);
	$url_parameter = preg_replace("/\?/", "%", $url_parameter);
	$url_parameter = preg_replace("/\&/", "+", $url_parameter);
	
	header('Location: '.$root.'admin/login.php?url='.$url_parameter);
}