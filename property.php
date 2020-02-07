<?php 
error_reporting(0);
$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

$site_id = -1;

$site_parameter = $_GET["parameter"];

$site_name = '';

$site_active = false;
$site_scheduled_ts = 0;
$site_start_open_house_ts = 0;
$site_end_open_house_ts = 0;
$site_url = '';
$site_section_id = null;
$preview_image_src = '';

include($_SERVER['DOCUMENT_ROOT'].'/processes/db-conn.php');

if(is_string($site_parameter)){
	
	if($stmt = $conn->prepare("SELECT id FROM site_parameter WHERE parameter=?")){
		$stmt->bind_param('s', $site_parameter);

		$stmt->execute();
		$stmt->bind_result($id);
		$stmt->fetch();
		$site_id = $id;
		$stmt->close();
	}
	
	if($stmt = $conn->prepare("SELECT name FROM site_preview_data WHERE id=?")){
		$stmt->bind_param('i', $site_id);

		$stmt->execute();
		$stmt->bind_result($name);
		$stmt->fetch();
		$site_name = $name;
		$stmt->close();
	}
	
	if($stmt = $conn->prepare("SELECT url FROM site_preview_data WHERE id=?")){
		$stmt->bind_param('i', $site_id);

		$stmt->execute();
		$stmt->bind_result($url);
		$stmt->fetch();
		$site_url = $url;
		$stmt->close();
	}
	
	if($stmt = $conn->prepare("SELECT schedule_ts FROM site_schedule_timestamp WHERE id=?")){
		$stmt->bind_param('i', $site_id);

		$stmt->execute();
		$stmt->bind_result($schedule_ts);
		$stmt->fetch();
		$site_scheduled_ts = $schedule_ts;
		$stmt->close();
	}
	
	if($stmt = $conn->prepare("SELECT start_open_house_ts, end_open_house_ts FROM site_open_house_timestamp WHERE id=?")){
		$stmt->bind_param('i', $site_id);

		$stmt->execute();
		$stmt->bind_result($start_open_house_ts, $end_open_house_ts);
		$stmt->fetch();
		$site_start_open_house_ts = $start_open_house_ts;
		$site_end_open_house_ts = $end_open_house_ts;
		$stmt->close();
	}
	
	if($stmt = $conn->prepare("SELECT state FROM site_state WHERE id=?")){
		$stmt->bind_param('i', $site_id);

		$stmt->execute();
		$stmt->bind_result($state);
		$stmt->fetch();
		$site_state = $state;
		$stmt->close();
	}
	
	if($stmt = $conn->prepare("SELECT section_id FROM site_sections WHERE type=0 AND site_id=?")){
		$stmt->bind_param('i', $site_id);

		$stmt->execute();
		$stmt->bind_result($section_id);
		$stmt->fetch();
		$site_section_id = $section_id;
		$stmt->close();
	}
	
	if($site_section_id !== null){
		if($stmt = $conn->prepare("SELECT image_src FROM site_section_00 WHERE section_id=?")){
			$stmt->bind_param('i', $site_section_id);

			$stmt->execute();
			$stmt->bind_result($image_src);
			$stmt->fetch();
			$preview_image_src = $image_src;
			$stmt->close();
		}
	}
}

if($site_state !== 1){
	$site_id = 0;
}

include($_SERVER['DOCUMENT_ROOT'].'/processes/metric-visitor-initialise.php');


$page_title = "property";

include($_SERVER['DOCUMENT_ROOT'].'/includes/header.php');
?>
<script type='text/javascript'>
	
	var SITE_ID = <?php echo json_encode($site_id) ?>;
	
	var URL = '<?php echo 'http://'.$site_url ?>';
	
	var SITE_START_OPEN_HOUSE_TS = <?php echo json_encode($site_start_open_house_ts) ?>;
	
	var SITE_END_OPEN_HOUSE_TS = <?php echo json_encode($site_end_open_house_ts) ?>;
	
	var INTERACTIONS = [];
	
	var VISITOR_ID = <?php echo json_encode($visitor_id) * 1 ?>;
	
</script>

<script type='text/javascript' src="//wurfl.io/wurfl.js"></script>






<div id='div-00-div-00'>
	<?php if($site_state === 1){ ?>
	<div id='div-00-div-00-div-00'>
		
		<section class='t-spn-00-div-00-div-00-div-00'>
			<h3> Open House </h3>
			<h4> 03/06/19 at 10:52am </h4>
			<button>Request Details</button>
		</section>
		
		<section class='t-sec-00-div-00-div-00-div-00'>
			<div class='div-00-sec-00-div-00-div-00-div-00'>
				<img class='img-00-div-00-sec-00-div-00-div-00-div-00' src='<?php echo $root ?>images/null.png'>
			</div>
		</section>

		<section class='t-sec-01-div-00-div-00-div-00'>
			<div class='div-00-sec-01-div-00-div-00-div-00'>
				<h1 class='h1-00-div-00-sec-01-div-00-div-00-div-00'></h1>
				
				<h2 class='h2-00-div-00-sec-01-div-00-div-00-div-00'></h2>
				
				<h2 class='h2-01-div-00-sec-01-div-00-div-00-div-00'></h2>
				
				<h3 class='h3-00-div-00-sec-01-div-00-div-00-div-00'></h3>
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
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00'></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						Bedrooms
					</label>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/fireplaces_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00'></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						Fireplaces
					</label>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/bathrooms_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00'></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						Bathrooms
					</label>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/year_built_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00'></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						Year Built
					</label>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/tax_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00'></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						Taxes
					</label>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/assn_fees_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00'></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						ASSN Fees
					</label>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/house_size_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00'></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						House Size (sqft)
					</label>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/lot_size_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00'></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						Lot Size (acres)
					</label>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/parking_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00'></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						Parking Spaces
					</label>
				</div>
				<div class='div-00-div-01-sec-02-div-00-div-00-div-00'> 
					<img class='img-00-div-00-div-01-sec-02-div-00-div-00-div-00' src='<?php echo $root ?>images/property_info_icons/levels_icon.png'>
					<div class='div-00-div-00-div-01-sec-02-div-00-div-00-div-00'>
						<label class='lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00'></label>
					</div>
					<label class='lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00'>
						Levels
					</label>
				</div>
				<div class='t-div-01-div-01-sec-02-div-00-div-00-div-00'></div>
			</div>
			<div class='div-02-sec-02-div-00-div-00-div-00'></div>
		</section>


		<section class='t-sec-03-div-00-div-00-div-00'>
			<div class='div-00-sec-03-div-00-div-00-div-00'>
				<img class='img-00-div-00-sec-03-div-00-div-00-div-00'>
			</div>
		</section>


		<section class='t-sec-04-div-00-div-00-div-00'>
			<img class='img-00-sec-04-div-00-div-00-div-00' src='<?php echo $root ?>images/section_heading_icon/04.png'>
			<hr class='hr-00-sec-04-div-00-div-00-div-00'>
			<hr class='hr-01-sec-04-div-00-div-00-div-00'>
			<h2 class='h2-00-sec-04-div-00-div-00-div-00'>
				Photo Gallery
			</h2>
			<div class='div-00-sec-04-div-00-div-00-div-00'>
				<div class='t-div-00-div-00-sec-04-div-00-div-00-div-00'>
					<svg class='svg-00-div-00-div-00-sec-04-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 10 10 L 10 0 A 10 10 0 0 1 0 10 Z'></path>
					</svg>
					<label class='lbl-00-div-00-div-00-sec-04-div-00-div-00-div-00' style='pointer-events:none; background:none'></label>
					<svg class='svg-01-div-00-div-00-sec-04-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 0 10 L 0 0 A 10 10 0 0 0 10 10 Z'></path>
					</svg>
				</div>
			</div>
			<div class='div-01-sec-04-div-00-div-00-div-00'>
				<div class='t-div-00-div-01-sec-04-div-00-div-00-div-00' style='opacity:0; display:none'>
					<div class='div-00-div-00-div-01-sec-04-div-00-div-00-div-00'>
						<div class='t-div-00-div-00-div-00-div-01-sec-04-div-00-div-00-div-00'>
							<img class='img-00-div-00-div-00-div-00-div-01-sec-04-div-00-div-00-div-00' src='<?php echo $root ?>images/null.png'>
						</div>
					</div>
					<label class='lbl-00-div-01-sec-04-div-00-div-00-div-00'> 
						Image 1 of 1
					</label>
					<div class='div-02-div-01-sec-04-div-00-div-00-div-00'>
						<svg class='svg-02-div-02-div-01-sec-04-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
							<rect y='1' x='0' width='10' height='8'></rect>
							<path d='M 6.5 5 L 3.5 5 M 5 3.5 L 3.5 5 L 5 6.5'></path>
						</svg>
						<svg class='svg-03-div-02-div-01-sec-04-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
							<rect y='1' x='0' width='10' height='8'></rect>
							<path d='M 3.5 5 L 6.5 5 M 5 3.5 L 6.5 5 L 5 6.5'></path>
						</svg>
						<div class='t-div-00-div-02-div-01-sec-04-div-00-div-00-div-00'>
							<h2 class='h2-00-div-00-div-02-div-01-sec-04-div-00-div-00-div-00'></h2>
							<p class='p-00-div-00-div-02-div-01-sec-04-div-00-div-00-div-00'></p>
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
			</div>
		</section>

		<section class='t-sec-06-div-00-div-00-div-00'>
			<img class='img-00-sec-06-div-00-div-00-div-00' src='<?php echo $root ?>images/section_heading_icon/06.png'>
			<hr class='hr-00-sec-06-div-00-div-00-div-00'>
			<hr class='hr-01-sec-06-div-00-div-00-div-00'>
			<h2 class='h2-00-sec-06-div-00-div-00-div-00'>
				Take a 3D Tour
			</h2>
			<div class='div-00-sec-06-div-00-div-00-div-00'>
				
				<div class='t-div-00-div-00-sec-06-div-00-div-00-div-00'>
					<svg class='svg-00-div-00-div-00-sec-06-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 10 10 L 10 0 A 10 10 0 0 1 0 10 Z'></path>
					</svg>
					<label class='lbl-00-div-00-div-00-sec-06-div-00-div-00-div-00' style='pointer-events:none; background:none'></label>
					<svg class='svg-01-div-00-div-00-sec-06-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 0 10 L 0 0 A 10 10 0 0 0 10 10 Z'></path>
					</svg>
				</div>
			</div>
			<div class='div-01-sec-06-div-00-div-00-div-00'>
				<div class='t-div-00-div-01-sec-06-div-00-div-00-div-00' style='opacity:0; display:none'>
					<iframe frameborder="0" allowfullscreen allow="vr" style='display:none'></iframe>
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
					<div class='t-div-00-div-00-div-00-sec-07-div-00-div-00-div-00'>
						<img class='img-00-div-00-div-00-div-00-sec-07-div-00-div-00-div-00' src='<?php echo $root ?>images/null.png'>
					</div>
				</div>
				<label class='lbl-00-div-00-sec-07-div-00-div-00-div-00'> 
					Floorplan 1 of 1
				</label>
				<div class='div-01-div-00-sec-07-div-00-div-00-div-00'>
					<svg class='svg-02-div-01-div-00-sec-07-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<rect y='1' x='0' width='10' height='8'></rect>
						<path d='M 6.5 5 L 3.5 5 M 5 3.5 L 3.5 5 L 5 6.5'></path>
					</svg>
					<svg class='svg-03-div-01-div-00-sec-07-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<rect y='1' x='0' width='10' height='8'></rect>
						<path d='M 3.5 5 L 6.5 5 M 5 3.5 L 6.5 5 L 5 6.5'></path>
					</svg>
					<div class='t-div-00-div-01-div-00-sec-07-div-00-div-00-div-00'>
						<h2 class='h2-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00'></h2>
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
			<div class='div-00-sec-08-div-00-div-00-div-00'>
				
				<div class='t-div-00-div-00-sec-08-div-00-div-00-div-00'>
					<svg class='svg-00-div-00-div-00-sec-08-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 10 10 L 10 0 A 10 10 0 0 1 0 10 Z'></path>
					</svg>
					<label class='lbl-00-div-00-div-00-sec-08-div-00-div-00-div-00' style='pointer-events:none; background:none'></label>
					<svg class='svg-01-div-00-div-00-sec-08-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 0 10 L 0 0 A 10 10 0 0 0 10 10 Z'></path>
					</svg>
				</div>
			</div>
			<div class='div-01-sec-08-div-00-div-00-div-00'>
				<div class='t-div-00-div-01-sec-08-div-00-div-00-div-00' style='opacity:0; display:none'>
					<div class='div-00-div-00-div-01-sec-08-div-00-div-00-div-00'>
						<!-- map -->
					</div>
					
					<div class='div-01-div-00-div-01-sec-08-div-00-div-00-div-00' style='display:none'>
						<!-- walkscore -->
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
				<div class='div-00-div-00-sec-09-div-00-div-00-div-00'>
					<div class='div-00-div-00-div-00-sec-09-div-00-div-00-div-00' style='display:none'>

					</div>
				</div>
				<label class='lbl-00-div-00-sec-09-div-00-div-00-div-00'>I need a specific date &amp; time</label>
				<div class='div-01-div-00-sec-09-div-00-div-00-div-00'>
					<div class='div-00-div-01-div-00-sec-09-div-00-div-00-div-00' style='display:none'>

					</div>
				</div>
				<label class='lbl-01-div-00-sec-09-div-00-div-00-div-00'>I'm flexible</label>
			</div>
			<div class='div-01-sec-09-div-00-div-00-div-00'>
				<!-- calendar -->
				<button class='btn-00-div-01-sec-09-div-00-div-00-div-00'>
					<svg class='svg-00-btn-00-div-01-sec-09-div-00-div-00-div-00' preserveAspectRatio="none" viewBox="0 0 10 10">
						<path class='pth-00-svg-00-btn-00-div-01-sec-09-div-00-div-00-div-00' d='M 7 1 L 3 5 L 7 9'></path>
					</svg>
					May
				</button>
				<button class='btn-01-div-01-sec-09-div-00-div-00-div-00'>
					<svg class='svg-00-btn-01-div-01-sec-09-div-00-div-00-div-00' preserveAspectRatio="none" viewBox="0 0 10 10">
						<path class='pth-00-svg-00-btn-01-div-01-sec-09-div-00-div-00-div-00' d='M 3 1 L 7 5 L 3 9'></path>
					</svg>
					July
				</button>

				<h3 class='h3-00-div-01-sec-09-div-00-div-00-div-00'>
					June 2018
				</h3>

				<div class='div-00-div-01-sec-09-div-00-div-00-div-00'>
					<div class='div-00-div-00-div-01-sec-09-div-00-div-00-div-00'>Mon</div>
					<div class='div-00-div-00-div-01-sec-09-div-00-div-00-div-00'>Tue</div>
					<div class='div-00-div-00-div-01-sec-09-div-00-div-00-div-00'>Wed</div>
					<div class='div-00-div-00-div-01-sec-09-div-00-div-00-div-00'>Thur</div>
					<div class='div-00-div-00-div-01-sec-09-div-00-div-00-div-00'>Fri</div>
					<div class='div-00-div-00-div-01-sec-09-div-00-div-00-div-00'>Sat</div>
					<div class='div-00-div-00-div-01-sec-09-div-00-div-00-div-00'>Sun</div>

					<div class='div-02-div-00-div-01-sec-09-div-00-div-00-div-00'>28</div>
					<div class='div-02-div-00-div-01-sec-09-div-00-div-00-div-00'>29</div>
					<div class='div-02-div-00-div-01-sec-09-div-00-div-00-div-00'>30</div>
					<div class='div-02-div-00-div-01-sec-09-div-00-div-00-div-00'>31</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>01</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>02</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>03</div>

					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>04</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>05</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>06</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>07</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>08</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>09</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>10</div>

					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>11</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>12</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>13</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>14</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>15</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>16</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>17</div>

					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>18</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>19</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>20</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>21</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>22</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>23</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>24</div>

					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>25</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>26</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>27</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>28</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>29</div>
					<div class='div-01-div-00-div-01-sec-09-div-00-div-00-div-00'>30</div>
					<div class='div-02-div-00-div-01-sec-09-div-00-div-00-div-00'>01</div>

				</div>
			</div>
			<div class='div-02-sec-09-div-00-div-00-div-00'>
				<!-- hour -->
				<div class='div-00-div-02-sec-09-div-00-div-00-div-00'></div>
				<div class='div-01-div-02-sec-09-div-00-div-00-div-00'></div>

				<label class='lbl-00-div-02-sec-09-div-00-div-00-div-00'>
					<svg class='svg-00-lbl-00-div-02-sec-09-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 0 7 L 10 7 L 5 1 Z' style='fill:rgb(50,50,50); stroke:none'></path>
					</svg>
					Hour
					<svg class='svg-01-lbl-00-div-02-sec-09-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 0 7 L 10 7 L 5 1 Z' style='fill:rgb(50,50,50); stroke:none'></path>
					</svg>
				</label>
			</div>
			<div class='div-03-sec-09-div-00-div-00-div-00'>
				<!-- minute -->
				<div class='div-00-div-03-sec-09-div-00-div-00-div-00'></div>
				<div class='div-01-div-03-sec-09-div-00-div-00-div-00'></div>

				<label class='lbl-00-div-03-sec-09-div-00-div-00-div-00'>
					<svg class='svg-00-lbl-00-div-03-sec-09-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 0 8 L 10 8 L 5 2 Z' style='fill:rgb(50,50,50); stroke:none'></path>
					</svg>
					Minute
					<svg class='svg-01-lbl-00-div-03-sec-09-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 0 8 L 10 8 L 5 2 Z' style='fill:rgb(50,50,50); stroke:none'></path>
					</svg>
				</label>
			</div>
			<div class='div-04-sec-09-div-00-div-00-div-00' style='opacity:none'>
				<!-- hour selector -->

				<div class='div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
					9 
					<label class='lbl-00-div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
						AM
					</label>
				</div>
				<div class='div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
					10 
					<label class='lbl-00-div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
						AM
					</label>
				</div>
				<div class='div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
					11
					<label class='lbl-00-div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
						AM
					</label>
				</div>
				<div class='div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
					12
					<label class='lbl-00-div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
						PM
					</label>
				</div>
				<div class='div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
					1
					<label class='lbl-00-div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
						PM
					</label>
				</div>
				<div class='div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
					2
					<label class='lbl-00-div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
						PM
					</label>
				</div>
				<div class='div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
					3 
					<label class='lbl-00-div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
						PM
					</label>
				</div>
				<div class='div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
					4
					<label class='lbl-00-div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
						PM
					</label>
				</div>
				<div class='div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
					5
					<label class='lbl-00-div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
						PM
					</label>
				</div>
				<div class='div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
					6
					<label class='lbl-00-div-00-div-00-div-04-sec-09-div-00-div-00-div-00'>
						PM
					</label>
				</div>
			</div>
			<div class='div-05-sec-09-div-00-div-00-div-00' style='opacity:none'>
				<!-- minute selector -->

				<div class='div-00-div-00-div-05-sec-09-div-00-div-00-div-00'>
					:00
				</div>
				<div class='div-00-div-00-div-05-sec-09-div-00-div-00-div-00'>
					:05 
				</div>
				<div class='div-00-div-00-div-05-sec-09-div-00-div-00-div-00'>
					:10
				</div>
				<div class='div-00-div-00-div-05-sec-09-div-00-div-00-div-00'>
					:15
				</div>
				<div class='div-00-div-00-div-05-sec-09-div-00-div-00-div-00'>
					:20
				</div>
				<div class='div-00-div-00-div-05-sec-09-div-00-div-00-div-00'>
					:25
				</div>
				<div class='div-00-div-00-div-05-sec-09-div-00-div-00-div-00'>
					:30
				</div>
				<div class='div-00-div-00-div-05-sec-09-div-00-div-00-div-00'>
					:35
				</div>
				<div class='div-00-div-00-div-05-sec-09-div-00-div-00-div-00'>
					:40
				</div>
				<div class='div-00-div-00-div-05-sec-09-div-00-div-00-div-00'>
					:45
				</div>
				<div class='div-00-div-00-div-05-sec-09-div-00-div-00-div-00'>
					:50
				</div>
				<div class='div-00-div-00-div-05-sec-09-div-00-div-00-div-00'>
					:55
				</div>
			</div>

			<div class='div-06-sec-09-div-00-div-00-div-00'>
				<input class='ipt-00-div-06-sec-09-div-00-div-00-div-00' type='text' placeholder='First Name*'>
				<label class='lbl-00-div-06-sec-09-div-00-div-00-div-00'>Required</label>
				<input class='ipt-00-div-06-sec-09-div-00-div-00-div-00' type='text' placeholder="Last Name*">
				<label class='lbl-00-div-06-sec-09-div-00-div-00-div-00'>Required</label>
				<input class='ipt-00-div-06-sec-09-div-00-div-00-div-00' type='email' placeholder="Email*">
				<label class='lbl-00-div-06-sec-09-div-00-div-00-div-00'>Required</label>
				<input class='ipt-00-div-06-sec-09-div-00-div-00-div-00' type='tel' placeholder="Telephone Number*">
				<label class='lbl-00-div-06-sec-09-div-00-div-00-div-00'>Required</label>

				<button class='btn-00-div-06-sec-09-div-00-div-00-div-00'> Schedule </button>
			</div>

		</section>



		<section class='t-sec-10-div-00-div-00-div-00'>
			<img class='img-00-sec-10-div-00-div-00-div-00' src='<?php echo $root ?>images/section_heading_icon/11.png'>
			<hr class='hr-00-sec-10-div-00-div-00-div-00'>
			<hr class='hr-01-sec-10-div-00-div-00-div-00'>
			<h2 class='h2-00-sec-10-div-00-div-00-div-00'>
				Mortgage Calculator	
			</h2>
			<div class='div-00-sec-10-div-00-div-00-div-00'>
				<label class='lbl-00-div-00-sec-10-div-00-div-00-div-00'>Property Price</label>
				<label class='lbl-01-div-00-sec-10-div-00-div-00-div-00'></label>
				<label class='lbl-00-div-00-sec-10-div-00-div-00-div-00'>Down Payment</label>
				<input class='ipt-00-div-00-sec-10-div-00-div-00-div-00' type='text' placeholder="10%">
				<label class='lbl-00-div-00-sec-10-div-00-div-00-div-00'>Mortgage Term</label>
				<input class='ipt-00-div-00-sec-10-div-00-div-00-div-00' type='text' placeholder="30 Years">
				<label class='lbl-00-div-00-sec-10-div-00-div-00-div-00'>Interest Rate</label>
				<input class='ipt-00-div-00-sec-10-div-00-div-00-div-00' type='text' placeholder="4.5%">
				<label class='lbl-00-div-00-sec-10-div-00-div-00-div-00'>Property Tax</label>
				<input class='ipt-00-div-00-sec-10-div-00-div-00-div-00' type='text' placeholder="$5,000/month">
				<label class='lbl-00-div-00-sec-10-div-00-div-00-div-00'>Property Insurance</label>
				<input class='ipt-00-div-00-sec-10-div-00-div-00-div-00' type='text' placeholder="$2,500/month">
				<label class='lbl-00-div-00-sec-10-div-00-div-00-div-00'>PMI</label>
				<input class='ipt-00-div-00-sec-10-div-00-div-00-div-00' type='text' placeholder="0.52%">
				<label class='lbl-00-div-00-sec-10-div-00-div-00-div-00'>First Payment Date</label>
				<div class='div-00-div-00-sec-10-div-00-div-00-div-00'>
					<svg class='svg-00-div-00-div-00-sec-10-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 1 3 L 9 3 L 5 8 Z'></path>
					</svg>
					<div class='div-00-div-00-div-00-sec-10-div-00-div-00-div-00'>January 2019</div>
					<div class='div-00-div-00-div-00-sec-10-div-00-div-00-div-00'>February 2019</div>
					<div class='div-00-div-00-div-00-sec-10-div-00-div-00-div-00'>March 2019</div>
					<div class='div-00-div-00-div-00-sec-10-div-00-div-00-div-00'>April 2019</div>
					<div class='div-00-div-00-div-00-sec-10-div-00-div-00-div-00'>May 2019</div>
					<div class='div-00-div-00-div-00-sec-10-div-00-div-00-div-00'>June 2019</div>
					<div class='div-00-div-00-div-00-sec-10-div-00-div-00-div-00'>July 2019</div>
					<div class='div-00-div-00-div-00-sec-10-div-00-div-00-div-00'>August 2019</div>
					<div class='div-00-div-00-div-00-sec-10-div-00-div-00-div-00'>September 2019</div>
					<div class='div-00-div-00-div-00-sec-10-div-00-div-00-div-00'>October 2019</div>
					<div class='div-00-div-00-div-00-sec-10-div-00-div-00-div-00'>November 2019</div>
					<div class='div-00-div-00-div-00-sec-10-div-00-div-00-div-00'>December 2019</div>
				</div>
				<button class='btn-00-div-00-sec-10-div-00-div-00-div-00'> 
					Calculate 
					<svg viewBox="0 0 10 10" preserveAspectRatio="none">
						<path d='M 4 2 L 1 2 L 1 9 L 8 9 L 8 6 M 3 7 L 7 3'></path>
						<path d='M 5.5 2.25 L 8 2 L 7.75 4.5 L 7 3 Z'></path>
					</svg>
				</button>
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
					<div class='t-div-00-div-00-div-00-sec-11-div-00-div-00-div-00'>
						<object data=''></object>
						<div class='div-00-div-00-div-00-div-00-sec-11-div-00-div-00-div-00'></div>
						<svg class='svg-00-div-00-div-00-div-00-sec-11-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
							<path class='pth-00-svg-00-div-00-div-00-div-00-sec-11-div-00-div-00-div-00' d='M 4 2 L 1 2 L 1 9 L 8 9 L 8 6 M 3 7 L 7 3'></path>
							<path class='pth-01-svg-00-div-00-div-00-div-00-sec-11-div-00-div-00-div-00' d='M 5.5 2.25 L 8 2 L 7.75 4.5 L 7 3 Z'></path>
						</svg>
					</div>
				</div>
				<label class='lbl-00-div-00-sec-11-div-00-div-00-div-00'> 
					File 1 of 1
				</label>
				<div class='div-01-div-00-sec-11-div-00-div-00-div-00'>
					<svg class='svg-02-div-01-div-00-sec-11-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<rect y='1' x='0' width='10' height='8'></rect>
						<path d='M 6.5 5 L 3.5 5 M 5 3.5 L 3.5 5 L 5 6.5'></path>
					</svg>
					<svg class='svg-03-div-01-div-00-sec-11-div-00-div-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
						<rect y='1' x='0' width='10' height='8'></rect>
						<path d='M 3.5 5 L 6.5 5 M 5 3.5 L 6.5 5 L 5 6.5'></path>
					</svg>
					<div class='t-div-00-div-01-div-00-sec-11-div-00-div-00-div-00'>
						<h2 class='h2-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00'></h2>
						<p class='p-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00'></p>
					</div>
				</div>
			</div>
		</section>

		<section class='t-sec-12-div-00-div-00-div-00'>
		<!-- <div class='div-00-sec-12-div-00-div-00-div-00'> -->

				<?php 
						$requesturl =  $_SERVER['REQUEST_URI'];
						$position = strpos($requesturl, '/property/');   
				
						$explode_uri = explode('/',$requesturl);
						
						 $res = $conn->query('SELECT `site_sections`.section_id
												FROM `site_parameter`
												INNER JOIN `site_sections`
												ON `site_parameter`.id = `site_sections`.site_id
												where `site_parameter`.parameter ="'.$explode_uri[2].'" and
												`site_sections`.type = "12"');
												$section_id = $res->fetch_array();
												
						$res_agent = $conn->query('SELECT site_section_agent_id FROM `site_section_12_agents` WHERE section_id ="'.$section_id['section_id'].'"');
						$agent_id = $res_agent->fetch_array();

					
					$expl_agent = explode(',',$agent_id['site_section_agent_id']);
					$length_agents =  count($expl_agent);
					echo ($length_agents > 1)? '<h2 class="h2-00-sec-12-div-00-div-00-div-00">Listing Agents...</h2>' : '<h2 class="h2-00-sec-12-div-00-div-00-div-00">Listing Agent...</h2>';
					echo "<div class='div-00-div-00-sec-12-div-00-div-00-div-00'>";
					foreach($expl_agent as $k => $agId){
						echo "<div class='div-00-div-00-sec-12-div-00-div-00-div-00' style='width:100%;display:inline-table;padding:15px 16px 25px 300px;'>";
					
					
					$result = $conn->query("select * from agent where id = '".$agId."'");
				
					 while ($row = $result->fetch_assoc()) {?>
						

									<h3 class='h3-00-div-00-div-00-sec-12-div-00-div-00-div-00'><?php echo $row['full_name'];?></h3>
									<h4 class='h4-00-div-00-div-00-sec-12-div-00-div-00-div-00'><?php echo $row['occupation'];?></h4>
									<p class='p-00-div-00-div-00-sec-12-div-00-div-00-div-00'><?php echo $row['description'];?></p>
									<h5 class='h5-00-div-00-div-00-sec-12-div-00-div-00-div-00'><?php echo $row['phone_no'];?></h5>
									<h5 class='h5-01-div-00-div-00-sec-12-div-00-div-00-div-00'><?php echo $row['office_phno']; ?></h5>
									<?php echo ($row['language'] !='')?
									'<h5 class="h5-01-div-00-div-00-sec-12-div-00-div-00-div-00"> Language : '.$row['language'].'</h5>'
									:
									''
									?>
									<?php echo ($row['designation'] !='')?
									'<h5 class="h5-01-div-00-div-00-sec-12-div-00-div-00-div-00"> Designation : '.$row['designation'].'</h5>'
									:
									''
									?>
									<div class='div-00-div-00-div-00-sec-12-div-00-div-00-div-00'>
									<a class='a-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00' target='_blank'>
									<img src='<?php echo $root; ?>images/share_icons/agent_fb.png'><?php echo $row['facebook_link']; ?></a>
									<a class='a-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00' target='_blank'>
									<img src='<?php echo $root; ?>images/share_icons/agent_website.png'><?php echo $row['website']; ?></a>
									<a class='a-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00' >
									<img src='<?php echo $root; ?>images/share_icons/agent_email.png'><?php echo $row['email']; ?></a>
									<?php echo ($row['instagramlink'] !='')?
									'<a class="a-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00" target="_blank"><img src="'.$root.'images/share_icons/ins.png">'.$row['instagramlink'].'</a>'
									:
									''
									?>
									<?php echo ($row['youtubelink'] !='')?
									'<a class="a-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00"  target="_blank"><img src="'.$root.'images/share_icons/yt.png">'.$row['youtubelink'].'</a>'
									:
									''
									?>
									</div>	
									
									<div class='div-01-div-00-div-00-sec-12-div-00-div-00-div-00'>
									<?php if($row['imagename_thumb'] !=''){ ?>
									<img class='img-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00' 
									src='<?php echo $root ?>processes/upload/<?php echo $row['imagename_thumb']?>' style="width:300px;height:200px;margin: 80px 30px;padding:25px 40px;">
									<?php } else{ ?>
										<img class='img-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00' src='<?php echo $root ?>/images/null.png' style="width:300px;height:200px;margin: 80px 30px;padding:25px 40px;">
									<?php } ?>
									</div>
					
						<?php	
								}
							
								echo "</div>";
							}
						?>
					
					</div>
				<div class='t-div-00-div-00-sec-12-div-00-div-00-div-00'>
					<h3 class='h3-00-div-00-div-00-sec-12-div-00-div-00-div-00'></h3>
					<h4 class='h4-00-div-00-div-00-sec-12-div-00-div-00-div-00'></h4>
					<p class='p-00-div-00-div-00-sec-12-div-00-div-00-div-00'></p>
					<h5 class='h5-00-div-00-div-00-sec-12-div-00-div-00-div-00'></h5>
					<h5 class='h5-01-div-00-div-00-sec-12-div-00-div-00-div-00'></h5>
					<div class='div-00-div-00-div-00-sec-12-div-00-div-00-div-00'>
						<a class='a-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00' target="_blank">
							<img src='<?php echo $root ?>images/share_icons/agent_fb.png'>
						</a>
						<a class='a-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00' target="_blank">
							<img src='<?php echo $root ?>images/share_icons/agent_website.png'>
						</a>
						<a class='a-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00'>
							<img src='<?php echo $root ?>images/share_icons/agent_email.png'>
						</a>
					</div>
					
					<div class='div-01-div-00-div-00-sec-12-div-00-div-00-div-00'>
						<img class='img-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00' src='<?php echo $root ?>images/null.png'>
					</div>
				</div>
		</section>
	<?php } else if($site_state === 0) { ?>
		<div id='div-01-div-00-div-00'>
			<img src='<?php echo $root ?>images/property-page/calendar.png'>
			<h4>
				Site is scheduled for release on:
			</h4>
			<h3>
				<?php echo(date("m/d/y",$site_scheduled_ts)) ?>
			</h3>
			<h5>
				Until this date, the site will remain hidden. Please contact jed@haganrealty.com if you expect the site to be active.
			</h5>
		</div>
	<?php } else if($site_state === 2){ ?>
		<div id='div-01-div-00-div-00'>
			<h4 style='padding-top:200px'>
				Sorry!
			</h4>
			<h3>
				This site has been deleted
			</h3>
			<h5>
				Please contact jed@haganrealty.com if you expect this site to be active.
			</h5>
		</div>
	<?php } ?>
</div>
<div id='div-01-div-00' style='opacity:0; pointer-events:none'>
	<div id='div-00-div-01-div-00'>
		<h3 id='h3-00-div-00-div-01-div-00'>
			We have sent you an email with your booking. We'll contact you soon to confirm your viewing.
		</h3>
		<button id='btn-00-div-00-div-01-div-00'>
			Close
		</button>
	</div>
</div>

<script type='text/javascript'>
	function initMap(el, map_x, map_y) {
		var map = new google.maps.Map(el, {
		center: {lat: map_x, lng: map_y},
		zoom: 8
		});
		return map;
	}
</script>

<script
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_tuwnGLFy9WyS5fvdjU2P8A72uaNsQa8&callback=initMap">
</script>

<script type='text/javascript' src='<?php echo $root ?>property.js?ts=<?php echo $version ?>'></script>
<script type='text/javascript' src='<?php echo $root ?>tracking.js?ts=<?php echo $version ?>'></script>


<?php 

include($_SERVER['DOCUMENT_ROOT'].'/includes/footer.php');


