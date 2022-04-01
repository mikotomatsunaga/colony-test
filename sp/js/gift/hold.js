$(function(){
    $('.more').click(function(){
        $('#pageForm').submit();
    });
    
    $('.detailBtn').click(function(){
         var id = $(this).attr('id');
         $('#' + id).submit();
    });
}); 