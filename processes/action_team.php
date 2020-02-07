<?php
include 'db-conn.php';

session_start();

    if($conn == FALSE)
    {
    echo "connnection is not done";
    }

    if(isset($_POST['insert_team'])){
       
        if(isset($_POST['team_name']) && $_POST['team_name'] !=''){
              $team_name = $_POST['team_name'];
        }
        else{
         $team_name ='no title';
        }
        $_SESSION['s_team_name']=$team_name;

        $uploadtime = date("Y-m-d H:i:s");
        $cname = $_FILES['sfile']['name'];

        if(!empty($cname))	
        {	
                        $tname = $_FILES['sfile']['tmp_name'];
                        $type  = $_FILES['sfile']['type'];
                        $size  = $_FILES['sfile']['size'];
                        $name  =  $team_name.'_'.date("his");
                        $fext  = pathinfo($cname, PATHINFO_EXTENSION);
                        $fire  = pathinfo($name,PATHINFO_FILENAME);
                        $savename = $fire.".".$fext;
                        $savename_thumb = $fire."_thumb.".$fext;
                        $finalfile = "upload_team/$savename";
        }
        if(!empty($cname)){
                    if($size < 5000000){
                        if($type == 'image/png' || $type == 'image/jpg'  || $type == 'image/jpeg'){
                        $check = move_uploaded_file($tname,$finalfile);
                        makeThumbnail( $finalfile,350,350, 'upload_team/'.$savename_thumb, $type);
                        if($check){
                            $qry1 = "INSERT INTO 
                                    `team`
                                    (`team_name`, `team_logo`,`team_logo_thumb`,`status`, `created_date`) 
                                    VALUES 
                                    ('$team_name','$savename','$savename_thumb','1','$uploadtime')";
                                    $test =	mysqli_query($conn,$qry1);
                                    $_SESSION['s_team_name']='';
                            if($test = TRUE){ ?>
                            <script>
                                document.location = '/admin/settings/team-section-list.php';
                            </script>
                            <?php
                            }
                    // else 
                        //{
                        ?>
                        <!-- <script>
                        
                        //  document.location = '/admin/settings/team-section.php';
                    
                        </script> -->
                        <?php
                            // echo "file is not uploaded";
                        //}
                    }
                }else{ ?> 
                    <script>
                         document.location = '/admin/settings/team.php?img=imagetypeerror';
                    </script>
                
                <?php } }  else{ // echo "file size is too large"; ?>
                   <script>
                        document.location = '/admin/settings/team.php?img=sizeerror';
                   </script>
                <?php  
                    }
                }
     	
    }	
    else if(isset($_POST['edit_team'])){
        $editid = $_POST['edit_id'];
        if(isset($_POST['team_name']) && $_POST['team_name'] !='')
            $team_name = $_POST['team_name'];
        else
            $team_name='no title';

        $uploadtime = date("Y-m-d H:i:s");
        $old_image = $_POST['old_image'];
        $cname = $_FILES['sfile']['name'];
        $old_image_thumb = $_POST['old_image_thumb'];
        if(!empty($cname))	
        {	
                        $tname = $_FILES['sfile']['tmp_name'];
                        $type  = $_FILES['sfile']['type'];
                        $size	= $_FILES['sfile']['size'];
                        $name =  $team_name.'_'.date("his");
                        $fext = pathinfo($cname, PATHINFO_EXTENSION);
                        $fire = pathinfo($name,PATHINFO_FILENAME);
                        $savename = $fire.".".$fext;
                        $savename_thumb = $fire."_thumb.".$fext;
                        $finalfile = "upload_team/$savename";
        }
        if(!empty($cname)){
                    if($size < 5000000){
                        if($type == 'image/png' || $type == 'image/jpg'  || $type == 'image/jpeg'){
                        $delete_old_file_from_folder = unlink('upload_team/'.$old_image);
                        $delete_thumb_old_file_from_folder = unlink('upload_team/'.$old_image_thumb);

                        $check = move_uploaded_file($tname,$finalfile);
                        makeThumbnail( $finalfile,350,350, 'upload_team/'.$savename_thumb, $type);
                    if($check){
                        $qry1 = "update  `team` set 
                        `team_name` = '$team_name',
                        `team_logo` = '$savename',
                        `team_logo_thumb` = '$savename_thumb',
                        `status` = 1,
                        `created_date` = '$uploadtime' where id='".$editid."'";
                                $test =	mysqli_query($conn,$qry1);
                    if($test = TRUE){?>
                    <script>
                        document.location = '/admin/settings/team-section-list.php';
                    </script>
                    <?php
                    }
                    else 
                    {
                    ?>
                    <script>
                        document.location = '/admin/settings/team-section.php';
                    </script>
                    <?php
                            echo "file is not uploaded";
                    }
                }
            }
        else{?>
                <script>
                    document.location = '/admin/settings/team.php?edit_id=<?php echo $editid?>&img=imagetypeerror';
                </script>
           <?php 	}
        }else{  //echo "file size is too large"; ?>
                     <script>
                   		
                           document.location = '/admin/settings/team.php?edit_id=<?php echo $editid?>&img=sizeerror';
                           </script>
                   <?php 	
                }
        }
        else
        {	
            $qry1 = "update  `team` set 
            `team_name` = '$team_name',
            `status` = 1,
            `created_date` = '$uploadtime' where id='".$editid."'";
                    $test =	mysqli_query($conn,$qry1);
        if($test = TRUE){?>
        <script>
            document.location = '/admin/settings/team-section-list.php';
        </script>
        <?php
        }
        }	
    }
    
    if(isset($_REQUEST['del_id'])){
        $fetchqry = "update  `team` set status = 0 where id='".$_REQUEST['del_id']."'";
     
        $result=mysqli_query($conn,$fetchqry);
        if($result==TRUE){ ?> 
        <script>
                    window.location = "/admin/settings/team-section-list.php";
         </script>
        <?php
            }


    }
    
    function makeThumbnail($sourcefile,$max_width, $max_height, $endfile, $type){
        // Takes the sourcefile (path/to/image.jpg) and makes a thumbnail from it
        // and places it at endfile (path/to/thumb.jpg).
        // Load image and get image size.
           
        //   
        switch($type){
            case'image/png':
                $img = imagecreatefrompng($sourcefile);
                break;
                case'image/jpeg':
                $img = imagecreatefromjpeg($sourcefile);
                break;
                case'image/gif':
                $img = imagecreatefromgif($sourcefile);
                break;
                default : 
                return 'Un supported format';
        }
        $width = imagesx( $img );
        $height = imagesy( $img );
        if ($width > $height) {
            if($width < $max_width)
                $newwidth = $width;
            else
            $newwidth = $max_width;	
            $divisor = $width / $newwidth;
            $newheight = floor( $height / $divisor);
        }
        else {
             if($height < $max_height)
                 $newheight = $height;
             else
                 $newheight =  $max_height;
             
            $divisor = $height / $newheight;
            $newwidth = floor( $width / $divisor );
        }
        // Create a new temporary image.
        $tmpimg = imagecreatetruecolor( $newwidth, $newheight );
            imagealphablending($tmpimg, false);
            imagesavealpha($tmpimg, true);
        // Copy and resize old image into new image.
        imagecopyresampled( $tmpimg, $img, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
        // Save thumbnail into a file.
        //compressing the file
        switch($type){
            case'image/png':
                imagepng($tmpimg, $endfile, 0);
                break;
            case'image/jpeg':
                imagejpeg($tmpimg, $endfile, 100);
                break;
            case'image/gif':
                imagegif($tmpimg, $endfile, 0);
                break;	
        }
        // release the memory
           imagedestroy($tmpimg);
           imagedestroy($img);
    }

 ?>