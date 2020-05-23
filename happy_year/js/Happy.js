window.onload = function() {
  var page1_blessing = document.getElementById("page1_blessing");
  var page1 = document.getElementById("page1");
  var page2 = document.getElementById("page2");
  var page3 = document.getElementById("page3");
  var music = document.getElementById("music_circle");
  var audio = document.getElementsByTagName("audio")[0];
  var page3_blessing = document.getElementsByClassName("page3_blessing")[0];
  //控制音乐
  music.addEventListener(
    "click",
    function() {
      if (audio.paused) {
        audio.play();
        this.childNodes[1].setAttribute("class", "music_record_play");
      } else {
        audio.pause();
        this.childNodes[1].setAttribute("class", "music_record_pause");
      }
    },
    false
  );
  //播完音乐停止动画
  audio.addEventListener(
    "ended",
    function() {
      music.childNodes[1].setAttribute("class", "music_record_pause");
    },
    false
  );

  page1_blessing.addEventListener(
    "touchstart",
    function() {
      audio.play();
      music.childNodes[1].setAttribute("class", "music_record_play");
      page1.style.display = "none";
      page2.style.display = "block";
      setTimeout(function() {
        page2.setAttribute("class", "page2 fadeOut");
        page3.setAttribute("class", "page3 fadeIn");
      }, 2050);
    },
    false
  );

  page3_blessing.addEventListener(
    "touchstart",
    function() {
      page1.style.display = "block";
      page2.style.display = "none";
      page2.setAttribute("class", "page2");
      page3.setAttribute("class", "page3");
    },
    false
  );
};
