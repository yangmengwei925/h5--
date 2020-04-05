;(function() {
  
  // $('.box') .fangfamignzi
  const myJquery = function(ele) {
      return myJquery.prototype.init(ele);
  }
  myJquery.prototype = {
    init(ele) {
      if (typeof ele == 'string') {
        this.ele = document.querySelector(ele);

        // 返回什么
        return this;
      }  
    },
    swipeLeft(fn) {
      
      this.ele.addEventListener('touchstart', touchfn);
      this.ele.addEventListener('touchend', touchfn);

      let startX,startY,endX,endY;
      function touchfn(e) {
        
        let firstTouch = e.changedTouches[0];
        switch(e.type) {
          case 'touchstart':
          startX = firstTouch.pageX;
          startY = firstTouch.pageY;

          break;
          case 'touchend' :
          endX = firstTouch.pageX;
          endY = firstTouch.pageY;
          if ( Math.abs(endX - startX) >= Math.abs(endY - startY) && startX - endX >= 25 ) {
            let left = 'left'
            fn.call(this, e, left);
          } else {
            let right = 'right'
            fn.call(this, e, right);
          }
          break;
        }
      }
    }
  }

  window.$ = window.myJquery = myJquery;
  
})()