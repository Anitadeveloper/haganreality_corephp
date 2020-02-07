<?php

header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: POST, GET");

$site_id = intval($_SERVER['HTTP_SITE_ID']);


$host = '127.0.0.1';
$db   = 'db_hagan_realty';
$user = 'hagan_realty_db';
$pass = 'KaNTAjAQM7ufWRAX';
$charset = 'utf8mb4';


$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}



$string = '[';

$initialise = true;

$stmt = $pdo->query('SELECT visitor_id, to_visitor_id, distance FROM visitor_site_distance_network WHERE site_id=?');
$stmt->execute([$site_id]);
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	if($initialise === true){
		$string .= '{';
		$initialise = false;
	} else {
		$string .= ',{';
	}
	$string .= '"visitor_id" : '.$row['visitor_id'].',';
	$string .= '"to_visitor_id" : '.$row['to_visitor_id'].',';
	$string .= '"distance" : '.$row['distance'].'}';
}

$string .= ']';

$cycles = ceil(strlen($string)/10000);

$file_path = $_SERVER['DOCUMENT_ROOT'].'/metric-network-file/'.$site_id.'.txt';

$file = fopen($file_path, 'wb');
fwrite($file, $string);
fclose($file);



echo (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/metric-network-file/'.$site_id.'.txt';
