<?php 
	$root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';

	session_start();
	
	if(isset($_SESSION['user-id'])){
	include '../../processes/db-conn.php';
	error_reporting(0);
	//disable browser caching !!IMPORTANT
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Access-Control-Allow-Credentials: true");
	header("Pragma: no-cache");
	header("Access-Control-Allow-Origin: http://www.klemequestrianestates.com");

	$page_title = "team";
	$imgerror="";
	if(isset($_REQUEST['img']) && $_REQUEST['img'] == 'sizeerror'){
		$imgerror="Images size should not be grater than 5MB";
	}
	else if(isset($_REQUEST['img']) && $_REQUEST['img'] == 'imagetypeerror'){
		$imgerror="Please upload only supported formats";
	}

	if(isset($_REQUEST['edit_id'])){
		
		 $query = "SELECT * FROM `team` where id='".$_REQUEST['edit_id']."'";
		 
		$result = mysqli_query($conn, $query) or die ( mysqli_error());
		$row = mysqli_fetch_assoc($result); 
		
			$page_name = 'Edit Team';
		}
		else{
			$page_name = 'Add Team';
		}


	$content_only = isset($_SERVER['HTTP_CONTENT_ONLY']) && ($_SERVER['HTTP_CONTENT_ONLY'] == 1);

	header('Page-Name: ' . $page_name); 
	header('Page-Title: ' . $page_title); 
	
	$version = '1.00.00';
	include($_SERVER['DOCUMENT_ROOT'].'/admin/header_agent.php');
?>

<div id="div-00" style="font-family: 'Lato', sans-serif;">
	<script type='text/javascript'>
		var switch_page = false;
		var DOCUMENT_ROOT = '<?php echo $root ?>';
	</script>

<aside id='asd-00-div-00'>
	<div class='div-00-asd-00-div-00'>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/details-and-profile'>
			Details &amp; Profile
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/agent-section'>
			Agent Section
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/emails-and-notifications'>
			Emails &amp; Notifications
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/agent-section-list'>
			Manage Agents
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/team-section-list' style='color: rgb(130,0,255)'>
			Manage Team 
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
	</div>
</aside>
<div><h2></h2></div>
<br><br>
<?php if(isset($_REQUEST['edit_id'])){ echo '<a id="a-01-div-00-a-hea-00" href="team.php" style="cursor:pointer;text-decoration:none;float:right;" align="right">Add Team</a>'; } ?>

<div style="margin-bottom: 30px;" align="center">

<a id="a-01-div-00-a-hea-00" style="cursor:pointer;text-decoration:none;float:right;" href='<?php echo $root ?>admin/settings/team-section-list.php' align="right">Back</a>


<form action="/processes/action_team.php" method="post" enctype="multipart/form-data">
<h2><?php if(isset($_REQUEST['edit_id'])){ echo 'Edit'; } else { echo 'Add'; } ?> Team</h2><br><br>
<?php
if($imgerror!=''){
	?>
<br><span style="color:red;text-aligh:center"><?php echo $imgerror?></span>
<?php
}
?>
<table>								
<tr>
	<td height="70" width="100">Team name</td><td>
	<?php if(isset($_REQUEST['edit_id'])){ ?>
	<input type="hidden" name="edit_id" value="<?php echo $_REQUEST['edit_id']; ?>" /> 
	<?php } ?>
		<input type="text"  name="team_name" value="<?php echo ($row['team_name']=='no title') ?  ' ' :  $row['team_name'] ?>" class="resizedTextbox"><br><br>
	</td>
</tr>
<?php if(isset($_REQUEST['edit_id'])){ 
			if($row['team_logo']){ ?>
			<tr>
				<td height="70" width="100" >Uploaded Logo</td>
				<input type="hidden" name="old_image" value="<?php echo $row['team_logo']; ?>" /> 
				<input type="hidden" name="old_image_thumb" value="<?php echo $row['team_logo_thumb']; ?>" /> 
				<td><img src='../../processes/upload_team/<?php echo $row['team_logo_thumb'];?>'  width="100px"/></td>
				<?php }else{ ?>	<td><img src="../../images/agents/agent_default.png" width="100px" /> <td>
				</td>
		    </tr>
<?php }}?>


<tr>
	<td colspan="2" align="center">
		<div class="upload-btn-wrapper">
			<button class="btn">Select Logo</button>
			<input type="file" class="cck" required="required" name="sfile" id="files" accept="image/*">
			<br /><span style="font-size:11px">Note: Please upload image max size 5MB. Supported formats are JPEG/PNG. <br />
			Please upload image of resolution minimum 300x300 px.
			</span>
			<br><output id="list"></output>
		</div>
	</td>

</tr>
<tr><td colspan="2">
	<input class="cck" type="submit" name="<?php if(isset($_REQUEST['edit_id'])){ echo 'edit_'; }else{ echo 'insert_';} ?>team" value="<?php if(isset($_REQUEST['edit_id'])){ echo 'UPDATE'; }else{ echo 'SUBMIT';} ?>"
/>
</td>
</tr>
</table>
</form>
		</div>
	</div>

<?php 

include($_SERVER['DOCUMENT_ROOT'].'/admin/footer.php');

} else {
	$url_parameter = substr($_SERVER['REQUEST_URI'], 1);
	$url_parameter = preg_replace("/\//", "~", $url_parameter);
	$url_parameter = preg_replace("/\?/", "%", $url_parameter);
	$url_parameter = preg_replace("/\&/", "+", $url_parameter);
	
	header('Location: '.$root.'admin/login.php?url='.$url_parameter);
}?>
<script>
	function handleFileSelect(evt) {
    var files = evt.target.files;
	document.getElementById('list').innerHTML='';
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
		   // Render thumbnail.
         var image = new Image();

            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;
            
            //Validate the File Height and Width.
            image.onload = function () {
              var height = this.height;
              var width = this.width;
             
              if (height < 300 || width < 300) {
                alert("Please upload image of resolution minimum 300x300 px");
                return false;
              }
              else{
          var span = document.createElement('span');
          span.innerHTML = 
          [
            '<img style="height: 75px; border: 1px solid #000; margin: 5px" src="', 
            e.target.result,
            '" title="', escape(theFile.name), 
            '"/>'
          ].join('');
          
          document.getElementById('list').insertBefore(span, null);
        };
		}
		}
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
</script>
