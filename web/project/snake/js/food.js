define(function (require, exports, module) {
  var $ = require('../vendor/jquery-3.2.1')
  var PixelBlock = require('./pixel-block')
  var _ = require('../vendor/underscore')

  function Food() {
    this.backgroundColor = 'yellow'
  }

  module.exports = Food

  Food.prototype = new PixelBlock()

  Food.prototype.render = function ($canvas) {
    this.$doms = []
      // 在渲染的时候，随机生成食物的坐标
    this.top = _.random(0, ($canvas.height() / this.height - 1)) * this.height
    this.left = _.random(0, ($canvas.width() / this.width - 1)) * this.width
      // 这里直接将生成的 jQuery 包装的 DOM 对象挂载到实例对象上
      // 目的是为了在 Food 的其它方法中可以访问当前实例对象对应的真实的 DOM 对象
    var $div = $('<div></div>')

    // 引用类型拷贝，拷贝的引用
    // 也就意味着我修改 $div 也会修改 this.$this
    // 同样的，我修改 this.$this 也会修改 $div
    // this 实例对象
    // 对象是动态的
    // 这里就是简单的为对象自定义动态添加了一个成员
    this.$doms.push($div)

    // 关于 css 方法中传递的对象中的 this
    //    如果对象字面量中除了函数之外的值中出现的 this 都指向代码代码执行环境
    this.$doms[0].css({
      width: this.width,
      height: this.height,
      backgroundColor: this.backgroundColor,
      top: this.top,
      left: this.left,
      position: this.position
    })
    // 将生成的食物追加渲染到游戏画布上
    $canvas.append(this.$doms[0])
  }
})
