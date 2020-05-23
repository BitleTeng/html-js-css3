window.onload = function () {
/*抽奖次数，跑马灯，抽奖机会的数据获取*/
    var someData = {
        propImg : null, //图像框
        chance : 0,   //抽奖机会
        chance_login : false, //是否登陆
        chance_gold_egg : false, //是否砸金蛋
        chance_gift : false,  //是否送礼物
    };
    $.get(config.khserver + '/HActivity/getLotteryIndex',{uid:config.callAppGetUserInfo().uid},function (res) {
        var res = JSON.parse(res);
        if(res.code == 1){
           someData.propImg = res.data.prop.icon;
           $('.turntable-game-txk').css('backgroundImage','url("'+someData.propImg+'")');  //图像框
           someData.chance = res.data.chance.chance;
            $('.turntable-changes').find('span').html(res.data.chance.chance+'次');  //图像框
            $('.turntable-you-Invitation').html('已邀请'+res.data.chance.chance_invite+'个好友');
            //是否送礼物
            if(res.data.chance.chance_gift == 0){
                $('.turntable-give-gift').css({'background':'url("https://tools.dianliaoapp.com/test/test-2018-11-28-2744.png") center no-repeat','backgroundSize': 'contain'});
            
            }else{
                $('.turntable-give-gift').css({'background':'url("https://tools.dianliaoapp.com/test/test-2018-11-28-3831.png") center no-repeat','backgroundSize': 'contain'});
            };
            //是否砸金蛋
            if(res.data.chance.chance_gold_egg == 0){
                $('.turntable-zd').css({'background':'url("https://tools.dianliaoapp.com/test/test-2018-11-28-5810.png") center no-repeat','backgroundSize': 'contain'});
            
            }else{
                $('.turntable-zd').css({'background':'url("https://tools.dianliaoapp.com/test/test-2018-11-28-3831.png") center no-repeat','backgroundSize': 'contain'});
            };
             //是否登陆
             if(res.data.chance.chance_login == 0){
                $('.turntable-islogin').addClass('turntable-login');
            
            }else{
                $('.turntable-islogin').addClass('turntable-logined');
            };
            //跑马灯
            marquee.init('turntable-marquee',res.data.record_list);
        }
    });
    //登陆领取抽奖次数
    $(document).on('click touchstart', '.turntable-login' , function(){
        var _this = $(this);
        $.get(config.khserver +'/HActivity/gainLotteryChance', {uid:config.callAppGetUserInfo().uid,phone:config.callAppGetUserInfo().phone}, function(res){
            var res = JSON.parse(res);
            if(res.code == 1){
                _this.addClass('turntable-logined');
                _this.removeClass('turntable-login');
                $('.turntable-changes').find('span').html(parseInt($('.turntable-changes').find('span').html())+1 +'次')
            }else{
                config.layerMsg(res.msg, 2)
            }
        })
    })
// /*抽奖次数，跑马灯，抽奖机会的数据获取*/
// /*转盘抽奖*/
    var click=false;
    var lottery= {
        index: -1,    //当前转动到哪个位置，起点位置
        count: 0,    //总共有多少个位置
        timer: 0,    //setTimeout的ID，用clearTimeout清除
        speed: 20,    //初始转动速度
        times: 0,    //转动次数
        cycle: 50,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize: 0,    //中奖位置
        thisNum: 0,
        init: function (id) {
            if ($("#" + id).find(".turntable-game-modlue").length > 0) {
                $lottery = $("#" + id);
                $units = $lottery.find(".turntable-game-modlue");
                this.obj = $lottery;
                this.count = $units.length;
                $lottery.find(".lottery-unit-" + this.index).addClass("active");
            }
            ;
        },
        roll: function () {
            var index = this.index;
            var count = this.count;
            var lottery = this.obj;
            $(lottery).find(".lottery-unit-" + index).removeClass("active");
            index++;
            if (index > count - 1) {
                index = 0;
            }
            ;
            $(lottery).find(".lottery-unit-" + index).addClass("active");
            this.index = index;
            return false;
        }
    }
    function roll(){
        lottery.times++;
        lottery.roll();//转动过程调用的是lottery的roll方法，这里是第一次调用初始化
        if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
            clearTimeout(lottery.timer);
            //奖品显示
            setTimeout(maskPrize,500);
            lottery.prize=-1;
            lottery.times=0;
            click=false;
        }else{
            if (lottery.times<lottery.cycle) {
                lottery.speed -= 10;
            }else if(lottery.times==lottery.cycle) {
                // var index = Math.random()*(lottery.count)|0;
                // lottery.prize = index;
            }else{
                if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
                    lottery.speed += 110;
                }else{
                    lottery.speed += 20;
                }
            }
            if (lottery.speed<40) {
                lottery.speed=40;
            };
            lottery.timer = setTimeout(roll,lottery.speed);//循环调用
        }
        return false;
    };
    //抽奖数据的请求
    lottery.init('lottery');
    $(".turntable-game-begain").click(function(){
        var thisTimes = parseInt($('.turntable-changes').find('span').html());
        if (click) {//click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
            return false;
        }else{
            if(thisTimes <= 0){
                config.layerMsg('你的抽奖次数已用完', 2);
                return false;
            }
            $.get(config.khserver + '/HActivity/receiveLotteryPrize',{uid:config.callAppGetUserInfo().uid,phone:config.callAppGetUserInfo().phone},function (res) {
                var res = JSON.parse(res);
                if(res.code == 1){
                   var prizeNum = res.data;
                   thisTimes--;
                   $('.turntable-changes span').html(thisTimes+'次');
                    switch(prizeNum)
                    {
                        case 0:
                            lottery.prize = 0;
                            break;
                        case 1:
                            lottery.prize = 4;
                            break;
                        case 2:
                            lottery.prize = 5;
                            break;
                        case 3:
                            lottery.prize = 2;
                            break;
                        case 4:
                            lottery.prize = 1;
                            break;
                        case 5:
                            lottery.prize = 6;
                            break;
                        case 6:
                            lottery.prize = 3;
                            break;
                        default:
                            lottery.prize = 7;
                    };
                    lottery.thisNum = lottery.prize;
                    lottery.speed=100;
                    roll();    //转圈过程不响应click事件，会将click置为false
                    click=true; //一次抽奖完成后，设置click为true，可继续抽奖
                    return false;
                }else{
                    config.layerMsg(res.msg, 2);
                }
            })
        }
    });

    //奖品显示
    function maskPrize() {
        $('.turntable-win-bg').show();
        if(lottery.thisNum == 3){
            $('.turntable-fail-part').show();
            $('.turntable-win-part').hide();
        }else{
            $('.turntable-fail-part').hide();
            $('.turntable-win-part').show();
            var hl = null;
            lottery.thisNum == 0 ?
                hl='8888豆币' : lottery.thisNum == 1 ?
                hl='8豆币' : lottery.thisNum == 2 ?
                    hl='88豆币' : lottery.thisNum == 4 ?
                        hl='8888豆币' : lottery.thisNum == 5 ?
                            hl='168豆币' : lottery.thisNum == 6 ?
                                hl='头像框' : hl='iPhone XS';
            setTimeout(function () {
                //图像框会变
                if(lottery.thisNum == 6){
                    $('.win-proops').css('backgroundImage','url("'+someData.propImg+'")');
                }else{
                    $('.turntable-win-prize').css('backgroundImage','');
                    $('.turntable-win-prize').addClass('win-prize'+lottery.thisNum);
                }
                $('.turntable-win-prize').css({"width":'1.82rem','height':'1.98rem'});
                $('.turntable-win-prize-name').html(hl)
            },0);
        }
        //点击隐藏
        $('.mask-btns').click(function () {
            if($('.turntable-win-prize')){
                if(lottery.prize != 3){
                    $('.turntable-win-prize').removeClass('win-prize'+lottery.thisNum);
                    $('.turntable-win-prize').css({"width":'0','height':'0'});
                }
            };
            $('.turntable-win-bg').hide();
        });
    };

/*转盘抽奖*/


    //游戏规则
    $('.turntable-rules').click(function () {
        $('.turntable-rule-bg').show();
    });
    $('.turntable-rule-close').on('click', function () {
        $('.turntable-rule-bg').hide();
    });

/*跑马灯*/
    var marquee = {
        timer : null,
        speed : 3,
        len : 0,
        Width : null,
        index : 0,
        init:function (className, list) {
            this.addList(list)
            if($('.'+className).find('.turntable-marquee-content').length > 0){
                this.len = $('.'+className).find('.turntable-marquee-content').length;
            }else{
                $('.'+className).html('<div class="turntable-marquee-content turntable-marquee-prize" style="line-height:0.7rem">暂无人中奖</div>');
            }
            this.Width = $('.turntable-marquee-content').width();
            $('.turntable-marquee-outer').css('width',this.Width*this.len +'%');
            this.runPlay()
        },
        addList:function (list) {
            for(var i = 0;i<list.length;i++){
                var html = ' <div class="turntable-marquee-content">\n' +
                    '                    <div class="turntable-marquee-people"><span>'+list[i].nickname+'</span>抽中了</div>\n' +
                    '                    <div class="turntable-marquee-prize">'+list[i].prize_name+'</div>\n' +
                    '                </div>';
                $('.turntable-marquee-outer').append(html);
            }
        },
        runPlay:function () {
            var index = this.index,
                Width = this.Width,
                len = this.len;
            this.timer = setInterval(function () {
                index++;
                $('.turntable-marquee-outer').css('transition','all 1s');
                if(index >= len ){
                    $('.turntable-marquee-outer').css('transition','');
                    index = 0;
                };
                $('.turntable-marquee-outer').css('left',-(index*Width) + 'px');
            },this.speed*1000)
        }
    };
/*跑马灯*/
/*我的奖品*/
    var myPrize = {
        len : 0,
        init :function (className, myMoblie, myGold, myProp) {
            if($('.'+className)){
                if(myMoblie.length == 0 && myGold.length == 0 && myProp.length == 0){
                    var noDatapart = '<div style="font-size: 0.24rem;color: #ffffff;text-align: center;margin-top: 1rem">无中奖信息</div>';
                    $('.'+className).append(noDatapart)
                }else{
                    this.moblieList(className, myMoblie); //手机
                    this.goldList(className, myGold);  //金币
                    this.propsList(className, myProp); //头像框
                }
            }
        },
        moblieList:function (className, myMoblie) {
            if(myMoblie != null){
                for(var i = 0;i<myMoblie.length;i++){
                    var isStatus = null;
                    if(myMoblie[i].status == 0){
                        isStatus = '<div class="turntable-my-prize-btn my-prize-btn3" style="margin-top: 0.3rem"></div>';
                    }else{
                        isStatus = '<div class="turntable-my-prize-btn my-prize-btn2" style="margin-top: 0.3rem"></div>';
                    }
                    var moblieHtml = ' <div class="turntable-my-prize-list flex">\n' +
                        '                        <div class="turntable-my-prize-img turntable-my-prize-tp1"></div>\n' +
                        '                        <span>'+myMoblie[i].prize_name+'</span>\n' +
                        '                        <div class="turntable-my-prize-ifo">'+isStatus+'</div>\n' +
                        '                    </div>';
                    $('.'+className).append(moblieHtml);
                }
            }
        },
        goldList:function (className, myGold) {
            if(myGold != null){
                for(var i = 0;i<myGold.length;i++){
                    var goldHtml = ' <div class="turntable-my-prize-list flex">\n' +
                        '                        <div class="turntable-my-prize-img turntable-my-prize-tp2"></div>\n' +
                        '                        <span>'+myGold[i].prize_name+'</span>\n' +
                        '                        <div class="turntable-my-prize-ifo"><div class="turntable-my-prize-btn my-prize-btn1 use-gold" style="margin-top: 0.3rem"></div></div>\n' +
                        '                    </div>';
                    $('.'+className).append(goldHtml);
                }
            }
        },
        propsList:function (className, myProp) {
            if(myProp != null){
                for(var i = 0;i<myProp.length;i++){
                    var isStatus1 = null;
                    if(myProp[i].status == 1){
                        isStatus1 = '<div class="turntable-my-prize-btn my-prize-btn1 user-prop prop-check" data-id="'+myProp[i].id+'"></div>';
                    }else if(myProp[i].status == 0){
                        isStatus1 = '<div class="turntable-my-prize-btn my-prize-btn5 prop-check" data-id="'+myProp[i].id+'"></div>';
                    }else{
                        isStatus1 = '<div class="turntable-my-prize-btn my-prize-btn4" data-id="'+myProp[i].id+'"></div>';
                    }
                    var propHtml = '<div class="turntable-my-prize-list flex">\n' +
                        '                        <div class="turntable-my-prize-img"><img src="'+myProp[i].icon+'"></div>\n' +
                        '                        <span>'+myProp[i].name+'</span>\n' +
                        '                        <div class="turntable-my-prize-ifo">\n' +
                        '                            <div class="turntable-my-prize-time">'+myProp[i].time+'</div>'+isStatus1+'</div>\n' +
                        '                    </div>';
                    $('.'+className).append(propHtml);
                }
            }
        }
    };
    //我的奖品请求
    function getMyPrize() {
        $.get(config.khserver + '/HActivity/getLotteryUserPrize',{uid:config.callAppGetUserInfo().uid},function (res) {
            var res = JSON.parse(res);
            if(res.code == 1) {
                var myMoblie = res.data.phone_list,
                    myGold = res.data.gold_list,
                    myProp = res.data.prop_list;
                myPrize.init('turntable-my-prize-content', myMoblie, myGold, myProp);
            }
        });
    }
    //我的奖品
    $('.turntable-my-prizes').click(function () {
        $('.turntable-my-prize-mask').show();
        $('body').css({'position':'fixed','overflow':'hidden'});
        getMyPrize();

    });
    $('.close-my-prize-mask').on('click', function () {
        $('.turntable-my-prize-mask').hide();
        $('body').css({'position':'relative','overflow':'auto'});
        $('.turntable-my-prize-content').html('');
    });
    //去和客服聊天页面
    $(document).on('click', '.my-prize-btn3', function () {
        config.callAppToElseUidChat(100000);
    });
    //去app我的好友
    $(document).on('click', '.use-gold', function () {
       // openAppContent('VOIFriendListVC');
        getRoom();
    });
    //使用图像框
    $(document).on('click touchstart', '.user-prop', function () {
        var _this = $(this),
            id = _this.data('id'),
            uid = config.callAppGetUserInfo().uid,
            phone = config.callAppGetUserInfo().phone;
        $.get(config.khserver + '/HActivity/useAttire',{id:id,uid:uid,phone:phone},function (res) {
            var res = JSON.parse(res);
            if(res.code == 1){
                //不同图像框只能选择使用一个
                $('.prop-check').addClass('my-prize-btn1').addClass('user-prop').removeClass('my-prize-btn5');
                _this.addClass('my-prize-btn5').removeClass('user-prop');
            }else{
                config.layerMsg(res.msg, 2);
            };
        })
    });
    //使用图像框

/*我的奖品*/


//抽奖机会的获得
    $('.turntable-invitation').on('click', function () {
        share();  // 分享
    });
    //去app我的好友
    $('.turntable-give-gift').on('click', function () {
        //openAppContent('VOIFriendListVC');
        getRoom();
    });

    //获取房间
    function getRoom() {
        $.get(config.khserver + '/HActivity/getGoodRoomRandomly',{uid:config.callAppGetUserInfo().uid},function (res) {
            var res = JSON.parse(res);
            if(res.code == 1){
                if(res.data != null){
                    console.log(res.data.yun_xin_room_id);
                    config.callAppToRoomHallData(res.data.yun_xin_room_id, function(){});
                }
            }else{
                config.layerMsg(res.msg, 2);
            };
        })
    }

    //去砸蛋
    $('.turntable-zd').on('click', function () {
        config.callAppOpenElseHtml(config.server+'/client/dev/h5_activity/smashGoldEggs/index.html', '幸运砸金蛋');
    });
    // 分享
    function share() {
        var text = [
            {title:'嘿，给你推荐一个APP，你想要的这里都有！',desc:'轻轻触碰，进入我的房间，让我的声音与你的耳朵完美相遇~~'},
            {title:'有句话憋了很久~',desc:'本来没打算说的~'},
        ];
        var index = Math.floor(Math.random()*2);
        var icon = config.callAppGetUserInfo().icon;
        var url1 = config.server + '/client/dev/h5_activity/voiceSharing.html?id='+config.callAppGetUserInfo().uid+'&channel=96';
        //var url2 = config.server + '/client/dev/h5_activity/turntable/outShare.php?id='+config.callAppGetUserInfo().uid+'&channel=96';icon
        var shareJson = {
            id: "0",
            type: 4,
            outer: {
                title: text[index].title,
                url: url1,
                icon: icon,
                desc: text[index].desc
            },
            inner: {
                title: text[index].title,
                url: url1,
                icon: icon,
                desc: text[index].desc
            }
        };
        config.share(JSON.stringify(shareJson));
    };
};