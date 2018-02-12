// this is the code which will be injected into the page

$('article').each(function() {
    //var hide = 1;
    $(this).find('time').each(function() {
        var myTime = $(this).attr('datetime');
        //if (myStr !== name) { 
            console.log(myTime)
        //    hide = 0;
        });
    });
    //if (hide == 1) $(this).hide();
//});


/*
function enforceBlacklist() {
    
    chrome.storage.local.get({'blacklisted':['No names']}, function (items) {
    blacklist_arr = items["blacklisted"];
    
    for (index = 0; index < blacklist_arr.length; ++index) {
        hideComments(blacklist_arr[index]);
    }
    
    });

}

enforceBlacklist();
*/