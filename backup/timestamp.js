function assessTime() {
    
    var timeStamp = Math.floor(Date.now() / 1000); // make current timeStamp
    
    // get old time from storage
    chrome.storage.local.get({'storedTime':0}, function (result) {
    var oldTime = (result.storedTime);
    
    if (timeStamp - oldTime > 1500) { // more than 25 minutes since old timestamp
        var keyName = 'storedTime';
        var obj = {};
        obj[keyName] = timeStamp;
        // Save it using the Chrome extension storage API.
        // Overwrites whatever was there previously
        chrome.storage.local.set(obj);
        console.log('Timestamp set', timeStamp);
        var useTime = timeStamp;
    }
    else {
        var useTime = oldTime; // if less than 25 mins have passed
    }
    
    console.log('Difference is', timeStamp - oldTime);
    console.log('useTime is', useTime);
    
    $('section').each(function() {
        if ($(this).attr('class') == 'comment') {
            $('article').each(function() {
                var colour = 1;
                $(this).find('time').each(function() {
                    var cTime = $(this).attr('datetime');
                    if (cTime != undefined) {
                        var commentTime = new Date(cTime);
                        var compareTime = Math.floor(commentTime / 1000);
                        if (compareTime <= useTime) { 
                            console.log('caught one', $(this))
                            colour = 0;
                        };
                    };
                });
                if (colour == 1) $(this).css( "background-color", "LemonChiffon" );
            });
        }
    });
    });    
}

assessTime();

/*
function highlightNew(timeStamp) {
    
    $('article').each(function() {
        var colour = 1;
        $(this).find('time').each(function() {
            var cTime = $(this).attr('datetime');
            var commentTime = new Date(cTime);
            var compareTime = Math.floor(commentTime / 1000);
            if (compareTime >= timeStamp) { 
                console.log('caught one')
                colour = 0;
            };
        });
        if (colour == 1) $(this).css( "background-color", "LemonChiffon" );
    });

}
*/