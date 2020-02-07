<?php 
	$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';
?>

<link href="<?php echo $root ?>main-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">

<link href="<?php echo $root ?>1200-header-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>0-header-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>1200-footer-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>600-footer-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>0-footer-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">

<?php if($page_title === 'property'){?>
	<link href="<?php echo $root ?>1200-property-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
	<link href="<?php echo $root ?>600-property-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
	<link href="<?php echo $root ?>0-property-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<link href="<?php echo $root ?>admin/1200-header-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/600-header-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/0-header-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">

<link href="<?php echo $root ?>admin/1200-footer-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/600-footer-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/0-footer-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">

<?php if($page_title === 'details-and-profile-settings'){?>
<link href="<?php echo $root ?>admin/settings/details-and-profile-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<?php if($page_title === 'emails-and-notifications-settings'){?>
<link href="<?php echo $root ?>admin/settings/emails-and-notifications-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<?php if($page_title === 'agent-section-settings'){?>
<link href="<?php echo $root ?>admin/settings/agent-section-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<?php if($page_title === 'agent'){?>

<link href="<?php echo $root ?>admin/settings/agent-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">

<?php } ?>
<?php if($page_title === 'agent-list'){?>

<link href="<?php echo $root ?>admin/settings/agent-list-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">

<?php } ?>
<?php if($page_title === 'team'){?>

<link href="<?php echo $root ?>admin/settings/team-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">

<?php } ?>
<?php if($page_title === 'team-list'){?>

<link href="<?php echo $root ?>admin/settings/team-list-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">

<?php } ?>
<?php if($page_title === 'login'){?>
    <link href="<?php echo $root ?>admin/0-login-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo $root ?>admin/600-login-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo $root ?>admin/1200-login-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<?php if($page_title === 'manage-users'){?>
<link href="<?php echo $root ?>admin/users/1000-manage-users-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/users/600-manage-users-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/users/0-manage-users-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<?php if($page_title === 'removed-users'){?>
<link href="<?php echo $root ?>admin/users/1000-removed-users-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/users/600-removed-users-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/users/0-removed-users-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<?php if($page_title === 'user-requests'){?>
<link href="<?php echo $root ?>admin/users/1000-manage-sites-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/users/600-manage-sites-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/users/0-manage-sites-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<?php if($page_title === 'register'){?>
<link href="<?php echo $root ?>admin/1200-register-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/600-register-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/0-register-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<?php if($page_title === 'forgot-password'){?>
<link href="<?php echo $root ?>admin/1200-forgot-password-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/600-forgot-password-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/0-forgot-password-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<?php if($page_title === 'email-verification'){?>
<link href="<?php echo $root ?>admin/1200-email-verification-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/600-email-verification-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/0-email-verification-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<?php if($page_title === 'awaiting-confirmation'){?>
<link href="<?php echo $root ?>admin/1200-awaiting-confirmation-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/600-awaiting-confirmation-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/0-awaiting-confirmation-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<?php if($page_title === 'new-site'){?>
<link href="<?php echo $root ?>admin/sites/1000-new-site-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/sites/600-new-site-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/sites/0-new-site-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<?php if($page_title === 'manage-sites'){?>
<link href="<?php echo $root ?>admin/sites/1000-manage-sites-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/sites/600-manage-sites-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/sites/0-manage-sites-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<?php if($page_title === 'removed-sites'){?>
<link href="<?php echo $root ?>admin/sites/1000-removed-sites-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/sites/600-removed-sites-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/sites/0-removed-sites-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<?php if($page_title === 'schedule-sites'){?>
<link href="<?php echo $root ?>admin/sites/1000-schedule-sites-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/sites/600-schedule-sites-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/sites/0-schedule-sites-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<?php if($page_title === 'files'){?>
<link href="<?php echo $root ?>admin/sites/1000-files-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/sites/600-files-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/sites/0-files-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>


<?php if($page_title === 'set-new-site'){?>
<link href="<?php echo $root ?>admin/sites/1000-set-new-site-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/sites/600-set-new-site-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/sites/0-set-new-site-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<?php if($page_title === 'site-editor'){?>
<link href="<?php echo $root ?>admin/sites/1000-site-editor-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/sites/0-site-editor-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>

<?php if($page_title === 'view-metrics'){?>
<link href="<?php echo $root ?>admin/metrics/1000-view-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/metrics/600-view-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<link href="<?php echo $root ?>admin/metrics/0-view-stylesheet.css?version-number=<?php echo $version_num ?>" rel="stylesheet" type="text/css">
<?php } ?>
