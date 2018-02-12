// Inject js if conditions met
var poweredOn = false; // prevent multiple injections

// this runs on startup. detects last status and injects js if power was left 'on'
chrome.storage.local.get({'MBPowerStatus':[]}, function (items) {
    MBPower = items['MBPowerStatus']; 
    if (MBPower.length == 0) { // never previously set
        MBPower = 'on';
    }
    console.log(MBPower); // debug */
    if (MBPower == 'on' && poweredOn == false) {
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {  
            if (changeInfo.status == 'complete') {
                if(tab.url.indexOf("macrobusiness") != -1) {
                    chrome.tabs.executeScript(tab.id, { file: "recent.js" });
                    poweredOn = true;
                }
            }
        });   
    }
});
    
// this will run AFTER startup, IF the power buttons are pushed
 
    
chrome.runtime.onMessage.addListener(function(request,sender) {
    if(request.type == "power status") {
        MBPower = request.power;
        console.log(MBPower);
    }
    /* send response
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,{msg:'msg received'})
    });*/    
    if (MBPower == 'on' && poweredOn == false) {
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {  
            if (changeInfo.status == 'complete') {
                if(tab.url.indexOf("macrobusiness") != -1) {
                    chrome.tabs.executeScript(tab.id, { file: "recent.js" });
                    poweredOn = true;
                }
            }
        });   
    }
    else if (MBPower == 'on' && poweredOn == true) {
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {  
            if (changeInfo.status == 'complete') {
                if(tab.url.indexOf("macrobusiness") != -1) {
                    chrome.tabs.executeScript(tab.id, { file: "restart.js" });
                }
            }
        });   
    }
    else if (MBPower == 'off') {
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {  
            if (changeInfo.status == 'complete') {
                if(tab.url.indexOf("macrobusiness") != -1) {
                    chrome.tabs.executeScript(tab.id, { file: "remove.js" });
                }
            }
        });   
    }
});    

