import { APIErrorCode } from '@notionhq/client/build/src/errors'
import { Property } from '@notionhq/client/build/src/api-types'

export interface ErrorResponse {
  object: 'error'
  status: 400 | 401 | 403 | 404 | 409 | 429 | 500 | 503
  code: APIErrorCode
  message: string
}

export interface CalendarData {
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
  properties?: Record<string, Property>
}
