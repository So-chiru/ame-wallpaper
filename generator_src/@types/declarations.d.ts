declare interface WallpaperURLOption {
  name: string
  description: string
  type: 'boolean' | 'string' | 'number'
  default: unknown
  value?: unknown
  help?: string
  min?: number
  max?: number
  pattern?: RegExp
}
