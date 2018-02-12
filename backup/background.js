/* Create a context-menu */

chrome.contextMenus.create({
    'id': "filterComments",   // <-- mandatory with event-pages
    'title': "MB Filter",
    'documentUrlPatterns': ['*://www.macrobusiness.com.au/*'],
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "filterComments") {
        // Inject the code into the current tab
        chrome.tabs.executeScript(tab.id, { file: "filter.js" });
    }
});

/*
chrome.contextMenus.create({
    'id': "reorderComments",   // <-- mandatory with event-pages
    'title': "MB Sort",
    'documentUrlPatterns': ['*://www.macrobusiness.com.au/*'],
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "reorderComments") {
        // Inject the code into the current tab
        chrome.tabs.executeScript(tab.id, { file: "reorder.js" });
    }
});
*/

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {  


    if (changeInfo.status == 'complete') {
        if(tab.url.indexOf("macrobusiness") != -1) {
            chrome.tabs.executeScript(tab.id, { file: "recent.js" });
         }
    }
});    

