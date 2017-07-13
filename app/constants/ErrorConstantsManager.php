<?php
namespace Company\Constants;

class ErrorConstantsManager {
	public static $errorMessageList=array(
			200=>'操作成功',
			201=>'操作成功！我们已经向您的新邮箱发送了邮件，请到邮箱确认链接！',
			400=>'语义有误或请求参数有误',
			401=>'用户已存在',
			404=>'请求所希望得到的资源未被在服务器上发现',
			405=>'用户已经登陆，不能重复登陆',
			406=>'用户信息保存失败，请联系管理员',
			407=>'非法访问',
			408=>'新闻置顶数不得少于两个！否则会对首页布局有影响！',
			409=>'openid不能为空',
			410=>'昵称不能为空',
			411=>'密码修改完成！请登陆！',
			412=>'手机号不能为空',
			413=>'手机号格式不正确',
			414=>'用户尚未登陆',
			415=>'手机号已存在',
			416=>'版本号格式不正确,必须为数字',
			417=>'昵称已存在',
			418=>'本月尚未做任何签到',
			419=>'导航ID不存在！请重新选择！',
			420=>'名称不能为空！',
			421=>'名称已经存在！',
			422=>'轮播ID不存在',
			423=>'提现金额不能大于用户余额',
			424=>'类型不能为空',
			425=>'对应游戏不存在，或者未选择游戏，请重新选择！',
			426=>'内容不能为空！',
			427=>'错误的游戏类型',
			450=>'密码错误',
			451=>'用户名不存在',
			452=>'密码错误',
			453=>'手机号或openid为空',
			454=>'密码或确认密码为空',
			455=>'密码修改失败',
			456=>'两次密码不一致',
			457=>'错误的游戏风格',
			458=>'邮箱验证通过！',
			459=>'不存在的兑换类型',
			460=>'请求参数不存在，请重新操作！',
			461=>'错误的游戏平台',
			462=>'错误的国家',
			463=>'游戏不存在，请重新选择！',
			464=>'文章不存在，请重新选择！',
			465=>'头像地址不能为空',
			466=>'已经成功放入回收站！',
			467=>'该类别已存在，请重新输入！',
			468=>'操作失败！请联系管理员！',
			469=>'错误的游戏类别',
			470=>'错误的评论类别',
			471=>'目标手机号格式不正确',
			472=>'目标用户不存在',
			473=>'激活码已过期',
			474=>'未收到文件或文件无法保存',
			475=>'请管理员登陆！',
			476=>'接收文件权限赋予失败！',
			477=>'您尚未填写邮箱，或邮箱未通过验证，建议补全邮箱信息，以免账号丢失无法找回！',
			478=>'非常抱歉！您的邮箱没有经过验证，或者没有邮箱地址，请联系管理员修改密码！',
			479=>'IP不能为空！',
			480=>'非法请求！',
			481=>'已经是好友关系',
			482=>'已经向您的邮箱发送了邮件，请登陆邮箱重置您的密码！',
			483=>'错误的用户ID，请重新操作！',
			484=>'赠送人不能为空！',
			485=>'数量不能为空！',
			486=>'删除人不能为空！',
			487=>'验证码不能为空！',
			488=>'验证码错误！',
			489=>'密码不能为空！',
			490=>'数量必须大于0！',
			491=>'无效操作！',
			492=>'登陆超时！请重新登陆！',
			493=>'请输入要查询的昵称\ID',
			999=>'其他错误：',
	);
}