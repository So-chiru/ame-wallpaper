export default class Slide {
  $p: HTMLElement
  $s: string
  $: NodeListOf<HTMLElement>

  pointer: number
  delay: number
  enable: boolean
  timeout: number | null

  /**
   * 이미지 슬라이더를 추가합니다.
   * @param elem 상위 요소
   * @param selector
   */
  constructor (elem: HTMLElement, selector: string) {
    this.$p = elem
    this.$s = selector
    this.$ = this.$p.querySelectorAll(this.$s)

    this.pointer = 0
    this.delay = 20000
    this.enable = true
    this.timeout = null
  }

  set slide (p: number) {
    this.pointer = p

    let prevNextChild = (this.$p.querySelector(
      `[data-index="${p - 1 < 0 ? this.$.length - 1 : p - 1}"]`
    ) as unknown) as HTMLElement | null

    if (!prevNextChild) {
      return
    }

    prevNextChild.dataset.current = '0'

    let currentChild = this.$p.querySelector(
      `[data-index="${this.pointer}"]`
    ) as HTMLElement | null

    if (!currentChild) {
      throw new Error('Current child is not defined.')
    }

    currentChild.dataset.current = '1'
  }

  get slide () {
    return this.pointer
  }

  start () {
    for (var i = 0; i < this.$.length; i++) {
      let e = this.$[i]

      e.dataset.index = '' + i

      if (!e.dataset.current) {
        e.dataset.current = i == 0 ? '1' : '0'
      }
    }

    this.fade()
    this.$p.classList.remove('no-display')
  }

  stop () {
    if (typeof this.timeout === 'number') {
      clearTimeout(this.timeout)
    }

    this.$p.classList.add('no-display')
  }

  fade () {
    this.slide = this.pointer

    this.timeout = setTimeout(() => {
      if (this.pointer >= this.$.length - 1) {
        this.pointer = 0
      } else {
        this.pointer++
      }

      this.fade()
    }, this.delay) as unknown as number
  }
}
