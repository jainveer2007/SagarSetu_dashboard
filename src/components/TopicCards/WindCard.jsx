import TopicCard from './TopicCard'

const DIRS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

function degToCompass(deg) {
  if (deg == null) return '--'
  const idx = Math.round(deg / 45) % 8
  return DIRS[idx]
}

export default function WindCard({ marineData, loading }) {
  const speed = loading || marineData?.windSpeed == null ? '--' : Math.round(marineData.windSpeed)
  const dir = loading ? null : marineData?.windDirection
  const rotation = dir ?? 0

  return (
    <TopicCard icon="🌬️" title="Wind" footer={<button className="topic-card__link">View More →</button>}>
      <div className="wind-card__main">
        <div className="wind-card__compass">
          <div className="wind-card__compass-ring">
            <span className="wind-card__n">N</span>
            <span className="wind-card__e">E</span>
            <span className="wind-card__s">S</span>
            <span className="wind-card__w">W</span>
            <div
              className="wind-card__needle"
              style={{ transform: `translate(-50%, -100%) rotate(${rotation}deg)` }}
            />
          </div>
        </div>
        <div>
          <div className="wind-card__speed">
            {speed}
            <span className="weather-card__unit">kn</span>
          </div>
          <div className="wind-card__direction">{degToCompass(dir)}</div>
          <div className="wind-card__gusts">Gusts <strong>{speed === '--' ? '--' : speed + 6} kn</strong></div>
        </div>
      </div>
    </TopicCard>
  )
}
