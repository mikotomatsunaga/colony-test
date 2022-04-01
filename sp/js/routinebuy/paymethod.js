$(function(){
    $('.submitBtn').click(function(){
        $('#saleMethod').val($(this).attr('id'));
        $('#registcompleteForm').attr('action',$(this).attr('name'));
        $('#registcompleteForm').submit();
    });
});
