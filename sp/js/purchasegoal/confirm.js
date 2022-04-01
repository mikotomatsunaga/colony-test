$(document).ready(function() {
    var num = $("input[name='saleMethod']").val();
    // 文字コードの指定を削除
    $('#saleMethodForm').removeAttr('accept-charset');
    if(num==='11') {
        $('#saleMethodForm').attr('action', $("input[name='selfBank']").val());
        $('#saleMethodForm').attr('accept-charset', 'Shift_JIS');
    } else if(num==='12') {
        $('#saleMethodForm').attr('action', 'purchasetoto/jibuncard');
    } else {
        $('#saleMethodForm').attr('action', 'purchasetoto/vote/toto');
    }

    load_wallet_balance_Purchase("wallet_balance", "wallet/pointbalance");
});
