export default class Slide {
  $p: HTMLElement
  $s: string
  $: NodeListOf<HTMLElement>

  pointer: number
  __delay: number
  use: boolean
  timeout: number | null

  pinnedImage: number
  customImageURL?: string

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
    this.__delay = 20000
    this.use = true
    this.timeout = null

    this.pinnedImage = 0
  }

  set enable (v: boolean) {
    this.use = v

    if (v) {
      this.$p.classList.remove('no-display')

      this.start()
    } else {
      this.$p.classList.add('no-display')

      this.stop()
    }
  }

  get enable () {
    return this.use
  }

  removeAllCurrent () {
    let currentChilds = this.$p.children

    Array.from(currentChilds).forEach(element => {
      ;(element as HTMLImageElement).dataset.current = '0'
    })
  }

  set slide (p: number) {
    this.pointer = p

    console.log('show slide: ' + p)

    let prevNextChild = (this.$p.querySelector(
      `[data-index="${p - 1 < 0 ? this.$.length - 2 : p - 1}"]`
    ) as unknown) as HTMLElement | null

    if (!prevNextChild) {
      return
    }

    prevNextChild.dataset.current = '0'

    let currentChild = this.$p.querySelector(
      `[data-index="${this.pointer}"]`
    ) as HTMLElement | null

    if (!currentChild) {
      return
    }

    currentChild.dataset.current = '1'
  }

  get slide () {
    return this.pointer
  }

  set customImage (imageURL: string) {
    ;(this.$p.children[2] as HTMLImageElement).src = imageURL
      ? 'file:///' + decodeURIComponent(imageURL)
      : ''

    this.customImageURL = imageURL
  }

  set pinImage (image: number) {
    this.pinnedImage = image
    this.removeAllCurrent()

    if (image === 3) {
      document.getElementById('custom_logo')!.dataset.current = '1'
    }

    requestAnimationFrame(() => {
      this.stop()
      this.start()
    })
  }

  get pinImage () {
    return this.pinnedImage
  }

  set delay (d: number) {
    this.__delay = d

    this.stop()
    this.start()
  }

  get delay () {
    return this.__delay
  }

  start () {
    for (var i = 0; i < this.$.length - 1; i++) {
      let e = this.$[i]

      e.dataset.index = '' + i

      if (!e.dataset.current) {
        e.dataset.current = i == 0 ? '1' : '0'
      }
    }

    if (!this.pinImage) {
      this.slide = 0

      if (this.delay) {
        this.fade()
      }
    } else {
      this.slide = this.pinImage - 1
    }
  }

  stop () {
    if (typeof this.timeout === 'number') {
      clearTimeout(this.timeout)
    }
  }

  fade () {
    this.slide = this.pointer

    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    if (!this.delay) {
      return
    }

    console.log('show next logo in ' + this.delay + 'ms.')

    this.timeout = (setTimeout(() => {
      if (this.pointer >= this.$.length - 2) {
        this.pointer = 0
      } else {
        this.pointer++
      }

      this.fade()
    }, Math.max(800, this.delay)) as unknown) as number
  }
}
