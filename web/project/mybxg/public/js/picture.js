define(['jquery','template','util','uploadify'],function($,template,util){

	util.setMenu('/course/course_add');

	var csid = util.qs('cs_id',location.search);
	var type = util.qs('type',location.search);
	$.ajax({
		type :'get',
		url : '/api/course/picture',
   		data : {cs_id : csid},
   		dataType :'json',
   		success : function(data){
   			if(type == 1){
      		  data.result.operate = '课程添加';
    		  }else{
      		  data.result.operate = '课程编辑';
      		}
      		var html = template('pictureTpl',data.result);
      		$('#pictureInfo').html(html);
      		$('#upfile').uploadify({
      			width : 80,
      			height : 'auto',
      			itemTemplate : '<span></span>',
      			buttonText : '上传图片',
      			buttonClass : 'btn btn-success btn-sm',
      			fileObjName :'cs_cover_original',
      			swf : '/public/assets/uploadify/uploadify.swf',
      			formData : {cs_id :csid},
      			uploader : '/api/uploader/cover',
      			opUploadSucess : function(a,b){
      				var obj = JSON.parse(b);
      				$('#pictureInfo .preview img').attr('src',obj.reault.path);
      			}
      		})
   		}
	})	
})