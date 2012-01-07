var map;
var marcador;
var infowindow;
var friends = new Array();
var geocoder; 

$('#page-map').live("pagecreate", function() {	
	//alert("Map pagecreated");
	geocoder = new google.maps.Geocoder();	
	var latlng = new google.maps.LatLng(43.4609602, -3.8079336);
	var myOptions = {
			zoom: 8,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	  map = new google.maps.Map(document.getElementById("map_canvas"),
			myOptions);

	  //var showLocationControlDiv = document.createElement('DIV');
	  //var showLocationControl = new MyLocationControl(showLocationControlDiv, map);
	  //showLocationControlDiv.index = 1;
	  //map.controls[google.maps.ControlPosition.TOP_RIGHT].push(showLocationControlDiv);
	
	infowindow = new google.maps.InfoWindow({
		content: "Me"
	});
	marcador = new google.maps.Marker( {
		position: latlng,
		map:map	
	})	
	google.maps.event.addListener(marcador, 'click', function() {
		infowindow.open(map, marcador);
	});	
	//alert("Map drawing places");
	showMyLocation();
	mapBuddies();
	mapPlaces();
}); 




/*function MyLocationControl(controlDiv, map) {

	  // Set CSS styles for the DIV containing the control
	  // Setting padding to 5 px will offset the control
	  // from the edge of the map.
	  controlDiv.style.padding = '5px';

	  // Set CSS for the control border.
	  var controlUI = document.createElement('DIV');
	  controlUI.style.backgroundColor = 'white';
	  controlUI.style.borderStyle = 'solid';
	  controlUI.style.borderWidth = '1px';
	  controlUI.style.cursor = 'pointer';
	  controlUI.style.textAlign = 'center';
	  controlUI.title = 'Click to set the map to your GPS Location';
	  controlDiv.appendChild(controlUI);

	  // Set CSS for the control interior.
	  var controlText = document.createElement('DIV');
	  controlText.style.fontFamily = 'Arial,sans-serif';
	  controlText.style.fontSize = '12px';
	  controlText.style.paddingLeft = '4px';
	  controlText.style.paddingRight = '4px';
	  controlText.innerHTML = 'Show My Location';
	  controlUI.appendChild(controlText);

	  // Setup the click event listeners: simply set the map to your gps location
	  google.maps.event.addDomListener(controlUI, 'click', function() {
	
	  });
	}*/


function mapBuddies(){
	var location; 
	var name;	  
	var storedData = localStorage.getItem("friends");
	if (storedData) {
		listdata = JSON.parse(storedData); 
		var size = listdata.length;	
		// alert(size);
		var i = 0;
		var marker = new Array();	
		var infowindow = new Array();  
		for (var j = 0; j <=size; j++){
			marker[j] = new google.maps.Marker({map: map});
			infowindow[j] =   new google.maps.InfoWindow();		
		};
		while (i<=size ){	   	
			if (listdata[i] != null){
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
				if (location != "-"){	
					//alert(i+", "+name + ";"+ location);    	     
					geocoder.geocode({address: location}, function(results){		
						//alert(i+", "+name + "; localitatea: "+ location);    	      		                      
						marker[i].setPosition(results[0].geometry.location);				  
						infowindow[i].setContent(name);  
						infowindow[i].open(map, marker[i]);
						google.maps.event.addListener(marker[i], 'click', function() {
							infowindow[i].setContent(name);
							infowindow[i].open(map,marker[i]);
						});

					});   		        
				}
			}
		}
	}
}


function mapPlaces(){
	var storedData = localStorage.getItem("places");
	//alert(storedData);
}

function showMyLocation(){
	navigator.geolocation.getCurrentPosition( onGPSRead , onGPSError , {enableHighAccuracy:true} )  
}

function onGPSRead(location){	  
	var mylocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);	  
	map.setCenter(mylocation);
	marcador.setPosition(mylocation);  
}

function onGPSError(){
	alerta(" I cannot find you :(")
}


