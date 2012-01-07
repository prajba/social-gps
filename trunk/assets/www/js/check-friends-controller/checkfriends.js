
function populateFriends(){
		  var storedData = localStorage.getItem("friends");
  							  if (storedData) {
  							     listdata = JSON.parse(storedData);
  							   }
  							   var size = listdata.length;
  							   for (var i = 1; i <= 5; i++){
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
  												var options='<option value="'+name+'">'+name+'</option>';
  												$("select#friends").append(options);
  												$("select#friends").selectmenu("refresh");
  								   }
  							    }
  	  	   	 				
};

    		