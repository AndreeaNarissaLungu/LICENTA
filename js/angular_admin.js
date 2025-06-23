var app = angular.module("myapp", ['ngCookies']);
app.controller("myappCtrl", function($scope, $cookies, $cookieStore, $http) 
{
	
/****************************************************************************/
/************************** Get Admin Details ***********************************/
/****************************************************************************/	
	$scope.cook_cook_email = $cookieStore.get("cook_cook_email");

	
/****************************************************************************/
/************************** User Logout ************************************/
/****************************************************************************/		
	$scope.admin_logout = function() 
	{
		if(confirm("Are You Sure?"))
		{
			$cookies.bn_adm_email = "";
			window.location = "home.html";
			return;
		}
		else
		{
			return false;
		}
	}
/****************************************************************************/
/************************** Add Complaint *********************************/
/****************************************************************************/
	$scope.complaint_status = function(cus_id) 
	{		
		window.location = "admin_post_complaint.html";
		$cookieStore.put("cook_cus_id",cus_id);
		return;				
    }
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");

	$scope.complaint_solution = function() 
	{		
		$http.post('complaint_status.php', {
		'field_9':$scope.field_9,'field_10':$scope.field_10,
		'field_11':$scope.field_11,	'cus_id':$scope.cook_cus_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submitted Successfully");
				window.location = "admin_view_complaint.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
				{
					alert("Un Successfully");
				}
        });
    }
/****************************************************************************/
/************************** All Complaint *********************************/
/****************************************************************************/

	$http.post('complaint_get_all.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.details = data.details;
		}
		else
		{
			$scope.details = "No Data Found !!!";
		}
    });
	
	


/****************************************************************************/
/************************** Admin Update Complaints Solutions ***************/
/****************************************************************************/
	$scope.post_complaint_solution = function(cus_id,field_9,field_10,field_11) 
	{		
		window.location = "admin_post_complaint.html";
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_field_9",field_9);
		$cookieStore.put("cook_field_10",field_10);
		$cookieStore.put("cook_field_11",field_11);
		return;				
    }
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
	$scope.cook_field_9 = $cookieStore.get("cook_field_9");
	$scope.cook_field_10 = $cookieStore.get("cook_field_10");
	$scope.cook_field_11 = $cookieStore.get("cook_field_11");

	$scope.admin_complaint_solution = function() 
	{		
		$http.post('admin_complaint_solution.php', {
		'cook_field_9':$scope.cook_field_9,'cook_field_10':$scope.cook_field_10,
		'cook_field_11':$scope.cook_field_11,'cook_cus_id':$scope.cook_cus_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submitted Successfully");
				window.location = "admin_view_complaint.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
				{
					alert("Un Successfully");
				}
        });
    }
	

/****************************************************************************/
/****************************************************************************/
	$http.post('customer_get.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.cus_details = data.details;
		}
		else
		{
			$scope.cus_details = "No Data Found !!!";
		}
    });



	
});