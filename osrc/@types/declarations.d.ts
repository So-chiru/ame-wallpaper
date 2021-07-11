import RainCanvas from '@o/canvas'
import Slide from '@o/slide'

export {}

declare global {
  interface Window {
    wallpaperPropertyListener?: {
      applyUserProperties?: (properties: any) => void
      applyGeneralProperties?: (properties: any) => void
      setPaused?: (isPaused: boolean) => void
      userDirectoryFilesAddedOrChanged?: (
        propertyName: string,
        changedFiles: unknown
      ) => void
      userDirectoryFilesRemoved?: (
        propertyName: string,
        removedFiles: unknown
      ) => void
    }

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
