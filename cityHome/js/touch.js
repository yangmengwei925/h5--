;
(function (window) {

  var version = "1.0.0";
  var jQuery = function (selector, context) {
    return new jQuery.fn.init(selector, context)
  }

  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    // The default length of a jQuery object is 0 ==>jQuery对象的默认长度是0
    length: 0,
    // 实例化化方法，这个方法可以称作 jQuery 对象构造器
    init: function (selector, context) {
      context = context || document;
      context = context.nodeType ? context : context[0];
      if (!selector) {
        return this;
      }
      if (typeof selector == 'string') {
        if (selector[0] === '<' && selector.length > 3 && selector[selector.length - 1] === '>') {
          var oDiv = document.createElement('div');
          oDiv.innerHTML = selector;
          // 增加length属性
          this.length = 1;
          this[0] = oDiv.firstElementChild || oDiv.firstChild; // 高版本浏览器  全识别
        } else {
          // 判断id
          // if (selector[0] == '#' && this.strNum(selector, '#') === 1) {
          //   var dom = document.getElementById(selector.slice(1));
          //   if (dom) {
          //     this[0] = dom;
          //     this.length = 1;
          //   }
          // } else {
          var dom = context.querySelectorAll(selector);
          for (var i = 0; i < dom.length; i++) {
            this.push(dom[i])
          }
          // }
        }
      } else if (selector.nodeType) { // 传入dom节点时候
        this[0] = selector;
        this.length = 1;
      } else if (selector instanceof jQuery) { // 传入实例对象的时候
        return selector;
      } else {
        return this;
      }
    },
    /**
     * [给集合中添加内容]
     * @param {Any} [要添加的内容]
     */
    // push: function (content) {
    //   Array.prototype.push.call(this, content)
    // },
    push: [].push,
    splice: [].splice,
    strNum: function (str, char) {
      var num = 0;
      for (var i = 0; i < str.length; i++) {
        if (str[i] === char) {
          num++;
        }
      }
      return num;
    }
  }






  //  这里将jQuery的原型赋值给init原型,让init实例化之后可以调用jQuery的原型方法
  jQuery.fn.init.prototype = jQuery.fn; // 构造分离器

  // 这也就是为什么实例化init可以调用jQuery的原型val()方法 比如：$("#id").val()

  window.$ = window.jQuery = jQuery; // $就是jQuery对象

})(window)