define(function (require, exports, module) {
  var Game = require('./game')
  var Cat = require('./cat.js')
  new Game().init()
  var c1 = new Cat('kitty', 3)
  c1.sayName()
})
