<?php 

	//destroy the session.
	session_start();
	//check if user was previously logged in
	$logging_out = false;
	if(isset($_SESSION['user-id'])){
		$logging_out = true;
	}
	session_destroy();

	$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

	error_reporting(0);
	//disable browser caching !!IMPORTANT
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Access-Control-Allow-Credentials: true");
	header("Pragma: no-cache");
	header("Access-Control-Allow-Origin: http://www.klemequestrianestates.com");

	$page_title = "login";

	$page_name = 'Login';

	$redirect_url = null;
	if(empty($_GET['url']) === false){
		$redirect_url = $_GET['url'];
		$redirect_url = preg_replace("/~/", "/", $redirect_url);
		$redirect_url = preg_replace("/%/", "?", $redirect_url);
		$redirect_url = preg_replace("/\+/", "&", $redirect_url);
	}



	$content_only = isset($_SERVER['HTTP_CONTENT_ONLY']) && ($_SERVER['HTTP_CONTENT_ONLY'] == 1);

	header('Page-Name: ' . $page_name); 
	header('Page-Title: ' . $page_title); 
	
	$version = '1.00.00';
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
			
			var REDIRECT_URL = <?php echo json_encode($redirect_url) ?>;
			
			var LOGGING_OUT = <?php echo json_encode($logging_out) ?>;
		</script>
		
		<svg id='svg-00' viewBox="0 0 100 100" preserveAspectRatio="none">
			<path d='M 100 0 L 100 100 C 100 100 95 85 85 75 C 75 65 55 65 45 55 C 35 45 35 25 25 15 C 15 5 0 0 0 0 Z'></path>
		</svg>
		
		<svg id='svg-01' viewBox="0 0 100 100" preserveAspectRatio="none">
			<path d='M 0 100 L 0 0 C 0 0 5 15 15 25 C 25 35 45 35 55 45 C 65 55 65 75 75 85 C 85 95 100 100 100 100 Z'></path>
		</svg>
		
		<span id='spn-00' style='display:none'>
			<svg viewBox="0 0 10 10" preserveAspectRatio="none">
				<line x1='5' x2='5' y1='2.5' y2='5.5'></line>
				<circle cx='5' cy='7' r='0.4'></circle>
				<path d='M 5 1 A 4 4 0 0 1 5 9 A 4 4 0 0 1 5 1'></path>
			</svg>
			<p id='p-00-spn-00'>Your login details were incorrect. If you have forgotten your details, <a href='<?php echo $root ?>admin/forgot-password'>let's reset them</a></p>
		</span>
		
		<span id='spn-01' style='display:none'>
			<img src='<?php echo $root ?>images/admin/waving-hand-emoji.png'>
			<p>
				You have been successfully logged out. Bye!
			</p>
		</span>

		<section id='sec-00'>
			
			<h3 id='h3-00-sec-00'>Login </h3>
			<p id='p-00-sec-00'>Welcome back! Please login below with your credentials. <br> If you need to register, <a href='<?php echo $root ?>admin/register.php'> click here </a> </p>
			
			<div id='div-00-sec-00'>
				<svg id='svg-00-div-00-sec-00' viewBox="0 0 10 10" preserveAspectRatio="none">
					<path id='pth-00-svg-00-div-00-sec-00' d='M 5 6 A 3 3 0 0 1 5 0 A 3 3 0 0 1 5 6'></path>
					<path id='pth-01-svg-00-div-00-sec-00' d='M 0 10 A 6 6 0 0 1 10 10 Z'></path>
				</svg>
				<input id='ipt-00-div-00-sec-00' placeholder="username or email" type="text">
			</div>
			<div id='div-01-sec-00'>
				<svg id='svg-00-div-01-sec-00' viewBox="0 0 10 10" preserveAspectRatio="none">
					<rect id='rct-00-svg-00-div-01-sec-00' width='8' height='4.5' x='1' y='5.5' rx='0.5' ry='0.5'></rect>
					<path id='pth-00-svg-00-div-01-sec-00' d='M 2.5 6 L 2.5 4 A 2.5 2.5 0 0 1 7.5 4 L 7.5 6'></path>
				</svg>
				<input id='ipt-00-div-01-sec-00' placeholder="password" type='password'>
			</div>
			<button id='btn-00-sec-00'>
				LOGIN
				<svg viewBox="0 0 10 10" preserveAspectRatio="none">
					<path d='M 2 5 L 8 5 M 5 2 L 8 5 L 5 8'></path>
				</svg>
			</button>
			<a id='a-00-sec-00' href='<?php echo $root ?>admin/forgot-password'>
			Forgotten Password
			</a>
		</section>

		<script type='text/javascript' src='<?php echo $root ?>admin/login.js'></script>
	</div>
</body>