<?php 
error_reporting(0);
$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

session_start();

if(isset($_SESSION['user-id']) && isset($_SESSION['valid'])){
	
session_start();

$site_id = 0;

$site_state = 0;

include($_SERVER['DOCUMENT_ROOT'].'/processes/db-conn.php');

$parameter = $_GET['parameter'];

$site_name = '';
$site_url = '';
$site_schedule_ts = 0;
$site_start_open_house_ts = 0;
$site_end_open_house_ts = 0;
	
if($parameter === null){
	if($stmt = $conn->prepare("SELECT id FROM site_preview_data ORDER BY id DESC LIMIT 1")){
		$stmt->execute();

		$stmt->bind_result($id);
		//get new array
		$stmt->fetch();
		$site_id = $id + 1;

		$stmt->close();
	}
} else { //must be a site details update
	if($stmt = $conn->prepare("SELECT id FROM site_parameter WHERE parameter=?")){
		$stmt->bind_param('s', $parameter);
		$stmt->execute();
		$stmt->bind_result($id);
		//get new array
		$stmt->fetch();
		$site_id = $id;
		$site_state = 1;
		$stmt->close();
	}
	
	//get site vars
	if($stmt = $conn->prepare("SELECT name,url FROM site_preview_data WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		$stmt->execute();

		$stmt->bind_result($name, $url);
		//get new array
		$stmt->fetch();
		$site_name = $name;
		$site_url = $url;

		$stmt->close();
	}
	
	//get site vars
	if($stmt = $conn->prepare("SELECT schedule_ts FROM site_schedule_timestamp WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		$stmt->execute();

		$stmt->bind_result($schedule_ts);
		//get new array
		$stmt->fetch();
		$site_schedule_ts = $schedule_ts;

		$stmt->close();
	}
	
	//get site vars
	if($stmt = $conn->prepare("SELECT start_open_house_ts, end_open_house_ts FROM site_open_house_timestamp WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		$stmt->execute();

		$stmt->bind_result($start_open_house_ts, $end_open_house_ts);
		//get new array
		$stmt->fetch();
		$site_start_open_house_ts = $start_open_house_ts;
		$site_end_open_house_ts = $end_open_house_ts;

		$stmt->close();
	}
}
	
$page_title = "set-new-site";

include($_SERVER['DOCUMENT_ROOT'].'/admin/header.php');
?>

<script type='text/javascript'>
	var SITE_STATE = <?php echo json_encode($site_state) ?>;
	var SITE_ID = <?php echo json_encode($site_id) ?>;
	
	var SITE_NAME = '';
	var SITE_URL = '';
	var SITE_PARAMETER = '';
	var SITE_SCHEDULE_TS = 0;
	var SITE_START_OPEN_HOUSE_TS = 0;
	var SITE_END_OPEN_HOUSE_TS = 0;
	
	if(SITE_STATE === 1){
		SITE_NAME = <?php echo json_encode($site_name) ?>;
		SITE_URL = <?php echo json_encode($site_url) ?>;
		SITE_PARAMETER = <?php echo json_encode($parameter) ?>;
		SITE_SCHEDULE_TS = <?php echo json_encode($site_schedule_ts) ?>;
		SITE_START_OPEN_HOUSE_TS = <?php echo json_encode($site_start_open_house_ts) ?>;
		SITE_END_OPEN_HOUSE_TS = <?php echo json_encode($site_end_open_house_ts) ?>;
	}
</script>


<div id='div-00-div-00'>
	<!-- add title -->
	<div id='div-00-div-00-div-00'>
		<h3 id='h3-00-div-00-div-00-div-00'>
			Site Name
		</h3>
		<input id='ipt-00-div-00-div-00-div-00' placeholder="Site Name">
		<button id='btn-00-div-00-div-00-div-00' style='display:none'>
			Cancel
		</button>
		<button id='btn-01-div-00-div-00-div-00' style='display:none'>
			Update
		</button>
		<h3 id='h3-01-div-00-div-00-div-00'>
			Site Folder Name (Case Sensitive)
		</h3>
		<input id='ipt-01-div-00-div-00-div-00' placeholder="Folder Name">
		<label id='lbl-00-div-00-div-00-div-00'>
			This is the name of the site root folder. This is usually in the format 1234Property.com
		</label>
		<button id='btn-02-div-00-div-00-div-00' style='display:none'>
			Cancel
		</button>
		<button id='btn-03-div-00-div-00-div-00' style='display:none'>
			Update
		</button>
	</div>
	<!-- schedule upload time -->
	<div id='div-01-div-00-div-00'>
		<h3 id='h3-00-div-01-div-00-div-00'>
			Schedule Upload Time
		</h3>
		<span id='spn-00-div-01-div-00-div-00'>
			<span id='spn-00-spn-00-div-01-div-00-div-00'></span>
		</span>
		<label id='lbl-00-div-01-div-00-div-00'>Upload Immediately</label>
		
		<label id='lbl-01-div-01-div-00-div-00'>
			or
		</label>
		
		
		<div id='div-00-div-01-div-00-div-00' style='filter: grayscale(1) contrast(0.2) brightness(1.8); pointer-events:none'>
			<div id='div-00-div-00-div-01-div-00-div-00'>
				<div class='div-00-div-00-div-00-div-01-div-00-div-00'>
					<button class='btn-00-div-00-div-00-div-00-div-01-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 6 L 5 4 L 9 6'></path>
						</svg>
					</button>
					<div class='div-00-div-00-div-00-div-00-div-01-div-00-div-00'>
					01
					</div>
					<button class='btn-01-div-00-div-00-div-00-div-01-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 3 L 5 6 L 9 3'></path>
						</svg>
					</button>
				</div>
				<label class='lbl-00-div-00-div-00-div-01-div-00-div-00'>
					/
				</label>
				<div class='div-00-div-00-div-00-div-01-div-00-div-00'>
					<button class='btn-00-div-00-div-00-div-00-div-01-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 6 L 5 4 L 9 6'></path>
						</svg>
					</button>
					<div class='div-00-div-00-div-00-div-00-div-01-div-00-div-00'>
					01
					</div>
					<button class='btn-01-div-00-div-00-div-00-div-01-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 3 L 5 6 L 9 3'></path>
						</svg>
					</button>
				</div>
				<label class='lbl-00-div-00-div-00-div-01-div-00-div-00'>
					/
				</label>
				<div class='div-00-div-00-div-00-div-01-div-00-div-00'>
					<button class='btn-00-div-00-div-00-div-00-div-01-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 6 L 5 4 L 9 6'></path>
						</svg>
					</button>
					<div class='div-00-div-00-div-00-div-00-div-01-div-00-div-00'>
					2050
					</div>
					<button class='btn-01-div-00-div-00-div-00-div-01-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 3 L 5 6 L 9 3'></path>
						</svg>
					</button>
				</div>
			</div>

			<div id='div-01-div-00-div-01-div-00-div-00'>
				<div class='div-00-div-01-div-00-div-01-div-00-div-00'>
					<button class='btn-00-div-00-div-01-div-00-div-01-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 6 L 5 4 L 9 6'></path>
						</svg>
					</button>
					<div class='div-00-div-00-div-01-div-00-div-01-div-00-div-00'>
					00
					</div>
					<button class='btn-01-div-00-div-01-div-00-div-01-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 3 L 5 6 L 9 3'></path>
						</svg>
					</button>
				</div>
				<label id='lbl-00-div-01-div-00-div-01-div-00-div-00'>
					:
				</label>
				<div class='div-00-div-01-div-00-div-01-div-00-div-00'>
					<button class='btn-00-div-00-div-01-div-00-div-01-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 6 L 5 4 L 9 6'></path>
						</svg>
					</button>
					<div class='div-00-div-00-div-01-div-00-div-01-div-00-div-00'>
					00
					</div>
					<button class='btn-01-div-00-div-01-div-00-div-01-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 3 L 5 6 L 9 3'></path>
						</svg>
					</button>
				</div>
			</div>
			<label id='lbl-00-div-00-div-01-div-00-div-00'>
				Local Time
			</label>
		</div>
	</div>
	
	
	<!-- set url parameter -->
	<div id='div-02-div-00-div-00'>
		<h3 id='h3-00-div-02-div-00-div-00'>
			Setting Up a Redirect
		</h3>
		
		<h5 id='h5-00-div-02-div-00-div-00'>
			URL
		</h5>
		<label id='lbl-00-div-02-div-00-div-00'>
			http://www.haganrealtyproperties.com/property/
		</label>
		<input id='ipt-00-div-02-div-00-div-00' placeholder="Query Parameter">
		<button id='btn-00-div-02-div-00-div-00' style='display:none'>
			Cancel
		</button>
		<button id='btn-01-div-02-div-00-div-00' style='display:none'>
			Update
		</button>
		
		
		<h5 id='h5-01-div-02-div-00-div-00'>
			.htaccess File (Automatic Upload)
		</h5>
		<button id='btn-02-div-02-div-00-div-00'>
			<svg viewBox='0 0 24 24' preserveAspectRatio="none">
				<path d="M8 20h3v-5h2v5h3l-4 4-4-4zm11.479-12.908c-.212-3.951-3.473-7.092-7.479-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h3.5v-2h-3.5c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78 3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-3.5v2h3.5c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408z"></path>
			</svg>
			upload .htaccess
		</button>
		<label id='lbl-01-div-02-div-00-div-00' style='display:none'>
			Upload Failed. The domain provided above does not match.
		</label>
		<svg id="svg-00-div-02-div-00-div-00" style='display:none' x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 0 0" xml:space="preserve">
			<circle fill="#444444" stroke="none" cx="6" cy="25" r="6">
				<animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1"/>    
			</circle>
			<circle fill="#444444" stroke="none" cx="25" cy="25" r="6">
				<animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2"/>      
			</circle>
			<circle fill="#444444" stroke="none" cx="44" cy="25" r="6">
				<animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3"/>    
			</circle>
		</svg>
		
		<label id='lbl-02-div-02-div-00-div-00'>
			or
		</label>
		
		<h5 id='h5-02-div-02-div-00-div-00'>
			.htaccess File (Manual Upload)
		</h5>
		<button id='btn-03-div-02-div-00-div-00'>
			<svg viewBox='0 0 24 24' preserveAspectRatio="none">
				<path d="M8 20h3v-5h2v5h3l-4 4-4-4zm11.479-12.908c-.212-3.951-3.473-7.092-7.479-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h3.5v-2h-3.5c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78 3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-3.5v2h3.5c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408z"></path>
			</svg>
			download .htaccess
		</button>
		<label id='lbl-03-div-02-div-00-div-00'>
			Download this file, rename it to .htaccess, and upload to the root folder. For instructions on uploading a file, <a href='https://uk.godaddy.com/help/upload-files-3239' target="_blank">read this article</a>.
		</label>
		
		<label id='lbl-04-div-02-div-00-div-00'>
			or
		</label>
		
		<h5 id='h5-03-div-02-div-00-div-00'>
			.htaccess Code
		</h5>
		<div id='div-00-div-02-div-00-div-00'>
			RewriteEngine on <br>
			RewriteCond %{HTTP_HOST} ^example.com <br>
			RewriteRule ^(.*) http://haganrealtyproperties.com/property/site-parameter [P]
		</div>
		<button id='btn-04-div-02-div-00-div-00'>Copy</button>
		<label id='lbl-05-div-02-div-00-div-00'>
			Copy this code into the .htaccess file. If you don't already have one, you can learn how to make one <a href='https://uk.godaddy.com/community/SSL-And-Security/creating-an-htaccess-file/td-p/57526' target="_blank">here</a>.
		</label>
	</div>
	
	
	
	<div id='div-03-div-00-div-00'>
		<h3 id='h3-00-div-03-div-00-div-00'>
			Open House
		</h3>
		
		<span id='spn-00-div-03-div-00-div-00' style='border: 3px solid rgb(80,80,80)'>
			<span id='spn-00-spn-00-div-03-div-00-div-00' style='opacity:0'></span>
		</span>
		<label id='lbl-00-div-03-div-00-div-00'>Schedule an open house</label>
		
		<div id='div-00-div-03-div-00-div-00' style='filter: grayscale(1) contrast(0.2) brightness(1.8); pointer-events:none'>
			<div id='div-00-div-00-div-03-div-00-div-00'>
				<div class='div-00-div-00-div-00-div-03-div-00-div-00'>
					<button class='btn-00-div-00-div-00-div-00-div-03-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 6 L 5 4 L 9 6'></path>
						</svg>
					</button>
					<div class='div-00-div-00-div-00-div-00-div-03-div-00-div-00'>
					01
					</div>
					<button class='btn-01-div-00-div-00-div-00-div-03-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 3 L 5 6 L 9 3'></path>
						</svg>
					</button>
				</div>
				<label class='lbl-00-div-00-div-00-div-03-div-00-div-00'>
					/
				</label>
				<div class='div-00-div-00-div-00-div-03-div-00-div-00'>
					<button class='btn-00-div-00-div-00-div-00-div-03-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 6 L 5 4 L 9 6'></path>
						</svg>
					</button>
					<div class='div-00-div-00-div-00-div-00-div-03-div-00-div-00'>
					01
					</div>
					<button class='btn-01-div-00-div-00-div-00-div-03-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 3 L 5 6 L 9 3'></path>
						</svg>
					</button>
				</div>
				<label class='lbl-00-div-00-div-00-div-03-div-00-div-00'>
					/
				</label>
				<div class='div-00-div-00-div-00-div-03-div-00-div-00'>
					<button class='btn-00-div-00-div-00-div-00-div-03-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 6 L 5 4 L 9 6'></path>
						</svg>
					</button>
					<div class='div-00-div-00-div-00-div-00-div-03-div-00-div-00'>
					2050
					</div>
					<button class='btn-01-div-00-div-00-div-00-div-03-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 3 L 5 6 L 9 3'></path>
						</svg>
					</button>
				</div>
			</div>

			<div id='div-01-div-00-div-03-div-00-div-00'>
				<div class='div-00-div-01-div-00-div-03-div-00-div-00'>
					<button class='btn-00-div-00-div-01-div-00-div-03-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 6 L 5 4 L 9 6'></path>
						</svg>
					</button>
					<div class='div-00-div-00-div-01-div-00-div-03-div-00-div-00'>
					00
					</div>
					<button class='btn-01-div-00-div-01-div-00-div-03-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 3 L 5 6 L 9 3'></path>
						</svg>
					</button>
				</div>
				<label id='lbl-00-div-01-div-00-div-03-div-00-div-00'>
					:
				</label>
				<div class='div-00-div-01-div-00-div-03-div-00-div-00'>
					<button class='btn-00-div-00-div-01-div-00-div-03-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 6 L 5 4 L 9 6'></path>
						</svg>
					</button>
					<div class='div-00-div-00-div-01-div-00-div-03-div-00-div-00'>
					00
					</div>
					<button class='btn-01-div-00-div-01-div-00-div-03-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 3 L 5 6 L 9 3'></path>
						</svg>
					</button>
				</div>
			</div>
			
			<label id='lbl-00-div-00-div-03-div-00-div-00'>
				to
			</label>
			
			<div id='div-02-div-00-div-03-div-00-div-00'>
				<div class='div-00-div-02-div-00-div-03-div-00-div-00'>
					<button class='btn-00-div-00-div-02-div-00-div-03-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 6 L 5 4 L 9 6'></path>
						</svg>
					</button>
					<div class='div-00-div-00-div-02-div-00-div-03-div-00-div-00'>
					00
					</div>
					<button class='btn-01-div-00-div-02-div-00-div-03-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 3 L 5 6 L 9 3'></path>
						</svg>
					</button>
				</div>
				<label id='lbl-00-div-02-div-00-div-03-div-00-div-00'>
					:
				</label>
				<div class='div-00-div-02-div-00-div-03-div-00-div-00'>
					<button class='btn-00-div-00-div-02-div-00-div-03-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 6 L 5 4 L 9 6'></path>
						</svg>
					</button>
					<div class='div-00-div-00-div-02-div-00-div-03-div-00-div-00'>
					00
					</div>
					<button class='btn-01-div-00-div-02-div-00-div-03-div-00-div-00'>
						<svg viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1 3 L 5 6 L 9 3'></path>
						</svg>
					</button>
				</div>
			</div>
			
			<label id='lbl-01-div-00-div-03-div-00-div-00'>
				Local Time
			</label>
		</div>
		
	</div>
	
	<?php if($site_state === 0){?>
		<a id='a-00-div-00-div-00' href='<?php echo $root ?>admin/sites/new-site'>
			Cancel
		</a>
	<?php } else {?>
		<a id='a-00-div-00-div-00' href=''>
			Cancel
		</a>
	<?php } ?>
	
	<?php if($site_state === 0){?>
	<button id='btn-00-div-00-div-00'>
		Open Site Editor
		<svg viewBox="0 0 10 10" preserveAspectRatio="none">
			<path id='pth-00-svg-00-btn-00-div-00-div-00' d='M 4 2 L 1 2 L 1 9 L 8 9 L 8 6 M 3 7 L 7 3'></path>
			<path id='pth-01-svg-00-btn-00-div-00-div-00' d='M 5.5 2.25 L 8 2 L 7.75 4.5 L 7 3 Z'></path>
		</svg>
	</button>
	<?php } else {?>
	<button id='btn-00-div-00-div-00'>
		Save and Close
		<svg viewBox="0 0 24 24" preserveAspectRatio="none">
			<path id='pth-02-svg-00-btn-00-div-00-div-00' d="M15.004 3h2.996v5h-2.996v-5zm8.996 1v20h-24v-24h20l4 4zm-19 5h14v-7h-14v7zm16 4h-18v9h18v-9zm-2 2h-14v1h14v-1zm0 2h-14v1h14v-1zm0 2h-14v1h14v-1z"></path>
		</svg>
	</button>
	<?php } ?>
</div>

<div id='div-01-div-00' style='pointer-events:none; opacity:0; transform: translate(-50%, -50px)'>
	<svg viewBox="0 0 10 10" preserveAspectRatio="none">
			<line x1='5' x2='5' y1='2.5' y2='5.5'></line>
			<circle cx='5' cy='7' r='0.4'></circle>
			<path d='M 5 1 A 4 4 0 0 1 5 9 A 4 4 0 0 1 5 1'></path>
		</svg>
		<p id='p-00-div-01-div-00'>
			The following fields had errors:<br>
			<span>
				&#8226; Site name cannot be empty <br>
				&#8226; Site URL cannot be empty<br>
			</span>
			Correct these errors before proceeding.
		</p>
</div>





<script src='<?php echo $root ?>admin/sites/set-new-site.js?version=<?php echo $version_num ?>' type='text/javascript'></script>


<?php 

include($_SERVER['DOCUMENT_ROOT'].'/admin/footer.php');

} else {
	$url_parameter = substr($_SERVER['REQUEST_URI'], 1);
	$url_parameter = preg_replace("/\//", "~", $url_parameter);
	$url_parameter = preg_replace("/\?/", "%", $url_parameter);
	$url_parameter = preg_replace("/\&/", "+", $url_parameter);
	
	header('Location:'.$root.'admin/login.php?url='.$url_parameter);
}

