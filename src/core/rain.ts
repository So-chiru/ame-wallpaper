interface RainObject {
  speed: number
  alpha: number
  seed: number
  z: number
  x: number
  y: number
  w: number
  h: number
}

const calcuateAlpha = (z: number) => {
  return Math.sin(z * 1.5)
}

const generateDepth = () => {
  const r = Math.random()

  return r * r * r * r
}

export default class Rain {
  $: HTMLCanvasElement
  $ctx: CanvasRenderingContext2D

  _raf?: number

  rain: RainObject[]

  __max: number
  __speed: number

  constructor (canvas: HTMLCanvasElement) {
    this.$ = canvas

    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error("This browser doesn't support Canvas Context.")
    }

    this.$ctx = context
    this.rain = []
    this.__max = 600
    this.__speed = 3

    this.resize()
    this.update(true)
  }

  get max () {
    return this.__max
  }

  get speed () {
    return this.__speed
  }

  set max (n: number) {
    if (this.rain.length > n) {
      this.rain.splice(0, n - this.rain.length)
    }

    this.__max = n
  }

  set speed (n: number) {
    this.rain = []
    this.clear()
    this.update(true)

    for (let i = 0; i < this.rain.length; i++) {
      if (this.rain[i].speed < n) {
        this.rain[i].speed = Math.max(
          n / 3,
          Math.max(n / 10, this.rain[i].z * n) + (n / 10) * Math.random()
        )
      }
    }

    this.__speed = n
  }

  resize () {
    this.$ctx.canvas.width = document.body.offsetWidth
    this.$ctx.canvas.height = document.body.offsetHeight
  }

  update (init?: boolean) {
    if (this.rain.length < this.max) {
      for (let i = this.max - this.rain.length; i > 0; i--) {
        const depth = generateDepth()
        const seed = Math.random()

        const randomX = Math.random() * this.$.width

        const height = 10 + Math.random() * 20 + depth * 40

        let randomY =
          Math.random() * (this.$.height / 3) - this.$.height / 3 - height

        if (init) {
          randomY = Math.random() * this.$.height
        } else {
          randomY =
            Math.random() * (this.$.height / 3) - this.$.height / 3 - height
        }

        const speed = Math.max(
          this.speed / 3,
          Math.max(this.speed / 10, depth * this.speed) +
            (this.speed / 10) * Math.random()
        )

        this.rain.push({
          speed,
          seed,
          alpha: Math.max(0.1, calcuateAlpha(depth) / 2),
          w: Math.max(1, Math.random() * 3),
          z: depth,
          x: randomX,
          y: randomY,
          h: height
        })
      }
    }

    for (let i = 0; i < this.rain.length; i++) {
      const rain = this.rain[i]

      if (rain.x > this.$.width || rain.y > this.$.height) {
        this.rain.splice(i, 1)
        i--
        continue
      }

      if (rain.seed > 0.5) {
        rain.x += 0.01
      } else {
        rain.x -= 0.01
      }

      rain.y += rain.speed
    }
  }

  clear () {
    this.$ctx.clearRect(0, 0, this.$.width, this.$.height)
  }

  draw () {
    this.clear()

    for (let i = 0; i < this.rain.length; i++) {
      let rain = this.rain[i]

      let alpha = rain.alpha

      if (rain.z > 0.8) {
        alpha = 0.1
      }

      this.$ctx.strokeStyle = `rgba(255,255,255,${alpha})`
      this.$ctx.lineWidth = rain.w || 2

      this.$ctx.beginPath()
      this.$ctx.moveTo(rain.x, rain.y)

      this.$ctx.lineTo(rain.x, rain.y + rain.h)

      this.$ctx.stroke()
    }
  }

  render () {
    this.update()
    this.draw()
  }

  start () {
    this._raf = requestAnimationFrame(() => {
      this.render()
      this.start()
    })
  }

  stop () {
    if (this._raf) {
      cancelAnimationFrame(this._raf)
    }
  }

  destroy () {}
}
