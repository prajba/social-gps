$('#page-videos').live(
		"pagecreate",
		function() {				
		});
function searchClicked()
        {
            document.getElementById("videoResultsDiv").innerHTML = 
                                    'Loading YouTube videos ...';

            //create a JavaScript element that returns our JSON data.
            var script = document.createElement('script');
            script.setAttribute('id', 'jsonScript');
            script.setAttribute('type', 'text/javascript');
            
            
            var category= document.getElementById("categories").value;
            
            
        	var place = localStorage.getItem("placeName");
        	
        	// when we search for videos about our location
        	if(place != null){
        		var placeAddress = localStorage.getItem("placeAddress");
        		var addresses = placeAddress.split(",");
            	var city = addresses[addresses.length-2].replace(/[0-9]/g, "");
            	
            	 if(category == "All"){
                 	script.setAttribute('src', 'http://gdata.youtube.com/feeds/' + 
                             'videos?vq=' + place + city + '&max-results=5&' + 
                             'alt=json-in-script&callback=showMyVideos&' + 
                             'orderby=relevance&sortorder=descending&format=5');
                 }else{
                 	script.setAttribute('src', 'http://gdata.youtube.com/feeds/' + 
                             'videos?vq=' + city + '&max-results=5&' + 
                             'alt=json-in-script&callback=showMyVideos&' + 
                             'orderby=relevance&sortorder=descending&category='
                             + category +'&format=5');
                 }
            	 
        	}else{ // when we search for videos about a place
        		var address = localStorage.getItem("address");
            	var addresses = address.split(",");
            	var city = addresses[addresses.length-2].replace(/[0-9]/g, "");
            	
            	 if(category == "All"){
                 	script.setAttribute('src', 'http://gdata.youtube.com/feeds/' + 
                             'videos?vq=' + city + '&max-results=5&' + 
                             'alt=json-in-script&callback=showMyVideos&' + 
                             'orderby=relevance&sortorder=descending&format=5');
                 }else{
                 	script.setAttribute('src', 'http://gdata.youtube.com/feeds/' + 
                             'videos?vq=' + city + '&max-results=5&' + 
                             'alt=json-in-script&callback=showMyVideos&' + 
                             'orderby=relevance&sortorder=descending&category='
                             + category +'&format=5');
                 }
        	}
        	
        	
        	
           
            
           
            
            

            //attach script to current page -  this will submit asynchronous
            //search request, and when the results come back callback 
            //function showMyVideos(data) is called and the results passed to it
            document.documentElement.firstChild.appendChild(script);
        }

        function showMyVideos(data)
        {
        	   	
        	
        	 var feed = data.feed;
             var entries = feed.entry || [];
             var html = [''];
             for (var i = 0; i < entries.length; i++)
             {
                 var entry = entries[i];
                 var id ="myytplayer"+i;
                 var title = entry.title.$t;
                 var videoId= entry.id.$t;
                 videoId=videoId.replace("http://gdata.youtube.com/feeds/videos/","");

                 var lnk = "http://www.youtube.com/embed/"+videoId;
                	 
                 html.push('<div data-role="fieldcontain" style="font-size: 1em; margin-left: auto; margin-right: auto; width: 100%; text-align: center;"><p>',title,'<\p><iframe class="youtube-player" type="text/html" width="270" height="152" frameborder="0" id="',id,'" src="',lnk,'"></iframe></div>');
                 document.getElementById('videoResultsDiv').innerHTML = html.join('');
     				// this sets the id of the object or embed tag to 'myytplayer'.
     				// You then use this id to access the swf and make calls to the player's API 
                 
                 //http://www.youtube.com/watch?v=K4SA0lw7Ffg&feature=youtube_gdata
             }
        }
        
        
        
        
     
  