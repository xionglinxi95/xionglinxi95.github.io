/**
 * Created by Administrator on 2017/3/31.
 */


//页面加载的事件---页面中所有的内容全部加载完毕后才触发(标签,文本,图片,文件)
window.onload = function () {
    //关闭顶部的广告
    my$("J_event_close").onclick = function () {
        // my$("J_event").style.display="none";
        animate(my$("J_event"), {"height": 0, "opacity": 0}, function () {
            my$("J_event").style.display = "none";//再次的隐藏
        });
    };

    //鼠标进入到二维码显示对应的多个的二维码图片
    my$("phone-erweima-img").onmouseover = function () {
        my$("phone-img").style.display = "block";
    };
    //错的
    my$("phone-img").onmouseout = function () {
        this.style.display = "none";
    };

    //送至北京 某些城市显示的功能

    var address = [
        "北京",
        "上海",
        "天津",
        "重庆",
        "河北",
        "山西",
        "河南",
        "辽宁",
        "吉林",
        "黑龙江",
        "内蒙古",
        "江苏",
        "山东",
        "安徽",
        "浙江",
        "福建",
        "湖北",
        "湖南",
        "广东",
        "广西",
        "江西",
        "四川",
        "海南",
        "贵州",
        "云南",
        "西藏",
        "陕西",
        "甘肃",
        "青海",
        "宁夏",
        "新疆",
        "港澳",
        "台湾",
        "钓鱼岛",
        "海外"
    ];
    //获取显示其他城市的div,
    var area = my$("sendTo").children[1].children[0];

    //设置城市显示和隐藏的效果
    my$("sendTo").onmouseover = function () {
        //设置送至北京的样式
        my$("address").className = "dv-dt dv-dt-show";
        area.style.display = "block";
    };
    my$("sendTo").onmouseout = function () {
        //移除送至北京的样式
        my$("address").className = "dv-dt";
        area.style.display = "none";
    };
    //用来存储html标签的字符串
    var str = "", i = 0;
    var len = address.length;
    for (; i < len; i++) {
        str += "<div class='item'><a href='javascript:void(0);'>" + address[i] + "</a></div>";
    }
    area.innerHTML = str;
    //获取是大的div中的所有的div中的第一个,这个div中的第一个a标签
    var divObjs = area.getElementsByTagName("div");
    //获取的是所有的小的div中的第一个div,这个div中的第一个a标签,设置样式
    divObjs[0].children[0].id = "currentArea";
    //获取所有的a标签,添加鼠标进入和离开的事件--从最外面的大的div中获取的
    var aObjs = area.getElementsByTagName("a");
    var alengths = aObjs.length;//获取的是a 标签数组的长度
    for (i = 0; i < alengths; i++) {
        aObjs[i].onmouseover = aMouseoverHandle;
        aObjs[i].onmouseout = aMouseoutHandle;
    }
    function aMouseoverHandle() {//进入
        this.className = "current";
    }

    function aMouseoutHandle() {//离开
        this.className = "";
    }


    //搜索框的操作
    //搜索框获取光标
    my$("key").onfocus = function () {
        //判断该文本框中的文字的颜色,如果是这种默认颜色,就清空文本框的内容
        if (getStyle(this, "color") == "rgb(152, 152, 152)") {
            this.value = "";
            //同时设置该文本框的字体颜色为黑色
            this.style.color = "black";
        }
    };
    //搜索框失去光标
    my$("key").onblur = function () {
        //如果文本框内容为空
        if (this.value.length == 0) {
            this.value = "爆款低至5折";
            this.style.color = "rgb(152, 152, 152)";
        }
        // if(my$("search-dv")){
        //     my$("J_search").removeChild(my$("search-dv"));
        // }

    };
    //搜索框输入内容的设置功能

    var inx = 0;//全局变量
    my$("key").onkeyup = function (e) {
        if (my$("search-dv")) {
            my$("J_search").removeChild(my$("search-dv"));
        }
        var data = [
            {"衬衫": ["衬衫男", "衬衫女", "衬衫长款", "衬衫短款"]},
            {"裙子": ["裙子长款", "裙子短款", "裙子夏天", "裙子冬天"]},
            {"裤子": ["裤子男", "裤子女", "裤子夏季", "裤子冬季"]},
            {"衣服": ["衣服男", "衣服女", "衣服 运动", "衣服 休闲"]},
            {"运动鞋": ["运动鞋男", "运动鞋女", "运动鞋夏季", "运动鞋冬季"]}
        ];
        //先获取文本框的内容,和数组中的每个元素中的第一个key进行对比
        var txt = this.value;
        var tempArr = [];
        for (i = 0; i < data.length; i++) {
            var dt = data[i];
            if (dt[txt]) {//判断键值对中是否存在文本框中的内容(判断键存在)
                //如果文本框中输入的内容存在,获取key对应的数组的值
                tempArr = dt[txt];//数组
            }
        }
        //如果文本框的内容为空,或者临时数组无数据,就干掉这个div
        if (this.value.length == 0 || tempArr.length == 0) {
            //页面中存在这个元素
            if (my$("search-dv")) {
                my$("J_search").removeChild(my$("search-dv"));
            }
            return;
        }

        //创建div,用来显示好多好多的数据
        var dvObjSearch = document.createElement("div");
        //立刻加入到最外面的div中
        dvObjSearch.id = "search-dv";//加id的目的,是为了将来只能创建一个元素
        dvObjSearch.style.width = "497px";
        dvObjSearch.style.position = "absolute";
        dvObjSearch.style.left = "-1px";
        dvObjSearch.style.top = "34px";
        dvObjSearch.style.zIndex = "20";
        dvObjSearch.style.border = "1px solid green";
        //dvObjSearch.style.height="200px";//将来干掉
        dvObjSearch.style.backgroundColor = "white";
        my$("J_search").appendChild(dvObjSearch);

        //循环遍历临时数组,创建p标签
        for (i = 0; i < tempArr.length; i++) {
            //创建p
            var pObj = document.createElement("p");
            pObj.setAttribute("index", i);
            dvObjSearch.appendChild(pObj);
            //创建a标签
            var aobj1 = document.createElement("a");
            setInnerText(aobj1, tempArr[i]);
            aobj1.style.color = "#005AA0";
            //加入到p标签中
            pObj.appendChild(aobj1);
            var aobj2 = document.createElement("a");
            setInnerText(aobj2, "约3151314个商品");
            aobj2.style.color = "#005AA0";
            aobj2.style.float = "right";
            //加入到p标签中
            pObj.appendChild(aobj2);
            //设置字体,字体的颜色
            pObj.style.cursor = "pointer";
            // pObj.style.paddingTop="5px";
            pObj.style.paddingLeft = "5px";
            pObj.style.height = "25px";
            pObj.style.lineHeight = "25px";
            pObj.onmouseover = function () {//鼠标进入
                this.style.backgroundColor = "pink";
                inx = this.getAttribute("index");
            };
            pObj.onmouseout = function () {//鼠标离开
                this.style.backgroundColor = "";
            };
            //把用户选择的搜索的内容显示在搜索框中
            pObj.onclick = function () {
                my$("key").value = getInnerText(this.children[0]);
                this.parentNode.parentNode.removeChild(this.parentNode);
            };
        }
        //监听用户按下的是什么键
        //console.log(e.keyCode);
        var ps = dvObjSearch.children;//所有的p标签
        if (e.keyCode == 40) {
            //获取所有的p标签,获取第一个p标签,调用p的高亮显示的事件
            if (inx == ps.length) {
                inx = 0;
            }
            ps[inx].onmouseover();
            inx++;
        }
    };

    //搜索按钮的点击事件
    getNextElement(my$("key-button")).onclick = function () {
        location.href = "https://search.jd.com/Search?keyword=" + my$("key").value + "&enc=utf-8&suggest=3.his.0.0&wq=&pvid=1e2fb1fc6a404fe79df5b2fc049186ca";
    };


    //右侧关于会员的高亮显示效果

    var objas = my$("userbtm").children;
    for (i = 0; i < objas.length; i++) {
        //鼠标进入和离开的事件
        objas[i].onmouseover = function () {
            this.style.backgroundColor = "#E01222";
            this.style.color = "#fff";
        };
        objas[i].onmouseout = function () {
            this.style.backgroundColor = "";
            this.style.color = "";
        };

    }


    //右侧促销和公告的切换效果实现
    //获取的是所有的li标签
    var lists = my$("news-ul").getElementsByTagName("li");
    lists[0].onmouseover = function () {
        animate(my$("dv-line"), {"left": 0});
        my$("news-dv").getElementsByTagName("ul")[0].className = "current";
        my$("news-dv").getElementsByTagName("ul")[1].className = "";
    };
    lists[2].onmouseover = function () {
        animate(my$("dv-line"), {"left": 42});
        my$("news-dv").getElementsByTagName("ul")[0].className = "";
        my$("news-dv").getElementsByTagName("ul")[1].className = "current";
    };


    //轮播图实现效果

    //先获取相框的元素
    var slider = my$("slider");
    //获取左右焦点的div
    var pagesDiv = slider.children[1];
    //左按钮
    var left = pagesDiv.children[0];

    //右按钮
    var right = pagesDiv.children[1];

    //获取相框的宽度
    var imgWidth = slider.offsetWidth;
    //获取要移动的ul标签
    var ulObj = slider.children[0];
    //获取ul中所有的li
    var listImgObjs = ulObj.children;
    //获取小圆点
    var listDian = slider.children[2].children[0].children;
   var pic=0;//这个变量存储的值和小按钮的自定义属性的值是同步的
    //遍历所有的小圆点,注册鼠标进入的事件
    for (i = 0; i < listDian.length; i++) {
        listDian[i].setAttribute("index", i);//设置每个li标签有自定义属性存储索引
        listDian[i].onmouseover = function () {
            for (var j = 0; j < listDian.length; j++) {
                listDian[j].removeAttribute("class");//复习了一个方法
            }
            //当前的li标签有样式
            this.className = "color-red";
            pic = this.getAttribute("index");//字符串的,获取当前li自定义属性的值,作为每次移出图片的个数
            //移动ul了
            animate(ulObj, {"left": -pic * imgWidth});
        };
    }

    //设置计时器自动播放轮播图
    var setId=setInterval(rightClick,1000);
    //设置左右焦点的div显示和隐藏
    slider.onmouseover = function () {
        animate(pagesDiv, {"opacity": 1});
        clearInterval(setId);//清理自动播放的轮播图的计时器
     
    };
    slider.onmouseout = function () {
        animate(pagesDiv, {"opacity": 0});
        //再次设置轮播图自动播放
        setId=setInterval(rightClick,1000);
    };
    //右边按钮
    right.onclick=rightClick;
    function rightClick() {
        //小按钮--8个(索引7),图片个数9个(索引8)
       if(pic==listImgObjs.length-1){
           pic=0;//索引恢复默认了
           //设置ul的left为0
           ulObj.style.left=-pic*imgWidth+"px";
       }
        pic++;
        animate(ulObj,{"left":-pic*imgWidth});
        //设置小按钮的样式
        for(i=0;i<listDian.length;i++){
            listDian[i].className="";
        }
        //判断
        if(pic==listImgObjs.length-1){
            listDian[0].className="color-red";
        }else{
            listDian[pic].className="color-red";
        }
    }
    left.onclick=function () {
        if(pic==0){
            pic=listImgObjs.length-1;//索引恢复默认了
            //设置ul的left为0
            ulObj.style.left=-pic*imgWidth+"px";
        }
        pic--;
        animate(ulObj,{"left":-pic*imgWidth});
        for(i=0;i<listDian.length;i++){
            listDian[i].className="";
        }
        listDian[pic].className="color-red";
    };


    //左侧的菜单
    var bannerUl=my$("banner-left-item");
    //获取里面的所有的li标签(鼠标进入的事件)
    var bannerLi=bannerUl.children;
    //获取显示详细菜单的div
    var dvItem=my$("dvItem");
    //获取里面的所有的div菜单
    var divItemObjs=dvItem.children;
    //鼠标进入到ul的时候显示装菜单的div
    bannerUl.onmouseover=function () {
        dvItem.className="bannercurrent";
    };
    bannerUl.onmouseout=function () {
        dvItem.className="left-banner-item";
    };
    //现在这个div是看不到的(因为里面的所有的div都是隐藏的)
    //为每个li标签注册鼠标进入的事件
    for(i=0;i<bannerLi.length;i++){
        bannerLi[i].setAttribute("index",i);
        bannerLi[i].onmouseover=function () {
            for(var j=0;j<divItemObjs.length;j++){
                divItemObjs[j].className="hide";
            }
            divItemObjs[this.getAttribute("index")].className="show";
        };
    }
    
    
   //秒杀中的倒计时

    //先获取小时的标签
    var sHours=my$("sHours");
    //获取分钟的标签
    var sMin=my$("sMin");
    //获取秒的标签
    var sSec=my$("sSec");
    //先设置一个固定时间
    var endTime=new Date("2017/4/2 12:45:00");
    //不停的获取当前时间,倒计时
    setInterval(function () {
        //获取当前时间
        var nowTime=new Date();
        //计算时间的差,用毫秒进行计算
        var subTime=(endTime.getTime()-nowTime.getTime())/1000;
        //获取小时部分
        var h=parseInt(subTime/60/60%24);
        h=h<10?"0"+h:h;
        //获取分钟部分
        var min=parseInt(subTime/60%60);
        min=min<10?"0"+min:min;
        //获取秒的部分
        var s=parseInt(subTime%60);
        s=s<10?"0"+s:s;
        sHours.innerHTML=h;
        sMin.innerHTML=min;
        sSec.innerHTML=s;

    },1000);
    
    
    
    
    // //右边按钮
    // right.onclick = rightClick;
    // function rightClick() {
    //     if (pic == listImgObjs.length - 1) {
    //         pic = 0;
    //         ulObj.style.left = -pic * imgWidth + "px";
    //     }
    //     pic++;
    //     animate(ulObj, {"left": -pic * imgWidth});
    //     for (i = 0; i < listDian.length; i++) {
    //         listDian[i].className = "";
    //     }
    //     if (pic == listImgObjs.length - 1) {
    //         listDian[0].className = "color-red";
    //     } else {
    //         listDian[pic].className = "color-red";
    //     }
    // };
    // //左边按钮
    // left.onclick = function () {
    //     if (pic == 0) {
    //         pic = listImgObjs.length - 1;
    //         ulObj.style.left = -pic * imgWidth + "px";
    //     }
    //     pic--;
    //     animate(ulObj, {"left": -pic * imgWidth});
    //     for (i = 0; i < listDian.length; i++) {
    //         listDian[i].className = "";
    //     }
    //     listDian[pic].className = "color-red";
    // };
    //
    // //秒杀
    //
    // //获取小时
    // var sHours = my$("sHours");
    // //获取分钟
    // var sMin = my$("sMin");
    // //获取秒
    // var sSec = my$("sSec");
    //
    // //获取结束的时间
    // var endTime = new Date("2017/4/2 11:30:00");
    // //获取当前的时间
    // setInterval(function () {
    //     //获取当前的时间
    //     var dt = new Date();
    //     //计算时间差
    //     var timeSub = (endTime.getTime() - dt.getTime()) / 1000;
    //     //获取小时
    //     var h = parseInt(timeSub / (60 * 60) % 24);
    //     h = h < 10 ? "0" + h : h;        //获取分钟
    //     var m = parseInt(timeSub / 60 % 60);
    //     m = m < 10 ? "0" + m : m;
    //     //获取秒
    //     var s = parseInt(timeSub % 60);
    //     s = s < 10 ? "0" + s : s;
    //     //document.title=h+":"+m+":"+s;
    //     sHours.innerHTML = h;
    //     sMin.innerHTML = m;
    //     sSec.innerHTML = s;
    // }, 1000);
    //
    // //左侧菜单导航
    //
    // //获取ul
    // var ulBanner = my$("banner-left-item");
    // //获取左右的菜单ul中所有的li标签
    // var listItem = ulBanner.children;
    // //获取显示其他菜单的div
    // var divItemObjs = my$("dvItem").children;
    // ulBanner.onmouseover = function () {
    //     my$("dvItem").className = "bannercurrent";
    // };
    // ulBanner.onmouseout = function () {
    //     my$("dvItem").className = "left-banner-item";
    // };
    // for (i = 0; i < listItem.length; i++) {
    //     listItem[i].setAttribute("index", i);
    //     listItem[i].onmouseover = itemMouseover;
    // }
    // function itemMouseover() {
    //     for (var j = 0; j < divItemObjs.length; j++) {
    //         divItemObjs[j].className = "hide";
    //     }
    //     divItemObjs[this.getAttribute("index")].className="show";
    // }



};