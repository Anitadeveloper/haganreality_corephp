<?php 
error_reporting(0);
//disable browser caching !!IMPORTANT
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Access-Control-Allow-Credentials: true");
header("Pragma: no-cache");
header("Access-Control-Allow-Origin: http://www.klemequestrianestates.com");

$page_title = "awaiting-confirmation";

$page_name = 'Awaiting Confirmation';


$content_only = isset($_SERVER['HTTP_CONTENT_ONLY']) && ($_SERVER['HTTP_CONTENT_ONLY'] == 1);

header('Page-Name: ' . $page_name); 
header('Page-Title: ' . $page_title); 

$version = '1.00.00';

session_start();

$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

if(isset($_SESSION['user-id']) === false){
	header('Location: ' . $root . 'admin/login');
}
?>
<!Doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title><?= $page_name ?> | Hagan Realty</title>
	
	<meta charset="UTF-8">
	<meta http-equiv="Content-Language" content="eng">
	
	<?php include($_SERVER['DOCUMENT_ROOT'].'/includes/stylesheets.php') ?>
	
	<link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png?version=<?php echo $version ?>">
	<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png?version=<?php echo $version ?>">
	<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png?version=<?php echo $version ?>">
	<link rel="manifest" href="/images/favicon/site.webmanifest?version=<?php echo $version ?>">
	<link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg?version=<?php echo $version ?>" color="#5bbad5">
	<link rel="shortcut icon" href="/images/favicon/favicon.ico?version=<?php echo $version ?>">
	<meta name="msapplication-TileColor" content="#00aba9">
	<meta name="msapplication-config" content="/images/favicon/browserconfig.xml?version=<?php echo $version ?>">
	<meta name="theme-color" content="#ffffff">

	
	<link rel="apple-touch-icon" sizes="180x180" href="images/favicon/apple-touch-icon.png ?version=<?php echo $version ?>">
	<link rel="icon" type="image/png" sizes="32x32" href="images/favicon/favicon-32x32.png?version=<?php echo $version ?>">
	<link rel="icon" type="image/png" sizes="16x16" href="images/favicon/favicon-16x16.png?version=<?php echo $version ?>">
	<link rel="manifest" href="images/favicon/site.webmanifest?version=<?php echo $version ?>">
	<link rel="mask-icon" href="images/favicon/safari-pinned-tab.svg?version=<?php echo $version ?>" color="#5c1f99">
	<link rel="shortcut icon" href="images/favicon/favicon.ico?version=<?php echo $version ?>">
	
	<meta name="msapplication-TileColor" content="#ff0000">
	<meta name="msapplication-config" content="images/favicon/browserconfig.xml?version=<?php echo $version ?>">
	<meta name="theme-color" content="#ffffff">
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-110072249-3"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());

	  gtag('config', 'UA-110072249-3');
	</script>
	
</head>

<body id='<?= $page_title ?>'>
	<div id="div-00">
		<script type='text/javascript'>
			var switch_page = false;
		</script>


		<script tye='text/javascript'>
			var DOCUMENT_ROOT = '<?php echo $root ?>';
		</script>
		
		<svg id='svg-00' viewBox="0 0 100 100" preserveAspectRatio="none">
			<path d='M 100 0 L 100 100 C 100 100 95 85 85 75 C 75 65 55 65 45 55 C 35 45 35 25 25 15 C 15 5 0 0 0 0 Z'></path>
		</svg>
		
		<svg id='svg-01' viewBox="0 0 100 100" preserveAspectRatio="none">
			<path d='M 0 100 L 0 0 C 0 0 5 15 15 25 C 25 35 45 35 55 45 C 65 55 65 75 75 85 C 85 95 100 100 100 100 Z'></path>
		</svg>

		<section id='sec-00'>
			
			<img id='img-00-sec-00' src='<?php echo $root ?>images/login/awaiting-confirmation-graphic.png'>
			
			<h3 id='h3-00-sec-00'>Awaiting Confirmation</h3>
			<p id='p-00-sec-00'> The administrators need to activate your account before you can log in. </p>
			<a id='a-00-sec-00' href='<?php echo $root ?>admin/login'> Back to Login </a>
		</section>

		<script type='text/javascript' src='awaiting-confirmation.js'></script>
	</div>
</body>