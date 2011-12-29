
function welcometxt()
{
      createMeRequest();
      var url = "fetchMe.php?sk=" + sk + "&uid=" + uid;

      url = url + "&dummy=" + new Date().getTime();
      requestMe.open("GET", url, true);
      requestMe.onreadystatechange = updateWelcomeText;
      requestMe.send(null);
}


function createMeRequest()
{
          try{
              requestMe = new XMLHttpRequest();
          }
          catch (trymicrosoft){
              try{
                  requestMe = new ActiveXObject("Msxml2.XMLHTTP");
              }
              catch (othermicrosoft){
                  try{
                      requestMe = new ActiveXObject("Microsoft.XMLHTTP");
                  }
                  catch (failed){
                      requestMe = null;
                  }
              }
          }
          if (requestMe == null){
              alert("Error creating requestMe object!");
          }
}



function updateWelcomeText()
{
  if (requestMe.readyState == 4)
  {
    if (requestMe.status == 200)
    {
      var myinfo = requestMe.responseXML;

      replaceWelcomeText(myinfo);
    }
    else
    {
      alert("Error! Request status is " + requestMe.status);
    }
  }
}