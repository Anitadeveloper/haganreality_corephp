<?php 

$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

session_start();

if(isset($_SESSION['user-id'])){

//connect to database

include ($_SERVER['DOCUMENT_ROOT'].'/processes/db-conn.php');

$page_title = "view-users";

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
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/users/create-user'>
			Create User
			<svg viewBox="0 0 10 10" preserveAspectRatio="none">
				<path d='M 5 0 L 5 10 M 0 5 L 10 5'></path>
			</svg>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/users/view-users' style='color: rgb(130,0,255)'>
			View Users
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='display:none; background-color:rgb(132,0,255); color:white'></label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/users/accept-new-users'>
			Accept New Users
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='display:none'></label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/sites/removed-users'>
			Removed Users
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='display:none'></label>
		</a>
	</div>
</aside>

<div id='div-00-div-00'>
	<aside id='asd-00-div-00-div-00'>
		<input id='ipt-00-asd-00-div-00-div-00' placeholder="Search" type='text'>
		<button id='btn-00-asd-00-div-00-div-00'>
			<svg viewBox="0 0 10 10" preserveAspectRatio="none">
				<path d='M 3.5 0.5 A 3 3 0 1 1 3.5 6.5 A 3 3 0 1 1 3.5 0.5 M 9 9 L 5.62 5.62'></path>
			</svg>
		</button>
	</aside>
	
	<div id='div-00-div-00-div-00' style='display:none'>
		<label id='lbl-00-div-00-div-00-div-00'>
			There are no active sites to manage
		</label>
		<a id='a-00-div-00-div-00-div-00' href='<?php echo $root ?>admin/sites/new-site'>
			Create a New Site
		</a>
	</div>
	
	<div id='div-01-div-00-div-00'>
		<div class='t-div-00-div-01-div-00-div-00'>
			<div class='div-00-div-00-div-01-div-00-div-00'>
				<label class='lbl-00-div-00-div-00-div-01-div-00-div-00'>
					<svg viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 7.449-11.985 7.449c-7.18 0-12.015-7.449-12.015-7.449s4.446-6.551 12.015-6.551c7.694 0 11.985 6.551 11.985 6.551zm-7 .449c0-2.761-2.238-5-5-5-2.761 0-5 2.239-5 5 0 2.762 2.239 5 5 5 2.762 0 5-2.238 5-5z"></path>
					</svg>
					<!--0-->
				</label>
				<div class='div-00-div-00-div-00-div-01-div-00-div-00'>
					<div class='h-00-div-00-div-00-div-00-div-01-div-00-div-00'>
						<img src='<?php echo $root ?>images/admin/site-preview/safari-bar.png'>
					</div>
					<div class='t-div-00-div-00-div-00-div-00-div-01-div-00-div-00'>
						<img>
					</div>
					<div class='t-div-01-div-00-div-00-div-00-div-01-div-00-div-00'>
						<h4></h4>
						<h4></h4>
						<h4></h4>
						<p></p>
					</div>
					<div class='t-div-02-div-00-div-00-div-00-div-01-div-00-div-00'>
						<img src='<?php echo $root ?>images/admin/site-preview/sec-02.png'>
					</div>
					<div class='t-div-03-div-00-div-00-div-00-div-01-div-00-div-00'>
						<img>
					</div>
					<div class='t-div-04-div-00-div-00-div-00-div-01-div-00-div-00'>
						<img src='<?php echo $root ?>images/admin/site-preview/sec-04.png'>
						<img>
						<img>
					</div>
					<div class='t-div-05-div-00-div-00-div-00-div-01-div-00-div-00'>
						<img src='<?php echo $root ?>images/admin/site-preview/sec-05.jpg'>
					</div>
					<div class='t-div-06-div-00-div-00-div-00-div-01-div-00-div-00'>
						<img src='<?php echo $root ?>images/admin/site-preview/sec-06.jpg'>
					</div>
					<div class='t-div-07-div-00-div-00-div-00-div-01-div-00-div-00'>
						<img src='<?php echo $root ?>images/admin/site-preview/sec-07.png'>
						<img>
						<img>
					</div>
					<div class='t-div-08-div-00-div-00-div-00-div-01-div-00-div-00'>
						<img src='<?php echo $root ?>images/admin/site-preview/sec-08.jpg'>
					</div>
					<div class='t-div-09-div-00-div-00-div-00-div-01-div-00-div-00'>
						<img src='<?php echo $root ?>images/admin/site-preview/sec-09.jpg'>
					</div>
					<div class='t-div-10-div-00-div-00-div-00-div-01-div-00-div-00'>
						<img src='<?php echo $root ?>images/admin/site-preview/sec-10.jpg'>
					</div>
					<div class='t-div-11-div-00-div-00-div-00-div-01-div-00-div-00'>
						<img src='<?php echo $root ?>images/admin/site-preview/sec-11.jpg'>
					</div>
					<div class='t-div-12-div-00-div-00-div-00-div-01-div-00-div-00'>
						<img src='<?php echo $root ?>images/admin/site-preview/sec-12.jpg'>
						<img>
						<img>
					</div>
					<div class='t-f-00-div-00-div-00-div-00-div-01-div-00-div-00'>
						<img src='<?php echo $root ?>images/admin/site-preview/footer.jpg'>
					</div>
				</div>
			</div>
			<div class='div-01-div-00-div-01-div-00-div-00'>
				<h3 class='h3-00-div-01-div-00-div-01-div-00-div-00'>
					<!--Website Name-->
				</h3>
				<h4 class='h4-00-div-01-div-00-div-01-div-00-div-00'>
					<!--URL-->
				</h4>
				<button class='btn-00-div-01-div-00-div-01-div-00-div-00'>
					<svg class='svg-00-btn-00-div-01-div-00-div-01-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"></path>
					</svg>
				</button>
				<button class='btn-00-div-01-div-00-div-01-div-00-div-00'>
					<svg class='svg-00-btn-00-div-01-div-00-div-01-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M17 3v-2c0-.552.447-1 1-1s1 .448 1 1v2c0 .552-.447 1-1 1s-1-.448-1-1zm-12 1c.553 0 1-.448 1-1v-2c0-.552-.447-1-1-1-.553 0-1 .448-1 1v2c0 .552.447 1 1 1zm13 13v-3h-1v4h3v-1h-2zm-5 .5c0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5-4.5 2.019-4.5 4.5zm11 0c0 3.59-2.91 6.5-6.5 6.5s-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5zm-14.237 3.5h-7.763v-13h19v1.763c.727.33 1.399.757 2 1.268v-9.031h-3v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-9v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-3v21h11.031c-.511-.601-.938-1.273-1.268-2z"></path>
					</svg>
				</button>
				<button class='btn-00-div-01-div-00-div-01-div-00-div-00'>
					<svg class='svg-00-btn-00-div-01-div-00-div-01-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"></path>
					</svg>
				</button>
			</div>
		</div>
	</div>
	
	<div id='div-02-div-00-div-00' style='display:none'>
		<img id='img-00-div-02-div-00-div-00' src='<?php echo $root ?>images/admin/no-results.png'>
	
		<label id='lbl-00-div-02-div-00-div-00'>
			Search Returned No Results
		</label>
	</div>
	<div id='div-03-div-00-div-00' style='display:none'>
	</div>
</div>

<div id='div-01-div-00' style="display:none">
	
	<div id='div-00-div-01-div-00' style='display:none'>
		<svg viewBox="0 0 24 24" preserveAspectRatio="none">
			<path d="M21 14v-11h-11v-3h-7v3h-3v2h3v16h16v3h2v-3h3v-7h-3zm-11-9h9v9h-9v-9zm12 14h-17v-17h3v1h-2v1h2v2h-2v1h2v2h-2v1h2v2h-2v1h2v2h-2v1h2v2h1v-2h2v2h1v-2h2v2h1v-2h2v2h1v-2h2v2h1v-2h1v3z"></path>
		</svg>
		<label>
		</label>
		<button id='btn-00-div-00-div-01-div-00'>
			Edit Details
		</button>
		<button id='btn-01-div-00-div-01-div-00'>
			Open Editor
		</button>
		<button id='btn-02-div-00-div-01-div-00'>
			Cancel
		</button>
	</div>
	
	<div id='div-01-div-01-div-00' style='display:none'>
		
		<div id='div-00-div-01-div-01-div-00'>
			<div class='div-00-div-00-div-01-div-01-div-00'>
				<button class='btn-00-div-00-div-00-div-01-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 6 L 5 4 L 9 6'></path>
					</svg>
				</button>
				<div class='div-00-div-00-div-00-div-01-div-01-div-00'>
				01
				</div>
				<button class='btn-01-div-00-div-00-div-01-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 3 L 5 6 L 9 3'></path>
					</svg>
				</button>
			</div>
			<label class='lbl-00-div-00-div-01-div-01-div-00'>
				/
			</label>
			<div class='div-00-div-00-div-01-div-01-div-00'>
				<button class='btn-00-div-00-div-00-div-01-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 6 L 5 4 L 9 6'></path>
					</svg>
				</button>
				<div class='div-00-div-00-div-00-div-01-div-01-div-00'>
				01
				</div>
				<button class='btn-01-div-00-div-00-div-01-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 3 L 5 6 L 9 3'></path>
					</svg>
				</button>
			</div>
			<label class='lbl-00-div-00-div-01-div-01-div-00'>
				/
			</label>
			<div class='div-00-div-00-div-01-div-01-div-00'>
				<button class='btn-00-div-00-div-00-div-01-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 6 L 5 4 L 9 6'></path>
					</svg>
				</button>
				<div class='div-00-div-00-div-00-div-01-div-01-div-00'>
				2050
				</div>
				<button class='btn-01-div-00-div-00-div-01-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 3 L 5 6 L 9 3'></path>
					</svg>
				</button>
			</div>
		</div>
		
		<div id='div-01-div-01-div-01-div-00'>
			<div class='div-00-div-01-div-01-div-01-div-00'>
				<button class='btn-00-div-00-div-01-div-01-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 6 L 5 4 L 9 6'></path>
					</svg>
				</button>
				<div class='div-00-div-00-div-01-div-01-div-01-div-00'>
				00
				</div>
				<button class='btn-01-div-00-div-01-div-01-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 3 L 5 6 L 9 3'></path>
					</svg>
				</button>
			</div>
			<label id='lbl-00-div-01-div-01-div-01-div-00'>
				:
			</label>
			<div class='div-00-div-01-div-01-div-01-div-00'>
				<button class='btn-00-div-00-div-01-div-01-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 6 L 5 4 L 9 6'></path>
					</svg>
				</button>
				<div class='div-00-div-00-div-01-div-01-div-01-div-00'>
				00
				</div>
				<button class='btn-01-div-00-div-01-div-01-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 3 L 5 6 L 9 3'></path>
					</svg>
				</button>
			</div>
		</div>
		
		<label id='lbl-00-div-01-div-01-div-00'>
			Local Time
		</label>
		
		<button id='btn-00-div-01-div-01-div-00'>
			Schedule Site
		</button>
		<button id='btn-01-div-01-div-01-div-00'>
			Cancel
		</button>
	</div>
	
	<div id='div-02-div-01-div-00' style='display:none'>
		<svg viewBox="0 0 24 24" preserveAspectRatio="none">
			<path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"></path>
		</svg>
		<label>
			
		</label>
		<button id='btn-00-div-02-div-01-div-00'>
			Remove
		</button>
		<button id='btn-01-div-02-div-01-div-00'>
			Cancel
		</button>
	</div>
</div>




<script type='text/javascript' src='<?php echo $root ?>/admin/sites/manage-sites.js' async></script>



<?php 

include($_SERVER['DOCUMENT_ROOT'].'/admin/footer.php');

} else {
	$url_parameter = substr($_SERVER['REQUEST_URI'], 1);
	$url_parameter = preg_replace("/\//", "~", $url_parameter);
	$url_parameter = preg_replace("/\?/", "%", $url_parameter);
	$url_parameter = preg_replace("/\&/", "+", $url_parameter);
	
	header('Location:'.$root.'admin/login.php?url='.$url_parameter);
}

