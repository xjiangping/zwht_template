<?php
namespace app\controller;
use core\Model;
use core\zwht;
/**
 * Created by PhpStorm.
 * User: xjp
 * Date: 17-7-11
 * Time: 下午4:31
 */
class IndexController extends zwht{
    public function index(){

        $model=new Model();
        $this->assign('data','test');
        $this->display('/index/index.html');
    }

    public function about(){

        $model=new Model();

        $this->display('/index/about.html');
    }

    public function cases(){

        $model=new Model();

        $this->display('/index/case.html');
    }

    public function contact(){

        $model=new Model();

        $this->display('/index/contact.html');
    }

    public function marketing(){

        $model=new Model();

        $this->display('/index/marketing.html');
    }

    public function news(){

        $model=new Model();

        $this->display('/index/news.html');
    }

    public function product(){

        $model=new Model();

        $this->display('/index/product.html');
    }

    public function message(){

        $model=new Model();

        $this->display('/index/message.html');
    }
}