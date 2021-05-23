import eventBus from './utils/eventBus'

let events = new eventBus()

window.wallpaperPropertyListener = {
  applyGeneralProperties: prop => {
    events.emit('change', prop)
  },
  applyUserProperties: prop => {
    events.emit('changeuser', prop)
  }
}

export const loadURLSettings = () => {
  const parseURL = new URL(window.location.href).searchParams

  let options: WallpaperOptions = {}

  let backgroundImage = parseURL.get('background')
  if (backgroundImage) {
    options['background_image_url'] = {
      value: backgroundImage
    }
  }

  let blur = parseURL.get('blur')
  if (blur !== null) {
    options['background_blur'] = {
      value: blur === 'true'
    }
  }

  let logo = parseURL.get('logo')
  if (logo !== null) {
    options['use_logo'] = {
      value: logo === 'true'
    }
  }

  let delay = parseURL.get('slideDelay')
  if (delay !== null) {
    options['slide_delay'] = {
      value: Number(delay)
    }
  }

  let maxRain = parseURL.get('rain')
  if (maxRain !== null) {
    options['max_rain'] = {
      value: Number(maxRain)
    }
  }

  let rainSpeed = parseURL.get('rainSpeed')
  if (rainSpeed !== null) {
    options['speed_rain'] = {
      value: Number(rainSpeed)
    }
  }

  let info = parseURL.get('info')
  if (info !== null) {
    options['use_info'] = {
      value: info === 'true'
    }
  }

  let seconds = parseURL.get('seconds')
  if (seconds !== null) {
    options['use_seconds_info'] = {
      value: seconds === 'true'
    }
  }

  let infoPosition = parseURL.get('infoPosition')
  if (infoPosition !== null) {
    options['info_position'] = {
      value: infoPosition
    }
  }

  let fahrenheit = parseURL.get('fahrenheit')
  if (fahrenheit !== null) {
    options['use_fahrenheit'] = {
      value: fahrenheit === 'true'
    }
  }

  let useRipple = parseURL.get('ripple')
  if (useRipple !== null) {
    options['use_ripple_effect'] = {
      value: useRipple === 'true'
    }
  }

  let latlon = parseURL.get('latlon')
  if (latlon !== null) {
    options['use_custom_latlon'] = {
      value: latlon
    }
  }


  events.emit('changeuser', options)
}

export default events