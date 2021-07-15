import React, { useEffect, useState } from 'react'

import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { requestWeather } from '@/core/api/weather'

// document.querySelector('.div').dataset.done = true
// document.querySelector('.weather').dataset.done = true

// document.querySelector('#temp').innerHTML =
//   convertUnitsCF(
//     v.properties.timeseries[0].data.instant.details.air_temperature
//   ) +
//   '°' +
//   (weather.getScale() ? 'F' : 'C')
// document.querySelector('#wicon').src =
//   'https://weathericons.vercel.app/' +
//   v.properties.timeseries[0].data.next_1_hours.summary.symbol_code +
//   '.png'

// document.querySelector('#winds').innerHTML =
//   v.properties.timeseries[0].data.instant.details.wind_speed +
//   v.properties.meta.units.wind_speed
// document.querySelector('#humid').innerHTML =
//   v.properties.timeseries[0].data.instant.details.relative_humidity + '%'
// document.querySelector('#clouds').innerHTML =
//   v.properties.timeseries[0].data.instant.details.cloud_area_fraction + '%'

// weather.setData(v)

export const useWeatherData = (latlon: string) => {
  const [data, setData] = useState()

  useEffect(() => {
    const parsedLatLon = latlon.split(',').map(v => Number(v))
    const [controller, res] = requestWeather(parsedLatLon[0], parsedLatLon[1])

    res.then(v => {
      setData(v)
    })

    return () => {
      controller.abort()
    }
  }, [])

  return data
}

interface WeatherComponentProps {
  latlon?: string
}

export const WeatherComponent = ({}: WeatherComponentProps) => {
  return <div className='ame-weather-widget'></div>
}

export const WeatherDataComponent = (props: WeatherComponentProps) => {
  if (!props.latlon) {
    return <></>
  }

  const weather = useWeatherData(props.latlon)

  return <WeatherComponent {...props}></WeatherComponent>
}

export const WeatherContainer = () => {
  const weather = useSelector(
    (state: RootState) => state.settings.use_weather.value
  ) as boolean

  const latlon = useSelector(
    (state: RootState) => state.settings.use_custom_latlon.value
  ) as string

  if (!weather || !latlon) {
    return <></>
  }

  return <WeatherDataComponent latlon={latlon}></WeatherDataComponent>
}

export default WeatherContainer
