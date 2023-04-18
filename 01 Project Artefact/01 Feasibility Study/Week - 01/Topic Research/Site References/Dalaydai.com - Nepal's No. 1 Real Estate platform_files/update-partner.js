
function swapImages() {
    var $active = $('#myGallery .active');

    var $next = ($('#myGallery .active').next().length > 0) ? $('#myGallery .active').next() : $('#myGallery img:first');

    $.ajax({
        url: "/property/update-views/",
        data: {
            'partner_id': $next.attr('parter-id')
        },
        dataType: 'json',
        success: function (data) {
        }
    });

    $active.fadeOut(function () {
        $active.removeClass('active');
        $next.fadeIn().addClass('active');
    });
}

$(document).ready(function () {
    var $active = $('#myGallery .active');
    $.ajax({
        url: "/property/update-views/",
        data: {
            'partner_id': $active.attr('parter-id')
        },
        dataType: 'json',
        success: function (data) {
        }
    });
    setInterval('swapImages()', 10000);
});

$("#myGallery img").on("click", function () {
    $.ajax({
        url: "/property/update-clicks/",
        data: {
            'partner_id': $(this).attr('parter-id')
        },
        dataType: 'json',
        success: function (data) {
        }
    });
    window.open($(this).attr("partner-url"), '_blank').focus();
});