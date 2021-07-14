import { SettingsAction } from './action'

const SettingsCategory = {
  Background: 'Background',
  Particles: 'Particles',
  Logo: 'Logo',
  Information: 'Clock & Weather Widget',
  Calendar: 'Calendar Widget'
}

const SettingsDefault: {
  [key in AmeOptionKeys]: AmeOption
} = {
  background_image_file: {
    shorten: 'background',
    category: SettingsCategory.Background,
    default: ''
  },
  background_blur: {
    shorten: 'blur',
    category: SettingsCategory.Background,
    default: 32
  },
  use_logo: {
    shorten: 'logo',
    category: SettingsCategory.Background,
    default: true
  },
  slide_delay: {
    shorten: 'slideDelay',
    category: SettingsCategory.Logo,
    default: 20000
  },
  slide_logo_image: {
    shorten: 'slideImage',
    category: SettingsCategory.Logo,
    default: 0
  },
  custom_logo_image: {
    shorten: 'customLogo',
    category: SettingsCategory.Logo,
    default: ''
  },
  custom_logo_image_scale: {
    shorten: 'customLogoScale',
    category: SettingsCategory.Logo,
    default: 100
  },
  use_ripple_effect: {
    shorten: 'ripple',
    category: SettingsCategory.Background,
    default: true
  },
  max_rain: {
    shorten: 'rain',
    category: SettingsCategory.Background,
    default: 450
  },
  speed_rain: {
    shorten: 'rainSpeed',
    category: SettingsCategory.Background,
    default: 5
  },
  use_music_speed_control: {
    shorten: 'rainMusicCtrl',
    category: SettingsCategory.Background,
    default: true
  },
  info_position: {
    shorten: 'infoPosition',
    category: SettingsCategory.Information,
    default: ''
  },
  use_info: {
    shorten: 'info',
    category: SettingsCategory.Information,
    default: false
  },
  use_twelve_hour_clock: {
    shorten: 'halfHourClock',
    category: SettingsCategory.Information,
    default: false
  },
  use_seconds_info: {
    shorten: 'seconds',
    category: SettingsCategory.Information,
    default: true
  },
  use_fahrenheit: {
    shorten: 'fahrenheit',
    category: SettingsCategory.Information,
    default: false
  },
  use_custom_latlon: {
    shorten: 'latlon',
    category: SettingsCategory.Information,
    default: ''
  },
  use_calendar: {
    shorten: 'calendar',
    category: SettingsCategory.Calendar,
    default: false
  },
  notion_calendar_id: {
    shorten: 'calendarId',
    category: SettingsCategory.Calendar,
    default: ''
  },
  notion_integration_token: {
    shorten: 'calendarToken',
    category: SettingsCategory.Calendar,
    default: ''
  },
  calendar_position_x: {
    shorten: 'calendarPosX',
    category: SettingsCategory.Calendar,
    default: 5
  },
  calendar_position_y: {
    shorten: 'calendarPosY',
    category: SettingsCategory.Calendar,
    default: 5
  },
  use_calendar_update: {
    shorten: 'calendarUpdate',
    category: SettingsCategory.Calendar,
    default: true
  },
  calendar_update_rate: {
    shorten: 'calendarUpdateRate',
    category: SettingsCategory.Calendar,
    default: 30
  }
}
;(Object.keys(SettingsDefault) as AmeOptionKeys[]).forEach(key => {
  SettingsDefault[key] = {
    ...SettingsDefault[key],
    value: SettingsDefault[key].default
  }
})

const ameSettingsUpdate = (state = SettingsDefault, action: SettingsAction) => {
  if (!action) {
    throw new Error('Action value is falsy.')
  }

  const data: { [key in AmeOptionKeys]?: AmeOption } = {}

  if (action.object) {
    for (let i = 0; i < action.object.length; i++) {
      let object = action.object[i]

      data[object.key] = {
        ...state[object.key],
        value: object.data
      }
    }
  } else if (action.data) {
    data[action.key!] = action.data as AmeOption
  }

  if (!Object.keys(data).length) {
    return state
  }

  return {
    ...state,
    ...data
  }
}

const SettingsReducer = (
  state = SettingsDefault,
  action: SettingsAction
): typeof SettingsDefault => {
  switch (action.type) {
    case '@ame/settings/update':
      return ameSettingsUpdate(state, action)
    default:
      return state
  }
}

export default SettingsReducer
