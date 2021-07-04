import { settingsURLize } from '@g/utils/url'
import React, { useMemo } from 'react'
import FullScreenButtonContainer from './FullScreenButton'

interface PreviewComponentProps {
  fullScreen: boolean
  setFullScreen: (data: boolean) => void
  wallpaperOptions: WallpaperURLOption[]
  cooldown: number
}

export const PreviewComponent = ({
  fullScreen,
  setFullScreen,
  wallpaperOptions,
  cooldown
}: PreviewComponentProps) => {
  return useMemo(
    () => (
      <div
        className={['preview-zone', fullScreen && 'full-screen']
          .filter(v => typeof v === 'string')
          .join(' ')}
      >
        <iframe
          src={'./index.html' + settingsURLize(wallpaperOptions)}
          title='Preview'
        ></iframe>
        <FullScreenButtonContainer
          active={fullScreen}
          onClick={() => setFullScreen(!fullScreen)}
        ></FullScreenButtonContainer>
      </div>
    ),
    [fullScreen, cooldown]
  )
}

interface PreviewContainerProps {
  fullScreen: boolean
  setFullScreen: (data: boolean) => void
  wallpaperOptions: WallpaperURLOption[]
  cooldown: number
}

const PreviewContainer = ({
  fullScreen,
  setFullScreen,
  wallpaperOptions,
  cooldown
}: PreviewContainerProps) => {
  return (
    <PreviewComponent
      fullScreen={fullScreen}
      setFullScreen={setFullScreen}
      wallpaperOptions={wallpaperOptions}
      cooldown={cooldown}
    ></PreviewComponent>
  )
}

export default PreviewContainer
