import Sidebar from './components/Sidebar/Sidebar'
import TopBar from './components/TopBar/TopBar'
import MapSection from './components/MapSection/MapSection'
import TopicCardsGrid from './components/TopicCards/TopicCardsGrid'
import ChatPanel from './components/ChatPanel/ChatPanel'
import ClickSpark from './components/ui/ClickSpark'
import SplashCursor from './components/ui/SplashCursor'
import { useMarineData } from './data/useMarineData'
import './App.css'

// Mumbai coastal coordinates — swap for a real geolocation / search flow later.
const LOCATION = 'Jaipur, Rajasthan India'
const COORDS = [26.9196, 75.7878]

export default function App() {
  const { data: marineData, loading } = useMarineData(COORDS[0], COORDS[1])

  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <SplashCursor
        DENSITY_DISSIPATION={0.5}
        VELOCITY_DISSIPATION={1}
        PRESSURE={0.05}
        CURL={1}
        SPLAT_RADIUS={0.04}
        SPLAT_FORCE={1000}
        COLOR_UPDATE_SPEED={4}
        COLOR="#111e33"
        RAINBOW_MODE={false}
      />
      <div className="app">
        <Sidebar />

        <div className="app__main">
          <TopBar location={LOCATION} marineData={marineData} loading={loading} />

          <div className="app__content">
            <MapSection
              location={LOCATION}
              coords={COORDS}
              marineData={marineData}
              loading={loading}
            />
            <TopicCardsGrid marineData={marineData} loading={loading} />
          </div>
        </div>

        <ChatPanel marineData={marineData} />
      </div>
    </ClickSpark>
  )
}
