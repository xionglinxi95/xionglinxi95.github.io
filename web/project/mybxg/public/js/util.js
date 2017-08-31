define(['jquery'],function($){
	// 获取url中指定的参数值
	function qs(kry,param){
		var obj = {};
		if(param) {
			var p = param.substr(1);
			if(p){
				var arr = p.split('&');
				arr.forEach( function(element) {
					var kv = element.split('=');
					obj[kv[0]] = kv[1];
				});
			}
		}
		return obj[kry];
	}
	function setMenu(pathname){
		$('.aside .navs a[href="'+pathname+'"]').addClass('active').parent().parent().show();
	}
	return {
		qs : qs,
		setMenu : setMenu
	}
})