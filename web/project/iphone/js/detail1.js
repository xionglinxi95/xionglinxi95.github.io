/**
 * Created by Administrator on 2017/4/2.
 */
window.onload=function () {
  
    
    
    //放大镜的效果
    
    //获取父级元素(有小图有大图)
    var detail_zoom=my$("detail_zoom");
    //获取左侧的小层
    var smallDiv=detail_zoom.children[0];
    //获取小图
    var smallImg=smallDiv.children[0];
    //获取遮挡层
    var mask=smallDiv.children[1];
    //获取右侧的大层
    var bigDiv=detail_zoom.children[1];
    //获取大图
    var bigImg=bigDiv.children[0];
    
    //显示遮挡层和大层
    smallDiv.onmouseover=function () {
        mask.style.display="block";
        bigDiv.style.display="block";
    };
    smallDiv.onmouseout=function () {
        mask.style.display="none";
        bigDiv.style.display="none";
    };
    //鼠标在小层上移动
    smallDiv.onmousemove=function (e) {
          var x=evtTools.pageX(e)-detail_zoom.offsetLeft-mask.offsetWidth/2;//获取横坐标
          var y=evtTools.pageY(e)-detail_zoom.offsetTop-mask.offsetHeight/2;//纵坐标
        //console.log(x+"===="+y);
        //设置遮挡层跟着鼠标飞
        x=x<0?0:x;
        y=y<0?0:y;
        x=x>smallDiv.offsetWidth-mask.offsetWidth?smallDiv.offsetWidth-mask.offsetWidth:x;
        y=y>smallDiv.offsetHeight-mask.offsetHeight?smallDiv.offsetHeight-mask.offsetHeight:y;
        mask.style.left=x+"px";
        mask.style.top=y+"px";

        //遮挡层的移动距离/大图的移动距离=遮挡层的最大移动距离/大图的最大移动距离

        //大图的移动距离=遮挡层的移动距离*大图的最大移动距离/遮挡层的最大移动距离

        //大图的最大移动距离
        var bigImgMove=bigImg.offsetWidth-bigDiv.offsetWidth;
        //横坐标移动距离
        var imgMoveLeft=x*bigImgMove/(smallDiv.offsetWidth-mask.offsetWidth);
        //纵坐标移动距离
        var imgMoverTop=y*bigImgMove/(smallDiv.offsetHeight-mask.offsetHeight);
        //移动大图
        bigImg.style.marginLeft=-imgMoveLeft+"px";
        bigImg.style.marginTop=-imgMoverTop+"px";
    };

    //左右按钮点击切换图片=====

    //先获取父级元素(容纳左按钮和右按钮的div)

    var divObjsImg=detail_zoom.children[2];
    //左按钮
    var leftImg=divObjsImg.children[0];
    //右按钮
    var rightImg=divObjsImg.children[1];
    //获取容纳ul和li的div
    var divUlObj=divObjsImg.children[2];
    //获取里面的ul
    var ulObj=divUlObj.children[0];
    //里面的所有的li
    var lisObj=ulObj.children;
    //为左按钮注册点击事件
    leftImg.onclick=function () {
        animate(ulObj,{"left":0},function () {
            leftImg.className="lside disabled";
            rightImg.className="rside";
        });
    };
    //为右按钮注册点击事件
    rightImg.onclick=function () {
        animate(ulObj,{"left":-76},function () {
            leftImg.className="lside";
            rightImg.className="rside  disabled";
        });
    };
    //循环遍历所有的li,注册鼠标进入的事件
    for(var j=0;j<lisObj.length;j++){
        lisObj[j].setAttribute("number",(j+1));
        lisObj[j].onmouseover=function () {
            //改变小层中的小图的路径  (1   2   3).jpg
            //改变大层中的大图的路径(1b.jpg   2b.jpg  3b.jpg)
            smallImg.src="images/zoom/"+(this.getAttribute("number"))+".jpg";
            bigImg.src="images/zoom/"+(this.getAttribute("number"))+"b.jpg";
        };
    }
    
};





