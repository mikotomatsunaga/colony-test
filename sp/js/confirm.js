$(document).ready( function() {
    document.getElementById('caution_offon').style.display = 'none';
    document.getElementById('confirmHold_offon').style.display = 'none';
});

$(function() {
    // keyup()でキーを入力するたびに発動
    $('#pointTextToto').change(function() {
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
            $('#pointTextToto').val(0);
            return null;
        }

        // 入力ポイント=0
        if (nPointText === 0) {
            // 決済時のhidden項目にセット
            $('input:hidden[name="allPoint"]').val(nPointText);
            $('input:hidden[name="pointTextToto"]').val(nPointText);
            // ポイント利用にセット
            $('#pointuse').text(nPointText);
            // お支払い金額にセット
            $('#amount').text(nBuyMoneyTotal);
            // ポイント入力欄
            $('#pointTextToto').val(nPointText);
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

function viewCaution() {
    var flg = document.getElementById('caution_offon').style.display;
    if(flg=="none") {
        document.getElementById('caution_offon').style.display = 'block';
        $(".plus_minus").css({"background-position": "0 -23px"});
    } else {
        document.getElementById('caution_offon').style.display = 'none';
        $(".plus_minus").css({"background-position": "0 0"});
    }
}

function viewConfirmHold() {
    var flg = document.getElementById('confirmHold_offon').style.display;
    if(flg=="none") {
        document.getElementById('confirmHold_offon').style.display = 'block';
        $(".confirm_plus_minus").css({"background-position": "0 -23px"});
    } else {
        document.getElementById('confirmHold_offon').style.display = 'none';
        $(".confirm_plus_minus").css({"background-position": "0 0"});
    }
}

function setBuyMoneyTotal(nBuyMoneyTotal) {
    // string型に変換して三桁ずつに区切る
    var sBuyMoneyTotal = String(nBuyMoneyTotal).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
    // 決済時のhidden項目にセット
    $('input:hidden[name="allPoint"]').val(nBuyMoneyTotal);
    $('input:hidden[name="pointTextToto"]').val(nBuyMoneyTotal);
    // ポイント利用にセット
    $('#pointuse').text('-' + sBuyMoneyTotal);
    // お支払い金額にセット
    $('#amount').text(0);
    // ポイント入力欄
    $('#pointTextToto').val(nBuyMoneyTotal);
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
    $('input:hidden[name="pointTextToto"]').val(nPoint);
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
    $('#pointTextToto').val(nPoint);
}

function allPointSwitch () {
    // ボタンを活性状態にする
    $('#saleMethodForm').attr('action', 'purchasetoto/vote/toto');
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
    // au かんたん決済（au PAY 残高支払い）
    if (auWalletFlag!='1') {
        // ボタンを活性状態にする
        $('#selRadioMethod1').html('<input type="radio" name="selRadioMethod" onclick="changePoToto(\'14\')" disabled value="14"><label style="color:gray">au かんたん決済（au PAY 残高支払い）</label>');
    }
    // au かんたん決済（通信料合算支払い）
    if (auEasyFlag=='1') {
        // ボタンを活性状態にする
        $('#selRadioMethod2').html('<input type="radio" name="selRadioMethod" onclick="changePoToto(\'10\')" disabled value="10"><label style="color:gray">au かんたん決済（通信料合算支払い）</label>');
    }
    // じぶん銀行判定
    if (jibunFlag=='1') {
        // ボタンを活性状態にする
        $('#selRadioMethod3').html('<input type="radio" name="selRadioMethod" onclick="changePoToto(\'11\')" disabled value="11"><label style="color:gray">じぶん銀行決済</label>');
    }
    // au WALLET クレジットカード
    if (jibunCardFlag=='1') {
        // ボタンを活性状態にする
        $('#selRadioMethod4').html('<input type="radio" name="selRadioMethod" onclick="changePoToto(\'12\')" disabled value="12"><label style="color:gray">クレジットカード決済</label>');
    }
    // 全ての決済が利用できない場合、ボタン活性化
    if (auWalletFlag=='1' && auEasyFlag!='1' && jibunFlag!='1' && jibunCardFlag!='1') {
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
    // 文字コードの指定を削除
    $('#saleMethodForm').removeAttr('accept-charset');
    // au かんたん決済（au PAY 残高支払い）
    if (auWalletFlag!='1') {
        // ボタンを活性状態にする
        $('#selRadioMethod1').html('<input type="radio" name="selRadioMethod" onclick="changePoToto(\'14\')" value="14"><label>au かんたん決済（au PAY 残高支払い）</label>');
        if (radioMethod=='14') {
            // ボタンを活性状態にし、チェック状態にする
            $('#saleMethodForm').attr('action', 'purchasetoto/vote/toto');
            $("input[name='saleMethod']").val('14');
            $("input[name='btnVoting']").val('auWALLETプリペイドカード');
            $("input[name='aw']").val('1');
            $('input[name=selRadioMethod]').val(['14']);
        }
    }
    // au かんたん決済（通信料合算支払い）
    if (auEasyFlag=='1') {
        // ボタンを活性状態にする
        $('#selRadioMethod2').html('<input type="radio" name="selRadioMethod" onclick="changePoToto(\'10\')" value="10"><label>au かんたん決済（通信料合算支払い）</label>');
        if (radioMethod=='10') {
            // ボタンを活性状態にし、チェック状態にする
            $('#saleMethodForm').attr('action', 'purchasetoto/vote/toto');
            $("input[name='saleMethod']").val('10');
            $("input[name='btnVoting']").val('auかんたん決済');
            $("input[name='aw']").val('0');
            $('input[name=selRadioMethod]').val(['10']);
        }
    }
    // じぶん銀行判定
    if (jibunFlag=='1') {
        // ボタンを活性状態にする
        $('#selRadioMethod3').html('<input type="radio" name="selRadioMethod" onclick="changePoToto(\'11\')" value="11"><label>じぶん銀行決済</label>');
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
    if (jibunCardFlag=='1') {
        // ボタンを活性状態にする
        $('#selRadioMethod4').html('<input type="radio" name="selRadioMethod" onclick="changePoToto(\'12\')" value="12"><label>クレジットカード決済</label>');
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
    if (auWalletFlag=='1' && auEasyFlag!='1' && jibunFlag!='1' && jibunCardFlag!='1') {
        // 購入するボタン活性化
        $('#btnSwitch').html('<div class="btn btn-disable btn-xs" disabled="disabled">購入する</div>');
    }
}


function changeBgToto(n) {
    // くじの合計金額を取得
    var nBuyMoneyTotal = Number($("#buyMoneyTotal").val());
    // ポイント入力欄を取得
    var nPointText = Number($("#pointTextToto").val());
    // ラジオボタンの値セット
    $('input:hidden[name="radioPoint"]').val(n);
    // string型に変換して三桁ずつに区切る
    var sBuyMoneyTotal = String(nBuyMoneyTotal).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
    if(n==='1') {
        // 決済時のhidden項目にセット
        $('input:hidden[name="allPoint"]').val(0);
        $('input:hidden[name="pointTextToto"]').val(nPointText);
        // ポイント利用にセット
        $('#pointuse').text(0);
        // お支払い金額にセット
        $('#amount').text(sBuyMoneyTotal);
        // テキストボックス非活性
        $('#pointTextToto').prop('disabled', true);
        // 全額ポイント決済からその他決済に変更した際のラジオボタン活性、非活性の制御を行う
        saleMethodSwitch();
    } else if(n==='2') {
        // テキストボックス非活性
        $('#pointTextToto').prop('disabled', false);
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
            $('#pointTextToto').prop('disabled', true);
            // 決済時のhidden項目にセット
            $('input:hidden[name="allPoint"]').val(nBuyMoneyTotal);
            $('input:hidden[name="pointTextToto"]').val(nBuyMoneyTotal);
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
            $('#pointTextToto').prop('disabled', true);
            // お支払い金額の初期値
            var nAmount = 0;
            // string型の初期値
            var sAmount = '';
            // string型に変換して三桁ずつに区切る
            var sPoint = String(nUsepoint).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
            // お支払い金額を計算
            nAmount = nBuyMoneyTotal - nUsepoint;
            // string型に変換して三桁ずつに区切る
            sAmount = String(nAmount).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
            // 決済時のhidden項目にセット
            $('input:hidden[name="allPoint"]').val(nUsepoint);
            $('input:hidden[name="pointTextToto"]').val(nUsepoint);
            if (nUsepoint===0) {
                // ポイント利用にセット
                $('#pointuse').text(sPoint);
            } else {
                // ポイント利用にセット
                $('#pointuse').text('-' + sPoint);
            }
            // お支払い金額にセット
            $('#amount').text(sAmount);
            // 全額ポイント決済からその他決済に変更した際のラジオボタン活性、非活性の制御を行う
            saleMethodSwitch();
        }
    }
}

function changePoToto(num) {
    // ラジオボタンの値セット
    $('input:hidden[name="radioMethod"]').val(num);
    $("input[name='saleMethod']").val(num);
    // 文字コードの指定を削除
    $('#saleMethodForm').removeAttr('accept-charset');
    if(num==='14') {
        // ボタンを活性状態にする
        $('#saleMethodForm').attr('action', 'purchasetoto/vote/toto');
        $("input[name='btnVoting']").val('auWALLETプリペイドカード');
        $("input[name='aw']").val('1');
    } else if(num==='10') {
        // ボタンを活性状態にする
        $('#saleMethodForm').attr('action', 'purchasetoto/vote/toto');
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
        $('#saleMethodForm').attr('action', 'purchasetoto/jibuncard');
        $("input[name='btnVoting']").val('クレジットカード決済');
        $("input[name='aw']").val('');
    }
}

function purchaseBtnClick(category) {
    // 決済方法取得
    var sSaleMethod = $('input:hidden[name="saleMethod"]').val();
    // 利用ポイント取得
    var nAllPoint = Number($('input:hidden[name="allPoint"]').val());

    // じぶん銀行の場合、ajax処理でポイント登録
    if (sSaleMethod === '11' && nAllPoint > 0) {
        load_point_bank("purchase/jibunbank", nAllPoint , category);
    } else {
        $('#saleMethodForm').submit();
    }
}

function load_point_bank(url, nAllPoint , category) {
    // 合計金額
    var nBuyMoneyTotal = Number($('#buyMoneyTotal').val());
    // EDI情報
    var HDN_EDIINFO = $('input:hidden[name="HDN_EDIINFO"]').val();

    $.ajax({
        type: 'get',
        url: url,
        dataType: 'html',
        cache: false,
        timeout: 10000,
        data: {
            buyMoneyTotal : nBuyMoneyTotal,
            allPoint : nAllPoint,
            HDN_EDIINFO : HDN_EDIINFO
        },
        headers: {
            'X-Requested-With': 'AJAXHttpRequest'
        },
        success: function(data) {
            var array = JSON.parse(data);
            if (array[0]===0) {
                var jibunChargeStart = array[1];
                // 引落金額
                $('input:hidden[name="HDN_TRANSYENAMT"]').val(jibunChargeStart.HDN_TRANSYENAMT);
                // 引落完了時の戻りURL
                $('input:hidden[name="HDN_COMPLETEDURL"]').val(jibunChargeStart.HDN_COMPLETEDURL);
                // 引落未完了時の戻りURL
                $('input:hidden[name="HDN_INCOMPLETEDURL"]').val(jibunChargeStart.HDN_INCOMPLETEDURL);
                // ハッシュ値
                $('input:hidden[name="HASH_VALUE"]').val(jibunChargeStart.HASH_VALUE);
                $('#saleMethodForm').submit();
            } else {
                submitError(category, array[0]);
            }
        },
        error: function(data) {
            submitError(category, 'E_2000445');
        }
    });
}

function submitError(category, errorCd) {
    if(category==='big') {
        // big
        $('#saleMethodForm').attr('action', 'purchase/error');
    } else {
        // toto
        $('#saleMethodForm').attr('action', 'purchasetoto/error');
    }
    $('#saleMethodForm').removeAttr('accept-charset');
    $('input:hidden[name="errorCode"]').val(errorCd);

    $('#saleMethodForm').submit();
}