import RainCanvas from '@o/canvas'
import Slide from '@o/slide'

export {}

declare global {
  interface WEOptionBase {
    order?: number
    text?: string
    condition?: string
    value?: boolean | string | number
  }

  interface WEColorOption extends WEOptionBase {
    type: 'color'
    value: string
  }

  interface WETextInputOption extends WEOptionBase {
    type: 'textinput'
    value: string
  }

  interface WESliderOption extends WEOptionBase {
    type: 'slider'
    value: number
    max: number
    min: number
    step?: number
    editable?: boolean
  }

  interface WECheckboxOption extends WEOptionBase {
    type: 'bool'
    value: boolean
  }

  interface WEDirectoryOption extends WEOptionBase {
    type: 'directory'
    mode: 'ondemand' | 'fetchall'
    value: string
  }

  interface WEFileOption extends WEOptionBase {
    type: 'file'
    fileType?: 'video' | 'image'
    value: string
  }

  type WEOptions =
    | WEColorOption
    | WETextInputOption
    | WESliderOption
    | WECheckboxOption
    | WEDirectoryOption
    | WEFileOption
    | WEOptionBase

  interface Window {
    wallpaperPropertyListener?: {
      /**
       * This function is triggered whenever a user changes a property that you have added to your wallpaper or when the wallpaper is first loaded.
       * The event only contains properties that have changed their value, so it's important to always check if a property is included.
       *
       * @link https://docs.wallpaperengine.io/en/web/customization/properties.html#reading-property-values
       */
      applyUserProperties?: (
        properties: { [key in AmeOptionKeys]: WEOptions }
      ) => void
      applyGeneralProperties?: (properties: any) => void
      setPaused?: (isPaused: boolean) => void

      /**
       * Unlike other properties, directory properties set to fetchall mode require you to use the `userDirectoryFilesAddedOrChanged`
       * and `userDirectoryFilesRemoved` events in the `wallpaperPropertyListener` instead of `applyUserProperties`.
       * These two event callbacks allow you to track all files that were added (or modified) and removed from the user selection.
       *
       * @link https://docs.wallpaperengine.io/en/web/customization/properties.html#directory-property
       */
      userDirectoryFilesAddedOrChanged?: (
        propertyName: string,
        changedFiles: unknown
      ) => void

      /**
       * Unlike other properties, directory properties set to fetchall mode require you to use the `userDirectoryFilesAddedOrChanged`
       * and `userDirectoryFilesRemoved` events in the `wallpaperPropertyListener` instead of `applyUserProperties`.
       * These two event callbacks allow you to track all files that were added (or modified) and removed from the user selection.
       *
       * @link https://docs.wallpaperengine.io/en/web/customization/properties.html#directory-property
       */
      userDirectoryFilesRemoved?: (
        propertyName: string,
        removedFiles: unknown
      ) => void
    }

    wallpaperRequestRandomFileForProperty?: (
      scope: 'customrandomdirectory',
      response: (propertyName: string, removedFiles: unknown) => void
    ) => void

    wallpaperRegisterAudioListener?: (h: unknown) => void

    wallCanvas: RainCanvas
    slide: Slide

    settings: {
      useRipple: boolean
      showSeconds: boolean
      useCalendar: boolean
      useTwelveHour: boolean
    }

    weatherInterval: number
    clockInterval: number
    calendarInterval: number
  }
}
