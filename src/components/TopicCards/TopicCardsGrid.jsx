import WeatherCard from './WeatherCard'
import WindCard from './WindCard'
import WavesCard from './WavesCard'
import TideCard from './TideCard'
import './TopicCards.css'

export default function TopicCardsGrid({ marineData, loading }) {
  return (
    <section className="topic-grid">
      <WeatherCard marineData={marineData} loading={loading} />
      <WindCard marineData={marineData} loading={loading} />
      <WavesCard marineData={marineData} loading={loading} />
      <TideCard />
    </section>
  )
}
