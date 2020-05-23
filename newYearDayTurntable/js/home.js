
var uid = (config.callAppGetUserInfo()).uid;
var phone = (config.callAppGetUserInfo()).phone;
var giftArr = [//所有的礼物弹窗对应的显示内容icon和服务端返回的res.data进行对应
    {id: 0, name: '圆蛋', desc: '价值50豆票', icon: 'https://tools.dianliaoapp.com/gift/gift-640-2018-12-25-3975.png',},
    {id: 1, name: '新年快乐', desc: '价值2豆币', icon: 'https://tools.dianliaoapp.com/gift/gift-639-2018-12-25-4454.png',},
    {id: 2, name: '猪猪头像框', desc: '猪猪头像框', icon: 'https://tools.dianliaoapp.com/gift/attire_icon-2018-12-25-2705.png',},
    {id: 3, name: '元旦头像框', desc: '元旦头像框', icon: 'https://tools.dianliaoapp.com/gift/attire_icon-2018-12-25-7905.png',},
    {id: 4, name: '暴富头饰', desc: '暴富头饰', icon: 'https://tools.dianliaoapp.com/test/test-2018-12-27-7369.png',},
    {id: 5, name: '小猪猪头饰', desc: '小猪猪头饰', icon: 'https://tools.dianliaoapp.com/test/test-2018-12-27-7665.png',},
    {id: 6, name: '科尔维特超跑', desc: '超跑座驾', icon: 'https://tools.dianliaoapp.com/gift/attire_icon-2018-09-19-4602.png',},
    {id: 7, name: '靓号', desc: '联系活动小助手领取', icon: 'https://tools.dianliaoapp.com/test/test-2018-12-25-1518.png',},
];
var dataObj = [0, 45, 90, 135, 180, 225, 270, 315];
var rotating = false;
$(function() {
    // 点击去抽奖的选项
    $("#inner").on("click", function() {
        if(rotating) {
            config.layerMsg('正在抽奖啦~', 2);
        } else {
            playData();
        }	
    });
    // 确定中奖
    $('.prizeActivity .sure').click(function() {
        $('.prizeActivity').hide();
    });
    // 记录设置轮播
    $('#lunbowrap').marquee({
        auto: true,
        interval: 1000,
        showNum: 3,
        stepLen: 1,
        type: 'vertical',
        direction: 'backward',
    });
    // 拿取首页的数据
    getData();
    // 去排行榜
    $('.rankingList').click(function() {
        config.callAppOpenElseHtml(config.server+'/client/dev/h5_activity/newYearDayTurntable/rank.html', '排行榜');
    });
});
// 进行抽奖的接口调用
function playData() {
    var url = config.khserver+'/HActivity/playTwoZeroOneNineTurnTable';
    var params = {
        this_uid: uid,
        phone: phone,
    };
    $.getJSON(url, params, function(res) {
        if(res.code) {
            rotateFunc(dataObj[res.data], res.data);
        } else {
            config.layerMsg(res.msg, 2);
        }
    });
}
// 开启开始旋转
function rotateFunc(num, type) {
    rotating = true;
    $("#outer").rotate({
        angle: 0,
        duration: 3000,
        animateTo: num + 1440, //1440是我要让指针旋转4圈
        callback: function() {
            // 旋转动画结束，进行对应的结果展示
            rotating = false;
            for(var i=0; i<giftArr.length; i++) {
                if(giftArr[i].id==type) {
                    $('.prizeActivity .box img').attr('src', giftArr[i].icon);
                    $('.prizeActivity .box p').html(giftArr[i].desc);
                    $('.prizeActivity').show();
                    getData();
                } else {}
            }
        }
    });
}
// 获取数据接口
function getData() {
    var url = config.khserver+'/HActivity/getTwoZeroOneNineTurnTableIndex';
    var params = {
        this_uid: uid,
    };
    $.getJSON(url, params, function(res) {
        if(res.code) {
            if(res.num==null) {
                $('.integral').html('积分0');
            } else {
                $('.integral').html('积分'+res.num);
            }
            var html = '';
            for(var i=0; i<res.bullet.length; i++) {
                html += '<li><span>恭喜</span><span>'+res.bullet[i].nickname+'</span><span>获得了</span><span>'+res.bullet[i].reward_name+'</span></li>';
            }
            $('#lunbowrap ul').html(html);
        } else {
            config.layerMsg(res.msg, 2);
        }
    });
}