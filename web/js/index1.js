$(function () {
    var pic=0;
    //轮播图
    $("#slider .slder-item>ul>li").mouseenter(function () {
        $(this).addClass("color-red").siblings("li").removeClass("color-red");
        //设置当前的li的索引对应的轮播图中的li显示,其他的li隐藏
        $("#slider .lunbotu>li").fadeOut(200);//所有的轮播图中的li都隐藏啦,哦买噶的
        $("#slider .lunbotu>li:eq("+$(this).index()+")").fadeIn(200);
        pic=$(this).index();
        // var imgWidth=$("#slider").width();
        // var index=$(this).index();
        // $("#slider .lunbotu").animate({"left":-index*imgWidth});
    });

    //自动播放
    var setId=setInterval(function () {
        $("#slider>.pages").children("a:last").click();
    },500);

    $("#slider").mouseenter(function () {
       $("#slider>.pages").css("opacity",1);
        clearInterval(setId);
    }).mouseleave(function () {
        $("#slider>.pages").css("opacity",0);
        setId=setInterval(function () {
            $("#slider>.pages").children("a:last").click();
        },500);
    });
    
    //右边按钮
    $("#slider>.pages").children("a:last").click(function () {
        if(pic==$("#slider .lunbotu>li").length-1){
            pic=0;
        }
        pic++;
        $("#slider .lunbotu>li").fadeOut(200);//所有的轮播图中的li都隐藏啦,哦买噶的
        $("#slider .lunbotu>li:eq("+pic+")").fadeIn(200);
        if(pic==$("#slider .lunbotu>li").length-1){
            $("#slider .slder-item>ul>li:eq(0)").addClass("color-red").siblings("li").removeClass("color-red");
        }else{
            $("#slider .slder-item>ul>li:eq("+pic+")").addClass("color-red").siblings("li").removeClass("color-red");
        }

    });
    
    //左边按钮
    $("#slider>.pages").children("a:first").click(function () {
       if(pic==0){
           pic=$("#slider .lunbotu>li").length-1;
       }
        pic--;
        $("#slider .lunbotu>li").fadeOut(200);//所有的轮播图中的li都隐藏啦,哦买噶的
        $("#slider .lunbotu>li:eq("+pic+")").fadeIn(200);
        $("#slider .slder-item>ul>li:eq("+pic+")").addClass("color-red").siblings("li").removeClass("color-red");
    });
});
