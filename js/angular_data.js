var app = angular.module("myapp", ['ngCookies']);
app.controller("myappCtrl", function($scope, $cookies, $cookieStore, $http) 
{
	
/****************************************************************************/
/************************** Get Admin Details ***********************************/
/****************************************************************************/	
	$scope.cook_admin_email = $cookieStore.get("cook_admin_email");
	$scope.cook_user_email = $cookieStore.get("cook_user_email");
	$scope.cook_staff_dept = $cookieStore.get("cook_staff_dept");
	$scope.cook_work_email = $cookieStore.get("cook_work_email");

	$scope.user_logout = function() 
	{
		if(confirm("Are You Sure?"))
		{
			$cookies.cook_user_email = "";
			$cookies.cook_user_email = "";
			window.location = "index.html";
			return;
		}
		else
		{
			return false;
		}
	}
	
		$scope.admin_logout = function() 
	{
		if(confirm("Are You Sure?"))
		{
			$cookies.cook_admin_email = "";
			$cookies.cook_user_email = "";
			window.location = "index.html";
			return;
		}
		else
		{
			return false;
		}
	}

$scope.update_id = function(cus_id) 
	{
		window.location = "get_geolocation.html";
		$cookieStore.put("cook_cus_id",cus_id);
		return;
	}	
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
	
			
	$scope.update_location = function() 
	{		
	
		//$scope.get_Latitude = document.getElementById('get_Latitude').value;
		//$scope.get_Longitude = document.getElementById('get_Longitude').value;
		
        $http.post('update_location.php', 
			{	
			'field_1': $scope.field_1, 'field_2':$scope.field_2,
			'email':$scope.cook_cus_id
			})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Updated Successful");
				window.location = "view_user_booking.html";
				//location.reload(); 
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
			{
				alert("Login Unsuccessful");
			}
        });
    }
	
	
	$scope.more_info = function(cus_id) 
	{
		window.location = "view_business_more.html";
		$cookieStore.put("cook_bus_id",cus_id);
		return;
	}	
	
	$scope.cook_bus_id = $cookieStore.get("cook_bus_id");

	$scope.view_rating = function(cus_id) 
	{
		window.location = "view_business_rating.html";
		$cookieStore.put("cook_cus_id",cus_id);
		return;
	}	
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");

	$http.post('get_survey_choice_user.php')
		.success(function(data, status, headers, config) 
		{
			$scope.user_survey_choice_details = data.details;
        });
		
	$http.post('get_bus_more.php', {'id': $scope.cook_bus_id})
	.success(function(data, status, headers, config) 
	{
			$scope.more_details = data.details;
    });

	
	$http.post('get_user_booking.php')
	.success(function(data, status, headers, config) 
	{
			$scope.user_booking_details = data.details;
    });
	
	$http.post('get_driver_route.php', {'email': $scope.cook_work_email})
	.success(function(data, status, headers, config) 
	{
			$scope.driver_details = data.details;
    });
	
	$http.post('get_all_complaint.php')
	.success(function(data, status, headers, config) 
	{
			$scope.all_comp_details = data.details;
    });
	
	$http.post('get_all_report.php')
	.success(function(data, status, headers, config) 
	{
			$scope.all_report_details = data.details;
    });
	
/****************************************************************************/
/************************** Add Complaint *********************************/
/****************************************************************************/
	$scope.create_ambulance = function() 
	{		
		$http.post('create_ambulance.php', {
		'field_1':$scope.field_1,'field_2':$scope.field_2,'field_3':$scope.field_3,
		'field_4':$scope.field_4,'field_5':$scope.field_5,'field_6':$scope.field_6,
		'field_7':$scope.field_7,'field_8':$scope.field_8,'email':$scope.cook_admin_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Created Successfully");
				window.location = "admin_home.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 3)
			{
				alert("Enter 10 Digit Mobile Number");
			}
			else
			{
				alert("Unsuccessful");
			}
        });
    }
/****************************************************************************/
/************************** admin Details *********************************/
/****************************************************************************/
	$http.post('admin_get.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.admin_details = data.details;
		}
		else
		{
			$scope.admin_details = "No Data Found !!!";
		}
    });
/****************************************************************************/
/************************** Get Feedback *********************************/
/****************************************************************************/
	$http.post('feedback_get.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.feedback_details = data.details;
		}
		else
		{
			$scope.feedback_details = "No Data Found !!!";
		}
    });
/****************************************************************************/
/************************** Get All details  *********************************/
/****************************************************************************/
	$http.post('get_ambulance.php')
	.success(function(data, status, headers, config) 
	{
			$scope.user_bus_details = data.details;
    });
	
	$http.post('get_user.php')
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
/************************** Add Requriments *********************************/
/****************************************************************************/
	$scope.create_feedback = function() 
	{		
		$http.post('create_feedback.php', 
		{
		'field_1':$scope.field_1,'field_2':$scope.field_2,'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Feedback Submitted Successfully");
				window.location = "home.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 0)
			{
				alert("Error In Creating");
			}
			else
				{
					alert("Un Successfully");
				}
        });
    }

	$scope.create_booking = function() 
	{		
		$scope.field_7 ="Immediate";
		
		$http.post('create_booking.php', 
		{
		'field_1':$scope.cook_field_1,'field_2':$scope.cook_field_2,
		'field_3':$scope.cook_field_3,'field_4':$scope.cook_field_6,
		'field_5':$scope.cook_email,'field_6':$scope.field_6,
		'field_7':$scope.field_7,'field_8':$scope.field_8,'field_9':$scope.field_9,
		'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submitted Successfully");
				window.location = "view_user_booking.html";
				$scope.field_7 ="";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 0)
			{
				alert("Error In Creating");
			}
			else
				{
					alert("Un Successfully");
				}
        });
    }
	
	$scope.create_booking_non = function() 
	{				
		$http.post('create_booking.php', 
		{
		'field_1':$scope.cook_field_1,'field_2':$scope.cook_field_2,
		'field_3':$scope.cook_field_3,'field_4':$scope.cook_field_6,
		'field_5':$scope.cook_email,'field_6':$scope.field_6,
		'field_7':$scope.field_7,'field_8':$scope.field_8,'field_9':$scope.field_9,
		'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submitted Successfully");
				window.location = "view_user_booking.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 0)
			{
				alert("Error In Creating");
			}
			else
				{
					alert("Un Successfully");
				}
        });
    }

	$scope.save_status = function() 
	{		
		$http.post('save_status.php', 
		{
		'id':$scope.cook_cus_id,'field_1':$scope.cook_field_1
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submitted Successfully");
				window.location = "view_driver_ambulance.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 0)
			{
				alert("Error In Creating");
			}
			else
				{
					alert("Un Successfully");
				}
        });
    }

	$scope.save_booking_status = function() 
	{		
		$http.post('save_booking_status.php', 
		{
		'id':$scope.cook_cus_id,'field_1':$scope.cook_field_1,'email':$scope.cook_work_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submitted Successfully");
				window.location = "view_driver_booking.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 0)
			{
				alert("Error In Creating");
			}
			else
				{
					alert("Un Successfully");
				}
        });
    }

	
/****************************************************************************/
/************************** User Update *********************************/
/****************************************************************************/
	
		$http.post('get_user_info.php',
		{
			'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
				$scope.userdetails = data.details;
          });
		  
$scope.user_update_info = function(name,password,mobile) 
	{
		window.location = "user_info_edit.html";
		$cookieStore.put("cook_name",name);
		$cookieStore.put("cook_password",password);
		$cookieStore.put("cook_mobile",mobile);
		return;
	}	
	
	$scope.cook_name = $cookieStore.get("cook_name");
	$scope.cook_password = $cookieStore.get("cook_password");
	$scope.cook_mobile = $cookieStore.get("cook_mobile");

	$scope.save_update_info = function() 
	{		
		$http.post('user_update_info.php',{
		 'name':$scope.cook_name, 'password':$scope.cook_password,
		 'mobile': $scope.cook_mobile, 'email': $scope.cook_user_email})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "user_update_info.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }
	 
	 
/****************************************************************************/
/************************** Delete Products *********************************/
/****************************************************************************/
	// products_delete
	$scope.delete_bin = function(cus_id) 
	{		
        $http.post('delete_bin.php', 
		{
		'id': cus_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Deleted Successful");
				window.location = "view_ambulance.html";
				return;
			}
			else if(data.success == 0)
			{
				alert("Error While Deleting Product!!");
			}
			else
			{
				alert("No id found");
			}
        });
    }

	$scope.delete_driver = function(user_id) 
	{		
        $http.post('delete_driver.php', 
		{
		'id': user_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Deleted Successful");
				window.location = "view_driver.html";
				return;
			}
			else if(data.success == 0)
			{
				alert("Error While Deleting Product!!");
			}
			else
			{
				alert("No id found");
			}
        });
    }

/****************************************************************************/
/************************** Student Update *********************************/
/****************************************************************************/
$scope.update_ambulance = function(cus_id,field_1,field_2,field_3,
								 field_4,field_5,field_6,field_7,field_8) 
	{
		window.location = "update_ambulance.html";
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_field_1",field_1);
		$cookieStore.put("cook_field_2",field_2);
		$cookieStore.put("cook_field_3",field_3);
		$cookieStore.put("cook_field_4",field_4);
		$cookieStore.put("cook_field_5",field_5);
		$cookieStore.put("cook_field_6",field_6);
		$cookieStore.put("cook_field_7",field_7);
		$cookieStore.put("cook_field_8",field_8);
		return;
	}	
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
	$scope.cook_field_1 = $cookieStore.get("cook_field_1");
	$scope.cook_field_2 = $cookieStore.get("cook_field_2");
	$scope.cook_field_3 = $cookieStore.get("cook_field_3");
	$scope.cook_field_4 = $cookieStore.get("cook_field_4");
	$scope.cook_field_5 = $cookieStore.get("cook_field_5");
	$scope.cook_field_6 = $cookieStore.get("cook_field_6");
	$scope.cook_field_7 = $cookieStore.get("cook_field_7");
	$scope.cook_field_8 = $cookieStore.get("cook_field_8");

	$scope.save_ambulance = function() 
	{		
		$http.post('save_ambulance.php',{
		'id':$scope.cook_cus_id,'field_1':$scope.cook_field_1,'field_2':$scope.cook_field_2,
		'field_3':$scope.cook_field_3,'field_4':$scope.cook_field_4,'field_5':$scope.cook_field_5,'field_6':$scope.cook_field_6,'field_7':$scope.cook_field_7,'field_8':$scope.cook_field_8})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "view_ambulance.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }


	/****************************************************************************/
/************************** Get All details  *********************************/
/****************************************************************************/
	$http.post('work_get.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.work_details = data.details;
		}
		else
		{
			$scope.work_details = "No Data Found !!!";
		}
    });
/****************************************************************************/
/****************************************************************************/
$scope.update_booking = function(cus_id,email,field_1,field_2,field_3,field_6) 
	{
		window.location = "post_booking.html";
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_email",email);
		$cookieStore.put("cook_field_1",field_1);
		$cookieStore.put("cook_field_2",field_2);
		$cookieStore.put("cook_field_3",field_3);
		$cookieStore.put("cook_field_6",field_6);
		return;
	}	
	
$scope.update_booking_non = function(cus_id,email,field_1,field_2,field_3,field_6) 
	{
		window.location = "post_booking_non.html";
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_email",email);
		$cookieStore.put("cook_field_1",field_1);
		$cookieStore.put("cook_field_2",field_2);
		$cookieStore.put("cook_field_3",field_3);
		$cookieStore.put("cook_field_6",field_6);
		return;
	}	
	
$scope.update_drive_status = function(cus_id,field_7) 
	{
		window.location = "post_work.html";
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_field_1",field_7);
		return;
	}	
	
$scope.update_booking_status = function(cus_id,field_10) 
	{
		window.location = "update_booking_status.html";
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_field_1",field_10);
		return;
	}	
	
$scope.submit_survey = function() 
	{
		window.location = "view_rating_user.html";
		return;
	}	
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
	$scope.cook_field_1 = $cookieStore.get("cook_field_1");

	

	
	 /****************************************************************************/
/************************** Contract Status Update *********************************/
/****************************************************************************/
	
$scope.update_status_con = function(cus_id,field_4) 
	{
		window.location = "con_status_edit.html";
		$cookieStore.put("cook_con_id",cus_id);
		$cookieStore.put("cook_con_status",field_4);
		
		return;
	}	
	
	$scope.cook_con_id = $cookieStore.get("cook_con_id");
	$scope.cook_con_status = $cookieStore.get("cook_con_status");

	$scope.save_con_status = function() 
	{		
		$http.post('con_update_status.php',{
		 'cus_id':$scope.cook_con_id, 'field_9':$scope.cook_con_status})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "view_con_details.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }

/****************************************************************************/
/************************** Get All User details  *********************************/
/****************************************************************************/
	$http.post('user_get_all.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.all_user_details = data.details;
		}
		else
		{
			$scope.all_user_details = "No Data Found !!!";
		}
    });
	

	$http.post('get_driver.php')
	.success(function(data, status, headers, config) 
	{
			$scope.all_driver_details = data.details;
    });
	
			  
$scope.update_driver = function(user_id,name,email,password,mobile,field_1,field_2,field_3) 
	{
		window.location = "edit_driver.html";
		$cookieStore.put("cook_cus_id",user_id);
		$cookieStore.put("cook_name",name);
		$cookieStore.put("cook_password",password);
		$cookieStore.put("cook_mobile",mobile);
		$cookieStore.put("cook_email",email);
		
		$cookieStore.put("cook_field_1",field_1);
		$cookieStore.put("cook_field_2",field_2);
		$cookieStore.put("cook_field_3",field_3);
		return;
	}	
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
	$scope.cook_email = $cookieStore.get("cook_email");
	$scope.cook_name = $cookieStore.get("cook_name");
	$scope.cook_password = $cookieStore.get("cook_password");
	$scope.cook_mobile = $cookieStore.get("cook_mobile");
	$scope.cook_field_1 = $cookieStore.get("cook_field_1");
	$scope.cook_field_2 = $cookieStore.get("cook_field_2");
	$scope.cook_field_3 = $cookieStore.get("cook_field_3");

	$scope.save_driver = function() 
	{		
		$http.post('save_driver.php',{
		 'cus_id':$scope.cook_cus_id, 'name':$scope.cook_name, 'password':$scope.cook_password,
		 'mobile': $scope.cook_mobile, 'email': $scope.cook_email,
		 'field_1': $scope.cook_field_1,'field_2': $scope.cook_field_2,
		 'field_3': $scope.cook_field_3})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "view_driver.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }
	 
	$scope.geo_location = function(cus_id) 
	{		
	           if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position) {
                            var lat = position.coords.latitude;
                            var lon = position.coords.longitude;
												
							$scope.cus_id = cus_id;
							$scope.field_1 = lat;
							$scope.field_2 = lon;
                            $scope.postLocation(lat, lon);							
                            // Print latitude and longitude to the console
						
                            console.log('Latitude:', lat);
                            console.log('Longitude:', lon);                            
                        }, function(error) {
                            console.error('Error getting geolocation: ', error);
                        });
                    } else {
                        console.error('Geolocation is not supported by this browser.');
                    }
               
											/////////////////////////////////
									

                $scope.postLocation = function(lat, lon) {
                    var data = {
                        field_1: lat,
                        field_2: lon,
                    };								
							$http.post('geo_location.php', 
								{
								'field_1': $scope.field_1,'field_2':$scope.field_2,
								'cus_id': 	$scope.cus_id 
								})
							.success(function(data, status, headers, config) 
							{
								if(data.success == 1)
								{
									alert("Updated Successful");
									location.reload(); 

									return;				
								}
								else if(data.success == 2)
								{
									alert("Please Fill All Fields");
								}
								else
								{
									alert("Login Unsuccessful");
								}
							});
				}
    }
	// geo location End //
	 


$scope.generateData = function() {
	const romaniaLocations = [
		{ name: "Cluj-Napoca", lat: 46.77, long: 23.59 },
		{ name: "Timișoara", lat: 45.75, long: 21.23 },
		{ name: "Iași", lat: 47.16, long: 27.58 },
		{ name: "București", lat: 44.43, long: 26.10 }
	];

	const foreignLocations = [
		{ name: "Paris", lat: 48.85, long: 2.35 },
		{ name: "London", lat: 51.51, long: -0.13 },
		{ name: "Berlin", lat: 52.52, long: 13.40 },
		{ name: "New York", lat: 40.71, long: -74.00 }
	];

	const allLocations = romaniaLocations.concat(foreignLocations);
	const randomIndex = Math.floor(Math.random() * allLocations.length);
	const selected = allLocations[randomIndex];

	$scope.deviceData = {
		latitude: selected.lat.toFixed(4),
		longitude: selected.long.toFixed(4),
		location: selected.name,
		pulse: Math.floor(Math.random() * 41) + 70  // 70–110
	};
};

});
