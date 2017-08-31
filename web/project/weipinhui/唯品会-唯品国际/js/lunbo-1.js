
$(function(){
    var timer = null;
    //找人
    var box = document.getElementById("zs-l");
    var arr = document.getElementById("zsy");
    var left = document.getElementById("ly");
    var right = document.getElementById("ry");
    var screen =document.getElementById("showy");
    var ul = document.getElementById("showny");
    var ulLis = ul.children;//所有广告
    var screenWidth = 800;
    //1.动态生成结构

    //1.2克隆第一张图片 放到最后
    // var firstImg = ulLis[0].cloneNode(true);
    // ul.appendChild(firstImg);

    //3.鼠标点击箭头
    //经过离开box 显示隐藏箭头
    box.onmouseover = function () {
        arr.style.display = "block";
        clearInterval(timer);
    };
    box.onmouseout = function () {
        arr.style.display = "none";
        timer = setInterval(function () {
            right.onclick();
        }, 2500);
    };
    var pic = 0;//记录当前图片的索引
    //var square = 0;//记录当前按钮的索引
    //点击right 显示下一张
    right.onclick = function () {
        //点击后 先判断 如果现在是最后一张 接下来就要跳回最开头了
        if (pic === 2) {
            ul.style.left = 0;//瞬间跳回开头
            pic = 0;//当前显示的图片的索引已经是0了
        }
        pic++;
        //目标 和pic有关 和 图片宽度有关 而且是负数
        var target = -pic * screenWidth;
        animate2(ul, target);
    };
    left.onclick = function (){
        if (pic === 0) {
            ul.style.left = -2*screenWidth+ "px";//瞬间跳回开头
            pic = 2;//当前显示的图片的索引已经是0了
        }
        pic--;
        //目标 和pic有关 和 图片宽度有关 而且是负数
        var target = -pic * screenWidth;
        animate2(ul, target);

    };
    timer = setInterval(function () {
        right.onclick();
    }, 2500);


    function animate2(obj, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var leader = obj.offsetLeft;
            var step = 30;
            step = target > leader ? step : -step;
            if (Math.abs(leader - target) >= Math.abs(step)) {
                leader = leader + step;
                obj.style.left = leader + "px";
            } else {
                clearInterval(obj.timer);
                obj.style.left = target + "px";
            }
        }, 20);
    }
});
