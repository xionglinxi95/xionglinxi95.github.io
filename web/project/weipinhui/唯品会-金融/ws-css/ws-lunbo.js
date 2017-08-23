/**
 * Created by ws on 2017-04-06.
 */


window.onload = function () {


    var box = document.getElementById("lbBox");
    var  aArr = box.getElementsByTagName("a");
    var lbUl = document.getElementById("lbUl");
    var liArr = lbUl.getElementsByTagName("li");
    var spanArr = document.getElementsByClassName("lbSpan");
    var  hidebtn0 = document.getElementById("lbSpan");
    var  hidebtn1 = document.getElementById("lbSpan");

    //box.onmouseover = function () {
    //    console.log("jinrule");
    //    spanArr[0].className = "show";
    //
    //    spanArr[1].className = "show";
    //
    //}
    //box.onmouseout = function () {
    //    console.log("yizoule");
    //    spanArr[0].className = "hide";
    //    spanArr[1].className = "hide";
    //
    //}


    for (var i = 0; i < liArr.length; i++) {
        liArr[i].onclick = function () {
            count = this.innerHTML - 1;
            fn();
        }
    }
    var count = 0;
    spanArr[1].onclick = fn1;
    spanArr[0].onclick = function () {
        count--;
        if (count === -1) {
            count = 2;
        }
        fn();
    }
    var timer = setInterval(fn1, 1000);
    box.onmouseover = function () {
        spanArr[0].style.display="block";
        spanArr[1].style.display="block";
        console.log("yincnagle");
        clearInterval(timer);

    }
    box.onmouseout = function () {
        spanArr[0].style.display="none";
        spanArr[1].style.display="none";
        console.log("yincnagle");
        timer = setInterval(fn1, 1000);

        //hidebtn0[className]="hide";
        //hidebtn1[className]="hide";
    }
    function fn() {
        //利用排他思想,点亮li.
        for (var j = 0; j < liArr.length; j++) {
            liArr[j].className = "";
            aArr[j].className = "hide";//直接隐藏

        }
        liArr[count].className = "lbActive";
        aArr[count].className = "show"; //直接显示
    }

    function fn1() {
        count++;
        if (count === 3) {
            count = 0;
        }
        fn()
    }

}