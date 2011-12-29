// Global Variables
var geocoder = new GClientGeocoder();
var map;
var citycount = 0;
var markers = [];
var listelements = [];
var listelements2 = [];
var citypoints = [];
var cityinfo = [];
var temp_id = '';



function load()
{
 loadFriends("demo.xml");
  if (GBrowserIsCompatible())
  {
        map = new GMap2(document.getElementById("map"));
        map.addControl(new GLargeMapControl());
        map.addControl(new GMapTypeControl());
        map.setCenter(new GLatLng(0, 0), 1);
  }
  
}



function loadFriends(xmldoc)
{
	
	
	var friends;	
	var locations;
	var node = '';
	var hometown = 'Zagreb,Croatia';
	var name = 'Ion';
	var picture = '';
	var personal_info = '';
	var birthday = '16.07.1988';	
	

		//Get Names
		name = "Ion Ion"

		//Get Hometown_Location (Town, State, Country, PLZ)
		locations = "Zagreb, Croatia"
		hometown = 'Zagreb';
		
		//Get Pictures
		
		    picture = 'http://static.ak.facebook.com/pics/s_default.jpg';

		//Get Birthday
		birthday = "11/12/1988"


		bubble = '<div id="bubble"><div id="bubbleimg"><img src="' + picture + '" /></div><div id="bubbletxt"><b>' + name + 
			 '</b><br /><br />Birthday: ' + birthday + '<br /><br /> ' + hometown + '</div><div id="bubblezoom"><a href="javascript:map.setZoom(11)">City</a> | <a href="javascript:map.zoomIn()">Zoom In (+)</a> | <a href="javascript:map.zoomOut()">Zoom Out (-)</a> | <a href="javascript:map.setZoom(2)">World</a></div></div>';
		
        
       
	
        showAddress(1, hometown, name);
	


//JOERN
//get p tag delete "Loading..." node
var friendslist = document.getElementById("friendslist");
var LoadNode = document.getElementById("FLloading");
friendslist.removeChild(LoadNode);

}



function showAddress(id, address, friendNameForListOfCity)
{
        geocoder.getLatLng(
          address,
          function(point){
            if (!point){

	     //JOERN create friends list entry - no marker on map / no address found
	     var xyz = addFriendToFriendslist(friendNameForListOfCity, address,0,0);

              alert(address + " not found");
            }
            else{
                var marker = new GMarker(point);
                markers[id] = marker;

		//JOERN friends list entry - marker found
		var xyz = addFriendToFriendslist(friendNameForListOfCity, address, 1, id);

                    if (citycount == 0){
                            // create new entry in citypoints and cityinfo and display on map
                            citypoints[citycount] = point;
                            cityinfo[citycount] = '<b>' + address + "</b><br /><br /><u>Your Friends from here:</u><br /><br /><a href=\"javascript:clickIt(" + id + ");\">" + friendNameForListOfCity + "</a><br>";
                            var temp = cityinfo[citycount];
                            map.addOverlay(marker);
                            GEvent.addListener(marker, "click", function(){
                                marker.openInfoWindowHtml(temp);
                            });
                            citycount++;
                    }
                    else{
                        var schalter = 0;
                        for (i = 0; i < citypoints.length; i++){
                            if (citypoints[i].equals(point)){
                                temp = cityinfo[i];
                                cityinfo[i] = temp + "<a href=\"javascript:clickIt(" + id + ");\">" + friendNameForListOfCity + "</a><br>";
                                map.addOverlay(marker);
                                GEvent.addListener(marker, "click", function(){
                                    marker.openInfoWindowHtml(temp + "<a href=\"javascript:clickIt(" + id + ");\">" + friendNameForListOfCity + "</a><br>");
                                });
                                schalter = 1;
                                break;
                            }
                        }
                        if (schalter == 0){
                                // create new entry in citypoints and cityinfo and display on map
                                citypoints[citycount] = point;
                            cityinfo[citycount] = '<b>' + address + "</b><br /><br /><u>Your Friends from here:</u><br /><br /><a href=\"javascript:clickIt(" + id + ");\">" + friendNameForListOfCity + "</a><br>";
                                var temp = cityinfo[citycount];
                                map.addOverlay(marker);
                                GEvent.addListener(marker, "click", function(){
                                    marker.openInfoWindowHtml(temp);
                                });
                                citycount++;
                        }
                    }
            }
          }
        );
}



function createMarker(point, message)
{
     var marker = new GMarker(point);
     GEvent.addListener(marker, "click", function(){
       marker.openInfoWindowHtml(message);
       });
     return marker;
}



function clickIt(id)
{
  temp_id = id;
  fetchAmazon(id);
}