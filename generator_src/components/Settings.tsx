import { defaultWallpaperOptions } from '@g/app'
import { settingsURLize } from '@g/utils/url'
import React, { Children, ReactNode } from 'react'

interface SettingsComponentProps<T> {
  wallpaperOptions: T
  setWallpaperOptions: (data: T) => void
}

interface SettingsControlProps {
  data: WallpaperURLOption
  update: (data: unknown) => void
}

const SettingControl = ({ data, update }: SettingsControlProps) => {
  if (data.type === 'boolean') {
    return (
      <input
        type='checkbox'
        checked={
          (typeof data.value === 'undefined'
            ? data.default
            : data.value) as boolean
        }
        onChange={ev =>
          update((ev.nativeEvent.target as HTMLInputElement).checked)
        }
      />
    )
  } else if (data.type === 'string') {
    const value = (typeof data.value === 'undefined'
      ? data.default
      : data.value === data.default
      ? undefined
      : data.value) as string

    return (
      <input
        type='text'
        placeholder={data.default as string}
        value={value || ''}
        title={data.description}
        onChange={ev => {
          update((ev.nativeEvent.target as HTMLInputElement).value)
        }}
      />
    )
  } else if (data.type === 'number') {
    return (
      <input
        type='number'
        placeholder={data.default as string}
        value={
          (typeof data.value === 'undefined'
            ? data.default
            : data.value === data.default
            ? undefined
            : data.value) as number
        }
        onChange={ev =>
          update((ev.nativeEvent.target as HTMLInputElement).value)
        }
      />
    )
  } else {
    return (
      <span>
        {
          (typeof data.value === 'undefined' ? data.default : data.value) as
            | string
            | undefined
            | boolean
            | number
        }
      </span>
    )
  }
}

interface ButtonComponentProps {
  onClick: () => void
  children: ReactNode
}

const ButtonComponent = ({ children, onClick }: ButtonComponentProps) => {
  return (
    <div className='button' onClick={() => onClick()}>
      <span className='text'>{children}</span>
    </div>
  )
}

export const SettingsComponent = ({
  wallpaperOptions,
  setWallpaperOptions
}: SettingsComponentProps<WallpaperURLOption[]>) => {
  const params = settingsURLize(wallpaperOptions)

  const copyLink = () => {
    if (!('clipboard' in navigator)) {
      alert("This browser doesn't supports copy to clipboard feature.")
    }

    navigator.clipboard.writeText(new URL(location.href).origin + '/' + params)
  }

  const copySettingsLink = () => {
    if (!('clipboard' in navigator)) {
      alert("This browser doesn't supports copy to clipboard feature.")
    }

    navigator.clipboard.writeText(location.href)
  }

  const clearSettings = () => {
    setWallpaperOptions(
      wallpaperOptions.map(v => {
        typeof v.value !== 'undefined' && (v.value = v.default)

        return v
      })
    )
  }

  return (
    <div className='settings-zone'>
      <h1>yappaAmeWallpaper Settings</h1>
      <div className='contents'>
        {wallpaperOptions.map((v, i) => {
          const update = (value: unknown) => {
            const newObject = [...wallpaperOptions]

            newObject[i] = {
              ...v,
              value: value
            }

            setWallpaperOptions(newObject)
          }

          return (
            <div className='setting-column' key={v.name}>
              <div className='meta'>
                <h3 className='title'>{v.name}</h3>
                <p className='description'>
                  {v.description}{' '}
                  {v.help ? (
                    <a href={v.help} className='help' target='_blank'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width='24'
                        height='24'
                      >
                        <path fill='none' d='M0 0h24v24H0z' />
                        <path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355z' />
                      </svg>
                    </a>
                  ) : (
                    ''
                  )}
                </p>
              </div>
              <div className='control'>
                <span>
                  <SettingControl data={v} update={update}></SettingControl>
                </span>
              </div>
            </div>
          )
        })}
        <br></br>
        <a href=''></a>
        <hr></hr>
        <h2>Result</h2>
        <a href={'/' + params} target='_blank'>
          {new URL(location.href).origin + '/'}
          {params}
        </a>
        <div className='button-group'>
          <ButtonComponent onClick={copyLink}>Copy Link</ButtonComponent>
          <ButtonComponent onClick={copySettingsLink}>
            Copy Setting Page Link
          </ButtonComponent>
          <ButtonComponent onClick={clearSettings}>
            Clear Settings
          </ButtonComponent>
        </div>
      </div>
    </div>
  )
}

interface SettingsContainerProps<T> {
  wallpaperOptions: T
  setWallpaperOptions: (data: T) => void
}

const SettingsContainer = ({
  wallpaperOptions,
  setWallpaperOptions
}: SettingsContainerProps<WallpaperURLOption[]>) => {
  return (
    <SettingsComponent
      wallpaperOptions={wallpaperOptions}
      setWallpaperOptions={setWallpaperOptions}
    ></SettingsComponent>
  )
}

export default SettingsContainer
