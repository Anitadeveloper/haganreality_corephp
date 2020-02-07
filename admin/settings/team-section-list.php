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

	$page_title = "team-list";

	$page_name = 'List Team';


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
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/agent-section-list'>
			Manage Agents
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
		<a class='a-00-div-00-asd-00-div-00' href='<?php echo $root ?>admin/settings/team-section-list' style='color: rgb(130,0,255)'>
			Manage Teams
			<label class='lbl-00-a-00-div-00-asd-00-div-00' style='background-color:rgb(255,50,50); color:white; display:none'>!</label>
		</a>
	</div>
</aside>
<div><h2></h2></div>
<br/><br/>
<div class="team-table">
<form name="search_here" method="post" action=<?php echo $_SERVER["PHP_SELF"]; ?>>
<input type="search" name="search_here" value="<?php echo $_POST['search_here']; ?>" placeholder="Seach by Team Name" class="search_textfield"/>
<input type="submit" name="search_here_btn" value="Search" class="search_btn"/>
<a id="a-01-div-00-a-hea-00" href="team-section-list.php" style="cursor:pointer;margin:10px;background-color: rgb(121, 119, 123);padding: 10.5px;">Reset</a>

</form>
<a id="a-01-div-00-a-hea-00" href="team.php" style="cursor:pointer;text-decoration:none;float:right;" align="right">Add Team</a>
<div style="margin-bottom: 30px;">
<h2> Team List</h2>
							
<table>
  <tr>
    <th style="text-align:center;width: 40%;">Team Name</th>
    <th style="text-align:center;width:53%;">Logo</th>
	<th style="text-align:center;">Action</th>
  </tr>
  <?php 

	if(isset($_POST['search_here_btn'])){
		$_SESSION['search'] = 'yes';
		$search_here        = $_POST['search_here'];

		$fetchqry = "SELECT * FROM `team` where team_name LIKE '%$search_here%' ORDER BY created_date DESC"; 
	}
	else
	{
		$_SESSION['search'] = 'no';
		$fetchqry = "SELECT * FROM `team` where status=1 ORDER BY created_date DESC"; 
	}

	$result=mysqli_query($conn,$fetchqry);
	$num=mysqli_num_rows($result);
	if($num > 0){
		while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){ ?>
		<tbody>
				<tr>
						<td width="25%" style="text-align:center;"><?php echo ($row['team_name'] == 'no title') ? 'N/A' :  $row['team_name']; ?></td>
						<td style="text-align:center;"><img src="../../processes/
							upload_team/<?php echo $row['team_logo_thumb']?>" style="width:50px;height:50px;"/> 
						</td>
						<td style="text-align:center;with:10%">
							<i style="font-size:20px;" class="fa fa-trash-o" value="Delete" id="delbutton" onclick="delete_team(<?php echo $row['id']; ?>)"></i>
							<i style="font-size:20px;" class="fa fa-pencil" value="Edit" id="editbutton"   onclick="edit_team(<?php echo $row['id']; ?>)"></i>
						</td>
				</tr>
			   </tbody>
			   <script language="javascript">
				function delete_team(delid) 
				{
					r=confirm('Are you sure want to delete this team?')
				 if(r){
						window.location.href='/processes/action_team.php?del_id='+delid+'';
						return true;
				 }
				 else
				 {
					return false;
				 }
				}
				function edit_team(editid) 
				{
						window.location.href='team.php?edit_id='+editid+'';
						return true;
				}
				</script>
			   
	<?php
		} }else { ?>
	<tbody><tr><td colspan="3" style="text-align:center;width:20%">No Record Found</td></tr></tbody>
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
