window.onload = function () {
    //关闭顶部广告
    my$("J_event_close").onclick = function () {
        animate(my$("J_event"), {"height": 0, "opacity": 0}, function () {
            my$("J_event").style.display = "none";
        });

    };

//地址设置
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
    var area = my$("sendTo").children[1].children[0];
    my$("sendTo").onmouseover = function () {
        area.style.display = "block";
        my$("address").className = "dv-dt dv-dt-show";
    };
    my$("sendTo").onmouseout = function () {
        area.style.display = "none";
        my$("address").className = "dv-dt";
    };

    var str = "", i = 0;
    for (; i < address.length; i++) {
        str += "<div class='item'><a href='javascript:void(0)'>" + address[i] + "</a></div>";
    }
    area.innerHTML = str;
    //获取里面所有的a标签,注册鼠标进入和离开事件
    var sendAreas = area.getElementsByTagName("a");
    var length = sendAreas.length;
    //设置第一个元素应用默认的样式
    sendAreas[0].id = "currentArea";
    for (i = 0; i < length; i++) {
        sendAreas[i].onmouseover = mouseover_Handle;
        sendAreas[i].onmouseout = mouseout_Handle;
    }
    function mouseover_Handle() {
        this.className = "current";
    }

    function mouseout_Handle() {
        this.className = "";
    }
    
//顶部右侧手机二维码
    my$("phone-erweima-img").onmouseover = function () {
        my$("phone-img").style.display = "block";
    };
    my$("phone-img").onmouseout = function () {
        my$("phone-img").style.display = "none";
    };

//搜索栏内容设置
    my$("key").onfocus = function () {
        if (getStyle(this, "color") == "rgb(152, 152, 152)") {
            this.value = "";//清空文本框
            this.style.color = "#000";
        }
    };
    my$("key").onblur = function () {
        if (this.value.length == 0) {
            this.style.color = "#989898";
            this.value = "爆款低至5折";
        }
        if (my$("search-dv")) {
            my$("J_search").removeChild(my$("search-dv"));
        }
    };
//搜索框输入内容检测
    var index = 0;
    my$("key").onkeyup = function (e) {
        var data = [
            {"衬衫": ["衬衫男", "衬衫女", "衬衫长款", "衬衫短款"]},
            {"裙子": ["裙子长款", "裙子短款", "裙子夏天", "裙子冬天"]},
            {"裤子": ["裤子男", "裤子女", "裤子夏季", "裤子冬季"]},
            {"衣服": ["衣服男", "衣服女", "衣服 运动", "衣服 休闲"]},
            {"运动鞋": ["运动鞋男", "运动鞋女", "运动鞋夏季", "运动鞋冬季"]}
        ];
        if (my$("search-dv")) {
            my$("J_search").removeChild(my$("search-dv"));
        }
        //临时数组
        var txt = this.value;
        var tempArr = [];
        for (var i = 0; i < data.length; i++) {
            var dt = data[i];
            if (dt[txt]) {
                tempArr = dt[txt];
            }
        }
        if (this.value.length == 0 || tempArr.length == 0) {
            if (my$("search-dv")) {
                my$("J_search").removeChild(my$("search-dv"));
            }
            return;
        }
        //创建显示数据的div
        var divObj = document.createElement("div");
        divObj.id = "search-dv";
        my$("J_search").appendChild(divObj);
        divObj.style.width = "498px";
        //divObj.style.height="200px";
        divObj.style.marginLeft = "-1px";
        divObj.style.border = "1px solid #989898";
        divObj.style.backgroundColor = "white";
        divObj.style.zIndex = "100";
        divObj.style.position = "relative";
        divObj.style.marginTop = "33px";
        for (i = 0; i < tempArr.length; i++) {
            var pObj = document.createElement("p");
            divObj.appendChild(pObj);
            var aObj1 = document.createElement("a");
            pObj.appendChild(aObj1);
            pObj.style.clear = "both";
            aObj1.href = "javascript:void(0)";
            aObj1.innerHTML = tempArr[i];
            aObj1.style.color = "#4169e1";//蓝色
            aObj1.style.textAlign = "left";
            //右侧搜索条数
            var aObj2 = document.createElement("a");
            pObj.appendChild(aObj2);
            aObj2.href = "javascript:void(0)";
            aObj2.innerHTML = "约1072004个商品";
            aObj2.style.color = "#4169e1";//蓝色
            aObj2.style.textAlign = "right";
            aObj2.style.float = "right";

            pObj.style.marginLeft = "3px";
            pObj.style.marginTop = "3px";
            pObj.style.cursor = "pointer";
            pObj.onmouseover = function () {
                this.style.backgroundColor = "#CCC";
            };
            pObj.onmouseout = function () {
                this.style.backgroundColor = "";
            };
            pObj.onclick = function () {
                my$("key").value = this.children[0].innerText;
            };
        }
        //设置某个选项获取选中
        if (e.keyCode == 40) {
            if (index == divObj.children.length) {
                index = 0;
            }
            divObj.children[index].onmouseover();
            index++;
        }
        if (e.keyCode == 38) {
            if (index == 0) {
                index = divObj.children.length;
            }
            divObj.children[index - 1].onmouseover();
            index--;
        }
    };
//搜索按钮的点击事件
    getNextElement(my$("key-button")).onclick = function () {
        location.href = "https://search.jd.com/Search?keyword=" + my$("key").value + "&enc=utf-8&wq=" + my$("key").value + "&pvid=af9a548189ab4fa792796b7f448184ae";
    };

    //右侧登录的下面的切换效果
    var userPlus = my$("userbtm").children;
    for (i = 0; i < userPlus.length; i++) {
        userPlus[i].onmouseover = function () {
            this.style.backgroundColor = "#E01222";
            this.style.color = "white";
        };
        userPlus[i].onmouseout = function () {
            this.style.backgroundColor = "";
            this.style.color = "#E01222";
        };
    }

    //轮播图切换效果实现
    //获取所有的li标签
    //获取轮播图外面的ul
    var ulObj = my$("slider").children[0];
    var list = my$("slider").children[0].children;
    //左右焦点的div
    var page = my$("slider").children[1];
    //左右焦点中的左边按钮
    var left = page.children[0];
    //左右焦点中的右边按钮
    var right = page.children[1];
    //获取小按钮
    var pic = 0;
    var smallBtn = my$("slider").children[2].children[0].children;
    for (i = 0; i < smallBtn.length; i++) {
        smallBtn[i].setAttribute("index", i);
        smallBtn[i].onmouseover = function () {
            for (var j = 0; j < smallBtn.length; j++) {
                smallBtn[j].className = "";
            }
            this.className = "color-red";
            pic = parseInt(this.getAttribute("index"));
            animate(ulObj, {"left": -(pic * my$("slider").offsetWidth)});
        };
    }

    //自动播放轮播图
    var timeId = null;
    timeId = setInterval(rightClickHandle, 1000);
    //显示左右焦点
    my$("slider").onmouseover = function () {
        animate(page, {"opacity": 1});
        clearInterval(timeId);//干掉自动播放
    };
    //隐藏左右焦点
    my$("slider").onmouseout = function () {
        animate(page, {"opacity": 0});
        //继续自动播放
        timeId = setInterval(rightClickHandle, 1000);
    };
    //左按钮
    left.onclick = function () {
        if (pic == 0) {
            pic = list.length - 1;
            ulObj.style.left = -pic * my$("slider").offsetWidth + "px";
        }
        pic--;
        //移动图片
        animate(ulObj, {"left": -(pic * my$("slider").offsetWidth)});
        for (var i = 0; i < smallBtn.length; i++) {
            smallBtn[i].className = "";
        }
        smallBtn[pic].className = "color-red";
    };

    //右按钮
    right.onclick = rightClickHandle;
    function rightClickHandle() {
        if (pic == list.length - 1) {
            pic = 0;
            ulObj.style.left = -pic * my$("slider").offsetWidth + "px";
        }
        pic++;
        animate(ulObj, {"left": -(pic * my$("slider").offsetWidth)});
        //移除小按钮的所有的样式
        for (var i = 0; i < smallBtn.length; i++) {
            smallBtn[i].className = "";
        }
        if (pic == list.length - 1) {//如果最后一个图片,让第一个小按钮有样式
            smallBtn[0].className = "color-red";
        } else {
            //设置对应的小按钮有样式
            smallBtn[pic].className = "color-red";
        }

    }

    //右侧的促销和公告
    var liObjs = my$("news-ul").children;
    //横线(红色的)
    var line = my$("dv-line");
    var count = 0;
    for (i = 0; i < liObjs.length; i++) {
        if (i % 2 == 0) {
            var aObjs = liObjs[i].children[0];
            aObjs.count = count;
            count++;
            //鼠标进入到a标签中设置样式及显示内容
            aObjs.onmouseover = aObjsmouseover;
        }
    }
    function aObjsmouseover() {
        animate(line, {"left": this.offsetLeft});
        var ulObjs = my$("news-dv").getElementsByTagName("ul");
        for (i = 0; i < ulObjs.length; i++) {
            ulObjs[i].className = "";
        }
        ulObjs[this.count].className = "current";

    }

    //左侧的导航菜单栏
    var listObjs = my$("banner-left-item").children;
    //菜单对应的导航
    divObjs = my$("dvItem").children;
    my$("banner-left-item").onmouseover = function () {
        //应用新的类样式
        my$("dvItem").className = "bannercurrent";
    };
    my$("banner-left-item").onmouseout = function () {
        //恢复原来的类样式
        my$("dvItem").className = "left-banner-item";
    };
    for (i = 0; i < listObjs.length; i++) {
        listObjs[i].setAttribute("index", i);
        listObjs[i].onmouseover = function () {
            for (var j = 0; j < divObjs.length; j++) {
                divObjs[j].style.display = "none";
            }
            divObjs[parseInt(this.getAttribute("index"))].style.display = "block";
        };
    }
};

