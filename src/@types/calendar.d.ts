import { Property } from '@/@types/notion'

interface CalendarData {
  title: string
  id: string
  date: {
    start: string
    end?: string
  }
  done?: boolean
  properties: Record<string, Property>
}
