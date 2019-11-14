// 点击变色
	$(".actived").click(function(){
		// 改变背景色
		$("#xing").addClass("fa-heart").removeClass("fa-heart-o").css({"color":"pink"});
		// 获取文本内容
		var text = parseInt($(".count").text());
		text=text+1;
		console.log(text);
		// 点击之后加一
		$(".count").html(text);
	})
// 导航栏
	var num;
    $('.nav-main>li[id]').hover(function(){
       /*图标向上旋转*/
        $(this).children().removeClass().addClass('hover-up');
        /*下拉框出现*/
        var Obj = $(this).attr('id');
        num = Obj.substring(3, Obj.length);
        $('#box-'+num).stop().slideDown(800);
    },function(){
        /*图标向下旋转*/
        $(this).children().removeClass().addClass('hover-down');
        /*下拉框消失*/
        $('#box-'+num).hide();
    });
//    hidden-box hover e
    $('.hidden-box').hover(function(){
        /*保持图标向上*/
        $('#li-'+num).children().removeClass().addClass('hover-up');
        $(this).show();
    },function(){
        $(this).stop().slideUp(500);
        $('#li-'+num).children().removeClass().addClass('hover-down');
    });

    // 时钟
    window.onload = function(){
        time();
        ampm();
        whatDay();
        setInterval(function(){
            time();
            ampm();
            whatDay();
        }, 1000);
    };


    //创建一个自定义time 时间函数
    function time(){
        var date = new Date(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();
        //判断小时是否大于12
        hours = (hours > 12) ? (hours - 12) : hours;
        hours = (hours === 0) ? 12 : hours;
        //当时分秒小于10时，调用addZero函数补0
        hours = addZero(hours);
        minutes = addZero(minutes);
        seconds = addZero(seconds);
        //将所获得的数据输出到页面当中去
        document.getElementsByClassName('hours')[0].innerHTML = hours;
        document.getElementsByClassName('minutes')[0].innerHTML = minutes;
        document.getElementsByClassName('seconds')[0].innerHTML = seconds;
    }

    //通过一个函数将时分秒在前面添加0
    function addZero (val){
        return (val <= 9) ? ("0" + val) : val;
    }

    //输出am和pm
    function ampm(){
        var date = new Date(),
            hours = date.getHours(),
            am = document.getElementsByClassName("am")[0].classList,
            pm = document.getElementsByClassName("pm")[0].classList;
        
            
        (hours >= 12) ? pm.add("light-on") : am.add("light-on");
        (hours >= 12) ? am.remove("light-on") : pm.remove("light-on");
    }

    //获取星期
    function whatDay(){
        var date = new Date(),
            currentDay = date.getDay(),
            days = document.getElementsByClassName("day");

        for (x in days){
            var classArr = days[x].classList;

            (classArr !== undefined) && ((x == currentDay) ? classArr.add("light-on") : classArr.remove("light-on"));
        }
    }


// 多级列表展示
$(".classify ul li").click(function(){
    if($(this).find("ul").css("display")=="none")
    {
        $(this).find("ul").slideDown(1000)
    }else{
        $(this).find("ul").slideUp(1000)
    }
   
})

// 鼠标经过图片变圆
$(".related_box img").mouseover(function(){
    $(this).stop().animate({"border-radius":"50%"},2000)
})
$(".related_box img").mouseout(function(){
    $(this).stop().animate({"border-radius":"0"},1000)
})

// 轮播图
$(function () {
    var num = 0;
    var timer = null;
    // 实现轮播图片自动播放
    function autoPaly(){
        num++;
        if(num>6){
            $(".banner ul").css({
                left:0
            })
            num=0;
        }
        // 下面小点进行轮播
        $(".banner ol li").eq(num).addClass("current").siblings().removeClass("current");
        // 图片滑动轮播
        $(".banner ul").stop().animate({left:-760*num},2000)
    }
    function upPaly(){
        num--;
        if(num<0){
            num=5;
            $(".banner ul").css({
                left:-760*6
            })
        }
        $(".banner ol li").eq(num).addClass("current").siblings().removeClass("current");
        $(".banner ul").stop().animate({left:-760*num},2000)

    }

$(".banner ol li").click(function(){
    $(this).addClass("current").siblings().removeClass("current");
    var index = $(this).index();
    num=index;
    $("ul").animate({left:-760*index},2000)
})
// var timer = null;
    timer = setInterval(autoPaly,3000)
    $(".banner").mouseover(function(){
        clearInterval(timer)
    })
    $(".banner").mouseout(function(){
        clearInterval(timer);
        timer = setInterval(autoPaly,3000)

    })
    $(".right").click(function(){
        autoPaly();
    })
    $(".left").click(function(){
        upPaly();
    })
})
