<?php 

$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

session_start();

if(isset($_SESSION['user-id']) && isset($_SESSION['valid'])){

$page_title = "view-metrics";

include($_SERVER['DOCUMENT_ROOT'].'/admin/header.php');

?>


<aside id='asd-00-div-00'>
	<div id='div-00-asd-00-div-00'>
		<div id='div-00-div-00-asd-00-div-00'>
			<input id='ipt-00-div-00-div-00-asd-00-div-00' placeholder='Search'>
			<svg id='svg-00-div-00-div-00-asd-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
				<path d='M 1 4 A 3 3 0 0 1 7 4 A 3 3 0 0 1 1 4 M 6.55 6.55 L 9 9'></path>
			</svg>
			<svg id='svg-01-div-00-div-00-asd-00-div-00' viewBox="0 0 10 10" preserveAspectRatio="none" style='display:none'>
				<path d='M 2 2 L 8 8 M 2 8 L 8 2'></path>
			</svg>
		</div>
		<div id='div-01-div-00-asd-00-div-00'>
		
		</div>
		<div id='div-02-div-00-asd-00-div-00'>
		
		</div>
		
	</div>
	
</aside>

<div id='div-00-div-00' style='display:none'>
	
	<div id='div-01-div-00-div-00'>
		<div id='div-00-div-01-div-00-div-00'>
			<div id='div-00-div-00-div-01-div-00-div-00'>
				<label>
					Views
				</label>
				<button class='active'>
					24 Hours
				</button>
				<button>
					10 Days
				</button>
				<button>
					30 Days
				</button>
			</div>
			<svg id='svg-00-div-00-div-01-div-00-div-00' viewBox="0 0 900 525" preserveAspectRatio="none">
				<text class='y-label' x='25' y='225' transform='rotate(-90,25,225)'>Views</text>
				<text class='x-label' x='475' y='495'>Date</text>
			</svg>
		</div>
		
		<div id='div-02-div-01-div-00-div-00'>
			<h4>Views by State</h4>
			<svg viewBox="0 0 100 100" preserveAspectRatio="none">
				
			</svg>
			<div id='div-00-div-02-div-01-div-00-div-00'>
				
			</div>
			<span id='spn-00-div-02-div-01-div-00-div-00' style='opacity:0; display:none'>
				Test
			</span>
		</div>
		
		<div id='div-04-div-01-div-00-div-00'>
			<h4>Active Users Now</h4>
			<h5></h5>
			<h4>Page Views Per Hour</h4>
			<h5></h5>
			<h4>Average Visit</h4>
			<h5></h5>
		</div>
		
		<div id='div-03-div-01-div-00-div-00'>
			<h4>Device Type</h4>
			<svg viewBox="0 0 100 100" preserveAspectRatio="none">

			</svg>
			<div id='div-00-div-03-div-01-div-00-div-00'>

			</div>
		</div>
		
		<div id='div-07-div-01-div-00-div-00'>
			<h4>Top Referer URLs</h4>
		</div>
		
		<div id='div-01-div-01-div-00-div-00'>
			<div id='div-00-div-01-div-01-div-00-div-00'>
				<label>
					Bounce Rate
				</label>
				<button class='active'>
					24 Hours
				</button>
				<button>
					10 Days
				</button>
				<button>
					30 Days
				</button>
			</div>
			<svg id='svg-00-div-01-div-01-div-00-div-00' viewBox="0 0 900 525" preserveAspectRatio="none">
				<text class='y-label' x='25' y='225' transform='rotate(-90,25,225)'>Bounce Rate (%)</text>
				<text class='x-label' x='475' y='495'>Date</text>
			</svg>
		</div>
		
		<div id='div-06-div-01-div-00-div-00'>
			<div id='div-00-div-06-div-01-div-00-div-00'>
				<label>
					Recurring Visits
				</label>
				<button class='active'>
					24 Hours
				</button>
				<button>
					10 Days
				</button>
				<button>
					30 Days
				</button>
			</div>
			<svg id='svg-00-div-06-div-01-div-00-div-00' viewBox="0 0 900 525" preserveAspectRatio="none">
				<text class='y-label' x='25' y='225' transform='rotate(-90,25,225)'>Lifetime View Time (Minutes)</text>
				<text class='x-label' x='475' y='495'>Recurring Visits</text>
			</svg>
		</div>
		
		<div id='div-05-div-01-div-00-div-00' style='filter:brightness(0.85)'>
			<div id='div-00-div-05-div-01-div-00-div-00'>
				<label>
					Interactions
				</label>
				<button class='active'>
					24 Hours
				</button>
				<button>
					10 Days
				</button>
				<button>
					30 Days
				</button>
			</div>
			<svg id='svg-00-div-05-div-01-div-00-div-00' viewBox="0 0 900 525" preserveAspectRatio="none">
				<path d='M 75 450 L 75 50 M 155 450 L 155 50 M 235 450 L 235 50 M 315 440 L 315 50 M 395 450 L 395 50 M 475 450 L 475 50 M 555 450 L 555 50 M 635 450 L 635 50 M 715 450 L 715 50 M 795 450 L 795 50 M 875 450 L 875 50'></path>
				
				<text x='70' y='450'>0</text>
				<text x='70' y='410'>0.1</text>
				<text x='70' y='370'>0.2</text>
				<text x='70' y='330'>0.3</text>
				<text x='70' y='290'>0.4</text>
				<text x='70' y='250'>0.5</text>
				<text x='70' y='210'>0.6</text>
				<text x='70' y='170'>0.7</text>
				<text x='70' y='130'>0.8</text>
				<text x='70' y='90'>0.9</text>
				<text x='70' y='50'>1.0</text>
				
				<text class='x' x='75'  y='460'>0</text>
				<text class='x' x='155' y='460'>10</text>
				<text class='x' x='235' y='460'>20</text>
				<text class='x' x='315' y='460'>30</text>
				<text class='x' x='395' y='460'>40</text>
				<text class='x' x='475' y='460'>50</text>
				<text class='x' x='555' y='460'>60</text>
				<text class='x' x='635' y='460'>70</text>
				<text class='x' x='715' y='460'>80</text>
				<text class='x' x='795' y='460'>90</text>
				<text class='x' x='875' y='460'>100</text>
				
				<text class='y-label' x='25' y='225' transform='rotate(-90,25,225)'>Lifetime View Time (minutes)</text>
				<text class='x-label' x='475' y='495'>Interactions</text>
			</svg>
		</div>
	</div>
	
	
	
	<div id='div-02-div-00-div-00'>
		<btn id='btn-00-div-02-div-00-div-00'>
			<svg viewBox="0 0 10 10" preserveAspectRatio="none">
				<path d='M 2 1 L 2 4 A 1 1 0 0 1 2 6 A 1 1 0 0 1 2 4 M 2 6 L 2 9 M 5 1 L 5 2 A 1 1 0 0 1 5 4 A 1 1 0 0 1 5 2 M 5 4 L 5 9 M 8 1 L 8 6 A 1 1 0 0 1 8 8 A 1 1 0 0 1 8 6 M 8 8 L 8 9'></path>
			</svg>
			<label>Filter</label>
		</btn>
	</div>
	
	<!-- map -->
	<div id='div-03-div-00-div-00'>
		
	</div>
	
</div>

<div id='div-01-div-00'>
	<img id='img-00-div-01-div-00' src=''>
	<label id='lbl-00-div-01-div-00'>
		Select a Site to View Metrics
	</label>
</div>



<div id='div-02-div-00' style='display:none'>
	<div id='div-00-div-02-div-00'>
		<div id='div-00-div-00-div-02-div-00'>
			<h5>Filter</h5>
			<svg preserveAspectRatio="none" viewBox="0 0 10 10">
				<path d='M 1 1 L 9 9 M 1 9 L 9 1'></path>
			</svg>
		</div>
		<div id='div-01-div-00-div-02-div-00'>
			<h6>By Date</h6>
			<span>
				<svg preserveAspectRatio="none" viewBox="0 0 24 24">
					<path d="M17 3v-2c0-.552.447-1 1-1s1 .448 1 1v2c0 .552-.447 1-1 1s-1-.448-1-1zm-12 1c.553 0 1-.448 1-1v-2c0-.552-.447-1-1-1-.553 0-1 .448-1 1v2c0 .552.447 1 1 1zm13 13v-3h-1v4h3v-1h-2zm-5 .5c0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5-4.5 2.019-4.5 4.5zm11 0c0 3.59-2.91 6.5-6.5 6.5s-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5zm-14.237 3.5h-7.763v-13h19v1.763c.727.33 1.399.757 2 1.268v-9.031h-3v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-9v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-3v21h11.031c-.511-.601-.938-1.273-1.268-2z"></path>
				</svg>
				<input type='text' value='1 A.D. at 00:00'>
			</span>
			<label>to</label>
			<span>
				<svg preserveAspectRatio="none" viewBox="0 0 24 24">
					<path d="M17 3v-2c0-.552.447-1 1-1s1 .448 1 1v2c0 .552-.447 1-1 1s-1-.448-1-1zm-12 1c.553 0 1-.448 1-1v-2c0-.552-.447-1-1-1-.553 0-1 .448-1 1v2c0 .552.447 1 1 1zm13 13v-3h-1v4h3v-1h-2zm-5 .5c0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5-4.5 2.019-4.5 4.5zm11 0c0 3.59-2.91 6.5-6.5 6.5s-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5zm-14.237 3.5h-7.763v-13h19v1.763c.727.33 1.399.757 2 1.268v-9.031h-3v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-9v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-3v21h11.031c-.511-.601-.938-1.273-1.268-2z"></path>
				</svg>
				<input type='text' value='Now'>
			</span>
		</div>
		<div id='div-02-div-00-div-02-div-00'>
			<h6>By State</h6>
			<span>
				<h7 class='placeholder'><label>3</label>Kentucky, California, Wisconsin, North Carolina</h7>
				<svg viewBox="0 0 10 10" preserveAspectRatio="none">
					<path d='M 3 4 L 5 6 L 7 4'></path>
				</svg>
				<div></div>
			</span>
		</div>
		<div class='div-03-div-00-div-02-div-00'>
			<label>Include Bouncing Users?</label>
			<div>
				<input type='checkbox'>
				<span></span>
				<span></span>
			</div>
		</div>
		<div class='div-03-div-00-div-02-div-00'>
			<label>Display total visits instead of visitors?</label>
			<div>
				<input type='checkbox'>
				<span></span>
				<span></span>
			</div>
		</div>
		<div id='div-04-div-00-div-02-div-00'>
			<h6>By Referrer</h6>
			<span>
				<h7 class='placeholder'><label>3</label>https://haganrealtyproperties.com, https://haganrealtyproperties.com, https://haganrealtyproperties.com</h7>
				<svg viewBox="0 0 10 10" preserveAspectRatio="none">
					<path d='M 3 4 L 5 6 L 7 4'></path>
				</svg>
				<div></div>
			</span>
		</div>
		<!-- calendar popups -->
		
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

<script type='text/javascript' src='<?php echo $root ?>/admin/metrics/view.js' async></script>


<?php 

include($_SERVER['DOCUMENT_ROOT'].'/admin/footer.php');

} else {
	$url_parameter = substr($_SERVER['REQUEST_URI'], 1);
	$url_parameter = preg_replace("/\//", "~", $url_parameter);
	$url_parameter = preg_replace("/\?/", "%", $url_parameter);
	$url_parameter = preg_replace("/\&/", "+", $url_parameter);
	
	header('Location: '.$root.'admin/login.php?url='.$url_parameter);
}