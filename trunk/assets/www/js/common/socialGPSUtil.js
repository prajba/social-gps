  function hrefURL(url){
		/*window.open(url,"","any desired parameter");*/
		window.location.href = url;
  }
  
  function mobileChangePage(Url){
//	  alert("Call MobileChangepage to "+Url)
	  $.mobile.changePage( Url, { transition: "slide"} );
  }