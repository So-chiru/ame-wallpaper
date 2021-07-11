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
    const numberMatch = blur.match(/[0-9]+/g)
    options['background_blur'] = {
      value:
        blue === 'true'
          ? 40
          : blur !== 'false' && numberMatch && numberMatch[0] == blur
          ? Number(blur)
          : 0
    }
  }

  let logo = parseURL.get('logo')
  if (logo !== null) {
    options['use_logo'] = {
      value: logo === 'true'
    }
  }

  let pinLogo = parseURL.get('pinLogo')
  if (pinLogo !== null) {
    options['slide_logo_image'] = {
      value: Number(pinLogo)
    }
  }

  let customLogoURL = parseURL.get('customLogo')
  if (customLogoURL !== null) {
    options['custom_logo_image_url'] = {
      value: customLogoURL
    }
  }

  let customLogoScale = parseURL.get('customLogoScale')
  if (customLogoScale !== null) {
    options['custom_logo_image_scale'] = {
      value: Number(customLogoScale)
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

  let useCalendar = parseURL.get('useCalendar')
  if (useCalendar !== null) {
    options['use_calendar'] = {
      value: useCalendar === 'true'
    }
  }

  let calendarID = parseURL.get('calendarID')
  if (calendarID !== null) {
    options['notion_calendar_id'] = {
      value: calendarID
    }
  }

  let notionToken = parseURL.get('notionToken')
  if (notionToken !== null) {
    options['notion_integration_token'] = {
      value: notionToken
    }
  }

  events.emit('changeuser', options)
}

export default events
