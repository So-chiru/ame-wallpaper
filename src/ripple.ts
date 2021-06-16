export default class Ripple {
  $: HTMLElement

  constructor(ev: MouseEvent) {
    this.$ = document.createElement('ripple')

    this.$.style.left = ev.clientX - 50 + 'px'
    this.$.style.top = ev.clientY - 50 + 'px'

    document.querySelector('body')!.appendChild(this.$)

    setTimeout(() => {
      this.destroy()
    }, 1000)
  }

  destroy () {
    document.querySelector('body')!.removeChild(this.$)
  }
}
