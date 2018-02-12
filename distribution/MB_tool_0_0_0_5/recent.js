/* Change notes
changed time from very granular (HH:MM:SS) to more general (H, M, or S)
corrected behaviour where username is also a link
corrected timezone offset - away from hardcoded for eastern Australia
pluralise time only when appropriate
added highlight functionality for favourite commentators
*/

$(function() {

    function loadcssfile(filename, filetype){
        if (filetype=="css"){ //if filename is an external CSS file
            var fileref=document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
        }
    }
    
    loadcssfile("mb_ext.css", "css"); ////dynamically load and add this .css file
    
    // create object to hold comments
    var comments = {};
    
    $('div').each(function() {
        if ($(this).attr('class') == 'comment-content') {
            // console.log(this) // debug
            // make variables to hold various parameters
            var myHTML = this;
            var key = '';
            var author = '';
            var content = '';
            var trunc = '';
            $(myHTML).find('time').each(function() {
                var cTime = $(this).attr('datetime');
                var commentTime = new Date(cTime);
                var compareTime = Math.floor(commentTime / 1000);
                // new function
                var saltedKey = saltKey(compareTime);
                key = saltedKey[0];
                salt = saltedKey[1];
            });
            // contribution by Nicholas Rayner - works great!
            myValue = $(this).find(".comment-author .author-meta .comment-time a").attr('href');
            //
            $(myHTML).find('p:first').each(function() {
                content = $(this).text();
                trunc = content.substring(0, 50) + ' ...';
            });
            $(myHTML).find('cite').each(function() {
                author = $(this).text();
                comments[key] = {
                    myName: author,
                    myLink: myValue,
                    mySummary: trunc,
                    saltVal: salt};
            });
        }
    });
    
    // function to salt key (time) with random number, returns salted key and salt
    function saltKey(compareTime) {
        var keyString = compareTime.toString();
        var salt = Math.floor((Math.random() * 10000) + 1);
        var saltString = '_' + salt.toString();
        return new Array((keyString+saltString), saltString)
    }

    // object keys are time values, put these into an array and reverse sort them
    var keyArr = [];
    keyArr = Object.keys(comments);
    keyArr.sort();
    // sorting still works with salt added - yay JavaScript!
    keyArr.reverse();
    
    // create time variables and correct for timezone offsets
    var tempDate = new Date();
    var offsetMinutes = tempDate.getTimezoneOffset();
    var offsetSeconds = offsetMinutes * 60 * -1;
    var timeNow = Math.floor(Date.now() / 1000) + offsetSeconds;
    var elapsed_time = 0;
    
    // create a div to hold the comment data
    function create_container($) {
        
    // set body to relative - may not be necessary
    document.body.style.position = "relative";
    
    var d = document.createElement('div');
    $(d).css({
        "background-color": "#ffffff",
        "border": "1px solid #000000",
        "font-size": "small",
        "padding": "2px",
        "position": "fixed",
        "right": "0",
        "top": "0",
        "bottom": "0",
        "overflow": "scroll",
        "zIndex": "100000",
        "display": "none",
    }).attr('id', 'container');
    $(d).prependTo($("body"));
    
    }
    
    // remove container
    $('#container').remove();
    // create it again - need this to control toggleSlide bouncing
    create_container($);
        
    // a function to append the content, which is the comment data
    // welcome to callback hell, leave your coat at the door
    function append_content() {
        
        var longString = ''; // need ALL comments in one div for toggleSlide function
        
        chrome.storage.local.get({'MBFavList':['No names']}, function (items) {
            name_array = (items["MBFavList"]);
            
            chrome.storage.local.get({'MBFiltList':['No names']}, function (items) {
                filter_array = (items["MBFiltList"]);

                // add heading to container div
                $('#container').append( '<div class="container">' );
                
                // add content
                $('#container').append( "<div class='header'><span style='font-weight: bold'>< ></span></div>" );
                
                for(var i = 0; i < keyArr.length; i++) {
                    myKey = keyArr[i];
                    elapsed_time = timeNow - parseInt(myKey); // parseInt drops the salt!
                    timeString = calc_time(elapsed_time);
                    var properties = comments[myKey];
                    var author_name = properties["myName"];
                    if (name_array.indexOf(author_name) != -1) {
                        author_name = "<span style='color:fuchsia;font-weight:bold'>"+author_name+"</span>";
                    } // highlight author
                    var c_preview = properties["mySummary"];
                    var c_link = properties["myLink"];
                    if (filter_array.indexOf(author_name) == -1) { // filter author
                        longString = longString + "<a href="+'"'+c_link+'"'+"> Comment by: \
                        "+author_name+"</a><br>"+timeString+"<p>"+c_preview+"</p>";
                    }
                }
                
                $('#container').append( "<div id='myContent'>"+longString+"</div>" );
            });
        });
    }
    
    function pluralise(time)
    {
        var plural;
        
        if(time > 1)
            plural = 's';
        else
            plural = '';
        
        return plural;
    }
    
    function calc_time(timeval) {
        
        if (timeval >= 86400) 
        {
            var days = Math.floor(timeval/86400);
            return days + ' Day' + pluralise(days) + ' ago';
        }
        
        else if(timeval >= 3600)
        {
            var hours = Math.floor(timeval/3600);
            return hours + ' Hour' + pluralise(hours) + ' ago';
        }
        else if(timeval > 60)
        {
            var minutes = Math.floor(timeval/60);
            return minutes + ' Minute' + pluralise(minutes) + ' ago';
        }
        else
        {
            return timeval + ' Second' + pluralise(timeval) + ' ago';
        }
    } 
    
    // call append function
    append_content();
    
    $('#container').fadeIn('fast');
    // $('#myContent').css("display", "none"); // start closed
    
    // make the new div collapsable - using the jQuery toggleSlide function 
    
    // $(".header").click(function () {
    $('#container').click(function () {

        $content = $('#myContent') // $header.next();
        // open up the content needed - toggle the slide - if visible, slide up, if not slidedown.
        $content.stop(); // fix bouncing effect
        $content.slideToggle(100, function () {
            //execute this after slideToggle is done
            //change text of header based on visibility of content div
            $('.header').text(function () {
                //change text based on condition
                return $content.is(":visible") ? ">>" : "<<";
            });
        });
    
    });

});