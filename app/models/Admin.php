<?php
namespace app\models;
use core\Model;

class Admin extends Model
{
    public $id;
    public $name;
    public $level;
    public $phone;
    public $password;
    public $token;
    public $time;
}