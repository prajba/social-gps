var map;
var marcador;
google.load("maps","2");
var infoTabs;
  function initialize() {  	
		map = new google.maps.Map2(document.getElementById("map_canvas"));
		map.setCenter(new google.maps.LatLng(43.4609602, -3.8079336), 8);
		map.addControl(new google.maps.LargeMapControl());
		map.addControl(new google.maps.MenuMapTypeControl());
		infoTabs = [
			new google.maps.InfoWindowTab("Onglet 1", "<div style='width: 320px; height: 100px;'>Texte contenu dans l'onglet 1</div>"),
			new google.maps.InfoWindowTab("Onglet 2", "<div style='width: 320px; height: 100px;'>Texte contenu dans l'onglet 2</div>")			
		];
		marcador = new google.maps.Marker(map.getCenter());
		google.maps.Event.addListener(marcador, "click", function() {
			marcador.openInfoWindowTabsHtml(infoTabs);
		});
		map.addOverlay(marcador);
		marcador.openInfoWindowTabsHtml(infoTabs);
		
  }
  
  function showMyLocation(){
		navigator.geolocation.getCurrentPosition(onGPSRead , onGPSError , {enableHighAccuracy:true} );
	
  }
  
  function onGPSRead(location){	  
	  var mylocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);	  
	  map.setCenter(mylocation);
	  marcador.setPosition(mylocation);
	map.addOverlay(marcador);
	marcador.openInfoWindowTabsHtml(infoTabs);
		
	  
  }
  
  function onGPSError(){
	  alerta(" I cannot find you :(")
  }
  
	