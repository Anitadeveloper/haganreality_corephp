<?php 

	include($_SERVER['DOCUMENT_ROOT'].'/processes/db-conn.php');

	$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

	if($stmt = $conn->prepare("INSERT INTO visitor_ip VALUES(1,1)")){
		$stmt->execute();
		$stmt->close();
	}

	
?><!--
<script type='text/javascript'>
	var SITE_ID = <?php //echo json_encode($site_id) ?>;
	
	var URL = '<?php //echo 'http://'.$site_url ?>';
	
	var SITE_START_OPEN_HOUSE_TS = <?php //echo json_encode($site_start_open_house_ts) ?>;
	
	var SITE_END_OPEN_HOUSE_TS = <?php //echo json_encode($site_end_open_house_ts) ?>;
	
	var VISITOR_ID = <?php //echo json_encode($visitor_id) ?>;
	var NEW_USER = <?php //echo json_encode($new_user) ?>;
	var IP = <?php //echo json_encode($ip) ?>;
	
	function MetricXHR(){

		//get IP address long and lat if new visitor

		if(NEW_USER === true){
			var xhr = new XMLHttpRequest();
			var url = 'http://api.ipstack.com/' + IP + '?access_key=5048bb06db0e9cafcbc0e9c6ad1bc53f';

			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4){
					var response = JSON.parse(xhr.responseText);
					
					var xhr_2 = new XMLHttpRequest();
					var url_2 = DOCUMENT_ROOT + 'processes/new-user-setup.php';
					xhr_2.open('POST', url_2, true);
					xhr_2.setRequestHeader('lat', response.latitude);
					xhr_2.setRequestHeader('lng', response.longitude);
					xhr_2.setRequestHeader('visitor-id', VISITOR_ID);
					xhr_2.send();
				}
			};

			xhr.open('POST', url, true);
			xhr.send();
		}
	}
	
	MetricXHR();
	
</script>

?>-->