let useFahrenheit = false
let savedData = {}
let coord: number[] = []
const randomID = Math.random()
  .toString(36)
  .substring(7)
const httpOptions = {
  headers: {
    Origin: 'localhost',
    'User-Agent':
      'Wallpaper Engine (github.com/So-chiru/yappaAmeWallpaper) ' + randomID
  }
}

const getPostionAPI = () => {
  return new Promise((resolve, reject) => {
    if (coord.length) {
      return resolve(coord)
    }

    navigator.geolocation.getCurrentPosition(
      geo => {
        coord = [geo.coords.latitude, geo.coords.longitude]
        resolve(coord)
      },
      async err => {
        let h = await (
          await fetch('http://demo.ip-api.com/json/', httpOptions)
        ).json()

        if (h.lat) {
          coord = [h.lat, h.lon]
          return resolve(coord)
        }

        return reject(err)
      }
    )
  })
}

const getWeather = async () => {
  let c: typeof coord

  try {
    c = (await getPostionAPI()) as typeof coord
  } catch (e) {
    return
  }

  const res = await fetch(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${c[0].toFixed(
      4
    )}&lon=${c[1].toFixed(4)}`,
    httpOptions
  )

  return res.json()
}

const setScale = (v: boolean) => {
  useFahrenheit = v
}

const getScale = () => {
  return useFahrenheit
}

const setData = (v: Record<string, unknown>) => {
  savedData = v
}

const getData = () => {
  return savedData
}

const setCoord = (v: number[]) => {
  coord = v
}

const getCoord = () => {
  return coord
}

export default {
  getWeather,
  setScale,
  getScale,
  setData,
  getData,
  setCoord,
  getCoord
}
