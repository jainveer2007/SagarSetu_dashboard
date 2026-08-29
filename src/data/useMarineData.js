import { useEffect, useState } from 'react'

// Open-Meteo is a free weather/marine API that needs no API key.
// Docs: https://open-meteo.com/en/docs & https://open-meteo.com/en/docs/marine-weather-api
const WEATHER_URL = (lat, lon) =>
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
  `&current=temperature_2m,wind_speed_10m,wind_direction_10m,relative_humidity_2m` +
  `&timezone=auto`

const MARINE_URL = (lat, lon) =>
  `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}` +
  `&current=wave_height,wave_period,wave_direction` +
  `&hourly=wave_height&forecast_days=1&timezone=auto` 

/**
 * Fetches live weather + marine conditions for a given location.
 * Returns { data, loading, error }. On failure, `error` is set and
 * the caller can fall back to placeholder values.
 */
export function useMarineData(lat, lon) {
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    let cancelled = false

    async function load() {
      setState((s) => ({ ...s, loading: true, error: null }))
      try {
        const [weatherRes, marineRes] = await Promise.all([
          fetch(WEATHER_URL(lat, lon)),
          fetch(MARINE_URL(lat, lon)),
        ])

        if (!weatherRes.ok || !marineRes.ok) {
          throw new Error('Request failed')
        }

        const weather = await weatherRes.json()
        const marine = await marineRes.json()

        if (cancelled) return

        setState({
          data: {
            airTemp: weather?.current?.temperature_2m ?? null,
            humidity: weather?.current?.relative_humidity_2m ?? null,
            windSpeed: weather?.current?.wind_speed_10m ?? null,
            windDirection: weather?.current?.wind_direction_10m ?? null,
            waveHeight: marine?.current?.wave_height ?? null,
            wavePeriod: marine?.current?.wave_period ?? null,
            waveDirection: marine?.current?.wave_direction ?? null,
            hourlyWaveHeight: marine?.hourly?.wave_height ?? [],
            hourlyTime: marine?.hourly?.time ?? [],
          },
          loading: false,
          error: null,
        })
      } catch (err) {
        if (!cancelled) {
          setState({ data: null, loading: false, error: err.message || 'Failed to load' })
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [lat, lon])

  return state
}
