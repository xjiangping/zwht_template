<?php

namespace Company\Utils;

class Utils {
	public static function preprocessBody($rawBody,$isUrlParse=false) {
		$out='';
		if($isUrlParse){
			parse_str($rawBody,$out);
			return (object)$out;
		}
		return json_decode($rawBody);
	}

	// 生成UUID
	public static function guid() {
		if (function_exists ( 'com_create_guid' )) {
			return com_create_guid ();
		} else {
			mt_srand ( ( double ) microtime () * 10000 );
			$charid = strtoupper ( md5 ( uniqid ( rand (), true ) ) );
			$hyphen = chr ( 45 );
			$uuid = substr ( $charid, 0, 8 ) . $hyphen . substr ( $charid, 8, 4 ) . $hyphen . substr ( $charid, 12, 4 ) . $hyphen . substr ( $charid, 16, 4 ) . $hyphen . substr ( $charid, 20, 12 );
			return $uuid;
		}
	}
	
	/*
	 * 创建n位随机字符串
	 */
	public static function buildRandStr($n){
		$chars = array(
				"A", "B", "C", "D", "E", "F", "G",
				"H", "I", "J", "K", "L", "M", "N",
				"O", "P", "Q", "R","S", "T",
				"U", "V", "W", "X", "Y", "Z"
		);
		$charsLen = count($chars) - 1;
		shuffle($chars);
		$output = "";
		for ($i=0; $i<$n; $i++)
		{
			$output .= $chars[mt_rand(0, $charsLen)];
		}
		return $output;
	}
	
	public static function randImgName(){
		$i=rand(0,2);
		$array=array('default1','default2','default3');
		return $array[$i];
	}
	
	public static function md5_encode($pass){
		$str='';
		$md5 = md5($pass);
		var_dump($pass);
		var_dump($md5);
		$str=substr_replace($md5,'y',25,1);
		$str=substr_replace($str,'u',21,1);
		$str=substr_replace($str,'n',14,1);
		$str=substr_replace($str,'s',19,1);
		$str=substr_replace($str,'h',8,1);
		$str=substr_replace($str,'u',21,1);
		$str=substr_replace($str,'o',15,1);
		$str=substr_replace($str,'i',9,1);
		$str=substr_replace($str,'t',20,1);
		$str=substr_replace($str,'a',1,1);
		var_dump($str);die;
		return $str;
	}
		
	public static function generateOrderId() {
		$time = date("YmdHis");
		$time .= mt_rand(0, 10000);
		return $time;
	}

	public static function Sign($data,$key){
		return MD5(Utils::createLinkStr($data).$key);
	}

	//生成随机字符串
	function create_nonce_str($pw_length=24)
	{
		$randpwd = "";
		for ($i = 0; $i < $pw_length; $i++)
		{
			$randpwd .= chr(mt_rand(33, 126));
		}
		return $randpwd;
	}
		
	//组装签名字符串
	public static function createLinkStr($data)
	{
		ksort($data);
		$str = '';
		$i = 0;
		while (list($key, $val) = each($data)) {
			if (false === Utils::checkEmpty($val) && "@" != substr($val, 0, 1)) {
				if ($i == 0) {
					$str .= $key . '=' . $val;
				} else {
					$str .= '&' . $key . '=' . $val;
				}
				$i++;
			}
		}
		unset($key, $value);
		return $str;
	}

	public static function checkEmpty($value)
	{
		if (!isset($value)) {
			return true;
		}
		if ($value === NUll) {
			return true;
		}
		if (trim($value) == '') {
			return true;
		}
		return false;
	}

	public static function curl_post($url,$data){
		$ch = curl_init ();
		curl_setopt($ch, CURLOPT_URL,$url);//抓取指定网页
	        	curl_setopt($ch, CURLOPT_HEADER, 0);//设置header
	       	curl_setopt($ch, CURLOPT_TIMEOUT,1);
	        	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
	        	curl_setopt($ch, CURLOPT_POST, 1);//post提交方式
	        	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		$result = curl_exec($ch);
		curl_close ($ch);
		return $result;
	}
	public static function curl_post_wx($url,$data){
		$ch = curl_init ();
		curl_setopt( $ch, CURLOPT_URL, $url );
		curl_setopt( $ch, CURLOPT_POST, 1 );
		curl_setopt( $ch, CURLOPT_HEADER, 0 );
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
		curl_setopt( $ch, CURLOPT_POSTFIELDS,$data);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		$result = curl_exec($ch);
		curl_close ($ch);
		return $result;
	}
	public static function xmlToArray($xml){
		//禁止引用外部xml实体
		libxml_disable_entity_loader(true);
		$values = json_decode(json_encode(simplexml_load_string($xml, 'SimpleXMLElement', LIBXML_NOCDATA)), true);
		return $values;
	}
		
	public static function getlastMonthDays(){
		$timestamp=time();
		$firstday=date('Y-m-01',strtotime(date('Y',$timestamp).'-'.(date('m',$timestamp)-1).'-01'));
		$lastday=date('Y-m-d',strtotime("$firstday +1 month -1 day"));
		return array('firstDay'=>$firstday,'lastDay'=>$lastday);
	}
		
	public static function getMonthDays(){
		$firstday=date('Y-m-01');
		$lastday=date('Y-m-d',strtotime("$firstday +1 month -1 day"));
		return array('firstDay'=>$firstday,'lastDay'=>$lastday);
	}

	public static function isPhone($phonenumber){
		if(preg_match("/^1(3|4|5|7|8)\d{9}$/",$phonenumber)){  
		    	return  true;  
		}else{
			return false;
		}
	}

	public static function array_merge($objectArray,$objectArr){
		$data=array();
		foreach ($objectArray as $value){
			$data[]=$value;
		}
		foreach ($objectArr as $value){
			$data[]=$value;
		}
		return $data;
	}

	public static function array_push($ObjArray,$Obj){
		$data=array();
		foreach ($ObjArray as $value) {
			$data[]=$value;
		}
		$data[]=$Obj;
		return $data;
	}
}
