<?php

$ua = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';

if(preg_match('/UP.Browser/', $ua) === 1) {
        header("Location: http://stg.toto.auone.jp/mb/404.html");
} else {
        header("Location: http://stg.toto.auone.jp/sp/404.html");
}

?>
