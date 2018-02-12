// Inject js if conditions met

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {  

    if (changeInfo.status == 'complete') {
        if(tab.url.indexOf("macrobusiness") != -1) {
            chrome.tabs.executeScript(tab.id, { file: "recent.js" });
         }
    }
});    

