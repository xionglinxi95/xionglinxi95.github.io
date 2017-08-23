/**
 * Created by Administrator on 2017/4/1.
 */
//放大镜效果实现

    window.onload=function () {
        //获取放大镜的大层
        var detail_zoom=my$("detail_zoom");
        //获取里面的div
        var small=detail_zoom.children[0];
        //获取里面的图片
        var smallImg=small.children[0];
        //获取里面的遮挡层
        var mask=small.children[1];
        //获取右侧的大的div
        var big=detail_zoom.children[1];
        //获取右侧的大图
        var bigImg=big.children[0];
        //进入小层,显示大层,显示遮挡层
        small.onmouseover=function () {
            mask.style.display="block";
            big.style.display="block";
        };
        small.onmouseout=function () {
            mask.style.display="none";
            big.style.display="none";
        };
        //鼠标在small上移动
        small.onmousemove=function (e) {
            //获取此时鼠标的横纵坐标
            var x=evtTools.pageX(e)-detail_zoom.offsetLeft-mask.offsetWidth/2;
            var y=evtTools.pageY(e)-detail_zoom.offsetTop-mask.offsetHeight/2;
            x=x<0?0:x;
            y=y<0?0:y;
            x=x>small.offsetWidth-mask.offsetWidth?small.offsetWidth-mask.offsetWidth:x;
            y=y>small.offsetHeight-mask.offsetHeight?small.offsetHeight-mask.offsetHeight:y;
            mask.style.left=x+"px";
            mask.style.top=y+"px";
            //移动图片
            //遮挡层移动距离/大图移动距离=遮挡层最大移动距离/大图最大移动距离
            //大图的移动距离=遮挡层移动距离*大图最大移动距离/遮挡层最大移动距离
            //求大图的最大移动距离
            var bigImgMove=bigImg.offsetWidth-big.offsetWidth;
            var imgX=x*bigImgMove/(small.offsetWidth-mask.offsetWidth);
            var imgY=y*bigImgMove/(small.offsetHeight-mask.offsetHeight);
            bigImg.style.marginLeft=-imgX+"px";
            bigImg.style.marginTop=-imgY+"px";
        };
        
        //放大镜下面的图片切换效果实现
        
        //获取列表展示的父级元素
        var bot_imglist=detail_zoom.children[2];
        //获取左按钮
        var left=bot_imglist.children[0];
        //获取右按钮
        var right=bot_imglist.children[1];
        //获取容纳列表的div
        var divImgList=bot_imglist.children[2];
        //获取ul
        var ulImg=divImgList.children[0];
        //获取里面的li
        var listImg=ulImg.children;
        left.onclick=function () {//左按钮
            animate(ulImg,{"left":0},function () {
                left.className="lside disabled";
                right.className="rside";
            });  
        };
        right.onclick=function () {//右按钮
            animate(ulImg,{"left":-76},function () {
                left.className="lside";
                right.className="rside disabled";
            });
        };
        //点击图片切换
        for(var i=0;i<listImg.length;i++){
            listImg[i].setAttribute("number",i+1);
            listImg[i].onclick=function () {
                smallImg.src="images/zoom/"+this.getAttribute("number")+".jpg";
                bigImg.src="images/zoom/"+this.getAttribute("number")+"b.jpg";
            };
        }
        
        //商品切换实现
        var products_fitting=my$("products_fitting");
        //获取列表
        var tabList=products_fitting.children[0];
        //获取里面的所有的li======点击
        var tabliObjs=tabList.children[0].children;
        //获取配件
        var tabContent=products_fitting.children[1];
        //获取配件列表======切换效果
        var tabDivList=tabContent.children[1].children;
        //为每个li注册点击事件
        var len=tabliObjs.length;
        for(var i=0;i<len;i++){
            tabliObjs[i].setAttribute("index",i);
            tabliObjs[i].onclick=clickHandle;
        }
        function clickHandle() {
            for(var j=0;j<len;j++){
                tabliObjs[j].className="";
                tabDivList[j].className="suits-items";
            }

            this.className="current";
            tabDivList[this.getAttribute("index")].className+="show";
        }
    };
