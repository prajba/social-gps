var map;
var markersArray = [];
var myLocationMarker;
var myLocationInfoWindow;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var friends = new Array();
var geocoder;
var myLocation;
$('#page-map').live(
		"pagecreate",
		function() {
			alert("Call show My location");
			showMyLocation();
		});

/*
 * function MyLocationControl(controlDiv, map) { // Set CSS styles for the DIV
 * containing the control // Setting padding to 5 px will offset the control //
 * from the edge of the map. controlDiv.style.padding = '5px'; // Set CSS for
 * the control border. var controlUI = document.createElement('DIV');
 * controlUI.style.backgroundColor = 'white'; controlUI.style.borderStyle =
 * 'solid'; controlUI.style.borderWidth = '1px'; controlUI.style.cursor =
 * 'pointer'; controlUI.style.textAlign = 'center'; controlUI.title = 'Click to
 * set the map to your GPS Location'; controlDiv.appendChild(controlUI); // Set
 * CSS for the control interior. var controlText =
 * document.createElement('DIV'); controlText.style.fontFamily =
 * 'Arial,sans-serif'; controlText.style.fontSize = '12px';
 * controlText.style.paddingLeft = '4px'; controlText.style.paddingRight =
 * '4px'; controlText.innerHTML = 'Show My Location';
 * controlUI.appendChild(controlText); // Setup the click event listeners:
 * simply set the map to your gps location
 * google.maps.event.addDomListener(controlUI, 'click', function() {
 * 
 * }); }
 */

function mapBuddies() {
	var location;
	var name;
	var storedData = localStorage.getItem("friends");
	if (storedData) {
		listdata = JSON.parse(storedData);
		var size = listdata.length;
		
		var i = 0;
		var marker = new Array();
		var infowindow = new Array();
		for ( var j = 0; j < size; j++) {
			marker[j] = new google.maps.Marker({
				map : map,
				draggable: true
			});
			google.maps.event.addListener(marker[j], 'drag', function() {
			    $("input[name='request']").val(marker[j].getPosition());
			});

			google.maps.event.addListener(marker[j], 'dragend', function() {
			    $("input[name='request']").val(marker[j].getPosition());
			});
			infowindow[j] = new google.maps.InfoWindow();
		};
		
		while (i < size) {
			if (listdata[i] != null) {
				var friend = JSON.parse(listdata[i]);
				var name;
				var location;
				if (friend.location != null) {
					location = friend.location["name"];
				} else {
					location = "-";
				}
				name = friend.name;
				i = i + 1;
				if (location != "-") {					
						marker[i].setPosition(myLocation);
						infowindow[i].setContent(name);
						infowindow[i].open(map, marker[i]);
						google.maps.event.addListener(marker[i], 'click',
								function() {
									infowindow[i].setContent(name);
									infowindow[i].open(map, marker[i]);
								});

					//geocoder.geocode({
					//	address : myLocation
					//}, function(results) {
					//	alert(i+", "+name + "; localitatea: "+ location);
					//	marker[i].setPosition(results[0].geometry.location);
					//	infowindow[i].setContent(name);
					//	infowindow[i].open(map, marker[i]);
					//	google.maps.event.addListener(marker[i], 'click',
					//			function() {
					//				infowindow[i].setContent(name);
					//				infowindow[i].open(map, marker[i]);
					//			});
					//
					//});
				}
			}
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
			// alert("Iteration "+j);
			splitedPlaces = splitedData[j].split('=');
			// alert("SplitedPlaces: "+splitedPlaces[1]);
			addPlaces(splitedPlaces[1]);
		}
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
// TODO put an argument in callback so marker will be loaded
// with the image.png when image=type of place loaded
function addPlacesCallbackWithType(results, status,type) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		for ( var i = 0; i < results.length; i++) {
			createMarker(results[i],type);
		}
	}
}

function gohere(platitude,plongitude){
	alert("go here called "+platitude+","+plongitude+" from "+myLocation.lat()+","+myLocation.lng());
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

	infowindowplace = new google.maps.InfoWindow({
		content : "<button onClick='gohere("+place.geometry.location.lat()+
		","+place.geometry.location.lng()+")'>Go Here</button>"
	});
	
	// Create a marker
	// Add the marker to the map
	google.maps.event.addListener(marker, 'click', function() {
	// infowindowplace.setContent(place.name);
		infowindowplace.open(map,this);
	});
	markersArray.push(marker);
}

function showMyLocation() {
	navigator.geolocation.getCurrentPosition(onGPSRead, onGPSError, {
		enableHighAccuracy : true
	})
}

function onGPSRead(location) {
	myLocation = new google.maps.LatLng(location.coords.latitude,
			location.coords.longitude);
	localStorage.setItem('latitude',location.coords.latitude);
	localStorage.setItem('longitude',location.coords.longitude);
	// Once set up the location, map buddies and places
	initializeMap();
	mapBuddies();
	mapPlaces();
}

function calcRoute(destLatitude,destLongitude) {
    var start = myLocation.lat()+','+myLocation.lng();
    var end = destLatitude+','+destLongitude;
    alert("Calc route start: "+start+" end: "+end);
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
    	  alert("status direction OK, setting response to direction Display");
        directionsDisplay.setDirections(response);
      }
    });
  }

function initializeMap(){
	geocoder = new google.maps.Geocoder();
	var myOptions = {
		zoom : 12,
		center : myLocation,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	var results;
	var status;
	
	geocoder.geocode({'latLng': myLocation}, function(results, status) {
	      if (status == google.maps.GeocoderStatus.OK) {
	        if (results[0]) {
	          $('#address').val(results[0].formatted_address);
	        }
	      }
	    });
	myLocationInfoWindow = new google.maps.InfoWindow({
		content : "Me"+results[0].formatted_address
	});
	
	myLocationMarker = new google.maps.Marker({		
		position : myLocation,
		map : map
	})
	google.maps.event.addListener(myLocationMarker, 'click', function() {
		myLocationInfoWindow.open(map, myLocationMarker);
	});
	
	   directionsDisplay = new google.maps.DirectionsRenderer({
	        'map': myLocation,
	        'preserveViewport': true
	       // 'draggable': true
	    });
}

function onGPSError() {
	alert(" I cannot find you :(")
}
