import { Property, Database } from '@notionhq/client/build/src/api-types'

interface CalendarData {
  title: string
  id: string
  tags: {
    color: string
    id: string
    name: string
  }[]
  date: {
    start: string
    end?: string
  }
  done?: boolean
  memo?: string
  properties: Database['properties']
}
