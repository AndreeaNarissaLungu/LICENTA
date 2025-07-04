<?php
/*********************
*********/

/* Following register will admin login credentials */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


$data = json_decode(file_get_contents("php://input"));

$get_name = ($data->name);
$get_email = ($data->email);
$get_password = ($data->password);
$get_mobile = ($data->mobile);
$get_created_date = date('Y-m-d');

$result = mysqli_query($conn,"SELECT * FROM admin_login WHERE email = '$get_email'");


if(empty($get_name) || empty($get_email) ||
 empty($get_password) || empty($get_mobile) )
{
	$response["success"] = 2;
	echo json_encode($response);
}
else if (strlen($get_mobile) != 10) 
{
	$response["success"] = 3;
	echo json_encode($response);
}
else if (strlen($get_password) != 8) 
{
	$response["success"] = 5;
	echo json_encode($response);
}
else if(mysqli_num_rows($result))
{
	$response["success"] = 4;	
	echo json_encode($response);
}
else
{
	
	// Password validation - $ 1 A
	if (preg_match('/[!\'^£$%&*()}{@#~?><>,|=_+¬-]/', $get_password) 
	& (preg_match('/[0-9]/', $get_password)) 
	& (preg_match('/[A-Z]/', $get_password)) )
	{

		// get customer 
		$result1 = mysqli_query($conn,"INSERT INTO admin_login
					(name, email, password, mobile, created_date)
				VALUES('$get_name',  '$get_email', '$get_password', '$get_mobile', '$get_created_date')");

		// check for empty result
		if($result1)
		{
			
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
	else 
	{
		// unsuccess
		$response["success"] = 6;
		
		// echoing JSON response
		echo json_encode($response);
	}
	
}
?>