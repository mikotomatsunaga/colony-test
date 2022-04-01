$(function(){
    // 取消
    $('#delete').click(function(){
        $('#registInfo').attr('action', 'routinebuy/deletecomplete');
        $('#registInfo').submit();
    });

    // 戻る(詳細)
    $('#detail').click(function(){
        $('#registInfo').attr('action', 'routinebuy/registinfodetail');
        $('#registInfo').submit();
    });
});
