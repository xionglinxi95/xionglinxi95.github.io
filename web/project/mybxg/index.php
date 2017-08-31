<?php
	// 后端路由
	// 路由：根据路径的不同可以导航到对应的页面
	$pathname = 'index';
	$filename = 'index';
	// isset是一个返回值为bool类型的函数,isset是判断一个变量是否定义过 即使它没有值,返回值也是true
	// $_SERVER 服务器端的一些命令
	if(isset($_SERVER['PATH_INFO'])){
		// path-info获取的是路径
		$urlpath = $_SERVER['PATH_INFO'];
		$str = substr($urlpath,'1');
		// 分割字符串（与js的split类似）
		$arr = explode('/', $str);
		if(count($arr)==2){
			$pathname = $arr[0];
			$filename = $arr[1];
		}
	}else {
		$filename = 'login';
	}

	// 把参数指定的url对应的文件内容嵌入到当前位置
	include('./view/'.$pathname.'/'.$filename.'.html');
?>