import ICSParser from 'ical-js-parser'

import { CalendarData, CalendarTag } from "@/@types/calendar"

const colorRegex = /(<<C:)[#]?([A-z]|[0-9])+(>>)/g

const parseICSDate = (str: string): Date => {
  let date = `${str.substring(0, 4)}-${str.substring(4, 6)}-${str.substring(6, 8)}`
  
  if (str.indexOf('Z') === str.length - 1) {
    return new Date(`${date}T${str.substring(9,11)}:${str.substring(11,13)}:${str.substring(13,15)}Z`)
  }

  if (str.length === 8) {
    return new Date(date)
  }

  return new Date(str)
}

const parseICSResponse = (response: string, color: string) => {
  let schedules: CalendarData[] = []

  const parsed = ICSParser.toJSON(response)

  for (let i = 0; i < parsed.events.length; i++) {
    const event = parsed.events[i]

    try {
      let start = parseICSDate(event.dtstart.value)
      let end = parseICSDate(event.dtend.value)

      let tags: CalendarTag[] = []

      if (color) {
        tags.push({
          id: 'custom-color',
          color,
          name: 'Custom Color',
        })
      }

      schedules.push({
        title: event.summary || 'Unknown event',
        id: event.uid || Math.random().toString(16),
        tags,
        date: {
          start: start.toISOString(),
          end: end.toISOString()
        }
      })
    } catch (e) {
      continue
    }
  }

  return schedules
}

const requestICSCalendar = (ics: string): Promise<CalendarData[]> => {
  let color = ''
  
  if (colorRegex.test(ics)) {
    color = ics.match(colorRegex)![0]
    ics = ics.replace(color, '')
    color = color.replace(/<<C:|>>/g, '')
  }

  if (ics.indexOf('holiday') > -1) {
    color = '#F00'
  }

  return fetch(ics, {
    method: 'GET',
    mode: 'cors',
  })
    .then(response => response.text())
    .then((res) => parseICSResponse(res, color))
}

export default requestICSCalendar