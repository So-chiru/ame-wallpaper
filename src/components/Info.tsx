import React from 'react'

import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import ClockContainer from './Clock'
import WeatherContainer from './Weather'

import '@/styles/info'

export const Info = () => {
  const position = useSelector(
    (state: RootState) => state.settings.info_position.value
  )

  return (
    <div className='ame-info-widgets' data-pos={position}>
      <ClockContainer></ClockContainer>
      <WeatherContainer></WeatherContainer>
    </div>
  )
}

export default Info
