<?php 
error_reporting(0);
$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

session_start();

if(isset($_SESSION['user-id']) && isset($_SESSION['valid'])){

$site_id = 0;

$site_parameter = $_GET["parameter"];

$site_state = 0;

$site_name = '';

$site_section_count = 0;
	
$site_default_folder_id = 0;

include($_SERVER['DOCUMENT_ROOT'].'/processes/db-conn.php');

if(is_string($site_parameter)){
	
	if($stmt = $conn->prepare("SELECT id FROM site_parameter WHERE parameter=?")){
		$stmt->bind_param('s', $site_parameter);

		$stmt->execute();
		$stmt->bind_result($id);
		$stmt->fetch();
		$site_id = $id;
		$site_state = 1;
		$stmt->close();
	}
	
	if($stmt = $conn->prepare("SELECT name FROM site_preview_data WHERE id=?")){
		$stmt->bind_param('s', $site_id);
		$stmt->execute();
		$stmt->bind_result($name);
		$stmt->fetch();
		$site_name = $name;
		$stmt->close();
	}
	
	if($stmt = $conn->prepare("SELECT folder_id FROM site_default_folder WHERE id=?")){
		$stmt->bind_param('i', $site_id);
		$stmt->execute();
		$stmt->bind_result($default_folder_id);
		$stmt->fetch();
		if(isset($default_folder_id)){
			$site_default_folder_id = $default_folder_id;
		}
		$stmt->close();
	}
	
	if($stmt = $conn->prepare("SELECT * FROM site_sections WHERE site_id=?")){
		$stmt->bind_param('i', $site_id);
		
		$stmt->execute();

		$stmt->store_result();

		$site_section_count = $stmt->num_rows;

		$stmt->close();
	}
}


$page_title = "site-editor";

include($_SERVER['DOCUMENT_ROOT'].'/admin/header.php');
?>
<script type='text/javascript'>
	var SITE_ID = <?php echo json_encode($site_id) ?>;
	var SITE_NAME = <?php echo json_encode($site_name) ?>;
	var SITE_PARAMETER = <?php echo json_encode($site_parameter) ?>;
	var SITE_STATE = <?php echo json_encode($site_state) ?>;
	var SITE_DEFAULT_FOLDER_ID = <?php echo json_encode($site_default_folder_id) ?>;
	var SITE_STATE = <?php echo json_encode($site_state) ?>;
</script>

<aside id='asd-00-div-00'>
	<h1 id='h1-00-asd-00-div-00' <?php if($site_name === ''){ ?>style='display:none'<?php } ?>>
		<?php echo($site_name); ?>
	</h1>
	<button id='btn-00-asd-00-div-00' style='pointer-events:none; opacity:0.2'>
		<svg id='svg-00-btn-00-asd-00-div-00' viewBox="0 0 15 15" preserveAspectRatio="none">
			<defs>
				<mask id="mac-screen">
					<rect x="0" y="0" width="15" height="15" style='fill:white'></rect>
					<path d='M 0.5 2.5 L 14.5 2.5 L 14.5 10.5 L 0.5 10.5 Z' style='fill:black'></path>
				</mask>
			</defs>
			<path d='M 4.5 15 A 3 5 0 0 0 6.5 12 L 1 12 A 1 1 0 0 1 0 11 L 0 2 A 1 1 0 0 1 1 1 L 14 1 A 1 1 0 0 1 15 2 L 15 11 A 1 1 0 0 1 14 12 L 8.5 12 A 3 5 0 0 0 10.5 15 Z' mask='url(#mac-screen)'></path>
		</svg>
	</button>
	<button id='btn-01-asd-00-div-00' style='pointer-events:none; opacity:0.2'>
		<svg id='svg-00-btn-01-asd-00-div-00' viewBox="0 0 15 15" preserveAspectRatio="none">
			<defs>
				<mask id="ipad-screen">
					<rect x="0" y="0" width="15" height="15" style='fill:white'></rect>
					<path d='M 11 2.5 A 0.5 0.5 0 0 1 11.5 3 L 11.5 13 A 0.5 0.5 0 0 1 11 13.5 L 4 13.5 A 0.5 0.5 0 0 1 3.5 13 L 3.5 3 A 0.5 0.5 0 0 1 4 2.5 Z' style='fill:black'></path>
				</mask>
			</defs>
			<path d='M 11 2 A 1 1 0 0 1 12 3 L 12 13 A 1 1 0 0 1 11 14 L 4 14 A 1 1 0 0 1 3 13 L 3 3 A 1 1 0 0 1 4 2 Z' mask='url(#ipad-screen)'></path>
		</svg>
	</button>
	<button id='btn-02-asd-00-div-00' style='pointer-events:none; opacity:0.2'>
		<svg id='svg-00-btn-02-asd-00-div-00' viewBox="0 0 15 15" preserveAspectRatio="none">
			<defs>
				<mask id="iphone-screen">
					<rect x="0" y="0" width="15" height="15" style='fill:white'></rect>
					<path d='M 5 4 A 0.5 0.5 0 0 1 5.5 4.5 L 5.5 12.5 A 0.5 0.5 0 0 1 5 13 L 2 13 A 0.5 0.5 0 0 1 1.5 12.5 L 1.5 4.5 A 0.5 0.5 0 0 1 2 4 L 2.25 4 A 0.5 0.5 0 0 0 2.75 4.5 L 4.25 4.5 A 0.5 0.5 0 0 0 4.75 4 Z' style='fill:black'></path>
				</mask>
			</defs>
			<path d='M 5 3.5 A 1 1 0 0 1 6 4.5 L 6 12.5 A 1 1 0 0 1 5 13.5 L 2 13.5 A 1 1 0 0 1 1 12.5 L 1 4.5 A 1 1 0 0 1 2 3.5 Z' mask='url(#iphone-screen)'></path>
		</svg>
	</button>
	<button id='btn-03-asd-00-div-00'>
		Cancel
	</button>
	<button id='btn-04-asd-00-div-00'>
		Save
	</button>
</aside>

<aside id='asd-01-div-00' style="top:calc(50% + 25px)">
	<span id='spn-00-asd-01-div-00'>
		<button class='btn-00-spn-00-asd-01-div-00'>
			<svg viewBox="0 0 10 10" preserveAspectRatio="none">
				<path d='M 0.5 2.5 A 0.5 0.5 0 0 1 1 2 L 9 2 A 0.5 0.5 0 0 1 9.5 2.5 L 9.5 7.5 A 0.5 0.5 0 0 1 9 8 L 1 8 A 0.5 0.5 0 0 1 0.5 7.5 Z M 0.5 5 L 4 5 M 4 2 L 4 8'></path>
			</svg>
		</button>
		<button class='btn-00-spn-00-asd-01-div-00'>
			<svg viewBox="0 0 10 10" preserveAspectRatio="none">
				<path d='M 0.5 2.5 A 0.5 0.5 0 0 1 1 2 L 9 2 A 0.5 0.5 0 0 1 9.5 2.5 L 9.5 7.5 A 0.5 0.5 0 0 1 9 8 L 1 8 A 0.5 0.5 0 0 1 0.5 7.5 Z'></path>
				<path d='M 1.5 7.5 L 9 7.5 L 6 4.5 L 4.5 6 L 3.75 5.25 Z' style='fill:white; stroke:none'></path>
				<circle cx='2.25' cy='4' r='0.75' style='fill:white'></circle>
			</svg>
		</button>
	</span>
	<div id='div-00-asd-01-div-00' style='display:none; transform: translate(-210px, -50%)'>
		<svg id='svg-00-div-00-asd-01-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
			<path d='M 1 1 L 9 9 M 1 9 L 9 1' style='stroke-width:1.5px; fill:none'></path>
		</svg>
		<div id='div-00-div-00-asd-01-div-00'>
			<label id='lbl-00-div-00-div-00-asd-01-div-00'>
				No Sections <br> Add Below
			</label>

			<div class='t-div-00-div-00-div-00-asd-01-div-00'>
				<svg class='svg-00-div-00-div-00-div-00-asd-01-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
					<path d='M 1 3.5 L 9 3.5 M 1 6.5 L 9 6.5' style='fill:none; stroke-width:1.2px'></path>
				</svg>
				<h3 class='h3-00-div-00-div-00-div-00-asd-01-div-00'>

				</h3>
				<svg class='svg-01-div-00-div-00-div-00-asd-01-div-00' viewBox="0 0 24 24" preserveAspectRatio="none" style='display:none'>
					<path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"></path>
				</svg>
				<svg class='svg-02-div-00-div-00-div-00-asd-01-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
					<path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"></path>
				</svg>
			</div>
		</div>
		<div id='div-01-div-00-asd-01-div-00'>
			<!-- //style="overflow-y:scroll;color:red;display: block;" -->
			<div id='div-00-div-01-div-00-asd-01-div-00' style="overflow-y:scroll;color:red;display: block;">
				<div class='div-00-div-00-div-01-div-00-asd-01-div-00'>
					Main Image
				</div>
				<div class='div-00-div-00-div-01-div-00-asd-01-div-00'>
					Main Info
				</div>
				<div class='div-00-div-00-div-01-div-00-asd-01-div-00'>
					Property Info
				</div>
				<div class='div-00-div-00-div-01-div-00-asd-01-div-00'>
					Parallax Image
				</div>
				<div class='div-00-div-00-div-01-div-00-asd-01-div-00'>
					Photo Gallery
				</div>
				<div class='div-00-div-00-div-01-div-00-asd-01-div-00'>
					Property Video
				</div>
				<div class='div-00-div-00-div-01-div-00-asd-01-div-00'>
					3D Tour
				</div>
				<div class='div-00-div-00-div-01-div-00-asd-01-div-00'>
					Floorplans
				</div>
				<div class='div-00-div-00-div-01-div-00-asd-01-div-00'>
					Location
				</div>
				<div class='div-00-div-00-div-01-div-00-asd-01-div-00'>
					Schedule Showing
				</div>
				<div class='div-00-div-00-div-01-div-00-asd-01-div-00'>
					Loan Calculator
				</div>
				<div class='div-00-div-00-div-01-div-00-asd-01-div-00'>
					Additional Resources
				</div>
				<div class='div-00-div-00-div-01-div-00-asd-01-div-00'>
					Agent
				</div>
				
				<svg id='svg-00-div-00-div-01-div-00-asd-01-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
					<path id='pth-00-svg-00-div-00-div-01-div-00-asd-01-div-00' d='M 0 2 L 10 2 L 5 8 Z' style='fill:rgb(100,100,100)'></path>
				</svg>
			</div>
			<button id='btn-00-div-01-div-00-asd-01-div-00'>
				Add
			</button>
		</div>
	</div>
	<div id='div-01-asd-01-div-00' style='display:none; transform: translate(-210px, -50%)'>
				
		<div id='div-00-div-01-asd-01-div-00'>
			<div id='btn-00-div-00-div-01-asd-01-div-00'>
				<svg viewBox="0 0 24 24" preserveAspectRatio="none">
					<path d="M16 16h-3v5h-2v-5h-3l4-4 4 4zm3.479-5.908c-.212-3.951-3.473-7.092-7.479-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h3.5v-2h-3.5c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78 3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-3.5v2h3.5c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408z"></path>
				</svg>
				<input type='file' multiple/>
			</div>
			<button id='btn-01-div-00-div-01-asd-01-div-00'>
				<svg viewBox="0 0 12 12" preserveAspectRatio="none">
					<path d='M 10 5.5 L 10 8 A 1 1 0 0 1 9 9 L 3 9 A 1 1 0 0 1 2 8 L 2 4.5 A 1 1 0 0 1 3 3.5 L 8 3.5 M 2 4.5 L 2 3.25 A 1 1 0 0 1 3 2.25 L 5.5 2.25 L 6.75 3.5 M 10.5 2.5 L 11.5 1.5 M 10.5 3.5 L 11.5 4.5 M 9.5 3.5 L 8.5 4.5 M 9.5 2.5 L 8.5 1.5'></path>
				</svg>
			</button>
			
			<button id='btn-02-div-00-div-01-asd-01-div-00' style='display:none'>
				<svg viewBox="0 0 24 24" preserveAspectRatio="none">
					<path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"></path>
				</svg>
			</button>
			
			<button id='btn-03-div-00-div-01-asd-01-div-00' style='display:none'>
				<svg viewBox="0 0 10 10" preserveAspectRatio="none">
					<path id='pth-00-svg-00-btn-03-div-00-div-01-asd-01-div-00' d=''></path>
					<path id='pth-01-svg-00-btn-03-div-00-div-01-asd-01-div-00' d='M 1.94 4.92 L 3.94 6.92 L 9.44 1.42'></path>
				</svg>
			</button>

			<svg id='svg-00-div-00-div-01-asd-01-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
				<path d='M 1 1 L 9 9 M 1 9 L 9 1' style='stroke-width:1.5px; fill:none'></path>
			</svg>
		</div>
	
		
		
		<div id='div-01-div-01-asd-01-div-00'>
			<div id='div-01-div-01-div-01-asd-01-div-00' style='display:none'>
				<svg id='svg-00-div-01-div-01-div-01-asd-01-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
					<path d="M 6 24 L 15 24 A 9 9 0 0 0 15 6 L 7 6 L 7 2 L 1 7.5 L 7 13 L 7 9 L 15 9 A 6 6 0 0 1 15 21 L 6 21 Z"></path>
				</svg>
				<h3 id='h3-00-div-01-div-01-div-01-asd-01-div-00'>
					Back to "<!-- name of parent folder -->"
				</h3>
			</div>
			
			<img id='img-00-div-01-div-01-asd-01-div-00' src="<?php echo $root ?>images/admin/no-files.png">
			<label id='lbl-00-div-01-div-01-asd-01-div-00'>
				No files uploaded yet
			</label>
			
			<div class='t-div-00-div-01-div-01-asd-01-div-00'>
				<img class='t-img-00-div-00-div-01-div-01-asd-01-div-00'>
				<span class='t-spn-00-div-00-div-01-div-01-asd-01-div-00'></span>
				<svg class='t-svg-00-div-00-div-01-div-01-asd-01-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
					<path d='M 0 3.5 L 0 2 A 1 1 0 0 1 1 1 L 3.5 1 L 4.5 2 L 4.5 3.5 Z'></path>
					<rect x='0' y='2' width='10' height='7' rx='1' ry='1'></rect>
				</svg>
				<h3 class='h3-00-div-00-div-01-div-01-asd-01-div-00' contenteditable="true" data-gramm="false">
					<!-- name of folder -->
				</h3>
			</div>
		</div>
	</div>
</aside>

<span id='spn-01-div-00' style='display:none'>
	<label id='lbl-00-spn-01-div-00'></label>
	<div id='div-00-spn-01-div-00'></div>
	<div id='div-01-spn-01-div-00'></div>
	<div id='div-02-spn-01-div-00'></div>
	<svg id='svg-00-spn-01-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
		<path d='M 0 3.5 L 0 2 A 1 1 0 0 1 1 1 L 3.5 1 L 4.5 2 L 4.5 3.5 Z'></path>
		<rect x='0' y='2' width='10' height='7' rx='1' ry='1'></rect>
	</svg>
	<svg id='svg-01-spn-01-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
		<path d='M 0 3.5 L 0 2 A 1 1 0 0 1 1 1 L 3.5 1 L 4.5 2 L 4.5 3.5 Z'></path>
		<rect x='0' y='2' width='10' height='7' rx='1' ry='1'></rect>
	</svg>
	<svg id='svg-02-spn-01-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
		<path d='M 0 3.5 L 0 2 A 1 1 0 0 1 1 1 L 3.5 1 L 4.5 2 L 4.5 3.5 Z'></path>
		<rect x='0' y='2' width='10' height='7' rx='1' ry='1'></rect>
	</svg>
	<h3 id='h3-00-spn-01-div-00' contenteditable="true" data-gramm="false">
		<!-- name of folder -->
	</h3>
</span>

<!-- any popup windows -->
<span id='spn-00-div-00' style='pointer-events:none; opacity:0'>
	<div id='div-00-spn-00-div-00'>
		<!-- upload log -->
		<div id='div-00-div-00-spn-00-div-00'>
			<svg id='svg-00-div-00-div-00-spn-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
				<path d='M 1 1 L 9 9 M 1 9 L 9 1'></path>
			</svg>
			<img id='img-00-div-00-div-00-spn-00-div-00' src="<?php echo $root ?>images/admin/no-files.png">
			<label id='lbl-00-div-00-div-00-spn-00-div-00'>
				No files in Upload Queue
			</label>
			<div id='div-00-div-00-div-00-spn-00-div-00'>
				<div class='t-div-00-div-00-div-00-div-00-spn-00-div-00'>
					<img class='t-img-00-div-00-div-00-div-00-div-00-spn-00-div-00'>
					<span class='t-spn-00-div-00-div-00-div-00-div-00-spn-00-div-00'></span>
					<h4 class='h4-00-div-00-div-00-div-00-div-00-spn-00-div-00'>
						<!-- name of file -->
					</h4>
					<div class='div-00-div-00-div-00-div-00-div-00-spn-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-00-div-00-div-00-spn-00-div-00'>
							In Queue...
						</label>
						<label class='lbl-01-div-00-div-00-div-00-div-00-div-00-spn-00-div-00'>
							<!-- the predicted time left of upload, based of current upload rate and file size -->
						</label>
					</div>
					<svg class='svg-00-div-00-div-00-div-00-div-00-spn-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path class='pth-00-svg-00-div-00-div-00-div-00-div-00-spn-00-div-00' d='M 9.2 5 A 4.2 4.2 0 1 0 0.8 5 A 4.2 4.2 0 1 0 9.2 5'></path>
						<path class='pth-01-svg-00-div-00-div-00-div-00-div-00-spn-00-div-00' d=''></path>
					</svg>
					<button class='btn-00-div-00-div-00-div-00-div-00-spn-00-div-00'>
						<svg viewBox="0 0 24 24" preserveAspectRatio="none">
							<path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</span>


<div id='div-00-div-00'>
	<div id='div-00-div-00-div-00'>
		
		<div id='div-00-div-00-div-00-div-00' <?php if($site_state === 1 && $site_section_count > 0){?>style='display:none'<?php } ?>> 
			<img id='img-00-div-00-div-00-div-00-div-00' src='<?php echo $root ?>images/admin/no-content.png'>
			<h4 id='h4-00-div-00-div-00-div-00-div-00'>
				Get Started
			</h4>
			<label id='lbl-00-div-00-div-00-div-00-div-00'>
				Add Sections in the Sections Tab
			</label>
		</div>
		
		<section class='t-sec-00-div-00-div-00-div-00'>
			<div class='div-00-sec-00-div-00-div-00-div-00'>
				<img class='img-00-div-00-sec-00-div-00-div-00-div-00' src='<?php echo $root ?>images/null.png'>
				<div class='div-00-div-00-sec-00-div-00-div-00-div-00'>
					<div class='div-00-div-00-div-00-sec-00-div-00-div-00-div-00'>
						<svg class='svg-00-div-00-div-00-div-00-sec-00-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
							<path d='M 2 6 A 4 4 0 0 1 6 2 L 18 2 A 4 4 0 0 1 22 6 L 22 18 A 4 4 0 0 1 18 22 L 6 22 A 4 4 0 0 1 2 18 Z'></path>
						</svg>
						<label class='lbl-00-div-00-div-00-div-00-sec-00-div-00-div-00-div-00'>
							Drag &amp; Drop
						</label>
						<label class='lbl-01-div-00-div-00-div-00-sec-00-div-00-div-00-div-00' style='display:none'>
							5
						</label>
					</div>
					<div class='div-01-div-00-div-00-sec-00-div-00-div-00-div-00'>
						<hr>
						<label>or</label>
						<hr>
					</div>
					<div class='div-02-div-00-div-00-sec-00-div-00-div-00-div-00'>
						<svg class='svg-00-div-02-div-00-div-00-sec-00-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
							<path d='M9 16h-8v6h22v-6h-8v-1h9v8h-24v-8h9v1zm11 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-7.5 0h-1v-14.883l-4.735 5.732-.765-.644 6.021-7.205 5.979 7.195-.764.645-4.736-5.724v14.884z'></path>
						</svg>
						<label class='lbl-00-div-02-div-00-div-00-sec-00-div-00-div-00-div-00'>
							Select Image
						</label>
					</div>
				</div>
				<button class='btn-00-div-00-sec-00-div-00-div-00-div-00' style='display:none'>Reset Image</button>
			</div>
		</section>

		<section class='t-sec-01-div-00-div-00-div-00'>
			<div class='div-00-sec-01-div-00-div-00-div-00'>
				<h1 class='h1-00-div-00-sec-01-div-00-div-00-div-00' contenteditable="true" placeholder="First Address Line" data-gramm="false"></h1>
				
				<h2 class='h2-00-div-00-sec-01-div-00-div-00-div-00' contenteditable="true" placeholder="City" data-gramm="false"></h2>
				
				<h2 class='h2-01-div-00-sec-01-div-00-div-00-div-00' contenteditable="true" placeholder="Price" data-gramm="false"></h2>
				
				<h3 class='h3-00-div-00-sec-01-div-00-div-00-div-00' contenteditable="true" placeholder="Description" data-gramm="false"></h3>
			</div>
		</section>

		<section class='t-sec-02-div-00-div-00-div-00'>
			<div class='div-00-sec-02-div-00-div-00-div-00'></div>
			<img class='img-00-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/section_heading_icon/02.png'>
			<hr class='hr-00-sec-02-div-00-div-00-div-00'>
			<hr class='hr-01-sec-02-div-00-div-00-div-00'>
			<h2 class='h2-00-sec-02-div-00-div-00-div-00'> Property Info </h2>
			<div class='div-01-sec-02-div-00-div-00-div-00'>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/bedrooms_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00' contenteditable="true" data-gramm="false"></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						Bedrooms
					</label>
					<svg class='svg-00-div-00-div-01-sec-02-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"></path>
					</svg>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/fireplaces_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00' contenteditable="true" data-gramm="false"></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						Fireplaces
					</label>
					<svg class='svg-00-div-00-div-01-sec-02-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"></path>
					</svg>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/bathrooms_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00' contenteditable="true" data-gramm="false"></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						Bathrooms
					</label>
					<svg class='svg-00-div-00-div-01-sec-02-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"></path>
					</svg>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/year_built_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00' contenteditable="true" data-gramm="false"></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						Year Built
					</label>
					<svg class='svg-00-div-00-div-01-sec-02-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"></path>
					</svg>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/tax_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00' contenteditable="true" data-gramm="false"></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						Taxes
					</label>
					<svg class='svg-00-div-00-div-01-sec-02-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"></path>
					</svg>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/assn_fees_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00' contenteditable="true" data-gramm="false"></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						ASSN Fees
					</label>
					<svg class='svg-00-div-00-div-01-sec-02-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"></path>
					</svg>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/house_size_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00' contenteditable="true" data-gramm="false"></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						House Size (sqft)
					</label>
					<svg class='svg-00-div-00-div-01-sec-02-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"></path>
					</svg>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/lot_size_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00' contenteditable="true" data-gramm="false"></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						Lot Size (acres)
					</label>
					<svg class='svg-00-div-00-div-01-sec-02-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"></path>
					</svg>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/parking_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00' contenteditable="true" data-gramm="false"></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						Parking Spaces
					</label>
					<svg class='svg-00-div-00-div-01-sec-02-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"></path>
					</svg>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/levels_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00' contenteditable="true" data-gramm="false"></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						Levels
					</label>
					<svg class='svg-00-div-00-div-01-sec-02-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"></path>
					</svg>
				</div>
				<div class='t-div-01-div-01-sec-02-div-00-div-00-div-00'></div>
			</div>
			<div class='div-02-sec-02-div-00-div-00-div-00'></div>
		</section>


		<section class='t-sec-03-div-00-div-00-div-00'>
			<div class='div-00-sec-03-div-00-div-00-div-00'>
				<img class='img-00-div-00-sec-03-div-00-div-00-div-00' src='<?php echo $root ?>images/null.png'>
				<div class='div-00-div-00-sec-03-div-00-div-00-div-00'>
					<div class='div-00-div-00-div-00-sec-03-div-00-div-00-div-00'>
						<svg class='svg-00-div-00-div-00-div-00-sec-03-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
							<path d='M 2 6 A 4 4 0 0 1 6 2 L 18 2 A 4 4 0 0 1 22 6 L 22 18 A 4 4 0 0 1 18 22 L 6 22 A 4 4 0 0 1 2 18 Z'></path>
						</svg>
						<label class='lbl-00-div-00-div-00-div-00-sec-03-div-00-div-00-div-00'>
							Drag &amp; Drop
						</label>
						<label class='lbl-01-div-00-div-00-div-00-sec-03-div-00-div-00-div-00' style='display:none'>
							5
						</label>
					</div>
					<div class='div-01-div-00-div-00-sec-03-div-00-div-00-div-00'>
						<hr>
						<label>or</label>
						<hr>
					</div>
					<div class='div-02-div-00-div-00-sec-03-div-00-div-00-div-00'>
						<svg class='svg-00-div-02-div-00-div-00-sec-03-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
							<path d='M9 16h-8v6h22v-6h-8v-1h9v8h-24v-8h9v1zm11 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-7.5 0h-1v-14.883l-4.735 5.732-.765-.644 6.021-7.205 5.979 7.195-.764.645-4.736-5.724v14.884z'></path>
						</svg>
						<label class='lbl-00-div-02-div-00-div-00-sec-03-div-00-div-00-div-00'>
							Select Image
						</label>
					</div>
				</div>
				<button class='btn-00-div-00-sec-03-div-00-div-00-div-00' style='display:none'>Reset Image</button>
			</div>
		</section>


		<section class='t-sec-04-div-00-div-00-div-00'>
			<img class='img-00-sec-04-div-00-div-00-div-00' src='<?php echo $root ?>images/section_heading_icon/04.png'>
			<hr class='hr-00-sec-04-div-00-div-00-div-00'>
			<hr class='hr-01-sec-04-div-00-div-00-div-00'>
			<h2 class='h2-00-sec-04-div-00-div-00-div-00'>
				Photo Gallery
			</h2>
			<button class='btn-00-sec-04-div-00-div-00-div-00'>
				Edit Tabs
			</button>
			<div class='div-00-sec-04-div-00-div-00-div-00'>
				
				<div class='t-div-00-div-00-sec-04-div-00-div-00-div-00'>
					<svg class='svg-00-div-00-div-00-sec-04-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 10 10 L 10 0 A 10 10 0 0 1 0 10 Z'></path>
					</svg>
					<label class='lbl-00-div-00-div-00-sec-04-div-00-div-00-div-00' contenteditable="true" placeholder="Location" style='pointer-events:none; background:none' data-gramm="false"></label>
					<svg class='svg-01-div-00-div-00-sec-04-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 0 10 L 0 0 A 10 10 0 0 0 10 10 Z'></path>
					</svg>
					<svg class='svg-02-div-00-div-00-sec-04-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none" style='display:none'>
						<path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"></path>
					</svg>
					<svg class='svg-03-div-00-div-00-sec-04-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none" style='display:none'>
						<path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"></path>
					</svg>
					<svg class='svg-04-div-00-div-00-sec-04-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none" style='display:none'>
						<path d="M 0.5 5 L 3 7.5 L 9.5 2"></path>
					</svg>
				</div>

				<button class='btn-00-div-00-sec-04-div-00-div-00-div-00'>
					<svg class='svg-00-btn-00-div-00-sec-04-div-00-div-00-div-00' preserveAspectRatio="none" viewBox="0 0 10 10">
						<path d='M 5 2 L 5 8 M 2 5 L 8 5'></path>
					</svg>
				</button>
			</div>
			<div class='div-01-sec-04-div-00-div-00-div-00'>
				<div class='t-div-00-div-01-sec-04-div-00-div-00-div-00' style='opacity:0; display:none'>
					<div class='div-00-div-00-div-01-sec-04-div-00-div-00-div-00'>
						<!-- reorder images buttons -->
						<svg class='svg-02-div-00-div-00-div-01-sec-04-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 8.5 3.5 A 5 5 0 0 0 1.5 2 M 2.1 0.1 L 1.5 2 L 3.3 2.6'></path>
							<rect y='5' x='5' width='4.5' height='4.5'></rect>
						</svg>
						<svg class='svg-03-div-00-div-00-div-01-sec-04-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
							<path d='M 1.5 3.5 A 5 5 0 0 1 8.5 2 M 8 0.3 L 8.5 2 L 6.7 2.6'></path>
							<rect y='5' x='0.5' width='4.5' height='4.5'></rect>
						</svg>
						<svg class='svg-04-div-00-div-00-div-01-sec-04-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
							<path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"></path>
						</svg>
					</div>
					<div class='div-01-div-00-div-01-sec-04-div-00-div-00-div-00'>
						<div class='t-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00'>
							<img class='img-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00' src='<?php echo $root ?>images/null.png'>
							<div class='div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00'>
								<div class='div-00-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00'>
									<svg class='svg-00-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
										<path d='M 2 6 A 4 4 0 0 1 6 2 L 18 2 A 4 4 0 0 1 22 6 L 22 18 A 4 4 0 0 1 18 22 L 6 22 A 4 4 0 0 1 2 18 Z'></path>
									</svg>
									<label class='lbl-00-div-00-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00'>
										Drag &amp; Drop
									</label>
									<label class='lbl-01-div-00-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00' style='display:none'>
										5
									</label>
								</div>
								<div class='div-01-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00'>
									<hr>
									<label>or</label>
									<hr>
								</div>
								<div class='div-02-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00'>
									<svg class='svg-00-div-02-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
										<path d='M9 16h-8v6h22v-6h-8v-1h9v8h-24v-8h9v1zm11 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-7.5 0h-1v-14.883l-4.735 5.732-.765-.644 6.021-7.205 5.979 7.195-.764.645-4.736-5.724v14.884z'></path>
									</svg>
									<label class='lbl-00-div-02-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00'>
										Select Image
									</label>
								</div>
							</div>
							<button class='btn-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00' style='display:none'>Reset Image</button>
						</div>
					</div>
					<label class='lbl-00-div-00-div-01-sec-04-div-00-div-00-div-00'> 
						Image 1 of 1
					</label>
					<div class='div-02-div-00-div-01-sec-04-div-00-div-00-div-00'>
						<!-- arrows to scroll through array -->
						<svg class='svg-02-div-02-div-00-div-01-sec-04-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
							<rect y='1' x='0' width='10' height='8'></rect>
							<path d='M 6.5 5 L 3.5 5 M 5 3.5 L 3.5 5 L 5 6.5'></path>
						</svg>
						<svg class='svg-03-div-02-div-00-div-01-sec-04-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
							<rect y='1' x='0' width='10' height='8'></rect>
							<path d='M 3.5 5 L 6.5 5 M 5 3.5 L 6.5 5 L 5 6.5'></path>
						</svg>
	
						<div class='t-div-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00'>
							<h2 class='h2-00-div-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00' contenteditable="true" placeholder="title" data-gramm="false"></h2>
							<button class='btn-00-div-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00'>
								Add Description
							</button>
							<button class='btn-01-div-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00' style='display:none'>
								Remove Description
							</button>
							<p class='p-00-div-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00' contenteditable="true" placeholder="description" style='display:none' data-gramm="false"></p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class='t-sec-05-div-00-div-00-div-00'>
			<img class='img-00-sec-05-div-00-div-00-div-00' src='<?php echo $root ?>images/section_heading_icon/05.png'>
			<hr class='hr-00-sec-05-div-00-div-00-div-00'>
			<hr class='hr-01-sec-05-div-00-div-00-div-00'>
			<h2 class='h2-00-sec-05-div-00-div-00-div-00'> Property Video </h2>
			<div class='div-00-sec-05-div-00-div-00-div-00'>
				<div class='div-00-div-00-sec-05-div-00-div-00-div-00'>
					
				</div>
				<div class='div-01-div-00-sec-05-div-00-div-00-div-00'>
					<svg class='svg-00-div-01-div-00-sec-05-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d='M9 16h-8v6h22v-6h-8v-1h9v8h-24v-8h9v1zm11 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-7.5 0h-1v-14.883l-4.735 5.732-.765-.644 6.021-7.205 5.979 7.195-.764.645-4.736-5.724v14.884z'></path>
					</svg>
					<label class='lbl-00-div-01-div-00-sec-05-div-00-div-00-div-00'>
						Select Video
					</label>
				</div>
				<button class='btn-00-div-00-sec-05-div-00-div-00-div-00' style='display:none'>Reset Video</button>
			</div>
		</section>

		<section class='t-sec-06-div-00-div-00-div-00'>
			<img class='img-00-sec-06-div-00-div-00-div-00' src='<?php echo $root ?>images/section_heading_icon/06.png'>
			<hr class='hr-00-sec-06-div-00-div-00-div-00'>
			<hr class='hr-01-sec-06-div-00-div-00-div-00'>
			<h2 class='h2-00-sec-06-div-00-div-00-div-00'>
				Take a 3D Tour
			</h2>
			<button class='btn-00-sec-06-div-00-div-00-div-00'>
				Edit Tabs
			</button>
			<div class='div-00-sec-06-div-00-div-00-div-00'>
				
				<div class='t-div-00-div-00-sec-06-div-00-div-00-div-00'>
					<svg class='svg-00-div-00-div-00-sec-06-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 10 10 L 10 0 A 10 10 0 0 1 0 10 Z'></path>
					</svg>
					<label class='lbl-00-div-00-div-00-sec-06-div-00-div-00-div-00' contenteditable="true" placeholder="Location" style='pointer-events:none; background:none' data-gramm="false"></label>
					<svg class='svg-01-div-00-div-00-sec-06-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 0 10 L 0 0 A 10 10 0 0 0 10 10 Z'></path>
					</svg>
					<svg class='svg-02-div-00-div-00-sec-06-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none" style='display:none'>
						<path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"></path>
					</svg>
					<svg class='svg-03-div-00-div-00-sec-06-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none" style='display:none'>
						<path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"></path>
					</svg>
					<svg class='svg-04-div-00-div-00-sec-06-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none" style='display:none'>
						<path d="M 0.5 5 L 3 7.5 L 9.5 2"></path>
					</svg>
				</div>

				<button class='btn-00-div-00-sec-06-div-00-div-00-div-00'>
					<svg class='svg-00-btn-00-div-00-sec-06-div-00-div-00-div-00' preserveAspectRatio="none" viewBox="0 0 10 10">
						<path d='M 5 2 L 5 8 M 2 5 L 8 5'></path>
					</svg>
				</button>
			</div>
			<div class='div-01-sec-06-div-00-div-00-div-00'>
				<div class='t-div-00-div-01-sec-06-div-00-div-00-div-00' style='opacity:0; display:none'>
					<iframe frameborder="0" allowfullscreen allow="vr"></iframe>
					<div class='div-00-div-00-div-01-sec-06-div-00-div-00-div-00'>
						<svg class='svg-00-div-00-div-00-div-01-sec-06-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
							<path d='M9 16h-8v6h22v-6h-8v-1h9v8h-24v-8h9v1zm11 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-7.5 0h-1v-14.883l-4.735 5.732-.765-.644 6.021-7.205 5.979 7.195-.764.645-4.736-5.724v14.884z'></path>
						</svg>
						<label class='lbl-00-div-00-div-00-div-01-sec-06-div-00-div-00-div-00'>
							Upload Matterport 3D
						</label>
					</div>
					<button class='btn-00-div-00-div-01-sec-06-div-00-div-00-div-00' style='display:none'>Reset Viewport</button>
				</div>
			</div>
		</section>



		<section class='t-sec-07-div-00-div-00-div-00'>
			<img class='img-00-sec-07-div-00-div-00-div-00' src='<?php echo $root ?>images/section_heading_icon/08.png'>
			<hr class='hr-00-sec-07-div-00-div-00-div-00'>
			<hr class='hr-01-sec-07-div-00-div-00-div-00'>
			<h2 class='h2-00-sec-07-div-00-div-00-div-00'>
				Floorplans
			</h2>
			<div class='div-00-sec-07-div-00-div-00-div-00'>
				<div class='div-00-div-00-sec-07-div-00-div-00-div-00'>
					<!-- reorder images buttons -->
					<svg class='svg-02-div-00-div-00-sec-07-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 8.5 3.5 A 5 5 0 0 0 1.5 2 M 2.1 0.1 L 1.5 2 L 3.3 2.6'></path>
						<rect y='5' x='5' width='4.5' height='4.5'></rect>
					</svg>
					<svg class='svg-03-div-00-div-00-sec-07-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1.5 3.5 A 5 5 0 0 1 8.5 2 M 8 0.3 L 8.5 2 L 6.7 2.6'></path>
						<rect y='5' x='0.5' width='4.5' height='4.5'></rect>
					</svg>
					<svg class='svg-04-div-00-div-00-sec-07-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"></path>
					</svg>
				</div>
				<div class='div-01-div-00-sec-07-div-00-div-00-div-00'>
					<div class='t-div-00-div-01-div-00-sec-07-div-00-div-00-div-00'>
						<img class='img-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00' src='<?php echo $root ?>images/null.png'>
						<div class='div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00'>
							<div class='div-00-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00'>
								<svg class='svg-00-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
									<path d='M 2 6 A 4 4 0 0 1 6 2 L 18 2 A 4 4 0 0 1 22 6 L 22 18 A 4 4 0 0 1 18 22 L 6 22 A 4 4 0 0 1 2 18 Z'></path>
								</svg>
								<label class='lbl-00-div-00-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00'>
									Drag &amp; Drop
								</label>
								<label class='lbl-01-div-00-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00' style='display:none'>
									5
								</label>
							</div>
							<div class='div-01-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00'>
								<hr>
								<label>or</label>
								<hr>
							</div>
							<div class='div-02-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00'>
								<svg class='svg-00-div-02-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
									<path d='M9 16h-8v6h22v-6h-8v-1h9v8h-24v-8h9v1zm11 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-7.5 0h-1v-14.883l-4.735 5.732-.765-.644 6.021-7.205 5.979 7.195-.764.645-4.736-5.724v14.884z'></path>
								</svg>
								<label class='lbl-00-div-02-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00'>
									Select Image
								</label>
							</div>
						</div>
						<button class='btn-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00' style='display:none'>Reset Image</button>
					</div>
				</div>
				<label class='lbl-00-div-00-sec-07-div-00-div-00-div-00'> 
					Floorplan 1 of 1
				</label>
				<div class='div-02-div-00-sec-07-div-00-div-00-div-00'>
					<svg class='svg-02-div-02-div-00-sec-07-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<rect y='1' x='0' width='10' height='8'></rect>
						<path d='M 6.5 5 L 3.5 5 M 5 3.5 L 3.5 5 L 5 6.5'></path>
					</svg>
					<svg class='svg-03-div-02-div-00-sec-07-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<rect y='1' x='0' width='10' height='8'></rect>
						<path d='M 3.5 5 L 6.5 5 M 5 3.5 L 6.5 5 L 5 6.5'></path>
					</svg>
					<div class='t-div-00-div-02-div-00-sec-07-div-00-div-00-div-00'>
						<h2 class='h2-00-div-00-div-02-div-00-sec-07-div-00-div-00-div-00' contenteditable="true" placeholder="title" data-gramm="false"></h2>
					</div>
				</div>
			</div>
		</section>



		<section class='t-sec-08-div-00-div-00-div-00'>
			<img class='img-00-sec-08-div-00-div-00-div-00' src='<?php echo $root ?>images/section_heading_icon/09.png'>
			<hr class='hr-00-sec-08-div-00-div-00-div-00'>
			<hr class='hr-01-sec-08-div-00-div-00-div-00'>
			<h2 class='h2-00-sec-08-div-00-div-00-div-00'>
					Location
				</h2>
			<button class='btn-00-sec-08-div-00-div-00-div-00'>
				Edit Tabs
			</button>
			<div class='div-00-sec-08-div-00-div-00-div-00'>
				
				<div class='t-div-00-div-00-sec-08-div-00-div-00-div-00'>
					<svg class='svg-00-div-00-div-00-sec-08-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 10 10 L 10 0 A 10 10 0 0 1 0 10 Z'></path>
					</svg>
					<label class='lbl-00-div-00-div-00-sec-08-div-00-div-00-div-00' contenteditable="true" placeholder="Location" style='pointer-events:none; background:none' data-gramm="false"></label>
					<svg class='svg-01-div-00-div-00-sec-08-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 0 10 L 0 0 A 10 10 0 0 0 10 10 Z'></path>
					</svg>
					<svg class='svg-02-div-00-div-00-sec-08-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none" style='display:none'>
						<path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z"></path>
					</svg>
					<svg class='svg-03-div-00-div-00-sec-08-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none" style='display:none'>
						<path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"></path>
					</svg>
					<svg class='svg-04-div-00-div-00-sec-08-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none" style='display:none'>
						<path d="M 0.5 5 L 3 7.5 L 9.5 2"></path>
					</svg>
				</div>

				<button class='btn-00-div-00-sec-08-div-00-div-00-div-00'>
					<svg class='svg-00-btn-00-div-00-sec-08-div-00-div-00-div-00' preserveAspectRatio="none" viewBox="0 0 10 10">
						<path d='M 5 2 L 5 8 M 2 5 L 8 5'></path>
					</svg>
				</button>
			</div>
			<div class='div-01-sec-08-div-00-div-00-div-00'>
				<div class='t-div-00-div-01-sec-08-div-00-div-00-div-00' style='opacity:0; display:none'>
					<div class='div-00-div-00-div-01-sec-08-div-00-div-00-div-00'>
						<div class='div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00'>
							<div class='div-01-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00'></div>
							<div class='div-00-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00'>
								<svg class='svg-00-div-00-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
									<path d='M9 16h-8v6h22v-6h-8v-1h9v8h-24v-8h9v1zm11 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-7.5 0h-1v-14.883l-4.735 5.732-.765-.644 6.021-7.205 5.979 7.195-.764.645-4.736-5.724v14.884z'></path>
								</svg>
								<label class='lbl-00-div-00-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00'>
									Upload Map
								</label>
							</div>
							<button class='btn-00-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00' style='display:none'>Reset Map</button>
						</div>
						<div class='div-01-div-00-div-00-div-01-sec-08-div-00-div-00-div-00'>
							<div class='div-00-div-01-div-00-div-00-div-01-sec-08-div-00-div-00-div-00'>
								<label>
									Map Zoom
								</label>
								<input class='ipt-00-div-00-div-01-div-00-div-00-div-01-sec-08-div-00-div-00-div-00' type='text'>
							</div>
							<div class='div-00-div-01-div-00-div-00-div-01-sec-08-div-00-div-00-div-00 pin-label'>
								<label>
									Pin Label
								</label>
								<input class='ipt-00-div-00-div-01-div-00-div-00-div-01-sec-08-div-00-div-00-div-00' type='text'>
							</div>
						</div>
					</div>
					<button class='btn-00-div-00-div-01-sec-08-div-00-div-00-div-00'>
						Add Walkscore
					</button>
					<div class='div-01-div-00-div-01-sec-08-div-00-div-00-div-00' style='display:none'>
						<button class='btn-00-div-01-div-00-div-01-sec-08-div-00-div-00-div-00' style='display:none'>Reset</button>
						<div class='div-00-div-01-div-00-div-01-sec-08-div-00-div-00-div-00'>
							<svg class='svg-00-div-00-div-01-div-00-div-01-sec-08-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
								<path d='M9 16h-8v6h22v-6h-8v-1h9v8h-24v-8h9v1zm11 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-7.5 0h-1v-14.883l-4.735 5.732-.765-.644 6.021-7.205 5.979 7.195-.764.645-4.736-5.724v14.884z'></path>
							</svg>
							<label class='lbl-00-div-00-div-01-div-00-div-01-sec-08-div-00-div-00-div-00'>
								Upload Walkscore
							</label>
						</div>
						<iframe style='display:none' scrolling='no'>
						
						</iframe>
						<button class='btn-01-div-01-div-00-div-01-sec-08-div-00-div-00-div-00'>Remove</button>
					</div>
				</div>
			</div>
		</section>

		<section class='t-sec-09-div-00-div-00-div-00'>
			<img class='img-00-sec-09-div-00-div-00-div-00' src='<?php echo $root ?>images/section_heading_icon/10.png'>
			<hr class='hr-00-sec-09-div-00-div-00-div-00'>
			<hr class='hr-01-sec-09-div-00-div-00-div-00'>
			<h2 class='h2-00-sec-09-div-00-div-00-div-00'>
				Schedule a Showing
			</h2>
			
			<div class='div-00-sec-09-div-00-div-00-div-00'>
				<h3 class='h3-00-div-00-sec-09-div-00-div-00-div-00'>
					Receiving Email Addresses
				</h3>
				<label class='lbl-00-div-00-sec-09-div-00-div-00-div-00'>
					Input email addresses to receive a notification for scheduled viewings
				</label>
				<div class='t-div-00-div-00-sec-09-div-00-div-00-div-00'>
					<svg class='svg-00-div-00-div-00-sec-09-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<circle cx='5' cy='5' r='5' style='fill:rgb(220,0,0); stroke:none'></circle>
						<path d='M 2 5 L 8 5' style='fill:none; stroke:rgb(50,0,110); stroke-width:1.5'></path>
					</svg>
					<input class='ipt-00-div-00-div-00-sec-09-div-00-div-00-div-00' type='text' placeholder='Email'>
				</div>
				<button class='btn-00-div-00-sec-09-div-00-div-00-div-00'>
					Add Email
				</button>
			</div>
		</section>



		<section class='t-sec-10-div-00-div-00-div-00'>
			<img class='img-00-sec-10-div-00-div-00-div-00' src='<?php echo $root ?>images/section_heading_icon/11.png'>
			<hr class='hr-00-sec-10-div-00-div-00-div-00'>
			<hr class='hr-01-sec-10-div-00-div-00-div-00'>
			<h2 class='h2-00-sec-10-div-00-div-00-div-00'>
				Loan Calculator	
			</h2>
			<label class='lbl-00-sec-10-div-00-div-00-div-00'>
				This section cannot be edited
			</label>
			<div class='div-00-sec-10-div-00-div-00-div-00'>
				<input class='ipt-00-div-00-sec-10-div-00-div-00-div-00' type='text' placeholder="Home Value">
				<label class='lbl-00-div-00-sec-10-div-00-div-00-div-00'>Required</label>
				<input class='ipt-00-div-00-sec-10-div-00-div-00-div-00' type='text' placeholder="Loan Amount">
				<label class='lbl-00-div-00-sec-10-div-00-div-00-div-00'>Required</label>
				<input class='ipt-00-div-00-sec-10-div-00-div-00-div-00' type='text' placeholder="Interest Rate">
				<label class='lbl-00-div-00-sec-10-div-00-div-00-div-00'>Required</label>
				<input class='ipt-00-div-00-sec-10-div-00-div-00-div-00' type='text' placeholder="Loan Term">
				<label class='lbl-00-div-00-sec-10-div-00-div-00-div-00'>Required</label>
				<input class='ipt-00-div-00-sec-10-div-00-div-00-div-00' type='text' placeholder="Property Tax">
				<label class='lbl-00-div-00-sec-10-div-00-div-00-div-00'>Required</label>
				<input class='ipt-00-div-00-sec-10-div-00-div-00-div-00' type='text' placeholder="PMI">
				<label class='lbl-00-div-00-sec-10-div-00-div-00-div-00'>Required</label>
				<input class='ipt-00-div-00-sec-10-div-00-div-00-div-00' type='text' placeholder="Home Insurance">
				<label class='lbl-00-div-00-sec-10-div-00-div-00-div-00'>Required</label>
				<input class='ipt-00-div-00-sec-10-div-00-div-00-div-00' type='text' placeholder="Monthly HOA">
				<label class='lbl-00-div-00-sec-10-div-00-div-00-div-00'>Required</label>

				<button class='btn-00-div-00-sec-10-div-00-div-00-div-00'> Calculate </button>
			</div>
		</section>







		<section class='t-sec-11-div-00-div-00-div-00'>
			<img class='img-00-sec-11-div-00-div-00-div-00' src='<?php echo $root ?>images/section_heading_icon/12.png'>
			<hr class='hr-00-sec-11-div-00-div-00-div-00'>
			<hr class='hr-01-sec-11-div-00-div-00-div-00'>
			<h2 class='h2-00-sec-11-div-00-div-00-div-00'>
				Additional Resources
			</h2>
			<div class='div-00-sec-11-div-00-div-00-div-00'>
				<div class='div-00-div-00-sec-11-div-00-div-00-div-00'>
					<!-- reorder images buttons -->
					<svg class='svg-02-div-00-div-00-sec-11-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 8.5 3.5 A 5 5 0 0 0 1.5 2 M 2.1 0.1 L 1.5 2 L 3.3 2.6'></path>
						<rect y='5' x='5' width='4.5' height='4.5'></rect>
					</svg>
					<svg class='svg-03-div-00-div-00-sec-11-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1.5 3.5 A 5 5 0 0 1 8.5 2 M 8 0.3 L 8.5 2 L 6.7 2.6'></path>
						<rect y='5' x='0.5' width='4.5' height='4.5'></rect>
					</svg>
					<svg class='svg-04-div-00-div-00-sec-11-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
						<path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"></path>
					</svg>
				</div>
				<div class='div-01-div-00-sec-11-div-00-div-00-div-00'>
					<div class='t-div-00-div-01-div-00-sec-11-div-00-div-00-div-00'>
						<object data=''></object>
						<div class='div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00'>
							<div class='div-00-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00'>
								<svg class='svg-00-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
									<path d='M 2 6 A 4 4 0 0 1 6 2 L 18 2 A 4 4 0 0 1 22 6 L 22 18 A 4 4 0 0 1 18 22 L 6 22 A 4 4 0 0 1 2 18 Z'></path>
								</svg>
								<label class='lbl-00-div-00-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00'>
									Drag &amp; Drop
								</label>
								<label class='lbl-01-div-00-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00' style='display:none'>
									5
								</label>
							</div>
							<div class='div-01-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00'>
								<hr>
								<label>or</label>
								<hr>
							</div>
							<div class='div-02-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00'>
								<svg class='svg-00-div-02-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
									<path d='M9 16h-8v6h22v-6h-8v-1h9v8h-24v-8h9v1zm11 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-7.5 0h-1v-14.883l-4.735 5.732-.765-.644 6.021-7.205 5.979 7.195-.764.645-4.736-5.724v14.884z'></path>
								</svg>
								<label class='lbl-00-div-02-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00'>
									Select File
								</label>
							</div>
						</div>
						<button class='btn-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00' style='display:none'>Reset File</button>
					</div>
				</div>
				<label class='lbl-00-div-00-sec-11-div-00-div-00-div-00'> 
					File 1 of 1
				</label>
				<div class='div-02-div-00-sec-11-div-00-div-00-div-00'>
					<svg class='svg-02-div-02-div-00-sec-11-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<rect y='1' x='0' width='10' height='8'></rect>
						<path d='M 6.5 5 L 3.5 5 M 5 3.5 L 3.5 5 L 5 6.5'></path>
					</svg>
					<svg class='svg-03-div-02-div-00-sec-11-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<rect y='1' x='0' width='10' height='8'></rect>
						<path d='M 3.5 5 L 6.5 5 M 5 3.5 L 6.5 5 L 5 6.5'></path>
					</svg>
					<div class='t-div-00-div-02-div-00-sec-11-div-00-div-00-div-00'>
						<h2 class='h2-00-div-00-div-02-div-00-sec-11-div-00-div-00-div-00' contenteditable="true" placeholder="title" data-gramm="false"></h2>
						<button class='btn-00-div-00-div-02-div-00-sec-11-div-00-div-00-div-00'>
							Add Description
						</button>
						<button class='btn-01-div-00-div-02-div-00-sec-11-div-00-div-00-div-00' style='display:none'>
							Remove Description
						</button>
						<p class='p-00-div-00-div-02-div-00-sec-11-div-00-div-00-div-00' contenteditable="true" placeholder="description" style='display:none' data-gramm="false"></p>
					</div>
				</div>
			</div>
		</section>





		<section class='t-sec-12-div-00-div-00-div-00'>
			<h2 class='h2-00-sec-12-div-00-div-00-div-00'>
				Listing Agent...
			</h2>
			<div class='div-00-sec-12-div-00-div-00-div-00'>
			<div class='div-00-div-00-sec-12-div-00-div-00-div-00'>
					
					<select class="h3-00-div-00-div-00-sec-12-div-00-div-00-div-00" id="select_agents" name="select_agents[]" multiple="multiple" style="border-radius:0 !important;width:80% !important;overflow:scroll !important;">
					<option value="" disabled>Choose your Agent</option>
					<?php 
					$requesturl =  $_SERVER['REQUEST_URI'];
					$position = strpos($requesturl, '/site-editor/');   
					if ($position == true){ 
						$explode_uri = explode('/',$requesturl);
						
						 $res = $conn->query('SELECT `site_sections`.section_id
												FROM `site_parameter`
												INNER JOIN `site_sections`
												ON `site_parameter`.id = `site_sections`.site_id
												where `site_parameter`.parameter ="'.$explode_uri[4].'" and
												`site_sections`.type = "12"');
												$section_id = $res->fetch_array();
												
						$res_agent = $conn->query('SELECT site_section_agent_id FROM `site_section_12_agents` WHERE section_id ="'.$section_id['section_id'].'"');
						$agent_id = $res_agent->fetch_array();

					} 
					$expl_agent = explode(',',$agent_id['site_section_agent_id']);
				
					
					$result = $conn->query("select id,full_name,email from agent");
				
					while ($row = $result->fetch_assoc()) {
						unset($id, $name);
						$id = $row['id'];
						$name = $row['full_name'];
						if(in_array($row['id'],$expl_agent)) $str_flag = "selected";
						else $str_flag="";
							echo '<option value="'.$id.'" ' . $str_flag . '>'.$name.' ('.$row['email'].')</option>';
							
						}

					?>
					</select>
			</div>
				<!-- <div class='div-00-div-00-sec-12-div-00-div-00-div-00'>
					<label class='lbl-00-div-00-div-00-sec-12-div-00-div-00-div-00'>Full Name</label>
					<h3 class='h3-00-div-00-div-00-sec-12-div-00-div-00-div-00' contenteditable="true" data-gramm="false"></h3>
					<label class='lbl-01-div-00-div-00-sec-12-div-00-div-00-div-00'>Occupation</label>
					<h4 class='h4-00-div-00-div-00-sec-12-div-00-div-00-div-00' contenteditable="true" data-gramm="false"></h4>
					<label class='lbl-02-div-00-div-00-sec-12-div-00-div-00-div-00'>Description</label>
					<p class='p-00-div-00-div-00-sec-12-div-00-div-00-div-00' contenteditable="true" data-gramm="false"></p>
					<label class='lbl-03-div-00-div-00-sec-12-div-00-div-00-div-00'>Mobile Number</label>
					<input class='ipt-00-div-00-div-00-sec-12-div-00-div-00-div-00' placeholder='1 (555) 555-1234'>
					<label class='lbl-04-div-00-div-00-sec-12-div-00-div-00-div-00'>Office Number</label>
					<input class='ipt-01-div-00-div-00-sec-12-div-00-div-00-div-00' placeholder='1 (555) 555-1234'>
					<label class='lbl-04-div-00-div-00-sec-12-div-00-div-00-div-00'>Social Media</label>
					<button class='btn-00-div-00-div-00-sec-12-div-00-div-00-div-00'>
						Manage
					</button>
					
					<div class='div-00-div-00-div-00-sec-12-div-00-div-00-div-00'>
						<img class='img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00' src='<?php //echo $root ?>images/null.png'>
					</div>
					
					<button class='btn-01-div-00-div-00-sec-12-div-00-div-00-div-00' style='display:none'>Reset Image</button>
					
					<div class='div-01-div-00-div-00-sec-12-div-00-div-00-div-00'>
						<div class='div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00'>
							<svg class='svg-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
								<path d='M 2 6 A 4 4 0 0 1 6 2 L 18 2 A 4 4 0 0 1 22 6 L 22 18 A 4 4 0 0 1 18 22 L 6 22 A 4 4 0 0 1 2 18 Z'></path>
							</svg>
							<label class='lbl-00-div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00'>
								Drag &amp; Drop
							</label>
							<label class='lbl-01-div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00' style='display:none'>
								5
							</label>
						</div>
						<div class='div-01-div-01-div-00-div-00-sec-12-div-00-div-00-div-00'>
							<hr>
							<label>or</label>
							<hr>
						</div>
						<div class='div-02-div-01-div-00-div-00-sec-12-div-00-div-00-div-00'>
							<svg class='svg-00-div-02-div-01-div-00-div-00-sec-12-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
								<path d='M9 16h-8v6h22v-6h-8v-1h9v8h-24v-8h9v1zm11 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-7.5 0h-1v-14.883l-4.735 5.732-.765-.644 6.021-7.205 5.979 7.195-.764.645-4.736-5.724v14.884z'></path>
							</svg>
							<label class='lbl-00-div-02-div-01-div-00-div-00-sec-12-div-00-div-00-div-00'>
								Select Image
							</label>
						</div>
					</div>
				</div>
				
				<div class='div-01-div-00-sec-12-div-00-div-00-div-00'>
					<button>
						Add Realtor
					</button>
				</div>
				
				<div class='div-00-div-00-sec-12-div-00-div-00-div-00' style='display:none'>
					<button class='btn-02-div-00-div-00-sec-12-div-00-div-00-div-00'>
						Remove Realtor
					</button>
					<label class='lbl-00-div-00-div-00-sec-12-div-00-div-00-div-00'>Full Name</label>
					<h3 class='h3-00-div-00-div-00-sec-12-div-00-div-00-div-00' contenteditable="true" data-gramm="false"></h3>
					<label class='lbl-01-div-00-div-00-sec-12-div-00-div-00-div-00'>Occupation</label>
					<h4 class='h4-00-div-00-div-00-sec-12-div-00-div-00-div-00' contenteditable="true" data-gramm="false"></h4>
					<label class='lbl-02-div-00-div-00-sec-12-div-00-div-00-div-00'>Description</label>
					<p class='p-00-div-00-div-00-sec-12-div-00-div-00-div-00' contenteditable="true" data-gramm="false"></p>
					<label class='lbl-03-div-00-div-00-sec-12-div-00-div-00-div-00'>Mobile Number</label>
					<input class='ipt-00-div-00-div-00-sec-12-div-00-div-00-div-00' placeholder='1 (555) 555-1234'>
					<label class='lbl-04-div-00-div-00-sec-12-div-00-div-00-div-00'>Office Number</label>
					<input class='ipt-01-div-00-div-00-sec-12-div-00-div-00-div-00' placeholder='1 (555) 555-1234'>
					<label class='lbl-04-div-00-div-00-sec-12-div-00-div-00-div-00'>Social Media</label>
					<button class='btn-00-div-00-div-00-sec-12-div-00-div-00-div-00'>
						Manage
					</button>
					
					<div class='div-00-div-00-div-00-sec-12-div-00-div-00-div-00'>
						<img class='img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00' src='<?php echo $root ?>images/null.png'>
					</div>
					
					<button class='btn-01-div-00-div-00-sec-12-div-00-div-00-div-00' style='display:none'>Reset Image</button>
					
					<div class='div-01-div-00-div-00-sec-12-div-00-div-00-div-00'>
						<div class='div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00'>
							<svg class='svg-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
								<path d='M 2 6 A 4 4 0 0 1 6 2 L 18 2 A 4 4 0 0 1 22 6 L 22 18 A 4 4 0 0 1 18 22 L 6 22 A 4 4 0 0 1 2 18 Z'></path>
							</svg>
							<label class='lbl-00-div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00'>
								Drag &amp; Drop
							</label>
							<label class='lbl-01-div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00' style='display:none'>
								5
							</label>
						</div>
						<div class='div-01-div-01-div-00-div-00-sec-12-div-00-div-00-div-00'>
							<hr>
							<label>or</label>
							<hr>
						</div>
						<div class='div-02-div-01-div-00-div-00-sec-12-div-00-div-00-div-00'>
							<svg class='svg-00-div-02-div-01-div-00-div-00-sec-12-div-00-div-00-div-00' viewBox="0 0 24 24" preserveAspectRatio="none">
								<path d='M9 16h-8v6h22v-6h-8v-1h9v8h-24v-8h9v1zm11 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-7.5 0h-1v-14.883l-4.735 5.732-.765-.644 6.021-7.205 5.979 7.195-.764.645-4.736-5.724v14.884z'></path>
							</svg>
							<label class='lbl-00-div-02-div-01-div-00-div-00-sec-12-div-00-div-00-div-00'>
								Select Image
							</label>
						</div>
					</div>
				</div> -->
			</div>
		</section>
	</div>
</div>

<div id='div-01-div-00' style='opacity:0; pointer-events:none'>
	<div id='div-00-div-01-div-00' style='display:none'>
		<h3 id='h3-00-div-00-div-01-div-00'>
			Are you sure you want to leave the editor without uploading?
		</h3>
		<button id='btn-00-div-00-div-01-div-00'>
			Yes
		</button>
		<button id='btn-01-div-00-div-01-div-00'>
			Continue Editing
		</button>
	</div>
	
	<div id='div-01-div-01-div-00' style='display:none'>
		<div id='div-00-div-01-div-01-div-00'></div>
		<h3 id='h3-00-div-01-div-01-div-00'>
			Uploading Site...
		</h3>
		<button id='btn-00-div-01-div-01-div-00' style='pointer-events:none'>
			View Site
		</button>
		<button id='btn-01-div-01-div-01-div-00'>
			Close
		</button>
	</div>
	
	
	<div id='div-02-div-01-div-00' style='display:none'>
		<svg id='svg-00-div-02-div-01-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
			<path d='M 1 1 L 9 9 M 1 9 L 9 1' style='stroke-width:2px; fill:none'></path>
		</svg>
		<img id='img-00-div-02-div-01-div-00' src='<?php echo $root ?>images/admin/site-editor/vimeo-logo.png'>
		<lbl id='lbl-00-div-02-div-01-div-00'>
			Embed Link
		</lbl>
		<textarea id='txt-00-div-02-div-01-div-00' 
		placeholder="<object width=”500″ height=”281″><param name=”allowfullscreen” value=”true”>
		<param name=”allowscriptaccess” value=”always” />
		<param name=”movie” value=”http://vimeo.com/moogaloop.swf?clip_id=5367093&server=vimeo.com&show_title=1&show_byline=1&show_portrait=0&color=00adef&fullscreen=1″ />
		<embed src=”http://vimeo.com/moogaloop.swf?clip_id=5367093&server=vimeo.com&show_title=1&show_byline=1&show_portrait=0&color=00adef&fullscreen=1″ type=”application/x-shockwave-flash” allowfullscreen=”true” allowscriptaccess=”always” width=”500″ height=”281″></embed>
		</object>" type='text' data-gramm="false"></textarea>
		<button id='btn-00-div-02-div-01-div-00'>
			Upload
		</button>
	</div>
	
	<div id='div-03-div-01-div-00' style='display:none'>
		<svg id='svg-00-div-03-div-01-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
			<path d='M 1 1 L 9 9 M 1 9 L 9 1' style='stroke-width:2px; fill:none'></path>
		</svg>
		<img id='img-00-div-03-div-01-div-00' src='<?php echo $root ?>images/admin/site-editor/matterport-logo-small.png'>
		<lbl id='lbl-00-div-03-div-01-div-00'>
			Embed Link
		</lbl>
		<input id='ipt-00-div-03-div-01-div-00' placeholder="https://my.matterport.com/show/20235919563" type='text'>
		<button id='btn-00-div-03-div-01-div-00'>
			Upload
		</button>
	</div>
	
	
	<div id='div-04-div-01-div-00' style='display:none'>
		<svg id='svg-00-div-04-div-01-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
			<path d='M 1 1 L 9 9 M 1 9 L 9 1' style='stroke-width:2px; fill:none'></path>
		</svg>
		<img id='img-00-div-04-div-01-div-00' src='<?php echo $root ?>images/admin/site-editor/google-maps-logo-small.png'>
		<lbl id='lbl-00-div-04-div-01-div-00'>
			First Address Line
		</lbl>
		<input id='ipt-00-div-04-div-01-div-00' placeholder="1234 56th Street" type='text'>
		<button id='btn-00-div-04-div-01-div-00'>
			Upload
		</button>
	</div>
	
	<div id='div-05-div-01-div-00' style='display:none'>
		<svg id='svg-00-div-05-div-01-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
			<path d='M 1 1 L 9 9 M 1 9 L 9 1' style='stroke-width:2px; fill:none'></path>
		</svg>
		<img id='img-00-div-05-div-01-div-00' src='<?php echo $root ?>images/admin/site-editor/walk-score-logo-small.png'>
		<lbl id='lbl-00-div-05-div-01-div-00'>
			Embed Code
		</lbl>
		<textarea id='txt-00-div-05-div-01-div-00' 
			placeholder="<script type='text/javascript'>
			var ws_wsid = 'g97356b966b4b44c28b3a2a895c5b2032';
			var ws_address = '1060 Lombard Street, San Francisco, CA';
			var ws_format = 'tall';
			var ws_width = '400';
			var ws_height = '500';
			</script>
			<style type='text/css'>
			#ws-walkscore-tile{position:relative;text-align:left}#ws-walkscore-tile *{float:none;}
			</style>
			<div id='ws-walkscore-tile'></div>
			<script type='text/javascript' src='http://www.walkscore.com/tile/show-walkscore-tile.php'></script>"  data-gramm="false"></textarea>
		<button id='btn-00-div-05-div-01-div-00'>
			Upload
		</button>
	</div>
	
	
	<div id='div-06-div-01-div-00' style='display:none'>
		<svg id='svg-00-div-06-div-01-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
			<path d='M 1 1 L 9 9 M 1 9 L 9 1' style='stroke-width:2px; fill:none'></path>
		</svg>
		<div class='div-00-div-06-div-01-div-00'>
			<svg viewBox="0 0 24 24" preserveAspectRatio="none" style='background-color:rgb(59,89,152)'>
				<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
			</svg>
			<input type='text' placeholder='https://www.facebook.com/john_smith'>
		</div>
		<div class='div-00-div-06-div-01-div-00'>
			<svg viewBox="0 0 24 24" preserveAspectRatio="none" style='background-color:rgb(255,60,60)'>
				<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"></path>
			</svg>
			<input type='text' placeholder='john-smith@email.com'>
		</div>
		<div class='div-00-div-06-div-01-div-00'>
			<svg viewBox="0 0 24 24" preserveAspectRatio="none" style='background-color:rgb(50,110,255)'>
				<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"></path>
			</svg>
			<input type='text' placeholder='https://www.john-smith.com'>
		</div>
		<button id='btn-00-div-06-div-01-div-00'>
			Upload
		</button>
	</div>
</div>

<div id='div-02-div-00'>
	<div id='div-00-div-02-div-00' style='pointer-events:none; opacity:0; transform: translate(0, -50px); display:none'>
		<svg viewBox="0 0 10 10" preserveAspectRatio="none">
			<line x1='5' x2='5' y1='2.5' y2='5.5'></line>
			<circle cx='5' cy='7' r='0.4'></circle>
			<path d='M 5 1 A 4 4 0 0 1 5 9 A 4 4 0 0 1 5 1'></path>
		</svg>
		<p id='p-00-div-00-div-02-div-00'>
			FILENAME.jpg and 6 other files are in use on the following websites:<br>
			<span>
				&#8226; Talbot Run <br>
				&#8226; Test Site<br>
			</span>

			The files will remain visible on the above sites. To permanently remove the file, go to <a target='_blank' href='<?php echo $root ?>admin/sites/files'>the file manager</a>.
		</p>
	</div>
	<div id='div-01-div-02-div-00' style='pointer-events:none; opacity:0; transform: translate(0, -50px); display:none'>
		<svg viewBox="0 0 10 10" preserveAspectRatio="none">
			<line x1='5' x2='5' y1='2.5' y2='5.5'></line>
			<circle cx='5' cy='7' r='0.4'></circle>
			<path d='M 5 1 A 4 4 0 0 1 5 9 A 4 4 0 0 1 5 1'></path>
		</svg>
		<p id='p-00-div-01-div-02-div-00'>
			The following files could not be deleted:<br>
			<span>
				&#8226; Talbot Run <br>
				&#8226; Test Site<br>
			</span>
			These files are in use on this site and must be removed first.
		</p>
	</div>
	<div id='div-02-div-02-div-00' style='pointer-events:none; opacity:0; transform: translate(0, -50px); display:none'>
		<svg viewBox="0 0 10 10" preserveAspectRatio="none">
			<line x1='5' x2='5' y1='2.5' y2='5.5'></line>
			<circle cx='5' cy='7' r='0.4'></circle>
			<path d='M 5 1 A 4 4 0 0 1 5 9 A 4 4 0 0 1 5 1'></path>
		</svg>
		<p id='p-00-div-02-div-02-div-00'>
			You cannot add images of this type to the gallery
		</p>
	</div>
</div>


<span id='spn-02-div-00' style='pointer-events:none; opacity:0; transform:translate(0,-0px)'>
	<svg viewBox="0 0 10 10" preserveAspectRatio="none">
		<line x1='5' x2='5' y1='2.5' y2='5.5'></line>
		<circle cx='5' cy='7' r='0.4'></circle>
		<path d='M 5 1 A 4 4 0 0 1 5 9 A 4 4 0 0 1 5 1'></path>
	</svg>
	<p id='p-00-spn-02-div-00'> </p>
	<button id='btn-00-spn-02-div-00'>Close</button>
</span>

<script type='text/javascript'>
	function initMap(el, map_x, map_y) {
		var map = new google.maps.Map(el, {
		center: {lat: map_x, lng: map_y},
		zoom: 8
		});
		return map;
	}
</script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_tuwnGLFy9WyS5fvdjU2P8A72uaNsQa8&callback=initMap"></script>

<script type='text/javascript' src='<?php echo $root ?>admin/sites/site-editor.js?ts=<?php echo $version_num ?>'></script>

</div>

<span id='spn-00'>
	<h3>The device you are using is too small. Please use on a laptop or desktop.</h3>
	<div>
		<svg viewBox="0 0 24 24" preserveAspectRatio="none">
			<path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 6h2v8h-2v-8zm1 12.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"></path>
		</svg>
		<label>
		Make sure you are viewing at 100% zoom, with a full screen width window
		</label>
	</div>
</span>

<?php 

include($_SERVER['DOCUMENT_ROOT'].'/admin/footer.php');

} else {
	$url_parameter = substr($_SERVER['REQUEST_URI'], 1);
	$url_parameter = preg_replace("/\//", "~", $url_parameter);
	$url_parameter = preg_replace("/\?/", "%", $url_parameter);
	$url_parameter = preg_replace("/\&/", "+", $url_parameter);
	
	header('Location: '.$root.'admin/login.php?url='.$url_parameter);
}

