<?php
/**
 * Created by PhpStorm.
 * User: xjp
 * Date: 17-7-11
 * Time: 上午11:56
 */
return array(
    'database' => [
        'adapter' => 'mysql',
        'host' => 'localhost',
        'username' => 'root',
        'password' => 'root',
        'dbname' => 'template'
    ],
    'default'=>[
        'controller'=>'index',
        'action'=>'index',
    ],
    'application' => [
        'controllersDir' =>'../app/controllers/',
        'modelsDir' =>'../app/models/',
        'libraryDir' =>'../app/library/',
        'proxyDir' =>'../app/proxy/',
        'commonDir' =>'../app/common/',
        'cacheDir' => '../app/cache/',
        'constantsDir' =>'../app/constants/',
        'utilsDir' => '../app/utils/',
        'cryptSalt' => 'eEAfR|_&G&f,+vU]:jFr!!A&+71w1Ms9~8_4L!<@[N@DyaIP_2My|:+.u>/6m,$D'
    ],
    'home' => [
        'ip' => '192.168.31.195:8081',
    ],
    'mail' => [
        'ip' => '120.77.176.196:8889',  // TODO 修改成为服务器IP test
        'fromName' => '0.0',
        'fromEmail' => 'xjiangping@aliyun.com',
        'smtp' => [
            'server' => 'smtp.aliyun.com',
            'port' => 465,
            'security' => '',
            'username' => 'xjiangping@aliyun.com',
            'password' => 'xjp6195065'
        ]
    ]
);