<?php 

$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';


session_start();

if(isset($_SESSION['user-id']) && isset($_SESSION['valid'])){

include ($_SERVER['DOCUMENT_ROOT'].'/processes/db-conn.php');

$site_count = 0;

if($stmt = $conn->prepare("SELECT * FROM site_state WHERE state=2")){
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

$page_title = "removed-sites";

include($_SERVER['DOCUMENT_ROOT'].'/admin/header.php');

?>

<script type='text/javascript'>
	var SITE_COUNT = <?php echo json_encode($site_count) ?>;
</script>


<aside id='asd-00-div-00'>
	<div class='div-00-asd-00-div-00'>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/sites/new-site'>
			New Site
			<svg viewBox="0 0 10 10" preserveAspectRatio="none">
				<path d='M 5 0 L 5 10 M 0 5 L 10 5'></path>
			</svg>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/sites/manage-sites'>
			Manage Sites
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='display:none'></label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/sites/removed-sites' style='color: rgb(130,0,255)'>
			Removed Sites
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='display:none; background-color:rgb(132,0,255); color:white'>3</label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/sites/schedule-sites'>
			Schedule Sites
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='display:none'></label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/sites/files'>
			Files
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,40,40); color:white <?php if($file_count === 0){ ?> ;display:none<?php } ?>'>!</label>
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
			There are no deleted sites
		</label>
		<a id='a-00-div-00-div-00-div-00' href='<?php echo $root ?>admin/sites/manage-sites'>
			Go to Manage Sites
		</a>
	</div>
	
	<div id='div-01-div-00-div-00'>
		<div class='t-div-00-div-01-div-00-div-00'>
			<div class='div-00-div-00-div-01-div-00-div-00'>
				<label class='lbl-00-div-00-div-00-div-01-div-00-div-00'>
					<!--13 Days Left-->
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
					<!--Winding Woods Way-->
				</h3>
				<h4 class='h4-00-div-01-div-00-div-01-div-00-div-00'>
					<!--www.12001windingwoodsway.com-->
				</h4>
				<button class='btn-00-div-01-div-00-div-01-div-00-div-00'>
					Restore
				</button>
				<button class='btn-01-div-01-div-00-div-01-div-00-div-00'>
					Permanently Delete
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
			<path d="M13.5 2c-5.629 0-10.212 4.436-10.475 10h-3.025l4.537 5.917 4.463-5.917h-2.975c.26-3.902 3.508-7 7.475-7 4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5c-2.381 0-4.502-1.119-5.876-2.854l-1.847 2.449c1.919 2.088 4.664 3.405 7.723 3.405 5.798 0 10.5-4.702 10.5-10.5s-4.702-10.5-10.5-10.5z"></path>
		</svg>
		<label>
			<!-- restore -->
		</label>
		<button id='btn-00-div-00-div-01-div-00'>
			Restore
		</button>
		<button id='btn-01-div-00-div-01-div-00'>
			Cancel
		</button>
	</div>
	
	<div id='div-01-div-01-div-00' style='display:none'>
		<svg viewBox="0 0 24 24" preserveAspectRatio="none">
			<path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"></path>
		</svg>
		<label>
			<!--permanently delete... -->
		</label>
		<button id='btn-00-div-01-div-01-div-00'>
			Permanently Delete
		</button>
		<button id='btn-01-div-01-div-01-div-00'>
			Cancel
		</button>
	</div>
</div>




<script type='text/javascript' src='<?php echo $root ?>/admin/sites/removed-sites.js' async></script>





<?php 

include($_SERVER['DOCUMENT_ROOT'].'/admin/footer.php');

} else {
	$url_parameter = substr($_SERVER['REQUEST_URI'], 1);
	$url_parameter = preg_replace("/\//", "~", $url_parameter);
	$url_parameter = preg_replace("/\?/", "%", $url_parameter);
	$url_parameter = preg_replace("/\&/", "+", $url_parameter);
	
	header('Location: '.$root.'admin/login.php?url='.$url_parameter);
}

