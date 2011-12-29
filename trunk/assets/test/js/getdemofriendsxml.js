
function readDemoXML()
{
      createRequest();
      var url = "demo.xml"

      url = url + "?dummy=" + new Date().getTime();
      request.open("GET", url, true);
      request.onreadystatechange = updatePage;
      request.send(null);
}

// ReadXML in ReadFriendsXML umbenennen; ReadMeXML dann analog,
// es muss aber noch der Parameter uid angehängt werden
// var url = "fetchFriends.php?sk=" + sk + "&uid=" + uid;
