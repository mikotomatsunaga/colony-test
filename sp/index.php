<?php
require_once dirname(__FILE__) . '/../../autotofront/app/Autotofront_Controller.php';
$_SERVER['URL_HANDLER'] = 'index';

Autotofront_Controller::main('Autotofront_Controller', 'index', false, "sp");

