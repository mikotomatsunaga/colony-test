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

    // MEGABIG 変更
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

        var total_amnt = bigNum*300 + big1000Num*200 + miniBigNum*200 + y100BigNum*100 + megaBigNum*300;

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

    // 簡単入力エリア(MEGA BIG)
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

})

