function makeUL(nameArray) {
    
    if (nameArray.length == 0) {
        nameArray = ['No names'];
    }
    // Create the list element:
    var list = document.createElement('ul');
    list.id = 'listDisplay';

    for(var i = 0; i < nameArray.length; i++) {
        // Create the list item:
        var item = document.createElement('li');
        item.id = i;
        
        // Set its contents:
        item.appendChild(document.createTextNode(nameArray[i]));
    
        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

// flag for showing favourites list
var favFlag = 0;
var filtFlag = 0;

// function for updating local storage
function setStorage(nameArray, keyToSet) {

    var keyName = keyToSet;
    var obj = {};
    obj[keyName] = nameArray;
    // Save it using the Chrome extension storage API.
    // Overwrites whatever was there previously
    chrome.storage.local.set(obj); 

    return;
    
}

// function to switch flag
function switchFlag(flagVal) {
    if (flagVal == 1) {
        newFlagVal = 0
    }
    else {
        newFlagVal = 1
    }
    return newFlagVal
}

// function to display listStyleType
function showList(flagVal, listName, toAppend) {
    if (flagVal == 1) {
        mydiv = document.getElementById(listName);
        while (mydiv.firstChild) mydiv.removeChild( mydiv.firstChild );
    }
        else {
        document.getElementById(listName).appendChild(toAppend);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    var MBFavNameAddButton = document.getElementById('MBFavListAdd');
    var viewMBFavListButton = document.getElementById('viewMBFavList');
    var MBFiltNameAddButton = document.getElementById('MBFiltListAdd');
    var viewMBFiltListButton = document.getElementById('viewMBFiltList');
    var MBPowerOnButton = document.getElementById('MBPowerOn');
    var MBPowerOffButton = document.getElementById('MBPowerOff');
    
    // store power status AND send message
    MBPowerOnButton.addEventListener('click', function() {
        setStorage('on', 'MBPowerStatus');
        console.log('power on');
        chrome.runtime.sendMessage({type: "power status", power:'on'});
    });
    
    MBPowerOffButton.addEventListener('click', function() {
        setStorage('off', 'MBPowerStatus');
        console.log('power off');
        chrome.runtime.sendMessage({type: "power status", power:'off'});
    });
  
    // get favourites list
    
    MBFavNameAddButton.addEventListener('click', function() {
        // get new input value to add
        var to_MBFavList = document.getElementById('MBFavName').value;
        
        // Check that there's actually a name there...
        if (!to_MBFavList) {
          console.log('Error: No name specified');
          return;
        }
        
        // gets current list from local storage
        chrome.storage.local.get({'MBFavList':[]}, function (items) {
        MBFavList_arr = items['MBFavList']; 
        // append new name to array
        MBFavList_arr.push(to_MBFavList);
        
        // update local storage
        setStorage(MBFavList_arr, 'MBFavList');
        
        });
        
    });
    
    // show favourites list
    viewMBFavListButton.addEventListener('click', function() {
        
        // gets current list from local storage and displays it as a UL
        chrome.storage.local.get({'MBFavList':['No names']}, function (items) { 
        MBFavList_arr = items['MBFavList'];
        
        // add existing list to list in HTML, remove first if exists already
        var favNames = makeUL(MBFavList_arr);
        
        // show list
        showList(favFlag, 'current_MBFavList', favNames);
        favFlag = switchFlag(favFlag);
        
        // function (jquery) for REMOVING an item from the existing list
        $("#listDisplay li").click(function() {
        var selectedID = this.id; // select item
        MBFavList_arr.splice(selectedID, 1); // remove it
        // update local storage
        setStorage(MBFavList_arr, 'MBFavList');
        });
        
        });
    
    });
    
    // get filter list
    MBFiltNameAddButton.addEventListener('click', function() {
        
        // get new input value to add
        var to_MBFiltList = document.getElementById('MBFiltName').value;
        
        // Check that there's actually a name there...
        if (!to_MBFiltList) {
          console.log('Error: No name specified');
          return;
        }
        
        // gets current list from local storage
        chrome.storage.local.get({'MBFiltList':[]}, function (items) {
        MBFiltList_arr = items['MBFiltList']; 

        // append new name to array
        MBFiltList_arr.push(to_MBFiltList);
        
        // update local storage
        setStorage(MBFiltList_arr, 'MBFiltList');
        
        });
        
    });
    
    // show filter list
    viewMBFiltListButton.addEventListener('click', function() {
        
        // gets current list from local storage and displays it as a UL
        chrome.storage.local.get({'MBFiltList':[]}, function (items) { 
        MBFiltList_arr = items['MBFiltList'];

        // add existing list to list in HTML, remove first if exists already
        var filtNames = makeUL(MBFiltList_arr);
        
        // show list
        showList(filtFlag, 'current_MBFiltList', filtNames);
        filtFlag = switchFlag(filtFlag);
        
        // function (jquery) for REMOVING an item from the existing list
        $("#listDisplay li").click(function() {
        var selectedID = this.id; // select item
        MBFiltList_arr.splice(selectedID, 1); // remove it
        // update local storage
        setStorage(MBFiltList_arr, 'MBFiltList');
        });
        
        });
    
    });

});


