import { RootState } from '@/store'
import { SettingsAction, updateSettings } from '@/store/settings/action'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const Options = () => {
  const dispatch = useDispatch()
  const settings = useSelector((state: RootState) => state.settings)

  useEffect(() => {
    if (!window.location.search) {
      return
    }
    const url = new URL(window.location.href)

    const settingsKeys = Object.keys(settings) as AmeOptionKeys[]

    let lists: SettingsAction['object'] = []

    for (let i = 0; i < settingsKeys.length; i++) {
      let key = settingsKeys[i]
      let item = settings[key]

      if (!url.searchParams.has(item.shorten)) {
        continue
      }

      let value: AmeOption['value'] | null = url.searchParams.get(item.shorten)

      if (value === null) {
        continue
      }

      if (typeof item.default === 'boolean') {
        value = value === 'true' || value === '1'
      } else if (typeof item.default === 'number') {
        value = Number(value)
      }

      lists.push({
        key,
        data: value
      })
    }

    dispatch(updateSettings(lists))
  }, [])

  useEffect(() => {
    window.wallpaperPropertyListener = {
      applyUserProperties: properties => {
        const keys = Object.keys(properties) as AmeOptionKeys[]

        let addData: SettingsAction['object'] = []

        for (let i = 0; i < keys.length; i++) {
          let key = keys[i]

          if (!settings[key]) {
            console.log(
              `${key} is given to applyUserProperties, but no handler was defined.`
            )

            continue
          }

          addData.push({
            key,
            data: properties[key].value
          })
        }

        if (addData.length) {
          dispatch(updateSettings(addData))
        }
      }
    }

    return () => {}
  }, [])

  return <></>
}

export default Options
