function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');
        list.id = 'listDisplay';

    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');
            item.id = i;

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

// flag for showing blacklist
var flag = 0;

// function for updating local storage
function setStorage(array) {

    var keyName = 'blacklisted';
    var obj = {};
    obj[keyName] = array;
    // Save it using the Chrome extension storage API.
    // Overwrites whatever was there previously
    chrome.storage.local.set(obj); 

    return;
    
}

document.addEventListener('DOMContentLoaded', function() {
  
  // get blacklist
    var blacklistAddButton = document.getElementById('blacklistAdd');
    blacklistAddButton.addEventListener('click', function() {
        
        // get new input value to add
        var to_blacklist = document.getElementById('black_name').value;
        
        // Check that there's actually a name there...
        if (!to_blacklist) {
          alert('Error: No name specified');
          return;
        }
        
        // gets current blacklist from local storage
        chrome.storage.local.get({'blacklisted':[]}, function (items) {
        blacklist_arr = items['blacklisted']; 
        // console.log(blacklist_arr.length);
        // append new name to blacklist array
        blacklist_arr.push(to_blacklist)
        
        // update local storage
        setStorage(blacklist_arr)
        
        });
        
    });
    
    // view blacklist
    var viewBlacklistButton = document.getElementById('viewBlacklist');
    viewBlacklistButton.addEventListener('click', function() {
        
        // gets current blacklist from local storage and displays it as a UL
        chrome.storage.local.get({'blacklisted':['No names']}, function (items) { 
        blacklist_arr = items['blacklisted'];

        // add existing blacklist to list in HTML, remove first if exists already
        var blackNames = makeUL(blacklist_arr);
        
        if (flag == 1) {
        mydiv = document.getElementById('current_blacklist');
        while ( mydiv.firstChild ) mydiv.removeChild( mydiv.firstChild );
        flag = 0;
        }
        else {
        document.getElementById('current_blacklist').appendChild(blackNames);
        flag = 1;
        }
        
        // function (jquery) for REMOVING an item from the existing blacklist
        $("#listDisplay li").click(function() {
        var selectedID = this.id; // select item
        blacklist_arr.splice(selectedID, 1); // remove it
        // update local storage
        setStorage(blacklist_arr)
        });
        
        });
    
    });

});


