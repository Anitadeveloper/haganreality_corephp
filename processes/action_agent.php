<?php
include 'db-conn.php';

session_start();

    if($conn == FALSE)
    {
    echo "connnection is not done";
    }

    if(isset($_POST['insert_agent'])){
        $full_name = $_POST['full_name'];
        $occupation = $_POST['occupation'];
        $email = $_POST['email'];
        $phoneno = $_POST['phone_no'];
        $officeph = $_POST['office_phno'];
        $facebooklink = $_POST['facebook_link'];
        $website = $_POST['website'];
        if(isset($_POST['description']))
        $description = $_POST['description'];
        else
        $description='';

        if(isset($_POST['designation']))
        $designation = $_POST['designation'];
        else
        $designation='';
        if(isset($_POST['language']))
        $language = $_POST['language'];
        else
        $language ='';
        
       if(isset($_POST['instagramlink']))
        $instagramlink = $_POST['instagramlink'];
        else
        $instagramlink='';
        if(isset($_POST['youtubelink']))
        $youtubelink = $_POST['youtubelink'];
        else
        $youtubelink ='';

        $_SESSION['s_full_name']=$full_name;
        $_SESSION['s_occupation']=$occupation;
        $_SESSION['s_email']=$email;
        $_SESSION['s_phoneno']=$phoneno;
        $_SESSION['s_officeph']=$officeph;
        $_SESSION['s_website']=$website;
        $_SESSION['s_facebook']=$facebooklink;
        $_SESSION['s_description']=$description;
        $_SESSION['s_language']=$language;
        $_SESSION['s_designation']=$designation;
        $_SESSION['s_instagramlink']=$instagramlink;
        $_SESSION['s_youtubelink']=$youtubelink;
        $uploadtime = date("Y-m-d H:i:s");
        $cname = $_FILES['sfile']['name'];

        if(!empty($cname))	
        {	
                        $tname = $_FILES['sfile']['tmp_name'];
                        $type  = $_FILES['sfile']['type'];
                        $size	= $_FILES['sfile']['size'];
                        $name =  $full_name.'_'.date("his");
                        $fext = pathinfo($cname, PATHINFO_EXTENSION);
                        $fire = pathinfo($name,PATHINFO_FILENAME);
                        $savename_thumb = $fire."_thumb.".$fext;
                        $savename = $fire.".".$fext;
                        $finalfile = "upload/$savename";
        }
        if(!empty($cname)){
             
                    if($size < 5000000){
                         if($type == 'image/png' || $type == 'image/jpg'  || $type == 'image/jpeg'){
                        $check = move_uploaded_file($tname,$finalfile);
                        makeThumbnail( $finalfile,350,350, 'upload/'.$savename_thumb, $type);
                    if($check){
                        $qry1 = "INSERT INTO 
                                `agent`
                                (`full_name`, `occupation`, `email`,`phone_no`, `office_phno`, `facebook_link`,`website`, `description`, `imagename`,`imagename_thumb`,`language`,`designation`,`instagramlink`,`youtubelink`,`status`, `time`) 
                                VALUES 
                                ('$full_name','$occupation','$email','$phoneno','$officeph','$facebooklink','$website','$description','$savename','$savename_thumb','$language','$designation','$instagramlink','$youtubelink','1','$uploadtime')";
                                $test =	mysqli_query($conn,$qry1);
                                $_SESSION['s_full_name']='';
                                $_SESSION['s_occupation']='';
                                $_SESSION['s_email']='';
                                $_SESSION['s_phoneno']='';
                                $_SESSION['s_officeph']='';
                                $_SESSION['s_website']='';
                                $_SESSION['s_facebook']='';
                                $_SESSION['s_description']='';
                                $_SESSION['s_language']='';
                                $_SESSION['s_designation']='';
                                $_SESSION['s_instagramlink']='';
                                $_SESSION['s_youtubelink']='';
                    if($test = TRUE){?>
                    <script>
                   	
                        document.location = '/admin/settings/agent-section-list.php';
                   
                    </script>
                    <?php
                    }
                   // else 
                    //{
                    ?>
                    <!-- <script>
                    
                        document.location = '/admin/settings/agent-section.php';
                   
                    </script> -->
                    <?php
                        //    echo "file is not uploaded";
                   // }
                    }
                    }else{ ?>
                             <script>
                                    document.location = '/admin/settings/agent.php?img=imagetypeerror';
                             </script>
                  <?php  }
                }
                else{
                   // echo "file size is too large";
                    ?>
                    <script>
                         document.location = '/admin/settings/agent.php?img=sizeerror';
                    </script>
              <?php  }
                }
                else
                {	
                $qry1 = "INSERT INTO 
                `agent`
                (`full_name`, `occupation`, `email`,`phone_no`, `office_phno`, `facebook_link`,`website`, `description`,`language`,`designation`,`instagramlink`,`youtubelink`,`status`, `time`) 
                VALUES 
                ('$full_name','$occupation','$email','$phoneno','$officeph','$facebooklink','$website','$description','$language','$designation','$instagramlink','$youtubelink','1','$uploadtime')";
                $test =	mysqli_query($conn,$qry1);
                                $_SESSION['s_full_name']='';
                                $_SESSION['s_occupation']='';
                                $_SESSION['s_email']='';
                                $_SESSION['s_phoneno']='';
                                $_SESSION['s_officeph']='';
                                $_SESSION['s_website']='';
                                $_SESSION['s_facebook']='';
                                $_SESSION['s_description']='';
                                $_SESSION['s_language']='';
                                $_SESSION['s_designation']='';
                                $_SESSION['s_instagramlink']='';
                                $_SESSION['s_youtubelink']='';
        if($test = TRUE){?>
        <script>

        document.location = '/admin/settings/agent-section-list.php';

        </script>
        <?php
        }
      }	
    }	
    else if(isset($_POST['edit_agent'])){
        $editid = $_POST['edit_id'];
        $full_name = $_POST['full_name'];
        $occupation = $_POST['occupation'];
        $email = $_POST['email'];
        $phoneno = $_POST['phone_no'];
        $officeph = $_POST['office_phno'];
        $facebooklink = $_POST['facebook_link'];
        $website = $_POST['website'];
        if(isset($_POST['description']))
        $description = $_POST['description'];
        else
        $description='';
        if(isset($_POST['designation']))
        $designation = $_POST['designation'];
        else
        $designation='';
        if(isset($_POST['language']))
        $language = $_POST['language'];
        else
        $language ='';
        if(isset($_POST['instagramlink']))
        $instagramlink = $_POST['instagramlink'];
        else
        $instagramlink='';
        if(isset($_POST['youtubelink']))
        $youtubelink = $_POST['youtubelink'];
        else
        $youtubelink ='';

        $uploadtime = date("Y-m-d H:i:s");
        $old_image = $_POST['old_image'];
        $old_image_thumb = $_POST['old_image_thumb'];
        $cname = $_FILES['sfile']['name'];

        if(!empty($cname))	
        {	
                        $tname = $_FILES['sfile']['tmp_name'];
                        $type  = $_FILES['sfile']['type'];
                        $size	= $_FILES['sfile']['size'];
                        $name =  $full_name.'_'.date("his");
                        $fext = pathinfo($cname, PATHINFO_EXTENSION);
                        $fire = pathinfo($name,PATHINFO_FILENAME);
                        $savename = $fire.".".$fext;
                        $savename_thumb = $fire."_thumb.".$fext;
                        
                        $finalfile = "upload/$savename";

                        if($type == 'image/png' || $type == 'image/jpg'  || $type == 'image/jpeg'){
                           
        if(!empty($cname)){
                    if($size < 5000000){
                        $delete_old_file_from_folder = unlink('upload/'.$old_image);
                        $delete_thumb_old_file_from_folder = unlink('upload/'.$old_image_thumb);
                        
                        $check = move_uploaded_file($tname,$finalfile);
                        makeThumbnail( $finalfile,350,350, 'upload/'.$savename_thumb, $type);
                        
                        if($check){
                        $qry1 = "update  `agent` set 
                        `full_name` = '$full_name',
                        `occupation` = '$occupation',
                        `email` = '$email',
                        `phone_no` = '$phoneno',
                        `office_phno` = '$officeph',
                        `facebook_link` = '$facebooklink',
                        `website` = '$website',
                        `description` = '$description',
                        `imagename` = '$savename',
                        `imagename_thumb` = '$savename_thumb',
                        `language` = '$language',
                        `designation` = '$designation',
                        `instagramlink`='$instagramlink',
                        `youtubelink`='$youtubelink',
                        `status` = 1,
                        `time` = '$uploadtime' where id='".$editid."'";
                                $test =	mysqli_query($conn,$qry1);
                    if($test = TRUE){?>
                    <script>
                      document.location = '/admin/settings/agent-section-list.php';
                    </script>
                    <?php
                    }
                    else 
                    {
                    ?>
                    <script>
                        document.location = '/admin/settings/agent-section-list.php';
                    </script>
                    <?php
                            echo "file is not uploaded";
                    }
                }
            }
           
         else{
                    ?>
                     <script>
                   		
                           document.location = '/admin/settings/agent.php?edit_id=<?php echo $editid?>&img=sizeerror';
                           </script>
                   <?php 	
                }
        }
    }else{
        ?>
        <script>
              
              document.location = '/admin/settings/agent.php?edit_id=<?php echo $editid?>&img=imagetypeerror';
              </script>
    <?php 	}
    }
        else
        {	
            $qry1 = "update  `agent` set 
            `full_name` = '$full_name',
            `occupation` = '$occupation',
            `email` = '$email',
            `phone_no` = '$phoneno',
            `office_phno` = '$officeph',
            `facebook_link` = '$facebooklink',
            `website` = '$website',
            `description` = '$description',
            `language` = '$language',
            `designation` = '$designation',
            `instagramlink`='$instagramlink',
            `youtubelink`='$youtubelink',
            `status` = 1,
            `time` = '$uploadtime' where id='".$editid."'";
                    $test =	mysqli_query($conn,$qry1);
        if($test = TRUE){?>
        <script>
            document.location = '/admin/settings/agent-section-list.php';
        </script>
        <?php
        }
        }	
    }
   
    if(isset($_REQUEST['del_id'])){
        $fetchqry = "update  `agent` set status = 0 where id='".$_REQUEST['del_id']."'";
     
        $result=mysqli_query($conn,$fetchqry);
        if($result==TRUE){ ?> 
        <script>
                    window.location = "/admin/settings/agent-section-list.php";
         </script>
        <?php
            }

    }
    

    if(isset($_POST['save_dropdwn'])){
        echo '<pre>';
        print_r($_POST);
        echo '</pre>';
       
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