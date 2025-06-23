<?php
/*********************
**** CPanel ******************
*********/

/* Following register will admin login credentials */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


$data = json_decode(file_get_contents("php://input"));

$get_cus_id = ($data->id);
$get_field_1 = ($data->field_1);
$get_email = ($data->email);
date_default_timezone_set('Asia/Kolkata');

$get_field_4 = date('H:i:s');

$get_created_date =date('Y-m-d');

if( empty($get_field_1))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	
	$result = mysqli_query($conn,"UPDATE booking SET field_10='$get_field_1' 	WHERE cus_id = '$get_cus_id'");
	
	 mysqli_query($conn,"INSERT INTO work( email, field_1, field_2,field_3,created_date)
					VALUES(	'$get_email','$get_cus_id', '$get_field_1','$get_field_4', '$get_created_date')");
	

	// check for empty result
	if($result)
	{
		// success
		$response["success"] = 1;		
		// echoing JSON response
		echo json_encode($response);
		
		
	}
	else 
	{
		// unsuccess
		$response["success"] = 0;		
		// echoing JSON response
		echo json_encode($response);
	}
}
?>