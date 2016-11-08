var url = '';
var reload = 'okay';

// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var title = "Mute Them!";
  var id = chrome.contextMenus.create({"title": "Mute Them!", "id": "Shut Up!"});  
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
        if(tab.url.indexOf("macrobusiness") != -1) {
            chrome.tabs.executeScript(null, {file:'jquery-2.2.2.min.js'});
            chrome.tabs.executeScript(tab.id, { file: "mute.js" });
        }
}; 

// listener for message
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // console.log(request);
        reload = request;
        if (reload == "noReload") {
            sendResponse("not reloading");
        }
        else if (reload == "reloadOkay") {
            sendResponse("reloading");
        }
        else if (reload == "hideOkay") {
            sendResponse("hiding...");
        }
    }
);

// listener to inject JS 
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        url = tab.url.split('#')[0];
        if((tab.url.indexOf("macrobusiness") != -1) && (reload != "noReload")) {
            chrome.tabs.executeScript(tab.id, { file: "recent.js" });
        }
    }
}); 