import TopicCard from './TopicCard'

export default function WeatherCard({ marineData, loading }) {
  const temp = loading || marineData?.airTemp == null ? '--' : Math.round(marineData.airTemp)
  const humidity = loading || marineData?.humidity == null ? '--' : marineData.humidity

  return (
    <TopicCard icon="⛅" title="Live Weather" footer={<button className="topic-card__link">View More →</button>}>
      <div className="weather-card__main">
        <div className="weather-card__temp">
          {temp}
          <span className="weather-card__unit">°C</span>
        </div>
        <div className="weather-card__meta">
          <div className="weather-card__feels">Feels like {temp === '--' ? '--' : temp + 1}°</div>
          <div className="weather-card__place">📍 Mumbai</div>
        </div>
      </div>
      <div className="weather-card__stats">
        <div>
          <span className="weather-card__stat-label">Humidity</span>
          <span className="weather-card__stat-value">{humidity}%</span>
        </div>
        <div>
          <span className="weather-card__stat-label">Pressure</span>
          <span className="weather-card__stat-value">1012 hPa</span>
        </div>
        <div>
          <span className="weather-card__stat-label">Visibility</span>
          <span className="weather-card__stat-value">10 km</span>
        </div>
      </div>
    </TopicCard>
  )
}
