const variance = (...nums: number[]) => {
  const sqavr = nums.reduce((p, c) => p + c ** 2, 0) / nums.length
  const avrsq = (nums.reduce((p, c) => p + c, 0) / nums.length) ** 2

  return sqavr - avrsq
}

const getPeak = (...nums: number[]) => {
  return nums.reduce((p, c) => Math.max(p, c))
}

const lognize = (num: number) => {
  return num <= 0.05 ? 0 : Math.log(num - 0.05) * 0.1 + 1
}

export class SoundWave {
  private FFT: number[]
  private MonoFFT: number[]

  // private FFTHistory: number[][]
  private MonoFFTHistory: number[][]

  constructor () {
    this.FFT = []
    this.MonoFFT = []

    // this.FFTHistory = []
    this.MonoFFTHistory = []
  }

  destroy () {
    this.FFT = []
    this.MonoFFT = []
  }

  get wave () {
    return this.FFT
  }

  get monoWave () {
    return this.MonoFFT
  }

  private getMono (FFT: number[]) {
    const left = FFT.slice(0, FFT.length / 2)
    const right = FFT.slice(FFT.length / 2, FFT.length)

    return left.map((v, i) => (v + right[i]) / 2)
  }

  set wave (FFT: number[]) {
    this.FFT = FFT
    this.MonoFFT = this.getMono(this.FFT)

    // this.FFTHistory.unshift(this.FFT)
    this.MonoFFTHistory.unshift(this.MonoFFT)

    // if (this.FFTHistory.length > 10) {
    //   this.FFTHistory.pop()
    // }

    if (this.MonoFFTHistory.length > 7) {
      this.MonoFFTHistory.pop()
    }
  }

  private getKick (...nums: number[]) {
    return nums.slice(1, 4)
  }

  private getKickHistory () {
    return this.MonoFFTHistory.map(v => this.getKick(...v))
  }

  private getSnare (...nums: number[]) {
    return nums.slice(5, 9)
  }

  private getSnareHistory () {
    return this.MonoFFTHistory.map(v => this.getSnare(...v))
  }

  kick () {
    if (!this.FFT.length) {
      return 0
    }

    const kick = this.getKick(...this.FFT)

    const peak = getPeak(...kick)
    // const avr = kick.reduce((p, c) => p + c, 0) / kick.length

    return peak
  }

  snare () {
    if (!this.FFT.length) {
      return 0
    }

    const snare = this.getSnare(...this.FFT)

    const peak = getPeak(...snare)
    // const avr = snare.reduce((p, c) => p + c, 0) / snare.length

    return peak
  }

  tkick () {
    if (!this.FFT.length) {
      return 0
    }

    const history = this.getKickHistory()

    const avr = history.map((v, i) => v.reduce((p, c) => p + c, 0) / history[i].length)

    const threshold = Math.max(
      0.08,
      variance(...avr)
    )

    return lognize(Math.max(0, this.kick() - (avr.reduce((p, c) => p + c, 0) / avr.length) - threshold))
  }

  tsnare () {
    if (!this.FFT.length) {
      return 0
    }

    const history = this.getSnareHistory()

    const avr = history.map((v, i) => v.reduce((p, c) => p + c, 0) / history[i].length)

    const threshold = Math.max(
      0.08,
      variance(...avr)
    )

    return lognize(Math.max(0, this.snare() - (avr.reduce((p, c) => p + c, 0) / avr.length) - threshold))
  }
}
