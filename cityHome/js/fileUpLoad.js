var conmonFileLoad=(function(){

    function Fileload(options){
        this.opts=options;
        this.count=0;
    }

    Fileload.prototype.Init=function(){
        this.wrapContainer=document.querySelector(this.opts.parent);
        this.content=this.wrapContainer.querySelector("#content");
        this.filebtn=this.wrapContainer.querySelector("#filebtn");
        this.ItemCount=this.wrapContainer.querySelector("#ItemCount");

        this.fileBtnEventFn();
        this.fileloadCount();
    }

    Fileload.prototype.fileBtnEventFn=function(){
        var that=this;

        this.filebtn.onchange=function(){
            var fileObj=this.files;
            for(var i=0;i<fileObj.length;i++){
                var fileName=/\.(\w+)/.exec(fileObj[i].name)[1],
                    fileReg=new RegExp(that.opts.type.join("|"),"i");
                
                if(!fileReg.test(fileName)){
                    alert("请上传 "+that.opts.type.join(",")+" 格式的图片");
                    return;
                };

                if(fileObj[i].size>that.opts.size*1024*1024){
                    alert("请上传 "+that.opts.size+" MB大小格式的图片");
                    return;
                };

                that.count+=1;

                var FileReaderObj=new FileReader();//读取本地文件
                
                FileReaderObj.readAsDataURL(fileObj[i]);

                //成功触发的方法
                FileReaderObj.onload=function(){
                    var imgItem=document.createElement("div");
                    imgItem.classList.add("imgItem");
                    imgItem.innerHTML=`<img src="${this.result}" alt=""><span class="close">&times;</span>`;

                    that.content.insertBefore(imgItem,that.content.children[0]);

                    that.fileloadCount();
                    that.fileloadRemove();
                }
            }
        }
    }

    Fileload.prototype.fileloadCount=function(){
        var spans=this.ItemCount.querySelectorAll("span"),
            upLoad=this.content.querySelector("#upLoad");
        spans[0].innerHTML=this.opts.maxPic-this.count;
        spans[1].innerHTML=this.count;
        if(spans[1].innerHTML>=this.opts.maxPic){
            upLoad.style.display="none";
        }else{
            upLoad.style.display="block";
        }
    }

    Fileload.prototype.fileloadRemove=function(){
        var that=this;
        var closes=[...this.content.querySelectorAll(".close")];

        closes.forEach(function(item){
            item.onclick=function(){
                that.count-=1;
                that.content.removeChild(this.parentNode);
                that.fileloadCount();
            }
        });
    }

    var init=function(option){//默认参数
        var defaults={
            parent: '', //父元素
            type: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'svg'], //上传文件类型
			size: 3, //mb
			maxPic: 5
        };

        option=Object.assign({},defaults,option);

        return new Fileload(option).Init();
    }

    return {
        fileInit:init
    }

})();

//Object.assign({},对象1,对象2...对象n);
//用后面的对象来覆盖前面的对象,值: 后面有的就用后面的没用默认的，{}表示不覆盖默认值

// new RegExp(正则表达式,修饰符);
// //

// new Object();
// {}
