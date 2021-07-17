import React, { useEffect, useState } from 'react'

import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { requestWeather, weatherRequestParse } from '@/core/api/weather'

import '@/styles/weather.scss'

export const useWeatherData = (latlon: string, updateRate?: number) => {
  const [data, setData] = useState<ReturnType<typeof weatherRequestParse>>()
  const parsedLatLon = latlon.split(',').map(v => Number(v))

  useEffect(() => {
    let [controller, res] = requestWeather(parsedLatLon[0], parsedLatLon[1])
    res.then(v => {
      setData(v)
    })

    let updateInterval: number

    if (updateRate) {
      updateInterval = (setInterval(() => {
        ;[controller, res] = requestWeather(parsedLatLon[0], parsedLatLon[1])

        res.then(v => {
          setData(v)
        })
      }, 60 * 1000 * updateRate) as unknown) as number
    }

    return () => {
      controller.abort()

      if (updateInterval) {
        clearInterval(updateInterval)
      }
    }
  }, [latlon, updateRate])

  return data
}

const CloudIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width='24'
    height='24'
  >
    <path fill='none' d='M0 0h24v24H0z' />
    <path d='M17 21H7A6 6 0 0 1 5.008 9.339a7 7 0 1 1 13.984 0A6 6 0 0 1 17 21zm0-12a5 5 0 1 0-9.994.243l.07 1.488-1.404.494A4.002 4.002 0 0 0 7 19h10a4 4 0 1 0-3.796-5.265l-1.898-.633A6.003 6.003 0 0 1 17 9z' />
  </svg>
)

const HumidIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width='24'
    height='24'
  >
    <path fill='none' d='M0 0h24v24H0z' />
    <path d='M12 3.1L7.05 8.05a7 7 0 1 0 9.9 0L12 3.1zm0-2.828l6.364 6.364a9 9 0 1 1-12.728 0L12 .272z' />
  </svg>
)

const WindIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width='24'
    height='24'
  >
    <path fill='none' d='M0 0h24v24H0z' />
    <path d='M10.5 17H4v-2h6.5a3.5 3.5 0 1 1-3.278 4.73l1.873-.703A1.5 1.5 0 1 0 10.5 17zM5 11h13.5a3.5 3.5 0 1 1-3.278 4.73l1.873-.703A1.5 1.5 0 1 0 18.5 13H5a3 3 0 0 1 0-6h8.5a1.5 1.5 0 1 0-1.405-2.027l-1.873-.702A3.501 3.501 0 0 1 17 5.5 3.5 3.5 0 0 1 13.5 9H5a1 1 0 1 0 0 2z' />
  </svg>
)

const PrecipitationIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width='24'
    height='24'
  >
    <path fill='none' d='M0 0h24v24H0z' />
    <path d='M16 18v-2h1a4 4 0 1 0-2.157-7.37A6 6 0 1 0 8 15.917v2.022A8.001 8.001 0 0 1 9 2a7.998 7.998 0 0 1 6.98 4.087A6 6 0 1 1 17 18h-1zm-5.768.732L12 16.964l1.768 1.768a2.5 2.5 0 1 1-3.536 0z' />
  </svg>
)

const degreeToCardinal = (deg: number) => {
  const cp = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW'
  ]

  return cp[Math.round(deg / (360 / cp.length)) % cp.length]
}

const toFahrenheit = (celcius: number) => celcius * (9 / 5) + 32
interface WeatherComponentProps {
  latlon?: string
  weather?: ReturnType<typeof weatherRequestParse>
  fahrenheit?: boolean
  autoUpdate?: number
}

export const WeatherComponent = ({
  weather,
  fahrenheit
}: WeatherComponentProps) => {
  return (
    <div className='ame-weather-widget'>
      {!weather ? (
        undefined
      ) : (
        <>
          <div className='top'>
            <p className='temperature'>
              {fahrenheit
                ? Math.floor(toFahrenheit(weather.temperature[0] as number))
                : (weather.temperature[0] as number)}
              {fahrenheit ? '°F' : '°C'}
            </p>
            <img
              src={`https://weathericons.vercel.app/${weather &&
                weather.summary}.png`}
            ></img>
          </div>
          <div className='bottom'>
            {[
              [CloudIcon, weather.clouds.join('')],
              [HumidIcon, `${weather.humidity[0]}` + weather.humidity[1]],
              [
                WindIcon,
                `${weather.wind[0]}${weather.wind[1]} (${typeof weather
                  .windFrom[0] === 'number' &&
                  degreeToCardinal(weather.windFrom[0])})
              `
              ],
              [
                PrecipitationIcon,
                `${weather.precipitation[0]}${weather.precipitation[1]}`
              ]
            ].map((v, i) => (
              <p className='detail' key={i}>
                <span className='icon'>{v[0]}</span>
                <span className='text'>{v[1]}</span>
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export const WeatherDataComponent = (props: WeatherComponentProps) => {
  if (!props.latlon) {
    return <></>
  }

  const weather = useWeatherData(
    props.latlon,
    props.autoUpdate === 0 ? 0 : Math.max(30, props.autoUpdate || 0)
  )

  return <WeatherComponent {...props} weather={weather}></WeatherComponent>
}

export const WeatherContainer = () => {
  const weather = useSelector(
    (state: RootState) => state.settings.use_weather.value
  ) as boolean

  const latlon = useSelector(
    (state: RootState) => state.settings.use_custom_latlon.value
  ) as string

  const fahrenheit = useSelector(
    (state: RootState) => state.settings.use_fahrenheit.value
  ) as boolean

  const autoUpdate = useSelector(
    (state: RootState) => state.settings.weather_update_rate.value
  )

  if (!weather || !latlon) {
    return <></>
  }

  return (
    <WeatherDataComponent
      latlon={latlon}
      fahrenheit={fahrenheit}
      autoUpdate={autoUpdate as number | undefined}
    ></WeatherDataComponent>
  )
}

export default WeatherContainer
