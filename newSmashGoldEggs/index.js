$(function(){
    //  记录设置轮播
    function marquee() {
        $('#lunbowrap').marquee({
            auto: true,
            interval: 1000,
            showNum: 5,
            stepLen: 1,
            type: 'vertical',
            direction: 'backward',
        });
    };
     //遍历取值
     function loopValue(data){
        var arr = [],j;
        for(j in data){
            if(data[j] > 0){
                arr.push([j,data[j]]);
            };
        };
        return arr;
    };
    //获取中奖列表
    var prizeList = {
        init:function(){
            this.getDataList();
            this.closeLive();
        },
        getDataList:function(){
            var _this = this;
            $.get(config.khserver+'/HActivity/getGoldEggRecord',function(res){
                var res = JSON.parse(res)
                if(res.code == 1){
                    if(res.data != null){
                        _this.getThreeData(res.data);
                        if(res.data.length > 3){
                            _this.getRsetData(res.data);
                        }
                    }else{
                        $('#list1').html('<li style="text-align:center"><span style="float: none">暂无数据</span></li>');
                    }
                };
            });
        },
        //排序
        sortData:function(a, b){
            return -(a.reward - b.reward);
        },
        //前3
        getThreeData:function(data1){
            var i,Len = 0;
            var data1 = data1.sort(this.sortData); //取最大的3个
            if(data1.length >= 3){
                Len = 3;
            };
            for(i = 0;i<Len;i++){
                var html = '<li><span>'+data1[i].nickname+'在砸金蛋中</span><span>获得</span><span>'+data1[i].reward+'豆币</span></li>';
                $('#list1').append(html)
            };
        },
        //3后的滚动
        getRsetData:function(data2){
            var data = data2.splice(3,data2.length),i,Len = data.length;
            for(i = 0;i<Len;i++){
                var html = '<li><span>'+data[i].nickname+'在砸金蛋中</span><span>获得</span><span>'+data[i].reward+'豆币</span></li>';
                $('#list2').append(html)
            };
            marquee();
        },
        //随机减少生命值  Math.floor(Math.random()*(max-min+1)+min);
        closeLive:function(){
            var timer8 = null;
            timer8 = setInterval(function(){
                var random1 = Math.floor(Math.random()*3)+1,
                    random2 = (Math.floor(Math.random()*20)+5)/10,
                    random3 = Math.floor(Math.random()*90)+10;
                $('.numerica'+random1).html('-'+random3);
                $('.numerica'+random1).css({'bottom':random2+'rem','opacity':1,'transition':'all 1s'});
                setTimeout(function(){
                    $('.numerica'+random1).css({'bottom':'0rem','opacity':0,'transition':''});
                    $('.numerica'+random1).html('');
                }, 900);
            },1000);
        }
    };
   
    //伤害排名和金蛋种类
    var main = {
      //  timerUper : null,
        superClick : true,
        maksTime : null,
        timerUper :null,
        flag: true,
        startTime:null,
        endTime: null,
        init:function(){
            this.getHurtData();
            this.getHurtListData();
            this.getHurtAllData();
        },
        getHurtData:function(){
            var _this = this;
            $.get(config.khserver+'/HActivity/getGoldEggIndex',{this_uid:config.callAppGetUserInfo().uid},function(res){
                var res = JSON.parse(res)
                if(res.code == 1){
                    if(res.egg_data.end_time){
                        _this.superCountDown(res.egg_data.end_time,res.now_time); //倒计时
                    };
                };
            });
        },
        getHurtAllData:function(){
            var _this = this;
            $.get(config.khserver+'/HActivity/getGoldEggIndex',{this_uid:config.callAppGetUserInfo().uid},function(res){
                var res = JSON.parse(res)
                if(res.code == 1){
                    _this.goldType(res); //蛋的种类
                };
            });
        },
        getHurtListData:function(){
            var _this = this;
            $.get(config.khserver+'/HActivity/getGoldEggIndex',{this_uid:config.callAppGetUserInfo().uid},function(res){
                var res = JSON.parse(res)
                if(res.code == 1){
                    _this.getList(res.hurt_array);//伤害排名
                    if(res.egg_data.type == 1){
                        _this.eggLives(res.egg_data.life, res.egg_data.hurt, 'totalvalue2');
                        $("#superEgg").data('id',res.egg_data.id);
                    }else{
                        _this.eggLives(res.egg_data.life, res.egg_data.hurt, 'totalvalue1');
                        $("#goldEgg").data('id',res.egg_data.id);
                    };
                    //我的排名
                    if(res.rank >= 99 || res.rank == 0){
                        myrank = '99+';
                    }else{
                        myrank = res.rank;
                    };
                    $('.ranking-tl span').html(myrank);
                    $('.ranking-my-mounts span').html(res.hurt);
                }else{
                    config.layerMsg(res.msg, 2)
                };
            });
        },
        //伤害排名
        getList:function(dataList){
            for(var i = 0;i<3;i++){
                var oList = $('.gold-smash-pop-list'+(i+1));
                if(dataList[i]){
                    oList.find('img').attr('src',dataList[i].icon);
                    oList.find('.gold-smash-nums-part span').html(dataList[i].hurt);
                    oList.find('.gold-smash-name').html(dataList[i].nickname);
                }else{
                    oList.find('img').remove();
                    oList.find('.gold-smash-nums-part').remove();
                    oList.find('.gold-smash-name').html('虚位以待');
                };
            };
        },
        //蛋的种类
        goldType:function(data){
            var dataType = data.egg_data.type,
                _this = this;
            if(dataType == 1){ //超级蛋
                $("#superEgg").data('id','');
                $('.goldeggcontent').hide();
                $('.goldereggcontent').show();
                $('.bottom').hide();
                $('.bottom-super').show();
                $("#superEgg").data('id',data.egg_data.id);
                _this.loopAjax(data);//轮询
                _this.playSuperEgg();//砸蛋请求
                $('.uspergoldpat').show();
            }else{ //金蛋
                $("#goldEgg").data('id','');
                $('.goldeggcontent').show();
                $('.goldereggcontent').hide();
                 $('.bottom').show();
                $('.bottom-super').hide();
                $("#goldEgg").data('id',data.egg_data.id);
            };
            $('.mymounts span').html(data.num);
            $('.mymoney span').html(data.chat_gold);
        },
        //蛋的生命值
        eggLives:function(totalLives, living, obj){
            var proportion = (totalLives-living) / totalLives * 100; //比例
            $('#'+obj).css('width',proportion+'%');
        },
        //超级蛋倒计时Math.round
        superCountDown:function(endTime, startsTime){
            var nowTime = Math.round(new Date(startsTime.replace(/-/g, '/')).getTime()/1000)-2,
                endTime = Math.round(new Date(endTime.replace(/-/g, '/')).getTime()/1000),
                 n = 0,
                 _this = this;
                 _this.startTime = nowTime;
                 _this.endTime = endTime;
            if(endTime <= nowTime){
                n = 0;
                return false;
            }else{
                n = endTime - nowTime;
            };
            _this.timerUper = setInterval(function(){
                if(n == 0){
                    clearInterval(_this.timerUper);
                    $('#super-times').html('正在开奖');
                    $('.uspergoldpat').hide();
                    $('#superEgg').find('img').removeClass('move');
                    $('#superEgg').find('img').attr('src','https://tools.dianliaoapp.com/test/test-2018-12-12-2660.gif');
                    return false;
                };
                n--;
                $('#super-times').html(n+'s');
            },1000)
        },
        //砸超级蛋
        playSuperEgg:function(){
            var _this = this;
            $('.super-gold-play').unbind('click').on('click', function(){
                var id = $("#superEgg").data('id'),num = 1;
                var params = {
                    this_uid : config.callAppGetUserInfo().uid,
                    phone : config.callAppGetUserInfo().phone,
                    play_num : num,
                    egg_id : id
                };
                if($('.mymounts span').html() <= 0){
                    config.layerMsg('锤子数不够啦，请先购买锤子数啦~', 2);
                    return false;
                };
                //砸下切换动画
                // $('.mounts').removeClass('mountMove');
                // $('.goldegger img').removeClass('move');
                // setTimeout(function(){
                //     $('.mounts').addClass('mountHut');
                //     $('.goldegger img').addClass('moveHut');
                // },100)
                $.get(config.khserver+'/HActivity/playGoldEgg',params,function(res){
                    var res = JSON.parse(res);
                    if(res.code == 1){
                        $('.mymounts span').html($('.mymounts span').html() - num);
                        $('.gold-smash-pop').html('');
                        _this.getHurtListData();
                        _this.eggLives();
                    }else{
                        if(res.msg.indexOf('服务器繁忙') != -1){
                            config.layerMsg(res.msg, 1);
                        };
                        $('#superEgg').find('img').addClass('move');
                        $('#superEgg').find('img').attr('src','https://tools.dianliaoapp.com/test/test-2018-12-11-1776.png');
                       $('.gold-smash-pop').html('');
                       _this.init();
                    };
                    reset();
                });
            })
        },
        //轮询
        loopAjax:function(){
            var _this = this,
                id = $(".goldegger").data('id'),
                params = {
                    this_uid : config.callAppGetUserInfo().uid,
                    egg_id : id
                },
                totalLoop = (_this.endTime-_this.startTime+5)*2,thisTime = null;
            thisTime = setInterval(function(){
                $.get(config.khserver+'/HActivity/getSuperGoldEggData',params,function(res){
                    var res = JSON.parse(res);
                    if(res.code == 1){
                        totalLoop--;
                        if(res.data === null || res.data){
                            clearInterval(thisTime);
                            $('#super-times').html('正在开奖');
                            $('.uspergoldpat').hide();
                            $('#superEgg').find('img').removeClass('move');
                            $('#superEgg').find('img').attr('src','https://tools.dianliaoapp.com/test/test-2018-12-12-2660.gif');
                            setTimeout(function(){
                                $('#super-times').html('');
                                $('.super-prize-mask').show();
                              //  $('.super-prize-num').html(res.data.reward)
                                try {
                                    $('.super-prize-num').html(res.data.reward)
                                }
                                catch(err) {
                                    $('.super-prize-num').html('0')
                                }
                                _this.superTimeBtn();
                            },500)
                            clearInterval(_this.timerUper);
                        }else{
                            if(totalLoop<=0){
                                _this.noPrize();
                                clearInterval(thisTime);
                            }
                        };
                    }else{
                        config.layerMsg(res.msg, 2);
                    };
                });
            },500)
        },
        noPrize:function(){
            var _this = this;
            setTimeout(function(){
                $('.super-prize-mask').show();
                $('.super-prize-mask-btn').html('确定');
                $('.super-prize-num').html('0')
                $('.super-prize-mask-btn').on('click', function(){
                    $('.super-prize-mask-btn').html('确定 (3s)');
                    $('.super-prize-num').html('');
                    $('#superEgg').find('img').addClass('move');
                    $('#superEgg').find('img').attr('src','https://tools.dianliaoapp.com/test/test-2018-12-11-1776.png');
                    $('.super-prize-mask').hide();
                    $('.gold-smash-pop').html('');
                    _this.flag = true;
                    _this.init();
                    reset();
                });
            }, 2000);
        },
        //倒计时按钮
        superTimeBtn:function(){
            var _this = this;
            var times1 = Number($('.super-prize-mask-btn').html().substring(4, 5));
           _this.maksTime = setInterval(function(){
               times1--;
               if(parseInt(times1) <= 0) {
                   clearInterval(_this.maksTime);
                   _this.flag = false;
                   $('.super-prize-mask-btn').html('确定');
                   _this.superMaskHide();
                   return false;
               };
               
               $('.super-prize-mask-btn').html('确定 ('+times1+'s)');
           }, 1000);
       },
       //弹窗的消失
       superMaskHide:function(){
           var _this = this;
           $('.super-prize-mask-btn').on('click', function(){
               if(!_this.flag){
                   $('.super-prize-mask-btn').html('确定 (3s)');
                   $('.super-prize-num').html('');
                   $('#superEgg').find('img').addClass('move');
                    $('#superEgg').find('img').attr('src','https://tools.dianliaoapp.com/test/test-2018-12-11-1776.png');
                   $('.super-prize-mask').hide();
                   $('.gold-smash-pop').html('');
                   _this.flag = true;
                   _this.init();
                   reset();
               };
           });
       }
    };
    //砸金蛋
    var playEgg = {
        timer : null,
        once : true,
        init:function(){
            this.play();
        },
        play:function(){
            var _this = this;
            $('.play div').on('click', function(){
                if(!_this.once){ //限制，防止连点
                    config.layerMsg('正在开奖中，请稍后~', 2);
                    return false;
                };
                var index = $(this).index();
                var id = $("#goldEgg").data('id'),num = 0;
                index == 0? num = '1':index == 1? num = '10':num = '100';
                if(Number($('.mymounts span').html()) - num < 0){
                    config.layerMsg('锤子数不够啦，请先购买锤子数啦~', 2);
                    return false;
                };
                _this.once = false;
                $('.goldpat').hide();
                $('#goldEgg').find('img').attr('src','https://tools.dianliaoapp.com/test/test-2018-12-11-2168.gif');
                _this.getPlayData(num, id);
            });
        },
        //砸蛋接口请求
        getPlayData:function(num, id){
            var _this = this;
            var params = {
                this_uid : config.callAppGetUserInfo().uid,
                phone : config.callAppGetUserInfo().phone,
                play_num : num,
                egg_id : id
            };
            $.get(config.khserver+'/HActivity/playGoldEgg',params,function(res){
                var res = JSON.parse(res);
                if(res.code == 1){
                    $('.mymounts span').html($('.mymounts span').html() - num);
                    setTimeout(function(){
                        $('.goldpat').show();
                        $('#goldEgg').find('img').attr('src','https://tools.dianliaoapp.com/test/test-2018-12-11-3968.png');
                        _this.myprize(res);
                        _this.timeBtn();
                    },1000);
                }else{
                    if(res.msg.indexOf('服务器繁忙') != -1){
                        config.layerMsg(res.msg, 2);
                    };
                    $('.goldpat').show();
                    $('#goldEgg').find('img').attr('src','https://tools.dianliaoapp.com/test/test-2018-12-11-3968.png');
                    $('.gold-smash-pop').html('');
                    main.init();
                    reset();
                    _this.once = true;
                };
            });
        },
        //奖励
        myprize:function(data){
            var _this = this,timer = null;
            var reward_info_list = loopValue(data.reward_info_list), //正常的奖励
                other_reward_info_list = loopValue(data.other_reward_info_list); //额外奖励
            $('.prize-mask').show();
            if(reward_info_list.length > 0){
                for(var i = 0;i<reward_info_list.length;i++){
                    var html = '<li>'+
                                    '<div class="myprize-bg"><div class="myprize-money">'+reward_info_list[i][0]+'</div>豆币</div><div class="myprize-num">X'+reward_info_list[i][1]+'</div>'+
                                '</li>';
                    $('#nomalList').append(html);
                }
            };
            if(other_reward_info_list.length > 0){
                $('#othersContent').show();
                $('#othersContent').hide();
                for(var i = 0;i<other_reward_info_list.length;i++){
                    var html = '<li>'+
                                    '<div class="myprize-bg"><div class="myprize-money">'+other_reward_info_list[i][0]+'</div>豆币</div><div class="myprize-num">X'+other_reward_info_list[i][1]+'</div>'+
                                '</li>';
                    $('#otherPrizeList').append(html);
                };
            }else{
                $('#othersContent').hide();
            };
            _this.once = true;
        },
        //倒计时按钮
        timeBtn:function(){
             var _this = this;
            _this.timer = setInterval(function(){
                var times = $('.order-myprize').html().substring(4, 5);
                times = Number(times)-1;
                if(parseInt(times) == 0) {
                    clearInterval(_this.timer);
                    _this.timer = null;
                    $('.order-myprize').html('确定');
                    _this.maskHide();
                    return false;
                };
                $('.order-myprize').html('确定 ('+times+'s)');
            }, 1000);
        },
        //弹窗的消失
        maskHide:function(){
            var _this = this;
            $('.order-myprize').unbind('click').on('click', function(){
                if(!_this.timer){
                    $('.order-myprize').html('确定 (3s)');
                    $('.prize-mask').hide();
                    $('#otherPrizeList, #nomalList').html('');
                    $('.gold-smash-pop').html('');
                    main.init();
                    reset();
                };
            });
        }
    };
    //重置排名
    function reset(){
        for(var i=0;i<3;i++){
            var html = '<div class="gold-smash-pop-list'+(i+1)+'">'+
                        '<div class="gold-smash-pop-image"><div class="hunt-image"><img src=""></div><i class="gold-numb-one"></i></div>'+
                        '<div class="gold-smash-name"></div>'+
                        '<div class="gold-smash-nums-part"><i></i><span></span></div>'+
                    '</div>';
            $('.gold-smash-pop').append(html);
        }
    }


    playEgg.init(); //砸金蛋
    main.init();  //伤害排名和蛋种类
    prizeList.init(); //获取中奖列表
    // 锤子获得、锤子获得弹窗交互
    $('.getHarm').click(function() {
        $('.buyActivity').show();
        $('.buyActivity').find('.num span').html($('.mymounts span').html());
    });
    $('.buyActivity .box .close').click(function() {
        $('.buyActivity').hide();
    });
    $('.buyActivity .box ul .li').click(function() {
        $('.buyActivity .box ul .ten').attr('class', 'li ten');
        $('.buyActivity .box ul .fifty').attr('class', 'li fifty');
        $('.buyActivity .box ul .hundred').attr('class', 'li hundred');
        $(this).addClass('active');
        $('.buyActivity .box .buyBtn').attr('title', $(this).attr('title'));    
    });
    $('.buyActivity .box .buyBtn').click(function() {
        buyGoldEgg($(this).attr('title'));
    });
    // 砸金蛋购买接口
    function buyGoldEgg(buy_num) {
        var url = config.khserver+'/HActivity/buyGoldEgg';
        var params = {
            this_uid : config.callAppGetUserInfo().uid,
            phone : config.callAppGetUserInfo().phone,
            buy_num: buy_num,
        };
        $.get(url, params, function(res) {
            var res = JSON.parse(res)
            if(res.code == 1) {
                config.layerMsg('购买成功啦~', 2);
                var thisNum = Number($('.mymounts span').html()) + Number(buy_num);
                var thisMoney = Number($('.mymoney span').html()) - Number(buy_num)*10
                
                if(thisMoney >= 0){
                    $('.mymounts span').html(thisNum);
                    $('.mymoney span').html(thisMoney);
                    $('.buyActivity .num span').html(thisNum);
                }
            } else {
                config.layerMsg(res.msg, 2);
            }
        });
    };
    //充值
    $('.goBuyMoney').on('click', function(){
        config.callAppOpenElseHtml(config.server+'/client/dev/explain/myWallet/recharge.html', '充值');
    });
    // 规则弹窗点击关闭/点击规则显示规则弹窗
    $('.rule').click(function() {
        $('.ruleActivity').show();
    });
    $('.ruleActivity').click(function() {
        $('.ruleActivity').hide();
    });
})