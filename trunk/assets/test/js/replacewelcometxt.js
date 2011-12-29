function replaceWelcomeText(myinfo)
{
	  var divheader2 = document.getElementById("header2");
          var h1welcometxt = document.getElementById("welcometxt")

          var first_name = "-";
          var last_name = "-";

	  first_name = myinfo.getElementsByTagName('first_name').item(0).firstChild.data;
	  last_name = myinfo.getElementsByTagName('last_name').item(0).firstChild.data;

	  var new_h1 	= document.createElement("h1");
	  new_h1.id 	= "welcometxt";
	  var name 	= document.createTextNode("Welcome " + first_name + " " + last_name + "!");
	  new_h1.appendChild(name);

	  divheader2.replaceChild(new_h1, h1welcometxt);
}