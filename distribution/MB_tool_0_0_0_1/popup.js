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

// flag for showing favourites list
var flag = 0;

// function for updating local storage
function setStorage(array, keyToSet) {

    var keyName = keyToSet;
    var obj = {};
    obj[keyName] = array;
    // Save it using the Chrome extension storage API.
    // Overwrites whatever was there previously
    chrome.storage.local.set(obj); 

    return;
    
}

document.addEventListener('DOMContentLoaded', function() {
  
  // get favourites list
    var MBFavNameAddButton = document.getElementById('MBlistAdd');
    MBFavNameAddButton.addEventListener('click', function() {
        
        // get new input value to add
        var to_MBFavList = document.getElementById('MBFavName').value;
        
        // Check that there's actually a name there...
        if (!to_MBFavList) {
          alert('Error: No name specified');
          return;
        }
        
        // gets current list from local storage
        chrome.storage.local.get({'MBFavList':[]}, function (items) {
        MBFavList_arr = items['MBFavList']; 
        // console.log(MBFavList_arr.length);
        // append new name to array
        MBFavList_arr.push(to_MBFavList)
        
        // update local storage
        setStorage(MBFavList_arr, 'MBFavList')
        
        });
        
    });
    
    // view list
    var viewMBlistButton = document.getElementById('viewMBlist');
    viewMBlistButton.addEventListener('click', function() {
        
        // gets current list from local storage and displays it as a UL
        chrome.storage.local.get({'MBFavList':['No names']}, function (items) { 
        MBFavList_arr = items['MBFavList'];

        // add existing list to list in HTML, remove first if exists already
        var blackNames = makeUL(MBFavList_arr);
        
        if (flag == 1) {
        mydiv = document.getElementById('current_MBFavList');
        while ( mydiv.firstChild ) mydiv.removeChild( mydiv.firstChild );
        flag = 0;
        }
        else {
        document.getElementById('current_MBFavList').appendChild(blackNames);
        flag = 1;
        }
        
        // function (jquery) for REMOVING an item from the existing list
        $("#listDisplay li").click(function() {
        var selectedID = this.id; // select item
        MBFavList_arr.splice(selectedID, 1); // remove it
        // update local storage
        setStorage(MBFavList_arr, 'MBFavList')
        });
        
        });
    
    });

});


