export const requestWeather = (
  lat: number,
  lon: number
): [AbortController, Promise<any>] => {
  const controller = new AbortController()

  return [
    controller,
    fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat.toFixed(
        4
      )}&lon=${lon.toFixed(4)}`,
      {
        headers: {
          Origin: `yappaAmeWallpaper/${VERSION} github.com/So-chiru/yappaAmeWallpaper`
        },
        signal: controller.signal
      }
    )
      .then(res => res.json())
      .catch(e => {
        throw e
      })
  ]
}
