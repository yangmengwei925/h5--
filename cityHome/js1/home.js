(function(){

    var storage=window.localStorage;

    $(".addres").onclick=function(){
        $("#cityDialog").style.transform="translate(0,0%)";
    };

    $(".close").onclick=function(){
        $("#cityDialog").style.transform="translate(0,-100%)";
    };

    //首页加载函数
    initFn();

    function initFn(){

        new Swiper(".banner",{
            autoplay:{
                delay:1000
            },
            loop:true,
            pagination:{
                el:".page",
                clickable:true
            }
        });

        var myScrollWrap=new BScroll(".mainWrapper",{
            scrollbar:true,
            scrollY:true,
            probeType:2,
            click:true
        });

        var dataLis=dataOption.data.searchresult;
    
        randerFn(dataLis);

        function randerFn(data){
            var strHTML="";
            data.map(function(item,ind){
                var tagHTML="";
                item.poiAttrTagList.map(function(val){
                    tagHTML+=`<span>${val}</span>`;
                });

                strHTML+=`<li>
                                <dl>
                                    <dt><img src="${item.frontImg.replace(/\w+\.h/,"216.0")}"
                                            alt=""></dt>
                                    <dd>
                                        <h3>${item.name}</h3>
                                        <p>${tagHTML}</p>
                                        <p>${item.scoreIntro} ${item.poiRecommendTag}</p>
                                        <p>${item.posdescr}</p>
                                        <p>￥${item.lowestPrice}</p>
                                    </dd>
                                </dl>
                            </li>`;

            });

            $("#menuWrap>ul").innerHTML+=strHTML;

            var menuLis=[...$("#menuWrap>ul").querySelectorAll("li")];
            menuLis.forEach(function(item,ind){
                item.onclick=function(){
                    location.href="./pageDtail/pageDtail.html";

                }
            });
        };

        myScrollWrap.on("scroll",function(){
            if(this.y<this.maxScrollY-50){
              $(".loding").classList.add("active");
            }else if(this.y<this.maxScrollY-25){
              $(".loding").classList.remove("active");
            }
        });

        myScrollWrap.on("scrollEnd",function(){
            $(".loding").classList.remove("active");
        });

        myScrollWrap.on("touchEnd",function(){
            if($(".loding").classList.contains("active")){
              randerFn(dataLis);
              myScrollWrap.refresh();
            }
        });

    };

    function cityDiaFn(){
        var cityData=dataCity,
            chineseReg=/[\u4e00-\u9fa5]+/g;
        
        randerCity(cityData);

        function  randerCity(data){
            var cityHTML="",
                asideHTML="";
            for(var key in data){
                cityHTML+=`<h3>${key}</h3>`;
                asideHTML+=`<p>${key}</p>`; 
                //把所有匹配到的字符转换为数组
                data[key].match(chineseReg).map(function(val){
                    cityHTML+=`<p>${val}</p>`;
                });
                
            };

            $(".dialog-container").innerHTML=cityHTML;
            $(".dialog-asideLis").innerHTML=asideHTML;
        };

        var myScrollDia=new BScroll(".dialog-inner",{
            scrollbar:true,
            scrollY:true,
            probeType:2,
            click:true
        });

        var asideP=[...$(".dialog-asideLis").querySelectorAll("p")];

        asideP.forEach(function(item,ind){
            item.index=ind;
            item.onclick=function(){
                var h3Elements=$(".dialog-container").querySelectorAll("h3");
                myScrollDia.scrollToElement(h3Elements[this.index],100,0,0);
            }
        });

        $("#searchIpu").oninput=function(){
            var val=this.value.trim();
            if(val!=""){
                $(".dialog-container").innerHTML="";
                for(var key in cityData){
                    if(key!="热门"){
                        cityData[key].match(chineseReg).map(function(v){
                            if(v.indexOf(val)!=-1){
                                $(".dialog-container").innerHTML+=`<p>${v}</p>`;
                            }
                        });
                    }
                };
            }else{
                randerCity(cityData);
            }
        }

        var cityName=storage.city || "上海";
        var dialogP=[...$(".dialog-container").querySelectorAll("p")];
        $(".addres").innerHTML=cityName;
        dialogP.forEach(function(item,ind){
            item.onclick=function(){
                cityName=this.innerHTML;
                $(".addres").innerHTML=cityName;
                $("#cityDialog").style.transform="translate(0,-100%)";
                storage.city=cityName;
            }
        });
    }

    cityDiaFn();


    function $(selector){
        return typeof(selector)==="string"?document.querySelector(selector):selector;
    }

})();