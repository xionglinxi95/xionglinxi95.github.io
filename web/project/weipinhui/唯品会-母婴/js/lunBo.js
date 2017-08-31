/**
 * Created by 1234 on 2017/4/7.
 */
$(function (){
    //需求: 无缝滚动;(原理:复制第一张到最末尾,然后第二轮从第一张滑动到第二张的时候,瞬间闪动到第一张,在从第一张滑动到第二张 )

    //1.点亮ul中的第一个li;
    //2.ul中的所有li绑定事件，滑动轮播逻辑(案例1)
    //3.点击右侧的小三角，滑动到下一张；(案例2)
    //4.点击左侧的小三角，滑动到上一张；(案例2)
    //5.添加定时器；(案例2:和右侧小三角逻辑一样)

    //1.点亮ul中的第一个li;
    var ul = document.getElementById("hezi");
    var ulLiArr = ul.children;
    ulLiArr[0].className = "current" ;
    var ol = document.getElementById("tupian");
    var img = document.getElementById("imgwidth");
    var imageWidth = img.offsetWidth;
    var right = document.getElementById("right");
    var left = document.getElementById("left");

    //console.log(imageWidth);

    //2.ul中的所有li绑定事件，滑动轮播逻辑(案例1)
    for(var i=0;i<ulLiArr.length;i++){
        ulLiArr[i].index = i;
        //console.log(i);
        ulLiArr[i].onmouseover = function (){
            for(var j=0;j<ulLiArr.length;j++){
                ulLiArr[j].className = "";
            }
            this.className = "current";
            console.log(imageWidth);
            animate1(ol,-imageWidth*this.index)
            key = square = this.index;
        }
    }

    //3.点击右侧的小三角，滑动到下一张；(案例2)
    var key = 0;
    var square = 0;
    right.onclick = autoPlay;

    //5.添加定时器；(案例2:和右侧小三角逻辑一样)
    var timer = setInterval(autoPlay,2000);
    //鼠标进入清除定时器,移开再次开启定时器
    //鼠标进入显示,移开隐藏;
    img.onmouseover = function () {
        //arr.style.display = "block";
        clearInterval(timer);
    }
    img.onmouseout = function () {
        //arr.style.display = "none";
        timer = setInterval(autoPlay,2000);
    }



    //右侧小三角的方法封装
    function autoPlay() {
        //思路: 1.索引值自增(无缝滚动);   2.点亮盒子;    3.移动ul;

        //1.索引值自增(无缝滚动)
        key++;//图片的索引值要收到约束;
        //(无缝滚动原理: 瞬间闪动到第一张,在从第一张滑动到第二张)
        //key的索引值最大到5.等于6的时候, 瞬间闪动到第一张,在从第一张滑动到第二张;
        if(key === 3){
            //闪动到第一张;
            ol.style.left = 0;//第一张图片显示的时候,ul的left值为0;
            //滑动到第二张(索引值为1)
            key = 1;
        }

        square++;//小方块的索引值要收到约束;(简单)
        //square的最大值为4;  到5的时候把值设置为0;代表第一个!
        if(square === 3){
            square = 0;
        }

        //2.点亮盒子;
        for(var j=0;j<ulLiArr.length;j++){
            ulLiArr[j].className = "";
        }
        ulLiArr[square].className = "current";
        //3.移动ul;
        animate1(ol,-imageWidth*key);
    }
});




//封装一个方法,可以按照目标目标值移动盒子;
function animate1(ele,target){
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
    },5);
}