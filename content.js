chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
	  var checkboxes = document.getElementsByTagName('input');

      for (var i=0; i<checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox') checkboxes[i].checked = true;
      }
    }
  }
);