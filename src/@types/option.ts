export type AmeLanguages = 'ko-kr' | 'en-us' | 'ja-jp'

export const SettingsCategory = {
  Background: 'Background',
  Particles: 'Particles',
  Logo: 'Logo',
  Information: 'Clock & Weather Widget',
  Calendar: 'Calendar Widget',
  General: 'General'
}

export const SettingsLanguages = ['en-us', 'ja-jp', 'ko-kr']

export const SettingsCategoryKeys: {
  [key in keyof typeof SettingsCategory]: keyof typeof SettingsCategory
} = {
  Background: 'Background',
  Particles: 'Particles',
  Logo: 'Logo',
  Information: 'Information',
  Calendar: 'Calendar',
  General: 'General'
}

export const SettingsCategoryOrder: {
  [key in keyof typeof SettingsCategory]: number
} = {
  General: 1,
  Background: 2,
  Logo: 3,
  Particles: 4,
  Information: 5,
  Calendar: 6
}

export type AmeOptionKeys =
  | 'background_image_file'
  | 'background_blur'
  | 'use_logo'
  | 'slide_delay'
  | 'slide_logo_image'
  | 'custom_logo_image'
  | 'custom_logo_image_scale'
  | 'use_ripple_effect'
  | 'max_rain'
  | 'speed_rain'
  | 'use_music_speed_control'
  | 'beat_strategy'
  | 'use_debug_wave'
  | 'info_position'
  | 'use_clock'
  | 'clock_style'
  | 'use_weather'
  | 'weather_update_rate'
  | 'use_twelve_hour_clock'
  | 'use_seconds_info'
  | 'use_fahrenheit'
  | 'use_custom_latlon'
  | 'use_calendar'
  | 'notion_calendar_id'
  | 'notion_integration_token'
  | 'calendar_position_x'
  | 'calendar_position_y'
  | 'use_calendar_update'
  | 'calendar_update_rate'

export type AmeOption =
  | AmeOptionBoolean
  | AmeOptionString
  | AmeOptionNumber
  | AmeOptionBase

export interface AmeOptionBase {
  shorten: string
  category: keyof typeof SettingsCategory
  localization?:
    | {
        [key in AmeLanguages]: string
      }
    | string
  description?:
    | {
        [key in AmeLanguages]: string
      }
    | string
  default?: boolean | string | number
  value?: boolean | string | number
  weOptions?: { [index: string]: any }
}

export interface AmeOptionBoolean extends AmeOptionBase {
  default: boolean
  value?: boolean
}

export interface AmeOptionString extends AmeOptionBase {
  default: string | undefined
  value?: string
}

export interface AmeOptionNumber extends AmeOptionBase {
  default: number | undefined
  value?: number
  max?: number
  min?: number
}
