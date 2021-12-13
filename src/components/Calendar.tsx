import React from 'react'

import { CalendarData } from '@/@types/calendar'
import { RootState } from '@/store'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Calendar from 'tui-calendar'

import 'tui-calendar/dist/tui-calendar.css'
import '@/styles/calendar.scss'
import requestICSCalendar from '@/core/api/calendar/ics'
import requestNotionDatabases from '@/core/api/calendar/notion'

const calendarSettings = {
  defaultView: 'month',
  taskView: ['task'],
  usageStatistics: false,
  month: {
    moreLayerSize: {
      height: 'auto',
    },
    startDayOfWeek: 1, // monday
  },
  isReadOnly: true,
  useDetailPopup: true,
  scheduleView: false,
  theme: {
    'common.border': '0px solid #e5e5e5',
    'common.backgroundColor': 'transparent',
    'common.holiday.color': '#ff4040',
    'common.saturday.color': 'white',
    'common.dayname.color': 'white',
    'common.today.color': 'white',
    'week.today.color': 'white',
    'week.currentTimeLineBullet.backgroundColor': 'white',

    // month header 'dayname'
    'month.dayname.height': '31px',
    'month.dayname.borderLeft': '0px solid #e5e5e5',
    'month.dayname.paddingLeft': '10px',
    'month.dayname.paddingRight': '10px',
    'month.dayname.backgroundColor': 'inherit',
    'month.dayname.fontSize': '12px',
    'month.dayname.fontWeight': 'normal',
    'month.dayname.textAlign': 'left',

    // month day grid cell 'day'
    'month.holidayExceptThisMonth.color': 'rgba(255, 64, 64, 0.2)',
    'month.dayExceptThisMonth.color': 'rgba(255, 255, 255, 0.2)',
    'month.weekend.backgroundColor': 'inherit',
    'month.day.fontSize': '14px',

    // month schedule style
    'month.schedule.borderRadius': '2px',
    'month.schedule.height': '24px',
    'month.schedule.marginTop': '2px',
    'month.schedule.marginLeft': '8px',
    'month.schedule.marginRight': '8px',

    // month more view
    'month.moreView.border': '0px solid #d5d5d5',
    'month.moreView.boxShadow': '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
    'month.moreView.backgroundColor': 'white',
    'month.moreView.paddingBottom': '17px',
    'month.moreViewTitle.height': '44px',
    'month.moreViewTitle.marginBottom': '12px',
    'month.moreViewTitle.backgroundColor': 'inherit',
    'month.moreViewTitle.borderBottom': 'none',
    'month.moreViewTitle.padding': '12px 17px 0 17px',
    'month.moreViewList.padding': '0 17px',
  },
}

interface CalendarComponentProps {
  data: CalendarData[]
  show?: boolean
  posX?: number
  posY?: number
}

const useCalendarData = (
  id: string,
  token: string,
  ics?: string,
  updateRate?: number
) => {
  const [data, setData] = useState<CalendarData[]>([])

  useEffect(() => {
    const update = () => {
      let providers = []

      if (id !== '' && token !== '') {
        providers.push(requestNotionDatabases(id, token))
      }

      if (typeof ics !== 'undefined' && ics !== '') {
        if (ics.indexOf('||') !== -1) {
          ics.split('||').map(v => providers.push(requestICSCalendar(v)))
        } else {
          providers.push(requestICSCalendar(ics))
        }
      }

      console.log(providers)

      Promise.all(providers).then(schedules => {
        setData(schedules.flat())
      })
    }

    let updateInterval: number

    if (updateRate) {
      updateInterval = (setInterval(
        update,
        60 * 1000 * updateRate
      ) as unknown) as number
    }

    update()

    return () => {
      if (updateInterval) {
        clearInterval(updateInterval)
      }
    }
  }, [id, token, ics])

  return data
}

export const CalendarComponent = ({
  data,
  show,
  posX,
  posY,
}: CalendarComponentProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const [instance, setInstance] = useState<Calendar>()

  useEffect(() => {
    if (!ref.current) {
      return
    }

    if (!instance) {
      const newInstance = new Calendar(ref.current, calendarSettings)
      setInstance(newInstance)

      return
    }

    instance.clear()

    let schedules = []

    for (let i = 0; i < data.length; i++) {
      let start = new Date(data[i].date.start)
      let end

      if (!data[i].date.end) {
        end = new Date(start.toUTCString())
        end.setHours(11, 59, 59)
      } else {
        end = new Date(data[i].date.end || '')
      }

      let borderColor = 'white'

      if (data[i].tags.length) {
        borderColor = data[i].tags[0].color
      }

      schedules[i] = {
        id: data[i].id,
        calendarId: '1',
        title: data[i].title,
        category: 'allday',
        isReadOnly: true,
        body: `${start.toLocaleDateString()} - ${start.toLocaleTimeString()} - ${end.toLocaleDateString()} ${end.toLocaleTimeString()}${
          data[i].memo ? ` (${data[i].memo})` : ''
        }`,
        start: start.toUTCString(),
        end: end.toUTCString(),
        color: 'rgb(255,255,255)',
        borderColor,
        bgColor: 'rgba(255,255,255,0.3)',
      }
    }

    instance.createSchedules(schedules)

    instance.toggleScheduleView(true)
    instance.render()
  }, [ref, instance, data])

  return (
    <div
      className={'ame-calendar'}
      style={{
        ['--posX' as string]: `${posX}%`,
        ['--posY' as string]: `${posY}%`,
      }}
      data-show={show}
      ref={ref}
    ></div>
  )
}

interface CalendarDataContainerProps
  extends Omit<CalendarComponentProps, 'data'> {
  id: string
  token: string
  ics?: string
  updateRate?: number
}

export const CalendarDataContainer = ({
  id,
  token,
  ics,
  updateRate,
  ...props
}: CalendarDataContainerProps) => {
  const data = useCalendarData(id, token, ics, updateRate)

  return (
    <CalendarComponent
      data={data}
      show={data.length > 0}
      {...props}
    ></CalendarComponent>
  )
}

export const CalendarContainer = () => {
  const useCalendar = useSelector(
    (state: RootState) => state.settings.use_calendar.value
  ) as boolean

  const calendarUpdateRate = useSelector(
    (state: RootState) => state.settings.use_calendar_update.value
  ) as number

  const notionID = useSelector(
    (state: RootState) => state.settings.notion_calendar_id.value
  ) as string

  const notionToken = useSelector(
    (state: RootState) => state.settings.notion_integration_token.value
  ) as string

  const icsEndpoint = useSelector(
    (state: RootState) => state.settings.ics_endpoint.value
  ) as string

  const posX = useSelector(
    (state: RootState) => state.settings.calendar_position_x.value
  ) as number

  const posY = useSelector(
    (state: RootState) => state.settings.calendar_position_y.value
  ) as number

  if (!useCalendar || ((!notionID || !notionToken) && !icsEndpoint)) {
    return <></>
  }

  return (
    <CalendarDataContainer
      id={notionID}
      token={notionToken}
      ics={icsEndpoint}
      updateRate={calendarUpdateRate}
      posX={posX}
      posY={posY}
    ></CalendarDataContainer>
  )
}

export default CalendarContainer
