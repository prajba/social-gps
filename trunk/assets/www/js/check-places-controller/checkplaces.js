 $(document).ready(function(){
            $(".button").hover(function(){
                $(".button img")
                .animate({top:"-10px"}, 200).animate({top:"-4px"}, 200) // first jump
                .animate({top:"-7px"}, 100).animate({top:"-4px"}, 100) // second jump
                .animate({top:"-6px"}, 100).animate({top:"-4px"}, 100); // the last jump
            });
        }); 
$("#foo").multiselect();
$("#bar").multiselect({ multiple:false });
$("#accordion").accordion();
$("select").multiselect(
{
   selectedList: 4
}
);	
$("select").multiselect().multiselectfilter();

function savePlacesToLocalStorage()
{
	alert("saving places");
	 var places = $('#places').serialize();		   
	 localStorage.setItem("places",places);				
}
function showbtn(){
		alert("showbtn called")
		 var places = $('#places').serialize();
		 var infos = $('#infowindow').serialize();		   
		 localStorage.setItem("places",places);		
		 localStorage.setItem("infowindow",infos);		
		 alert(infos);
		  var storedData = localStorage.getItem("places");
		  alert(storedData);
};