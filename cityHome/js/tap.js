//解决click 事件在移动端延迟300ms的问题
//思路 

//1.点击不能移动 
//2.点击时间要小于<150;时间自己定
var myTouch = {
    //el 绑定的dom元素
    //callback  点击完以后执行的回调函数，也就是执行的事件
    tap: function(el, callback) {
        el = typeof el === "object" ? el : document.querySelector(el);
        var isMove = false;
        var startTime = 0;
        el.addEventListener('touchstart', function() {
            startTime = new Date() * 1; //记录开始时间；
        });
        el.addEventListener('touchmove', function() {
            isMove = true
        });
        el.addEventListener('touchend', function(ev) {
            //点击事件成立的条件 1.不能移动 2.开始时间-结束时间<150
            if (!isMove && new Date() * 1 - startTime < 150) {
                callback && callback(this, ev);
            }
            //恢复初始值
            isMove = false;
            startTime = 0;
        });

    },
    swipe: function(el, dir, callback) {
        el = typeof el === "object" ? el : document.querySelector(el);
        var startPiont = null;
        var endPiont = null;
        el.addEventListener('touchstart', function(e) {
            var touches = e.touches[0];
            startPiont = {
                x: touches.clientX,
                y: touches.clientY
            }
        })

        el.addEventListener('touchmove', function(e) {
            var touches = e.touches[0];
            endPiont = {
                x: touches.clientX,
                y: touches.clientY
            }
        })

        el.addEventListener('touchend', function(e) {
            if (startPiont && endPiont && swipDirection(startPiont, endPiont) === dir) {
                callback && callback(this, e);
            }
            //恢复初始值
            startPiont = null;
            endPiont = null;

        })

        function swipDirection(start, end) {

            var diffX = start.x - end.x; //水平差值
            var diffY = start.y - end.y; //垂直差值
            var absX = Math.abs(diffX);
            var absY = Math.abs(diffY);
            var direction = '';
            //判断是否是滑动   //左正右负 上正下负
            if (absX > 30 || absY > 30) {
                //判断是水平方向还是垂直方向
                if (absX > absY) {
                    //console.log('水平')
                    direction = diffX > 0 ? "left" : "right";
                } else {
                    direction = diffY > 0 ? "up" : "down";
                    //  console.log('垂直')
                }
            }

            return direction; //返回方向
        }
    }

}