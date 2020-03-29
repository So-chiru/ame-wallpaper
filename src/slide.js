class Slide {
  constructor (elem, selector) {
    this.$p = elem
    this.$s = selector
    this.$ = this.$p.querySelectorAll(this.$s)

    this.pointer = 0
    this.delay = 20000
  }

  set slide (p) {
    this.pointer = p

    this.$p.querySelector(
      `[data-index="${p - 1 < 0 ? this.$.length - 1 : p - 1}"]`
    ).dataset.current = 0
    this.$p.querySelector(`[data-index="${this.pointer}"]`).dataset.current = 1
  }

  get slide () {
    return this.pointer
  }

  start () {
    for (var i = 0; i < this.$.length; i++) {
      let e = this.$[i]

      e.dataset.index = '' + i

      if (!e.dataset.current) {
        e.dataset.current = i == 0 ? 1 : 0
      }
    }

    this.fade()
  }

  fade () {
    this.slide = this.pointer

    setTimeout(() => {
      if (this.pointer >= this.$.length - 1) {
        this.pointer = 0
      } else {
        this.pointer++
      }

      this.fade()
    }, this.delay)
  }
}

module.exports = Slide
