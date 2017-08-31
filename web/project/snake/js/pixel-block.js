define(function (require, exports, module) {
  function PixelBlock() {
    this.width = 40
    this.height = 40
    this.position = 'absolute'
    this.top = 0
    this.left = 0
    this.$doms = []
  }

  module.exports = PixelBlock

  PixelBlock.prototype.render = function () {}

  PixelBlock.prototype.remove = function () {
    this.$doms.forEach(function ($item) {
      $item.remove()
    })
  }
})
