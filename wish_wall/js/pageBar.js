$.fn.extend({
	page: function(ops) {
		var html = "<div class=\"paging_bootstrap pagination\" style='float:right;margin:0;'><ul>";
		var disabled = "";

		var maxIndex = ops.pageNum || Math.ceil(ops.total / ops.pageSize);

		function pagehtml() {
			disabled = "";
			if (ops.pageIndex == 1) {
				disabled = " disabled";
			}

			var str = "<li class=\"prev" + disabled + "\"><a href=\"#\"><span class=\"hidden-480\"><span class=\"hidden-480\">上一页</span></a></li>"
			var count = maxIndex > 5 ? 5 : maxIndex;
			for (var i = 1; i <= count; i++) {
				var active = "";
				if (ops.pageIndex == i) {
					active = "class='active'";
				}
				if (ops.pageIndex > 2 && ops.pageIndex <= maxIndex - 2 && count == 5) {
					switch (i) {
						case 1:
							str += "<li><a href='#'>" + (ops.pageIndex - 2) + "</a></li>";
							break;
						case 2:
							str += "<li><a href='#'>" + (ops.pageIndex - 1) + "</a></li>";
							break;
						case 3:
							str += "<li class='active'><a href='#'>" + ops.pageIndex + "</a></li>";
							break;
						case 4:
							str += "<li><a href='#'>" + (ops.pageIndex + 1) + "</a></li>";
							break;
						case 5:
							str += "<li><a href='#'>" + (ops.pageIndex + 2) + "</a></li>";
							break;
					}
				} else if (ops.pageIndex == maxIndex - 1 && count == 5) {
					switch (i) {
						case 1:
							str += "<li><a href='#'>" + (ops.pageIndex - 3) + "</a></li>";
							break;
						case 2:
							str += "<li><a href='#'>" + (ops.pageIndex - 2) + "</a></li>";
							break;
						case 3:
							str += "<li><a href='#'>" + (ops.pageIndex - 1) + "</a></li>";
							break;
						case 4:
							str += "<li class='active'><a href='#'>" + ops.pageIndex + "</a></li>";
							break;
						case 5:
							str += "<li><a href='#'>" + (ops.pageIndex + 1) + "</a></li>";
							break;
					}
				} else if (ops.pageIndex == maxIndex && count == 5) {
					switch (i) {
						case 1:
							str += "<li><a href='#'>" + (ops.pageIndex - 4) + "</a></li>";
							break;
						case 2:
							str += "<li><a href='#'>" + (ops.pageIndex - 3) + "</a></li>";
							break;
						case 3:
							str += "<li><a href='#'>" + (ops.pageIndex - 2) + "</a></li>";
							break;
						case 4:
							str += "<li><a href='#'>" + (ops.pageIndex - 1) + "</a></li>";
							break;
						case 5:
							str += "<li class='active'><a href='#'>" + ops.pageIndex + "</a></li>";
							break;
					}
				} else {
					str += "<li " + active + "><a href='#'>" + i + "</a></li>";
				}
			}
			disabled = "";
			if (ops.pageIndex == maxIndex) {
				disabled = " disabled";
			}
			str += "<li class=\"next" + disabled + "\"><a href=\"#\"><span class=\"hidden-480\"><span class=\"hidden-480\">下一页</span></a></li>"
			return str;
		}


		html += "</ul></div>";
		$(this).html(html);

		$(this).find("ul").html(pagehtml(ops.pageIndex));
		var obj = $(this);

		//单击分页码事件
		$(this).find("li:not(.disabled,.active)").click(function() {
			clickIndex($(this).text());
		});
		function clickIndex(index) {
			// 点击上一页
			if(index == "上一页"){
				if(ops.pageIndex - 1 > 0){
					ops.pageIndex -= 1;
				}
				else if(ops.pageIndex > 1){
					ops.pageIndex--;
				}
			}
			// 点击上一页
			else if(index == "下一页"){
				if(ops.pageIndex + 1 <= maxIndex){
					ops.pageIndex += 1;
				}
				else if(ops.pageIndex < maxIndex){
					ops.pageIndex++;
				}
			}
			else{
				ops.pageIndex = parseInt(index)-1;
			}
			ops.callback(ops.pageIndex);
			ops.pageIndex+=1;
			obj.find("ul").html(pagehtml());
			obj.find("li:not(.disabled,.active)").unbind("click").bind("click", function() {
				clickIndex($(this).text());
			});
		}
	}
});
