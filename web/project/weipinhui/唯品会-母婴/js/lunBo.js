/**
 * Created by 1234 on 2017/4/7.
 */
$(function (){
    //����: �޷����;(ԭ��:���Ƶ�һ�ŵ���ĩβ,Ȼ��ڶ��ִӵ�һ�Ż������ڶ��ŵ�ʱ��,˲����������һ��,�ڴӵ�һ�Ż������ڶ��� )

    //1.����ul�еĵ�һ��li;
    //2.ul�е�����li���¼��������ֲ��߼�(����1)
    //3.����Ҳ��С���ǣ���������һ�ţ�(����2)
    //4.�������С���ǣ���������һ�ţ�(����2)
    //5.��Ӷ�ʱ����(����2:���Ҳ�С�����߼�һ��)

    //1.����ul�еĵ�һ��li;
    var ul = document.getElementById("hezi");
    var ulLiArr = ul.children;
    ulLiArr[0].className = "current" ;
    var ol = document.getElementById("tupian");
    var img = document.getElementById("imgwidth");
    var imageWidth = img.offsetWidth;
    var right = document.getElementById("right");
    var left = document.getElementById("left");

    //console.log(imageWidth);

    //2.ul�е�����li���¼��������ֲ��߼�(����1)
    for(var i=0;i<ulLiArr.length;i++){
        ulLiArr[i].index = i;
        //console.log(i);
        ulLiArr[i].onmouseover = function (){
            for(var j=0;j<ulLiArr.length;j++){
                ulLiArr[j].className = "";
            }
            this.className = "current";
            console.log(imageWidth);
            animate1(ol,-imageWidth*this.index)
            key = square = this.index;
        }
    }

    //3.����Ҳ��С���ǣ���������һ�ţ�(����2)
    var key = 0;
    var square = 0;
    right.onclick = autoPlay;

    //5.��Ӷ�ʱ����(����2:���Ҳ�С�����߼�һ��)
    var timer = setInterval(autoPlay,2000);
    //�����������ʱ��,�ƿ��ٴο�����ʱ��
    //��������ʾ,�ƿ�����;
    img.onmouseover = function () {
        //arr.style.display = "block";
        clearInterval(timer);
    }
    img.onmouseout = function () {
        //arr.style.display = "none";
        timer = setInterval(autoPlay,2000);
    }



    //�Ҳ�С���ǵķ�����װ
    function autoPlay() {
        //˼·: 1.����ֵ����(�޷����);   2.��������;    3.�ƶ�ul;

        //1.����ֵ����(�޷����)
        key++;//ͼƬ������ֵҪ�յ�Լ��;
        //(�޷����ԭ��: ˲����������һ��,�ڴӵ�һ�Ż������ڶ���)
        //key������ֵ���5.����6��ʱ��, ˲����������һ��,�ڴӵ�һ�Ż������ڶ���;
        if(key === 3){
            //��������һ��;
            ol.style.left = 0;//��һ��ͼƬ��ʾ��ʱ��,ul��leftֵΪ0;
            //�������ڶ���(����ֵΪ1)
            key = 1;
        }

        square++;//С���������ֵҪ�յ�Լ��;(��)
        //square�����ֵΪ4;  ��5��ʱ���ֵ����Ϊ0;�����һ��!
        if(square === 3){
            square = 0;
        }

        //2.��������;
        for(var j=0;j<ulLiArr.length;j++){
            ulLiArr[j].className = "";
        }
        ulLiArr[square].className = "current";
        //3.�ƶ�ul;
        animate1(ol,-imageWidth*key);
    }
});




//��װһ������,���԰���Ŀ��Ŀ��ֵ�ƶ�����;
function animate1(ele,target){
    //Ҫ�ö�ʱ��,�������ʱ��;
    clearInterval(ele.timer);
    //ÿ������һ����ʱ��;�Ѷ�ʱ����Ϊ���ӵ���������;(�Զ�������)
    ele.timer = setInterval(function () {
        //����������ԶΪ10; ��Ϊ������ȡֵҪ��������;
        var step = target>ele.offsetLeft?10:-10;
        //�ƶ�����
        ele.style.left = ele.offsetLeft + step + "px";

        //�ж�:����Ŀ��λ��ֹͣ��ʱ��
        //���С������;  Ŀ��λ�ú͵�ǰλ��֮��ľ��벻��һ��������ʱ��;
        if(Math.abs(target-ele.offsetLeft) <= Math.abs(step)){
            //����Ŀ��λ��Ϊtarget,�������ʱ��;
            ele.style.left = target + "px";
            clearInterval(ele.timer);
        }
    },5);
}