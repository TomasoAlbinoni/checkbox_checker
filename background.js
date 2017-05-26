function getToggle(callback) {
  chrome.storage.local.get('toggle', function(data){
    if(data.toggle === undefined) {
      callback(true); // default value
    } else {
      callback(data.toggle);
    }
  });
}

function setToggle(value, callback) {
  chrome.storage.local.set({toggle : value}, function(){
    if(chrome.runtime.lastError) {
      throw Error(chrome.runtime.lastError);
    } else {
      callback();
    }
  });
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  getToggle(function(toggle){
    toggle = !toggle;
    setToggle(toggle, function(){
      // Send a message to the active tab
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"check" : toggle});
      });
    });
  });
});