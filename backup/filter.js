// this is the code which will be injected into the page

/*
chrome.storage.local.get({'blacklisted':['No names']}, function (items) {
blacklist_arr = items["blacklisted"];
console.log(blacklist_arr); });
*/

function hideComments(name) {
    
    $('article').each(function() {
        var hide = 1;
        $(this).find('cite').each(function() {
            var myStr = $(this).text();
            if (myStr !== name) { 
                console.log('caught one')
                hide = 0;
            };
        });
        if (hide == 1) $(this).hide();
    });

}

function enforceBlacklist() {
    
    chrome.storage.local.get({'blacklisted':['No names']}, function (items) {
    blacklist_arr = items["blacklisted"];
    
    for (index = 0; index < blacklist_arr.length; ++index) {
        hideComments(blacklist_arr[index]);
    }
    
    });

}

enforceBlacklist();