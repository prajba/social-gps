/*Global variables*/
	var loggedIn = false;
	var imgLoaded = 0;	
	var totalToBeLoaded = 0;	
	var friends = new Array();
	var index = 0;
	

$('#connectToFB').live(
"pagecreate", function(){	
	alert("in live!");
	FB.init({
			appId : "152639234839875",
			status : true,
			cookie : true,			
			"server" : "",
			"trace" : 0,
			"version" : "mu",
			"module" : "all",
			"status" : 1,
			"autoRun" : false,
			"orange" : false,
			"oauth" : 1,
			"frictionlessRequests" : 1
		});

		//document.getElementById("status").innerHTML = "Waiting for Facebook permission";

		//opens the Facebook login window for user
		FB
				.login(function(response) {
					if (response.authResponse) {
					//	document.getElementById("status").innerHTML = "Logged In";
						loggedIn = true;
						 if (response.perms) {
						      // user is logged in and granted some permissions.
						      // perms is a comma separated list of granted permissions						    
						    } else {						    	
						    	FB.ui({
								    method: 'permissions.request',
								    perms: 'friends_location,friends_photos,friends_work_history,friends_birthday,friends_website,email',
								    display: 'popup'
								    },function(response) {
								        //alert(response.toSource());
								        if (response && response.perms) {
								            //alert('Permissions granted: '+response.perms);
								        } else if (!response.perms){
								           // alert('User did not authorize permission(s).');
								        }
								});
						    }
					} else {
						//document.getElementById("status").innerHTML = "You have not given required permissions";
						loggedIn = false;
					}
				});
		

      (function() {
        var e = document.createElement('script');
        e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
        e.async = true;
        document.getElementById('fb-root').appendChild(e);
      }());
      
		//disables the login button after the user has loggedIn
		if (loggedIn) {
			//document.getElementById("loginBtn").disabled = "disabled";
		}
}
);



	//gets the list of friends of the logged in person
	function getFriends_FB() {
		//if the person has not pressed login button
		alert("in get Friends");

		if (!loggedIn) {
			loginFacebook();
		}

		document.getElementById("status").innerHTML = "Now loading your friends' location...";
		alert("after...");

		//if the person is loggedIn
		if (loggedIn) {		
			
			FB
					.api(
							"/me/friends?fields=id,name,gender,languages,picture,location,birthday",
							function(response) {
								friends = response["data"];	
								//localStorage.setItem("friends",JSON.stringify(friends));					
								totalToBeLoaded = friends.length;
								//addNewRow("Name", "Location");	
								alert("in fb_init");
								loadLocation(0);				
								loadImage(0);				
							});			
			
			
		}
		
	}

	
	var real = 0;
	var localFriends = new Array();
	//load the images one at a time
	function loadLocation(friendNumber) {
		var currentLocation = "Brasov";//localStorage.getItem("location");
		alert(currentLocation);
		
		FB.api("/" + friends[friendNumber].id, function(response) {
			var out = "";						
			if (response.location != null) {						   				
				if (response.location["name"].indexOf(currentLocation) != -1){					
				if (response.location["name"] != 'undefined'){
					localFriends[real] = JSON.stringify(response);
					out += response.location["name"];	
					real = real + 1;
					name = response.name;
					var options='<option value="'+name+'">'+name+'</option>';
  					$("select#friends").append(options);
  					$("select#friends").selectmenu("refresh");
					alert(response.name);					
				}	
				}		
			} else {			  	
				out = "--";
			}		
			localStorage.setItem("friends",JSON.stringify(localFriends));						
			index = friendNumber; 			
			//addNewRow(response.name, out);
			friendLoaded = friendNumber + 1;
			loadLocation(friendLoaded);
		});
		document.getElementById("status").innerHTML = "Please wait! Friends in current town "
				+ real + " out of " + friendNumber + "  from the total of "+ totalToBeLoaded + " friends";
	}


	//load the images one at a time
	function loadImage(imgNumber) {
		var img = new Image();		
		//this is the link to profile image of a user. This link is well defined in Facebook API Documentation
		img.src = "http://graph.facebook.com/" + friends[imgNumber].id
				+ "/picture";
		img.alt = img.title = friends[imgNumber].name;
		imgLoaded++;
		document.getElementById("pics").appendChild(img);
		document.getElementById("count").innerHTML = imgLoaded + " of "
				+ totalToBeLoaded + " images loaded";

		//ensures that the next image gets loaded only after an image has finished loading
		img.onload = function() {
			loadImage(imgLoaded)
		};

		if (imgLoaded == totalToBeLoaded) {
			document.getElementById("status").innerHTML = "Loaded all friends' profile images...";
		}
	}

	function addNewRow(data1, data2) {
		//inserts a new row into the table
		var table = document.getElementById("location");
		var row = table.insertRow(table.rows.length);
		var cell = row.insertCell(0);
		cell.innerHTML = data1;
		cell = row.insertCell(1);
		cell.innerHTML = data2;
	}

	function addElement() {
	  var ni = document.getElementById('add');
	  var newdiv = document.createElement('div');
	  var divIdName = 'dialog';
	  newdiv.setAttribute('id',divIdName);
	  newdiv.innerHTML = 'Please wait...<br><img src='+'"img/common/waiting.gif"'+"alt="+'"Please Wait.."'+' border=0>';
	  ni.appendChild(newdiv);
	}

	function removeElement(divNum) {
	  var d = document.getElementById('add');
	  var olddiv = document.getElementById(divNum);
	  d.removeChild(olddiv);
	}
	
	

	//calls init function once all the resources are loaded
	window.addEventListener("load", init, true);
	
	