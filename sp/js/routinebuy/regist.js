$(function(){

    // 簡単入力ボタン
    $(".kantanBtn").click(function(){
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

    calc_totalMoney();

    $(window).resize(centerModal);

    function centerModal(modalId){
        var w = $(window).width();
        var h = $(window).height();
        var cw = $("#easy" + modalId + "Modal").outerWidth({margin:true});
        var ch = $("#easy" + modalId + "Modal").outerHeight({margin:true});
        $("#easy" + modalId + "Modal").css({"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"});
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
        // BIGの設定
        $('#megaBigNum').eq(0).val(imgId);
        // 金額集計
        calc_totalMoney();
        // 閉じる
        $('#easymegaBigModal .modalCloseBtn').trigger('click');
    })


    // 簡単入力エリア(BIG1000)
    $('#easybig1000Modal a').click(function() {
        // イメージID
        var imgId = $(this).attr("id");
        // BIGの設定
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
        // miniBIGのクリア
        $('#miniBigNum').eq(0).val(imgId);
        // 金額集計
        calc_totalMoney();
        // 閉じる
        $('#easyminibigModal .modalCloseBtn').trigger('click');
    })

  // オススメ購入口数オプションボタン
    $(".recommendBtn").click(function(){
        $("body").append('<div id="modal-overlay"></div>');
        $("#modal-overlay").fadeIn("fast");
        centerRecommendModal();
        $("#recommendModal").fadeIn("slow");
        $("#modal-overlay,.recommendModalCloseBtn").unbind().click(function(){
            $("#recommendModal,#modal-overlay").fadeOut("slow",function(){
                $('#modal-overlay').remove();
            })
        })
    })

    $(window).resize(centerRecommendModal);

    $(".recommendOption").click( function() {
        var aPurchaseNums = $.parseJSON($("input[name='optionsRadios']:checked").val());
        $('#bigNum').eq(0).val(aPurchaseNums[0]);
        $('#megaBigNum').eq(0).val(aPurchaseNums[1]);
        $('#big1000Num').eq(0).val(aPurchaseNums[2]);
        $('#miniBigNum').eq(0).val(aPurchaseNums[3]);
        var total_amnt = aPurchaseNums[0]*300 + aPurchaseNums[1]*300 + aPurchaseNums[2]*200 + aPurchaseNums[3]*200;
        // 合計金額適用
        $('.sumNum').eq(0).text(addFigure(total_amnt));
        $('#hidTotalMoney').val(total_amnt);
        // 閉じる
        $('#recommendModal .recommendModalCloseBtn').trigger('click');
    });

    function centerModal(modalId){
        var w = $(window).width();
        var h = $(window).height();
        var cw = $("#easy" + modalId + "Modal").outerWidth({margin:true});
        var ch = $("#easy" + modalId + "Modal").outerHeight({margin:true});
        $("#easy" + modalId + "Modal").css({"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"});
    }

    function centerRecommendModal(){
        var w = $(window).width();
        var h = $(window).height();
        var cw = $("#recommendModal").outerWidth({margin:true});
        var ch = $("#recommendModal").outerHeight({margin:true});
        $("#recommendModal").css({"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"});
    }


    function calc_totalMoney () {
        var bigNum     = $('#bigNum').eq(0).val();
        var megaBigNum = $('#megaBigNum').eq(0).val();
        var big1000Num = $('#big1000Num').eq(0).val();
        var miniBigNum = $('#miniBigNum').eq(0).val();
        var total_amnt = bigNum*300 + megaBigNum*300 + big1000Num*200 + miniBigNum*200;
        // 合計金額適用
        $('.sumNum').eq(0).text(addFigure(total_amnt));
        $('#hidTotalMoney').val(total_amnt);
    }

    function addFigure(str) {
        var num = new String(str).replace(/,/g, "");
        while (num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
        return num;
    }

     // BIG 変更
    $("#bigNum").change(function(){
        var bigNum = $('#bigNum').eq(0).val();
        // 金額集計
        calc_totalMoney();
    });

    // MEGA BIG 変更
    $("#megaBigNum").change(function(){
        var megaBigNum = $('#megaBigNum').eq(0).val();
        // 金額集計
        calc_totalMoney();
    });

    // BIG1000 変更
    $("#big1000Num").change(function(){
        var big1000Num = $('#big1000Num').eq(0).val();
        // 金額集計
        calc_totalMoney();
    });

    // miniBIG 変更
    $("#miniBigNum").change(function(){
        var miniBigNum = $('#miniBigNum').eq(0).val();
        // 金額集計
        calc_totalMoney();
    });
    // 初期カレンダー構築
    $(document).ready(function(){

        // 現在時間
        var now_date = new Date();
        var now_year = now_date.getFullYear();
        var now_month = now_date.getMonth();
        // 販売終了時間
        var end_year = $('#end_year').val();
        var end_month = $('#end_month').val()*1;

        var interval = (end_year - now_year) * 12 + (end_month - now_month);

        if(interval == 0){
           $('#calendarList').append('<div class="calender"><table class="calendar" id="calendar"></table></div>');
           var $calendar = $('#calendar');
           createCal($calendar, now_month);
        }else if(interval > 0){
           for(var i = 0;i < interval;i++){
              $('#calendarList').append('<div class="calender"><table class="calendar" id="calendar'+i+'"></table></div>');
              var $calendar = $('#calendar'+i);
              createCal($calendar, now_month + i);
           }
        }
    });

    // カレンダー構築
    function createCal($table, month) {
        var validSaleDateArrays = $.parseJSON($('#validSaleDateList').val());
        var taian = $.parseJSON($('#taian').val());
        var tgt_date = new Date();
        tgt_date.setDate(1); //@2016.04.06
        tgt_date.setMonth(month);
        var tgt_month = tgt_date.getMonth() + 1;
        var tgt_year = tgt_date.getFullYear();
        //月初
        tgt_date.setDate(1);
        var firstday_weekday = tgt_date.getDay();
        //月末
        tgt_date.setMonth(tgt_month);
        tgt_date.setDate(0);
        var lastday = tgt_date.getDate();
        $table.append('<tr><th colspan="7" class="month">'+ tgt_month + '月</th></tr>');
        $table.append('<tr><th class="col01">日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th class="col05">土</th></tr>');

        tr_cal = '<tr class="date">';
        var td_counter = 0;

        for(var before = 0; before < firstday_weekday; before++ ) {
            if(td_counter == 0){
            tr_cal += '<td class="sunday"></td>';
            }
            else {
            tr_cal += '<td></td>';
            }
            td_counter++;
            if(td_counter == 7) {
                td_counter = 0;
                tr_cal += '</tr>';
                $table.append(tr_cal);
                tr_cal = '<tr class="date">';
            }
        }

        var day_class = '';
        for(var day = 1; day <= lastday; day++ ) {
            var tgt_ymd = tgt_year + '-' + tgt_month + '-' + day;
            if(td_counter == 0){
            day_class = ' sunday';
            }
            else if(td_counter == 6){
            day_class = ' saturday';
            }
            else {
            day_class = '';
            }
            tr_cal += '<td data-date="' + tgt_ymd + '"';
            if($.inArray(tgt_ymd, taian) >= 0) {
                tr_cal += ' class="close taian' + day_class + '"';
            }else{
                tr_cal += ' class="close' + day_class + '"';
            }
            tr_cal += '>' + day + '</td>';

            td_counter++;
            if(td_counter == 7) {
                td_counter = 0;
                tr_cal += '</tr>';
                $table.append(tr_cal);
                tr_cal = '<tr class="date">';
            }
        }

        for(var after = 0; after < 6; after++ ) {
            if(td_counter == 6){
            tr_cal += '<td class="saturday"></td>';
            }
            else {
            tr_cal += '<td></td>';
            }
            td_counter++;
            if(td_counter == 7) {
                tr_cal += '</tr>';
                $table.append(tr_cal);
                break;
            }
        }

        var terms = $('#saleEndDatetime').val().split('#');
        var term = $('#saleEndDatetime').val().split('-');

        var tgt_date = new Date(term[0].substr(0, 4) + '-' + term[0].substr(4, 2) + '-' + term[0].substr(6, 2));
        var to_date = new Date(term[1].substr(0, 4) + '-' + term[1].substr(4, 2) + '-' + term[1].substr(6, 2));

        do {
            var tgt_year = tgt_date.getFullYear();
            var tgt_month = tgt_date.getMonth() + 1;
            var tgt_day = tgt_date.getDate();
            var tgt_ymd = tgt_year + '-' + tgt_month + '-' + tgt_day;

            if($.inArray(tgt_ymd, validSaleDateArrays) >= 0){
                $('td[data-date=\'' + tgt_ymd + '\']').removeClass('close');
            }

            tgt_date.setDate(tgt_day + 1);
        } while (tgt_date <= to_date);
    }

    //カレンダークリックイベント
    $(document).on('click', '.calendar tr.date td', function() {
        $tgt_date = $(this).attr('data-date');
        //ブランクをクリックした場合は終了
        if(!$tgt_date){
            return false;
        }
        //開催日以外をクリックした場合は終了
        if($(this).hasClass('close')) {
            return false;
        }
        if($(this).hasClass('selected')) {
            $('#selected_date li[data-date=\''+$tgt_date+'\']').remove();
            $(this).removeClass('selected');
        } else {
            //上限チェック
            if($('#selected_date li').length > 4) {
                //alert('購入日は５日まで選択可能です。');
                return false;
            }

            $dates = $tgt_date.split('-');
            $showDate = $dates[0] + '-' + ($dates[1] < 10 ? '0' + $dates[1] : $dates[1]) + '-' + ($dates[2] < 10 ? '0' + $dates[2] : $dates[2]);

            $('#selected_date').append('<li data-date="'+$tgt_date+'">' + $showDate + '</li>');
            
            //選択された日付の色を変える場所
            $(this).addClass('selected');
            $('#selected_date').html(
                $('#selected_date').children().sort(function(a, b) {
                    var adate = new Date($(a).html());
                    var bdate = new Date($(b).html());
                    return adate > bdate;
                })
            );
        }
    });

    //表示制御
    $('#week_check_area').hide();
    $('#calendar_check_area').hide();
    $('#hold_check_area').hide("slow");
    $('#every_check_area').hide("slow");
    $('#month_check_area').hide("slow");
    $('input[name^=buyType]').on('click', function() {
        if($(this).val() == '4'){
            $('#week_check_area').show("slow");
            $('#calendar_check_area').hide("slow");
            $('#hold_check_area').hide("slow");
            $('#every_check_area').hide("slow");
            $('#month_check_area').hide("slow");
        } else if($(this).val() == '6'){
            $('#week_check_area').hide("slow");
            $('#calendar_check_area').show("slow");
            $('#hold_check_area').hide("slow");
            $('#every_check_area').hide("slow");
            $('#month_check_area').hide("slow");
        } else if($(this).val() == '2'){
            $('#week_check_area').hide("slow");
            $('#calendar_check_area').hide("slow");
            $('#hold_check_area').show("slow");
            $('#every_check_area').hide("slow");
            $('#month_check_area').hide("slow");
        } else if($(this).val() == '3'){
            $('#week_check_area').hide("slow");
            $('#calendar_check_area').hide("slow");
            $('#hold_check_area').hide("slow");
            $('#every_check_area').show("slow");
            $('#month_check_area').hide("slow");
            
        } else if($(this).val() == '5'){
            $('#week_check_area').hide("slow");
            $('#calendar_check_area').hide("slow");
            $('#hold_check_area').hide("slow");
            $('#every_check_area').hide("slow");
            $('#month_check_area').show("slow");
        }
    });

    $('input[name^=buyType]:checked').each(function(){
        if($(this).val() == '4'){
            $('#week_check_area').show("slow");
            $('#calendar_check_area').hide("slow");
            $('#hold_check_area').hide("slow");
            $('#every_check_area').hide("slow");
            $('#month_check_area').hide("slow");
        } else if($(this).val() == '6'){
            $('#week_check_area').hide("slow");
            $('#calendar_check_area').show("slow");
            $('#hold_check_area').hide("slow");
            $('#every_check_area').hide("slow");
            $('#month_check_area').hide("slow");
        } else if($(this).val() == '2'){
            $('#week_check_area').hide("slow");
            $('#calendar_check_area').hide("slow");
            $('#hold_check_area').show("slow");
            $('#every_check_area').hide("slow");
            $('#month_check_area').hide("slow");
        } else if($(this).val() == '3'){
            $('#week_check_area').hide("slow");
            $('#calendar_check_area').hide("slow");
            $('#hold_check_area').hide("slow");
            $('#every_check_area').show("slow");
            $('#month_check_area').hide("slow");
            
        } else if($(this).val() == '5'){
            $('#week_check_area').hide("slow");
            $('#calendar_check_area').hide("slow");
            $('#hold_check_area').hide("slow");
            $('#every_check_area').hide("slow");
            $('#month_check_area').show("slow");
        }
    });

    //確認ボタン
    $('#subBtn').click(function() {
        $select_type = $('input[name^=buyType]:checked').val();
        if($select_type == '4'){
            checked = false;
            $('.weekday_checkbox').each(function() {
                if($(this).prop('checked')){
                    checked = true;
                }
            });
            if(!checked){
                //alert('曜日を選択してください。');
                //return false;
            }
        }
        if($select_type == '6'){
            if($('#selected_date li').length == 0) {
                //alert('購入日を選択してください。');
                //return false;
            }else{
                var selected_dates = [];
                $('#selected_date li').each(function(i, elem) {
                    selected_dates.push($(elem).html());
                });
                var selected_date = selected_dates.join();
                $('input[name=selected_date]').val(selected_date);
            }
        }
        $('#purchase').submit();
        return true;
    });

});