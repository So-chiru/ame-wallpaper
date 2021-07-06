import React, { useEffect, useRef, useState } from 'react'

import PreviewContainer from '@g/components/Preview'

import '@g/styles/index.scss'
import SettingsContainer from '@g/components/Settings'
import { settingsToBase64, settingsURLtoObject } from './utils/url'

export const defaultWallpaperOptions: WallpaperURLOption[] = [
  {
    name: 'background',
    description:
      "Background Image URL (You can't use local file. To use local image, upload to somewhere that supports URL hot linking.)",
    type: 'string',
    default: undefined
  },
  {
    name: 'blur',
    description: 'Whether to use blurring background image. (0 to disable)',
    type: 'number',
    default: 40
  },
  {
    name: 'logo',
    description: 'Whether to use background logo on center.',
    type: 'boolean',
    default: true
  },
  {
    name: 'slideDelay',
    description: 'Delay between logo slide. (ms)',
    type: 'number',
    default: 20000
  },
  {
    name: 'rain',
    description: 'Defines max rain particles.',
    type: 'number',
    default: 600
  },
  {
    name: 'rainSpeed',
    description: 'Defines speed of rain.',
    type: 'number',
    default: 3
  },
  {
    name: 'info',
    description: 'Whether to use clock, weather information widget.',
    type: 'boolean',
    default: false
  },
  {
    name: 'seconds',
    description: 'Whether to show seconds on clock.',
    type: 'boolean',
    default: true
  },
  {
    name: 'infoPosition',
    description: 'Position of clock, weather widget. (1-4)',
    type: 'number',
    default: 3,
    min: 1,
    max: 4
  },
  {
    name: 'fahrenheit',
    description: 'Whether to use Fahrenheit unit on weather widget.',
    type: 'boolean',
    default: false
  },
  {
    name: 'ripple',
    description: 'Whether to use ripple animation on page click.',
    type: 'boolean',
    default: true
  },
  {
    name: 'latlon',
    description: 'Custom Latitude, longitude coordinate. (XX.XX, XX.XX)',
    type: 'string',
    default: undefined
  },
  {
    name: 'useCalendar',
    description: 'Whether to use calendar.',
    type: 'boolean',
    default: false
  },
  {
    name: 'notionToken',
    description: 'Notion API Token for calendar.',
    type: 'string',
    help:
      'https://www.notion.so/How-to-setup-notion-calendar-for-yappaAme-wallpaper-c064462ab84b4a63b8cf99cf0ccb8573',
    default: undefined
  },
  {
    name: 'calendarID',
    description: 'Notion calendar database ID.',
    type: 'string',
    help:
      'https://www.notion.so/How-to-setup-notion-calendar-for-yappaAme-wallpaper-c064462ab84b4a63b8cf99cf0ccb8573',
    default: undefined
  }
]

const App = () => {
  const [fullScreen, setFullScreen] = useState<boolean>(false)
  const [wallpaperOptions, setWallpaperOptions] = useState<
    WallpaperURLOption[]
  >([...defaultWallpaperOptions])

  const updateTimer = useRef<number>(-1)
  const [force, forceUpdate] = useState<number>(-1)

  useEffect(() => {
    const b = new URL(location.href).searchParams.get('b')

    if (b) {
      const parsed = settingsURLtoObject(
        'https://a.x/?' + atob(decodeURIComponent(b))
      )

      setWallpaperOptions(parsed)
    }
  }, [])

  useEffect(() => {
    const base = settingsToBase64(wallpaperOptions)

    window.history.replaceState(null, document.title, base)

    updateTimer.current = (setTimeout(() => {
      forceUpdate(Math.random())
    }, 300) as unknown) as number

    return () => {
      clearTimeout(updateTimer.current)
    }
  }, [wallpaperOptions])

  return (
    <>
      <PreviewContainer
        fullScreen={fullScreen}
        setFullScreen={setFullScreen}
        wallpaperOptions={wallpaperOptions}
        cooldown={force}
      ></PreviewContainer>
      <SettingsContainer
        wallpaperOptions={wallpaperOptions}
        setWallpaperOptions={setWallpaperOptions}
      ></SettingsContainer>
    </>
  )
}

export default App
