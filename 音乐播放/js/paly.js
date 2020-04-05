window.onload = function() {
    var audio = document.createElement('audio');
    audio.src = './src/3683914425.mp3';
    var loading = document.querySelector('.loading'),
        audioBox = document.querySelector('.audio-box'),
        //时间p标签
        title = audioBox.querySelector('.audio-time-title'),
        //父元素
        audioConctor = audioBox.querySelector('.audio-conctor'),
        //蓝色线
        audioLine = audioBox.querySelector('.audio-time-line'),
        audioBtn = audioBox.querySelector('.audio-time-btn'),
        playBtn = audioBox.querySelector('.audio-btn');
    var width;
    playBtn.addEventListener('click', function() {
        //audio.paused 判断是否暂停 暂停返回true 
        if (audio.paused) {
            audio.play();
            this.classList.remove('stop');
        } else {
            audio.pause();
            this.classList.add('stop');
        }
    });
    //视频加载完成
    audio.addEventListener('canplaythrough', function() {
        //loading隐藏
        loading.style.display = 'none';
        //音频显示
        audioBox.style.display = 'block';
        //设置时长
        title.innerHTML = '00:00/' + getM(this.duration);
        //获取宽度。displaynone的元素宽度为0
        width = audioConctor.offsetWidth;
        //开始播放
        this.play();
    });
    //当前播放发生改变
    audio.addEventListener('timeupdate', function() {
        //最后的时候停止动画
        if (this.currentTime === this.duration) {
            playBtn.classList.add('stop');
        };
        //修改线的位置
        changeLineWidth(this.currentTime, this.duration);
    });
    //按下
    var startx, movex, flag = false;
    audioBtn.addEventListener('touchstart', function(e) {
        flag = true;
        var touches = e.touches[0];
        //按下的时候获取不变的距离 手指到按钮的距离
        //手指到按钮的距离 = 手指距可视区域的距离 - 当前元素距可视区域的距离
        startx = touches.clientX - this.offsetLeft;
    });
    //移动
    audioBtn.addEventListener('touchmove', function(e) {
        var touches = e.touches[0];
        //用手指距可视区域的距离 - 手指到按钮的距离 = 按钮的left值
        movex = touches.clientX - startx;
        if (flag) {
            if (movex <= 0) {
                movex = 0;
            } else if (movex > width) {
                movex = width;
            };
            //tims时长 = movex当前距离 / 总宽度 * 总时长
            var tims = movex / width * audio.duration;
            //设置音频当前播放的位置
            audio.currentTime = tims;
            changeLineWidth(tims, audio.duration);
        }
    });
    //松开
    audioBtn.addEventListener('touchend', function() {
        flag = false;
    });

    function changeLineWidth(cur, sum) {
        //cur 当前时长
        audioLine.style.width = Math.round(cur / sum * width) + 'px';
        audioBtn.style.left = Math.round(cur / sum * width) - 5 + 'px';
        title.innerHTML = getM(cur) + '/' + getM(sum);
    };

    function addZero(n) {
        return n < 10 ? '0' + n : n;
    }

    function getM(n) {
        n = Math.floor(n);
        return addZero(Math.floor(n / 60)) + ':' + addZero(n % 60);
    }
};