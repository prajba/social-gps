function addFriendToFriendslist(friendNameForListOfCity, address, marker, markerindex, funk)
{
	  // replace empty strings 
	 if(address =='')
   	   address ="- - -";

  	  // Creating DOM Elements
	  var nf_p = 		document.createElement("p");
	  var nf_a = 		document.createElement("a");
	  var nf_span_name = 	document.createElement("span");
	  var nf_name = 	document.createTextNode(friendNameForListOfCity);
	  var br = 		document.createElement("br");
	  var nf_span_loc = 	document.createElement("span");
	  var nf_loc = 		document.createTextNode(address);

	  // Setting DOM Element Properties & Methods
	  if(marker==0)
	  {
	    nf_a.href = 'javascript:alert("The hometown location from your friend could not be localized.")';
	    nf_a.id = "noadd";
	  }
          
	  if(marker==1)
	  {
  	    nf_a.href = 'javascript:clickIt(' + markerindex + ')';
	  }
 	  
	  nf_span_name.id = "name";
	  nf_span_loc.id = "location";

	  // Constructing "p" element
	  nf_span_name.appendChild(nf_name);
	  nf_span_loc.appendChild(nf_loc);
	  nf_a.appendChild(nf_span_name);
	  nf_a.appendChild(br);
	  nf_a.appendChild(nf_span_loc);
	  nf_p.appendChild(nf_a);

	  // Adding "p" element to the DOM tree (to the div tag with the id="friendslist")
          var friendslist = document.getElementById("friendslist");
	  friendslist.appendChild(nf_p);

	  return marker;
}