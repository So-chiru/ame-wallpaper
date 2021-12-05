export interface IPAPIData {
  status: 'success' | 'fail'
  message?: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
  query: string
}

export const requestLocation = (): [AbortController, Promise<ReturnType<typeof locationDataParse>>] => {
  const controller = new AbortController()

  return [
    controller,
    fetch(
      'http://ip-api.com/json/',
      {
        headers: {
          Origin: `yappaAmeWallpaper/${VERSION} github.com/So-chiru/yappaAmeWallpaper`
        },
        signal: controller.signal
      }
    )
      .then(res => res.json())
      .then(locationDataParse)
      .catch(e => {
        throw e
      })
  ]
}

const locationDataParse = (data: IPAPIData) => {
  if (data.status !== 'success') {
    throw new Error(data.message)
  }

  if (typeof data.lat === 'undefined' || typeof data.lon === 'undefined') {
    throw new Error('insufficient data')
  }

  return { lat: data.lat, lon: data.lon }
}