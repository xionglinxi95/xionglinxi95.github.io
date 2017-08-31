define(['jquery','util','validate','form'],function($,util){

	util.setMenu(location.pathname);
	$('#courseForm').validate({
		sendForm : false,
		valid : function(){
			$(this).ajaxSubmit({
				type:'post',
				url : '/api/course/create',
				dataType : 'json',
				success : function(data){
					if(data.code == 200){
						location.href = '/course/basic?type=1&cs_id=' + data.result.cs_id;
					}
				}
			})
		}
	});
		
})