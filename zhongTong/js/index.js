$(document).ready(function() {
  var info1 = 0;
  var info2 = 0;
  var bool = false;
  var bool2 = false;
  var reduce_time = 60;
  $(".content2").css("display", "none");
  $("#header>li").click(function() {
    $("#header>li").css("color", "#666");
    $("#header>li").removeClass();
    $(this).css("color", "#3b95fa");
  });
  $("#header>li:nth-of-type(1)").click(function() {
    $(this).addClass("ce1");
    $(".content1").show();
    $(".content2").css("display", "none");
  });
  $("#header>li:nth-of-type(2)").click(function() {
    $(this).addClass("ce2");
    $(".content1").hide();
    $(".content2").show();
    // $(".content2").css("display","block");
    // 优化部分
  });
  //加减重量
  $(".reduce_weight").click(function() {
    info1--;
    if (info1 < 0) {
      info1 = 0;
    }
    $(".weight_num").html(info1);
  });
  $(".add_weight").click(function() {
    info1++;
    if (info1 > 1000) {
      info = 1000;
    }
    $(".weight_num").html(info1);
  });
  //加减件数
  $(".reduce_num").click(function() {
    info2--;
    if (info2 < 0) {
      info2 = 0;
    }
    $(".num_num").html(info2);
  });
  $(".add_num").click(function() {
    info2++;
    if (info2 > 1000) {
      info = 1000;
    }
    $(".num_num").html(info2);
  });
  //同意协定
  $(".agree").click(function() {
    if (bool == false) {
      $(this).css({
        "background-image": "url(./images/selected.png)"
      });
      $(".sub").css("background-color", "#3b95fa");
      bool = 1;
    } else if (bool == true) {
      $(this).css({
        "background-image": ""
      });
      $(".sub").css("background-color", "");
      bool = 0;
    }
  });
  //关闭通告
  $(".close").click(function() {
    $(".notice").addClass("fadeOutUp");
  });
  var stop = setInterval(function() {
    if ($(".notice").prop("class") == "notice") {
      $(".notice").addClass("fadeOutUp");
      clearInterval(stop);
    }
  }, 3000);
  //填写信息
  $(".write").click(function() {
    $(".page1").hide();
	$(".page2").show();
	$(".confirm").show();
  });
  $(".back").click(function() {
    $(".page2").hide();
    $(".page1").show();
  });
  //倒计时
  $(".reduce_get").click(function() {
    var stop = setInterval(function() {
      reduce_time--;
      $(".reduce_get").text(reduce_time + "s" + " 重新发送");
      $(".reduce_get").css("background-color", "#d2d2d2");
      if (reduce_time == -1) {
        clearInterval(stop);
        $(".reduce_get").html("获取验证码");
        reduce_time = 60;
      }
    }, 1000);
  });
  //保存
  $(".save").click(function() {
    if (bool2 == false) {
      $(this).css({
        "background-image": "url(./images/selected.png)"
      });
      bool2 = true;
    } else if (bool2 == true) {
      $(this).css({
        "background-image": ""
      });
      bool2 = false;
    }
  });
  var bool3 = 0;
  $(".receive").click(function() {
    if (bool3 == 0) {
      $(".receive_page").hide(100);
      $(".receive").css("transform", "");
      bool3 = 1;
    } else {
      $(".receive_page").show(100);
      $(".receive").css("transform", "rotate(180deg)");
      bool3 = 0;
    }
  });
});
