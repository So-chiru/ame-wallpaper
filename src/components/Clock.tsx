import React, { useEffect, useState } from 'react'

import { RootState } from '@/store'
import { useSelector } from 'react-redux'

import '@/styles/clock'

interface ClockComponentProps {
  useSeconds?: boolean
  twelveHour?: boolean
  date: Date
}

const padding = (n: number) => (n < 10 ? `0${n}` : n.toString())

export const ClockComponent = ({
  useSeconds,
  date,
  twelveHour
}: ClockComponentProps) => {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return (
    <div className='ame-clock-widget' data-style={1}>
      <div className='contents'>
        <h3 className='hours'>
          {padding((twelveHour && hours > 12 ? hours - 12 : hours) || 12)}
        </h3>
        <h3 className='minutes'>{padding(minutes)}</h3>
        {useSeconds && <p className='seconds'>{padding(seconds)}</p>}
        {twelveHour && <p className='ampm'>{hours >= 12 ? 'PM' : 'AM'}</p>}
      </div>
    </div>
  )
}

const ClockUpdateComponent = (props: ClockComponentProps) => {
  const [time, setTime] = useState<Date>(new Date())

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTime(new Date())
    }, 200)

    return () => {
      clearTimeout(timeout)
    }
  })

  return <ClockComponent {...props} date={time}></ClockComponent>
}

export const ClockContainer = () => {
  const clock = useSelector(
    (state: RootState) => state.settings.use_clock.value
  ) as boolean

  // const clockStyle = useSelector((state: RootState) => state.settings.clock_style.value)

  const seconds = useSelector(
    (state: RootState) => state.settings.use_seconds_info.value
  ) as boolean

  const twelveHour = useSelector(
    (state: RootState) => state.settings.use_twelve_hour_clock.value
  ) as boolean

  if (!clock) {
    return <></>
  }

  return (
    <ClockUpdateComponent
      date={new Date()}
      useSeconds={seconds}
      twelveHour={twelveHour}
    ></ClockUpdateComponent>
  )
}

export default ClockContainer
