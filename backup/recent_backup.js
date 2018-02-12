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
                trunc = content.substring(0, 30) + ' ...';
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
console.log(keyArr);   

console.log(comments);
 
var timeNow = Math.floor(Date.now() / 1000) + 36000;
var elapsed_time = 0

for(var i = 0; i < keyArr.length; i++) {
    myKey = keyArr[i];
    elapsed_time = timeNow - parseInt(myKey);
    var properties = comments.myLink.myKey;
    console.log(elapsed_time, properties)
    }



// create a div to hold the comment data
function create_container($) {
    
  // set body to relative
  document.body.style.position = "relative";

  var d = document.createElement('div');
  $(d).css({
	"background-color": "#C0C0C0",
	"opacity": "0.9",
    "border": "1px solid #000000",
    "padding": "2px",
    "position": "fixed",
    "right": "0",
    "zIndex": "100000",
  }).attr('id', 'container');
  $(d).prependTo($("body"));

}

// console.log("something happened"); // debug

if($('#container').length === 0) {
  create_container($);
}


// a function to append the content, which is the comment data
function append_content() {
    // add heading to container div
    $('#container').append( '<div class="container">' );
    
    // add dummy content
    $('#container').append( "<div class='header'><span>Recent Comments Expand</span> \
     </div> <div class='content'> \
     <div> \
     </div> </div>" );
}

// call append function
append_content();

$('#container').fadeIn('fast');

// make it collapsable

$(".header").click(function () {

    $header = $(this);
    //getting the next element
    $content = $header.next();
    //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
    $content.slideToggle(500, function () {
        //execute this after slideToggle is done
        //change text of header based on visibility of content div
        $header.text(function () {
            //change text based on condition
            return $content.is(":visible") ? "Recent Comments Collapse" : "Recent Comments Expand";
        });
    });

});

