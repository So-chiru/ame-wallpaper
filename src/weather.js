let useFahrenheit = false
let savedData = {}
let coord = []

const getWeather = async () => {
  let res = await fetch(
    `https://cors-anywhere.herokuapp.com/weather-api.madadipouya.com/v1/weather/current${
      coord.length ? `?lat=${coord[0]}&lon=${coord[1]}&` : 'byip?'
    }fahrenheit=${useFahrenheit}`,
    {
      headers: {
        Origin: 'localhost',
        'X-Requested-With': 'Wallpaper Engine'
      }
    }
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
