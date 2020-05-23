const getJSON = function(url) {
	const promise = new Promise(function(resolve, reject){
	    const handler = function() {
	      if (this.readyState !== 4) {
	        return;
	      }
	      if (this.status === 200) {
	        resolve(this.response);
	      } else {
	        reject(new Error(this.statusText));
	      }
	    };
	    const client = new XMLHttpRequest();
	    client.open("GET", url);
	    client.onreadystatechange = handler;
	    client.responseType = "json";
	    client.setRequestHeader("Accept", "application/json");
	    client.send();
	});
	return promise;
};
//获取url参数值
function getQueryString(name, decode) {
	var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "i");
	if (decode) {
		var r = decodeURI(window.location.search).substr(1).match(reg);
	} else {
		var r = window.location.search.substr(1).match(reg);
	}
	if (r != null) return unescape(r[2]);
	return null;
}