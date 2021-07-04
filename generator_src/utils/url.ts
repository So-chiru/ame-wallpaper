import { defaultWallpaperOptions } from '@g/app'

export const settingsURLize = (data: WallpaperURLOption[]) => {
  return (
    '?' +
    data
      .filter(
        v =>
          typeof v.value !== 'undefined' &&
          v.value !== v.default &&
          v.value !== ''
      )
      .map(v => v.name + '=' + encodeURIComponent(v.value as string))
      .join('&')
  )
}

export const settingsToBase64 = (data: WallpaperURLOption[]) => {
  return (
    '?b=' +
    encodeURIComponent(
      btoa(
        data
          .filter(v => typeof v.value !== 'undefined' && v.value !== v.default)
          .map(v => v.name + '=' + v.value)
          .join('&')
      )
    )
  )
}

const concatWithDefaultData = (data: [string, string][]) => {
  const arr = [...defaultWallpaperOptions]

  return arr.map(v => {
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === v.name) {
        if (v.type === 'boolean') {
          v.value = data[i][1] === 'true'
        } else if (v.type === 'number') {
          v.value = Number(data[i][1])
        } else {
          v.value = data[i][1]
        }
        break
      }
    }

    return v
  })
}

export const settingsURLtoObject = (data: string): WallpaperURLOption[] => {
  return concatWithDefaultData(Array.from(new URL(data).searchParams.entries()))
}
