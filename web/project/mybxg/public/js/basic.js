define(['jquery','template','util','editor','validate','form'],function($,template,util,CKEDITOR){

	util.setMenu('/course/course_add');

	//完成编辑功能

	var csId =  util.qs('cs_id',location.search);
	var type =  util.qs('type',location.search);
	// if(csid){
		$.ajax({
			type : 'get',
			url : '/api/course/basic',
			data : {
				cs_id : csId
			},
			dataType : 'json',
			success : function(data){
				if(!type){
					data.result.operate = '课程编辑';
				}
				else {
					data.result.operate = '课程添加';
				}
				var html = template('courseTpl',data.result);
				$('#courseInfo').html(html);

				$('#firsetType').change(function(){
					$.ajax({
						type : 'get',
						url : '/api/category/child',
						data : {cg_id : $(this).val()},
						dataType :'json',
						success : function(data){
							console.log(1111);
							var tpl = '<option value="">清选择二级分类</option>'
                      + '{{each list}}'
                      + '<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>'
                      + '{{/each}}';
                      var html = template.render(tpl,{list:data.result});
                      $('#secendType').html(html);
						}
					})
				});
				// 处理富文本
				CKEDITOR.replace('editor');

				// 处理表单的提交
				$('#basicForm').validate({
					sendForm : false,
					valid : function(){
						for(var key in CKEDITOR.keys){
							CKEDITOR.keys(key).updateElement();
						}
						// 表单提交
						$(this).ajaxSubmit({
							type : 'post',
							url : '/api/course/update/basic',
            				data : {cs_id : csId},
            				success : function(data){
            					if(data.code == 200){
            						location.href = '/course/pictures?cs_id=' + data.result.cs_id + '&type=' + type;
            					}
            				}
						})
					}
				})
			}

		})
	// }

})