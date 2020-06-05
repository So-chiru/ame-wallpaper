let useFahrenheit = false
let savedData = {}
let coord = []
let randomID = Math.random()
  .toString(36)
  .substring(7)
const httpOptions = {
  headers: {
    Origin: 'localhost',
    'X-Requested-With': 'Wallpaper Engine ' + randomID
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
  let c

  try {
    c = await getPostionAPI()
  } catch (e) {
    return
  }

  let res = await fetch(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${c[0]}&lon=${c[1]}`,
    httpOptions
  )

  return res.json()
}

const setScale = v => {
  useFahrenheit = v
}

const getScale = v => {
  return useFahrenheit
}

const setData = v => {
  savedData = v
}

const getData = v => {
  return savedData
}

const setCoord = v => {
  coord = v
}

const getCoord = v => {
  return coord
}

module.exports = {
  getWeather,
  setScale,
  getScale,
  setData,
  getData,
  setCoord,
  getCoord
}
