var map
var marcador

  function initializeGMaps() {
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
		
		
    marcador = new google.maps.Marker( {
		position: latlng,
		map:map	
	})
  }
  
  function showMyLocation(){
		navigator.geolocation.getCurrentPosition( onGPSRead , onGPSError , {enableHighAccuracy:true} )  
  }
  
  function onGPSRead(location){
	  
	  var mylocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
	  
	  map.setCenter(mylocation)
	  marcador.setPosition(mylocation)
	  
  }
  
  function onGPSError(){
	  alerta(" I cannot find you :(")
  }
  
