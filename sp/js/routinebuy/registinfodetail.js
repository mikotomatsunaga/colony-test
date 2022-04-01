$(function(){
    // 継続延長
    $("[name=btn-delay]").click(function(){
        $('#registInfo').attr('action', 'routinebuy/extensionconfirm');
        $('#registInfo').submit();
    });

    // 取消
    $("[name=btn-disable]").click(function(){
        $('#registInfo').attr('action', 'routinebuy/deleteconfirm');
        $('#registInfo').submit();
    });

    // 戻る(確認画面)
    $('[name=btn-cancel]').click(function(){
        $('#registInfo').attr('action', 'routinebuy/registinfo');
        $('#registInfo').submit();
    });
});