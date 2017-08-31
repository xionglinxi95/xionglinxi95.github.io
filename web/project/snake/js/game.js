/**
 * Game 类
 * 作用：用来管理和调度其它对象来完成整个游戏的运行
 */
define(function (require, exports, module) {
  var $ = require('../vendor/jquery-3.2.1')
  var Food = require('./food')
  var Snake = require('./snake')

  function Game() {
    this.$canvas = $('#canvas')
    this.$mode = $('#mode')
    this.$btnStart = $('#btn_start')
    this.food = new Food()
    this.snake = new Snake()
    this.isStarted = false
  }

  module.exports = Game

  Game.prototype.init = function () {
    // 根据食物的基本特征属性，生成 DOM ，渲染到画布容器中
    this.food.render(this.$canvas)
      // 当游戏一开始的时候，先把蛇的初始状态渲染到页面中
    this.snake.render(this.$canvas)
    this.initEvent()
  }

  Game.prototype.initEvent = function () {
    this.bindStartEvent()
    this.bindKeyDownEvent()
  }

  Game.prototype.bindStartEvent = function () {
    this.$btnStart.on('click', function (e) {
      // 如果游戏已经开始，就不允许再次开始游戏了
      if (this.isStarted) {
        return
      }

      // 将标记设置为 true 标识游戏已开始
      this.isStarted = true

      var time = this.$mode.val() // 获取到用户选择的游戏难度，定时器时间间隔越小，则游戏难度越高

      // 开启定时器，让蛇不断的运动
      setInterval(function () {
        this.snake.move(this.food, this.$canvas)
        this.snake.remove()
        this.snake.render(this.$canvas)
      }.bind(this), time)
    }.bind(this))
  }

  Game.prototype.bindKeyDownEvent = function () {
    // 监听用户的按键事件，修改蛇的运动方向
    document.addEventListener('keydown', function (e) {
      var keyCode = e.keyCode
      switch (keyCode) {
        case 37:
          this.snake.direct = 'left'
          break
        case 38:
          this.snake.direct = 'up'
          break
        case 39:
          this.snake.direct = 'right'
          break
        case 40:
          this.snake.direct = 'down'
          break
      }
    }.bind(this))
  }
})
