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
	google.maps.event.addListener(marcador, 'click', function() {
 	 infowindow.open(map, marcador);
  	});	
  } 

  function mapBuddies(){
	   var location; 
	   var name;	  
	   var storedData = localStorage.getItem("friends");
	   if (storedData) {
       	   listdata = JSON.parse(storedData); 
	   }
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
  

  