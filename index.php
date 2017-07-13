<?php
//定义入口文件
//定义常量
//加载函数库
//启动框架

try{
    define('BASE_PATH',dirname(__DIR__).'/zwhtphp');
    define('APP_PATH',BASE_PATH.'/app');
    define('CORE_PATH',BASE_PATH.'/core');

    define('DEBUG',true);

    include 'vendor/autoload.php';

    include APP_PATH.'/config/config.php';
    include CORE_PATH.'/zwht.php'; //核心类库

    if(DEBUG){
        $whoops=new \Whoops\Run ;
        $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
        $whoops->register();
    }

    spl_autoload_register('core\zwht::load'); //注册自动加载类

    core\zwht::run();
}catch (\Exception $e){
    echo 'message:'.$e->getMessage().'file:'.$e->getFile();
}







