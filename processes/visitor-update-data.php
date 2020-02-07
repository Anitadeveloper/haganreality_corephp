<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Visitor-Id, Site-Id");
header("Access-Control-Allow-Methods: POST, GET");  


include 'db-conn.php';

$site_id = intval($_SERVER['HTTP_SITE_ID']);
$visitor_id = intval($_SERVER['HTTP_VISITOR_ID']);

if($stmt = $conn->prepare('UPDATE visitor_site_log SET last_ts = UNIX_TIMESTAMP(now()) WHERE site_id=? AND visitor_id=? ORDER BY visit_ts DESC LIMIT 1')){
	$stmt->bind_param('ii', $site_id, $visitor_id);
	$stmt->execute();
	$stmt->close();
}


?>