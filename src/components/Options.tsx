import { RootState } from '@/store'
import { SettingsAction, updateSettings } from '@/store/settings/action'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const Options = () => {
  const dispatch = useDispatch()
  const settings = useSelector((state: RootState) => state.settings)

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
