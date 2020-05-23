//进行app内部的页面进行跳转
function openAppContent(name) {
    var obj = {
        fileName: name,
        param: '',
    };
    if(window.sendToApp) {
        // 会员中心的
        if(name=='VOIVipCenterVC') { obj.fileName = 'com.youwo.dot.chat.module.account.activity.VipCenterActivity'; }
        // 家族模块-房间
        if(name=='VOICallRoomVC') { obj.fileName = 'com.youwo.dot.chat.module.room.activity.BroadcastRoomActivity'; }
        // 新人报道列表
        if(name=='VOINewPersonVC') { obj.fileName = 'com.youwo.dot.chat.module.chat.activity.NewPeopleActivity'; }
        // 一键语聊（发起页）
        if(name=='CHAT_TYPE_RANDOM') { obj.fileName = 'com.youwo.dot.chat.module.call.activity.ConversationMatchActivity'; }
        // 快速学聊（发起页）
        if(name=='CHAT_TYPE_EAVESDROP') { obj.fileName = 'com.youwo.dot.chat.module.home.activity.EavesdropMatchActivity'; }
        // 道具通知
        if(name=='VOIPropsNoticeVC') { obj.fileName = 'com.youwo.dot.chat.module.chat.activity.PropsActivity'; }
        // 家族申请（列表）
        if(name=='VOIFamilyApplyVC') { obj.fileName = 'com.youwo.dot.chat.module.family.activity.FamilyRequestJoinActivity'; }
        // 编辑用户信息
        if(name=='VOIUserInfoVC') { obj.fileName = 'com.youwo.dot.chat.module.account.activity.ModifyUserInfoActivity'; }
        // 我的钱包
        if(name=='VOIMyWalletVC') { obj.fileName = 'com.youwo.dot.chat.module.account.activity.MyWalletActivity'; }
        // 每日任务
        if(name=='VOITaskListVC') { obj.fileName = 'com.youwo.dot.chat.module.account.activity.MyTaskActivity'; }
        // 我的背包
        if(name=='VOIBackpackVC') { obj.fileName = 'com.youwo.dot.chat.module.account.activity.MyBagActivity'; }
        // 我的好友
        if(name=='VOIFriendListVC') { obj.fileName = 'com.youwo.dot.chat.module.account.activity.MyFriendsActivity'; }
        // 新的好友
        if(name=='VOINewFriendVC') { obj.fileName = 'com.youwo.dot.chat.module.chat.activity.NewFriendsActivity'; }
        // 可能认识的人
        if(name=='VOINormalFriendVC') { obj.fileName = 'com.youwo.dot.chat.module.chat.activity.MayKownPersonActivity'; }
        // 我的家族
        if(name=='VOIFamilyListVC') { obj.fileName = 'com.youwo.dot.chat.module.family.activity.FamilyLobbyActivity'; }
        // 我的关注（家族）
        if(name=='VOIFollowRoomsVC') { obj.fileName = 'com.youwo.dot.chat.module.account.activity.MyFollowActivity'; }
        // 分享得奖励
        if(name=='VOIShareAwardVC') { obj.fileName = 'com.youwo.dot.chat.module.account.activity.ShareToInterestActivity'; }
        // 通话设置
        if(name=='VOICallingSetVC') { obj.fileName = 'com.youwo.dot.chat.module.account.activity.TelephoneSettingActivity'; }
        // 系统设置
        if(name=='VOISetUpVC') { obj.fileName = 'com.youwo.dot.chat.module.account.activity.SettingActivity'; }
        // 通话累积时长
        if(name=='VOICallDurationVC') { obj.fileName = 'com.youwo.dot.chat.module.account.activity.AllCallingTimeActivity'; }
        // 通话收费
        if(name=='VOIConfigChargeVC') { obj.fileName = 'com.youwo.dot.chat.module.account.activity.CallingPriceActivity'; }
        // 通话记录
        if(name=='VOIPhoneRecordsVC') { obj.fileName = 'com.youwo.dot.chat.module.home.activity.CallOrEavesdropRecordActivity'; }
        // 设置密码
        if(name=='VOIChangePwsVC') { obj.fileName = 'com.youwo.dot.chat.module.account.activity.ChangePwdActivity'; }
        // 真人认证
        if(name=='VOIAuthenticationVC') { obj.fileName = 'com.youwo.dot.chat.module.auth.activity.AuthenticationActivity'; }
        obj = JSON.stringify(obj);
        window.sendToApp.openAppContent(obj);
    } else if(window.webkit && !openAppCotentThirdParty().isWechat) {
        obj = JSON.stringify(obj);
        window.webkit.messageHandlers.openAppContent.postMessage(obj);
    } else {
        console.log('进行了app内部的页面进行跳转');
    }
}
// 判断在微信
function openAppCotentThirdParty() {
    var ua = navigator.userAgent.toLowerCase();
    return {
        isWechat: ua.match(/MicroMessenger/i) == "micromessenger",
        isQQ: ua.match(/QQ/i) == "qq",
        isWeibo: ua.match(/WeiBo/i) == "weibo",
        isSafari: ua.indexOf('safari') >0
    };
}