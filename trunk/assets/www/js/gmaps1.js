var map;
var marcador;
var infowindow;
var friends = new Array();
var geocoder; 

  function initialize() {
	geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(43.4609602, -3.8079336);
    var myOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);	
	infowindow = new google.maps.InfoWindow({
  		content: "Pablo"
  		});
    marcador = new google.maps.Marker( {
		position: latlng,
		map:map	
	})	
	infowindow.open(map, marcador);
	google.maps.event.addListener(marcador, 'click', function() {
 	     infowindow.open(map, marcador);
  	});	
  }
  
  function codeAddress(location){
  	  	geocoder.geocode({'address':location}, function(results, status){
	  	   if (status == google.maps.GeocoderStatus.OK){
		       map.setCenter(results[0].geometry.location);
			   marcador.setPosition(results[0].geometry.location);
		   }
		   else{
		   		alert("Geocode was not successful for the following reason: "+ status);
		   }
	  });	   
  }
  

  function showMyLocation(){
		navigator.geolocation.getCurrentPosition( onGPSRead , onGPSError , {enableHighAccuracy:true} )  
  }
  
  function onGPSRead(){	  
	  var mylocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);	  
	  map.setCenter(mylocation);
	  marcador.setPosition(mylocation);	
  }
  
  function onGPSError(){
	  alerta(" I cannot find you :(")
  }
  

  