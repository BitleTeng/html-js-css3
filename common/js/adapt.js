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
//			alert(docEl.style.fontSize);
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
