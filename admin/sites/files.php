<?php 

$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

session_start();

if(isset($_SESSION['user-id']) && isset($_SESSION['valid'])){

//connect to database

include ($_SERVER['DOCUMENT_ROOT'].'/processes/db-conn.php');

$page_title = "files";

$deleted_file_count = 0;

if($stmt = $conn->prepare("SELECT * FROM file_delete_state WHERE state=1")){
	$stmt->execute();

	$stmt->store_result();

	$deleted_file_count = $stmt->num_rows;

	$stmt->close();
}

include($_SERVER['DOCUMENT_ROOT'].'/admin/header.php');

?>

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
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/sites/schedule-sites'>
			Schedule Sites
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='display:none'></label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/sites/files' style='color: rgb(130,0,255)'>
			Files
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,40,40); color:white <?php if($deleted_file_count === 0){ ?> ;display:none<?php } ?>'>!</label>
		</a>
	</div>
</aside>

<div id='div-00-div-00'>
	
	<svg id="svg-00-div-00-div-00" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
		<circle fill="#444444" stroke="none" cx="6" cy="50" r="6">
			<animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1"/>    
		</circle>
		<circle fill="#444444" stroke="none" cx="26" cy="50" r="6">
			<animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2"/>      
		</circle>
		<circle fill="#444444" stroke="none" cx="46" cy="50" r="6">
			<animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3"/>    
		</circle>
	</svg>
	
	<aside id='asd-00-div-00-div-00'>
		<input id='ipt-00-asd-00-div-00-div-00' placeholder="Search" type='text'>
		<button id='btn-00-asd-00-div-00-div-00'>
			<svg viewBox="0 0 10 10" preserveAspectRatio="none">
				<path d='M 3.5 0.5 A 3 3 0 1 1 3.5 6.5 A 3 3 0 1 1 3.5 0.5 M 9 9 L 5.62 5.62'></path>
			</svg>
		</button>
	</aside>
	
	<div id='div-00-div-00-div-00' style='display:none'>
		<img id='img-00-div-00-div-00-div-00' src="<?php echo $root ?>images/admin/no-files.png">
		<label id='lbl-00-div-00-div-00-div-00'>
			No files uploaded yet
		</label>
	</div>


	<div id='div-01-div-00-div-00'>
		<div id='div-01-div-01-div-00-div-00' style='display:none'>
			<svg id='svg-00-div-01-div-01-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
				<path d="M 6 24 L 15 24 A 9 9 0 0 0 15 6 L 7 6 L 7 2 L 1 7.5 L 7 13 L 7 9 L 15 9 A 6 6 0 0 1 15 21 L 6 21 Z"></path>
			</svg>
			<h3 id='h3-00-div-01-div-01-div-00-div-00'>
				Back to "<!-- name of parent folder -->"
			</h3>
		</div>
		
		<div class='t-div-00-div-01-div-00-div-00'>
			<div class='div-00-div-00-div-01-div-00-div-00'>
				<div class='div-00-div-00-div-00-div-01-div-00-div-00'>
					<div class='t-div-00-div-00-div-00-div-00-div-01-div-00-div-00'>
						<h3>
							This file has been deleted, but is still in use
						</h3>
					</div>
					<img class='t-img-00-div-00-div-00-div-00-div-01-div-00-div-00' src='<?php echo $root ?>images/null.png'>
					<span class='t-spn-00-div-00-div-00-div-00-div-01-div-00-div-00'>.pdf</span>
					<svg class='t-svg-00-div-00-div-00-div-00-div-01-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 0 3.5 L 0 2 A 1 1 0 0 1 1 1 L 3.5 1 L 4.5 2 L 4.5 3.5 Z'></path>
						<rect x='0' y='2' width='10' height='7' rx='1' ry='1'></rect>
					</svg>
				</div>
			</div>
			<div class='div-01-div-00-div-01-div-00-div-00'>
				<h3 class='h3-00-div-01-div-00-div-01-div-00-div-00'>
					<!--File Name-->
				</h3>
				<!-- File management button -->
				<button class='btn-00-div-01-div-00-div-01-div-00-div-00'>
					<svg class='svg-00-btn-00-div-01-div-00-div-01-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"></path>
					</svg>
				</button>
				<button class='btn-00-div-01-div-00-div-01-div-00-div-00'>
					<svg class='svg-00-btn-00-div-01-div-00-div-01-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M14 2v11h2.51l-4.51 5.01-4.509-5.01h2.509v-11h4zm2-2h-8v11h-5l9 10 9-10h-5v-11zm1 22h-10v2h10v-2z"></path>
					</svg>
				</button>
				<button class='btn-00-div-01-div-00-div-01-div-00-div-00'>
					<svg class='svg-01-btn-00-div-01-div-00-div-01-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d="M 0.5 9.5 L 4 9.5 L 4 6.8 L 0.5 6.8 Z M 5 2 L 3 2 A 1 1 0 0 0 2 3 L 2 5.5 M 0.5 4 L 2 5.5 L 4 4 M 9.5 0.5 L 6 0.5 L 6 3.2 L 9.5 3.2 Z M 5 8 L 7 8 A 1 1 0 0 0 8 7 L 8 4.5 M 9.5 6 L 8 4.5 L 6 6"></path>
					</svg>
				</button>
				<button class='btn-00-div-01-div-00-div-01-div-00-div-00'>
					<svg class='svg-00-btn-00-div-01-div-00-div-01-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"></path>
					</svg>
				</button>
				<button class='btn-00-div-01-div-00-div-01-div-00-div-00'>
					<svg class='svg-01-btn-00-div-01-div-00-div-01-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 8.5 3.5 A 5 5 0 0 0 1.5 2 M 2.1 0.1 L 1.5 2 L 3.3 2.6 M 2.75 2.75 L 7.25 2.75 L 7.25 7.25 L 2.75 7.25 Z'></path>
					</svg>
				</button>
				<button class='btn-01-div-01-div-00-div-01-div-00-div-00' style='display:none'>
					Restore
				</button>
				<button class='btn-02-div-01-div-00-div-01-div-00-div-00' style='display:none'>
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
	
	<span id='spn-00-div-01-div-00' style="display:none"></span>
	
	
	<div id='div-00-div-01-div-00' style='display:none'>
		<label> Renaming file to: </label>
		<input type='text'>
		<button id='btn-00-div-00-div-01-div-00'>
			Rename
		</button>
		<button id='btn-01-div-00-div-01-div-00'>
			Cancel
		</button>
	</div>
	
	<div id='div-01-div-01-div-00' style='display:none'>
		<label id='lbl-00-div-01-div-01-div-00'>
			Upload a file to replace:
		</label>
		<div id='btn-00-div-01-div-01-div-00'>
			<svg viewBox="0 0 24 24" preserveAspectRatio="none">
				<path d="M16 16h-3v5h-2v-5h-3l4-4 4 4zm3.479-5.908c-.212-3.951-3.473-7.092-7.479-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h3.5v-2h-3.5c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78 3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-3.5v2h3.5c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408z"></path>
			</svg>
			Upload
			<input type='file'/>
		</div>
		<div id='div-00-div-01-div-01-div-00' style='display:none'>
			<img id='t-img-00-div-00-div-01-div-01-div-00'>
			<span id='t-spn-00-div-00-div-01-div-01-div-00'></span>
			<h3 id='h3-00-div-00-div-01-div-01-div-00'>File Name</h3>
			<div id='div-00-div-00-div-01-div-01-div-00'>
				<label id='lbl-00-div-00-div-00-div-01-div-01-div-00'>
					<!-- upload rate -->
				</label>
				<label id='lbl-01-div-00-div-00-div-01-div-01-div-00'>
					<!-- the predicted time left of upload, based of current upload rate and file size -->
					
				</label>
			</div>
			<svg id='svg-00-div-00-div-01-div-01-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
				<path id='pth-00-svg-00-div-00-div-01-div-01-div-00' d='M 9.2 5 A 4.2 4.2 0 1 0 0.8 5 A 4.2 4.2 0 1 0 9.2 5'></path>
				<path id='pth-01-svg-00-div-00-div-01-div-01-div-00' d=''></path>
			</svg>
			<button id='btn-00-div-00-div-01-div-01-div-00'>
				<svg viewBox="0 0 24 24" preserveAspectRatio="none">
					<path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"></path>
				</svg>
			</button>
		</div>
		<button id='btn-01-div-01-div-01-div-00'>
			Replace
		</button>
		<button id='btn-03-div-01-div-01-div-00'>
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
	
	<div id='div-03-div-01-div-00' style='display:none'>
		<svg viewBox="0 0 24 24" preserveAspectRatio="none">
			<path d="M13.5 2c-5.629 0-10.212 4.436-10.475 10h-3.025l4.537 5.917 4.463-5.917h-2.975c.26-3.902 3.508-7 7.475-7 4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5c-2.381 0-4.502-1.119-5.876-2.854l-1.847 2.449c1.919 2.088 4.664 3.405 7.723 3.405 5.798 0 10.5-4.702 10.5-10.5s-4.702-10.5-10.5-10.5z"></path>
		</svg>
		<label>
			<!-- restore -->
		</label>
		<button id='btn-00-div-03-div-01-div-00'>
			Restore
		</button>
		<button id='btn-01-div-03-div-01-div-00'>
			Cancel
		</button>
	</div>
	
	<div id='div-04-div-01-div-00' style='display:none'>
		<svg viewBox="0 0 24 24" preserveAspectRatio="none">
			<path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"></path>
		</svg>
		<label>
			<!--permanently delete... -->
		</label>
		<button id='btn-00-div-04-div-01-div-00'>
			Permanently Delete
		</button>
		<button id='btn-01-div-04-div-01-div-00'>
			Cancel
		</button>
	</div>
</div>

<div id='div-02-div-00' style='pointer-events:none; opacity:0; transform: translate(0, -50px)'>
	<svg viewBox="0 0 10 10" preserveAspectRatio="none">
		<line x1='5' x2='5' y1='2.5' y2='5.5'></line>
		<circle cx='5' cy='7' r='0.4'></circle>
		<path d='M 5 1 A 4 4 0 0 1 5 9 A 4 4 0 0 1 5 1'></path>
	</svg>
	<p id='p-00-div-02-div-00'>
		FILENAME.jpg and 6 other files are in use on the following websites:<br>
		<span>
			&#8226; Talbot Run <br>
			&#8226; Test Site<br>
		</span>

		The files will remain visible on the above sites.
	</p>
</div>



<script type='text/javascript' src='<?php echo $root ?>/admin/sites/files.js' async></script>



<?php 

include($_SERVER['DOCUMENT_ROOT'].'/admin/footer.php');

} else {
	$url_parameter = substr($_SERVER['REQUEST_URI'], 1);
	$url_parameter = preg_replace("/\//", "~", $url_parameter);
	$url_parameter = preg_replace("/\?/", "%", $url_parameter);
	$url_parameter = preg_replace("/\&/", "+", $url_parameter);
	
	header('Location:'.$root.'admin/login.php?url='.$url_parameter);
}

