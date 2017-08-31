$.ajax({

	url:"http://182.254.146.100:3000/api/getcategorytitle",
	type:'get',
	dataType:'json',
	success:function(data){
		console.log(data);
		var html = template('product-list',data);
		$('#product_list #accordion .panel-default').html(html);
		$('#product_list #accordion .panel-default .panel-heading a').click(function(){
			var titleid = $(this).data('titleid');
			// console.log(titleid);
			var $row = $(this).parent().parent().siblings().find('.panel-body>.row');
			console.log($row);
			if($row.children().length==0){
				$.ajax({
					url:"http://182.254.146.100:3000/api/getcategory?titleid="+titleid,
					type:'get',
					dataType:'json',
					success: function(data){
						console.log(data);
						var html = template('product-display',data);
						// console.log(html);
						$row.html(html);
						console.log(data.result[0].category)
					}
				});
			}
		})
		

	},
	error:function(){

	}
});