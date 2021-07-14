declare type AmeLanguages = 'ko-kr' | 'en-us' | 'ja-jp'
declare type AmeOptionKeys =
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
  | 'info_position'
  | 'use_info'
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

declare type AmeOption =
  | AmeOptionBoolean
  | AmeOptionString
  | AmeOptionNumber
  | AmeOptionBase

declare interface AmeOptionBase {
  shorten: string
  category: string
  description?:
    | {
        [key in AmeLanguages]: string
      }
    | string
  default?: boolean | string | number
  value?: boolean | string | number
}

declare interface AmeOptionBoolean extends AmeOptionBase {
  default: boolean
  type: 'bool'
  value?: boolean
}

declare interface AmeOptionString extends AmeOptionBase {
  default: string | undefined
  type: 'string'
  value?: string
}

declare interface AmeOptionNumber extends AmeOptionBase {
  default: number | undefined
  type: 'number'
  value?: number
}
