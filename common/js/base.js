/**
 * base.js为公共的配置文件
 * 1、自动监听调用的rem布局
 * 2、接口的配置路径
 * 3、公共调用的方法
 */ 
/*!
 弹窗的小插件
 将css的地址改为我们线上的地址'https://manage.dianliaoapp.com/client/dev/h5_activity/common/css/layer.css';
 */
!function(e){"use strict";var t=document,n="querySelectorAll",i="getElementsByClassName",a=function(e){return t[n](e)},s={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:"scale"},l={extend:function(e){var t=JSON.parse(JSON.stringify(s));for(var n in e)t[n]=e[n];return t},timer:{},end:{}};l.touch=function(e,t){e.addEventListener("click",function(e){t.call(this,e)},!1)};var r=0,o=["layui-m-layer"],c=function(e){var t=this;t.config=l.extend(e),t.view()};c.prototype.view=function(){var e=this,n=e.config,s=t.createElement("div");e.id=s.id=o[0]+r,s.setAttribute("class",o[0]+" "+o[0]+(n.type||0)),s.setAttribute("index",r);var l=function(){var e="object"==typeof n.title;return n.title?'<h3 style="'+(e?n.title[1]:"")+'">'+(e?n.title[0]:n.title)+"</h3>":""}(),c=function(){"string"==typeof n.btn&&(n.btn=[n.btn]);var e,t=(n.btn||[]).length;return 0!==t&&n.btn?(e='<span yes type="1">'+n.btn[0]+"</span>",2===t&&(e='<span no type="0">'+n.btn[1]+"</span>"+e),'<div class="layui-m-layerbtn">'+e+"</div>"):""}();if(n.fixed||(n.top=n.hasOwnProperty("top")?n.top:100,n.style=n.style||"",n.style+=" top:"+(t.body.scrollTop+n.top)+"px"),2===n.type&&(n.content='<i></i><i class="layui-m-layerload"></i><i></i><p>'+(n.content||"")+"</p>"),n.skin&&(n.anim="up"),"msg"===n.skin&&(n.shade=!1),s.innerHTML=(n.shade?"<div "+("string"==typeof n.shade?'style="'+n.shade+'"':"")+' class="layui-m-layershade"></div>':"")+'<div class="layui-m-layermain" '+(n.fixed?"":'style="position:static;"')+'><div class="layui-m-layersection"><div class="layui-m-layerchild '+(n.skin?"layui-m-layer-"+n.skin+" ":"")+(n.className?n.className:"")+" "+(n.anim?"layui-m-anim-"+n.anim:"")+'" '+(n.style?'style="'+n.style+'"':"")+">"+l+'<div class="layui-m-layercont">'+n.content+"</div>"+c+"</div></div></div>",!n.type||2===n.type){var d=t[i](o[0]+n.type),y=d.length;y>=1&&layer.close(d[0].getAttribute("index"))}document.body.appendChild(s);var u=e.elem=a("#"+e.id)[0];n.success&&n.success(u),e.index=r++,e.action(n,u)},c.prototype.action=function(e,t){var n=this;e.time&&(l.timer[n.index]=setTimeout(function(){layer.close(n.index)},1e3*e.time));var a=function(){var t=this.getAttribute("type");0==t?(e.no&&e.no(),layer.close(n.index)):e.yes?e.yes(n.index):layer.close(n.index)};if(e.btn)for(var s=t[i]("layui-m-layerbtn")[0].children,r=s.length,o=0;o<r;o++)l.touch(s[o],a);if(e.shade&&e.shadeClose){var c=t[i]("layui-m-layershade")[0];l.touch(c,function(){layer.close(n.index,e.end)})}e.end&&(l.end[n.index]=e.end)},e.layer={v:"2.0",index:r,open:function(e){var t=new c(e||{});return t.index},close:function(e){var n=a("#"+o[0]+e)[0];n&&(n.innerHTML="",t.body.removeChild(n),clearTimeout(l.timer[e]),delete l.timer[e],"function"==typeof l.end[e]&&l.end[e](),delete l.end[e])},closeAll:function(){for(var e=t[i](o[0]),n=0,a=e.length;n<a;n++)layer.close(0|e[0].getAttribute("index"))}},"function"==typeof define?define(function(){return layer}):function(){var e=document.scripts,n=e[e.length-1],i=n.src;i.substring(0,i.lastIndexOf("/")+1);n.getAttribute("merge")||document.head.appendChild(function(){var e=t.createElement("link");return e.href="https://manage.dianliaoapp.com/client/dev/h5_activity/common/css/layer.css",e.type="text/css",e.rel="styleSheet",e.id="layermcss",e}())}()}(window);
//进行rem布局的自适应过程,默认设置的设计图纸为750
var calculatSeize = function () {
	var BASE_FONT_SIZE = 100;
	var roat =1;
	var wraps = document.getElementById('wrap_total');
	var docEl = document.documentElement,
	    clientWidth = docEl.clientWidth;
		clientHeight = docEl.clientHeight;
	if (!clientWidth) return;
	var html_font_size = BASE_FONT_SIZE * ((clientWidth*roat) / 750);
	docEl.style.fontSize = html_font_size + 'px';
	// 如果只是在相应的-0.01~0.01之间的小数值，直接进行return掉
	if (html_font_size-parseFloat(getComputedStyle(docEl).fontSize)<0.01 && html_font_size-parseFloat(getComputedStyle(docEl).fontSize)>-0.01) {
		// 计算准确直接跳出
		return;
	} 
	// 在曲面屏手机存在着rem计算不准的问题
	else {
		var again_html_font_size = html_font_size/(parseInt(getComputedStyle(docEl).fontSize)/html_font_size);
		docEl.style.fontSize = again_html_font_size + 'px';
	}
};
if (document.addEventListener) {
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(resizeEvt, calculatSeize, false);
    document.addEventListener('DOMContentLoaded', calculatSeize, false);
    calculatSeize();
}
var config = {
	wechatInfoCookie: "wxInfo",
	userInfoCookie: "userInfo",
	khserver: "http://test-app-h.dianliaoapp.com",
	server: "http://test-manage.dianliaoapp.com",
	requestUrl: "/ydlManage/server/index.php",
	sourceServer: "http://dianliaotools.oss-cn-shenzhen.aliyuncs.com",
	recruitShareIcon: "http://dianliaotools.oss-cn-shenzhen.aliyuncs.com/common/logo.png",//推荐主播分享icon地址
	wechatShareUrl: "http://test-manage.dianliaoapp.com/client/dev/wechat/baseApi/wechatApi.php",// 微信分享接口地址
	wechatShareUrlElse: "http://test-manage.dianliaoapp.com/client/dev/wechat/baseApi/wechatApiElse.php",// 微信分享其它的服务号分享
	serverStatus: false,
	tipMsgTime: null,//旧版本的提示
	/*
		layerMsg弹窗的提示的信息不做处理
		layerLoadOpe加载层的显示效果进行实际的控制，只打开一个加载层，在进行新的加载的时候，进行+1操作；
		layerLoadClose关闭加载层，对larerCount的数量进行-1操作。
	*/ 
	layerLoadIndex: null,//新版本的加载中
	larerCount: 0,//加载中的打开次数
	// 弹窗的提示
	layerMsg : function (content, second) {
		layer.open({
			content: content,
			skin: 'msg',
			time: second, //second秒后自动关闭
		});
	},
	//操作弹出框设置(弹出窗的内容，左按钮，右按钮，回调函数的调用)
	layerShowBtn : function (content, btnHideName, btnSureName, callBack) {
		layer.open({
			content: content,
			btn: [btnSureName, btnHideName],
			yes: function(index){
				// 回调函数的调用
			  	callBack();
			  	layer.close(index); // 关闭这个指定的弹出层
			}
		});
	},
	// 加载中层的打开
	layerLoadOpen : function () {
		if(config.larerCount==0) {
			config.layerLoadIndex = layer.open({type: 2});
			config.larerCount = 1;
		} else {
			config.larerCount = config.larerCount-0+1;
		}
	},
	// 加载中层的关闭
	layerLoadClose : function () {
		config.larerCount = config.larerCount-1;
		if(config.larerCount==0) {
			// 调用了所有的清空的加载层，进行实际的清楚掉显示加载层
			layer.close(config.layerLoadIndex);
		} else {
			console.log('只是清除掉了一个加载层');
		}
	},
	// 关闭掉所有的layer的层
	layerAllClose : function () {
		layer.closeAll();
	},
	// 设置cookie
	setCookie: function (name, value, expireDay) {
		expireDay = expireDay || 1;
		var exp = new Date();
	    exp.setTime(exp.getTime() + this.cookieExpire*24*60*60*1000);
	    document.cookie = name + "="+ encodeURI (value) + ";expires=" + exp.toGMTString() + "; path=/";
	},
	// 获得cookie
	getCookie : function (cookie_name) {
		if (document.cookie.length>0) {
			var c_start = document.cookie.indexOf(cookie_name + "=");
			var c_end;
			if (c_start != -1) {
				c_start = c_start + cookie_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) c_end = document.cookie.length;
				return decodeURI(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	},
	// share分享--做到项目使用
	openShare : function (shareUrl, title, icon, desc, id, type) {
		if (window.sendToApp.share) {
    		window.sendToApp.share(shareUrl, title, icon, desc, id, type);
		}
	},
	// share分享--点聊项目使用,shareJson为json对象格式的字符串
	share : function (shareJson) {
		if (window.sendToApp) {
			// 安卓的配套使用
    		window.sendToApp.openShare(shareJson);
		} else if(window.webkit && !this.thirdParty().isWechat) {
			// 兼容ios的分享使用
			window.webkit.messageHandlers.openShare.postMessage(shareJson);
		}
	},
	// app外部直接分享
	appOuterShare : function (shareJson) {
		if (window.sendToApp) {
			// 安卓的配套使用
			window.sendToApp.openImmediateOuterShare(shareJson);
		} else if(window.webkit && !this.thirdParty().isWechat) {
			// 兼容ios的分享使用
			window.webkit.messageHandlers.openImmediateOuterShare.postMessage(shareJson);
		}
	},
	// app好友、家族直接分享
	appInnerShare : function (shareJson) {
		if (window.sendToApp) {
			// 安卓的配套使用
			window.sendToApp.openImmediateInnerShare(shareJson);
		} else if(window.webkit && !this.thirdParty().isWechat) {
			// 兼容ios的分享使用
			window.webkit.messageHandlers.openImmediateInnerShare.postMessage(shareJson);
		}
	},
	// 设置本地存储key, value, type--(true->localStorage, false->sessionStorage)
	setStorage : function (key, value, type) {
		if (typeof(key)!='string'&&typeof(value)!='string') {
			alert('存储必须是字符串');
		}
		if (type) {
			localStorage.setItem(key,value);
		}else {
			sessionStorage.setItem(key,value);
		}
	},
	// 取出本地存储key, type--(true->localStorage, false->sessionStorage)
	getStorage : function (key, type) {
		if (type) {
			return localStorage.getItem(key);
		}else {
			return sessionStorage.getItem(key);
		}
	},
	/*
		原生js信息弹窗提示框:tipMsg->正常的信息提示框
		text-信息提示框的文本
		callback-信息提示完毕的回调函数
		showtime-信息提示显示时间，easeintime-设置动画进入的时间，easeouttime-设置动画离开的时间
	*/ 
	tipMsg : function (text, callback, showtime, easeintime, easeouttime) {
		if (config.tipMsgTime!=null) {
			document.getElementById("tipMsg").style.opacity = "0";
			document.getElementById("tipMsg").style.zIndex = "-9999";
			document.getElementById("tipMsg").style.transition = "opacity "+(easeouttime/1000)+"s ease";
			document.getElementById("tipMsg").style.webkitTransition = "opacity "+(easeouttime/1000)+"s ease";
			clearTimeout(config.tipMsgTime);
			config.tipMsgTime=null;
		}else{
			// 不进行处理
		}
		showtime = showtime || 1500;
		easeintime = easeintime || 1500;
		easeouttime = easeouttime || 1200;
		document.getElementById("tipMsg").innerHTML = text;
		document.getElementById("tipMsg").style.opacity = "1";
		document.getElementById("tipMsg").style.display = "block";
		document.getElementById("tipMsg").style.zIndex = "999";
		document.getElementById("tipMsg").style.transition = "opacity "+(easeintime/1000)+"s ease";
		document.getElementById("tipMsg").style.webkitTransition = "opacity "+(easeintime/1000)+"s ease";
		config.tipMsgTime = setTimeout(function () {
			document.getElementById("tipMsg").style.opacity = "0";
			document.getElementById("tipMsg").style.zIndex = "-9999";
			document.getElementById("tipMsg").style.transition = "opacity "+(easeouttime/1000)+"s ease";
			document.getElementById("tipMsg").style.webkitTransition = "opacity "+(easeouttime/1000)+"s ease";
			if (callback && typeof callback == "function") {
				callback();
			}
		}, showtime);
	},
	// 获取链接地址后面的参数情况，传入key得value
	getReq : function (name) {
		var url = location.search;
		url = url.replace(/amp;/g,"");
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				this[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
			}
			return this[name];
	   }
	   return null;
	},
	/*
		自运行函数，进行终端版本判断
		页面中直接使用(config.appVersion.ios==true)
		config.appVersion = { ios: true, android: false }
	*/ 
	appVersion : (function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        	android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        };
	   })(),
	// 进行app初始化的版本控制,只是在做到中进行运用，点聊不需要使用
	addEventAppInit : function (callback) {
		if (window.sendToApp || this.thirdParty().isSafari || this.thirdParty().isWechat || this.thirdParty().isQQ ||this.thirdParty().isWeibo) { //版本兼容处理
			new callback();
		}else{
    		if (this.appVersion.ios ) {
				 window.addEventListener("appInit",function () {
					new callback();
				},false);
			}
			else{
				new callback();
			}
		}
	},
	/*
		判断第三方平台
		config.thirdParty().isWechat == true
		config.thirdParty() = {isWechat: true, isQQ: false, isWeibo: false, isSafari: false}
	*/ 
	thirdParty : function () {
		 var ua = navigator.userAgent.toLowerCase();
		 return {
		 	isWechat: ua.match(/MicroMessenger/i) == "micromessenger", //在微信中打开
		 	isQQ: ua.match(/QQ/i) == "qq", //在QQ空间打开
		 	isWeibo: ua.match(/WeiBo/i) == "weibo",
		 	isSafari: ua.indexOf('safari') >0
		 };
	},
	/*
		获取间隔前的时间
		startDate->传入目前的日期(new Date()格式的日期形式),days->间隔的时间
		得到对象beforeTime->之前的时间,currentlyTime->目前的时间
	*/ 
	getDateInterval : function (startDate, days) {
		var start;
		var end;
		if (startDate instanceof Date) {
			var yearStartDate = startDate.getFullYear();
			var monthStartDate = startDate.getMonth()+1;
			var dayStartDate = startDate.getDate();
			monthStartDate = monthStartDate>9 ? monthStartDate : "0"+monthStartDate;
			dayStartDate = dayStartDate>9 ? dayStartDate : "0"+dayStartDate;
			start = startDate.getFullYear() + "-" + (monthStartDate) + "-" + dayStartDate;
			var startAfterDays = startDate.setDate(startDate.getDate() - days);
			startAfterDays = new Date(startAfterDays);
			var yearEndDate = startAfterDays.getFullYear();
			var monthEndDate = startAfterDays.getMonth()+1;
			var dayEndDate = startAfterDays.getDate();
			monthEndDate = monthEndDate>9 ? monthEndDate : "0"+monthEndDate;
			dayEndDate = dayEndDate>9 ? dayEndDate : "0"+dayEndDate;
			end = startAfterDays.getFullYear() + "-" + (monthEndDate) + "-" + dayEndDate;
		}
		return {
			beforeTime: end,
			currentlyTime: start 
		};
	},
	/*
		传入时间获取到时分秒(对应十位、个位)
		timeSeconds->传入时间单位为秒
		hourTen->小时的十位，hourBit->小时的个位...
	*/ 
	changeHourMinSecond : function (timeSeconds) {
		var hour = parseInt(timeSeconds/3600);
		var minter = parseInt(timeSeconds/60%60);
		var second = parseInt(timeSeconds%60);
		//对时、分、秒位数位数少于十位进行处理
		hour = hour>9 ? hour : "0"+hour;
		minter = minter>9 ? minter : "0"+minter;
		second = second>9 ? second : "0"+second;
		var one = (hour+"").substring(0,1);
		var two = (hour+"").substring(1,2);
		var three = (minter+"").substring(0,1);
		var four = (minter+"").substring(1,2);
		var five = (second+"").substring(0,1);
		var six = (second+"").substring(1,2);
		return {
			hourTen: one,
			hourBit: two,
			minterTen: three,
			minterBit: four,
			secondTen: five,
			secondBit: six
		};
	},
	// 调用App的方法，获取到用户的uid信息
	callAppGetUid : function () {
		if (window.sendToApp) {
			// 安卓获取的方式
			return JSON.parse(window.sendToApp.getUserInfo()).uid;
		} else if(window.webkit && !this.thirdParty().isWechat) {
			// ios的获取方式
			return this.getReq('appUid');
		} else {
			// 测试服测试的账号
			return '10003';
		}
	},
	callAppGetUserInfo : function () {
		var obj;
		if(location.href.indexOf('https://manage.dianliaoapp.com')=='0') {
			// 正式服的配置
			obj = {
				uid: '170234',
				phone: '18676688632',
				sex: '2',
				nickname: 'Miko	',
				chatGold: '300',
				icon: 'http://img.dianliaoapp.com/RELEASE/170234/head/1503905800709.png',
				isRenewals: 1, // 1->会员，0->不是会员
			};
		} else {
			// 测试服的配置
			obj = {
				uid: '10075',
				phone: '18682240624',
				sex: '2',
				nickname: '欢迎进来	',
				chatGold: '999',
				icon: 'http://img.dianliaoapp.com/DEBUG/10075/head/1517979157265.png',
				isRenewals: 1, // 1->会员，0->不是会员
			};
		}
		if (window.sendToApp) {
			// 安卓和旧版本的iphone取值的办法
			return JSON.parse(window.sendToApp.getUserInfo());
		} else if (window.webkit && !this.thirdParty().isWechat) {
			// 新版本的微信含有window.webkit的方法，本地进行测试的时候，应该进行第三个else中
			// 当前的判断是新版本的iOS进入的方法，客户端中的调用，不是在微信中调用
			return JSON.parse(this.getCookie('USERINFO'));
		} else {
			return obj;
		}
	},
	// 调用APP的充值页面进行充值
	callAppToRearge: function () {
		if (window.sendToApp) {
			// 安卓的方式
			window.sendToApp.openChargePanel();
		} else if (window.webkit && !this.thirdParty().isWechat) {
			// ios的控件问题
			window.webkit.messageHandlers.openChargePanel.postMessage("");
		} else {
			console.log('去app的充值页面进行充值');
		}
	},
	// 调用App跳转到指定的用户的首页
	callAppToUidIndex : function (uid) {
		if (window.sendToApp) {
			window.sendToApp.openUserInfoPanel(uid);
		} else if (window.webkit && !this.thirdParty().isWechat) {
			window.webkit.messageHandlers.openUserInfoPanel.postMessage(uid);
		} else {
			console.log('去'+uid+'个人详情首页');
		}
	},
	// 调用App跳转到指定的家族的首页详情页面(yunxin_family_id->家族的云信id值)
	callAppToFamilyIndexDetail : function (yunxin_family_id) {
		var yunxinFamilyId = yunxin_family_id.toString();
		if (window.sendToApp) {
			window.sendToApp.openFamilyInfoPanel(yunxinFamilyId);
		} else if (window.webkit && !this.thirdParty().isWechat) {
			window.webkit.messageHandlers.openFamilyInfoPanel.postMessage(yunxinFamilyId);
		} else {
			console.log('打开了'+yunxinFamilyId+'家族首页面');
		}
	},
	// 调用App跳转与对方对话IM页面(that_uid->对方的uid账号)
	callAppToElseUidChat : function (that_uid) {
		if (window.sendToApp) {
			window.sendToApp.openChatPanel(that_uid);
		} else if (window.webkit && !this.thirdParty().isWechat) {
			window.webkit.messageHandlers.openChatPanel.postMessage(that_uid);
		} else {
			console.log('去与'+that_uid+'的对话IM页面');
		}
	},
	// 调用App跳转打开指定的H5页面(可以返回到之前的H5页面),url->H5的链接地址,title->H5页面的title
	callAppOpenElseHtml : function (url, title) {
		var _this = this;
		if (window.sendToApp) {
			if (_this.appVersion.ios) {
				// ios直接传url就行
				window.sendToApp.startHTMLView(url);
			} else if (_this.appVersion.android) {
				// android机型，需要传url、title
				window.sendToApp.startHTMLView(url, title);				
			}
		} else if (window.webkit && !this.thirdParty().isWechat) {
			if (_this.appVersion.ios) {
				// 只有ios的版本才会有这个方法
				window.webkit.messageHandlers.startHTMLView.postMessage(url);
			}
		} else {
			// 不是在app打开的
			console.log('打开了title为('+title+')链接为('+url+')页面');
		}
	},
	// 调用App跳转打开的录音页面进行录音操作
	goToAppRecord : function() {
		if (window.sendToApp) {
			if(window.sendToApp.htmlActivityRecord) {
				window.sendToApp.htmlActivityRecord();
				return true; // 新版本
			} else {
				return false; // 旧版本
			}
		} else if (window.webkit && !this.thirdParty().isWechat) {
			window.webkit.messageHandlers.htmlActivityRecord.postMessage("");
			return true; // 新版本
		} else {
			console.log('去App的录音页面');
		}
	},
	// 页面中准备好被客户端调用的方法
	htmlAppRecordId : function (callBackFun) {
		/*
			使用方法：直接在页面加入两行代码
			var getToAppRecordId = config.htmlAppRecordId(callBackFun); // 第一步准备getToAppRecordId函数给客户端调用
			function callBackFun (objStr) { // 第二步准备回调函数，用于拿取客户端输出的值
				// 在这个回调函数对得到的得到的json格式字符串进行操作
			}
		*/
		return function (objStrs) {
			var _this = config;
			// 此方法是准备给app调用的方法，对app中返回的值进行处理
			if (_this.appVersion.ios) {
				// ios机型
				if (objStrs.url=='') {
					callBackFun('null');
				} else {
					objStrs = JSON.stringify(objStrs);
					callBackFun(objStrs);
				}
			} else if (_this.appVersion.android) {
				// android机型
				objStrs = JSON.parse(objStrs);
				if (objStrs.count=='0') {
					callBackFun('null');
				} else {
					objStrs = JSON.stringify(objStrs);
					callBackFun(objStrs);
				}
			}
		};
	},
	//直播大厅的进入，调用直接传family_id可以直接使用就行
	callAppToRoomHallData : function(yun_xin_room_id, callback) {
		var _this= this;
		var url = "";
		if(location.href.indexOf('https://manage.dianliaoapp.com')=='0') {
			url = "https://app-h.dianliaoapp.com/HActivity/getFamilyLiveInfo?yun_xin_room_id="+yun_xin_room_id;
		} else {
			url = "http://test-app-h.dianliaoapp.com/HActivity/getFamilyLiveInfo?yun_xin_room_id="+yun_xin_room_id;
		}
		//原生ajax请求
		var xhr = "";
		if(typeof XMLHttpRequest != "undefined"){
			xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject();
		}
		xhr.open("GET", url, true);
		xhr.send(null);
		xhr.onreadystatechange = function(){
			if(xhr.readyState==4 && xhr.status==200){
				var res = JSON.parse(xhr.responseText);
				if(res.room_status=="0") {
					//房间已开启，和客户端进行交互
					var obj = {};
					obj.chatId = res.chat_id;
					obj.yunXinRoomId = res.yun_xin_room_id;
					obj.roomLiveBroadcastRecordId = res.call_record_id;
					obj.liveBroadcastType = res.live_broadcast_type;
					obj.familyId = res.family_id;
					obj.roomId = res.room_id;
					obj.isCloase = res.is_close;
					if (window.sendToApp) {
						if(window.sendToApp.openRoomHallPanel) {
							callback();
							window.sendToApp.openRoomHallPanel(JSON.stringify(obj));
						}
					} else if (window.webkit&&!_this.thirdParty().isWechat) {
						callback();
						window.webkit.messageHandlers.openRoomHallPanel.postMessage(JSON.stringify(obj));
					}
				} else if(res.room_status=="1") {
					//房间已关闭
					callback();
					_this.layerMsg('房间已关闭啦~', 2);
				} else if(res.room_status=="2") {
					callback();
					_this.layerMsg('由于该直播间违反了平台相关规定，已被封停。若有疑问可联系qq：3214823723', 2);
				}
			}
		};
	},
	//设置页面的顶部右侧按钮
	settingRightBtn : function(obj) {
		if (window.sendToApp) {
			window.sendToApp.settingRightBtn(obj);
		} else if (window.webkit && !this.thirdParty().isWechat) {
			window.webkit.messageHandlers.settingRightBtn.postMessage(obj);
		} else {
			console.log('设置右侧按钮');
		}
	},
	// 关闭掉当前的web控件
	closeWebFrame : function() {
		if(window.sendToApp) {
			window.sendToApp.closeWebFrame();
		} else if(window.webkit && !this.thirdParty().isWechat) {
			window.webkit.messageHandlers.closeWebFrame.postMessage("");
		} else {
			console.log('关闭当前页面web控件');
		}
	},
	// 实现客户端、H5页面聊币、聊票数量的设置
	/*	需在当前的H5页面里面进行添加上对应的方法名进行拿值
		function getGoldTickets(obj) {
    		alert(obj);
    	}
	*/
	getGoldTickets : function() {
		if(window.sendToApp) {
			window.sendToApp.getGoldTickets();
		} else if(window.webkit && !this.thirdParty().isWechat) {
			window.webkit.messageHandlers.getGoldTickets.postMessage('');    			
		} else {
			console.log('实现客户端、H5页面聊币、聊票数量的设置');
		}
	},
	// 去外部浏览器打开连接（只有在ios中使用）
	goOutBrowser : function(obj) {
		if(window.sendToApp) {
			window.sendToApp.goOutBrowser();
		} else if(window.webkit && !this.thirdParty().isWechat) {
			window.webkit.messageHandlers.goOutBrowser.postMessage(obj);    			
		} else {
			console.log('去外部浏览器页面');
		}
	},
	// 打开app并跳到指定的页面
	callAppOpenAppointModel : function (objName,objParmas) {
		var u=navigator.userAgent.toLowerCase();
		var bIsIpad = u.match(/ipad/i) == "ipad";
		var bIsIphoneOs = u.match(/iphone os/i) == "iphone os";
		var objName = JSON.parse(objName);
		//安卓-抢聊:grab_chat,抢聊匹配:eavesdrop_match,偷听列表:eavesdrop_connect,语聊匹配:conversation_match,钱包:my_wallet,首页:first_main ,游戏:game_first 该注释不能删
		//ios-抢聊:VOISnatchChatVC,抢聊匹配:VOIRadarVC_Learn,偷听列表:VOILearnChatVC,语聊匹配:VOIRadarVC_Voice,钱包:VOIWalletVC,首页:VOIHomeVC,游戏:VOIWkWebViewVC  该注释不能删
		//例如抢聊:objName={nameIos:'VOISnatchChatVC',nameAndroid:'grab_chat'} 安卓和ios不一样。objParmas是参数。都是json字符串
		if(bIsIpad || bIsIphoneOs){
			//ios
			window.location.href = "voice://dianliaoapp.com/"+objName.nameIos+"?"+objParmas;
		}else{
			var objParmas = JSON.parse(objParmas);
			//安卓
			if(objName.nameAndroid == 'my_wallet'){
				window.location.href = 'youwo://dianliaoapp.com/my_wallet?query='+config.server+'/client/dev/explain/myWallet/myWallet.html';
			}else if(objName.nameAndroid == 'my_personinfo'){
				window.location.href = "youwo://dianliaoapp.com/my_personinfo?query="+objParmas.uid+'<~>'+objParmas.type;
			}else if(objName.nameAndroid == 'home_ad'){
				window.location.href = "youwo://dianliaoapp.com/home_ad?query="+objParmas.url+'<~>'+objParmas.title;
			}else if(objName.nameAndroid == 'game_first'){
				window.location.href = "youwo://dianliaoapp.com/home_ad?query="+objParmas.url+'<~>'+objParmas.gameType+'<~>'+objParmas.is_vertical+'<~>'+objParmas.min_gold;
			}else{
				window.location.href = "youwo://dianliaoapp.com/"+objName.nameAndroid;
			};
		};
	}
};
// 检测判断是否在正式服上面，修改相应config中对应的正式服路径
if (location.href.indexOf('https://manage.dianliaoapp.com')=='0') {
	config.khserver = 'https://app-h.dianliaoapp.com';
	config.server = 'https://manage.dianliaoapp.com';
	config.wechatShareUrl = 'https://manage.dianliaoapp.com/client/dev/wechat/baseApi/wechatApi.php';
	config.serverStatus = true;
} else {
	// 不进行处理
}