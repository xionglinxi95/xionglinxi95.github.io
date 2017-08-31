var obj = getKeyValue();
var categoryId = parseInt(obj.categoryId);
var productId = parseInt(obj.productId);
$.ajax({
 url:'http://182.254.146.100:3000/api/getcategorybyid?categoryid='+categoryId,
 type:'get',
 dataType:'json',
 success:function(data){
 	console.log(data);
 	var html = template('product_id',data);
 	$('#detail .breadcrumb').append(html);
 	$.ajax({
 		url:'http://182.254.146.100:3000/api/getproduct?productid='+productId,
 		// url:'http://182.254.146.100:3000/api/getproductlist?categoryid='+categoryId,
 		type:'get',
 		dataType:'json',
 		success:function(data){
 			console.log(data);
 			var html = template('product_name',data);
 			$('#detail .breadcrumb').append(html);
 			$.ajax({
 				url:'http://182.254.146.100:3000/api/getproduct?productid='+productId,
 				type:'get',
 				dataType:'json',
 				success:function(data){
 					var html = template('product_img',data);
 					$('#main_body .photo').html(html);
 				}
 			})

 		}
 	})

 }
})

$('#compare .row #morediscussmore').click(function(){
 		console.log($('#compare .row #morediscussmore'));
 		$.ajax({
 			url:'http://182.254.146.100:3000/api/getproductcom?productid='+productId,
 			type:'get',
 			dataType:'json',
 			success:function(data){
 				console.log(data);
 				var html = template('discussmy',data);
 				$('#discuss').append(html);
 			}
 		})
 	})

function getKeyValue() {
	// location.search()这个方法得到URL的键值对（?categoryid=112&pageid=1）
	//qs获取的是去除问号的后面的键值对 categoryid=112&pageid=1
	var qs = location.search.length >1 ?location.search.substr(1):'';
	//得到一个数组[categoryid=112,pageid=1]
	var items = qs.length>1?qs.split('&'):[];
	var obj={},key,value,item;
	for(var i=0;i<items.length;i++){
		item = items[i].split('=');
		key = item[0];
		value = item[1];
		obj[key] = value;
	}
	return obj;
}
console.log(categoryId);
console.log(productId);
