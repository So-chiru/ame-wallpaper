class Rain {
  x: number
  y: number
  w: number
  h: number

  o: number
  ac: number

  s?: number

  abs?: boolean
  logoh?: boolean

  constructor (w: number, size: number, width: number) {
    this.x = Math.random() * w
    this.y = Math.random() * 100
    this.w = Math.min(5, Math.round(Math.random() * 2) * (width || 1))
    this.h = size

    this.o = 0
    this.ac = Date.now()
  }
}

export default class RainCanvas {
  $: HTMLCanvasElement
  $ctx: CanvasRenderingContext2D | null

  rains: Rain[]
  sounds: number[]

  repeatFrame?: number

  speed: number
  matchToMusic: boolean
  max: number
  div: number

  useLogo: boolean

  constructor (elem: HTMLCanvasElement) {
    if (!elem) {
      throw new Error('element is not defined.')
    }

    this.$ = elem
    this.$ctx = elem.getContext('2d')

    this.$.width = document.body.offsetWidth
    this.$.height = document.body.offsetHeight

    this.rains = []
    this.sounds = []

    this.matchToMusic = false
    this.speed = 3
    this.max = 600
    this.div = 1

    this.useLogo = true
  }

  createRain (bass: number) {
    return this.rains.push(
      new Rain(this.$.width, Math.max(40 * Math.random(), 5), bass)
    )
  }

  setMusicData (arr: number[]) {
    this.sounds = arr
  }

  resize () {
    this.$.width = document.body.offsetWidth
    this.$.height = document.body.offsetHeight
  }

  bass () {
    return this.matchToMusic
      ? this.sounds[2] * 3 + // Kick
        this.sounds[3] * 4 +
        this.sounds[4] * 3 +
        this.sounds[8] * 3 + // Snare
          this.sounds[9] * 4 +
          this.sounds[10] * 3
      : 0
  }

  draw () {
    if (!this.$ctx) {
      return
    }

    this.$ctx.clearRect(0, 0, this.$.width, this.$.height)

    for (let i = 0; i < this.rains.length; i++) {
      const rain = this.rains[i]

      rain.y += this.speed

      if (this.matchToMusic) {
        if (!rain.s) {
          rain.s = this.bass()
        }

        rain.y += this.speed * rain.s
      }

      if (rain.ac + 3000 < Date.now() && !rain.abs) {
        rain.abs = Math.random() > 0.98
      }

      if (
        this.useLogo &&
        rain.x > this.$.width / 2 - 70 &&
        rain.x < this.$.width / 2 + 70 &&
        rain.y > this.$.height / 2 - 200
      ) {
        rain.logoh = true
      }

      if ((rain.ac + 3000 < Date.now() && rain.abs) || rain.logoh) {
        rain.h++
        rain.o = Math.min(1, rain.o - 0.05)
      } else {
        rain.o = Math.min(1, rain.o + 0.05)
      }

      this.$ctx.fillStyle = 'rgba(149, 167, 189, ' + rain.o + ')'
      this.$ctx.fillRect(rain.x, rain.y, rain.w, rain.h)

      if (rain.y > document.body.offsetHeight || rain.o < 0) {
        this.rains.splice(i, 1)
        i--

        if (this.rains.length < this.max / this.div) {
          this.createRain(Math.max(0.4, this.bass()))
        }

        continue
      }
    }

    // for (var i = 0; i < this.sounds.length; i++) {
    //   this.$ctx.fillStyle = 'rgba(149, 167, 189, 1)'
    //   this.$ctx.fillRect(500 + i * 6, 500, 6, this.sounds[i] * 128)
    // }

    if (this.rains.length < this.max / this.div) {
      this.createRain(Math.max(0.4, this.bass()))
    }

    this.repeatFrame = requestAnimationFrame(() => {
      this.draw()
    })
  }

  repeat () {
    this.repeatFrame = requestAnimationFrame(() => {
      this.draw()
    })
  }

  stop () {
    if (this.repeatFrame) {
      cancelAnimationFrame(this.repeatFrame)
    }
  }
}
