$(function(){
    // 継続延長
    $('[name=extension]').click(function(){
        $('#' + $(this).attr('id')).attr('action', 'routinebuy/extensionconfirm');
        $('#' + $(this).attr('id')).submit();
    });

    // 詳細
    $("[name=btn-detail]").click(function(){
        $('#' + $(this).attr('id')).attr('action', 'routinebuy/registinfodetail');
        $('#' + $(this).attr('id')).submit();
    });
});
