/*Global variables*/
var loggedIn = false;
var imgLoaded = 0;
var totalToBeLoaded = 0;
var friends = new Array();
var index = 0;

$('#connectToFB')
		.live(
				"pagecreate",
				function() {
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

					// opens the Facebook login window for user
					FB
							.login(function(response) {
								if (response.authResponse) {
									// document.getElementById("status").innerHTML
									// = "Logged In";
									loggedIn = true;
									//if (response.perms) {
										// user is logged in and granted some
										// permissions.
										// perms is a comma separated list of
										// granted permissions
								//	} else {
										FB
												.ui(
														{
															method : 'permissions.request',
															perms : 'friends_location,friends_photos,friends_work_history,friends_birthday,friends_website,email,sms',
															display : 'popup'
														},
														function(response) {
															// alert(response.toSource());
															if (response
																	&& response.perms) {
																// alert('Permissions
																// granted:
																// '+response.perms);
															} else if (!response.perms) {
																// alert('User
																// did not
																// authorize
																// permission(s).');
															}
														});
								//	}
									var storedData = localStorage.getItem("friends");
									var message = "<img src='img/common/waiting.gif'/>"
									var min = 3600;
									jqmSimpleMessage1(message, min); 
									if (storedData) {		
										//alert("in init!");
										//refreshFriendSelect();		
									}else{
									FB.api("/me/friends?fields=id,name,gender,languages,picture,location,birthday,work,education,email",
										function(response) {
											//document.getElementById("status").innerHTML = "Please wait...";											
											var message = "<img src='img/common/waiting.gif'/>"
											jqmSimpleMessage(message); 											
											friends = response["data"];												
											totalToBeLoaded = friends.length;												
											loadLocation(0);							
										}
									);
									}
								} else {
									// document.getElementById("status").innerHTML
									// = "You have not given required
									// permissions";
									loggedIn = false;
								}
							});

					(function() {
						var e = document.createElement('script');
						e.src = document.location.protocol
								+ '//connect.facebook.net/en_US/all.js';
						e.async = true;
						document.getElementById('fb-root').appendChild(e);
					});


				});

// gets the list of friends of the logged in person
function getFriends_FB() {
	// if the person has not pressed login button

	if (!loggedIn) {
		loginFacebook();
	}

	document.getElementById("status").innerHTML = "Please wait...";

	// if the person is loggedIn
	if (loggedIn) {

		FB
				.api(
						"/me/friends?fields=id,name,gender,languages,picture,location,birthday,work,education,email",
						function(response) {
							friends = response["data"];							
							totalToBeLoaded = friends.length;							
							loadLocation(0);							
						});

	}

}


function jqmSimpleMessage(message) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-b ui-corner-all'><h1>" + message + "</h1></div>")
        .css({
            display: "block",
            opacity: 0.96,
            top: window.pageYOffset+100
        })
        .appendTo("body").delay(800)
        .fadeOut(400, function(){
            $(this).remove();
        });
}


function jqmSimpleMessage1(message,min) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-b ui-corner-all'><h1>" + message + "</h1></div>")
        .css({
            display: "block",
            opacity: 0.96,
            top: window.pageYOffset+100
        })
        .appendTo("body").delay(min)
        .fadeOut(400, function(){
            $(this).remove();
        });
}

//saves the selected friends from the select menu to localStorage
function saveFriendsToLocalStorage() {
	var friends = $('#friends').serialize();
	localStorage.setItem("selectedfriends", friends);
	var storedData = localStorage.getItem("selectedfriends");	
}

function populateFriendsSelect() {
	var storedData = localStorage.getItem("selectedfriends");		
	if (storedData) {		
		splitedData = storedData.split('&');
		for ( var j = 0; j < splitedData.length; j++) {			
			splitedFriends = splitedData[j].split('=');						
			addFriends(splitedFriends[1]);
		}
	}
}

function addFriends(name) {
	var options = '<option selected="selected" value="' + name + '">' + name
			+ '</option>';
	$("select#friends").append(options);
	$("select#friends").selectmenu("refresh");
}


//check whether the name is in the selected friends list or not
function verif(name){		
	var storedData = localStorage.getItem("selectedfriends");		
	if (storedData) {		
		splitedData = storedData.split('&');		
		for ( var j = 0; j < splitedData.length; j++) {					
			splitedFriends = splitedData[j].split('=');										
			halfName = splitedFriends[1].split('+');
			var fullName = halfName[0];
			for (var k = 1; k < halfName.length; k++){				
				fullName = fullName +" "+halfName[k];
			}
			if (fullName == name){
				return true;		
			}				
		}
	}	
	return false;
}

function loadImgs(id, name){		
	var img = new Image();	
	img.src = "http://graph.facebook.com/" + id + "/picture";
	img.alt = img.title = name;		
	document.getElementById("pics").appendChild(img);	
}

var ok;
function refreshFriendSelect(){		
	var name;
	var i = 0;	
	var storedData = localStorage.getItem("friends");
	document.getElementById("pics").innerHTML = "";
	if (storedData) {
		listdata = JSON.parse(storedData);
		var size = listdata.length;
		$('select#friends').empty();
		while (i <= size) {
			if (listdata[i] != null) {
				var friend = JSON.parse(listdata[i]);		
				name = friend.name;	
				loadImgs(friend.id, name);				
				var options;
				if (verif(name) == true){					
					options = '<option value="' + name + '" selected>' + name
					+ '</option>';
				}else{								
					options = '<option value="' + name + '">' + name
					+ '</option>';
				};
				$("select#friends").append(options);
				$("select#friends").selectmenu("refresh");			
			};
			i =  i + 1;
		}
	}	
}


var real = 0;
var localFriends = new Array();
// load the images one at a time
function loadLocation(friendNumber) {
	var message = "<img src='img/common/waiting.gif'/>"
	jqmSimpleMessage(message); 
	//alert(localStorage.getItem("address"));
	var currentLocation = localStorage.getItem("address");// localStorage.getItem("location");
	//"Hagenberg";
	//alert(currentLocation);
	FB.api("/" + friends[friendNumber].id, function(response) {
		var out = "";
		if ((response.location != null)&&(response.location["name"] != null)) {		

//			if (currentLocation.indexOf(response.location["name"]) != -1) {
			if ((response.location["name"].indexOf(currentLocation) != -1) || (currentLocation.indexOf(response.location["name"]) != -1)) {
			//alert("in here");
				if (response.location["name"] != 'undefined') {
					localFriends[real] = JSON.stringify(response);
					//alert(response.work.location+ " "+ response.work.position + response.email);
					//alert(response.education.school);
					//alert(response.name+ " "+response.id + " "+ response.username);
					out += response.location["name"];
					real = real + 1;
					name = response.name;
					var options = '<option value="' + name + '">' + name
							+ '</option>';
					$("select#friends").append(options);
					$("select#friends").selectmenu("refresh");
					loadImage(friendNumber);
				}
			}
		} else {
			out = "--";
		}
		localStorage.setItem("friends", JSON.stringify(localFriends));
		index = friendNumber;
		// addNewRow(response.name, out);
		friendLoaded = friendNumber + 1;
		loadLocation(friendLoaded);
	});
	if (friendNumber == totalToBeLoaded - 1) {
		document.getElementById("status").innerHTML = "Done!";
	}
}

// load the images one at a time
function loadImage(imgNumber) {
	var img = new Image();
	// this is the link to profile image of a user. This link is well defined in
	// Facebook API Documentation
	img.src = "http://graph.facebook.com/" + friends[imgNumber].id + "/picture";
	img.alt = img.title = friends[imgNumber].name;
	imgLoaded++;
	document.getElementById("pics").appendChild(img);
}

function addNewRow(data1, data2) {
	// inserts a new row into the table
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
	newdiv.setAttribute('id', divIdName);
	newdiv.innerHTML = 'Please wait...<br><img src='
			+ '"img/common/waiting.gif"' + "alt=" + '"Please Wait.."'
			+ ' border=0>';
	ni.appendChild(newdiv);
}

function removeElement(divNum) {
	var d = document.getElementById('add');
	var olddiv = document.getElementById(divNum);
	d.removeChild(olddiv);
}

// calls init function once all the resources are loaded
window.addEventListener("load", init, true);
