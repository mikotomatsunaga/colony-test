$(document).ready(function() {
    var num = $("input[name='saleMethod']").val();
    // 文字コードの指定を削除
    $('#saleMethodForm').removeAttr('accept-charset');
    if(num==='11') {
        $('#saleMethodForm').attr('action', $("input[name='selfBank']").val());
        $('#saleMethodForm').attr('accept-charset', 'Shift_JIS');
    } else if(num==='12') {
        $('#saleMethodForm').attr('action', 'purchase/jibuncard');
    } else {
        $('#saleMethodForm').attr('action', 'purchase/vote');
    }
    load_wallet_balance_Purchase("wallet_balance", "wallet/pointbalance");
});

$(function() {

    // 簡単入力ボタン
    $("[name=kantanBtn]").click(function(){

        // ボタンID
        var btnId = $(this).attr("id");

        $("body").append('<div id="modal-overlay"></div>');
        $("#modal-overlay").fadeIn("fast");
        centerModal(btnId);
        $("#easy" + btnId + "Modal").fadeIn("slow");
        $("#modal-overlay,.modalCloseBtn").unbind().click(function(){
            $("#easy" + btnId + "Modal,#modal-overlay").fadeOut("slow",function(){
                $('#modal-overlay').remove();
            })
        })
    })

    $(window).resize(centerModal);

    function centerModal(modalId){

        var w = $(window).width();
        var h = $(window).height();

        var cw = $("#easy" + modalId + "Modal").outerWidth({margin:true});
        var ch = $("#easy" + modalId + "Modal").outerHeight({margin:true});
        $("#easy" + modalId + "Modal").css({"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"});

    }

    // BIG 変更
    $("#bigNum").change(function(){
        // 金額集計
        calc_totalMoney();
    })

    // BIG1000 変更
    $("#big1000Num").change(function(){
        // 金額集計
        calc_totalMoney();
    })

    // miniBIG 変更
    $("#miniBigNum").change(function(){
        // 金額集計
        calc_totalMoney();
    })

    // 100円BIG 変更
    $("#y100BigNum").change(function(){
        // 金額集計
        calc_totalMoney();
    })

    // MEGA BIG 変更
    $("#megaBigNum").change(function(){
        // 金額集計
        calc_totalMoney();
    })

    function calc_totalMoney () {

        var bigNum     = $('#bigNum').eq(0).val();
        var big1000Num = $('#big1000Num').eq(0).val();
        var miniBigNum = $('#miniBigNum').eq(0).val();
        var y100BigNum = $('#y100BigNum').eq(0).val();
        var megaBigNum = $('#megaBigNum').eq(0).val();

        var total_amnt = bigNum*300 + big1000Num*200 + miniBigNum*200 + y100BigNum*100 + megaBigNum*300 ;

        // 合計金額適用
        $('#totalMoney').eq(0).text(addFigure(total_amnt));

        // 購入口数(BIG)
        $('#buyNumberBig').eq(0).val(bigNum);
        // 購入口数(BIG1000)
        $('#buyNumberBig1000').eq(0).val(big1000Num);
        // 購入口数(miniBIG)
        $('#buyNumberMiniBig').eq(0).val(miniBigNum);
        // 購入口数(100円BIG)
        $('#buyNumber100Big').eq(0).val(y100BigNum);
        // 購入口数(MEGABIG)
        $('#buyNumberMegaBig').eq(0).val(megaBigNum);
    }

    function addFigure(str) {
        var num = new String(str).replace(/,/g, "");
        while (num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
        return num;
    }

    // 簡単入力エリア(BIG)
    $('#easybigModal a').click(function() {

        // イメージID
        var imgId = $(this).attr("id");

        // BIGの設定
        $('#bigNum').eq(0).val(imgId);
        // 金額集計
        calc_totalMoney();
        // 閉じる
        $('#easybigModal .modalCloseBtn').trigger('click');
    })

    // 簡単入力エリア(MEGABIG)
    $('#easymegaBigModal a').click(function() {

        // イメージID
        var imgId = $(this).attr("id");

        // MEGA BIGのクリア
        $('#megaBigNum').eq(0).val(imgId);
        // 金額集計
        calc_totalMoney();
        // 閉じる
        $('#easymegaBigModal .modalCloseBtn').trigger('click');
    })

    // 簡単入力エリア(100円BIG)
    $('#easy100BigModal a').click(function() {

        // イメージID
        var imgId = $(this).attr("id");

        // BIG1000のクリア
        $('#y100BigNum').eq(0).val(imgId);
        // 金額集計
        calc_totalMoney();
        // 閉じる
        $('#easy100BigModal .modalCloseBtn').trigger('click');
    })

    // 簡単入力エリア(BIG1000)
    $('#easybig1000Modal a').click(function() {

        // イメージID
        var imgId = $(this).attr("id");

        // BIG1000のクリア
        $('#big1000Num').eq(0).val(imgId);
        // 金額集計
        calc_totalMoney();
        // 閉じる
        $('#easybig1000Modal .modalCloseBtn').trigger('click');
    })

    // 簡単入力エリア(miniBIG)
    $('#easyminibigModal a').click(function() {

        // イメージID
        var imgId = $(this).attr("id");

        $('#miniBigNum').eq(0).val(imgId);
        // 金額集計
        calc_totalMoney();
        // 閉じる
        $('#easyminibigModal .modalCloseBtn').trigger('click');
    })

    // keyup()でキーを入力するたびに発動
    $('#pointText').change(function() {
        // 入力ポイント
        var sPointText = $(this).val();
        // 全角を半角に変換
        var sCvnPointText = sPointText.replace(/[０-９]/g,function(s){
            return String.fromCharCode(s.charCodeAt(0)-0xFEE0)
        });

        // 入力ポイント
        var nPointText = Number(sCvnPointText);
        // 所持ポイント
        var nUsepoint = Number($('#useableLtdPoint').val());
        // 合計金額
        var nBuyMoneyTotal = Number($('#buyMoneyTotal').val());

        // 正規表現による判定を行う（半角数値のみ許容）
        var pattern = /^\d*$/;
        if (pattern.test(sCvnPointText) !== true) {
            // ポイント利用にセット
            $('#pointuse').text(0);
            // お支払い金額にセット
            $('#amount').text(nBuyMoneyTotal);
            // ポイント入力欄
            $('#pointText').val(0);
            return null;
        }

        // 入力ポイント=0
        if (nPointText === 0) {
            // 決済時のhidden項目にセット
            $('input:hidden[name="allPoint"]').val(nPointText);
            $('input:hidden[name="pointText"]').val(nPointText);
            // ポイント利用にセット
            $('#pointuse').text(nPointText);
            // お支払い金額にセット
            $('#amount').text(nBuyMoneyTotal);
            // ポイント入力欄
            $('#pointText').val(nPointText);
            // 全額ポイント決済からその他決済に変更した際のラジオボタン活性、非活性の制御を行う
            saleMethodSwitch();
        }
        // 入力ポイント≧保有ポイント≧合計金額の場合、利用ポイントに合計金額分を入れる
        else if (nPointText >= nUsepoint && nUsepoint >= nBuyMoneyTotal) {
            // ポイント入力値のセット共通処理
            setBuyMoneyTotal(nBuyMoneyTotal);
            // 全額ポイント決済時のラジオボタン活性、非活性の制御を行う
            allPointSwitch();

        }
        // 入力ポイント≧合計金額≧保有ポイントの場合、利用ポイントに保有ポイントを入れる
        else if (nPointText >= nBuyMoneyTotal && nBuyMoneyTotal >= nUsepoint) {
            // ポイント入力値のセット共通処理
            setUsepoint(nBuyMoneyTotal, nUsepoint);
            // 全額ポイント決済からその他決済に変更した際のラジオボタン活性、非活性の制御を行う
            saleMethodSwitch();
        }
        // 保有ポイント≧入力ポイント≧合計金額の場合、利用ポイントに合計金額を入れる
        else if (nUsepoint >= nPointText && nPointText >= nBuyMoneyTotal) {
            // ポイント入力値のセット共通処理
            setBuyMoneyTotal(nBuyMoneyTotal);
            // 全額ポイント決済時のラジオボタン活性、非活性の制御を行う
            allPointSwitch();
        }
        // 保有ポイント≧合計金額≧入力ポイントの場合、利用ポイントに入力ポイントを入れる
        else if (nUsepoint >= nBuyMoneyTotal && nBuyMoneyTotal >= nPointText) {
            // ポイント入力値のセット共通処理
            setUsepoint(nBuyMoneyTotal, nPointText);
            // 全額ポイント決済からその他決済に変更した際のラジオボタン活性、非活性の制御を行う
            saleMethodSwitch();
        }
        // 合計金額≧入力ポイント≧保有ポイントの場合、利用ポイントに保有ポイントを入れる
        else if (nBuyMoneyTotal >= nPointText && nPointText >= nUsepoint) {
            // ポイント入力値のセット共通処理
            setUsepoint(nBuyMoneyTotal, nUsepoint);
            // 全額ポイント決済からその他決済に変更した際のラジオボタン活性、非活性の制御を行う
            saleMethodSwitch();
        }
        // 合計金額≧保有ポイント≧入力ポイントの場合、利用ポイントに入力ポイントを入れる
        else if (nBuyMoneyTotal >= nUsepoint && nUsepoint >= nPointText) {
            // ポイント入力値のセット共通処理
            setUsepoint(nBuyMoneyTotal, nPointText);
            // 全額ポイント決済からその他決済に変更した際のラジオボタン活性、非活性の制御を行う
            saleMethodSwitch();
        }
    });
})

function setBuyMoneyTotal(nBuyMoneyTotal) {
    // string型に変換して三桁ずつに区切る
    var sBuyMoneyTotal = String(nBuyMoneyTotal).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
    // 決済時のhidden項目にセット
    $('input:hidden[name="allPoint"]').val(nBuyMoneyTotal);
    $('input:hidden[name="pointText"]').val(nBuyMoneyTotal);
    // ポイント利用にセット
    $('#pointuse').text('-' + sBuyMoneyTotal);
    // お支払い金額にセット
    $('#amount').text(0);
    // ポイント入力欄
    $('#pointText').val(nBuyMoneyTotal);
}

function setUsepoint(nBuyMoneyTotal, nPoint) {
    // お支払い金額の初期値
    var nAmount = 0;
    // string型の初期値
    var sAmount = '';
    // string型に変換して三桁ずつに区切る
    var sPoint = String(nPoint).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
    // お支払い金額を計算
    nAmount = nBuyMoneyTotal - nPoint;
    // string型に変換して三桁ずつに区切る
    sAmount = String(nAmount).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
    // 決済時のhidden項目にセット
    $('input:hidden[name="allPoint"]').val(nPoint);
    $('input:hidden[name="pointText"]').val(nPoint);
    if (nPoint===0) {
        // ポイント利用にセット
        $('#pointuse').text(sPoint);
    } else {
        // ポイント利用にセット
        $('#pointuse').text('-' + sPoint);
    }
    // お支払い金額にセット
    $('#amount').text(sAmount);
    // ポイント入力欄
    $('#pointText').val(nPoint);
}

function allPointSwitch () {
    // ボタンを活性状態にする
    $('#saleMethodForm').attr('action', 'purchase/vote');
    $('#saleMethodForm').removeAttr('accept-charset');
    $("input[name='saleMethod']").val('15');
    $("input[name='btnVoting']").val('全額ポイント決済');
    $("input[name='aw']").val('');
    // au かんたん決済（au PAY 残高支払い）
    var auWalletFlag = $('#auWalletFlag').val();
    // au かんたん決済（通信料合算支払い）
    var auEasyFlag = $('#auEasyFlag').val();
    // じぶん銀行決済
    var jibunFlag = $('#jibunFlag').val();
    // au WALLET クレジットカード
    var jibunCardFlag = $('#jibunCardFlag').val();
    var bjibunCardMethodFlag = $('#bJibunCardMethodFlag').val();
    // au かんたん決済（au PAY 残高支払い）
    if (auWalletFlag!='1') {
        //ボタンを活性状態にする
        $('#selRadioMethod1').html('<input type="radio" name="selRadioMethod" onclick="changePo(\'14\')" disabled value="14"><label style="color:gray">au かんたん決済（au PAY 残高支払い）</label>');
    }
    // au かんたん決済（通信料合算支払い）
    if (auEasyFlag=='1') {
        // ボタンを活性状態にする
        $('#selRadioMethod2').html('<input type="radio" name="selRadioMethod" onclick="changePo(\'10\')" disabled value="10"><label style="color:gray">au かんたん決済（通信料合算支払い）</label>');
    }
    // じぶん銀行判定
    if (jibunFlag=='1') {
        // ボタンを活性状態にする
        $('#selRadioMethod3').html('<input type="radio" name="selRadioMethod" onclick="changePo(\'11\')" disabled value="11"><label style="color:gray">じぶん銀行決済</label>');
    }
    // au WALLET クレジットカード
    if (jibunCardFlag=='1' && bjibunCardMethodFlag=='1') {
        // ボタンを活性状態にする
        $('#selRadioMethod4').html('<input type="radio" name="selRadioMethod" onclick="changePo(\'12\')" disabled value="12"><label style="color:gray">クレジットカード決済</label>');
    }
    // 全ての決済が利用できない場合、ボタン活性化
    if (auWalletFlag=='1' && auEasyFlag!='1' && jibunFlag!='1' && (jibunCardFlag!='1' || bjibunCardMethodFlag!='1')) {
        // 購入するボタン活性化
        $('#btnSwitch').html('<a class="btn btn-primary btn-xs" onclick="purchaseBtnClick(\'big\')">購入する</a>');
    }
}

function saleMethodSwitch () {
    // 選択していた決済方法を取得
    var radioMethod = $('input:hidden[name="radioMethod"]').val();
    // au かんたん決済（au PAY 残高支払い）
    var auWalletFlag = $('#auWalletFlag').val();
    // au かんたん決済（通信料合算支払い）
    var auEasyFlag = $('#auEasyFlag').val();
    // じぶん銀行決済
    var jibunFlag = $('#jibunFlag').val();
    // au WALLET クレジットカード
    var jibunCardFlag = $('#jibunCardFlag').val();
    var bjibunCardMethodFlag = $('#bJibunCardMethodFlag').val();
    // 文字コードの指定を削除
    $('#saleMethodForm').removeAttr('accept-charset');
    // au かんたん決済（au PAY 残高支払い）
    if (auWalletFlag!='1') {
        // ボタンを活性状態にする
        $('#selRadioMethod1').html('<input type="radio" name="selRadioMethod" onclick="changePo(\'14\')" value="14"><label>au かんたん決済（au PAY 残高支払い）</label>');
        if (radioMethod=='14') {
            //ボタンを活性状態にし、チェック状態にする
            $('#saleMethodForm').attr('action', 'purchase/vote');
            $("input[name='saleMethod']").val('14');
            $("input[name='btnVoting']").val('auWALLETプリペイドカード');
            $("input[name='aw']").val('1');
            $('input[name=selRadioMethod]').val(['14']);
        }
    }
    // au かんたん決済（通信料合算支払い）
    if (auEasyFlag=='1') {
        // ボタンを活性状態にする
        $('#selRadioMethod2').html('<input type="radio" name="selRadioMethod" onclick="changePo(\'10\')" value="10"><label>au かんたん決済（通信料合算支払い）</label>');
        if (radioMethod=='10') {
            // ボタンを活性状態にし、チェック状態にする
            $('#saleMethodForm').attr('action', 'purchase/vote');
            $("input[name='saleMethod']").val('10');
            $("input[name='btnVoting']").val('auかんたん決済');
            $("input[name='aw']").val('0');$('#selRadioMethod2').html('<input type="radio" name="selRadioMethod" onclick="changePo(\'10\')" checked value="10"><label>au かんたん決済（通信料合算支払い）</label>');
            $('input[name=selRadioMethod]').val(['10']);
        }
    }
    // じぶん銀行判定
    if (jibunFlag=='1') {
        // ボタンを活性状態にする
        $('#selRadioMethod3').html('<input type="radio" name="selRadioMethod" onclick="changePo(\'11\')" value="11"><label>じぶん銀行決済</label>');
        if (radioMethod=='11') {
            // ボタンを活性状態にし、チェック状態にする
            $('#saleMethodForm').attr('action', $("input[name='selfBank']").val());
            $('#saleMethodForm').attr('accept-charset', 'Shift_JIS');
            $("input[name='saleMethod']").val('11');
            $("input[name='btnVoting']").val('じぶん銀行決済');
            $("input[name='aw']").val('');
            $('input[name=selRadioMethod]').val(['11']);
        }
    }
    // au WALLET クレジットカード
    if (jibunCardFlag=='1' && bjibunCardMethodFlag=='1') {
        // ボタンを活性状態にする
        $('#selRadioMethod4').html('<input type="radio" name="selRadioMethod" onclick="changePo(\'12\')" value="12"><label>クレジットカード決済</label>');
        if (radioMethod=='12') {
            // ボタンを活性状態にし、チェック状態にする
            $('#saleMethodForm').attr('action', 'purchasetoto/jibuncard');
            $("input[name='saleMethod']").val('12');
            $("input[name='btnVoting']").val('クレジットカード決済');
            $("input[name='aw']").val('');
            $('input[name=selRadioMethod]').val(['12']);
        }
    }
    // 全ての決済が利用できない場合、ボタン活性化
    if (auWalletFlag=='1' && auEasyFlag!='1' && jibunFlag!='1' && (jibunCardFlag!='1' || bjibunCardMethodFlag!='1')) {
        // 購入するボタン活性化
        $('#btnSwitch').html('<div class="btn btn-disable btn-xs" disabled="disabled">購入する</div>');
    }
}

function changeBg(n) {
    // くじの合計金額を取得
    var nBuyMoneyTotal = Number($("#buyMoneyTotal").val());
    // ポイント入力欄を取得
    var nPointText = Number($("#pointText").val());
    // ラジオボタンの値セット
    $('input:hidden[name="radioPoint"]').val(n);
    // string型に変換して三桁ずつに区切る
    var sBuyMoneyTotal = String(nBuyMoneyTotal).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
    if(n==='1') {
        // 決済時のhidden項目にセット
        $('input:hidden[name="allPoint"]').val(0);
        $('input:hidden[name="pointText"]').val(nPointText);
        // ポイント利用にセット
        $('#pointuse').text(0);
        // お支払い金額にセット
        $('#amount').text(sBuyMoneyTotal);
        // テキストボックス非活性
        $('#pointText').prop('disabled', true);
        // 全額ポイント決済からその他決済に変更した際のラジオボタン活性、非活性の制御を行う
        saleMethodSwitch();
    } else if(n==='2') {
        // テキストボックス非活性
        $('#pointText').prop('disabled', false);
        // 入力ポイント≧合計金額 の場合、利用ポイント＝合計金額
        if (nPointText >= nBuyMoneyTotal) {
            // ポイント入力値のセット共通処理
            setBuyMoneyTotal(nBuyMoneyTotal);
            // 全額ポイント決済時のラジオボタン活性、非活性の制御を行う
            allPointSwitch();
        }
        // 合計金額≧入力ポイントの場合、利用ポイント＝保有ポイント
        else if (nBuyMoneyTotal >= nPointText) {
            // ポイント入力値のセット共通処理
            setUsepoint(nBuyMoneyTotal, nPointText);
            // 全額ポイント決済からその他決済に変更した際のラジオボタン活性、非活性の制御を行う
            saleMethodSwitch();
        }
    } else if(n==='3') {
        // 所持ポイント
        var nUsepoint = Number($('#useableLtdPoint').val());
        // 保有ポイント≧合計金額 の場合、利用ポイント＝合計金額
        if (nUsepoint >= nBuyMoneyTotal) {
            // テキストボックス非活性
            $('#pointText').prop('disabled', true);
            // 決済時のhidden項目にセット
            $('input:hidden[name="allPoint"]').val(nBuyMoneyTotal);
            $('input:hidden[name="pointText"]').val(nBuyMoneyTotal);
            // ポイント利用にセット
            $('#pointuse').text('-' + sBuyMoneyTotal);
            // お支払い金額にセット
            $('#amount').text(0);
            // 全額ポイント決済時のラジオボタン活性、非活性の制御を行う
            allPointSwitch();
        }
        // 合計金額≧保有ポイントの場合、利用ポイント＝保有ポイント
        else if (nBuyMoneyTotal >= nUsepoint) {
            // テキストボックス非活性
            $('#pointText').prop('disabled', true);
            // お支払い金額の初期値
            var nAmount = 0;
            // string型の初期値
            var sAmount = '';
            // string型に変換して三桁ずつに区切る
            var sUsepoint = String(nUsepoint).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
            // お支払い金額を計算
            nAmount = nBuyMoneyTotal - nUsepoint;
            // string型に変換して三桁ずつに区切る
            sAmount = String(nAmount).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
            // 決済時のhidden項目にセット
            $('input:hidden[name="allPoint"]').val(nUsepoint);
            $('input:hidden[name="pointText"]').val(nUsepoint);
            if (nUsepoint===0) {
                // ポイント利用にセット
                $('#pointuse').text(sUsepoint);
            } else {
                // ポイント利用にセット
                $('#pointuse').text('-' + sUsepoint);
            }
            // お支払い金額にセット
            $('#amount').text(sAmount);
            // 全額ポイント決済からその他決済に変更した際のラジオボタン活性、非活性の制御を行う
            saleMethodSwitch();
        }
    }
}

function changePo(num) {
    // ラジオボタンの値セット
    $('input:hidden[name="radioMethod"]').val(num);
    $("input[name='saleMethod']").val(num);
    // 文字コードの指定を削除
    $('#saleMethodForm').removeAttr('accept-charset');
    if(num==='14') {
        // ボタンを活性状態にする
        $('#saleMethodForm').attr('action', 'purchase/vote');
        $("input[name='btnVoting']").val('auWALLETプリペイドカード');
        $("input[name='aw']").val('1');
    } else if(num==='10') {
        // ボタンを活性状態にする
        $('#saleMethodForm').attr('action', 'purchase/vote');
        $("input[name='btnVoting']").val('auかんたん決済');
        $("input[name='aw']").val('0');
    } else if(num==='11') {
        // ボタンを活性状態にする
        $('#saleMethodForm').attr('action', $("input[name='selfBank']").val());
        $('#saleMethodForm').attr('accept-charset', 'Shift_JIS');
        $("input[name='btnVoting']").val('じぶん銀行決済');
        $("input[name='aw']").val('');
    } else {
        // ボタンを活性状態にする
        $('#saleMethodForm').attr('action', 'purchase/jibuncard');
        $("input[name='btnVoting']").val('クレジットカード決済');
        $("input[name='aw']").val('');
    }
}