import Calendar from 'tui-calendar'

import 'tui-calendar/dist/tui-calendar.css'
import '@o/css/calendar.scss'

let instance: Calendar

import { CalendarData } from '@o/@types/calendar'

export const update = (data: CalendarData[]) => {
  if (!instance) {
    instance = new Calendar('#calendar', {
      defaultView: 'month',
      taskView: ['task'],
      usageStatistics: false,
      month: {
        moreLayerSize: {
          height: 'auto'
        },
        startDayOfWeek: 1 // monday
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
        'month.moreViewList.padding': '0 17px'
      }
    })
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
      bgColor: 'rgba(255,255,255,0.3)'
    }
  }

  instance.createSchedules(schedules)

  instance.toggleScheduleView(true)
  instance.render()
}
