/**
 * Created by admin on 2017-4-6.
 */
$(function () {
    var lunbao=document.getElementById("lunbao-l");
    var imgWidth=lunbao.offsetWidth;
    var ul=lunbao.children[0];
    var ulLiArr=ul.children;
    var ol=document.getElementById("lunbao-lie");
    var arr=document.getElementById("arr");
    var left=document.getElementById("left");
    var right=document.getElementById("right");

    for(var i=0;i<ulLiArr.length;i++){
        ulLiArr[i].style.background="url(image/"+(i+1)+".jpg) no-repeat top center";
    }
    ul.appendChild(ulLiArr[0].cloneNode(true));
    for(var i=0;i<ulLiArr.length-1;i++){
        var newLi=document.createElement("li");
        ol.appendChild(newLi);
    }
    var olLiArr=ol.children;
    olLiArr[0].className="current";

    for(var i=0;i<olLiArr.length;i++){
        olLiArr[i].index=i;
        olLiArr[i].onmouseover= function () {
            //点亮盒子（排他思想）
            for(var j=0;j<olLiArr.length;j++){
                olLiArr[j].className="";
            }
            this.className="current";
            lianimate(ul,-imgWidth*(this.index));
            tu=kuai=this.index;//同步
        }
    }
    var tu=0;//图片的索引值
    var kuai=0;//小方块的索引值
    //为右侧的小三角绑定点击事件
    right.onclick= function () {
        tu++;
        if(tu===5){
            ul.style.left=0;
            tu=1;
        }
        kuai++;
        if(kuai===4){
            kuai=0;
        }
        for(var j=0;j<olLiArr.length;j++){
            olLiArr[j].className="";
        }
        olLiArr[kuai].className="current";
        lianimate(ul,-imgWidth*tu);
    }

    left.onclick= function () {
        tu--;
        if(tu === -1){
            ul.style.left= -imgWidth*4+"px";//最后一张图片
            tu=3;
        }
        kuai--;
        if(kuai === -1){
            kuai=3;
        }
        for(var j=0;j<olLiArr.length;j++){
            olLiArr[j].className="";
        }
        olLiArr[kuai].className="current";
        lianimate(ul,-imgWidth*tu);

    }

    var timer=setInterval(right.onclick,2000);
    lunbao.onmouseover= function () {
        arr.style.display="block";
        clearInterval(timer);
    }
    lunbao.onmouseout= function () {
        arr.style.display="none";
        timer=setInterval(right.onclick,2000);
    }


//            //高亮显示列表
    var ul1=document.getElementById("liu-ul");
    var liArr=ul1.children;
    var color="";

    for(var i=0;i<liArr.length;i++){
        liArr[i].onmouseover= function () {
            color=this.style.backgroundColor;
            this.style.backgroundColor="#fafafa";
        }
        liArr[i].onmouseout= function () {
            this.style.backgroundColor=color;
        }
    }


});

$(function () {

$(".liu-tab").click(function () {
    $(this).addClass("current1").siblings().removeClass("current1");

    var index=$(this).index();
    $(".liu-banner div").eq(index).show().siblings().hide();

    //$(".liu-banner .liu-right ul").siblings().css("opacity",0.5);
});

});

$(function () {
    $(".liu-banner .liu-right ul li a img").mouseenter(function () {
        $(this).css("opacity",0.7);
        //把其它的元素的opacity 0.5
        $(this).siblings().css("opacity",1);
    });
    $(".liu-banner .liu-right ul li a img").mouseleave(function () {
        $(this).css("opacity",1);
    });


    $(".liu-tup .w .liu-tup1 .liu-huan").mouseenter(function () {
        $(this).css("opacity",0);
        //$(this).siblings().css("opacity",1);
    });

    $(".liu-tup .w .liu-tup1 .liu-huan").mouseleave(function () {
        $(this).css("opacity",1);
    });

    $(".liu-tup .w .liu-tup2 .liu-dong").mouseenter(function () {
        $(this).css("opacity",0);
    });

    $(".liu-tup .w .liu-tup2 .liu-dong").mouseleave(function () {
        $(this).css("opacity",1);
    });


    $(".liu-main .main-top ul li").mouseenter(function () {
        $(this).css("opacity",0.9);
    });
    $(".liu-main .main-top ul li").mouseleave(function () {
        $(this).css("opacity",1);
    });

    $(".liu-main .main-top ul #liu-m").mouseenter(function () {
        $(this).children(1).children(2).show();
    });

    $(".liu-main .main-top ul #liu-m").mouseleave(function () {
        $("#reu3").hide();
    });

    $(".liu-main .main-top ul #liu-m1").mouseenter(function () {
        $(this).children(1).show();
    });

    $(".liu-main .main-top ul #liu-m1").mouseleave(function () {
        $("#reu4").hide();
    });

    $(".liu-main .main-top #liu-animate .liu-an1").mouseenter(function () {
        $(this).children(1).show();
        $(this).children(2).show();
    });

    $(".liu-main .main-top #liu-animate .liu-an1").mouseleave(function () {
        $("#liu_mask").hide();
        $("#mask-cont").hide();
    });

    $(".liu-main .main-top #liu-animate .liu-an1 .mask-cont .mask-cont1 ul li a img").mouseenter(function () {
        $(this).css("opacity",0.8);
    });

    $(".liu-main .main-top #liu-animate .liu-an1 .mask-cont .mask-cont1 ul li a img").mouseleave(function () {
        $(this).css("opacity",1);
    });

});

