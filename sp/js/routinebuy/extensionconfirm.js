$(function(){
    // 継続延長
    $('.extension').click(function(){
        $('#registInfo').attr('action', 'routinebuy/extensioncomplete');
        $('#registInfo').submit();
    });

    // 戻る(詳細)
    $('.detail').click(function(){
        $('#registInfo').attr('action', 'routinebuy/registinfodetail');
        $('#registInfo').submit();
    });
});
