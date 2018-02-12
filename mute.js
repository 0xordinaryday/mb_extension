chrome.storage.local.get({'MBFiltList':['No names']}, function (items) {
    filter_array = (items["MBFiltList"]);

    $('div').each(function() {
        if ($(this).attr('class') == 'comment-content') {
        var myHTML = this;
        var author = '';
            $(myHTML).find('cite').each(function() {
                author = $(this).text();
                if (filter_array.indexOf(author) != -1) {
                    // $(this).parent().parent().parent().parent().hide();
                    $(this).parent().parent().parent().parent().text("[Comment Muted]").css({"font-weight": "bold", "color":"red"});;
                }
            });
        };        
    });
   
});