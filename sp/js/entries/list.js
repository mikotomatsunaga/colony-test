$(function(){
    $('#more').click(function(){
        $('#pageForm').submit();
    });

    $('a:contains("詳細を見る")').click(function(){
         $(this).parent().submit();
    });
});