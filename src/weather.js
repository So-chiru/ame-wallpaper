let useFahrenheit = false
let savedData = {}

const getWeather = async () => {
  let res = await fetch(
    'https://cors-anywhere.herokuapp.com/weather-api.madadipouya.com/v1/weather/currentbyip?fahrenheit=' +
      useFahrenheit,
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

module.exports = {
  getWeather,
  setScale,
  getScale,
  setData,
  getData
}
