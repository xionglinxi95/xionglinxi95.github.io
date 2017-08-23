/**
 * Created by yoyo on 2016-12-27.
 */
/**
 *
 * @param tag
 * @param obj
 * @param fn 你要不传入函数，我就给你报错  只要函数的某一个参数需要传函数，这个函数必定是函数体
 * 函数体有两种，一个匿名函数 一个是有名函数的函数名
 */
function animate(tag, obj, fn) {
  clearInterval(tag.timer);
  tag.timer = setInterval(function () {
    var flag = true;
    for (var k in obj) {
      if (k == "opacity") {
        var target = obj[k] * 100;
        var leader = getStyle(tag, k) * 100 || 0;
        var step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        tag.style[k] = leader / 100;
      } else if (k == "zIndex") {
        tag.style.zIndex = obj[k];
      } else {
        var target = obj[k];
        var leader = parseInt(getStyle(tag, k)) || 0;
        var step = (target - leader) / 10;
        //需要对step进行处理
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        
        leader = leader + step;
        tag.style[k] = leader + "px";
      }
      if (leader != target) {
        flag = false;
      }
    }
    
    if (flag) {
      clearInterval(tag.timer);

      if (typeof fn == "function") {
        fn();
      }

    }
  }, 17);
}

function getStyle(tag, attr) {
  if (tag.currentStyle) {
    return tag.currentStyle[attr];
  } else {
    return getComputedStyle(tag, null)[attr];
  }
}
