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

function populateFriends(){
	var el = $('#friends').multiselect();
	var storedData = localStorage.getItem("friends");
    if (storedData) {
       	   listdata = JSON.parse(storedData); 
	}
	var size = listdata.length;
	for (var i = 1; i <= size; i++){	
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
			   var v = name, opt = $('<option />', {
			   	   value: v,
			   	   text: v
			   });	
			   opt.appendTo( el );		
			   el.multiselect('refresh');
	   }
     }
};

    		