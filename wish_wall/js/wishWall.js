window.onload=function(){
	var time = document.getElementById('time');
	var date = new Date();
	var Y = date.getFullYear();
	var M = date.getMonth();
	var D = date.getDate();
	var H = date.getHours(); 
    var MM = date.getMinutes();
    var germination = document.getElementById('germination');
    var send = document.getElementById('send');
    var wish = document.getElementById('wish');
    var wish_bottom = document.getElementById('wish_bottom');
    var main = document.getElementById('main');
    var top = document.getElementById('top');
    var ger = document.getElementsByClassName('germination');
    var move1 = document.getElementsByTagName('dt');
    var input = document.getElementsByTagName('input');
    automove();
    function automove(){
        var elH = document.documentElement.clientHeight-top.clientHeight;
        var elW = document.documentElement.clientWidth;
        for(var i=0;i<ger.length;i++){
            var obj = ger[i];
            obj.style.top=parseInt(Math.random() * (elH - germination.clientHeight)) + 'px';
            obj.style.left=parseInt(Math.random() * (elW - germination.clientWidth)) + "px";
            darg(obj,$('dt',obj));
        }

       $( 'textarea[name=wish_seed]' ).keyup( function () {
        //调用check函数取得当前字数
        var content = wish.wish_seed.value;
        var lengths = check(content);  
        //最大允许输入50个字
        if (lengths[0] >= 50) {
            $(this).val(content.substring(0, Math.ceil(lengths[1])));
        }
        var num = 50 - Math.ceil(lengths[0]);
        var msg = num < 0 ? 0 : num;
        if(msg<=5){
            $('#num_style' ).css('color','red');
        }else{
            $('#num_style' ).css('color','green');
        }
        //当前字数同步到显示提示
        $( '#num_style' ).html( msg );
            } );
        function check (str) {
            var num = [0, 50];
            for (var i=0; i<str.length; i++) {
            //字符串不是中文时
            if (str.charCodeAt(i) >= 0 && str.charCodeAt(i) <= 255){
            num[0] = num[0] + 0.5;//当前字数增加0.5个
            num[1] = num[1] + 0.5;//最大输入字数增加0.5个
        } else {//字符串是中文时
            num[0]++;//当前字数增加1个
        }
    }
        return num;
    }
    }
    if(MM<10){
        MM="0" + MM;
    };
    M=M+1;
    time.innerHTML= Y + "-" + M  + "-" + D + " " + H + ":" + MM;
    function darg(objs,elements){
        var x,y,moving;
        elements.mousedown(function(e){
            x = e.clientX - objs.offsetLeft;
            y = e.clientY - objs.offsetTop;
            moving= true;
        });
        $(document).mousemove(function(e){
                if(!moving)return;
                var xs = e.clientX-x;
                var ys = e.clientY-y;
                if(xs<=0){
                    xs=0;
                }
                if(xs>document.documentElement.clientWidth-objs.clientWidth){
                    xs=document.documentElement.clientWidth-objs.clientWidth;
                }
                if(ys<=0){
                    ys=0;
                }
                if(ys>document.documentElement.clientHeight-objs.clientHeight){
                    ys=document.documentElement.clientHeight-objs.clientHeight;
                }
                objs.style.opacity="0.5";
                objs.style.left=xs + "px";
                objs.style.top=ys + "px";
            });
        $(document).mouseup(function(){
            moving=false;
            objs.style.opacity="1";
            $(document).onmousemove=null;
            $(document).onmouseup=null;
        });
    }

    send.onclick=function(){
    	wish.style.animation='fadeIn 0.6s ease-out forwards';
    }
    wish_bottom.onclick=function(){
        var reg = /^[0-9]*$/;
        if(reg.test(wish.nickname.value)||wish.nickname.value==""||wish.wish_seed.value.length>50){
            alert("提交失败");
            return;
         }else{
            wish.style.animation="fadeOut 1s ease-in forwards";
            // alert("提交成功");
         }
         var name = wish.nickname.value;
         var text = wish.wish_seed.value;
         var dl = document.createElement("dl");
         var dt = document.createElement("dt");
         var span1 = document.createElement("span");
         var span2 = document.createElement("span");
         var span3 = document.createElement("span");
         var dd1 = document.createElement("dd");
         var dd2 = document.createElement("dd");
         var a = document.createElement("a");
         dl.setAttribute('class','germination a1');
         dt.setAttribute('class','move1');
         span1.setAttribute('class','username');
         span1.innerHTML=name;
         span2.setAttribute('class','num');
         dd1.setAttribute('class','content');
         dd1.innerHTML=text;
         dd2.setAttribute('class','bottom');
         span3.setAttribute('class','time');
         a.setAttribute('class','close');
         main.appendChild(dl).appendChild(dt).appendChild(span1);
         main.appendChild(dl).appendChild(dt).appendChild(span2);
         main.appendChild(dl).appendChild(dd1);
         main.appendChild(dl).appendChild(dd2).appendChild(span3);
         main.appendChild(dl).appendChild(dd2).appendChild(a);
    }

}