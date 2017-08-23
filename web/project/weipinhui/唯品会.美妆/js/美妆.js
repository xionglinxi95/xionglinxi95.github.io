/**
 * Created by shiwensheng on 2017/4/5.
 */
    $(function () {
        //logo图
        setInterval(function () {
            $("#headCon h1 img").attr("src","images/1481820254325.png")
        },1500)




        //轮播图
        var wsbox = document.getElementsByTagName("ws-lunbo")[0]
        var olLunbo = document.getElementsByClassName("ollunbo")[0]
        var olArr = olLunbo.children;
        var ul = document.getElementsByClassName("wsul")[0]
        var firstLi = document.getElementsByClassName("ws-show")[0]


        var lunboWidth = olArr[1].offsetWidth;


        olLunbo.appendChild(olArr[0].cloneNode(true));
        //添加ol中li的个数===ul中li的个数-1;
        for(var i=0;i<olArr.length-1;i++){
            var newLi = document.createElement("li");
            //添加内容
            ul.appendChild(newLi);
        }
        //点亮ol中的li中的第一个;   类名+current
        var dianArr = ul.children;
        dianArr[0].style.backgroundColor = "#E4E3E0";


        //2.ol中的所有li绑定事件，滑动轮播逻辑(案例1)
        //for循环绑定事件；
        for(var i=0;i<dianArr.length;i++){
            //自定义属性;
            dianArr[i].index = i;
            dianArr[i].onmouseover = function () {
                //1.点亮盒子(排他思想)
                for(var j=0;j<dianArr.length;j++){
                    dianArr[j].style.backgroundColor = "#FFFFFF";
                }
                this.style.backgroundColor = "#E4E3E0";
                //2.移动ul(利用animate());
                animateh(olLunbo,-lunboWidth*this.index);
                //bug: li标签移动ul,和自定义索引值没有同步;
                //同步;
                key = square = this.index;
            }
        }

        //3.点击右侧的小三角，滑动到下一张；(案例2)
        //思路:自定义索引值;(定义两个索引值,一个给小方块用,一个给图片用)
        var key = 0;//模拟图片的索引值
        var square = 0;//模拟小方块的索引值
        //为右侧的小三角绑定点击事件.





        //5.添加定时器；(案例2:和右侧小三角逻辑一样)
        var lunbotimer = setInterval(autoPlay,2000);
        //鼠标进入清除定时器,移开再次开启定时器
        //鼠标进入显示,移开隐藏;
        //wsbox.onmouseover = function () {
        //    clearInterval(lunbotimer);
        //}
        $(".ws-lunbo").mouseenter(function () {
            clearInterval(lunbotimer);
        })
        $(".ws-lunbo").mouseleave(function () {
            lunbotimer = setInterval(autoPlay,2000);
        })





        //右侧小三角的方法封装
        function autoPlay() {
            //思路: 1.索引值自增(无缝滚动);   2.点亮盒子;    3.移动ul;

            //1.索引值自增(无缝滚动)
            key++;//图片的索引值要收到约束;
            //(无缝滚动原理: 瞬间闪动到第一张,在从第一张滑动到第二张)
            //key的索引值最大到5.等于6的时候, 瞬间闪动到第一张,在从第一张滑动到第二张;
            if(key === 5){
                //闪动到第一张;
                olLunbo.style.left = 0;//第一张图片显示的时候,ul的left值为0;
                //滑动到第二张(索引值为1)
                key = 1;
            }

            square++;//小方块的索引值要收到约束;(简单)
            //square的最大值为4;  到5的时候把值设置为0;代表第一个!
            if(square === 4){
                square = 0;
            }

            //2.点亮盒子;
            for(var j=0;j<dianArr.length;j++){
                dianArr[j].style.backgroundColor = "#FFFFFF";
            }
            dianArr[square].style.backgroundColor = "#E4E3E0";
            //3.移动ul;
            animateh(olLunbo,-lunboWidth*key);
        }





        //图片闪动效果
        $('.ws-new img,.ws-nav img,.ws-hot img,.ws-hot-gt img').on('mouseenter',function(){
            $(this).css('opacity','0.7')
            var _this = this;
            setTimeout(function () {
                $(_this).css('opacity','1')
            },600)


        })
        $('.ws-new img').on('mouseleave',function(){
            $(this).css('opacity','1')
        })



        //1.定义一个定时器
        var timer = setInterval(function () {
            //2.在定时器里面获取未来时间和当前时间,获取他们的差值;
            var nowTime = new Date();
            var futureTime = new Date("2017/5/1 10:00:00");

            //获取毫秒的差值;
            var ss = futureTime.getTime() - nowTime.getTime();

            //如果ss的差值<0了,就直接停止定时器;
            if(ss<=0){
                clearInterval(timer);
                return;
            }


            //3.把毫秒的差值转换成天时分秒赋值给box;
            var day = parseInt(ss/1000/60/60/24);//要完整天,不足的让小时时分秒显现
            var hour = parseInt(ss/1000/60/60%24);//不足一天的用小时显示;取整;
            var minute = parseInt(ss/1000/60%60);//不足一小时的用分钟显示;取整;
            var second = parseInt(ss/1000%60);//不足一分钟的用秒钟显示;取整;

            //补0;

            hour = hour<10?"0"+hour:hour;
            minute = minute<10?"0"+minute:minute;
            second = second<10?"0"+second:second;
            //毫秒特殊处理;


            //赋值:
            $(".hour").html(hour)
            $(".monute").html(minute)
            $(".second").html(second)

        },1);



    })


