var uid = (config.callAppGetUserInfo()).uid;
var newYearAllData = [];
var eggAllData = [];
$(function() {
    getData();
    // tabs进行对应的内容切换
    $('.head .tab span').click(function() {
        var index = $(this).index();
        if(index==0) {
            $('.tab').attr('class', 'tab');
            $('.wrapperNewYear').show();
            $('.wrapperEgg').hide();
        } else if(index==1) {
            $('.tab').attr('class', 'tab active');
            $('.wrapperNewYear').hide();
            $('.wrapperEgg').show();
        }
    });
    // 加载更多
    $('.wrapperNewYear .getMore').click(function() {
        getMore(0);
    });
    $('.wrapperEgg .getMore').click(function() {
        getMore(1);
    });
});
// 获取数据接口
function getData() {
    var url = config.khserver+'/HActivity/getTwoZeroOneNineTurnTableIndex';
    var params = {
        this_uid: uid,
    };
    $.getJSON(url, params, function(res) {
        if(res.code) {
            // 在这里控制是否下拉加载更多显示隐藏
            if(res.normal_list.length<=10) {
                $('.wrapperNewYear .getMore').hide();
            } else {
                $('.wrapperNewYear .getMore').show();
                newYearAllData = res.normal_list;
            }
            if(res.special_list.length<=10) {
                $('.wrapperEgg .getMore').hide();
            } else {
                $('.wrapperEgg .getMore').show();
                eggAllData =res.special_list;
            }
            // 新年礼物
            var newYearHtml = '';
            var eggHtml = '';
            for(var i=0; i<res.normal_list.length; i++) {
                if(i==0) {
                    newYearHtml += '<div class="one">'+
                                        '<img src="https://tools.dianliaoapp.com/test/test-2018-12-26-8633.png" />'+
                                        '<img onclick="config.callAppToUidIndex('+res.normal_list[i].uid+')" src="'+res.normal_list[i].icon+'" />'+
                                        '<p>'+res.normal_list[i].nickname+'</p>'+
                                        '<div>'+
                                            '<img src="https://tools.dianliaoapp.com/gift/gift-639-2018-12-25-4454.png" />'+
                                            '<span>'+res.normal_list[i].num+'</span>'+
                                        '</div>'+
                                    '</div>';
                } else if(i<10) {
                    newYearHtml += '<li>'+
                                        '<span>'+(i-0+1)+'</span>'+
                                        '<img onclick="config.callAppToUidIndex('+res.normal_list[i].uid+')" src="'+res.normal_list[i].icon+'" />'+
                                        '<p>'+res.normal_list[i].nickname+'</p>'+
                                        '<img src="https://tools.dianliaoapp.com/gift/gift-639-2018-12-25-4454.png" />'+
                                        '<span>'+res.normal_list[i].num+'</span>'+
                                    '</li>';
                }
            }
            $('.wrapperNewYear .list').html(newYearHtml);
            // 元旦礼物
            for(var j=0; j<res.special_list.length; j++) {
                if(j==0) {
                    eggHtml += '<div class="one">'+
                                    '<img src="https://tools.dianliaoapp.com/test/test-2018-12-26-8633.png" />'+
                                    '<img onclick="config.callAppToUidIndex('+res.special_list[j].uid+')" src="'+res.special_list[j].icon+'" />'+
                                    '<p>'+res.special_list[j].nickname+'</p>'+
                                    '<div>'+
                                        '<img src="https://tools.dianliaoapp.com/gift/gift-640-2018-12-25-3975.png" />'+
                                        '<span>'+res.special_list[j].num+'</span>'+
                                    '</div>'+
                                '</div>';
                } else if(j<10) {
                    eggHtml += '<li>'+
                                    '<span>'+(j-0+1)+'</span>'+
                                    '<img onclick="config.callAppToUidIndex('+res.special_list[j].uid+')" src="'+res.special_list[j].icon+'" />'+
                                    '<p>'+res.special_list[j].nickname+'</p>'+
                                    '<img src="https://tools.dianliaoapp.com/gift/gift-640-2018-12-25-3975.png" />'+
                                    '<span>'+res.special_list[j].num+'</span>'+
                                '</li>';
                }
            }
            $('.wrapperEgg .list').html(eggHtml);
        } else {
            config.layerMsg(res.msg, 2);
        }
    });
}
function getMore(type) {
    if(type==0) {
        var newYearHtml = '';
        for(var i=0; i<newYearAllData.length; i++) {
            if(i==0) {
                newYearHtml += '<div class="one">'+
                                    '<img src="https://tools.dianliaoapp.com/test/test-2018-12-26-8633.png" />'+
                                    '<img onclick="config.callAppToUidIndex('+newYearAllData[i].uid+')" src="'+newYearAllData[i].icon+'" />'+
                                    '<p>'+newYearAllData[i].nickname+'</p>'+
                                    '<div>'+
                                        '<img src="https://tools.dianliaoapp.com/gift/gift-639-2018-12-25-4454.png" />'+
                                        '<span>'+newYearAllData[i].num+'</span>'+
                                    '</div>'+
                                '</div>';
            } else if(i<10) {
                newYearHtml += '<li>'+
                                    '<span>'+(i-0+1)+'</span>'+
                                    '<img onclick="config.callAppToUidIndex('+newYearAllData[i].uid+')" src="'+newYearAllData[i].icon+'" />'+
                                    '<p>'+newYearAllData[i].nickname+'</p>'+
                                    '<img src="https://tools.dianliaoapp.com/gift/gift-639-2018-12-25-4454.png" />'+
                                    '<span>'+newYearAllData[i].num+'</span>'+
                                '</li>';
            }
        }
        $('.wrapperNewYear .list').html(newYearHtml);
    } else if(type==1) {
        var eggHtml = '';
        // 元旦礼物
        for(var j=0; j<eggAllData.length; j++) {
            if(j==0) {
                eggHtml += '<div class="one">'+
                                '<img src="https://tools.dianliaoapp.com/test/test-2018-12-26-8633.png" />'+
                                '<img onclick="config.callAppToUidIndex('+eggAllData[j].uid+')" src="'+eggAllData[j].icon+'" />'+
                                '<p>'+eggAllData[j].nickname+'</p>'+
                                '<div>'+
                                    '<img src="https://tools.dianliaoapp.com/gift/gift-640-2018-12-25-3975.png" />'+
                                    '<span>'+eggAllData[j].num+'</span>'+
                                '</div>'+
                            '</div>';
            } else if(j<10) {
                eggHtml += '<li>'+
                                '<span>'+(j-0+1)+'</span>'+
                                '<img onclick="config.callAppToUidIndex('+eggAllData[j].uid+')" src="'+eggAllData[j].icon+'" />'+
                                '<p>'+eggAllData[j].nickname+'</p>'+
                                '<img src="https://tools.dianliaoapp.com/gift/gift-640-2018-12-25-3975.png" />'+
                                '<span>'+eggAllData[j].num+'</span>'+
                            '</li>';
            }
        }
        $('.wrapperEgg .list').html(eggHtml);
    } else {}
}