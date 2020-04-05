(function(){

    var audio=document.createElement("audio");
    audio.src="./src/3683914425.mp3";

    var loading=document.querySelector(".loading"),
        audioBox=document.querySelector(".audio-box"),
        audioTime=audioBox.querySelector(".audio-time-title"),//显示时间的标签
        //表示蓝色线条
        audioConctor=audioBox.querySelector(".audio-conctor"),
        audioLine=audioConctor.querySelector(".audio-time-line"),
        audioLinebtn=audioConctor.querySelector(".audio-time-btn"),
        audioPlayBtn=audioBox.querySelector(".audio-btn");
    var width;

    audioPlayBtn.addEventListener("click",function(){
        if(audio.paused){//paused如果暂停返回true
           audio.play();
           this.classList.remove("stop");
        }else{
            audio.pause();
            this.classList.add("stop");
        }
    });
    
    audio.addEventListener("canplaythrough",function(){
        //隐藏loding
        loading.style.display="none";
        //显示背景
        audioBox.style.display="block";
        //显示时长
        audioTime.innerHTML='00:00/' + getM(this.duration);
        //获取宽度
        width=audioConctor.offsetWidth;
        
        changeAudio(this.currentTime,this.duration);
    });

    audio.addEventListener("timeupdate",function(){
        if(this.currentTime==this.duration){
           audioPlayBtn.classList.add("stop");
        }
        changeAudio(this.currentTime,this.duration);
        
    })

    var startX,moveX,flag=false;
    //按下
    audioLinebtn.addEventListener("touchstart",function(e){
        var touches=e.touches[0];
        startX=touches.pageX-this.offsetLeft;
        flag=true;
    });
    //移动
    audioLinebtn.addEventListener("touchmove",function(e){
        var touches=e.touches[0];
        moveX=touches.pageX-startX;
        if(flag){
            
            if(moveX<0){
               moveX=0
            }else if(moveX>width){
                moveX=width;
            }
            //times时长=移动的距离/总宽*总时长
            var times=moveX/width*audio.duration;
            //赋值给当前时间
            audio.currentTime=times;
            
            changeAudio(times,audio.duration);
        }
    });

    audioLinebtn.addEventListener("touchend",function(){
        flag=false;
    });

    function changeAudio(cur,sum){
        audioLine.style.width=Math.round(cur/sum*width)+"px";
        audioLinebtn.style.left=Math.round(cur/sum*width)-5+"px";
        
        audioTime.innerHTML=getM(cur) + '/' + getM(sum);
        
    };

    function addZero(n){
        return n<10?"0"+n:n;
    };

    function getM(n){
        n=Math.floor(n);
        return addZero(Math.floor(n/60))+':'+addZero(n%60);
    };
})();