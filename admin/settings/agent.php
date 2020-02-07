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



	$page_title = "agent";
	$imgerror="";
	if(isset($_REQUEST['img']) && $_REQUEST['img'] == 'sizeerror'){
		$imgerror="Images size should not be grater than 5MB";
	}
	else if(isset($_REQUEST['img']) && $_REQUEST['img'] == 'imagetypeerror'){
		$imgerror="Please upload only supported formats";
	}

	if(isset($_REQUEST['edit_id'])){

		

		 $query = "SELECT * FROM `agent` where id='".$_REQUEST['edit_id']."'";

		 

		$result = mysqli_query($conn, $query) or die ( mysqli_error());

		$row = mysqli_fetch_assoc($result); 

		

			$page_name = 'Edit Agent';

		}

		else{

			$page_name = 'Add Agent';

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

		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/agent-section-list' style='color: rgb(130,0,255)'>

		Manage Agents

			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>

		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/team-section-list'>

		Manage Team

			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>

		</a>

	</div>

</aside>

<div><h2></h2></div>

<br>

<?php if(isset($_REQUEST['edit_id'])){ echo '<a id="a-01-div-00-a-hea-00" href="agent.php" style="cursor:pointer;text-decoration:none;float:right;" align="right">Add Agent</a>'; } ?>



<div style="margin-bottom: 0px;" align="center">
<a id="a-01-div-00-a-hea-00" style="cursor:pointer;text-decoration:none;float:right;" href='<?php echo $root ?>admin/settings/agent-section-list.php' align="right">Back</a>
<form action="/processes/action_agent.php" method="post" enctype="multipart/form-data">

<h2 style="padding-left:90px">
<?php if(isset($_REQUEST['edit_id'])){ echo 'Edit'; } else { echo 'Add'; } ?> Agent</h2>
<?php
if($imgerror!=''){
	?>
<br><span style="color:red;text-aligh:center"><?php echo $imgerror?></span>
<?php
}
?>

<table width="800" cellpadding="10">								

<tr>
	<td width="50%"> 

	<?php if(isset($_REQUEST['edit_id'])){ ?>

	<input type="hidden" name="edit_id" value="<?php echo $_REQUEST['edit_id']; ?>" /> 

	<?php } ?>

		<input type="text" required="required" name="full_name" value="<?php echo isset($row['full_name']) ?  $row['full_name'] :  $_SESSION['s_full_name'] ?>" class="resizedTextbox" placeholder="Full name*" >

	</td>
	<td>

	 <input type="text" required="required" name="occupation" class="resizedTextbox" value="<?php echo isset($row['occupation']) ?  $row['occupation'] :  $_SESSION['s_occupation'] ?>" placeholder="Occupation*">
</td>
</tr>
<tr>
	<td>
		<input type="email" required="required" name="email" class="resizedTextbox" value="<?php echo isset($row['email']) ?  $row['email'] :  $_SESSION['s_email'] ?>"  placeholder="Email*">

	</td>
	<td>
	
	<input type="tel" maxlength="14" required="required" name="phone_no" class="resizedTextbox" value="<?php echo isset($row['phone_no']) ?  $row['phone_no'] :  $_SESSION['s_phoneno'] ?>"  placeholder="Cell Phone No*  eg. (123) 456-7890">

</td>
</tr>
<tr>
	<td>

		<input type="tel" maxlength="14" required="required" name="office_phno" class="resizedTextbox" value="<?php echo isset($row['office_phno']) ?  $row['office_phno'] :  $_SESSION['s_officeph'] ?>" placeholder="(O) Phone No* eg. (123) 456-7890">
	<td>
	
	<input type="text" name="description" class="resizedTextbox" value="<?php echo isset($row['description']) ?  $row['description'] :  $_SESSION['s_description'] ?>" placeholder="Description">

	</td>
	
<tr>
	<td>

		<input type="text" name="language" class="resizedTextbox" value="<?php echo isset($row['language']) ?  $row['language'] :  $_SESSION['s_language'] ?>" placeholder="Language">

	</td>
	<td><input type="text"  name="designation" class="resizedTextbox" value="<?php echo isset($row['designation']) ?  $row['designation'] :  $_SESSION['s_designation'] ?>" placeholder="Designation">

</td>

<tr>
    </td>
	<td><input type="url" required="required" name="facebook_link" class="resizedTextbox" value="<?php echo isset($row['facebook_link']) ?  $row['facebook_link'] :  $_SESSION['s_facebook'] ?>" placeholder="Facebook Link*">

</td>
	<td>
		<input type="url" required="required" name="website" class="resizedTextbox" value="<?php echo isset($row['website']) ?  $row['website'] :  $_SESSION['s_website'] ?>" placeholder="Website*">
	</td>

</tr>
<tr>
	<td>
		<input type="url" name="instagramlink" class="resizedTextbox" value="<?php echo isset($row['instagramlink']) ?  $row['instagramlink'] :  $_SESSION['s_instagramlink'] ?>" placeholder="Instagram Link">
	</td>
	<td>
	
	<input type="url" name="youtubelink" class="resizedTextbox" value="<?php echo isset($row['youtubelink']) ?  $row['youtubelink'] :  $_SESSION['s_youtubelink'] ?>" placeholder="Youtube Link">

	</td>
</tr>
<tr>
	<td colspan="2">
	<?php if(isset($_REQUEST['edit_id'])){ ?> 
		<div>
		<b>Profile Image: </b>
 	<?php
				if($row['imagename_thumb']){ ?>
				<img src="../../processes/upload/<?php echo $row['imagename_thumb']?>" width="100px" /> 
				<?php } else { ?>
					<img src="../../images/agents/agent_default.png" width="100px" />
				<?php } ?>
				</div> 
	<?php } ?>

	</td>
</tr>
<tr>
		<td  colspan="2" align="center">

	
<?php if(isset($_REQUEST['edit_id'])){ ?>

<input type="hidden" name="old_image" value="<?php echo $row['imagename']; ?>" /> 
<input type="hidden" name="old_image_thumb" value="<?php echo $row['imagename_thumb']; ?>" /> 

<?php } ?>

<div class="upload-btn-wrapper">
<button class="btn">Select Picture</button>
<input type="file" class="cck"  name="sfile" id="files" accept="image/*">

<br /><span style="font-size:11px">Note: Please upload image max size 5MB. Supported formats are JPEG/PNG</span>
<br /><span style="font-size:11px">Please upload image of resolution minimum 300x500 px or Portrait aspect ratio 3x2</span>
<br><output id="list"></output>
</div>

	</td>

</tr>

<tr>
	<td colspan="2">
	<input class="cck" type="submit" name="<?php if(isset($_REQUEST['edit_id'])){ echo 'edit_'; }else{ echo 'insert_';} ?>agent" value="<?php if(isset($_REQUEST['edit_id'])){ echo 'UPDATE'; }else{ echo 'SUBMIT';} ?>" />
</td>

</tr>

</table>

</form>

		<!-- <script type='text/javascript' src='<?php echo $root ?>admin/settings/agent.js'></script> -->

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
         var image = new Image();

            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;
            
            //Validate the File Height and Width.
            image.onload = function () {
              var height = this.height;
              var width = this.width;
             
              if (height < 500 || width < 300) {
                alert("Please upload image of resolution minimum 300x500 px");
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
               }
            };
         
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
	</script>
