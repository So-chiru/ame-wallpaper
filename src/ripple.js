class Ripple {
  constructor (ev) {
    this.$ = document.createElement('ripple')

    this.$.style.left = ev.screenX - 50 + 'px'
    this.$.style.top = ev.screenY - 50 + 'px'

    document.querySelector('body').appendChild(this.$)

    setTimeout(() => {
      this.destroy()
    }, 1000)
  }

  destroy () {
    document.querySelector('body').removeChild(this.$)
  }
}

module.exports = Ripple
