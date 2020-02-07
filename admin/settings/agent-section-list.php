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



	$page_title = "agent-list";



	$page_name = 'Agent List';





	$content_only = isset($_SERVER['HTTP_CONTENT_ONLY']) && ($_SERVER['HTTP_CONTENT_ONLY'] == 1);



	header('Page-Name: ' . $page_name); 

	header('Page-Title: ' . $page_title); 

	

	$version = '1.00.00';

	include($_SERVER['DOCUMENT_ROOT'].'/admin/header_agent.php');

?>



	

<div id="div-00" style="background-color: rgb(245,245,245); font-family: 'Lato', sans-serif;">

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
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/team-section-list' >

		Manage Teams

			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>

		</a>

	</div>

</aside>

<div><h2></h2></div>

<br>
<br>
<div class="agent-table">
<form name="search_here" method="post" action=<?php echo $_SERVER["PHP_SELF"]; ?>>
<select name="select_search_by" class="search_text">
	<option>Select</option>
	<option value="<?php echo ($_POST['select_search_by'] == 'full_name') ?  $_POST['select_search_by'] :  'full_name' ?>"   <?php if ($_POST['select_search_by'] == 'full_name') {echo 'selected';} ?>>Full Name</option>
	<option value="<?php echo ($_POST['select_search_by'] == 'occupation') ?  $_POST['select_search_by'] :  'occupation' ?>"  <?php if ($_POST['select_search_by'] == 'occupation') {echo 'selected';} ?>>Occupation</option>
	<option value="<?php echo ($_POST['select_search_by'] == 'email') ?  $_POST['select_search_by'] :  'email' ?>" 		 <?php if ($_POST['select_search_by'] == 'email') {echo 'selected';} ?>> Email</option>
	<option value="<?php echo ($_POST['select_search_by'] == 'description') ?  $_POST['select_search_by'] :  'description' ?>" <?php if ($_POST['select_search_by'] == 'description') {echo 'selected';} ?>>Description</option>
</select>
<input type="search" name="search_here" value="<?php echo $_POST['search_here']; ?>" placeholder="Seach Agent Here" class="search_textfield"/>
<input type="submit" name="search_here_btn" value="Search" class="search_btn" />

<a id="a-01-div-00-a-hea-00" href="agent-section-list.php" style="cursor:pointer;margin:10px;background-color: rgb(121, 119, 123);padding: 10.5px;">Reset</a>

</form>

<a id="a-01-div-00-a-hea-00" href="agent.php" style="cursor:pointer;text-decoration:none;float:right;" align="right">Add Agent</a>
<div style="margin-bottom: 30px;">

	<h2>Agent List</h2>
	
<table>

  <tr>

    <th>Full Name</th>

    <th>Occupation</th>

	<th>Email</th>

	<th>Cell Phone</th>

	<th>(O)Phone</th>

	<th>Social Links</th>

	<th>Website</th>

	<th>Image</th>

	
	<th style="text-align:center;">Action</th>

  </tr>

  <?php 

	if(isset($_POST['search_here_btn'])){
		$_SESSION['search'] = 'yes';
		$select_search_by   = $_POST['select_search_by'];
		$search_here        = $_POST['search_here'];
	
		$fetchqry = "SELECT * FROM `agent` where $select_search_by LIKE '%$search_here%' ORDER BY time DESC"; 
	}
	else
	{
		$_SESSION['search'] = 'no';
    	$fetchqry = "SELECT * FROM `agent` where status=1 ORDER BY time DESC"; 
	}
		
	$result=mysqli_query($conn,$fetchqry);

	$num=mysqli_num_rows($result);

	if($num > 0){

		while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){ ?>

		<tbody>

				<tr>
						<td width="20%"><?php echo $row['full_name']; ?></td>

						<td><?php echo $row['occupation'];?></td>

						<td><?php echo $row['email'];?></td>

						<td><?php echo $row['phone_no'];?></td>

						<td><?php echo $row['office_phno'];?></td>

						<td style="text-align: center;">	
						<?php if($row['facebook_link']){ ?>
						<a href="<?php echo $row['facebook_link'];?>" target="_blank"><i style="font-size:30px; color:#3b5998" class="fa fa-facebook-square"></i></a>
						<?php
						}
							?>
								<?php if($row['instagramlink']){ ?>
						<a href="<?php echo $row['instagramlink'];?>" target="_blank"><i style="font-size:30px; color:#3b5998" class="fa fa-instagram"></i></a>
						<?php
						}
							?>
								<?php if($row['youtubelink']){ ?>
						<a href="<?php echo $row['youtubelink'];?>" target="_blank"><i style="font-size:30px; color:#3b5998" class="fa fa-youtube-play"></i></a>
						<?php
						}
							?></td>

						<td><p><a href="<?php echo $row['website'];?>" target="_blank"><i style="font-size:30px; color:#3b5998" class="fa fa-globe"></i></a></p></td>

						<td>
						<?php
						if($row['imagename']){
							?>
						<img src="../../processes/upload/<?php echo $row['imagename_thumb']?>" width="70px" /> 
						<?php
						}
						else
						{?>
						<img src="../../images/agents/agent_default.png" width="70px" />
						<?php
						}
						?>
						</td>

						<td width="10%" style="text-align:center;">
							<i style="font-size:20px;" class="fa fa-trash-o" value="Delete" id="delbutton" onclick="delete_agent(<?php echo $row['id']; ?>)"></i>
							<i style="font-size:20px;" class="fa fa-pencil" value="Edit" id="editbutton"   onclick="edit_agent(<?php echo $row['id']; ?>)"></i>
						</td>

				</tr>

			   </tbody>

			   <script language="javascript">

				function delete_agent(delid) 

				{
                 r=confirm('Are you sure you want to delete the Agent?')
				 if(r){
					window.location.href='/processes/action_agent.php?del_id='+delid+'';

				return true;
				 }
				 else{
					 return false;
				 }
						

				}

				function edit_agent(editid) 

				{

						window.location.href='agent.php?edit_id='+editid+'';

						return true;

				}

				</script>

			   

	<?php

		} }else { ?>

	<tbody><tr><td colspan="11" style="text-align: center;width:20%;">No Record Found</td></tr></tbody>


	<?php } ?>

  

  



</table>

		</div>
</div>
	</div>



	<?php 



include($_SERVER['DOCUMENT_ROOT'].'/admin/footer.php');



} else {

	$url_parameter = substr($_SERVER['REQUEST_URI'], 1);

	$url_parameter = preg_replace("/\//", "~", $url_parameter);

	$url_parameter = preg_replace("/\?/", "%", $url_parameter);

	$url_parameter = preg_replace("/\&/", "+", $url_parameter);

	

	include($_SERVER['DOCUMENT_ROOT'].'/admin/header_agent.php');

}?>

