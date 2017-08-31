define(['jquery','template','util'],function($,template,util){

	util.setMenu(location.pathname);
	$.ajax({
		url : '/api/course',
		dataType : 'json',
		type : 'get',
		success : function(data){
			var html = template('courseTpl',{list:data.result});
			$('#courseInfo').html(html);
		}
	})
})