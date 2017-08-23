/**
 * Created by admin on 2017-4-5.
 */
$(function () {
    var $footService = $("#footService");
    var ddArr = $footService[0].getElementsByTagName("dd");
    for(var i = 0;i < ddArr.length;i++){
        ddArr[i].onmouseenter = function () {
            animate(this,{marginLeft:3});
        }
        ddArr[i].onmouseleave = function () {
            animate(this,{marginLeft:0});
        }
    }
});






