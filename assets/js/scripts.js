
jQuery(document).ready(function () {

	var $regSuccess =  $("#reg-success");
	var $regError =  $("#reg-error");
	var $loader =  $("#loader");


	$regSuccess.css('display','none');	
	$regError.css('display','none');
	$loader.css('display', 'none');

	var userRole = null;

    /*
        Fullscreen background
    */
	$.backstretch("assets/img/backgrounds/1.jpg");

	$('#top-navbar-1').on('shown.bs.collapse', function () {
		$.backstretch("resize");
	});
	$('#top-navbar-1').on('hidden.bs.collapse', function () {
		$.backstretch("resize");
	});

    /*
        Form
    */
	$('.registration-form fieldset:first-child').fadeIn('slow');

	$('.registration-form input[type="text"], .registration-form input[type="password"], .registration-form textarea').on('focus', function () {
		$(this).removeClass('input-error');
	});

	// next step
	$('.registration-form .btn-next').on('click', function () {
		var parent_fieldset = $(this).parents('fieldset');
		var next_step = true;

		parent_fieldset.find('input[type="text"], input[type="email"] ,input[type="password"], textarea, select').each(function (id) {
			id = $(this).attr("id");
			$(this).siblings("span").html("");
			var regex = /[0-9 %*()$#@./,<>&[\|{}]/g;
			var errOut = $(this).siblings("span");
			// $(this).val().match(regex) ||
			if ($(this).val() === "" && id === "companyname") {
				$(this).addClass('input-error');
				next_step = false;
				//var errmsg = $(this).val().match(regex) ? errOut.html("Invalid character(s) entered") : 
				errOut.html("*");
			}
			else if (id === "address" && $(this).val() === "") {
				$(this).addClass('input-error');
				next_step = false;
				errOut.html("*");
			}
			else if (id === "pcn") {
				regex = /\d/g;
				if ($(this).val() === "" || !$(this).val().match(regex)) {
					$(this).addClass('input-error');
					next_step = false;
					var errmsg = !$(this).val().match(regex) ? errOut.html("Invalid character(s) entered") :
						errOut.html("*");
				}
			}
			else if (id === "companywebsite" && $(this).val() === "") {
				$(this).addClass('input-error');
				next_step = false;
				errOut.html("*");
			}
			else if (id === "industry" && $(this).val() === "") {
				$(this).addClass('input-error');
				next_step = false;
				errOut.html("*");
			}
			else if (id === "contactname" && $(this).val() === "") {
				$(this).addClass('input-error');
				next_step = false;
				errOut.html("*");
			}
			else if (id === "email") {
				regex = /([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/g;
				if ($(this).val() === "" || !$(this).val().match(regex)) {
					$(this).addClass('input-error');
					next_step = false;
					var errmsg = !$(this).val() == "" ? errOut.html("Invalid email address") :
						errOut.html("*");
				}
			}
			else if (id === "phoneNumber") {
				regex = /\d/g;
				if ($(this).val() === "" || !$(this).val().match(regex)) {
					$(this).addClass('input-error');
					next_step = false;
					var errmsg = !$(this).val().match(regex) ? errOut.html("Invalid character(s) entered") :
						errOut.html("*");
				}
			}
			else if (id === "designation" && $(this).val() === "") {
				$(this).addClass('input-error');
				next_step = false;
				errOut.html("*");
			}
			else if (id === "erp" && $(this).val() === "") {
				$(this).addClass('input-error');
				next_step = false;
				errOut.html("*");
			}
			// else if (id === "erpuse" && $(this).val() === "") {
			// 	$(this).addClass('input-error');
			// 	next_step = false;
			// 	errOut.html("*");
			// }
			else if (id === "logistics" && $(this).val() === "") {
				$(this).addClass('input-error');
				next_step = false;
				errOut.html("*");
			}
			else if (id === "username" && $(this).val() === "") {
				$(this).addClass('input-error');
				next_step = false;
				errOut.html("*");
			}
			else if (id === "password" && $(this).val() === "") {
				$(this).addClass('input-error');
				next_step = false;
				errOut.html("*");
			}
			else if (id === "confirmPassword" && $(this).val() === "") {
				$(this).addClass('input-error');
				next_step = false;
				errOut.html("*");
			}			
			else if (id === "logistics" && $(this).val() == "") {
				$(this).addClass('input-error');
				next_step = false;
				errOut.html("*");
			}
			else if (id === "role" && $(this).val() == "") {
				$(this).addClass('input-error');
				next_step = false;
				errOut.html("*");
			}
			else if (id === "customerbase" && $(this).val() == "") {
				$(this).addClass('input-error');
				next_step = false;
				errOut.html("*");
			}
			
			else {
				$(this).removeClass('input-error');
			}

		});

		if (next_step) {
			parent_fieldset.fadeOut(400, function () {
				$(this).next().fadeIn();
			});
		}

	});

	// previous step
	$('.registration-form .btn-previous').on('click', function () {
		$(this).parents('fieldset').fadeOut(400, function () {
			$(this).prev().fadeIn();
		});
	});

	// submit
	$('.registration-form').on('submit', function (e) {
		e.preventDefault();

		$(this).find('input[type="text"], input[type="password"], textarea').each(function (id) {
			if ($(this).val() == "") {
				
				$(this).addClass('input-error');
			}
			else {
				$(this).removeClass('input-error');
			}
			 
		});

    //password match
		var confirmPassword = $("#confirmPassword").val();
		var password = $('#password').val();		

			
		if (confirmPassword !== password) {
			e.preventDefault();
			$(this).addClass('input-error');
			$('.password-label').css('display', 'block');
			next_step = false;
			return false;
		}
		else {
			$(this).removeClass('input-error');
			// $('#reg').modal('hide');
			$('.modal').removeClass('in');
			$('.modal').attr("aria-hidden","true");
			$('.modal').css("display", "none");
			$('.modal-backdrop').remove();
			$('body').removeClass('modal-open');

			// API POST
		const Url = "http://40.67.200.13:8090/api/signup";
		//  const Url = "http://localhost:62273/api/Signup";

		userRole = $( "select#role option:checked" ).val();

		const formData = {
			companyName : $('#companyname').val(),
			address : $('#address').val(),
			registrationNo : $('#pcn').val(),
			companyWebsite : $('#companywebsite').val(),
			role: $( "select#role option:checked" ).val(),
			industry : $('#industry').val(),
			contactName : $('#contactname').val(),
			email : $('#email').val(),
			phoneNumber : $('#phoneNumber').val(),
			designation : $('#designation').val(),
			erp : $('#erp').val(),
			logistics : $('#logistics').val(),
			userName : $('#username').val(),
			password : $('#password').val(),
			confirmPassword : $('#confirmPassword').val(),

	   };

	  
	   var data = JSON.stringify(formData);
	   
	   $loader.css('display','block');
	   $.ajax({
		url : Url,
		data : data,
		type : "POST",
		// dataType : 'json',
		headers : {
		 "Content-Type": "application/json"
		}
		,success: function(response){
			
			$regSuccess.css('display','block');
			$regError.css('display','none');
			$loader.css('display','none');
		 }, 
		 error: function(req, status, err ) {
			
			$regSuccess.css('display','none');
			$regError.css('display','block');
			console.log(`Error ${err}`);
			$loader.css('display','none');
	 }
	});	   
		}
	});


	//go to edge application url
	$regSuccess.on('click', function(){
		var currentRole = getUrlByRole(userRole);
		$('#reg-anchor').attr('target', '_blank');
		if(currentRole != null){
			$('#reg-anchor').attr('href','http://40.67.200.13:8086/' + currentRole + '/#/access/login');
		}		
	});

	function getUrlByRole(role){
		var myRole = null;
		if(role != null){
			switch (role) {
				case "Distribution Centre":
					myRole = "distributioncentre";
					break;
				case "Distributor":
					myRole = "distributor";
					break;
				case "Retailer":
					myRole = "distributor";
					break;
				case "Manufacturer":
					myRole = "manufacturer";
					break;
				default:
				myRole = "manufacturer";
					break;
			}
		}

		return myRole;
	}
});
