<?php 

$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

session_start();

if(isset($_SESSION['user-id'])){

//connect to database

include ($_SERVER['DOCUMENT_ROOT'].'/processes/db-conn.php');

$page_title = "details-profile-settings";

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
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>settings/details'>
			Details &amp; Profile
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white'>!</label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>settings/agent-section'>
			Agent Section
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white'>!</label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>settings/notifications'>
			Emails &amp; Notifications
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white'>!</label>
		</a>
	</div>
</aside>

<div id='div-00-div-00'>
	<h4 id='h4-00-div-00-div-00'>
		Personal Details
	</h4>
	<div class='div-00-div-00-div-00'>
		<h5>
			First Name
		</h5>
		<div class='div-00-div-00-div-00-div-00'>
			<h6>
				Jed
			</h6>
			<button>
				Change
			</button>
		</div>
		<div class='div-01-div-00-div-00-div-00' style='display:none'>
			<div contenteditable="true">
				Jed
			</div>
			<button>
				Cancel
			</button>
			<button>
				Update
			</button>
		</div>
	</div>

	<div class='div-00-div-00-div-00'>
		<h5>
			Last Name
		</h5>
		<div class='div-00-div-00-div-00-div-00'>
			<h6>
				Williams
			</h6>
			<button>
				Change
			</button>
		</div>
		<div class='div-01-div-00-div-00-div-00' style='display:none'>
			<div contenteditable="true">
				Williams
			</div>
			<button>
				Cancel
			</button>
			<button>
				Update
			</button>
		</div>
	</div>

	<div class='div-00-div-00-div-00'>
		<h5>
			Email
		</h5>
		<div class='div-00-div-00-div-00-div-00'>
			<h6>
				admin@haganrealtyproperties.com
			</h6>
			<button>
				Change
			</button>
		</div>
		<div class='div-01-div-00-div-00-div-00' style='display:none'>
			<div contenteditable="true">
				admin@haganrealtyproperties.com
			</div>
			<button>
				Cancel
			</button>
			<button>
				Update
			</button>
		</div>
	</div>

	<div class='div-00-div-00-div-00'>
		<h5>
			Password
		</h5>
		<div class='div-00-div-00-div-00-div-00'>
			<h6>
				●●●●●●●●●●
			</h6>
			<button>
				Change
			</button>
		</div>
	</div>
</div>

<div id='div-01-div-00'>
	<h4 id='h4-00-div-01-div-00'>
		Profile
	</h4>
	<div class='div-00-div-01-div-00'>
		<div class='div-01-div-00-div-01-div-00'>
			<h5>
				Profile Image
			</h5>
			<div class='div-00-div-01-div-00-div-01-div-00'>
				<div class='div-00-div-00-div-01-div-00-div-01-div-00'>
					<svg class='svg-00-div-00-div-00-div-01-div-00-div-01-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"></path>
					</svg>
					<svg class='svg-01-div-00-div-00-div-01-div-00-div-01-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"></path>
					</svg>
					<img src='<?php echo $root?>images/user-cover/default.jpg'>
				</div>
				<div class='div-01-div-00-div-01-div-00-div-01-div-00'>
					<svg class='svg-00-div-01-div-00-div-01-div-00-div-01-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"></path>
					</svg>
					<svg class='svg-01-div-01-div-00-div-01-div-00-div-01-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"></path>
					</svg>
					<img src='<?php echo $root?>images/user-profile/default.jpg'>
				</div>
			</div>
		</div>
	</div>
</div>

<div id='div-02-div-00'>
	<button>
		Delete Account
	</button>
</div>




<script type='text/javascript' src='<?php echo $root ?>/admin/settings/details.js' async></script>



<?php 

include($_SERVER['DOCUMENT_ROOT'].'/admin/footer.php');

} else {
	$url_parameter = substr($_SERVER['REQUEST_URI'], 1);
	$url_parameter = preg_replace("/\//", "~", $url_parameter);
	$url_parameter = preg_replace("/\?/", "%", $url_parameter);
	$url_parameter = preg_replace("/\&/", "+", $url_parameter);
	
	header('Location: '.$root.'admin/login.php?url='.$url_parameter);
}