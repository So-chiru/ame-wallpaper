import { CalendarData } from '@/@types/calendar'
import {
  PaginatedList,
  Database,
  ErrorResponse,
  RichTextBaseInput
} from '@/@types/notion'

const notionCalendarRequestOption = {
  method: 'POST',
  headers: {
    'Notion-Version': '2021-05-13'
  }
}

const doneFieldCheck = (id: string): boolean => {
  return new Set<string>(['완료', 'Done', 'done', 'Acheived', 'acheived']).has(
    id
  )
}

const dateFieldCheck = (id: string): boolean => {
  return new Set<string>(['날짜', 'Date', 'date']).has(id)
}

const parseDatabase = (data: Database): CalendarData => {
  let title = ''
  let date: { start: string; end?: string } = { start: '', end: '' }
  let done: boolean | undefined

  let keys = Object.keys(data.properties)

  for (let i = 0; i < keys.length; i++) {
    let keyName = keys[i]
    let item = data.properties[keyName]

    if (item.id === 'title' && item.type === 'title') {
      title = (item.title[0] as RichTextBaseInput).plain_text || ''
    } else if (item.type === 'checkbox' && doneFieldCheck(keyName)) {
      done = (item.checkbox as unknown) as boolean
    } else if (item.type === 'date' && dateFieldCheck(keyName)) {
      date = (item.date as unknown) as { start: string; end?: string }
    }
  }

  const result = {
    id: data.id,
    title,
    date,
    done,
    properties: data.properties
  }

  return result
}

const parseResponse = (response: PaginatedList<Database> | ErrorResponse) => {
  if (response.object === 'error') {
    throw new Error(response.message)
  }

  let schedules = []

  for (let i = 0; i < response.results.length; i++) {
    schedules[i] = parseDatabase(response.results[i])
  }

  return schedules
}

export const requestDatabases = (id: string, token: string) => {
  return fetch('https://notion-api-cors.sochiru.workers.dev/?id=' + id, {
    ...notionCalendarRequestOption,
    mode: 'cors',
    headers: {
      ...notionCalendarRequestOption.headers,
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(parseResponse)
}
