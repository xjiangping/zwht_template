<?php
namespace core;
use core\config;
use Medoo\Medoo;
/**
 * Created by PhpStorm.
 * User: xjp
 * Date: 17-7-11
 * Time: 下午5:46
 */
class Model extends Medoo{
    public function __construct(){
        $config=config::get('database','config');

        parent::__construct( array(
            'database_type' => $config['adapter'],
            'database_name' => $config['dbname'],
            'server' => $config['host'],
            'username' => $config['username'],
            'password' => $config['password'],
            'charset' => 'utf8',

            // 可选参数
            'port' => 3306,

            // 可选，定义表的前缀
//            'prefix' => 'PREFIX_',

            // 连接参数扩展, 更多参考 http://www.php.net/manual/en/pdo.setattribute.php
//            'option' => [
//                PDO::ATTR_CASE => PDO::CASE_NATURAL
//            ]
        ));

    }
}