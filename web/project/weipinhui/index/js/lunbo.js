$(function () {




    var screen = document.getElementById("screen");
    var imgWidth = screen.offsetWidth;
    var ul = document.getElementById("ul");
    var ulLiArr = ul.children;
    var ol = screen.children[1];
    var arr = screen.children[2];
    var left = document.getElementById("left");
    var right = document.getElementById("right");


    ul.appendChild(ulLiArr[0].cloneNode(true));

    for(var i=0;i<ulLiArr.length-1;i++){
        var newLi = document.createElement("li");

        newLi.innerHTML = "绅士品质购 折上8.8折"+i+1;
        ol.appendChild(newLi);
    }

    var olLiArr = ol.children;
    olLiArr[0].className = "current";


    for(var i=0;i<olLiArr.length;i++){

        olLiArr[i].index = i;
        olLiArr[i].onmouseover = function () {

            for(var j=0;j<olLiArr.length;j++){
                olLiArr[j].className = "";
            }
            this.className = "current";

            animate(ul,-imgWidth*this.index);

            key = square = this.index;
        }
    }

    var key = 0;
    var square = 0;
    right.onclick = autoPlay;



    left.onclick = function () {

        key--;
        if(key === -1){
            ul.style.left = -imgWidth*4+"px";
            key = 3;
        }

        square--;
        if(square === -1){
            square = 3;
        }

        for(var j=0;j<olLiArr.length;j++){
            olLiArr[j].className = "";
        }
        olLiArr[square].className = "current";
        //3.移动ul;
        animate(ul,-imgWidth*key);
    }

    var timer = setInterval(autoPlay,3000);


    screen.onmouseover = function () {
        arr.style.display = "block";
        clearInterval(timer);
    }
    screen.onmouseout = function () {
        arr.style.display = "none";
        timer = setInterval(autoPlay,3000);
    }





    function autoPlay() {

        key++;
        if(key === 5){
            ul.style.left = 0;
            key = 1;
        }

        square++;
        if(square === 4){
            square = 0;
        }

        for(var j=0;j<olLiArr.length;j++){
            olLiArr[j].className = "";
        }
        olLiArr[square].className = "current";
        animate(ul,-imgWidth*key);
    }






















//封装一个方法,可以按照目标目标值移动盒子;
    function animate(ele,target){
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
        },6);
    }

});
