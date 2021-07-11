import { Property } from '@o/@types/notion'

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
  properties: Record<string, Property>
}
