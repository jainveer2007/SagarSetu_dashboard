import TopicCard from './TopicCard'
import ChartMini from './ChartMini'
import { TIDE_POINTS } from '../../data/mockData'

export default function TideCard() {
  const values = TIDE_POINTS.map((p) => p.value)
  const high = TIDE_POINTS.reduce((a, b) => (b.value > a.value ? b : a))
  const low = TIDE_POINTS.reduce((a, b) => (b.value < a.value ? b : a))

  return (
    <TopicCard icon="🌗" title="Tide (Mumbai)" footer={<button className="topic-card__link">View Full Tide Chart →</button>}>
      <div className="tide-card__chart">
        <ChartMini points={values} color="#1fd1a8" />
      </div>
      <div className="tide-card__extremes">
        <div>
          <span className="tide-card__badge tide-card__badge--low">L {low.time}</span>
          <span className="tide-card__extreme-value">{low.value.toFixed(1)} m</span>
        </div>
        <div>
          <span className="tide-card__badge tide-card__badge--high">H {high.time}</span>
          <span className="tide-card__extreme-value">{high.value.toFixed(1)} m</span>
        </div>
      </div>
    </TopicCard>
  )
}
