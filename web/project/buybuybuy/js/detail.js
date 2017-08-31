// 
var searchId = getKeyValue();
var pageid = parseInt(searchId.pageid)||1;
$.ajax({
	url:"http://182.254.146.100:3000/api/getcategorybyid?categoryid="+searchId.categoryid,
	type:"get",
	dataType:"json",
	success:function(data){
		console.log(data);
		console.log($('#detail .breadcrumb li:nth-child(3)'));
		$('#detail .breadcrumb li:nth-child(3)').html(data.result[0].category);
	}
});
$.ajax({
	url:"http://182.254.146.100:3000/api/getproductlist?categoryid="+searchId.categoryid+"&pageid"+pageid,
	type:'get',
	dataType:'json',
	success:function(data){

		var html = template('product_data',data);
		$('#main_body').html(html);

		var pages = Math.ceil(data.totalCount/data.pagesize);
		for(var i=1 ; i<=pages;i++){	
			$('#paging .dropdown-menu li:nth-child('+i+')').html("第"+i+"页");
			var index = i;
			$('#paging .dropdown-menu li:nth-child('+i+') a').click(function(i){
				return function(){
					console.log('i='+i);
					$('#paging .dropdown-menu li:nth-child('+i+') a').attr('href','http://www.xm.com/study/project3/detail.html?categoryid='+searchId.categoryid+'&pageid='+i);
					pageid = i;
					}
				
			}(i))

		}


		console.log(pages);
		//分页
		console.log((pageid -1)>1?pageid-1:1);
		var prev_href = 'http://www.xm.com/study/project3/detail.html?categoryid='+searchId.categoryid+'&pageid='+((pageid -1)>1?pageid-1:1);
		var next_href = 'http://www.xm.com/study/project3/detail.html?categoryid='+searchId.categoryid+'&pageid='+(pageid<pages?pages+1:pages);
		$("#paging .prev").attr('href',prev_href);
		$("#paging .next").attr('href',next_href);

	}
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
console.log(searchId.categoryid);

// http://mmb.ittun.com/api/getproduct?productid=1