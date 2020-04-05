
function ajax(opt) {
  // // 请求核心对象 
  var xhr = new XMLHttpRequest();
  xhr.onload = function (res) {
    if (res.target.status === 200) {
      opt.success && opt.success(JSON.parse(res.target.response))
    }
  }
  // 打开  方式：get url
  xhr.open(opt.type, opt.url);
  xhr.send()
}