import RainCanvas from '@/canvas'
import Slide from '@/slide'

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
    }

    weatherInterval: number
    clockInterval: number
  }
}
