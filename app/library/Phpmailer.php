<?php
namespace TemplateApi\Library;

class Phpmailer{

	public static function sendMailToAdmin($config,$to,$account,$message){
		require 'lib/PHPMailer-master/PHPMailerAutoload.php';// 加载这1个文件和加载下面2个文件的作用是等同的
		//require_once 'class.phpmailer.php';
		//require_once 'class.smtp.php';
        $body='<html>  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />  
<title>ci点啥官方邮件提醒</title>  
</head>  
<body>  
<div>'.$message.'</div>
</body>  
</html>';
		//config
		$config->mail->fromName;
		$config->mail->fromEmail;
		$config->mail->smtp->server;
		$config->mail->smtp->port;
		$config->mail->smtp->security;
		$config->mail->smtp->username;
		$config->mail->smtp->password;
        $mail = new \PHPMailer();
//        var_dump($config->mail->smtp);die;
        $mail->isSMTP();// 使用SMTP服务
        $mail->CharSet = "utf8";// 编码格式为utf8，不设置编码的话，中文会出现乱码
        $mail->Host = $config->mail->smtp->server;// 发送方的SMTP服务器地址
        $mail->SMTPAuth = true;// 是否使用身份验证
        $mail->Username = $config->mail->smtp->username;// 发送方的163邮箱用户名
        $mail->Password = $config->mail->smtp->password;// 发送方的邮箱密码，注意用163邮箱这里填写的是“客户端授权密码”而不是邮箱的登录密码！
//        $mail->SMTPSecure = "ssl";// 使用ssl协议方式
        $mail->Port = $config->mail->smtp->port;// 163邮箱的ssl协议方式端口号是465/994

        $mail->setFrom($config->mail->fromEmail,"ci点啥官方邮件提醒");// 设置发件人信息，如邮件格式说明中的发件人，这里会显示为Mailer(xxxx@163.com），Mailer是当做名字显示
        $mail->addAddress($to,$account);// 设置收件人信息，如邮件格式说明中的收件人，这里会显示为Liang(yyyy@163.com)
        $mail->addReplyTo($config->mail->fromEmail,"Reply");// 设置回复人信息，指的是收件人收到邮件后，如果要回复，回复邮件将发送到的邮箱地址
        $mail->addCC($to);// 设置邮件抄送人，可以只写地址，上述的设置也可以只写地址
        $mail->addBCC($to);// 设置秘密抄送人
        $mail->addAttachment();// 添加附件

        $mail->Subject = "ci点啥 官网有人留言了";// 邮件标题
        // $mail->Body = "111111111111111";// 邮件正文
        //$mail->AltBody = "This is the plain text纯文本";// 这个是设置纯文本方式显示的正文内容，如果不支持Html方式，就会用到这个，基本无用
        $mail->WordWrap    = 80; // set word wrap

        $mail->msgHTML($body);

        $mail->IsHTML(true); // send as HTML
        if(!$mail->send()){// 发送邮件
            echo "Message could not be sent.";
            return $mail->ErrorInfo;// 输出错误信息
        }else{
            return;
        }
	}

    public static function sendMailToStore($config,$to,$account,$url,$tittle){
        require 'lib/PHPMailer-master/PHPMailerAutoload.php';// 加载这1个文件和加载下面2个文件的作用是等同的
        //require_once 'class.phpmailer.php';
        //require_once 'class.smtp.php';
        $body='<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title></title>
</head>
<body style=" height: 500px;">
  <div style=" box-sizing: border-box; width: 500px;margin: 100px auto ;height: 300px;border: 1px solid #2a4d9f;border-top: 30px solid #2a4d9f;padding: 10px;">
    <p style=" margin: 0;line-height: 20px;font-size: 14px;">感谢您使用众鑫合后台管理系统!</p>
    <p style=" margin: 0;line-height: 20px;font-size: 14px;">点击下面的按钮以进入重置密码</p>
    <a style=" display: inline-block;text-align: center;width: 150px;height: 30px;line-height: 30px;background-color: #2a4d9f;border-radius: 5px;color:#fff;text-decoration: none;font-size: 12px; margin: 10px 0;" href="'.$url.'">重置密码</a>
    <p style=" margin: 0;line-height: 20px;font-size: 14px;">如果你无法通过上面按钮跳转页面，请点击下面的链接或者把它复制到浏览器地址栏。</p>
    <a style=" display: block;font-size: 20px;line-height: 30px;height: 90px;width: 480px;word-break:break-all"  href="'.$url.'">'.$url.'</a>
    <p style=" margin: 0;line-height: 20px;font-size: 14px;">感谢您的使用！</p>
    <p style=" margin: 0;line-height: 20px;font-size: 14px;">ProcessOn ZWHT</p>
  </div>
</body>
</html>';
        //config
        $config->mail->fromName;
        $config->mail->fromEmail;
        $config->mail->smtp->server;
        $config->mail->smtp->port;
        $config->mail->smtp->security;
        $config->mail->smtp->username;
        $config->mail->smtp->password;
        $mail = new \PHPMailer();
//        var_dump($config->mail->smtp);die;
        $mail->isSMTP();// 使用SMTP服务
        $mail->CharSet = "utf8";// 编码格式为utf8，不设置编码的话，中文会出现乱码
        $mail->Host = $config->mail->smtp->server;// 发送方的SMTP服务器地址
        $mail->SMTPAuth = true;// 是否使用身份验证
        $mail->Username = $config->mail->smtp->username;// 发送方的163邮箱用户名
        $mail->Password = $config->mail->smtp->password;// 发送方的邮箱密码，注意用163邮箱这里填写的是“客户端授权密码”而不是邮箱的登录密码！
//        $mail->SMTPSecure = "ssl";// 使用ssl协议方式
        $mail->Port = $config->mail->smtp->port;// 163邮箱的ssl协议方式端口号是465/994

        $mail->setFrom($config->mail->fromEmail,"众鑫合官方邮件提醒");// 设置发件人信息，如邮件格式说明中的发件人，这里会显示为Mailer(xxxx@163.com），Mailer是当做名字显示
        $mail->addAddress($to,$account);// 设置收件人信息，如邮件格式说明中的收件人，这里会显示为Liang(yyyy@163.com)
        $mail->addReplyTo($config->mail->fromEmail,"Reply");// 设置回复人信息，指的是收件人收到邮件后，如果要回复，回复邮件将发送到的邮箱地址
        $mail->addCC($to);// 设置邮件抄送人，可以只写地址，上述的设置也可以只写地址
        $mail->addBCC($to);// 设置秘密抄送人
        $mail->addAttachment();// 添加附件

        $mail->Subject = $tittle;// 邮件标题
        // $mail->Body = "111111111111111";// 邮件正文
        //$mail->AltBody = "This is the plain text纯文本";// 这个是设置纯文本方式显示的正文内容，如果不支持Html方式，就会用到这个，基本无用
        $mail->WordWrap    = 80; // set word wrap

        $mail->msgHTML($body);

        $mail->IsHTML(true); // send as HTML
        if(!$mail->send()){// 发送邮件
            return false;
        }else{
            return true;
        }
    }

    public static function sendMailToStore2($config,$to,$account,$url,$tittle){
        require 'lib/PHPMailer-master/PHPMailerAutoload.php';// 加载这1个文件和加载下面2个文件的作用是等同的
        //require_once 'class.phpmailer.php';
        //require_once 'class.smtp.php';
        $body='<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>'.$tittle.'</title>
  <style>
    body{
      height: 500px;
    }
    .main{
      box-sizing: border-box;
      width: 500px;
      margin: 100px auto ;
      height: 300px;
      border: 1px solid #D12653;
      border-top: 30px solid #D12653;
      padding: 10px;
    }
    .main>a.linkEml{
      display: inline-block;
      text-align: center;
      width: 150px;
      height: 30px;
      line-height: 30px;
      background-color: #D12653;
      border-radius: 5px;
      color:#fff;
      text-decoration: none;
      font-size: 12px;
      margin: 10px 0;
    }
    .main>p{
      margin: 0;
      line-height: 20px;
      font-size: 14px;
    }
    .main>a.link{
      display: block;
      font-size: 20px;
      line-height: 30px;
      height: 80px;
    }
  </style>
</head>
<body>
  <div class="main">
    <p>密码修改操作！</p >
    <p>点击下面的按钮重置密码。</p >
    <a class="linkEml" href="'.$url.'">重置密码</a >
    <p>如果你无法通过上面按钮验证电子邮箱，请点击下面的链接或者把它复制到浏览器地址栏。</p >
    <a class="link" href="'.$url.'">'.$url.'</a >
    <p>感谢您的使用！</p >
    <p>ProcessOn ZWHT</p >
  </div>
</body>
</html>';
        //config
        $config->mail->fromName;
        $config->mail->fromEmail;
        $config->mail->smtp->server;
        $config->mail->smtp->port;
        $config->mail->smtp->security;
        $config->mail->smtp->username;
        $config->mail->smtp->password;
        $mail = new \PHPMailer();
//        var_dump($config->mail->smtp);die;
        $mail->isSMTP();// 使用SMTP服务
        $mail->CharSet = "utf8";// 编码格式为utf8，不设置编码的话，中文会出现乱码
        $mail->Host = $config->mail->smtp->server;// 发送方的SMTP服务器地址
        $mail->SMTPAuth = true;// 是否使用身份验证
        $mail->Username = $config->mail->smtp->username;// 发送方的163邮箱用户名
        $mail->Password = $config->mail->smtp->password;// 发送方的邮箱密码，注意用163邮箱这里填写的是“客户端授权密码”而不是邮箱的登录密码！
//        $mail->SMTPSecure = "ssl";// 使用ssl协议方式
        $mail->Port = $config->mail->smtp->port;// 163邮箱的ssl协议方式端口号是465/994

        $mail->setFrom($config->mail->fromEmail,"ci点啥官方邮件提醒");// 设置发件人信息，如邮件格式说明中的发件人，这里会显示为Mailer(xxxx@163.com），Mailer是当做名字显示
        $mail->addAddress($to,$account);// 设置收件人信息，如邮件格式说明中的收件人，这里会显示为Liang(yyyy@163.com)
        $mail->addReplyTo($config->mail->fromEmail,"Reply");// 设置回复人信息，指的是收件人收到邮件后，如果要回复，回复邮件将发送到的邮箱地址
        $mail->addCC($to);// 设置邮件抄送人，可以只写地址，上述的设置也可以只写地址
        $mail->addBCC($to);// 设置秘密抄送人
        $mail->addAttachment();// 添加附件

        $mail->Subject = $tittle;// 邮件标题
        // $mail->Body = "111111111111111";// 邮件正文
        //$mail->AltBody = "This is the plain text纯文本";// 这个是设置纯文本方式显示的正文内容，如果不支持Html方式，就会用到这个，基本无用
        $mail->WordWrap    = 80; // set word wrap

        $mail->msgHTML($body);

        $mail->IsHTML(true); // send as HTML
        if(!$mail->send()){// 发送邮件
            return false;
        }else{
            return true;
        }
    }
}