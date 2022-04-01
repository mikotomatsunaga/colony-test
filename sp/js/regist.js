/**
 * au WALLETのクレジットカード登録処理
 */
function sendWallet() {
    var cardnumber = '' + $('#cardnumber1').val() + $('#cardnumber2').val() + $('#cardnumber3').val() + $('#cardnumber4').val();

    //カード番号入力値チェック
    var regex = /^[0-9]{16}$/;
    var checkResult = checkCardNumber(cardnumber, regex);
    if (checkResult !== true) {
        addErrorMsg(checkResult);
        return;
    }

    //有効期限(年）の下2桁のみを取得
    var year = $('select[name=limit_Year]').val();
    year = year.substring(year.length -2);
    
    var paygentToken = new  PaygentToken();
    paygentToken.createToken(
        $('#merchant_id').val(),// マーチャントID
        $('#token_key').val(), //トークン生成鍵
        {
            card_number: cardnumber, 
            expire_year: year,
            expire_month: $('select[name=limit_Month]').val(),
            cvc: '',
            name: $('#kana_name').val()
        },// クレジットカード情報
        execPurchase // コールバック関数
    );
}

/**
 * JCBのクレジットカード登録処理
 */
function sendJCB() {
    var cardnumberArray = new Array();
    cardnumberArray[0] ='' + $('#cardnumber1').val();
    cardnumberArray[1] ='' + $('#cardnumber2').val();
    cardnumberArray[2] ='' + $('#cardnumber3').val();
    cardnumberArray[3] ='' + $('#cardnumber4').val();

    var validResult = true;
    var cardnumber = '';
    var regex = /^[0-9]{4}$/
    cardnumberArray.forEach(function(val, index){
        checkResult = checkCardNumber(val, regex);
        if (checkResult !== true) {
            addErrorMsg(checkResult);
            validResult = false;
        }
        cardnumber += val;
    });

    if (validResult !== true) {
        return;
    }

    var paygentToken = new  PaygentToken();
    paygentToken.createToken(
        $('#merchant_id').val(),// マーチャントID
        $('#token_key').val(), //トークン生成鍵
        {
            card_number: cardnumber, 
            expire_year: $('#valid_period_year').val(),
            expire_month: $('#valid_period_month').val(),
            cvc: '',
            name: $('#kana_name').val()
        },// クレジットカード情報
        execPurchase // コールバック関数
    );
}

/**
 * クレジットカードトークン生成関数から実行されるコールバック関数
 * 結果が正常ならばトークンをサーバに送信
 * @param response
 */
function execPurchase(response) {
    //トークンをformに設定してtoto_webに送信
    if (response.result  == '0000') {
        $('#token').val(response.tokenizedCardObject.token);
        document.frm.submit();
    } else {
        //エラーメッセージ出力
        addErrorMsg(msgObject[response.result]);
    }
}

/**
 * カード番号の入力値チェック
 */
function checkCardNumber(cardnumber, regex) {
    if (cardnumber === '') {
        return msgObject.emptyMsg;
    }

    if (regex.test(cardnumber) === true) {
        return true;
    }

    return msgObject.lengthMsg;
}

/**
 * エラーメッセージ要素を追加
 */
function addErrorMsg(msg) {
    // エスケープしたタグの両端を復号
    msg = msg.replace(/(&lt;)/g, '<').replace(/(&gt;)/g, '>');
    $('#errorMsg').remove();
    var msgEl = '<section id="errorMsg" class="margin20"><div class="box02"><dl><dt>ご確認</dt><dd class="text">' + msg + '</dd></dl></div></section>';
    $('div.hd01').after(msgEl);
}