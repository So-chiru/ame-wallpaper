require('./css/index.scss')
require('./images/ame-bg.jpg')
require('./images/ame-white.png')
require('./images/tuyu-white.png')

const settings = require('./settings')

const RainCanvas = require('./canvas')
const Slide = require('./slide')
const Ripple = require('./ripple')

let weather = require('./weather')

const weatherUpdate = v => {
  console.log(v)

  document.querySelector('.div').dataset.done = true
  document.querySelector('.weather').dataset.done = true

  document.querySelector('#temp').innerHTML =
    v.properties.timeseries[0].data.instant.details.air_temperature +
    '°' +
    (v.properties.meta.units.air_temperature == 'celsius' ? 'C' : 'F')
  document.querySelector('#wicon').src =
    'https://weathericons.now.sh/' +
    v.properties.timeseries[0].data.next_1_hours.summary.symbol_code +
    '.png'

  document.querySelector('#winds').innerHTML = v.properties.timeseries[0].data.instant.details.wind_speed + v.properties.meta.units.wind_speed
  document.querySelector('#humid').innerHTML = v.properties.timeseries[0].data.instant.details.relative_humidity + '%'
  document.querySelector('#clouds').innerHTML = v.properties.timeseries[0].data.instant.details.cloud_area_fraction + '%'

  weather.setData(v)
}

const setWeatherInterval = () => {
  window.weatherInterval = setInterval(() => {
    weather.getWeather().then(weatherUpdate)
  }, 300000)
}

const setTimeInterval = () => {
  window.timeInterval = setInterval(() => {
    let d = new Date()
    document.querySelector('#hour').innerHTML = nb(d.getHours())
    document.querySelector('#min').innerHTML = nb(d.getMinutes())
    document.querySelector('#sec').innerHTML = window.showSeconds
      ? ' : ' + nb(d.getSeconds())
      : ''
  }, 500)
}

const nb = s => (s < 10 ? '0' + s : s)

window.addEventListener('DOMContentLoaded', () => {
  window.wallcanvas = new RainCanvas(document.querySelector('canvas'))
  window.wallcanvas.draw()
  // canvas.stop()

  window.slide = new Slide(document.querySelector('.slide'), 'img')
  window.slide.start()

  window.addEventListener('click', ev => {
    if (window.useRipple) {
      new Ripple(ev)
    }
  })

  setWeatherInterval()
  setTimeInterval()

  window.wallpaperRegisterAudioListener(h => {
    window.wallcanvas.music(h)
  })
})

window.addEventListener('load', () => {
  document.querySelector('loader').dataset.done = true
  document.querySelector('done').dataset.done = true
})

settings.events.on('change', prop => {
  console.log(prop)
})

settings.events.on('changeuser', prop => {
  if (prop.background_image_file) {
    let file = prop.background_image_file.value
    document.getElementById('background').src = file.length
      ? 'file:///' + file
      : './ame-bg.jpg'
  }

  if (prop.background_blur) {
    document.querySelector('tuyu-bg-before').dataset.blur =
      prop.background_blur.value
  }

  if (prop.slide_delay) {
    window.slide.delay = prop.slide_delay.value
  }

  if (prop.max_rain) {
    window.wallcanvas.max = prop.max_rain.value
  }

  if (prop.speed_rain) {
    window.wallcanvas.speed = prop.speed_rain.value
  }

  if (prop.use_music_speed_control) {
    window.wallcanvas.musicctrl = prop.use_music_speed_control.value
  }

  if (prop.use_info) {
    document.querySelector('.info').dataset.show = prop.use_info.value

    if (!prop.use_info.value) {
      clearInterval(window.weatherInterval)
      clearInterval(window.timeInterval)
    } else {
      setWeatherInterval()
      setTimeInterval()
    }
  }

  if (prop.use_seconds_info) {
    window.showSeconds = prop.use_seconds_info.value
  }

  if (prop.use_fahrenheit) {
    document.querySelector('.div').dataset.done = false
    document.querySelector('.weather').dataset.done = false
    weather.setScale(prop.use_fahrenheit.value)

    weather.getWeather().then(weatherUpdate)
  }

  if (prop.use_custom_latlon) {
    let v = prop.use_custom_latlon.value
    document.querySelector('.div').dataset.done = false
    document.querySelector('.weather').dataset.done = false

    weather.setCoord(
      v && v.trim().length && v.indexOf(',') !== -1
        ? prop.use_custom_latlon.value.split(',').map(v => parseFloat(v))
        : []
    )
    weather.getWeather().then(weatherUpdate)
  }

  if (prop.use_ripple_effect) {
    window.useRipple = prop.use_ripple_effect.value
  }

  if (prop.info_position) {
    document.querySelector('.info').dataset.pos = prop.info_position.value
  }
})
