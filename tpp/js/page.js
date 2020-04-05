(function(){
    //首页导航
    var headNavlis=[...$(".head-trans").querySelectorAll("span")];

    var mySwiper=new Swiper(".container",{
        on:{
            slideChange:function(){
                var ind=this.activeIndex;
                headComFn(ind);
            }
        }
    });

    headNavlis.forEach(function(item,ind){
        item.onclick=function(){
          headComFn(ind);
          mySwiper.slideTo(ind);
        }
    });

    function headComFn(ind){
        var indW=headNavlis[ind].offsetLeft;
        
        headNavlis.forEach(function(item){
            item.classList.remove("active");
        });
        headNavlis[ind].classList.add("active");
        $(".activeLine").style.transform="translate("+ind*indW+"px,0)"
    };

    //banner轮播图
    new Swiper(".hot",{
        autoplay:{
            delay:1000
        },
        loop:true,
        pagination:{
            el:".page",
            clickable:true
        }
    });

    //渲染数据
    rander();
    function rander(){
       var data=dataOption.hot,
           datatime=dataOption.time;
       $(".hotList").innerHTML+=randerLisFn(data);

        var timeHTML="";
        for(var key in datatime){
            timeHTML+=`<h3 class="time-title">2018-07-28 明天</h3><ul class="timeList">`;
            timeHTML+=randerLisFn(datatime[key]);
            timeHTML+=`</ul>`;
        }

        $(".time").innerHTML+=timeHTML;
    };

    function randerLisFn(data){
        var lisHTML="";
        data.forEach(function(item,ind){
            var styleHTML="";
            item.style.map(function(val){
                styleHTML+=`<b>${val}</b>`;
            });

            lisHTML+=`<li>
                            <dl>
                                <dt><img src="${item.pic}" alt=""></dt>
                                <dd>
                                    <h3>${item.title} ${styleHTML}</h3>
                                    <p><span>${item.person}</span>人想看</p>
                                    <p>导演: ${item.action}</p>
                                    <p>主演: ${item.name}</p>
                                    <p>${item.tag}</p>
                                </dd>
                            </dl>
                        </li>`;

        });

        return lisHTML;
    }



    function $(selector){
        return typeof(selector)==="string"?document.querySelector(selector):selector;
    }
 


})();