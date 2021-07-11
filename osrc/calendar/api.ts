import { CalendarData } from '@o/@types/calendar'
import {
  PaginatedList,
  Database,
  ErrorResponse,
  RichTextBaseInput
} from '@o/@types/notion'

const notionCalendarRequestOption = {
  method: 'POST',
  headers: {
    'Notion-Version': '2021-05-13'
  }
}

const doneFieldCheck = (id: string): boolean => {
  return new Set<string>([
    '완료',
    'Done',
    'done',
    'Acheived',
    'acheived',
    '完了',
    '終わり',
    'おわり'
  ]).has(id)
}

const dateFieldCheck = (id: string): boolean => {
  return new Set<string>(['날짜', 'Date', 'date', 'デート', '日']).has(id)
}

const tagsFieldCheck = (id: string): boolean => {
  return new Set<string>(['태그', 'Tags', 'tags', 'tag', 'Tag', 'タグ']).has(id)
}

const memoFieldCheck = (id: string): boolean => {
  return new Set<string>(['메모', 'Memo', 'memo', 'ノート']).has(id)
}

const parseDatabase = (data: Database): CalendarData => {
  let title = ''
  let tags: { color: string; id: string; name: string }[] = []
  let date: { start: string; end?: string } = { start: '', end: '' }
  let done: boolean | undefined
  let memo: string | undefined = ''

  let keys = Object.keys(data.properties)

  // TODO : Type checking is not complete. Should be strict.

  for (let i = 0; i < keys.length; i++) {
    let keyName = keys[i]
    let item = data.properties[keyName]

    if (item.id === 'title' && item.type === 'title') {
      title = (item.title[0] as RichTextBaseInput).plain_text || ''
    } else if (item.type === 'multi_select' && tagsFieldCheck(keyName)) {
      tags = (item.multi_select as unknown) as {
        color: string
        id: string
        name: string
      }[]
    } else if (item.type === 'checkbox' && doneFieldCheck(keyName)) {
      done = (item.checkbox as unknown) as boolean
    } else if (item.type === 'date' && dateFieldCheck(keyName)) {
      date = (item.date as unknown) as { start: string; end?: string }
    } else if (item.type === 'rich_text' && memoFieldCheck(keyName)) {
      memo = item.rich_text.length
        ? ((item.rich_text[0] as Record<string, unknown>).plain_text as string)
        : undefined
    }
  }

  const result = {
    id: data.id,
    title,
    tags,
    date,
    memo,
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

  console.log(schedules)

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
