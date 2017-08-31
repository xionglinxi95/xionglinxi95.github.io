define(function (require, exports, module) {
  var PixelBlock = require('./pixel-block')
  var $ = require('../vendor/jquery-3.2.1')
  var _ = require('../vendor/underscore')

  function Snake() {
    this.headColor = 'red'
    this.bodyColor = 'skyblue'

    // 数组字面量中的值出现的 this 指向当前代码执行环境
    this.body = [
        [1, 2, this.bodyColor],
        [2, 2, this.bodyColor],
        [3, 2, this.headColor]
      ],
      this.direct = 'right'
  }

  module.exports = Snake

  Snake.prototype = new PixelBlock()

  Snake.prototype.render = function ($canvas) {
    this.$doms = [] // 每一次 render 渲染的时候，将 $doms 重置为一个空数组

    // 如果在这里使用 forEach 循环而没有特殊处理，则内部 this 指向 window
    // arr.forEach(function () { console.log(this) // => window })
    // 最简单的做法就是在外部备份 this ，然后在内部使用，例如：
    // var _this = this; arr.forEach(function () { console.log(_this) // => 当前实例对象 })
    // 然而前面的方式还是比较麻烦，所以 EcmaScript 5 中加入了函数的 bind 方法

    // 建议：函数中如果出现命名函数，建议使用表达式的方式
    var forEachHandler = function (item) {
      var $div = $('<div></div>')
      this.$doms.push($div)
      $div.css({
        width: this.width,
        height: this.height,
        backgroundColor: item[2],
        top: item[1] * this.height,
        left: item[0] * this.width,
        position: this.position
      })
      $canvas.append($div)
    }

    // 改变函数内部 this 指向，得到一个新的函数
    // 新函数和原来的函数代码一模一样，唯独内部 this 指向发生改变了，指向了咱们自己指定的 this 环境
    forEachHandler = forEachHandler.bind(this)

    this.body.forEach(forEachHandler)
  }

  Snake.prototype.move = function (food, $canvas) {
    // 循环除了头部之外的所有节点
    // 让节点 n 的 left 改变为后面一个的 left
    // 让节点 n 的 top 改变为后面一个 top
    for (var i = 0; i < this.body.length - 1; i++) {
      this.body[i][0] = this.body[i + 1][0]
      this.body[i][1] = this.body[i + 1][1]
    }

    // 根据方向控制头部的坐标
    switch (this.direct) {
      case 'right':
        _.last(this.body)[0] += 1
        break
      case 'left':
        _.last(this.body)[0] -= 1
        break
      case 'down':
        _.last(this.body)[1] += 1
        break
      case 'up':
        _.last(this.body)[1] -= 1
        break
    }

    // 形态改变完成，判断蛇的头部是否与食物的坐标吻合，如果吻合则证明蛇吃到了食物
    // 吃到食物之后，需要让蛇的身体增加一个像素块节点
    // 同时让食物重新生成，然后随机显示到画布的某个坐标上
    var headLeft = _.last(this.body)[0] * this.width
    var headTop = _.last(this.body)[1] * this.height

    if (headLeft === food.left && headTop === food.top) {
      // 这是一个二维数组，复制的是引用，所以下面单独的把它的值一个一个拿出来
      // 这里只需要将追加的节点的坐标等于蛇的最后一个节点的坐标即可，在下一帧就被渲染出来了
      var first = _.first(this.body)

      // 往保存蛇的状态的数组中插入一个附带坐标的状态
      this.body.unshift([first[0], first[1], first[2]])

      // 删除被蛇迟到的食物在画布上的显示
      food.remove()

      // 将食物重新在画布上随机渲染一次
      food.render($canvas)
    }
  }
})
