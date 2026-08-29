import TopicCard from './TopicCard'
import ChartMini from './ChartMini'

function ratingFor(height) {
  if (height == null) return { label: '--', tone: 'neutral' }
  if (height < 1.2) return { label: 'Calm', tone: 'good' }
  if (height < 2) return { label: 'Moderate', tone: 'moderate' }
  return { label: 'Rough', tone: 'bad' }
}

export default function WavesCard({ marineData, loading }) {
  const height = loading ? null : marineData?.waveHeight
  const period = loading ? null : marineData?.wavePeriod
  const rating = ratingFor(height)
  const trend = loading ? [] : (marineData?.hourlyWaveHeight || []).slice(0, 12)

  return (
    <TopicCard icon="🌊" title="Waves" footer={<button className="topic-card__link">View More →</button>}>
      <div className="waves-card__main">
        <div className="waves-card__value">
          {height == null ? '--' : height.toFixed(1)}
          <span className="weather-card__unit">m</span>
        </div>
        <span className={`waves-card__pill waves-card__pill--${rating.tone}`}>{rating.label}</span>
      </div>
      <div className="waves-card__chart">
        {trend.length > 1 ? (
          <ChartMini points={trend} />
        ) : (
          <div className="waves-card__chart-empty">Loading trend…</div>
        )}
      </div>
      <div className="waves-card__period">Period <strong>{period == null ? '--' : `${period.toFixed(1)} s`}</strong></div>
    </TopicCard>
  )
}
