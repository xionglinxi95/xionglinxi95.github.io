"use strict";
$.ajax({
    url:"http://182.254.146.100:3000/api/getindexmenu",
    type:"get",
    dataType:"json",
    success:function(data){
        console.log(data);
       // var list = data.result;
        //js 原生写法请求渲染数据
        // var str = "";
        // list.forEach(function(item,index) {
        //   str +='<div class="col-xs-3">'
        //         +'<a href="'+item.titlehref+'">'
        //             +item.img
        //         +'</a>'
        //         +'<p>'+item.name+'</p>'
        //       +'</div>';
        // });
        // $("#nav_menu .row").html(str);

        // 模板
        var html =template("nav_list",data);
        $("#nav_menu .row").html(html);
        //下拉菜单
        $("#nav_menu .row>div:nth-last-child(-n+4)").hide();
        $("#nav_menu .row>div:nth-last-child(5)").click(function(){
              $("#nav_menu .row>div:nth-last-child(-n+4)").toggle(200);
        });
    },
    error:function(){
        
    }
});
$.ajax({
    url:"http://182.254.146.100:3000/api/getmoneyctrl",
    type:"get",
    dataType:"json",
    success:function(data){
       var html = template("low_price_list",data);
       $("#product_list .list_container").html(html);
    },
    error:function(e){

    }
});