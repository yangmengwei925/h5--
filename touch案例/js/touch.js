(function(window){//传入window，便于变量查找

    function myQuery(selector){
        return myQuery.prototype._init(selector)
    }

    myQuery.prototype._init=function(selsector){
        if(typeof selsector==="string"){
           this.ele=[...document.querySelectorAll(selsector)];
        }
        return this;
    }

    //点击事件
    myQuery.prototype.tap=function(handelFn){
        this.ele.forEach(function(item){
            item.addEventListener("touchstart",touchFn);
            item.addEventListener("touchend",touchFn);
        })
        
        
        var startTime;

        function touchFn(e){
            e.preventDefault();

            switch(e.type){
                case "touchstart":
                    //获取按下时的时间
                    startTime=new Date().getTime();
                break;
                case "touchend":
                    var endTime=new Date().getTime();
                    //通过结束的时间减去开始的时间<500表示点击 大于表示长按
                    if(endTime-startTime<500){
                        handelFn.call(this,e);
                    }
                break;
            }
        }
    }

    myQuery.prototype.langtap=function(handelFn){
        this.ele.forEach(function(item){
            item.addEventListener("touchstart",touchFn);
            item.addEventListener("touchmove",touchFn);
            item.addEventListener("touchend",touchFn);
        });

        var timerObj=null;

        function touchFn(e){
            switch(e.type){
                case "touchstart":
                timerObj=setTimeout(function(){
                    handelFn.call(this,e);
                },500);
                break;
                case "touchmove":
                clearTimeout(timerObj);
                break;
                case "touchend":
                clearTimeout(timerObj);
                break;
            }
        }
    }

    myQuery.prototype.slideLeft=function(handelFn){
        this.ele.forEach(function(item){
            item.addEventListener("touchstart",touchFn);
            item.addEventListener("touchend",touchFn);
        });
        var statrX,startY,endX,endY;
        function touchFn(e){
            var firstTouch=e.changedTouches[0];
            
            switch(e.type){
                case "touchstart":
                    statrX=firstTouch.pageX;
                    startY=firstTouch.pageY;
                break;
                case "touchend":
                    endX=firstTouch.pageX;
                    endY=firstTouch.pageY;
                    if(Math.abs(endX-statrX)>=Math.abs(endY-startY) && statrX-endX>=25){
                        handelFn.call(this,e);
                    }
                break;
            }
        }
    }

    myQuery.prototype.slideright=function(handelFn){
        this.ele.forEach(function(item){
            item.addEventListener("touchstart",touchFn);
            item.addEventListener("touchend",touchFn);
        });
        var statrX,startY,endX,endY;
        function touchFn(e){
            var firstTouch=e.changedTouches[0];
            
            switch(e.type){
                case "touchstart":
                    statrX=firstTouch.pageX;
                    startY=firstTouch.pageY;
                break;
                case "touchend":
                    endX=firstTouch.pageX;
                    endY=firstTouch.pageY;
                    if(Math.abs(endX-statrX)>=Math.abs(endY-startY) && endX-statrX>=25){
                        handelFn.call(this,e);
                    }
                break;
            }
        }
    }

    window.$=window.myQuery=myQuery;

})(window);
//
// $("dl").slideLeft(function(){
//     this.classList.add("active");
// })
// $("dl").slideright(function(){
//     this.classList.remove("active");
// })