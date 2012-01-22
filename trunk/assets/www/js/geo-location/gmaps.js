var map;
var markersArray = [];
var myLocationMarker;
var myLocationInfoWindow;
var directionsDisplay;
var directionsService;
var friends;
var geocoder;
var myLocation;
var myLocationAddress;
var currentFriendInfoWindow;
var currentPlaceInfoWindow;
$('#page-map').live(
		"pagecreate",
		function() {
			map=null;
			myLocationInfoWindow=null;
			myLocationMarker=null;
			geocoder=null;
			friends=new Array();
			showMyLocation();
		});

		
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

/* place the friends from the current town on the map */
function mapBuddies() {
	var location;
	var name;
	var storedData = localStorage.getItem("friends");
	if (storedData) {
		listdata = JSON.parse(storedData);
		var size = listdata.length;
		var marker;
		var radius = 0.003;
		for ( var j = 0; j < size; j++) {
			friend=JSON.parse(listdata[j]);
			if (verif(friend.name) == true){
				marker = new google.maps.Marker({
					map : map,
					position: new google.maps.LatLng(myLocation.lat()+radius*Math.cos(j),
							myLocation.lng()+radius*Math.sin(j)),
							icon : new google.maps.MarkerImage("http://graph.facebook.com/" + friend.id + "/picture",  
									new google.maps.Size(30, 38),
									// The origin for this image is 0,0.
									new google.maps.Point(0,0)),
							draggable : true
				});
				google.maps.event.addListener(marker, 'drag', function() {
					$("input[name='request']").val(marker.getPosition());
				});
				google.maps.event.addListener(marker, 'dragend', function() {
					$("input[name='request']").val(marker.getPosition());
				});	
				createFriendMarker(friend,marker);
			}
		}		
	}
}

function createFriendMarker(friend,marker){
	var infowindow = new google.maps.InfoWindow();
	if (friend) {
		var name;
		var location;
		if (friend.location != null) {
			location = friend.location["name"];
		} else {
			location = "-";
		}
		name = friend.name;
		if (location != "-") {
			//infowindow.setContent(name);
			//infowindow.open(map, marker[i]);
			google.maps.event.addListener(marker, 'click',
					function() {
						if(currentFriendInfoWindow){
							currentFriendInfoWindow.close();
						}
						if(currentPlaceInfoWindow){
							currentPlaceInfoWindow.close();
						}
						if(myLocationInfoWindow){
							myLocationInfoWindow.close();
						}
						currentFriendInfoWindow=infowindow;								
						if (friend.username != null) {															
							infowindow.setContent('<div style="text-align: center;" >' + friend.name+
							'</div><div style="text-align: center;" ><a href=" mailto:'+friend.username+'@facebook.com"><button class="sendMail_button" onclick=""></button></a>'+
							'<a href="'+friend.link+'")><button class="checkProfile_button" onclick=""></button></a></div>');
						}else{							
							infowindow.setContent('<div style="text-align: center;" >' + friend.name+'</div><div style="text-align: center;" >No e-mail address available!'+
							'<a href="'+friend.link+'")><button class="checkProfile_button" onclick=""></button></a></div>');
						}
						infowindow.open(map, this);
					}
			);
		}
	}
}

function mapPlaces() {
	// key AIzaSyAsl9yODaiNyShVLlpjiNYAoSagn2rpAi8
	// https://maps.googleapis.com/maps/api/place/search/json?location=-33.8670522,151.1957362&radius=500&types=food&sensor=false&key=AIzaSyAsl9yODaiNyShVLlpjiNYAoSagn2rpAi8
	storedData=localStorage.getItem("places");
	clearMarkers();
	if (storedData) {
		splitedData = storedData.split('&');
		for ( var j = 0; j < splitedData.length; j++) {
			splitedPlaces = splitedData[j].split('=');
			type=splitedPlaces[1];
			$("#places option[value="+type+"]").attr('selected', 'selected');
			addPlaces(type);
		}
		$("#places").selectmenu("refresh");
	}
}

function addPlaces(type) {
	var request = {
		location : myLocation,
		radius : 5000,
		types : [ type ]
	};
	// infowindow = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);
	service.search(request, function addPlacesCallback(results,status){
		addPlacesCallbackWithType(results,status,type);
	});
}

function clearMarkers(){
	  if (markersArray) {
		    for (i in markersArray) {
		      markersArray[i].setMap(null);
		    }
		    markersArray.length = 0;
	  }
}

function addPlacesCallbackWithType(results, status,type) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		for ( var i = 0; i < results.length; i++) {
			createMarker(results[i],type);
		}
	}
}

function gohere(platitude,plongitude){
	calcRoute(platitude,plongitude);
}

function createMarker(place,type) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map : map,
		icon : new google.maps.MarkerImage('img/places/'+type+'.png',  
				  		new google.maps.Size(30, 38),
				  		// The origin for this image is 0,0.
				  		new google.maps.Point(0,0)
		),
		animation: google.maps.Animation.DROP,
		position : place.geometry.location
	});
	
	infowindowplace = new google.maps.InfoWindow();

	google.maps.event.addListener(marker, 'click', function() {
	   infowindowplace.setContent("<b>"+place.name+"</b>"+
			   '<div style="text-align: center;"><button class="gohere_button" onClick="gohere('+placeLoc.lat()+','+placeLoc.lng()+')"></button>' +
			   '<button class="youtube_button" onClick="goVideos('+placeLoc.lat()+','+placeLoc.lng()+','+'\''+place.name+'\''+')"</button></div>');
	    if(currentPlaceInfoWindow){
		   currentPlaceInfoWindow.close();
	    }
	    if(currentFriendInfoWindow){
			currentFriendInfoWindow.close();
		}
		if(myLocationInfoWindow){
			myLocationInfoWindow.close();
		}
	    currentPlaceInfoWindow=infowindowplace;
		infowindowplace.open(map,this);
	});
	markersArray.push(marker);
}

function goVideos(latitude,longitude,placeName){
		var placeLocation = new google.maps.LatLng(latitude,longitude);
		geocoder.geocode({'latLng': placeLocation}, function(results, status) {
		      if (status == google.maps.GeocoderStatus.OK && results[0]) {
		         // $('#address').val(results[0].formatted_address); What is this $(#address)?
		    	  placeAddress=results[0].formatted_address;
		    	  localStorage.setItem('placeAddress',placeAddress);
		    	  localStorage.setItem('placeName',placeName);
		    	  mobileChangePage('youtubeVideos.html');
		      }else{
		    	  alert("Videos about the selected place have been not found");
		    	  placeAddress="";
		      }	 
		});
}

function showMyLocation() {
	navigator.geolocation.getCurrentPosition(onGPSRead, onGPSError, {
		enableHighAccuracy : true
	})
	//Every 15 sec location will be updated. e.g we are on the move
	//setTimeout("showMyLocation()",15000);
}


function onGPSRead(location) {
	myLocation = new google.maps.LatLng(location.coords.latitude,
			location.coords.longitude);
	localStorage.setItem('latitude',location.coords.latitude);
	localStorage.setItem('longitude',location.coords.longitude);
	var results;
	var status;	
	if(!geocoder){
		geocoder = new google.maps.Geocoder();
	}
	geocoder.geocode({'latLng': myLocation}, function(results, status) {
	      if (status == google.maps.GeocoderStatus.OK && results[0]) {
	         // $('#address').val(results[0].formatted_address); What is this $(#address)?
	    	  myLocationAddress=results[0].formatted_address;
	      }else{
	    	  myLocationAddress="ME";
	      }
	      //address to localStorage
	  	  localStorage.setItem('address',myLocationAddress);
	  	  // Once set up the location, map buddies and places
	  	  if(!map){
	  		  initializeMap();
	  		  mapBuddies();
	  		  mapPlaces();
	  	  }
	  	  setUpMyLocationInfoWindow();
	  	  setTimeout("showMyLocation()",15000);
	});
}

function calcRoute(destLatitude,destLongitude) {
    var start = myLocation.lat()+','+myLocation.lng();
    var end = destLatitude+','+destLongitude;
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  }

function setUpMyLocationInfoWindow(){
	if(!myLocationInfoWindow){
		myLocationInfoWindow = new google.maps.InfoWindow();
	}
	myLocationInfoWindow.setContent("I'm here: "+myLocationAddress+
			   '<div style="text-align: center;" ><button class="youtube_button" onClick=mobileChangePage("youtubeVideos.html")></button>' +
			   '<button class="wiki_button" onClick=mobileChangePage("wikiPlace.html")></button></div>');
	if(!myLocationMarker){
		myLocationMarker = new google.maps.Marker({		
			map : map,
			icon : new google.maps.MarkerImage('img/smiley_happy.png',  
					new google.maps.Size(30, 38),
					// The origin for this image is 0,0.
					new google.maps.Point(0,0)),
					//animation: google.maps.Animation.DROP,
					position : myLocation
		});	
		google.maps.event.addListener(myLocationMarker, 'click', function() {
		    if(currentPlaceInfoWindow){
				   currentPlaceInfoWindow.close();
			}
			if(currentFriendInfoWindow){
				currentFriendInfoWindow.close();
			}			
			myLocationInfoWindow.open(map, myLocationMarker);
			
		});
	}else{
		//For the second, third, and so on call to this function, just update position of the marker
		myLocationMarker.position(myLocation);
	}
}

function initializeMap(){
	var myOptions = {
		zoom : 15,
		center : myLocation,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	directionsService=new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer({
        'map': map,
        'preserveViewport': true,
        'draggable': true,
        'suppressMarkers': true
    });
}

function onGPSError() {
	alert(" I cannot find you :(");
	setTimeout("showMyLocation()",15000);
}
