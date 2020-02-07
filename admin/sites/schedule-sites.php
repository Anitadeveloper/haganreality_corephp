<?php 

$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

session_start();

if(isset($_SESSION['user-id']) && isset($_SESSION['valid'])){
	
include ($_SERVER['DOCUMENT_ROOT'].'/processes/db-conn.php');

$site_count = 0;

if($stmt = $conn->prepare("SELECT * FROM site_state WHERE state=0")){
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

$page_title = "schedule-sites";

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
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/sites/removed-sites'>
			Removed Sites
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='display:none'></label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/sites/schedule-sites' style='color: rgb(130,0,255)'>
			Schedule Sites
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='display:none; background-color:rgb(132,0,255); color:white'>18</label>
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
			There are no scheduled sites
		</label>
		<a id='a-00-div-00-div-00-div-00' href='<?php echo $root ?>admin/sites/manage-sites'>
			Go to Manage Sites
		</a>
	</div>
	
	<div id='div-01-div-00-div-00'>
		<div class='t-div-00-div-01-div-00-div-00'>
			<div class='div-00-div-00-div-01-div-00-div-00'>
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
				<label class='lbl-00-div-01-div-00-div-01-div-00-div-00'>
					<!--02/13/19 10:00pm PT-->
				</label>
				<button class='btn-00-div-01-div-00-div-01-div-00-div-00'>
					Change
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
		
		<div id='div-00-div-00-div-01-div-00'>
			<div class='div-00-div-00-div-00-div-01-div-00'>
				<button class='btn-00-div-00-div-00-div-00-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 6 L 5 4 L 9 6'></path>
					</svg>
				</button>
				<div class='div-00-div-00-div-00-div-00-div-01-div-00'>
				01
				</div>
				<button class='btn-01-div-00-div-00-div-00-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 3 L 5 6 L 9 3'></path>
					</svg>
				</button>
			</div>
			<label class='lbl-00-div-00-div-00-div-01-div-00'>
				/
			</label>
			<div class='div-00-div-00-div-00-div-01-div-00'>
				<button class='btn-00-div-00-div-00-div-00-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 6 L 5 4 L 9 6'></path>
					</svg>
				</button>
				<div class='div-00-div-00-div-00-div-00-div-01-div-00'>
				01
				</div>
				<button class='btn-01-div-00-div-00-div-00-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 3 L 5 6 L 9 3'></path>
					</svg>
				</button>
			</div>
			<label class='lbl-00-div-00-div-00-div-01-div-00'>
				/
			</label>
			<div class='div-00-div-00-div-00-div-01-div-00'>
				<button class='btn-00-div-00-div-00-div-00-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 6 L 5 4 L 9 6'></path>
					</svg>
				</button>
				<div class='div-00-div-00-div-00-div-00-div-01-div-00'>
				2019
				</div>
				<button class='btn-01-div-00-div-00-div-00-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 3 L 5 6 L 9 3'></path>
					</svg>
				</button>
			</div>
		</div>
		
		<div id='div-01-div-00-div-01-div-00'>
			<div class='div-00-div-01-div-00-div-01-div-00'>
				<button class='btn-00-div-00-div-01-div-00-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 6 L 5 4 L 9 6'></path>
					</svg>
				</button>
				<div class='div-00-div-00-div-01-div-00-div-01-div-00'>
				00
				</div>
				<button class='btn-01-div-00-div-01-div-00-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 3 L 5 6 L 9 3'></path>
					</svg>
				</button>
			</div>
			<label id='lbl-00-div-01-div-00-div-01-div-00'>
				:
			</label>
			<div class='div-00-div-01-div-00-div-01-div-00'>
				<button class='btn-00-div-00-div-01-div-00-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 6 L 5 4 L 9 6'></path>
					</svg>
				</button>
				<div class='div-00-div-00-div-01-div-00-div-01-div-00'>
				00
				</div>
				<button class='btn-01-div-00-div-01-div-00-div-01-div-00'>
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 3 L 5 6 L 9 3'></path>
					</svg>
				</button>
			</div>
		</div>
		
		<label id='lbl-00-div-00-div-01-div-00'>
			Local Time
		</label>
		
		<button id='btn-00-div-00-div-01-div-00'>
			Make Available Now
		</button>
		<button id='btn-01-div-00-div-01-div-00'>
			Update Date
		</button>
		<button id='btn-02-div-00-div-01-div-00'>
			Cancel
		</button>
	</div>
</div>




<script type='text/javascript' src='<?php echo $root ?>/admin/sites/schedule-sites.js' async></script>





<?php 

include($_SERVER['DOCUMENT_ROOT'].'/admin/footer.php');

} else {
	$url_parameter = substr($_SERVER['REQUEST_URI'], 1);
	$url_parameter = preg_replace("/\//", "~", $url_parameter);
	$url_parameter = preg_replace("/\?/", "%", $url_parameter);
	$url_parameter = preg_replace("/\&/", "+", $url_parameter);
	
	header('Location: '.$root.'admin/login.php?url='.$url_parameter);
}

