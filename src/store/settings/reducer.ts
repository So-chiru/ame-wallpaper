import { AmeOption, AmeOptionKeys, SettingsCategoryKeys } from '@/@types/option'
import { SettingsAction } from './action'

export const SettingsDefault: {
  [key in AmeOptionKeys]: AmeOption
} = {
  background_image_file: {
    shorten: 'background',
    category: SettingsCategoryKeys.Background,
    default: '',
    localization: {
      'en-us': 'Background Image',
      'ja-jp': '背景として使用するイメージファイル',
      'ko-kr': '배경 이미지'
    },
    weOptions: {
      type: 'file'
    }
  },
  background_blur: {
    shorten: 'blur',
    category: SettingsCategoryKeys.Background,
    default: 32,
    localization: {
      'en-us': 'Use Background Blur (0 to disable)',
      'ja-jp': '背景ぼかし効果を使用 (0: 無効)',
      'ko-kr': '배경 흐림 효과 사용 (0으로 비활성화)'
    },
    weOptions: {
      max: 60,
      min: 0,
      step: 1,
      type: 'slider'
    }
  },
  use_logo: {
    shorten: 'logo',
    category: SettingsCategoryKeys.Logo,
    default: true,
    localization: {
      'en-us': 'Use Logo',
      'ja-jp': 'ロゴ使用',
      'ko-kr': '로고 사용 '
    },
    weOptions: {
      fraction: true,
      type: 'bool'
    }
  },
  slide_delay: {
    shorten: 'slideDelay',
    category: SettingsCategoryKeys.Logo,
    default: 20000,
    localization: {
      'en-us': 'Logo Slide Transition Delay',
      'ja-jp': 'ロゴを変更する遅延時間',
      'ko-kr': '로고 슬라이드 전환 간격'
    },
    weOptions: {
      max: 60000,
      min: 0,
      step: 100,
      type: 'slider',
      condition: 'use_logo.value === true && slide_logo_image.value === 0'
    }
  },
  slide_logo_image: {
    shorten: 'slideImage',
    category: SettingsCategoryKeys.Logo,
    default: 0,
    localization: {
      'en-us':
        'Pin Logo Image (0: Disable, 1-2: Default Image, 3: Custom Image)',
      'ja-jp':
        'ロゴイメージ固定  (0: 無効, 1-2: 基本イメージ, 3: ユーザー設定イメージ)',
      'ko-kr':
        '로고 이미지 고정 (0: 비활성화, 1-2: 기본 이미지, 3: 지정된 이미지)'
    },
    weOptions: {
      max: 3,
      min: 0,
      step: 1,
      type: 'slider',
      condition: 'use_logo.value === true'
    }
  },
  custom_logo_image: {
    shorten: 'customLogo',
    category: SettingsCategoryKeys.Logo,
    default: '',
    localization: {
      'en-us': 'Custom Logo Image',
      'ja-jp': 'ユーザー設定のロゴイメージ',
      'ko-kr': '지정된 로고 이미지'
    },
    weOptions: {
      type: 'file',
      condition: 'use_logo.value === true && slide_logo_image.value === 3'
    }
  },
  custom_logo_image_scale: {
    shorten: 'customLogoScale',
    category: SettingsCategoryKeys.Logo,
    default: 100,
    localization: {
      'en-us': 'Custom Logo Image Scale',
      'ja-jp': 'ユーザー設定のロゴイメージの倍率',
      'ko-kr': '지정된 로고 이미지 크기 배율'
    },
    weOptions: {
      max: 200,
      min: 0,
      step: 1,
      type: 'slider',
      condition: 'use_logo.value === true && slide_logo_image.value === 3'
    }
  },
  use_ripple_effect: {
    shorten: 'ripple',
    category: SettingsCategoryKeys.Background,
    default: true,
    localization: {
      'en-us': 'Use ripple effect on click',
      'ja-jp': 'クリックする時にリップル効果を表示する',
      'ko-kr': '화면 클릭 시 물수제비 효과 사용'
    },
    weOptions: {
      type: 'bool'
    }
  },
  max_rain: {
    shorten: 'rain',
    category: SettingsCategoryKeys.Background,
    default: 450,
    localization: {
      'en-us': 'Rain particles',
      'ja-jp': '最大雨滴パーティクル数',
      'ko-kr': '빗방울 파티클 갯수'
    },
    weOptions: {
      max: 2000,
      min: 0,
      step: 1,
      type: 'slider'
    }
  },
  speed_rain: {
    shorten: 'rainSpeed',
    category: SettingsCategoryKeys.Background,
    default: 5,
    localization: {
      'en-us': 'Speed of rain',
      'ja-jp': '雨滴速度',
      'ko-kr': '비 속도'
    },
    weOptions: {
      max: 60,
      min: 0,
      step: 1,
      type: 'slider'
    }
  },
  use_music_speed_control: {
    shorten: 'rainMusicCtrl',
    category: SettingsCategoryKeys.Background,
    default: true,
    localization: {
      'en-us': 'Match rain speed to music',
      'ja-jp': '音楽に合わせて雨滴速度を調節する',
      'ko-kr': '음악에 맞춰 비 속도 조절'
    },
    weOptions: {
      type: 'bool'
    }
  },
  info_position: {
    shorten: 'infoPosition',
    category: SettingsCategoryKeys.Information,
    default: 4,
    localization: {
      'en-us': 'Information Widget Position (1-4, Top-Left to Right-Bottom)',
      'ja-jp': '情報ウィジェットの位置',
      'ko-kr': '정보 위젯 위치 (1-4, 왼쪽-위에서 오른쪽-아래까지'
    },
    weOptions: {
      max: 4,
      min: 1,
      step: 1,
      type: 'slider'
    }
  },
  use_clock: {
    shorten: 'clock',
    category: SettingsCategoryKeys.Information,
    default: false,
    localization: {
      'en-us': 'Use Clock Widget',
      'ja-jp': '時計ウィジェット使用',
      'ko-kr': '시계 위젯 사용'
    },
    weOptions: {
      type: 'bool'
    }
  },
  use_twelve_hour_clock: {
    shorten: 'halfHourClock',
    category: SettingsCategoryKeys.Information,
    default: false,
    localization: {
      'en-us': 'Use 12-hour clock',
      'ja-jp': '時計を12時間で表示',
      'ko-kr': '12시간 형식 시계 사용'
    },
    weOptions: {
      type: 'bool'
    }
  },
  use_weather: {
    shorten: 'weather',
    category: SettingsCategoryKeys.Information,
    default: false,
    localization: {
      'en-us': 'Use weather widget',
      'ja-jp': '天気ウィジェット使用 ',
      'ko-kr': '날씨 위젯 사용'
    },
    weOptions: {
      type: 'bool'
    }
  },
  weather_update_rate: {
    shorten: 'weatherUpdate',
    category: SettingsCategoryKeys.Information,
    default: 60,
    localization: {
      'en-us': 'Weather widget update rate (minutes, minimum: 30, disable: 0)',
      'ja-jp': '天気ウィジェット更新周期（分単位、少なくとも30, 0: 無効）',
      'ko-kr': '날씨 위젯 업데이트 주기 (분 단위, 최소 30, 끄려면 0)'
    },
    weOptions: {
      max: 720,
      min: 0,
      step: 30,
      type: 'slider'
    }
  },
  use_custom_latlon: {
    shorten: 'latlon',
    category: SettingsCategoryKeys.Information,
    default: '',
    localization: {
      'en-us': 'Custom Lat/Lon location (ex: 35.681235,139.767110)',
      'ja-jp': '天気情報に使う緯度/経度(ex: 35.681235,139.767110)',
      'ko-kr': '수동 위도/경도 (ex: 35.681235,139.767110)'
    },
    weOptions: {
      type: 'textinput',
      condition: 'use_info.value === true'
    }
  },
  use_seconds_info: {
    shorten: 'seconds',
    category: SettingsCategoryKeys.Information,
    default: true,
    localization: {
      'en-us': 'Display seconds in clock widget',
      'ja-jp': '時間ウィジェットに秒を表示する',
      'ko-kr': '시간 위젯에 초 표시'
    },
    weOptions: {
      condition: 'use_info.value === true',
      type: 'bool'
    }
  },
  use_fahrenheit: {
    shorten: 'fahrenheit',
    category: SettingsCategoryKeys.Information,
    default: false,
    localization: {
      'en-us': 'Use Fahrenheit (°F) instead of Celsius (°C)',
      'ja-jp': '摂氏（°C）の代わりに華氏（°F）を使用 ',
      'ko-kr': '섭씨 (°C) 대신 화씨 (°F) 사용'
    },
    weOptions: {
      type: 'bool',
      condition: 'use_info.value === true'
    }
  },
  use_calendar: {
    shorten: 'calendar',
    category: SettingsCategoryKeys.Calendar,
    default: false,
    localization: {
      'en-us': 'Use Calendar',
      'ja-jp': 'カレンダー使用',
      'ko-kr': '캘린더 사용'
    },
    weOptions: {
      type: 'bool'
    }
  },
  notion_calendar_id: {
    shorten: 'calendarId',
    category: SettingsCategoryKeys.Calendar,
    default: '',
    localization: 'Notion Calendar Database ID',
    weOptions: {
      type: 'textinput'
    }
  },
  notion_integration_token: {
    shorten: 'calendarToken',
    category: SettingsCategoryKeys.Calendar,
    default: '',
    localization: 'Notion Integration Internal Token',
    weOptions: {
      type: 'textinput'
    }
  },
  calendar_position_x: {
    shorten: 'calendarPosX',
    category: SettingsCategoryKeys.Calendar,
    default: 5,
    localization: {
      'en-us': 'Calendar Position X (from right)',
      'ja-jp': 'カレンダーX座標（右から）',
      'ko-kr': '캘린더 위치 X (오른쪽 기준)'
    },
    weOptions: {
      max: 100,
      min: 1,
      step: 1,
      type: 'slider'
    }
  },
  calendar_position_y: {
    shorten: 'calendarPosY',
    category: SettingsCategoryKeys.Calendar,
    default: 5,
    localization: {
      'en-us': 'Calendar Position Y (from top)',
      'ja-jp': 'カレンダーY座標（上から）',
      'ko-kr': '캘린더 위치 Y (위 기준)'
    },
    weOptions: {
      max: 100,
      min: 1,
      step: 1,
      type: 'slider'
    }
  },
  use_calendar_update: {
    shorten: 'calendarUpdate',
    category: SettingsCategoryKeys.Calendar,
    default: true,
    localization: {
      'en-us': 'Use calendar auto update',
      'ja-jp': 'カレンダーの自動更新を使用する',
      'ko-kr': '캘린더 자동 업데이트 사용'
    },
    weOptions: {
      type: 'bool'
    }
  },
  calendar_update_rate: {
    shorten: 'calendarUpdateRate',
    category: SettingsCategoryKeys.Calendar,
    default: 30,
    localization: {
      'en-us': 'Calendar update rate (min)',
      'ja-jp': 'カレンダーの自動更新サイクル (分)',
      'ko-kr': '캘린더 업데이트 주기 (분)'
    },
    weOptions: {
      max: 180,
      min: 5,
      step: 1,
      type: 'slider',
      condition: 'use_calendar_update.value === true'
    }
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
