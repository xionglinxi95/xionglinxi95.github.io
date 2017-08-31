define(['jquery','template','util','datapicker','language','validate','form'],function($,template,util){

	// 添加讲师
	// var html = template('teacherTpl',{tc_operate : '添加讲师',tc_gender：'0'});
	// 设置导航菜单的选中
	// $('.aside .navs a[href="/teacher/list"]').addClass('active');
	util.setMenu('/teacher/list');
	
	// 获取讲师的id
	var tcId = util.qs('tc_id',location.search);
	// console.log(tcId);

	if(tcId){
		$.ajax({
			type : 'get',
			url : '/api/teacher/edit',
			data : {tc_id : tcId},
			dataType :'json',
			success : function(data){
				data.result.tc_operate = '编辑讲师';
				var html = template('teacherTpl',data.result);
				$('#teacherInfo').html(html);
				// $('#addBtn').click(function(){
				// 	location.submitForm('/api/teacher/update');
				// });
				submitForm('/api/teacher/update');
			}
		});
	}else {
		var html = template('teacherTpl',{tc_operate : '添加讲师',tc_gender : 0})
		$('#teacherInfo').html(html);
		// $('#addBtn').click(function(){
		// 	location.submitForm('/api/teacher/add');
		// });
		submitForm('/api/teacher/add');
	}

	function submitForm(url){
    $('#addForm').validate({
      sendForm : false,
      valid : function(){
        // 提交表单
        // submitForm('/api/teacher/add');
        $('#addForm').ajaxSubmit({
          type : 'post',
          url : url,
          dataType : 'json',
          success : function(data){
            if(data.code == 200){
            	console.log(123);
              location.href = '/teacher/list';
            }
          }
        });
      },
      description : {
        tc_name : {
          required : '用户名不能为空'
        },
        tc_pass : {
          required : '密码不能为空',
          pattern : '密码只能是6位数字'
        },
        tc_join_date : {
          required : '入职日期必须选择'
        }
      }
    });
  }

	// 绑定表单提交事件
	// $('#addBtn').click(function(){
	// 	$.ajax({
	// 		type : 'post',
	// 		url : '/api/teacher/add',
	// 		data : $('#addForm').serialize(),
	// 		dataType : 'json',
	// 		success : function(data){
	// 			console.log(111);
	// 			if(data.code == 200){
	// 				location.href = '/teacher/list';
	// 			}
	// 		}
	// 	})
	// 	// alert(1);
	// })

});