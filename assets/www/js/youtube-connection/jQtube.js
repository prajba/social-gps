
function searchClicked()
        {
            document.getElementById("videoResultsDiv").innerHTML = 
                                    'Loading YouTube videos ...';

            var city="Linz";
            //create a JavaScript element that returns our JSON data.
            var script = document.createElement('script');
            script.setAttribute('id', 'jsonScript');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', 'http://gdata.youtube.com/feeds/' + 
                   'videos?vq=' + city + '&max-results=5&' + 
                   'alt=json-in-script&callback=showMyVideos&' + 
                   'orderby=relevance&sortorder=descending&format=5');

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
                 var lnk = entry.link[0].href;
                 html.push('<div data-role="fieldcontain"><p>',title,'<\p><embed id="',id,'" src="',lnk,'" width="300" height="199"></embed></div>');
                 document.getElementById('videoResultsDiv').innerHTML = html.join('');
     				// this sets the id of the object or embed tag to 'myytplayer'.
     				// You then use this id to access the swf and make calls to the player's API     				
                
             }
             
        }
        
        
        
        
     
  