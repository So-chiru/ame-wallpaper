import { RootState } from '@/store'
import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import '@/styles/logo'

interface LogoImage {
  src: string
  className: string
  custom?: boolean
  scale?: number
}

interface LogoComponentProps {
  images: LogoImage[]
  pointer: number
}

export const LogoComponent = ({ images, pointer }: LogoComponentProps) => {
  return (
    <div className='ame-logo'>
      <div className='ame-logo-slide'>
        {images.map((image, index) => (
          <img
            className={[
              'ame-logo-image',
              image.className ? image.className : undefined
            ]
              .filter(v => v !== undefined)
              .join(' ')}
            key={index}
            src={image.src}
            data-current={index === pointer}
            data-index={index}
            data-custom={image.custom}
            style={{
              transform: (image.scale && `scale(${image.scale}%)`) || undefined
            }}
          ></img>
        ))}
      </div>
    </div>
  )
}

export const LogoContainer = () => {
  const [pointer, setPointer] = useState<number>(0)

  const useLogo = useSelector(
    (state: RootState) => state.settings.use_logo.value
  ) as boolean

  const pinLogo = useSelector(
    (state: RootState) => state.settings.slide_logo_image.value
  ) as number

  const slideDelay = useSelector(
    (state: RootState) => state.settings.slide_delay.value
  ) as number

  const customImage = useSelector(
    (state: RootState) => state.settings.custom_logo_image.value
  ) as string

  const customImageScale = useSelector(
    (state: RootState) => state.settings.custom_logo_image_scale.value
  ) as number

  let logoImages: LogoImage[] = [
    {
      src: './images/ame-white.png',
      className: 'contrast-ame'
    },
    {
      src: './images/tuyu-white.png',
      className: 'contrast-tuyu'
    }
  ]

  if (customImage) {
    logoImages.push({
      src: customImage,
      className: 'contrast-custom',
      scale: customImageScale
    })
  }

  useEffect(() => {
    if (!useLogo || pinLogo || !slideDelay) {
      setPointer(pinLogo || 0)

      return
    }

    const timeout = setTimeout(() => {
      if (pointer + 1 >= logoImages.length) {
        setPointer(0)
      } else {
        setPointer(pointer + 1)
      }
    }, slideDelay)

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [useLogo, pinLogo, slideDelay, pointer, customImageScale])

  if (!useLogo) {
    return <></>
  }

  return <LogoComponent images={logoImages} pointer={pointer}></LogoComponent>
}

export default LogoContainer
