var requestAmazon;

function createAmazonRequest() {
	  var request = null;
	  try {
        request = new XMLHttpRequest();
      } catch (trymicrosoft) {
        try {
          request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (othermicrosoft) {
          try {
            request = new ActiveXObject("Microsoft.XMLHTTP");
          } catch(failed) {
            request = null;
          }
        }
      }
      if (request == null){
        alert('Error: Request could not be created');
      }else{
      	return request;
      }
    }

function fetchAmazon(id) {
      requestAmazon = createAmazonRequest()
      var artist = listelements2[id].replace(/ /g, ",");
	  var uri = 'onca/xml?Service=AWSECommerceService&AWSAccessKeyId=1H7RB22SWK8XPRESX5G2&Operation=ItemSearch&SearchIndex=Music&Artist=' + artist + '&ResponseGroup=Images,ItemAttributes';
      uri = encodeURIComponent(uri);
      var url = 'amazon_proxy.php?path=' + uri + '&dummy=' + new Date().getTime();
      requestAmazon.open("GET", url, true);
      requestAmazon.onreadystatechange = buildTabs;
      requestAmazon.send(null);
	}


function buildTabs(){
	if (requestAmazon.readyState == 4) {
    	var xmldoc = requestAmazon.responseXML;
        var itemNodes = xmldoc.getElementsByTagName('Item');
        if (itemNodes.length > 0){
        	var artwork = getArtwork(itemNodes.item(0));
        	//alert(artwork);
        	var artist = getArtist(itemNodes.item(0));
        	//alert(artist);
        	var album = getAlbum(itemNodes.item(0));
        	//alert(album);
        	var price = getPrice(itemNodes.item(0));
        	//alert(price);
        	var link = getLink(itemNodes.item(0));
        	//alert(link);
        	var musicTab = buildMusicBubble(artwork, artist, album, price, link);
        }
        else
        	var musicTab = buildMusicBubble('/images/no-img-lg.gif', '', 'Sorry, but your friend has no music information stored in Facebook.', '', '');
		
		var infoTabs = [
  		new GInfoWindowTab("Personal",listelements[temp_id]),
  		new GInfoWindowTab("Music",musicTab)
	 	];
	
	markers[temp_id].openInfoWindowTabsHtml(infoTabs);
		
    }
}
    
function getArtwork(node){
	var url = node.childNodes[2].firstChild;
	return url.firstChild.data
	}

function getArtist(node){
	var art = node.getElementsByTagName('Artist');
	if (art.length > 0){
		return art.item(0).firstChild.data
		}
	else {
		var text = "Compliation"
		return text;
	}
}

function getAlbum(node){
	var alb = node.getElementsByTagName('Title');
	return alb.item(0).firstChild.data
	}

function getPrice(node){
    var pri = node.getElementsByTagName('FormattedPrice');
	return pri.item(0).firstChild.data
	}

function getLink(node){
	return node.childNodes[1].firstChild.data;
	}

function buildMusicBubble(artwork, artist, album, price, page)
{
  if(page=='')
  {
    tab = '<div id="azbubble"><div id="azbubbleinfo">Based on the music information on <a href="http://www.facebook.com" target="_blank">Facebook</a>, <br />your friend might like this article as a gift.</div><div id="azbubbleimg"><img src="' + artwork + '" /></div><div id="azbubbletxt" style="height:90px; vertical-align:middle">' + album + '</div>';
  }
  else
  {
    tab = '<div id="azbubble"><div id="azbubbleinfo">Based on the music information on <a href="http://www.facebook.com" target="_blank">Facebook</a>, <br />your friend might like this article as a gift.</div><div id="azbubbleimg"><img src="' + artwork + '" /></div><div id="azbubbletxt"><b>' + artist + '</b><br/><br/>' + album + '<br/><br/>For ' + price + ' at <a href="' + page + '" target="_blank">Amazon</a></div>';
  }
  return tab;
}