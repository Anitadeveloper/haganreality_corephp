<?php 
//IP address stuff
include($_SERVER['DOCUMENT_ROOT'].'/processes/get-ip.php');

$ip = strval(get_ip());

$new_user = false;

$states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

//check if new visitor
$visitor_id = 0;
if($stmt = $conn->prepare("SELECT visitor_id FROM visitor_ip WHERE ip=?")){
	$stmt->bind_param('s', $ip);
	$stmt->bind_result($visitor_id_fetch);
	$stmt->execute();

	while($stmt->fetch()){
		$visitor_id = $visitor_id_fetch;
	}
	
	$stmt->close();
}

if($site_id !== 0){
	while($visitor_id === 0){
		$rand_num = rand(1, 99999999);
		$num_rows = 1;
		if($stmt = $conn->prepare("SELECT * FROM visitor_ip WHERE visitor_id=?")){
			$stmt->bind_param('i', $rand_num);

			$stmt->execute();

			$stmt->store_result();

			$num_rows = $stmt->num_rows;

			$stmt->close();
		}
		if($num_rows === 0){
			$visitor_id = $rand_num;
			if($stmt = $conn->prepare("INSERT INTO visitor_ip VALUES (?,?)")){
				$stmt->bind_param('is', $visitor_id, $ip);
				$stmt->execute();
				$stmt->close();
				$new_user = true;
			}
		}
	}

	if($stmt = $conn->prepare("INSERT INTO visitor_site_log VALUES (?,?,UNIX_TIMESTAMP(now()), UNIX_TIMESTAMP(now()))")){
		$stmt->bind_param('ii', $visitor_id, $site_id);
		$stmt->execute();
		$stmt->close();
	}

	
	//set lat lng
	$lat = '';
	$lng = '';
	$region = 'Outside US';
	$geo = json_decode(file_get_contents("http://extreme-ip-lookup.com/json/".$ip));
		
	$lat = $geo->lat;
	$lng = $geo->lon;
	$region = $geo->region;
	
	$contains_region = false;
	
	foreach($states as $state) {
        if (stripos($region,$state) !== false){
			$contains_region = true;
		}
    }
	
	if($contains_region === false){
		$region = 'Outside US';
	}
		
	if($stmt = $conn->prepare("INSERT INTO visitor_location VALUES (?,?,?,?)")){
		$stmt->bind_param('idds', $visitor_id, $lat, $lng, $region);
		$stmt->execute();
		$stmt->close();
	}
	
	
	

	//calculate distance to other site visitors
	$visitor_id_list = Array();
	$visitor_id_list_temp = Array();
	$index = 0;

	if($stmt = $conn->prepare("SELECT visitor_id FROM visitor_site_log WHERE site_id=? ORDER BY visitor_id")){
		$stmt->bind_param('i', $site_id);
		$stmt->bind_result($visitor_id_fetch);
		$stmt->execute();
		while($stmt->fetch()){
			$visitor_id_list_temp[$index] = $visitor_id_fetch;
			$index++;
		}
		$stmt->close();
	}

	$index = 0;
	$last_added = -1;
	
	for($i = 0; $i < count($visitor_id_list_temp); $i++){
			
		if($visitor_id_list_temp[$i] !== $last_added){
			$visitor_id_list[$index] = $visitor_id_list_temp[$i];
			$last_added = $visitor_id_list_temp[$i];
			$index++;
		}
	}


	$visitor_latlng = Array();

	if($stmt = $conn->prepare("SELECT visitor_id, lat, lng FROM visitor_location")){
		$stmt->bind_result($visitor_id_fetch, $lat_fetch, $lng_fetch);
		$stmt->execute();
		while($stmt->fetch()){
			$visitor_latlng[$visitor_id_fetch] = new StdClass();
			$visitor_latlng[$visitor_id_fetch]->lat = $lat_fetch;
			$visitor_latlng[$visitor_id_fetch]->lng = $lng_fetch;
		}
		$stmt->close();
	}

	//add a link to each other node
	for($i = 0; $i < count($visitor_id_list); $i++){
		if($visitor_id_list[$i] !== $visitor_id){
			$to_visitor_id_set = $visitor_id_list[$i];
			$distance_set = round(GetHaversine($lat, $lng, $visitor_latlng[$visitor_id_list[$i]]->lat, $visitor_latlng[$visitor_id_list[$i]]->lng));
			if($stmt = $conn->prepare("INSERT INTO visitor_site_distance_network VALUES (?,?,?,?)")){
				$stmt->bind_param('iiii', $site_id, $visitor_id, $to_visitor_id_set, $distance_set);
				$stmt->execute();
				$stmt->close();
			}
		}
	}
	
	// Include and instantiate the class.
	include ($_SERVER['DOCUMENT_ROOT'].'/processes/device_detect.php');
	$detect = new Mobile_Detect;

	$device_type;
	// Any tablet device.
	if( $detect->isTablet() ){
		$device_type = 'Tablet';
	} else if ( $detect->isMobile() ) {
		$device_type = 'Smartphone';
	} else {
		$device_type = 'Desktop';
	}
	
	if($stmt = $conn->prepare("INSERT INTO visitor_device_type VALUES(?,?)")){
		$stmt->bind_param('is', $visitor_id, $device_type);
		//execute query
		$stmt->execute();
		
		$stmt->close();
	}
	
	$referrer = $_SERVER['HTTP_REFERRER'];
	if($referrer !== ''){
		$url = parseURL($referrer);
		$domain = '';
		$domain = $url['scheme'].'://'.$url['host'];
		$path = $url['path'];
		if($path === '/') $path = '';
	} else {
		$domain = '';
		$path = '';
	}
	
	if($stmt = $conn->prepare("INSERT INTO visitor_referrer VALUES(?,?,?)")){
		$stmt->bind_param('iss', $visitor_id, $domain, $path);
		//execute query
		$stmt->execute();

		$stmt->close();
	}

}


	
function GetHaversine($lat1,$lng1,$lat2,$lng2){
	$R = 6371000; // metres
	$lat1rad = $lat1 * pi()/180;
	$lat2rad = $lat2 * pi()/180;
	$deltalat = ($lat2-$lat1) * pi()/180;
	$deltalng = ($lng2-$lng1) * pi()/180;

	$a = sin($deltalat/2) * sin($deltalat/2) +
			cos($lat1rad) * cos($lat2rad) *
			sin($deltalng/2) * sin($deltalng/2);
	$c = 2 * atan2(sqrt($a), sqrt(1-$a));

	$d = $R * $c;

	return $d;
}



function parseURL($url,$retdata=true){
    $url = substr($url,0,4)=='http'? $url: 'http://'.$url; //assume http if not supplied
    if ($urldata = parse_url(str_replace('&amp;','&',$url))){
        $path_parts = pathinfo($urldata['host']);
        $tmp = explode('.',$urldata['host']); $n = count($tmp);
        if ($n>=2){
            if ($n==4 || ($n==3 && strlen($tmp[($n-2)])<=3)){
                $urldata['domain'] = $tmp[($n-3)].".".$tmp[($n-2)].".".$tmp[($n-1)];
                $urldata['tld'] = $tmp[($n-2)].".".$tmp[($n-1)]; //top-level domain
                $urldata['root'] = $tmp[($n-3)]; //second-level domain
                $urldata['subdomain'] = $n==4? $tmp[0]: ($n==3 && strlen($tmp[($n-2)])<=3)? $tmp[0]: '';
            } else {
                $urldata['domain'] = $tmp[($n-2)].".".$tmp[($n-1)];
                $urldata['tld'] = $tmp[($n-1)];
                $urldata['root'] = $tmp[($n-2)];
                $urldata['subdomain'] = $n==3? $tmp[0]: '';
            }
        }
        //$urldata['dirname'] = $path_parts['dirname'];
        $urldata['basename'] = $path_parts['basename'];
        $urldata['filename'] = $path_parts['filename'];
        $urldata['extension'] = $path_parts['extension'];
        $urldata['base'] = $urldata['scheme']."://".$urldata['host'];
        $urldata['abs'] = (isset($urldata['path']) && strlen($urldata['path']))? $urldata['path']: '/';
        $urldata['abs'] .= (isset($urldata['query']) && strlen($urldata['query']))? '?'.$urldata['query']: '';
        //Set data
        if ($retdata){
            return $urldata;
        } else {
            $this->urldata = $urldata;
            return true;
        }
    } else {
        //invalid URL
        return false;
    }
}



?>