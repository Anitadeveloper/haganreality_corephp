<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Visitor-Id, Referrer, Device-Type");
header("Access-Control-Allow-Methods: POST, GET");  


include 'db-conn.php';


$visitor_id = intval($_SERVER['HTTP_VISITOR_ID']);
$referrer = $_SERVER['HTTP_REFERRER'];
$device_type = $_SERVER['HTTP_DEVICE_TYPE'];

$num_rows = 0;

if($stmt = $conn->prepare("SELECT * FROM visitor_referrer WHERE visitor_id=?")){
	$stmt->bind_param('i', $visitor_id);
	//execute query
	$stmt->execute();
	//store result
	$stmt->store_result();
			
	$num_rows = $stmt->num_rows;

	$stmt->close();
}

if($num_rows === 0){
	if($referrer !== ''){
		$url = parseURL($referrer);
		$domain = '';
		$domain = $url['scheme'].'://'.$url['host'];
		$path = $url['path'];
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