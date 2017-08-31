
$(function () {

    var box = document.getElementById("all");
    var screen = document.getElementById("screen");
    //图片的宽

    var ul = document.getElementById("ul");
    var ulLiArr = ul.children;
    var ol = screen.children[1];
    var arr = screen.children[2];
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var liWidth = ulLiArr[0].offsetWidth

    //复制第一个li添加到ul的最末尾
    ul.appendChild(ulLiArr[0].cloneNode(true));
    //添加ol中li的个数===ul中li的个数-1;
    for(var i=0;i<ulLiArr.length-1;i++){
        var newLi = document.createElement("li");
        ol.appendChild(newLi);
    }
    //点亮ol中的li中的第一个;   类名+current
    var olLiArr = ol.children;
    olLiArr[0].className = "current";
    //for循环绑定事件；
    for(var i=0;i<olLiArr.length;i++){
        //自定义属性;
        olLiArr[i].index = i;
        olLiArr[i].onmouseover = function () {
            //1.点亮盒子(排他思想)
            for(var j=0;j<olLiArr.length;j++){
                olLiArr[j].className = "";
            }
            this.className = "current";
            //2.移动ul(利用animate());
            anima(ul,-liWidth*this.index);
            //bug: li标签移动ul,和自定义索引值没有同步;
            key = square = this.index;//同步;
        }
    }

    //3.点击右侧的小三角，滑动到下一张；(案例2)
    //思路:自定义索引值;(定义两个索引值,一个给小方块用,一个给图片用)
    var key = 0;//模拟图片的索引值
    var square = 0;//模拟小方块的索引值
    //为右侧的小三角绑定点击事件.
    right.onclick = autoPlay;


    //4.点击左侧的小三角，滑动到上一张；(案例2)
    //和右侧按钮的逻辑相反;
    left.onclick = function () {
        //思路: 1.索引值自增(无缝滚动);   2.点亮盒子;    3.移动ul;

        //1.索引值自减(无缝滚动)
        key--;//图片的索引值要收到约束;
        //(无缝滚动原理: 瞬间闪动到最后一张,在从倒数一张滑动到倒数第二张)
        //key的索引值最小到0.等于-1的时候, 瞬间闪动到倒数第一张,在从倒数第一张滑动到倒数第二张;
        if(key === -1){
            //闪动到倒数第一张;
            ul.style.left = -liWidth*3+"px";//最后一张图片显示的时候,ul的left值为5张图片的宽px;
            //滑动到第二张(索引值为4)
            key = 2;
        }

        square--;//小方块的索引值要收到约束;(简单)
        //square的最小值为0;  到-1的时候把值设置为4;代表最后一个!
        if(square === -1){
            square = 2;
        }

        //2.点亮盒子;
        for(var j=0;j<olLiArr.length;j++){
            olLiArr[j].className = "";
        }
        olLiArr[square].className = "current";
        //3.移动ul;
        anima(ul,-liWidth*key);
    }

    //5.添加定时器；(案例2:和右侧小三角逻辑一样)
    var timers = setInterval(autoPlay,5000);
    //鼠标进入清除定时器,移开再次开启定时器
    //鼠标进入显示,移开隐藏;
    box.onmouseenter = function () {

        arr.style.display = "block";
        clearInterval(timers);
    }
    box.onmouseleave = function () {
        arr.style.display = "none";
        timers = setInterval(autoPlay,5000);
    }




    //右侧小三角的方法封装
    function autoPlay() {
        //思路: 1.索引值自增(无缝滚动);   2.点亮盒子;    3.移动ul;

        //1.索引值自增(无缝滚动)
        key++;//图片的索引值要收到约束;
        //(无缝滚动原理: 瞬间闪动到第一张,在从第一张滑动到第二张)
        //key的索引值最大到5.等于6的时候, 瞬间闪动到第一张,在从第一张滑动到第二张;
        if(key === 4){
            //闪动到第一张;
            ul.style.left = 0;//第一张图片显示的时候,ul的left值为0;
            //滑动到第二张(索引值为1)
            key = 1;
        }

        square++;//小方块的索引值要收到约束;(简单)
        //square的最大值为4;  到5的时候把值设置为0;代表第一个!
        if(square === 3){
            square = 0;
        }

        //2.点亮盒子;
        for(var j=0;j<olLiArr.length;j++){
            olLiArr[j].className = "";
        }
        olLiArr[square].className = "current";
        //3.移动ul;
        anima(ul,-liWidth*key);
    }



    //定时器
    var box = document.getElementsByClassName("br_time")[0];
    //1.定义一个定时器
    var timer = setInterval(function () {
        //2.在定时器里面获取未来时间和当前时间,获取他们的差值;
        var nowTime = new Date();
        var futureTime = new Date("2018/4/9 17:14:00");
        //获取毫秒的差值;
        var ss = futureTime.getTime() - nowTime.getTime();
        //如果ss的差值<0了,就直接停止定时器;
        if(ss<=0){
            clearInterval(timer);
        }
        //3.把毫秒的差值转换成天时分秒赋值给box;
        var day = parseInt(ss/1000/60/60/24);//要完整天,不足的让小时时分秒显现
        var hour = parseInt(ss/1000/60/60%24);//不足一天的用小时显示;取整;
        var minute = parseInt(ss/1000/60%60);//不足一小时的用分钟显示;取整;
        var second = parseInt(ss/1000%60);//不足一分钟的用秒钟显示;取整;
        var millis = parseInt(ss%1000);//不足一分钟的用秒钟显示;取整;
        //补0;
        day = day<10?"0"+day:day;
        hour = hour<10?"0"+hour:hour;
        minute = minute<10?"0"+minute:minute;
        second = second<10?"0"+second:second;
        //毫秒特殊处理;
        if(millis<10){
            millis = "00"+millis;
        }else if(millis<100){
            millis = "0"+millis;
        }
        //赋值:
        //box.innerHTML = "剩"+day+"天";
        box.innerHTML = "剩"+day+"天"+hour+"小时"+minute+"分"+second+"秒";
    },1);

    $("#img").mouseenter(function () {
            /*
             * 1:到达的事件
             * 2：opacity 到达的模糊度.
             * */
            $("#img").fadeTo(100,0.3);
            $("#img").fadeTo(100,1);
            //$("#img").animate({"opacity": 1}, 100);
        }
    );


})
 //封装一个方法,可以按照目标目标值移动盒子;
        function anima(ele,target){
            //要用定时器,先清除定时器;
            clearInterval(ele.timer);
            //每个盒子一个定时器;把定时器作为盒子的属性设置;(自定义属性)
            ele.timer = setInterval(function () {
                //步长不能永远为10; 因为步长的取值要经过计算;
                var step = target>ele.offsetLeft?10:-10;
                //移动盒子
                ele.style.left = ele.offsetLeft + step + "px";

                //判断:到达目标位置停止定时器
                //解决小数问题;  目标位置和当前位置之间的距离不足一个步长的时候;
                if(Math.abs(target-ele.offsetLeft) <= Math.abs(step)){
                    //设置目标位置为target,并清除定时器;
                    ele.style.left = target + "px";
                    clearInterval(ele.timer);
                }
            },10);
        }
