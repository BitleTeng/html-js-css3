window.onload = function() {
  //进行rem布局的自适应过程,默认设置的设计图纸为750
  var calculatSeize = function() {
    var BASE_FONT_SIZE = 100;
    var roat = 1;
    var docEl = document.documentElement,
      clientWidth = docEl.clientWidth;
    clientHeight = docEl.clientHeight;
    if (!clientWidth) return;
    var html_font_size = BASE_FONT_SIZE * ((clientWidth * roat) / 750);
    docEl.style.fontSize = html_font_size + "px";
    // 如果只是在相应的-0.01~0.01之间的小数值，直接进行return掉
    if (
      html_font_size - parseFloat(getComputedStyle(docEl).fontSize) < 0.01 &&
      html_font_size - parseFloat(getComputedStyle(docEl).fontSize) > -0.01
    ) {
      // 计算准确直接跳出
      return;
    }
    // 在曲面屏手机存在着rem计算不准的问题
    else {
      var again_html_font_size =
        html_font_size /
        (parseInt(getComputedStyle(docEl).fontSize) / html_font_size);
      docEl.style.fontSize = again_html_font_size + "px";
    }
  };
  if (document.addEventListener) {
    var resizeEvt =
      "orientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(resizeEvt, calculatSeize, false);
    document.addEventListener("DOMContentLoaded", calculatSeize, false);
    calculatSeize();
  }
  // 操作代码
  var now_test = document.getElementsByClassName("now_test")[0];
  var question_one = document.getElementsByClassName("question_one")[0];
  var question_two = document.getElementsByClassName("question_two")[0];
  var question_three = document.getElementsByClassName("question_three")[0];
  var question_four = document.getElementsByClassName("question_four")[0];
  var question_five = document.getElementsByClassName("question_five")[0];
  var question_six = document.getElementsByClassName("question_six")[0];
  var question_seven = document.getElementsByClassName("question_seven")[0];
  var question_eight = document.getElementsByClassName("question_eight")[0];
  var main = document.getElementsByClassName("main")[0];
  var preexistence = document.getElementsByClassName("preexistence")[0];
  // var audio = document.getElementsByTagName("audio")[0];
  var questionArr = [
    question_one,
    question_two,
    question_three,
    question_four,
    question_five,
    question_six,
    question_seven,
    question_eight
  ];
  var replay = [];
  function public_() {
    if (main.children[9].style.display == "block") {
      setTimeout(function() {
        var boy1 = [
          "温润如玉家庭煮夫",
          "稳中带皮老司机",
          "佛系青年代表",
          "精致的猪猪男孩",
          "未来中年圈扛把子",
          "欢脱癌晚期患者"
        ];
        var girl1 = [
          "佛系青年代表",
          "朋克养生小仙女",
          "呆萌可爱小公举",
          "精致的猪猪女孩",
          "稳中带皮老司机",
          "欢脱癌晚期患者"
        ];
        var boy2 = [
          "前世的你是气宇轩昂的后羿",
          "前世的你是雄姿英发的吴刚",
          "前世的你是大方抠脚的嫦娥",
          "前世的你是风流倜傥的后羿",
          "前世的你是高冷乖巧的玉兔",
          "前世的你是一棵被砍的树！"
        ];
        var girl2 = [
          "前世的你是风华绝代的嫦娥",
          "前世的你是温顺粘人的玉兔",
          "前世的你是gay里gay气的吴刚",
          "前世的你是引领潮流的嫦娥",
          "前世的你是gay里gay气的后羿",
          "前世的你竟然是一棵树！！"
        ];
        var boy2_img = [
          "https://tools.dianliaoapp.com/test/test-2018-09-27-1416.png",
          "https://tools.dianliaoapp.com/test/test-2018-09-27-5884.png",
          "https://tools.dianliaoapp.com/test/test-2018-09-27-4132.png",
          "https://tools.dianliaoapp.com/test/test-2018-09-27-1416.png",
          "https://tools.dianliaoapp.com/test/test-2018-09-27-8569.png",
          "https://tools.dianliaoapp.com/test/test-2018-09-27-1858.png"
        ];
        // 嫦娥 玉兔 吴刚 嫦娥 后羿 树
        var girl2_img = [
          "https://tools.dianliaoapp.com/test/test-2018-09-27-4132.png",
          "https://tools.dianliaoapp.com/test/test-2018-09-27-8569.png",
          "https://tools.dianliaoapp.com/test/test-2018-09-27-5884.png",
          "https://tools.dianliaoapp.com/test/test-2018-09-27-4132.png",
          "https://tools.dianliaoapp.com/test/test-2018-09-27-1416.png",
          "https://tools.dianliaoapp.com/test/test-2018-09-27-1858.png"
        ];
        var boy3 = [
          "守护世界和平是你的梦想",
          "朋友中的隐性富豪",
          "外表稳重而内心放荡",
          "众人中的C位担当",
          "喜欢无拘无束的生活",
          "小猪佩奇身上纹"
        ];
        var girl3 = [
          "追求诗和远方的文艺青年",
          "拥有敏感细腻的心思",
          "能够治愈身边一切负能量",
          "永远走在时代的前沿",
          "喜欢浪漫欢乐的生活",
          "小猪佩奇身上纹"
        ];
        var random_sex = Math.floor(Math.random() * 2);
        // 前面三句
        for (var i = 0; i < 3; i++) {
          if (replay[i] && replay[i + 1] == "A") {
            if (random_sex == 0) {
              if (i == 0) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl1[i];
              } else if (i == 1) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl2[i];
                preexistence.style.backgroundImage =
                  "url(" + girl2_img[i] + ")";
              } else if (i == 2) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl3[i];
              }
            } else {
              if (i == 0) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy1[i];
              } else if (i == 1) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy2[i];
                preexistence.style.backgroundImage = "url(" + boy2_img[i] + ")";
              } else if (i == 2) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy3[i];
              }
            }
          } else if (
            (replay[i] == "A" && replay[i + 1] == "B") ||
            (replay[i + 1] == "A" && replay[i] == "B")
          ) {
            if (random_sex == 0) {
              if (i == 0) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl1[i];
              } else if (i == 1) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl2[i];
                  preexistence.style.backgroundImage =
                  "url(" + girl2_img[i] + ")";
              } else if (i == 2) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl3[i];
              }
            } else {
              if (i == 0) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy1[i];
              } else if (i == 1) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy2[i];
                  preexistence.style.backgroundImage = "url(" + boy2_img[i] + ")";
              } else if (i == 2) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy3[i];
              }
            }
          } else if (
            (replay[i] == "A" && replay[i + 1] == "C") ||
            (replay[i + 1] == "A" && replay[i] == "C")
          ) {
            if (random_sex == 0) {
              if (i == 0) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl1[i];
              } else if (i == 1) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl2[i];
                  preexistence.style.backgroundImage =
                  "url(" + girl2_img[i] + ")";
              } else if (i == 2) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl3[i];
              }
            } else {
              if (i == 0) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy1[i];
              } else if (i == 1) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy2[i];
                  preexistence.style.backgroundImage = "url(" + boy2_img[i] + ")";
              } else if (i == 2) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy3[i];
              }
            }
          } else if (replay[i] && replay[i + 1] == "B") {
            if (random_sex == 0) {
              if (i == 0) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl1[i];
              } else if (i == 1) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl2[i];
                  preexistence.style.backgroundImage =
                  "url(" + girl2_img[i] + ")";
              } else if (i == 2) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl3[i];
              }
            } else {
              if (i == 0) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy1[i];
              } else if (i == 1) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy2[i];
                  preexistence.style.backgroundImage = "url(" + boy2_img[i] + ")";
              } else if (i == 2) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy3[i];
              }
            }
          } else if (
            (replay[i] == "B" && replay[i + 1] == "C") ||
            (replay[i + 1] == "B" && replay[i] == "C")
          ) {
            if (random_sex == 0) {
              if (i == 0) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl1[i];
              } else if (i == 1) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl2[i];
                  preexistence.style.backgroundImage =
                  "url(" + girl2_img[i] + ")";
              } else if (i == 2) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl3[i];
              }
            } else {
              if (i == 0) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy1[i];
              } else if (i == 1) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy2[i];
                  preexistence.style.backgroundImage = "url(" + boy2_img[i] + ")";
              } else if (i == 2) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy3[i];
              }
            }
          } else if (replay[i] && replay[i + 1] == "C") {
            if (random_sex == 0) {
              if (i == 0) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl1[i];
              } else if (i == 1) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl2[i];
                  preexistence.style.backgroundImage =
                  "url(" + girl2_img[i] + ")";
              } else if (i == 2) {
                preexistence.children[0].children[0].children[i].textContent =
                  girl3[i];
              }
            } else {
              if (i == 0) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy1[i];
              } else if (i == 1) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy2[i];
                  preexistence.style.backgroundImage = "url(" + boy2_img[i] + ")";
              } else if (i == 2) {
                preexistence.children[0].children[0].children[i].textContent =
                  boy3[i];
              }
            }
          }
        }
        var stochastic1 = [
          "家里开矿的你",
          "渴望被爱的你",
          "时尚潮流的你",
          "洒脱叛逆的你",
          "中二欢脱的你",
          "蠢萌扎心的你"
        ];
        var stochastic2 = [
          "拥有一颗炽热又无处安放的灵魂",
          "一身的艺术细菌",
          "承受了这个年纪不该有的魅力",
          "拥有一往无前的勇气",
          "如同脱开缰绳的二哈",
          "是人群中的开心果"
        ];
        var stochastic_random = Math.ceil(Math.random() * 2);
        for (i = 6; i < 8; i++) {
          if (replay[i] == "A") {
            if (i == 6) {
              if (stochastic_random == 0) {
                preexistence.children[0].children[0].children[3].textContent =
                  stochastic1[0];
                stochastic_random = Math.ceil(Math.random() * 2);
              } else {
                preexistence.children[0].children[0].children[3].textContent =
                  stochastic1[1];
                stochastic_random = Math.ceil(Math.random() * 2);
              }
            } else if (i == 7) {
              if (stochastic_random == 0) {
                preexistence.children[0].children[0].children[4].textContent =
                  stochastic2[0];
                stochastic_random = Math.ceil(Math.random() * 2);
              } else {
                preexistence.children[0].children[0].children[4].textContent =
                  stochastic2[1];
                stochastic_random = Math.ceil(Math.random() * 2);
              }
            }
          } else if (replay[i] == "B") {
            if (i == 6) {
              if (stochastic_random == 0) {
                preexistence.children[0].children[0].children[3].textContent =
                  stochastic1[2];
                stochastic_random = Math.ceil(Math.random() * 2);
              } else {
                preexistence.children[0].children[0].children[3].textContent =
                  stochastic1[3];
                stochastic_random = Math.ceil(Math.random() * 2);
              }
            } else if (i == 7) {
              if (stochastic_random == 0) {
                preexistence.children[0].children[0].children[4].textContent =
                  stochastic2[2];
                stochastic_random = Math.ceil(Math.random() * 2);
              } else {
                preexistence.children[0].children[0].children[4].textContent =
                  stochastic2[3];
                stochastic_random = Math.ceil(Math.random() * 2);
              }
            }
          } else if (replay[i] == "C") {
            if (i == 6) {
              if (stochastic_random == 0) {
                preexistence.children[0].children[0].children[3].textContent =
                  stochastic1[4];
                stochastic_random = Math.ceil(Math.random() * 2);
              } else {
                preexistence.children[0].children[0].children[3].textContent =
                  stochastic1[5];
                stochastic_random = Math.ceil(Math.random() * 2);
              }
            } else if (i == 7) {
              if (stochastic_random == 0) {
                preexistence.children[0].children[0].children[4].textContent =
                  stochastic2[4];
                stochastic_random = Math.ceil(Math.random() * 2);
              } else {
                preexistence.children[0].children[0].children[4].textContent =
                  stochastic2[5];
                stochastic_random = Math.ceil(Math.random() * 2);
              }
            }
          }
        }
        main.children[9].style.display = "none";
        main.children[9].nextElementSibling.style.display = "block";
      }, 3000);
    }
  }
  now_test.addEventListener(
    "touchstart",
    function() {
      now_test.parentElement.style.display = "none";
      questionArr[0].style.display = "block";
      // audio.play();
    },
    false
  );
  for (var i = 0; i < 8; i++) {
    questionArr[i].index = i;
    for (var j = 0; j < 3; j++) {
      questionArr[i].children[0].children[j].index = j;
      questionArr[i].children[0].children[j].addEventListener(
        "touchstart",
        function() {
          if (this.index == 0) {
            this.parentElement.parentElement.style.display = "none";
            this.parentElement.parentElement.nextElementSibling.style.display =
              "block";
            replay.push("A");
            public_();
          } else if (this.index == 1) {
            this.parentElement.parentElement.style.display = "none";
            this.parentElement.parentElement.nextElementSibling.style.display =
              "block";
            replay.push("B");
            public_();
          } else if (this.index == 2) {
            this.parentElement.parentElement.style.display = "none";
            this.parentElement.parentElement.nextElementSibling.style.display =
              "block";
            replay.push("C");
            public_();
          }
        },
        false
      );
    }
  }
};
