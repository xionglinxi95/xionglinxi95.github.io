var $load = $('.load4 ');
$.ajax({
	url:'http://182.254.146.100:3000/api/getinlanddiscount',
	type:'get',
	dataType:'json',
	beforeSend:function(){
		$load.show();
	},
	success:function(data){
		console.log(data);
		// render(data);
		var newDate = data.result;
		var i=0,size=6;
		var templateData = [];
		console.log('newDate='+newDate.result);
		for(i;i<size;i++){
			templateData.push([newDate[i]);	
			console.log(templateData);
		}
		render(templateData);
		var maxHeigth = $(".goodsListBox ul").height() - $(window).height();
        $(window).scroll(function(){
            var scrollTop = $(window).scrollTop();
            // 需要进行加载
           if( templateData.length != newData.length){
                if ( scrollTop >= maxHeigth ){
                    $load.show();
                    for ( var j =i; j< i+size; j++ ){
                        // 当 j = 19 的时候， tempList.length < newData.length 这个条件依然 成立，此时的 j =20 
                        // 因此会导致 newData[20] 导致 索引越界
                        if ( templateData.length < newData.length ){   
                            templateData.push(newData[j]);
                        }
                    }
                //maxHeigth == 99999;
                i =j;
                //console.log(tempList)
                render(templateData);
                console.log($(window).height())
                maxHeigth = $(".goodsListBox ul").height() - $(window).height();
                }
            }
        
        });
	}
});

function render(templateData){
	var html = template('goodsListBox',{result:templateData});
	$('#sly_goodsDiscount .clearfix').html(html);
	$load.hide();
}

