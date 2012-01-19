function savePlacesToLocalStorage()
{
	 var places = $('#places').serialize();		
	// alert("saving places");
	 localStorage.setItem("places",places);		
	 var storedData = localStorage.getItem("places");
	//  alert("storeddata after saving: "+storedData);
}

function showbtn(){
		alert("showbtn called")
		 var places = $('#places').serialize();
		 var infos = $('#infowindow').serialize();		   
		 localStorage.setItem("places",places);		
		 localStorage.setItem("infowindow",infos);		
		 alert(infos);
		 var storedData = localStorage.getItem("places");
		 //alert(storedData);
};