$(function(){
    isChecked();
    $('#agreeChk').change(function(){
        isChecked();
    });

    $('#PayMethodBtn').click(function(){
        if($('#PayMethodBtn').attr("disabled") == "true" ){
            return false;
        }
        $('#payMethodForm').submit();
        return true;
    });
});

function isChecked(){
    if($('#agreeChk').attr('checked')) {
        $('#payment_on').show();
        $('#payment_off').hide();
    } else {
        $('#payment_off').show();
        $('#payment_on').hide();
    }
}
