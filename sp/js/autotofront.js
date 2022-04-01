function load_more(btn_id, list_id, url) {
    $.ajax({
        type: 'get',
        url: url,
        dataType: 'html',
        headers: {
            'X-Requested-With': 'AJAXHttpRequest'
        },
        success: function(data) {
            $('#' + btn_id).remove();
            $('#' + list_id).append(data);
        },
        error: function(data) {
        }
    });
    return false;
}

function load_wallet_balance(target_id, url) {

    $.ajax({
        type: 'get',
        url: url,
        dataType: 'html',
        cache: false,
        timeout: 10000,
        headers: {
            'X-Requested-With': 'AJAXHttpRequest'
        },
        success: function(data) {
            $('#' + target_id).html(data);
            if (data === '') {
                $('#' + target_id).removeAttr('style');
            }
        },
        error: function(data) {
            $('#' + target_id).hide();
        }
    });

}

function load_wallet_balance_Purchase(target_id, url) {
    $.ajax({
        type: 'get',
        url: url,
        dataType: 'html',
        cache: false,
        timeout: 10000,
        data: { purchaseSwitch : 'Purchase' },
        headers: {
            'X-Requested-With': 'AJAXHttpRequest'
        },
        success: function(data) {
            $('#' + target_id).html(data);
            if (data === '') {
                $('#' + target_id).removeAttr('style');
            }
        },
        error: function(data) {
            $('#' + target_id).hide();
        }
    });

}

$(function(){
    $('a[href^=#]').click(function() {
        var speed = 400;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
    });
});