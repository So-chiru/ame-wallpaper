export type MeteorologiskAPIMetaUnits =
  | 'air_pressure_at_sea_level'
  | 'air_temperature'
  | 'air_temperature_max'
  | 'air_temperature_min'
  | 'air_temperature_percentile_10'
  | 'air_temperature_percentile_90'
  | 'cloud_area_fraction'
  | 'cloud_area_fraction_high'
  | 'cloud_area_fraction_low'
  | 'cloud_area_fraction_medium'
  | 'dew_point_temperature'
  | 'fog_area_fraction'
  | 'precipitation_amount'
  | 'precipitation_amount_max'
  | 'precipitation_amount_min'
  | 'probability_of_precipitation'
  | 'probability_of_thunder'
  | 'relative_humidity'
  | 'ultraviolet_index_clear_sky'
  | 'wind_from_direction'
  | 'wind_speed'
  | 'wind_speed_of_gust'
  | 'wind_speed_percentile_10'
  | 'wind_speed_percentile_90'

export interface MeteorologiskAPITimedata {
  details: {
    [key in MeteorologiskAPIMetaUnits]?: number
  }
}

export interface MeteorologiskAPITimedataWithSummary
  extends MeteorologiskAPITimedata {
  summary: {
    symbol_code: string
    symbol_confidence?: string
  }
}

export interface MeteorologiskAPITimeSeries {
  time: string
  data: {
    instant: MeteorologiskAPITimedata
    next_12_hours: MeteorologiskAPITimedataWithSummary
    next_1_hours: MeteorologiskAPITimedataWithSummary
    next_6_hours: MeteorologiskAPITimedataWithSummary
  }
}

export interface MeteorologiskAPIData {
  type: 'Feature'
  geometry: {
    type: 'Point'
    coordinates: [number, number, number?]
  }
  properties: {
    meta: {
      updated_at: string
      units: {
        [key in MeteorologiskAPIMetaUnits]?: string
      }
    }
    timeseries: MeteorologiskAPITimeSeries[]
  }
}

export const requestWeather = (
  lat: number,
  lon: number
): [AbortController, Promise<ReturnType<typeof weatherRequestParse>>] => {
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
      .then(weatherRequestParse)
      .catch(e => {
        throw e
      })
  ]
}

export const weatherRequestParse = (data: MeteorologiskAPIData) => {
  const updated = data.properties.meta.updated_at

  const summary =
    data.properties.timeseries[0].data.next_1_hours.summary.symbol_code

  const temp =
    data.properties.timeseries[0].data.instant.details.air_temperature
  const tempUnit = data.properties.meta.units.air_temperature

  const humidity =
    data.properties.timeseries[0].data.instant.details.relative_humidity
  const humidityUnit = data.properties.meta.units.relative_humidity

  const wind = data.properties.timeseries[0].data.instant.details.wind_speed
  const windUnit = data.properties.meta.units.wind_speed

  const windFrom =
    data.properties.timeseries[0].data.instant.details.wind_from_direction
  const windFromUnit = data.properties.meta.units.wind_from_direction

  const clouds =
    data.properties.timeseries[0].data.instant.details.cloud_area_fraction
  const cloudsUnit = data.properties.meta.units.cloud_area_fraction

  const precipitation =
    data.properties.timeseries[0].data.next_6_hours.details.precipitation_amount
  const precipitationUnit = data.properties.meta.units.precipitation_amount

  const pressure =
    data.properties.timeseries[0].data.instant.details
      .air_pressure_at_sea_level
  const pressureUnit = data.properties.meta.units.air_pressure_at_sea_level

  return {
    updated,
    summary,
    pressure: [pressure, pressureUnit],
    temperature: [temp, tempUnit],
    humidity: [humidity, humidityUnit],
    wind: [wind, windUnit],
    windFrom: [windFrom, windFromUnit],
    clouds: [clouds, cloudsUnit],
    precipitation: [precipitation, precipitationUnit]
  }
}
