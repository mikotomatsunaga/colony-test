<?php
/*
 * HOME画面表示用処理
 */
//define('PATH_LIB', 'C:\php_FrameWork\xampp\htdocs\autoto\sitelib');
//define('PATH_LIB', '../../dev/sitelib');
//define('PATH_LIB', '../../dev2/sitelib');
define('PATH_LIB', '../sitelib');
define('COMMON_DIR', '../autotocommon');
//define('COMMON_DIR', '../../dev2/autotocommon');
set_include_path(implode(PATH_SEPARATOR, array(PATH_LIB, COMMON_DIR)) . PATH_SEPARATOR . get_include_path());

require_once('util.php');
require_once 'Lib/spyc.php';

try {
    $fileName = COMMON_DIR . '/conf/' . 'autotocommon.yml';
    $aCommonConfig = Spyc::YAMLLoad($fileName);

    // 機種区分を取得
    $device = checkDevice();
    $homePage = '';
    $encoding = false;
    switch ($device) {
    // フィーチャーフォン
    case FEATURE_PHONE:
        // 20111116 文字化け対応  t.kimura 
        ini_set('default_charset', 'Shift_JIS');
        $homePage = HOME_FEATURE_PHONE;
        $viewFlag=1;
        $encoding = true;
        break;
    // 他キャリア
    case OTHER_CARRIER:
        ini_set('default_charset', 'Shift_JIS');
        redirectOtherCarrier();
        exit;
    // スマートフォン
    case SMART_PHONE:
        $homePage = HOME_SMART_PHONE;
        $viewFlag=2;
        break;
    // PC
    case PC_DEVICE:
        redirectPC();
        exit;
    // サービス対象外機種
    case OUT_OF_SERVICE:
        redirectOutofservice();
        exit;
    }
    // 導線コード取得
    if(setCookieLeadCode()){
        $response_headers = apache_response_headers();
        if (isset($response_headers['Set-Cookie'])){
            $tmpMaxAge = $aCommonConfig['MAX_AGE'];
            $nMaxAge = (int)$tmpMaxAge * 60;
            $sMaxAge = ' ;Max-Age=' . $nMaxAge;
            if ($device == FEATURE_PHONE) {
                header('Set-Cookie: ' . $response_headers['Set-Cookie'] . $sMaxAge);
            }
        }
    }

    //アフィリエイト情報を取得
    setCookieAffiliate();

    // アクセスログにページIDの出力
    apache_note('pageId', 'auot010');

    // ファイルが存在すれば内容をレスポンス
    if (file_exists($homePage)) {
        $contents = file_get_contents($homePage);
        // 置換用情報取得
        // キャリーオーバー（マーキー）
        $str = getCarryOverContentsMarquee($encoding);
        $contents = str_replace('##CARRYOVER_MARQUEE##', $str, $contents);
        // キャリーオーバー（全体）
        $str = getCarryOverContentsAll($encoding, $device);
        $contents = str_replace('##CARRYOVER_ALL##', $str, $contents);
        // キャリーオーバー開催回(BIG)
        $str = getCarryOverContentsStatus($encoding,$viewFlag,PRODUCTS_ID_BIG);
        $contents = str_replace('##CARRYOVER##', $str, $contents);
        // キャリーオーバー開催回(MEGA BIG)
        $str = getCarryOverContentsStatus($encoding, $viewFlag, PRODUCTS_ID_MEGA_BIG);
        $contents = str_replace('##CARRYOVER_MEGABIG##', $str, $contents);
        // 次回開催予定
        $str = getNextGameContents($encoding, $device);
        $contents = str_replace('##NEXT_GAME##', $str, $contents);
        // ログイン情報
        $str = getLoginContents($encoding, $device, $aCommonConfig);
        $contents = str_replace('##LOGIN##', $btn, $contents);
        // SPログインボタン
        if(!isLogin()){
            $btn=LOGIN_BUTTON_SP;
        } else {
            $btn=MYPAGE_BUTTON_SP;
        }
        $contents = str_replace('##LOGIN_BUTTON##', $btn, $contents);
        // MBログインLINK
        if(!isLogin()){
            $btn=LOGIN_LINK_MB;
        } else {
            $btn=MYPAGE_LINK_MB;
        }
        $btn= mb_convert_kana($btn, 'ak', 'UTF-8');
        $btn= mb_convert_encoding($btn, 'sjis-win', 'UTF-8');

        $contents = str_replace('##LOGIN_LINK##', $btn, $contents);
        // 新規会員登録ボタン
        if(!isLogin()){
            $btn=file_get_contents(ENTRY_CONTENTS_FILE_SP);
            $btn_mb = ENTRY_BUTTON_MB;
        } else {
            $btn='';
            $btn_mb='';
        }
        $contents = str_replace('##ENTRY_AUTH##', $btn, $contents);

        // ポイント交換所リンク
        if(!isLogin()){
            $btn='';
        } else {
            $btn=file_get_contents(POINT_LINK_SP);
        }
        $contents = str_replace('##POINT_LINK##', $btn, $contents);
        
        $btn_mb= mb_convert_kana($btn_mb, 'ak', 'UTF-8');
        $btn_mb= mb_convert_encoding($btn_mb, 'sjis-win', 'UTF-8');
        $contents = str_replace('##ENTRY_AUTH_MB##', $btn_mb, $contents);

        // キャンペーン情報
        $str = getCampaignContents($encoding, $device);
        $contents = str_replace('##CAMPAIGN##', $str, $contents);
        // Google Analyticsタグの出力
        $str = getGoogleAnalytics($encoding, $device);
        $contents = str_replace('##GOOGLE_ANALYTICS##', $str, $contents);
        echo $contents;
        
    } else {
        header("Not Found", true, 404);
        echo RESPONSE_404_HTML;
    }
} catch (Exception $e) {
//var_dump($e->getMessage());
    syslog(LOG_CRIT, 'code[' . $e->getCode() . ']msg[' . $e->getMessage() . ']');
    header("Not Found", true, 404);
    echo RESPONSE_404_HTML;
}
