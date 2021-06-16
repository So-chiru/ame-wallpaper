require('./css/index.scss')
require('./images/ame-bg.jpg')
require('./images/ame-white.png')
require('./images/tuyu-white.png')

window.settings = {
  useRipple: true,
  showSeconds: true,
  useCalendar: false
}

import settings, { loadURLSettings } from './settings'
import RainCanvas from './canvas'
import * as calendarView from '@/calendar/view'
import * as calendar from '@/calendar/api'

import Slide from './slide'
import Ripple from './ripple'

import weather from './weather'

let notionToken = ''
let notionDB = ''

let useCalendarUpdate = false
let calendarUpdateRate = 30

const convertUnitsCF = (v: number) => {
  return weather.getScale() ? v * (9 / 5) + 32 : v
}

const weatherUpdate = (v: Record<string, unknown>) => {
  console.log(v)

  document.querySelector('.div').dataset.done = true
  document.querySelector('.weather').dataset.done = true

  document.querySelector('#temp').innerHTML =
    convertUnitsCF(
      v.properties.timeseries[0].data.instant.details.air_temperature
    ) +
    '°' +
    (weather.getScale() ? 'F' : 'C')
  document.querySelector('#wicon').src =
    'https://weathericons.vercel.app/' +
    v.properties.timeseries[0].data.next_1_hours.summary.symbol_code +
    '.png'

  document.querySelector('#winds').innerHTML =
    v.properties.timeseries[0].data.instant.details.wind_speed +
    v.properties.meta.units.wind_speed
  document.querySelector('#humid').innerHTML =
    v.properties.timeseries[0].data.instant.details.relative_humidity + '%'
  document.querySelector('#clouds').innerHTML =
    v.properties.timeseries[0].data.instant.details.cloud_area_fraction + '%'

  weather.setData(v)
}

const calendarUpdate = () => {
  console.log('Updating calendar...')

  calendar.requestDatabases(notionDB, notionToken).then(data => {
    calendarView.update(data)
  })
}

const setCalendarInterval = (rate: number) => {
  if (
    window.calendarInterval !== null &&
    window.calendarInterval !== undefined
  ) {
    console.log('Previous calendar update interval has been cleared.')

    clearInterval(window.calendarInterval)
  }

  window.calendarInterval = (setInterval(
    calendarUpdate,
    1000 * 60 * rate
  ) as unknown) as number

  console.log('Calendar will be updated every ' + rate + ' minutes.')
}

const setWeatherInterval = () => {
  window.weatherInterval = (setInterval(() => {
    weather.getWeather().then(weatherUpdate)
  }, 300000) as unknown) as number
}

const setClockInterval = () => {
  window.clockInterval = (setInterval(() => {
    let d = new Date()
    document.querySelector('#hour')!.innerHTML = nb(d.getHours())
    document.querySelector('#min')!.innerHTML = nb(d.getMinutes())
    document.querySelector('#sec')!.innerHTML = window.settings.showSeconds
      ? ' : ' + nb(d.getSeconds())
      : ''
  }, 500) as unknown) as number
}

const nb = s => (s < 10 ? '0' + s : s)

window.addEventListener('DOMContentLoaded', () => {
  window.wallCanvas = new RainCanvas(document.querySelector('canvas'))
  window.wallCanvas.draw()
  // canvas.stop()

  window.slide = new Slide(document.querySelector('.slide'), 'img')
  window.slide.start()

  window.addEventListener('click', ev => {
    if (window.settings.useRipple) {
      new Ripple(ev)
    }
  })

  setWeatherInterval()
  setClockInterval()

  if (window.wallpaperRegisterAudioListener) {
    window.wallpaperRegisterAudioListener(h => {
      window.wallCanvas.music(h)
    })
  }

  loadURLSettings()
})

window.addEventListener('load', () => {
  document.querySelector('loader').dataset.done = true
  document.querySelector('done').dataset.done = true
})

settings.on('change', prop => {
  console.log(prop)
})

settings.on('changeuser', (prop: WallpaperOptions) => {
  if (prop.background_image_url) {
    document.getElementById('background').src =
      prop.background_image_url.value || './ame-bg.jpg'
  }

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

  if (prop.use_logo) {
    window.slide[prop.use_logo.value ? 'start' : 'stop']()
    window.wallCanvas.useLogo = prop.use_logo.value
  }

  if (prop.slide_delay) {
    window.slide.delay = prop.slide_delay.value
  }

  if (prop.max_rain) {
    window.wallCanvas.max = prop.max_rain.value
  }

  if (prop.speed_rain) {
    window.wallCanvas.speed = prop.speed_rain.value
  }

  if (prop.use_music_speed_control) {
    window.wallCanvas.matchToMusic = prop.use_music_speed_control.value
  }

  if (prop.use_info) {
    document.querySelector('.info').dataset.show = prop.use_info.value

    if (!prop.use_info.value) {
      clearInterval(window.weatherInterval)
      clearInterval(window.clockInterval)
    } else {
      setWeatherInterval()
      setClockInterval()
    }
  }

  if (prop.use_seconds_info) {
    window.settings.showSeconds = prop.use_seconds_info.value
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
    window.settings.useRipple = prop.use_ripple_effect.value
  }

  if (prop.info_position) {
    document.querySelector('.info').dataset.pos = prop.info_position.value
  }

  if (prop.calendar_position_x) {
    document
      .querySelector('.calendar')
      .style.setProperty('--posX', prop.calendar_position_x.value + '%')
  }

  if (prop.calendar_position_y) {
    document
      .querySelector('.calendar')
      .style.setProperty('--posY', prop.calendar_position_y.value + '%')
  }

  if (prop.notion_integration_token) {
    notionToken = prop.notion_integration_token.value
  }

  if (prop.notion_calendar_id) {
    notionDB = prop.notion_calendar_id.value
  }

  if (prop.use_calendar) {
    document.querySelector('.calendar').dataset.show = prop.use_calendar.value
    window.settings.useCalendar = prop.use_calendar.value

    if (window.settings.useCalendar && notionDB && notionToken) {
      calendarUpdate()
    }
  }

  if (prop.use_calendar_update) {
    useCalendarUpdate = prop.use_calendar_update.value

    clearInterval(window.calendarInterval)

    if (useCalendarUpdate) {
      setCalendarInterval(calendarUpdateRate)
    }
  }

  if (prop.calendar_update_rate) {
    calendarUpdateRate = prop.calendar_update_rate.value || 30

    clearInterval(window.calendarInterval)

    if (useCalendarUpdate) {
      setCalendarInterval(calendarUpdateRate)
    }
  }
})
