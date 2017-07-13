<?php
namespace core;

class zwht{

    public static $classMap=array();
    public $assign=array();
    // public $display;

    public static function run(){
        $route=new route();
        $controller=ucfirst($route->controller).'Controller';
        $action=$route->action;
        $ctrFile=APP_PATH.'/controllers/'.$controller.'.php';
        if(is_file($ctrFile)){
            include $ctrFile;
            $controllerClass='\app'.'\\'.'controller'.'\\'.$controller;
            $cont=new $controllerClass();
            if(!method_exists($cont,$action)){
                throw new \Exception($action.'方法不存在！');
            }
            $cont->$action();
        }else{
            throw new \Exception($controller.'控制器不存在！');
        }
    }

    public static function load($class){
        if(isset(self::$classMap[$class])){
            return true;
        }

        $class=str_replace('\\','/',$class);
        $file=BASE_PATH.'/'.$class.'.php';
        if(is_file($file)){
            include $file;
            self::$classMap[$class]=$class;
        }else{
            false;
        }
    }

    public function assign($key,$name){
        $this->assign[$key]=$name;
    }

    public function display($file){
        $file=APP_PATH.'/views/'.$file;
        if(is_file($file)){
            extract($this->assign);
            include $file;
        }
    }
}