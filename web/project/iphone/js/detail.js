/**
 * Created by yoyo on 2016-12-27.
 */
window.onload = function () {
  var tools = {
    dom: document,
    getId: function (id) {
      return this.dom.getElementById(id);
    },
    crt: function (tag) {
      return this.dom.createElement(tag);
    },
    scroll: function () {
      return {
        left: pageXOffset || this.dom.documentElement.scrollLeft || this.dom.body.scrollLeft || 0,
        top: pageYOffset || this.dom.documentElement.scrollTop || this.dom.body.scrollTop || 0
      }
    },
    getPx: function (e) {
      return e.pageX ? e.pageX : e.clientX + this.scroll().left;
    },
    getPy: function (e) {
      return e.pageY ? e.pageY : e.clientY + this.scroll().top;
    }
  };
  
  
  //------设置送至北京------
  var sendTo = tools.getId("sendTo"),
    sendArea = sendTo.children[1].children[0];
  sendTo.onmouseover = function () {
    sendArea.style.display = "block";
  };
  sendTo.onmouseout = function () {
    sendArea.style.display = "none";
  };
  
  //给发送地区部分设置内部结构
  var arr = ["北京", "上海", "天津", "重庆", "河北", "山西", "河南", "辽宁", "吉林", "黑龙江", "内蒙古", "江苏", "山东", "安徽", "浙江", "福建", "湖北", "湖南", "广东", "广西", "江西", "四川", "海南", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "港澳", "台湾", "钓鱼岛", "海外"],
    str = "",
    i = 0;
  for (; i < arr.length; i++) {
    str += "<div class='item'><a href='javascript:;'>" + arr[i] + "</a></div>";
  }
  sendArea.innerHTML = str;
  var sendAreas = sendArea.getElementsByTagName("a");
  var sendLen = sendAreas.length;
  
  //设置子选项的交互效果
  sendAreas[0].id = "currentArea";
  for (i = 0; i < sendLen; i++) {
    sendAreas[i].onmouseover = changeOverBg;
    sendAreas[i].onmouseout = changeOutBg;
  }
  function changeOverBg() {
    this.className = "current";
  }
  
  function changeOutBg() {
    this.className = "";
  }
  
  
  
  
  
  
  
  
  
  
  //---------放大镜部分效果开始----------
  var detail_zoom = tools.getId("detail_zoom"),//放大区域父盒子
    small_box = detail_zoom.children[0],//放大镜操作部分
    small_img = small_box.children[0],//放大部分左侧显示图片450分辨率
    mask = small_box.children[1],//遮罩层
    big_box = detail_zoom.children[1],//右侧大盒子
    big_img = big_box.children[0];//右侧大图
  
  //2 鼠标移入时，显示黄盒子和右侧大盒子
  small_box.onmouseover = function () {
    mask.style.display = "block";
    big_box.style.display = "block";
  };
  small_box.onmouseout = function () {
    mask.style.display = "none";
    big_box.style.display = "none";
  };
  //3 鼠标在small内运动是让mask进行跟随
  small_box.onmousemove = function (e) {
    var e = e || event;
    var mask_w = mask.offsetWidth;
    var mask_h = mask.offsetHeight;
    var x = tools.getPx(e) - detail_zoom.offsetLeft - mask_w / 2;
    var y = tools.getPy(e) - detail_zoom.offsetTop - mask_h / 2;
    x = x < 0 ? 0 : x;
    y = y < 0 ? 0 : y;
    var cha1 = small_box.offsetWidth - mask_w;
    var cha2 = small_box.offsetHeight - mask_h;
    x = x > cha1 ? cha1 : x;
    y = y > cha2 ? cha2 : y;
    mask.style.left = x + "px";
    mask.style.top = y + "px";
    var biliW = cha1 / (big_img.offsetWidth - big_box.offsetWidth);
    var biliH = cha2 / (big_img.offsetHeight - big_box.offsetHeight);
    //根据比例计算bigImg需要运动的距离
    big_img.style.marginLeft = -x / biliW + "px";
    big_img.style.marginTop = -y / biliH + "px";
    
  };
  
  //---------放大镜部分效果结束----------
  
  //---------放大镜底部列表开始----------
  
  var bot_imglist = detail_zoom.children[2],
    bot_l_Btn = bot_imglist.children[0],//左按钮
    bot_r_Btn = bot_imglist.children[1],//右,钮
    bot_movelist = bot_imglist.children[2].children[0],//移动的列表
    bot_lis = bot_movelist.children,//操作的列表元素
    len_bot_lis = bot_lis.length;
  
  //左右按钮点击
  bot_l_Btn.onclick = function () {
    animate(bot_movelist, {
      "left": 0
    }, function () {
      bot_r_Btn.className = "rside";
      bot_l_Btn.className = "lside disabled";
    });
  };
  bot_r_Btn.onclick = function () {
    animate(bot_movelist, {
      "left": -76
    }, function () {
      // bot_l_Btn.style.background = "url(../images/__sprite2.png) -30px 0";
      bot_l_Btn.className = "lside";
      bot_r_Btn.className = "rside disabled";
    });
  };
  //点击按钮切换图片
  for (i = 0; i < len_bot_lis; i++) {
    bot_lis[i].picNum = i + 1;
    bot_lis[i].onmouseover = change_bot_pic;
  }
  function change_bot_pic() {
    small_img.src = "../images/zoom/" + this.picNum + ".jpg";
    big_img.src = "../images/zoom/" + this.picNum + "b.jpg";
  }
  
  //---------放大镜底部列表结束----------
  
  //---------配件区域tab效果开始----------
  
  var prs_fitting = tools.getId("products_fitting"),//tab父盒子
    tab_h_lis = prs_fitting.children[0].children[0].children,//顶部操作的li
    len_h_lis = tab_h_lis.length,//顶部li的个数
    tab_b_div = prs_fitting.children[1].children[1].children;//底部tab显示区域div
  
  for (i = 0; i < len_h_lis; i++) {
    tab_h_lis[i].index = i;//设置索引
    tab_h_lis[i].onclick = prs_tab_change;
  }
  function prs_tab_change() {
    var len = len_h_lis;
    for (var i = 0; i < len; i++) {
      tab_h_lis[i].className = "";
      tab_b_div[i].className = "suits-items";
    }
    this.className = "current";
    tab_b_div[this.index].className += "show";
  }
  
  //---------配件区域tab效果结束----------
  
  
};