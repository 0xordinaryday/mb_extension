$(function() {

    function loadcssfile(filename, filetype){
        if (filetype=="css"){ //if filename is an external CSS file
            var fileref=document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("type", "text/css")
            fileref.setAttribute("href", filename)
        }
    }
    
    loadcssfile("mb_ext.css", "css") ////dynamically load and add this .css file
    
    // create object to hold comments
    var comments = {};
    
    $('div').each(function() {
        var timeNow = Math.floor(Date.now() / 1000); // get current time - add 36000
            if ($(this).attr('class') == 'comment-content') {
                // console.log(this)
                // make variables to hold various parameters
                var myHTML = this;
                var key = '';
                var value = '';
                var author = '';
                var content = '';
                var trunc = '';
                $(myHTML).find('time').each(function() {
                    var cTime = $(this).attr('datetime');
                    var commentTime = new Date(cTime);
                    var compareTime = Math.floor(commentTime / 1000);
                    key = compareTime;
                });
                $(myHTML).find('a:first').each(function() {
                    myValue = $(this).attr('href');
                    comments[key] = {value};
                });
                $(myHTML).find('p:first').each(function() {
                    content = $(this).text();
                    trunc = content.substring(0, 50) + ' ...';
                });
                $(myHTML).find('cite').each(function() {
                    author = $(this).text();
                    comments[key] = {
                        myName: author,
                        myLink: myValue,
                        mySummary: trunc};
                });
            }
    });
    
    var keyArr = [];
    keyArr = Object.keys(comments);
    keyArr.sort();
    keyArr.reverse();
    // console.log(keyArr);   
    
    // console.log(comments);
    
    var timeNow = Math.floor(Date.now() / 1000) + 36000;
    var elapsed_time = 0
    
    // create a div to hold the comment data
    function create_container($) {
        
    // set body to relative
    document.body.style.position = "relative";
    
    var d = document.createElement('div');
    $(d).css({
        "background-color": "#C0C0C0",
        "border": "1px solid #000000",
        "font-size": "small",
        "padding": "2px",
        "position": "fixed",
        "right": "0",
        "top": "0",
        "bottom": "0",
        "overflow": "scroll",
        "zIndex": "100000",
    }).attr('id', 'container');
    $(d).prependTo($("body"));
    
    }
    
    // console.log("something happened"); // debug
    
    // remove container
    $('#container').remove();
    // create it again
    create_container($);
        
    // a function to append the content, which is the comment data
    function append_content() {
        
        var longString = '';
        
        // add heading to container div
        $('#container').append( '<div class="container">' );
        
    
        
        // add content
        $('#container').append( "<div class='header'><span style='font-weight: bold'>Collapse Recent Comments</span></div>" )
        
        for(var i = 0; i < keyArr.length; i++) {
            myKey = keyArr[i];
            elapsed_time = timeNow - parseInt(myKey);
            timeString = calc_time(elapsed_time);
            var properties = comments[myKey];
            var c_author = properties["myName"];
            var c_preview = properties["mySummary"];
            var c_link = properties["myLink"];
            longString = longString + "<a href="+'"'+c_link+'"'+"> Comment by: "+c_author+"</a><br>"+timeString+"<p>"+c_preview+"</p>";
            // console.log(elapsed_time, c_author, c_preview, c_link)
        }
        
        $('#container').append( "<div id='myContent'>"+longString+"</div>" )
    }
    
    function calc_time(timeval) {
    
        if(timeval < 60) {
            if (timeval < 10) {var secString = '0'+String(timeval)}
            else {var secString = String(timeval)}
            return '00:00:' + secString + ' seconds ago.'
        }
        else if (timeval < 3600) {
            var minutes = Math.floor(timeval/60)
            if (minutes < 10) {var minString = '0'+String(minutes)}
            else {var minString = String(minutes)}
            var seconds = timeval - (minutes*60)
            if (seconds < 10) {var secString = '0'+String(seconds)}
            else {var secString = String(seconds)}
            return '00:' + minString + ':' + secString + ' minutes ago.'
        }
        else {
            var hours = Math.floor(timeval/3600);
            if (hours < 10) {var hourString = '0'+String(hours)}
            else {var hourString = String(hours)}
            var minutes = Math.floor((timeval - hours*3600)/60)
            if (minutes < 10) {var minString = '0'+String(minutes)}
            else {var minString = String(minutes)}
            var seconds = timeval - (minutes*60) - (hours*3600)
            if (seconds < 10) {var secString = '0'+String(seconds)}
            else {var secString = String(seconds)}
            return hourString + ':' + minString + ':' + secString + ' hours ago.'
        }
    
    }
    
    // call append function
    append_content();
    
    $('#container').fadeIn('fast');
    
    // make it collapsable
    
    $(".header").click(function () {
    
        $header = $(this);
        //getting the next element
        $content = $header.next();
        //open up the content needed - toggle the slide - if visible, slide up, if not slidedown.
        $content.stop(); // fix bouncing effect
        $content.slideToggle(500, function () {
            //execute this after slideToggle is done
            //change text of header based on visibility of content div
            $header.text(function () {
                //change text based on condition
                return $content.is(":visible") ? "Collapse Recent Comments" : "Expand Recent Comments";
            });
        });
    
    });

});