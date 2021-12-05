import { SoundWave } from "./sound"

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

  private _raf?: number

  rain?: RainObject[]

  private __max: number
  private __speed: number
  private __animation: boolean

  private soundWave?: SoundWave

  beatStrategy: number
  debugWave: boolean

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
    this.__animation = false

    this.beatStrategy = 0
    this.debugWave = false

    this.resize()
    this.update(true)
  }

  get startable() {
    return this.max !== 0 && this.speed !== 0
  }

  get max () {
    return this.__max
  }

  get speed () {
    return this.__speed
  }

  set max(n: number) {
    this.__max = n

    if (n === 0) {
      this.stop()

      return
    } else if (this._raf === undefined && this.speed !== 0) {
      this.start()
    }

    if (this.rain && this.rain.length > n) {
      this.rain.splice(0, n - this.rain.length)
    }
  }

  set speed (n: number) {
    this.rain = []
    this.clear()

    this.__speed = n

    if (n === 0) {
      this.stop()
      return
    } else if (this._raf === undefined && this.max !== 0) {
      this.start()
    }

    this.update(true)

    for (let i = 0; i < this.rain.length; i++) {
      if (this.rain[i].speed < n) {
        this.rain[i].speed = Math.max(
          n / 3,
          Math.max(n / 10, this.rain[i].z * n) + (n / 10) * Math.random()
        )
      }
    }
  }

  get animation() {
    return this.__animation
  }

  set animation(animate: boolean) {
    this.registerAnimation()

    if (animate) {
      this.soundWave = new SoundWave()
    } else {
      this.soundWave?.destroy()
      this.soundWave = undefined
    }

    this.__animation = animate
  }

  resize () {
    this.$ctx.canvas.width = document.body.offsetWidth
    this.$ctx.canvas.height = document.body.offsetHeight
  }

  registerAnimation() {
    if (window.wallpaperRegisterAudioListener) {
      window.wallpaperRegisterAudioListener((FFT: number[]) => {
        if (!this.soundWave) {
          return
        }

        this.soundWave.wave = FFT
      })
    }
  }

  update(init?: boolean) {
    if (!this.rain) {
      return
    }

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

        let weightBias = 0
        let speedBias = 0

        if (this.animation && this.soundWave) {
          weightBias = this.soundWave.kick() * 8
          speedBias = this.soundWave.snare() * this.speed * 5
        } 

        this.rain.push({
          speed: speed + speedBias,
          seed,
          alpha: Math.max(0.1, calcuateAlpha(depth) / 2),
          w: Math.max(1, Math.random() * 3) + weightBias,
          z: depth,
          x: randomX,
          y: randomY,
          h: height
        })
      }
    }

    let speedAlt = 0

    if (this.rain.length && this.animation && this.soundWave) {
      if (this.beatStrategy == 1) {
        speedAlt = this.soundWave.tkick()
      } else if (
        this.beatStrategy == 2
      ) {
        speedAlt = this.soundWave.tsnare()
      } else if (
        this.beatStrategy == 3
      ) {
        speedAlt = [this.soundWave.tkick(), this.soundWave.tsnare()].reduce((p, c) => Math.max(p, c))
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
      

      rain.y += rain.speed + (rain.speed * speedAlt * 1.5)
    }
  }

  clear () {
    this.$ctx.clearRect(0, 0, this.$.width, this.$.height)
  }

  draw () {
    this.clear()

    if (!this.rain) {
      return
    }

    /**
     * Just for debugging.
     */

    if (this.debugWave && this.animation && this.soundWave) {
      for (let i = 0; i < this.soundWave.wave.length; i++) {
        const fft = this.soundWave.wave[i]

        this.$ctx.strokeStyle = i < this.soundWave.wave.length / 2 ? `rgba(255,130,0,1)` : `rgba(0,130,255,1)`
        this.$ctx.lineWidth = 5
  
        this.$ctx.beginPath()
        this.$ctx.moveTo(400 + i * 5, 500)
  
        this.$ctx.lineTo(400 + i * 5, 500 - (fft * 100))
  
        this.$ctx.stroke()
      }

      /**
       * Mono
       */

      const mono = this.soundWave.monoWave
      for (let i = 0; i < mono.length; i++) {
        const fft = mono[i]

        this.$ctx.strokeStyle = `rgba(255,255, 255,1)`
        this.$ctx.lineWidth = 5
  
        this.$ctx.beginPath()
        this.$ctx.moveTo(400 + i * 5, 650)
        this.$ctx.lineTo(400 + i * 5, 650 - (fft * 100))
        this.$ctx.stroke()
      }

      this.$ctx.fillStyle = `rgba(255,255,255,0.3)`
      this.$ctx.fillText('Mono', 398, 670)

      const drawVisual = (x: number, y: number, text: string, num: number) => {
        this.$ctx.strokeStyle = `rgba(255,255, 255,1)`
        this.$ctx.lineWidth = 5
    
        this.$ctx.beginPath()
        this.$ctx.moveTo(x, y)
        this.$ctx.lineTo(x, y - (num * 100))
        this.$ctx.stroke()
  
        this.$ctx.fillStyle = `rgba(255,255, 255, ${Math.max(0.3, num)})`
        this.$ctx.fillText(`${text} ${num.toFixed(3)}`, x - 2, y + 10)
      }


      /**
       * Bass
       */

      const kick = this.soundWave.kick()
      drawVisual(400, 800, 'Kick', kick)

      const snare = this.soundWave.snare()
      drawVisual(480, 800, 'Snare', snare)

      const tkick = this.soundWave.tkick()
      drawVisual(560, 800, 'T-Kick', tkick)

      const tsnare = this.soundWave.tsnare()
      drawVisual(640, 800, 'T-Snare', tsnare)
    }

    

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

  render() {
    this.update()
    this.draw()
  }

  start() {
    if (!this.startable) {
      return
    }

    if (this._raf) {
      this.stop()
    }

    this._raf = requestAnimationFrame(() => {
      this.render()
      this.start()

      this._raf = undefined
    })
  }

  stop () {
    if (this._raf) {
      cancelAnimationFrame(this._raf)
    }

    this._raf = undefined
  }

  destroy() {
    this.stop()
    this.rain = undefined
  }
}
