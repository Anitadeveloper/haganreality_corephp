<?php 
	error_reporting(0);
	//disable browser caching !!IMPORTANT
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Access-Control-Allow-Credentials: true");
	header("Pragma: no-cache");
	header("Access-Control-Allow-Origin: *");

	$active_tab = null;

	if(!isset($page_title)) {
		$page_title = "";
	}

	if($page_title === 'new-site'){
		$page_name = 'New Site';
		$active_tab = 0;
	}

	if($page_title === 'manage-sites'){
		$page_name = 'Manage Sites';
		$active_tab = 0;
	}

	if($page_title === 'removed-sites'){
		$page_name = 'Removed Sites';
		$active_tab = 0;
	}

	if($page_title === 'schedule-sites'){
		$page_name = 'Schedule Sites';
		$active_tab = 0;
	}

	if($page_title === 'files'){
		$page_name = 'Files';
		$active_tab = 0;
	}




	if($page_title === 'create-user'){
		$page_name = 'Create User';
		$active_tab = 1;
	}

	if($page_title === 'manage-users'){
		$page_name = 'Manage Users';
		$active_tab = 1;
	}

	if($page_title === 'user-requests'){
		$page_name = 'User Requests';
		$active_tab = 1;
	}

	if($page_title === 'removed-users'){
		$page_name = 'Removed Users';
		$active_tab = 1;
	}




	if($page_title === 'set-new-site'){
		$page_name = 'Set New Site';
	}

	if($page_title === 'site-editor'){
		$page_name = 'Site Editor';
	}

	if($page_title === 'login'){
		$page_name = 'Login';
	}

	if($page_title === 'register'){
		$page_name = 'Register';
	}

	if($page_title === 'forgot'){
		$page_name = 'Forgot Password';
	}

	if($page_title === 'view-metrics'){
		$page_name = 'Metrics';
		$active_tab = 2;
	}



    if($page_title === 'agent-section-settings'){
		$page_name = 'Agent Section | Settings';
	}

	if($page_title === 'details-and-profile-settings'){
		$page_name = 'Details & Profile | Settings';
	}

	if($page_title === 'emails-and-notifications-settings'){
		$page_name = 'Emails & Notifications | Settings';
	}


	$content_only = isset($_SERVER['HTTP_CONTENT_ONLY']) && ($_SERVER['HTTP_CONTENT_ONLY'] == 1);
	if($content_only){
		header('Page-Name: ' . $page_name); 
		header('Page-Title: ' . $page_title); 
	}
	else {
	
	$version_num = '0.99.1';
	
?>
<!Doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title><?= $page_name ?> | Hagan Realty</title>
	
	<meta charset="UTF-8">
	<meta http-equiv="Content-Language" content="eng">
	
	<?php include($_SERVER['DOCUMENT_ROOT'].'/includes/stylesheets.php') ?>
	<?php// include($_SERVER['DOCUMENT_ROOT'].'/includes/fonts.php') ?>
	<?php //include($_SERVER['DOCUMENT_ROOT'].'/cron/visitor-location.php'); ?>
	
	<link rel="icon" type="image/png" sizes="32x32" href="<?php $root ?>images/favicon/favicon-32x32.png?version=<?php echo $version ?>">
	<link rel="icon" type="image/png" sizes="16x16" href="<?php $root ?>images/favicon/favicon-16x16.png?version=<?php echo $version ?>">
	<link rel="manifest" href="<?php echo $root ?>images/favicon/site.webmanifest?version=<?php echo $version ?>">
	<link rel="mask-icon" href="<?php echo $root ?>images/favicon/safari-pinned-tab.svg?version=<?php echo $version ?>" color="#9530ff">
	<link rel="shortcut icon" href="<?php echo $root ?>images/favicon/favicon.ico?version=<?php echo $version ?>">
	<meta name="msapplication-TileColor" content="#00aba9">
	<meta name="msapplication-config" content="<?php echo $root ?>images/favicon/browserconfig.xml?version=<?php echo $version ?>">
	<meta name="theme-color" content="#ffffff">

	
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	
	<!-- Global site tag (gtag.js) - Google Analytics --> -->
	 <!-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-110072249-3"></script> 
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());

	  gtag('config', 'UA-110072249-3');
	</script> -->
	
</head>

<body id='<?= $page_title ?>'>
	<script type='text/javascript'>
		var DOCUMENT_ROOT = '<?php echo $root ?>';
		
		var UPDATE_SITE_COUNTERS = false;
	</script>
	<header id='a-hea-00'>
		<div id='div-00-a-hea-00'>
			<div id='div-00-div-00-a-hea-00'>
				<img id='img-00-div-00-div-00-a-hea-00' src='<?php echo $root ?>images/logo/logo_alternative.png'>
			</div>
			<span id='spn-00-div-00-a-hea-00'></span>
			<a class='a-00-div-00-a-hea-00' href='<?php echo $root ?>admin/sites/manage-sites' style='<?php if($active_tab === 0){?>border-bottom:2px solid rgb(90,0,255); color:rgb(90,0,255);<?php } ?>max-width:70px'>
				Sites
			</a>
			<a class='a-00-div-00-a-hea-00' href='<?php echo $root ?>admin/users/manage-users' style='<?php if($active_tab === 1){?>border-bottom:2px solid rgb(90,0,255); color:rgb(90,0,255);<?php } ?>max-width:75px'>
				Users
			</a>
			<a class='a-00-div-00-a-hea-00' href='<?php echo $root ?>admin/metrics/view' style='<?php if($active_tab === 2){?>border-bottom:2px solid rgb(90,0,255); color:rgb(90,0,255);<?php } ?>max-width:87px'>
				Metrics
			</a>
			<?php if($page_title !== 'site-editor' && $page_title !== 'set-new-site') { ?>
			<a id='a-01-div-00-a-hea-00' href='<?php echo $root ?>admin/sites/set-new-site'>
				New Site
			</a>
			<?php } ?>
			<div id='div-01-div-00-a-hea-00' <?php if($page_title === 'site-editor' || $page_title === 'set-new-site') { ?>style='margin:10px 30px 10px auto' <?php } ?>>
				<span>
					<img id='img-00-spn-00-div-01-div-00-a-hea-00' src='<?php echo $root ?>/images/user-profile/default.jpg'>
				</span>
				<svg id='svg-00-div-01-div-00-a-hea-00' viewBox="0 0 10 10" preserveAspectRatio="none">
					<path d='M 0 3 L 10 3 L 5 9 Z'></path>
				</svg>
			</div>
		</div>
	</header>
	
	<div id='h-div-00' style='display:none; transform:scale(0.9)'>
		<svg id='svg-00-h-div-00' viewBox="0 0 10 10" preserveAspectRatio="none">
			<path d='M 0 10 L 3 6 A 2.5 2.5 0 0 1 7 6 L 10 10 Z'></path>
		</svg>
		<div id='div-00-h-div-00'>
			<span id='spn-00-div-00-h-div-00'>
				<img src='<?php echo $root ?>/images/user-profile/default.jpg'>
			</span>
			<h2>
				Good Morning, Jed Williams
			</h2>
			<label>
				Administrator
			</label>
		</div>
		<div id='div-01-h-div-00'>
			<button class='btn-01-div-01-h-div-00'>
				<svg class='svg-00-btn-00-div-01-h-div-00'  viewBox="0 0 24 24" preserveAspectRatio="none">
					<path d="M15.137 4.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 19c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z"></path>
				</svg>
				<label class='lbl-00-btn-00-div-01-h-div-00'>5</label>
			</button>
			<button class='btn-00-div-01-h-div-00'>
				<svg class='svg-00-btn-00-div-01-h-div-00'  viewBox="0 0 24 24" preserveAspectRatio="none">
					<path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z"></path>
				</svg>
				<label class='lbl-00-btn-00-div-01-h-div-00'>4</label>
			</button>
			<button class='btn-00-div-01-h-div-00'>
				<svg class='svg-00-btn-00-div-01-h-div-00'  viewBox="0 0 24 24" preserveAspectRatio="none">
					<path d="M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"></path>
				</svg>
				<label class='lbl-00-btn-00-div-01-h-div-00' style='opacity:0'></label>
			</button>
		</div>
		<div id='div-02-h-div-00'>
			<div class='div-00-div-02-h-div-00'>
				<img class='img-00-div-00-div-02-h-div-00' src='<?php echo $root ?>images/user-profile/default.jpg'>
				<h4 class='h4-00-div-00-div-02-h-div-00'>
					User Request
				</h4>
				<label class='lbl-00-div-00-div-02-h-div-00'>
					melissaklem@haganrealty.com
				</label>
			</div>
			<div class='div-00-div-02-h-div-00'>
				<img class='img-00-div-00-div-02-h-div-00' src='<?php echo $root ?>images/user-profile/default.jpg'>
				<h4 class='h4-00-div-00-div-02-h-div-00'>
					User Request
				</h4>
				<label class='lbl-00-div-00-div-02-h-div-00'>
					melissaklem@haganrealty.com
				</label>
			</div>
			<div class='div-00-div-02-h-div-00'>
				<img class='img-00-div-00-div-02-h-div-00' src='<?php echo $root ?>images/user-profile/default.jpg'>
				<h4 class='h4-00-div-00-div-02-h-div-00'>
					User Request
				</h4>
				<label class='lbl-00-div-00-div-02-h-div-00'>
					melissaklem@haganrealty.com
				</label>
			</div>
			<div class='div-00-div-02-h-div-00'>
				<img class='img-00-div-00-div-02-h-div-00' src='<?php echo $root ?>images/user-profile/default.jpg'>
				<h4 class='h4-00-div-00-div-02-h-div-00'>
					User Request
				</h4>
				<label class='lbl-00-div-00-div-02-h-div-00'>
					melissaklem@haganrealty.com
				</label>
			</div>
			<div class='div-00-div-02-h-div-00'>
				<img class='img-00-div-00-div-02-h-div-00' src='<?php echo $root ?>images/user-profile/default.jpg'>
				<h4 class='h4-00-div-00-div-02-h-div-00'>
					User Request
				</h4>
				<label class='lbl-00-div-00-div-02-h-div-00'>
					melissaklem@haganrealty.com
				</label>
			</div>
			<button id='btn-00-div-02-h-div-00'>
				View More
			</button>
		</div>
		
		<div id='div-03-h-div-00' style='display:none'>
			<div class='div-00-div-03-h-div-00'>
				<div class='div-00-div-00-div-03-h-div-00'>
					<label class='lbl-00-div-00-div-00-div-03-h-div-00'>
						JL
					</label>
				</div>
				<h4 class='h4-00-div-00-div-03-h-div-00'>
					Joshua Lyness
				</h4>
				<label class='lbl-00-div-00-div-03-h-div-00'>
					joshualyness@outlook.com
				</label>
			</div>
			<div class='div-00-div-03-h-div-00'>
				<div class='div-00-div-00-div-03-h-div-00'>
					<label class='lbl-00-div-00-div-00-div-03-h-div-00'>
						JL
					</label>
				</div>
				<h4 class='h4-00-div-00-div-03-h-div-00'>
					Joshua Lyness
				</h4>
				<label class='lbl-00-div-00-div-03-h-div-00'>
					joshualyness@outlook.com
				</label>
			</div>
			<div class='div-00-div-03-h-div-00'>
				<div class='div-00-div-00-div-03-h-div-00'>
					<label class='lbl-00-div-00-div-00-div-03-h-div-00'>
						JL
					</label>
				</div>
				<h4 class='h4-00-div-00-div-03-h-div-00'>
					Joshua Lyness
				</h4>
				<label class='lbl-00-div-00-div-03-h-div-00'>
					joshualyness@outlook.com
				</label>
			</div>
			<div class='div-00-div-03-h-div-00'>
				<div class='div-00-div-00-div-03-h-div-00'>
					<label class='lbl-00-div-00-div-00-div-03-h-div-00'>
						JL
					</label>
				</div>
				<h4 class='h4-00-div-00-div-03-h-div-00'>
					Joshua Lyness
				</h4>
				<label class='lbl-00-div-00-div-03-h-div-00'>
					joshualyness@outlook.com
				</label>
			</div>
			<button id='btn-00-div-03-h-div-00'>
				See All
			</button>
		</div>
		
		<div id='div-04-h-div-00' style='display:none'>
			<a class='a-00-div-04-h-div-00' href='<?php echo $root ?>admin/settings/details-and-profile'>
				Settings
			</a>
			<a class='a-00-div-04-h-div-00' href='<?php echo $root ?>admin/settings/details-and-profile/change-password'>
				Change Password
			</a>
			<a class='a-00-div-04-h-div-00' href='<?php echo $root ?>admin/login'>
				Logout
				<svg viewBox='0 0 24 24' preserveAspectRatio="none">
					<path d="M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z"></path>
				</svg>
			</a>
		</div>
		
		<!-- notify new user requests, new sites being published -->
		
		<!-- send schedule requests -->
		
		<!-- settings tab includes change details, change password, & logout -->
		
	</div>
	
	
	<div id="div-00">
	<script type='text/javascript'>
		var switch_page = false;
	</script>
		
	<script type='text/javascript' src='<?php echo $root ?>/admin/header.js' async></script>

<?php
}
?>