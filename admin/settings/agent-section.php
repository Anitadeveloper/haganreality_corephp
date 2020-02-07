<?php 

$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

session_start();

if(isset($_SESSION['user-id'])){

//connect to database

include ($_SERVER['DOCUMENT_ROOT'].'/processes/db-conn.php');

$page_title = "agent-section-settings";

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
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/agent-section' style='color: rgb(130,0,255)'>
			Agent Section
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/emails-and-notifications'>
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
	<h4 id='h4-00-div-00-div-00'>
		Details
	</h4>
	<div class='div-00-div-00-div-00'>
		<h5>
			Display Name
		</h5>
		<div class='div-00-div-00-div-00-div-00'>
			<h6>
				
			</h6>
			<button>
				Change
			</button>
		</div>
		<div class='div-01-div-00-div-00-div-00' style='display:none'>
			<div contenteditable="true">
				
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
			Occupation
		</h5>
		<div class='div-00-div-00-div-00-div-00'>
			<h6>
				
			</h6>
			<button>
				Change
			</button>
		</div>
		<div class='div-01-div-00-div-00-div-00' style='display:none'>
			<div contenteditable="true">
				
			</div>
			<button>
				Cancel
			</button>
			<button>
				Update
			</button>
		</div>
	</div>

	<div class='div-00-div-00-div-00 description'>
		<h5>
			Description
		</h5>
		<div class='div-00-div-00-div-00-div-00'>
			<h6>
				
			</h6>
			<button>
				Change
			</button>
		</div>
		<div class='div-01-div-00-div-00-div-00' style='display:none'>
			<div contenteditable="true">
				
			</div>
			<button>
				Cancel
			</button>
			<button>
				Update
			</button>
		</div>
	</div>
</div>

<div id='div-01-div-00'>
	<h4 id='h4-00-div-01-div-00'>
		Agent Image &amp; Contact
	</h4>

	<div class='div-00-div-01-div-00'>
		<div class='div-01-div-00-div-01-div-00'>
			<h5>
				Agent Image
			</h5>
			<div class='div-00-div-01-div-00-div-01-div-00'>
				<div class='div-00-div-00-div-01-div-00-div-01-div-00'>
					<svg class='svg-00-div-00-div-00-div-01-div-00-div-01-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"></path>
					</svg>
					<svg class='svg-01-div-00-div-00-div-01-div-00-div-01-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"></path>
					</svg>
					<span>
						<img>
					</span>
				</div>
			</div>
		</div>
	</div>
	
	
	<div class='div-00-div-01-div-00'>
		<div class='div-00-div-00-div-01-div-00'>
			<h5>
				Mobile Number
			</h5>
			<div class='div-00-div-00-div-00-div-01-div-00'>
				<h6>
					
				</h6>
				<button>
					Change
				</button>
			</div>
			<div class='div-01-div-00-div-00-div-01-div-00' style='display:none'>
				<div contenteditable="true">
					
				</div>
				<button>
					Cancel
				</button>
				<button>
					Update
				</button>
			</div>
		</div>

		<div class='div-00-div-00-div-01-div-00'>
			<h5>
				Office Number
			</h5>
			<div class='div-00-div-00-div-00-div-01-div-00'>
				<h6>
					
				</h6>
				<button>
					Change
				</button>
			</div>
			<div class='div-01-div-00-div-00-div-01-div-00' style='display:none'>
				<div contenteditable="true">
					
				</div>
				<button>
					Cancel
				</button>
				<button>
					Update
				</button>
			</div>
		</div>
		
		<div class='div-00-div-00-div-01-div-00'>
			<h5>
				Facebook Profile Link
			</h5>
			<div class='div-00-div-00-div-00-div-01-div-00'>
				<h6>
					
				</h6>
				<button>
					Change
				</button>
			</div>
			<div class='div-01-div-00-div-00-div-01-div-00' style='display:none'>
				<div contenteditable="true">
					
				</div>
				<button>
					Cancel
				</button>
				<button>
					Update
				</button>
			</div>
		</div>
		
		<div class='div-00-div-00-div-01-div-00'>
			<h5>
				Display Email
			</h5>
			<div class='div-00-div-00-div-00-div-01-div-00'>
				<h6>
					
				</h6>
				<button>
					Change
				</button>
			</div>
			<div class='div-01-div-00-div-00-div-01-div-00' style='display:none'>
				<div contenteditable="true">
					
				</div>
				<button>
					Cancel
				</button>
				<button>
					Update
				</button>
			</div>
		</div>
		
		<div class='div-00-div-00-div-01-div-00'>
			<h5>
				Website Link
			</h5>
			<div class='div-00-div-00-div-00-div-01-div-00'>
				<h6>
					
				</h6>
				<button>
					Change
				</button>
			</div>
			<div class='div-01-div-00-div-00-div-01-div-00' style='display:none'>
				<div contenteditable="true">
					
				</div>
				<button>
					Cancel
				</button>
				<button>
					Update
				</button>
			</div>
		</div>
	</div>
</div>

<span id='spn-00-div-00' style='display:none'>
	<div id='div-00-spn-00-div-00' style='display:none'>
		<hr style='width:0'>
		<div>
			<svg viewBox="0 0 300 150" preserveAspectRatio="none">
				<path d='M 0 0 L 300 0 L 300 150 L 0 150 Z M 190 15 A 10 10 0 0 1 200 25 L 200 125 A 10 10 0 0 1 190 135 L 110 135 A 10 10 0 0 1 100 125 L 100 25 A 10 10 0 0 1 110 15 Z'></path>
			</svg>
			<img>
		</div>
		<span>
			<svg viewBox="0 0 24 24" preserveAspectRatio="none">
				<path d="M21 6v12h-18v-12h18zm3-3h-24v18h24v-18zm-8.324 11.54c-1.433-.331-2.767-.621-2.121-1.841 1.966-3.713.521-5.699-1.555-5.699-2.117 0-3.527 2.062-1.555 5.699.665 1.227-.719 1.517-2.121 1.841-1.432.331-1.322 1.087-1.322 2.46h9.996c0-1.373.11-2.129-1.322-2.46z"></path>
			</svg>
			<button></button>
			<span></span>
			<svg viewBox="0 0 24 24" preserveAspectRatio="none">
				<path d="M22 5v14h-20v-14h20zm2-2h-24v18h24v-18zm-8.324 11.54c-1.433-.331-2.767-.621-2.121-1.841 1.966-3.713.521-5.699-1.555-5.699-2.117 0-3.527 2.062-1.555 5.699.665 1.227-.719 1.517-2.121 1.841-1.432.331-1.322 1.087-1.322 2.46h9.996c0-1.373.11-2.129-1.322-2.46z"></path>
			</svg>
		</span>
		<button id='btn-00-div-00-spn-00-div-00'>
			<svg viewBox="0 0 24 24" preserveAspectRatio="none">
				<path d='M8 10h-5l9-10 9 10h-5v10h-8v-10zm11 9v3h-14v-3h-2v5h18v-5h-2z'></path>
			</svg>
			<label>
				Upload New Photo
			</label>
			<input type='file'>
		</button>
		<button id='btn-01-div-00-spn-00-div-00'>Cancel</button>
		<button id='btn-02-div-00-spn-00-div-00'>Finish</button>
	</div>
</span>

<script type='text/javascript' src='<?php echo $root ?>/admin/settings/agent-section.js' async></script>



<?php 

include($_SERVER['DOCUMENT_ROOT'].'/admin/footer.php');

} else {
	$url_parameter = substr($_SERVER['REQUEST_URI'], 1);
	$url_parameter = preg_replace("/\//", "~", $url_parameter);
	$url_parameter = preg_replace("/\?/", "%", $url_parameter);
	$url_parameter = preg_replace("/\&/", "+", $url_parameter);
	
	header('Location: '.$root.'admin/login.php?url='.$url_parameter);
}