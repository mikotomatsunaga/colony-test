function load_more_history(list_id, url) {
    $.ajax({
           type: 'get',
           url: url,
           dataType: 'html',
           headers: {
               'X-Requested-With': 'AJAXHttpRequest'
           },
           success: function(data) {
               $('#' + list_id).append(data);
           },
           error: function(data) {
           }
    });
    return false;
}

function bindClick(holdId, pageHist, page) {

$("#button_more").unbind("click");
$("#button_more").bind("click", function() {
var holdId = $("#holdCountId").val();
var pageHist = $("#pageHist").val();
var page = $("#pageNum").val();
var url  = "history/hold/" + holdId + '/';

if (pageHist == "") {
url = url + pageHist;
}
else {
url = url + pageHist + ',' + page;
}
load_more_history('list', url);
});
}
