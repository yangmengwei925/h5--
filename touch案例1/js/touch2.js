(function(window){

    function myquery(selector){
        return myquery.prototype._init(selector);
    }

    myquery.prototype._init=function(selsector){
        if(typeof selsector==="string"){
            this.ele=[...document.querySelectorAll(selsector)];
        }
        return this;
    };

    myquery.prototype.slideLeft=function(handlFn){
        this.ele.forEach(function(item){
            item.addEventListener("touchstart",touchFn);
            item.addEventListener("touchend",touchFn);
        });
        var startX,startY,endX,endY;
        function touchFn(e){
          var firstEvent=e.changedTouches[0];

          switch(e.type){
              case "touchstart":
                startX=firstEvent.pageX;
                startY=firstEvent.pageY;
              break;

              case "touchend":
                endX=firstEvent.pageX;
                endY=firstEvent.pageY;
                if(Math.abs(endX-startX)>=Math.abs(endY-startY) && startX-endX>=25){
                    handlFn.call(this,e);
                }
              break;
          }
        }
    };

    myquery.prototype.slideRight=function(handlFn){
        
        this.ele.forEach(function(item){
            item.addEventListener("touchstart",touchFn);
            item.addEventListener("touchend",touchFn);
        });
        var startX,startY,endX,endY;
        function touchFn(e){
          var firstEvent=e.changedTouches[0];

          switch(e.type){
              case "touchstart":
                startX=firstEvent.pageX;
                startY=firstEvent.pageY;
              break;

              case "touchend":
                endX=firstEvent.pageX;
                endY=firstEvent.pageY;
                if(Math.abs(endX-startX)>=Math.abs(endY-startY) && endX-startX>=25){
                    handlFn.call(this,e);
                }
              break;
          }
        }
    }


    window.$t=window.myquery=myquery;

})(window);