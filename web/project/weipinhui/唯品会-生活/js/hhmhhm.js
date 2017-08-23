    $(function () {
    var arrOfJson = [
        {
            width: 200,
            top: 70,
            left: 50,
            opacity: 0.2,
            "z-index": 2
        },
        {
            width: 400,
            top: 120,
            left: 0,
            opacity: 0.8,
            "z-index": 3
        },
        {
            width: 600,
            top: 100,
            left: 200,
            opacity: 1,
            "z-index": 4
        },
        {
            width: 400,
            top: 120,
            left: 600,
            opacity: 0.8,
            "z-index": 3
        },
        {
            width: 200,
            top: 70,
            left: 750,
            opacity: 0.2,
            "z-index": 2
        }
    ];
    var slide = document.getElementById("slide");
    var liArr = slide.getElementsByTagName("li");
    var arrow = document.getElementById("arrow");
    var prev = arrow.children[0];
    var next = arrow.children[1];
    var timer1 = null;

    var bool = true;
    autoPlay();
    slide.onmouseover = function () {
        animate(arrow, {"opacity": 1});
        clearInterval(timer1);
    }
    slide.onmouseout = function () {
        animate(arrow, {"opacity": 0});
        timer1 = setInterval(next.onclick,2000);
    }
    next.onclick = function () {
        if (bool) {
            autoPlay(true);
            bool = false;
        }
    }
    prev.onclick = function () {
        if (bool) {
            autoPlay(false);
            bool = false;
        }
    }
    timer1 = setInterval(next.onclick,2000);


    function autoPlay(flag) {
        if (flag !== undefined) {
            if (flag) {
                arrOfJson.push(arrOfJson.shift());
            } else {
                arrOfJson.unshift(arrOfJson.pop());
            }
        }
        for (var i = 0; i < liArr.length; i++) {
            animate(liArr[i], arrOfJson[i], function () {
                bool = true;
            });
        }
    }


//top����


    var left = document.getElementsByClassName("left")[0];
    var hui = document.getElementsByClassName("hui")[0];
    var target = 0;
    var leader = 0;
    var timer = null;

        $(window).scroll(function () {
            if (scroll().top > 1000) {
                show(left);
            }else {
                hide(left);
            }
            leader = scroll().top;
        })
        //$(window).scroll(function () {
        //    if (scroll().top > 1000) {
        //        show(left);
        //    }else if( (scroll().top < 1000)|| (scroll().top > 10000)){
        //        hide(left);
        //    }
        //    leader = scroll().top;
        //})



    hui.onclick = function () {

        clearInterval(timer);
        timer = setInterval(function () {
            var step = (target - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            window.scrollTo(0, leader);
            if (leader === target) {
                clearInterval(timer);
            }
        }, 30);
    }
})
//��װ�Ĵ���


    $(function () {
        $(".black").parent("ul").mouseenter(function () {
            $(this).children(".black").fadeIn(1000);
        });
        $(".black").parent("ul").mouseleave(function () {
            $(this).children(".black").fadeOut(500);
        });

    });


