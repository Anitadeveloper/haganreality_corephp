<?php 

$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

session_start();

if(isset($_SESSION['user-id'])){

//connect to database

include ($_SERVER['DOCUMENT_ROOT'].'/processes/db-conn.php');

$page_title = "manage-users";

$user_count = 0;

if($stmt = $conn->prepare("SELECT au.* FROM admin_user au WHERE au.user_id IN (SELECT user_id FROM admin_user_activate WHERE activated_state=1) AND au.user_id IN (SELECT user_id FROM admin_user_confirmation WHERE confirmation_state=1)")){
	$stmt->execute();

	$stmt->store_result();

	$user_count = $stmt->num_rows;

	$stmt->close();
}
	
if($stmt = $conn->prepare("SELECT * FROM admin_user_delete_timestamp")){
	$stmt->execute();

	$stmt->store_result();

	$user_count -= $stmt->num_rows;

	$stmt->close();
}


include($_SERVER['DOCUMENT_ROOT'].'/admin/header.php');

?>

<script type='text/javascript'>
	var USER_COUNT = <?php echo json_encode($user_count) ?>;
</script>


<aside id='asd-00-div-00'>
	<div class='div-00-asd-00-div-00'>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/users/create-user'>
			Create User
			<svg viewBox="0 0 10 10" preserveAspectRatio="none">
				<path d='M 5 0 L 5 10 M 0 5 L 10 5'></path>
			</svg>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/users/maange-users' style='color: rgb(130,0,255)'>
			Manage Users
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='display:none; background-color:rgb(132,0,255); color:white'></label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/users/user-requests'>
			User Requests
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
			There are no active users to manage
		</label>
		<a id='a-00-div-00-div-00-div-00' href='<?php echo $root ?>admin/sites/new-site'>
			Create a New User
		</a>
	</div>
	
	<div id='div-01-div-00-div-00'>
		<div class='t-div-00-div-01-div-00-div-00'>
			<div class='div-00-div-00-div-01-div-00-div-00'>
				<label class='lbl-00-div-00-div-00-div-01-div-00-div-00'>
					<!--Website Role-->
				</label>
				<span class='spn-00-div-00-div-00-div-01-div-00-div-00'>
					<img class='img-00-spn-00-div-00-div-00-div-01-div-00-div-00' src='<?php echo $root ?>images/null.png'>
				</span>
				<div class='div-00-div-00-div-00-div-01-div-00-div-00'>
					<span class='spn-00-div-00-div-00-div-00-div-01-div-00-div-00'>
						<img class='img-00-spn-00-div-00-div-00-div-00-div-01-div-00-div-00' src='<?php echo $root ?>images/null.png'>
					</span>
				</div>
			</div>
			<div class='div-01-div-00-div-01-div-00-div-00'>
				<h3 class='h3-00-div-01-div-00-div-01-div-00-div-00'>
					<!--User Name-->
				</h3>
				<h4 class='h4-00-div-01-div-00-div-01-div-00-div-00'>
					<!--Occupation-->
				</h4>
				<button class='btn-00-div-01-div-00-div-01-div-00-div-00'>
					<svg class='svg-00-btn-00-div-01-div-00-div-01-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"></path>
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




<script type='text/javascript' src='<?php echo $root ?>admin/users/manage-users.js' async></script>



<?php 

include($_SERVER['DOCUMENT_ROOT'].'/admin/footer.php');

} else {
	$url_parameter = substr($_SERVER['REQUEST_URI'], 1);
	$url_parameter = preg_replace("/\//", "~", $url_parameter);
	$url_parameter = preg_replace("/\?/", "%", $url_parameter);
	$url_parameter = preg_replace("/\&/", "+", $url_parameter);
	
	header('Location: '.$root.'admin/login.php?url='.$url_parameter);
}

