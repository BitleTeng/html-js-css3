window.onload = function () {
    var move_img = document.getElementsByClassName("move_img");
    var move_circle = document.getElementsByClassName("move_circle");
    var v = 0;
    move_fn();
    function move_fn() {
        v++;
        if (v == 6) {
            v = 0;
        }
        none_fn();
        move_img[v].style.display = "block";
        move_circle[v].style.backgroundColor = "#330099";
        move_circle[v].style.opacity = "0.6";
    }
    function none_fn() {
        for (var i = 0; i < move_img.length; i++) {
            move_img[i].style.display = "none";
            move_circle[i].style.backgroundColor = "#ffffff";
            move_circle[i].style.opacity = "0.6";
        }
    }
    var stop = setInterval(move_fn, 2500);
    for (var i = 0; i < move_circle.length; i++) {
        move_circle[i].index = i;
        move_circle[i].onmouseover = function () {
            v = this.index;
            clearInterval(stop);
            none_fn();
            this.style.backgroundColor = "#330099";
            move_img[v].style.display = "block";
        }
        move_circle[i].onmouseout = function () {
            stop = setInterval(move_fn, 2500);
        }
    }
}