//接下来全部都是设置中奖后的烟花效果
window.requestAnimFrame = ( function() {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback){
                window.setTimeout(callback, 1000/60);
            };
})();
//定义基本变量
var canvas = document.getElementById( 'canvas' ),
    ctx = canvas.getContext( '2d' ),
    cw = window.innerWidth,
    ch = window.innerHeight,
    fireworks = [],
    particles = [],
    hue = 120,
    timerTotal = 80,
    timerTick = 0,
    mousedown = false;
//设置canvas的宽高
canvas.width = cw;
canvas.height = ch;
//在范围内得到随机数
function random(min, max){
    return Math.random()*(max-min)+min;
}
//计算两点之间的距离
function calculateDistance(p1x, p1y, p2x, p2y){
    var xDistance = p1x - p2x,
        yDistance = p1y - p2y;
    return Math.sqrt(Math.pow(xDistance, 2)+Math.pow(yDistance, 2));
}
//创造烟花
function Firework(sx, sy, tx, ty){
    this.x = sx;
    this.y = sy;
    this.sx = sx;
    this.sy = sy;
    this.tx = tx;
    this.ty = ty;
    this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
    this.distanceTraveled = 0;
    this.coordinates = [];
    this.coordinateCount = 3;
    while(this.coordinateCount--){
        this.coordinates.push([this.x, this.y]);
    }
    //atan2()方法可返回从x轴到点(x,y)之间的角度
    this.angle = Math.atan2(ty-sy, tx-sx);
    //速度大小设置
    this.speed = 2;
    //加速度控制倍数
    this.acceleration = 1.05;
    //产生随机的颜色控制
    this.brightness = random(50, 70);
    //圆形目标指示器半径
    this.targetRadius = 1;
}
//更新的烟花
    Firework.prototype.update = function(index){
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);
        if(this.targetRadius<8){
            this.targetRadius += 0.3;
        }else{
            this.targetRadius = 1;
        }
        
        this.speed *= this.acceleration;
        
        var vx = Math.cos(this.angle)*this.speed,
            vy = Math.sin(this.angle)*this.speed;
        //判断烟花是否已经跑过了目标距离
        this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x+vx, this.y+vy);
        if(this.distanceTraveled>=this.distanceToTarget){
            //在判断成立时，创建烟花粒子，将目标的坐标传进去
            createParticles(this.tx, this.ty);
            //将烟花的数组该个烟花删除
            fireworks.splice(index, 1);
        }else{
            //判断不成立，此时将实际位置加上速度对应的位移
            this.x += vx;
            this.y += vy;
        }
    };
    //绘制烟花
    Firework.prototype.draw = function(){
        //开始一条路径
        ctx.beginPath();
        //移动到位置点
        ctx.moveTo(this.coordinates[this.coordinates.length-1][0], this.coordinates[this.coordinates.length-1][1]);
        //创建到达位置点
        ctx.lineTo(this.x, this.y);
        //设置或返回用于笔触的颜色、渐变或模式
        ctx.strokeStyle = 'hsl('+hue+', 100%, '+this.brightness+'%)';
        //stroke()方法会实际地绘制出通过moveTo()和lineTo()方法定义的路径
        ctx.stroke();
        ctx.beginPath();
        //arc(中心点x,中心点y,半径r,起始角,结束角)
        ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI*2);
        //stroke(),绘制图形默认颜色是黑色
        ctx.stroke();
    };
    //创建粒子
    function Particle(x, y){
        this.x = x;
        this.y = y;
        //跟踪每个粒子的过去坐标，创建一个跟踪效果，增加坐标计数来创建更突出的路径
        this.coordinates = [];
        this.coordinateCount = 5;
        while(this.coordinateCount--){
            this.coordinates.push([this.x, this.y]);
        }
        //在所有可能的方向设置一个任意角度的弧度、速度
        this.angle = random(0, Math.PI*2);
        this.speed = random(1, 10);
        //摩擦使粒子减速
        this.friction = 0.95;
        //重力将粒子拉下来
        this.gravity = 1;
        //设置色相为一个随机数-20 —— +20的整体色调变量
        this.hue = random(hue-20, hue+20);
        this.brightness = random(50, 80);
        this.alpha = 1;
        //设置粒子消失的速度
        this.decay = random(0.015, 0.03);
    }
    //更新粒子
    Particle.prototype.update = function(index){
        //删除坐数组中的最后一个项目
        this.coordinates.pop();
        //将当前坐标添加到数组的开始
        this.coordinates.unshift([this.x, this.y]);
        //粒子速度减慢
        this.speed *= this.friction;
        //粒子的实际速度
        this.x += Math.cos(this.angle)*this.speed;
        this.y += Math.sin(this.angle)*this.speed+this.gravity;
        //淡出粒子
        this.alpha -= this.decay;
        //删除粒子一旦alpha足够低，根据传入的索引
        if(this.alpha<=this.decay){
            particles.splice(index, 1);
        }
    };
    //绘制粒子
    Particle.prototype.draw = function(){
        ctx.beginPath();
        //移动到集合的最后一个跟踪坐标，然后向当前x和y绘制一条线
        ctx.moveTo(this.coordinates[this.coordinates.length-1][0], this.coordinates[this.coordinates.length-1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = 'hsla('+this.hue+', 100%, '+this.brightness+'%, '+this.alpha+')';
        ctx.stroke();
    };
    //创建粒子群进行爆炸
    function createParticles(x, y){
        //增加粒子数为营造爆炸效果
        var particleCount = 30;
        while(particleCount--){
            particles.push(new Particle(x, y));
        }
    }
    //主要演示环
    function loop() {
        //一直调用requestAnimationFrame函数
        requestAnimationFrame(loop);
        //随着时间的推移，增加色调
        hue += 0.5;
        //destination-out在源图像外显示目标图像，只有源图像外的目标图像部分会被显示，源图像是透明的
        ctx.globalCompositeOperation = 'destination-out';
        //减少alpha属性创建更突出的路径
        //fillStyle设置或返回用于填充绘画的颜色、渐变或模式
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        //fillRect绘制“被填充”的矩形
        ctx.fillRect(0, 0, cw, ch);
        //改变复合操作回到我们的主模式
        //lighter显示源图像+目标图像
        ctx.globalCompositeOperation = 'lighter';
        //在这里循环每一个烟花，绘制它、更新它
        var i = fireworks.length;
        while(i--) {
            fireworks[i].draw();
            fireworks[i].update(i);
        }
        //在这里循环每一个粒子，绘制它、更新它
        var j = particles.length;
        while(j--) {
            particles[j].draw();
            particles[j].update(j);
        }
        //鼠标不点击时，判断一定时间内，开启底部中央的烟花效果
        if(timerTick >= timerTotal) {
            if(!mousedown) {
                //设置烟花的初始位置，随机产生目标位置（在屏幕上方1/4的位置）
                fireworks.push(new Firework(cw/2, ch, random(0, cw), random(0, ch/4)));
                //重新开始生成新的循环
                timerTick = 0;
            }
        } else {
            timerTick++;
        }
    }
    //在窗口加载的时候，准备开启加载烟花效果
    window.onload = loop;