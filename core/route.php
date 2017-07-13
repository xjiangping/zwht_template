<?php
/**
 * Created by PhpStorm.
 * User: xjp
 * Date: 17-7-11
 * Time: 下午3:29
 */

namespace core;
use core\config;

class route{

    public $controller;
    public $action;

    public function __construct()
    {
        $config=config::get('default','config');

        if(isset($_SERVER['REQUEST_URI']) && $_SERVER['REQUEST_URI'] != '/'){
            if(!is_file($_SERVER['REQUEST_URI'])){
                $path=$_SERVER['REQUEST_URI'];
                $pathArray=explode('/',trim($path,'/'));
                if(isset($pathArray[0])){
                    $this->controller=$pathArray[0];
                    unset($pathArray[0]);
                }
                if(isset($pathArray[1])){
                    $this->action=$pathArray[1];
                    unset($pathArray[1]);
                }else{
                    $this->action=$config['action'];
                }

                foreach ($pathArray as $k => $v){
                    if($k%2 == 0){
                        $_GET[$v]=$pathArray[$k+1];
                    }
                    if(!isset($pathArray[$k+2])){
                        break;
                    }
                }
            }else{
                $this->controller=$config['controller'];
                $this->action=$config['action'];
            }
        }else{
            $this->controller=$config['controller'];
            $this->action=$config['action'];
        }
    }
}