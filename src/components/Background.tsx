import { RootState } from '@/store'
import React from 'react'

import { useSelector } from 'react-redux'

import '@/styles/background'
import { AmeOptionString } from '@/@types/option'

interface BackgroundComponentProps {
  image?: string
  blur?: number
}

export const BackgroundComponent = ({
  image,
  blur
}: BackgroundComponentProps) => {
  return (
    <div className='ame-background'>
      <img
        className='ame-background-image'
        src={`${image}`}
        data-blur={blur ? blur : undefined}
        style={{
          ['--blur' as string]: blur ? blur + 'px' : undefined
        }}
      ></img>
      <div className='ame-background-layer'></div>
    </div>
  )
}

export const BackgroundContainer = () => {
  const wallpaperMode = useSelector((state: RootState) => state.env.mode)

  let image = (useSelector(
    (state: RootState) => state.settings.background_image_file.value
  ) as unknown) as AmeOptionString['value']

  let blur = useSelector((state: RootState) => state.settings.background_blur)

  if (!image) {
    image = './images/ame-bg.jpg'
  } else if (wallpaperMode === 'wallpaperEngine') {
    image = 'file:///' + image
  }

  return (
    <BackgroundComponent
      image={image}
      blur={blur.value as number}
    ></BackgroundComponent>
  )
}

export default BackgroundContainer
