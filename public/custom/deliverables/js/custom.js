

// load more js 



$(function () {
    $("div").slice(0, 10).show();
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $("div:hidden").slice(0, 6).slideDown();
        if ($("div:hidden").length == 0) {
            $("#load").fadeOut('slow');
        }
       
    });
});









