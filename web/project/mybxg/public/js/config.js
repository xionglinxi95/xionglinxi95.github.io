require.config({
	baseUrl : '/public/assets',
	paths : {
		jquery : 'jquery/jquery.min',
		template : 'artTemplate/template-web',
		cookie : 'jquery-cookie/jquery.cookie',
		bootstrap : 'bootstrap/js/bootstrap.min',
		datapicker : 'bootstrap-datepicker/js/bootstrap-datepicker.min',
		language : 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
		validate : 'validate/jquery-validate.min',
		form : 'form/jquery.form',
		region : 'jquery-region/jquery.region',
		uploadify : 'uploadify/jquery.uploadify.min',
		editor : 'ckeditor/ckeditor',
		teacher_list : '../js/teacher-list',
		teacher_add : '../js/teacher-add',
		common : '../js/common',
		loginin : '../js/login',
		util : '../js/util',
		index:'../js/index',
		settings : '../js/settings',
		cource_list : '../js/cource-list',
		course_add :'../js/course-add',
		basic : '../js/basic',
		picture : '../js/picture',
	},
	shim : {
		bootstrap :{
			deps : ['jquery']
		},
		language : {
			deps: ['jquery','datapicker']
		},
		validate : {
			deps : ['jquery']
		},
		uploadify : {
      		deps : ['jquery']
   		},
		editor : {
    	  exports : 'CKEDITOR'
   		 }
	}
});