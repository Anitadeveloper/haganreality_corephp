<?php 
	error_reporting(0);
	//disable browser caching !!IMPORTANT
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Access-Control-Allow-Credentials: true");
	header("Pragma: no-cache");
	header("Access-Control-Allow-Origin: *");

	if($page_title === 'property'){
		$page_name = $site_name;
		$page_title = "property";
	}

	if(!isset($page_title)) {
		$page_title = "property";
		$page_name = "Loading";
	}

	$content_only = isset($_SERVER['HTTP_CONTENT_ONLY']) && ($_SERVER['HTTP_CONTENT_ONLY'] == 1);
	if($content_only){
		header('Page-Name: ' . $page_name); 
		header('Page-Title: ' . $page_title); 
	}
	else {
	
	$version_num = '1.00.04';
		
?>
<!Doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title><?= $page_name ?> | Hagan Realty</title>
	
	<meta charset="UTF-8">
	<meta http-equiv="Content-Language" content="eng">
	
	<?php include($_SERVER['DOCUMENT_ROOT'].'/includes/stylesheets.php') ?>
	<?php include($_SERVER['DOCUMENT_ROOT'].'/includes/fonts.php') ?>
	
	<link rel="icon" type="image/png" sizes="32x32" href="<?php $root ?>images/favicon/favicon-32x32.png?version=<?php echo $version ?>">
	<link rel="icon" type="image/png" sizes="16x16" href="<?php $root ?>images/favicon/favicon-16x16.png?version=<?php echo $version ?>">
	<link rel="manifest" href="<?php echo $root ?>images/favicon/site.webmanifest?version=<?php echo $version ?>">
	<link rel="mask-icon" href="<?php echo $root ?>images/favicon/safari-pinned-tab.svg?version=<?php echo $version ?>" color="#9530ff">
	<link rel="shortcut icon" href="<?php echo $root ?>images/favicon/favicon.ico?version=<?php echo $version ?>">
	<meta name="msapplication-TileColor" content="#00aba9">
	<meta name="msapplication-config" content="<?php echo $root ?>images/favicon/browserconfig.xml?version=<?php echo $version ?>">
	<meta name="theme-color" content="#ffffff">

	
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	
	<?php
		list($width, $height) = getimagesize($preview_image_src);
	?>
	
	<meta property="og:url"                content="<?php echo urlencode('http://'.$site_url) ?>" />
	<meta property="og:type"               content="website" />
	<meta property="og:title"              content="<?php echo $site_name ?>" />
	<meta property="og:description"        content="Hagan Realty Properties Property Website" />
	<meta property="og:image" content="<?php echo $preview_image_src ?>" />
	<meta property="og:image:width" content="<?php echo $width ?>" />
	<meta property="og:image:height" content="<?php echo $height ?>" />
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="">
	<meta name="twitter:creator" content="">
	<meta name="twitter:title" content="<?php echo $site_name ?>">
	<meta name="twitter:description" content="Hagan Realty Properties Property Website">
	<meta name="twitter:creator" content="">
	<meta name="twitter:image" content="<?php echo $preview_image_src ?>">
	<meta name="twitter:domain" content="<?php echo urlencode('http://'.$site_url) ?>">
	
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
	<script type='text/javascript'>
		var DOCUMENT_ROOT = '<?php echo $root ?>';
	</script>
	<header id='hea-00'>
		<div id='div-00-hea-00'>
			<img id='img-00-div-00-hea-00' src='<?php echo $root ?>images/logo/logo.png'>
			<h1 id='h1-00-div-00-hea-00'>
				Hagan <br> Realty
			</h1>
			
			<svg id='svg-00-div-00-hea-00' viewBox='0 0 10 10' preserveAspectRatio="none" style='opacity:0;pointer-events:none;display:none'>
				<path d='M 0 2.25 L 10 2.25 M 0 5 L 10 5 M 0 7.75 L 10 7.75'></path>
			</svg>
			
			<svg id='svg-01-div-00-hea-00' viewBox='0 0 10 10' preserveAspectRatio="none" style='opacity:0;pointer-events:none;display:none'>
				<path d='M 1 1 L 9 9 M 9 1 L 1 9'></path>
			</svg>
			
			<div id='div-00-div-00-hea-00' style='opacity:0;pointer-events:none;display:none'>
				<svg id="svg-00-div-00-div-00-hea-00" preserveAspectRatio="none" viewBox="0 0 10 10">
					<path id='pth-00-svg-00-div-00-div-00-hea-00' d='M 3 0 L 3 2 M 7 0 L 7 2'></path>
					<path id='pth-01-svg-00-div-00-div-00-hea-00' d='M 6 1 L 4 1 M 2 1 L 0.5 1 L 0.5 8.5 L 9.5 8.5 L 9.5 1 L 8 1'></path>
					<path id='pth-02-svg-00-div-00-div-00-hea-00' d='M 0.5 4 L 9.5 4 M 0.5 5.5 L 9.5 5.5 M 0.5 7 L 9.5 7'></path>
					<path id='pth-03-svg-00-div-00-div-00-hea-00' d='M 2.3 4 L 2.3 8.5 M 4.1 4 L 4.1 8.5 M 5.9 4 L 5.9 8.5 M 7.7 4 L 7.7 8.5'></path>
					<path id='pth-04-svg-00-div-00-div-00-hea-00' d='M 4.1 5.5 L 5.9 5.5 L 5.9 7 4.1 7 Z'></path>
				</svg>
				<label id='lbl-00-div-00-div-00-hea-00'>
					Viewings
				</label>
			</div>
			
			<div id='div-01-div-00-hea-00' style='opacity:0;pointer-events:none;display:none'>
				<svg id="svg-00-div-01-div-00-hea-00" preserveAspectRatio="none" viewBox="0 0 10 10">
					<path id='pth-00-svg-00-div-01-div-00-hea-00' d='M 9.5 4.5 L 9.5 9.5 L 0.5 9.5 L 0.5 0.5 L 9.5 0.5 L 9.5 3 M 5 0.5 L 5 2.5 M 0.5 5.5 L 1.75 5.5 M 3.25 5.5 L 5 5.5 M 5 4 L 5 6.5 L 6.5 6.5 M 8 6.5 L 9.5 6.5'></path>
					<path id='pth-01-svg-00-div-01-div-00-hea-00' d='M 9.7 4.7 L 8 4.7 A 1.9 1.9 0 0 1 9.7 2.8 M 1.55 5.3 A 1.9 1.9 0 0 0 3.45 7 L 3.45 5.3'></path>
				</svg>
				<label id='lbl-00-div-01-div-00-hea-00'>
					Floorplans
				</label>
			</div>
			
			<div id='div-02-div-00-hea-00' style='opacity:0;pointer-events:none;display:none'>
				<svg id="svg-00-div-02-div-00-hea-00" preserveAspectRatio="none" viewBox="0 0 10 10">
					<defs>
						<mask id="msk-00-svg-00-div-02-div-00-hea-00">
							<rect x='0' y='0' width="10" height="10" fill="white"></rect>
							<text id='txt-00-msk-00-svg-00-div-00-div-02-div-00-hea-00' x='2.5' y='4.7' transform='skewY(14)'> 3 </text>
							<text id='txt-00-msk-00-svg-00-div-00-div-02-div-00-hea-00' x='7.7' y='7.2' transform='skewY(-14)'> D </text>
						</mask>
					</defs>
					<path id='pth-00-svg-00-div-02-div-00-hea-00' d='M 0 1.25 L 3.55 0.3625 A 6 6 0 0 1 6.45 0.3625 L 10 1.25 L 5 2.5 Z 
																	 M 5.25 2.9375 L 10 1.75 L 10 7.75 L 5.25 8.9375 Z 
																	 M 4.75 2.9375 L 0 1.75 L 0 7.75 L 4.75 8.9375 Z' mask='url(#msk-00-svg-00-div-02-div-00-hea-00)'></path>
				</svg>
				<label id='lbl-00-div-02-div-00-hea-00'>
					3D Tour
				</label>
			</div>
			
			<div id='div-03-div-00-hea-00' style='opacity:0;pointer-events:none;display:none'>
				<svg id="svg-00-div-03-div-00-hea-00" preserveAspectRatio="none" viewBox="0 0 10 10">
					<path id='pth-00-svg-00-div-03-div-00-hea-00' d='M 0.5 1.5 L 9.5 1.5 L 9.5 2.5 L 0.5 2.5 Z M 0.5 7.5 L 9.5 7.5 L 9.5 8.5 L 0.5 8.5 Z M 0.5 2.5 L 0.5 7.5 M 9.5 2.5 L 9.5 7.5'></path>
					<path id='pth-01-svg-00-div-03-div-00-hea-00' d='M 2 1.5 L 2 2.5 M 3.5 1.5 L 3.5 2.5 M 5 1.5 L 5 2.5 M 6.5 1.5 L 6.5 2.5 M 8 1.5 L 8 2.5 M 2 7.5 L 2 8.5 M 3.5 7.5 L 3.5 8.5 M 5 7.5 L 5 8.5 M 6.5 7.5 L 6.5 8.5 M 8 7.5 L 8 8.5'></path>
					<path id='pth-02-svg-00-div-03-div-00-hea-00' d='M 4 3.5 L 7 5 L 4 6.5 Z'></path>
				</svg>
				<label id='lbl-00-div-03-div-00-hea-00'>
					Videos
				</label>
			</div>
			
			<div id='div-04-div-00-hea-00' style='opacity:0;pointer-events:none;display:none'>
				<svg id="svg-00-div-04-div-00-hea-00" preserveAspectRatio="none" viewBox="0 0 10 10">
					<defs>
						<mask id="msk-00-svg-00-div-04-div-00-hea-00">
							<rect x='0' y='0' width="10" height="10" fill="white"></rect>
							<rect id='rct-00-msk-00-svg-00-div-04-div-00-hea-00' x='3.5' y='0.5' width="3" height="1.5" rx='0.5' ry='0.5'></rect>
							<circle id='ccl-00-msk-00-svg-00-div-04-div-00-hea-00' cx='5' cy='6' r='2'></circle>
						</mask>
					</defs>
					<path id='pth-00-svg-00-div-04-div-00-hea-00' d='M 10 8 A 1 1 0 0 1 9 9 L 1 9 A 1 1 0 0 1 0 8 L 0 4 A 1 1 0 0 1 1 3 L 1 2.5 L 2.5 2.5 L 2.5 3 L 3 3 L 3 1 A 1 1 0 0 1 4 0 L 6 0 A 1 1 0 0 1 7 1 L 7 3 L 9 3 A 1 1 0 0 1 10 4 Z' mask='url(#msk-00-svg-00-div-04-div-00-hea-00)'></path>
				</svg>
				<label id='lbl-00-div-04-div-00-hea-00'>
					Photos
				</label>
			</div>
			
			<div id='div-05-div-00-hea-00' style='opacity:0;pointer-events:none;display:none'>
				<svg id="svg-00-div-05-div-00-hea-00" preserveAspectRatio="none" viewBox="0 0 10 10">
					<path id='pth-00-svg-00-div-05-div-00-hea-00' d='M 6.4 6.4 L 9 9'></path>
					<circle id='ccl-00-svg-00-div-05-div-00-hea-00' cx='4' cy='4' r='3.4'></circle>
					<text id='txt-00-svg-00-div-05-div-00-hea-00' x='4' y='4.2'> i </text>
				</svg>
				<label id='lbl-00-div-05-div-00-hea-00'>
					Property Info
				</label>
			</div>
			
		</div>
	</header>
	<div id="div-00">
	<script type='text/javascript'>
		var switch_page = false;
	</script>
		
	<script type='text/javascript' src='<?php echo $root ?>includes/header.js'></script>
<?php
}
?>