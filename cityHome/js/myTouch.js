; (function (window) {
  // 定义：闭包函数 是 函数内部 可以访问函数外部 作用域的 函数
  // 形式：函数套函数 最常见形式
  // 优点：防止变量污染
  // 缺点：造成内存泄漏
  // 必须说到函数作用域：函数内部访问外部，外部访问不到内部
  var myjQuery = function (el) {
    return new myjQuery.fn.init(el)
  }
  // myjQuery.init()
  myjQuery.fn = myjQuery.prototype = {
    init:function(el) { // 构造函数
      if (!el) return;
      if (typeof el === 'string') {
        var doms = document.querySelectorAll(el);
        for (var i = 0; i < doms.length; i++) {
          this.push(doms[i])
        }
      }
      return this;
    },
    push: [].push,
    swipeLeft: function () {
      for (var i = 0; i < this.length; i++) {
        this[i].addEventListener('touchstart', touchFn)
        this[i].addEventListener('touchmove', touchFn)
        this[i].addEventListener('touchend', touchFn)
      }

      var startX, startY, endX, endY;
      function touchFn(e) {
        console.log(e.type)
        var firstTouch = e.touches[0]
        switch (e.type) {
          case 'touchstart':
            startX = firstTouch.pageX;
            startY = firstTouch.pageY;
            break;

          case 'touchmove':
            endX = firstTouch.pageX;
            endY = firstTouch.pageY;
            break;
          case 'touchend':
            var moveX = endX - startX;
            if (Math.abs(endX - startX) - Math.abs(endY - startY) >= 0 && startX - endX >= 25 && moveX < 0) {
              this.style.transform = `translate(${-50}px)`
            }
            console.log(startX, endX)
            break;
        }
      }
    }
  }
  
  myjQuery.fn.init.prototype = myjQuery.fn 

  window.$ = window.myjQuery = myjQuery;

})(window)
// $('.content').swipeLeft(function() {})
