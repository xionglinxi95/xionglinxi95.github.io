define(function (require, exports, module) {
  var PixelBlock = require('./pixel-block')
  var $ = require('../vendor/jquery-3.2.1')
  var cal = require('./cal')
  function Cat (name, age) {
    this.name = name
    this.age = age
  }

  Cat.prototype.sayName = function () {
    console.log(this.name)
  }

  module.exports = Cat

})
