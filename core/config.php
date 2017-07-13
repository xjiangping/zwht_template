<?php
namespace core;
/**
 * Created by PhpStorm.
 * User: xjp
 * Date: 17-7-12
 * Time: 下午2:38
 */
class config{
    public static $config=[];
    public static function get($name,$file){
        $path = APP_PATH.'/config//'.$file.'.php';
        if(isset(self::$config[$file])){
            return self::$config[$file][$name];
        }else{
            if(is_file($path)){
                $config=include $path;
                if(isset($config[$name])){
                    self::$config[$path]=$config;
                    return $config[$name];
                }else{
                    throw new \Exception('没有这个配置项',$name);
                }
            }else{
                throw new \Exception('找不到配置文件',$file);
            }
        }
    }
}