<?php

 $db_server_name = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'haganrealty';

$conn = mysqli_connect($db_server_name, $db_username, $db_password, $db_name);

// Check connection
if (mysqli_error($conn)) {
    die("Connection failed: " . $conn->connect_error);
} 

mysqli_query($conn, "SET CHARACTER SET utf8");
