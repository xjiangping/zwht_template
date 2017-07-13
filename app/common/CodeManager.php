<?php

namespace Company\Common;

use Company\Constants\ErrorConstantsManager;

class CodeManager {
	public static function codeMessage($code,$data){
		$returnMessage['code']=$code;
		if($code != 200){
			$returnMessage['message']=ErrorConstantsManager::$errorMessageList[$code];
		}
		if($data){  
			$returnMessage['data']=$data; 	
		}
		return json_encode($returnMessage, JSON_UNESCAPED_UNICODE);
	}
		
	public static function alertMessage($message){
		return '<script>alert('.$message.');</script>';
	}
}