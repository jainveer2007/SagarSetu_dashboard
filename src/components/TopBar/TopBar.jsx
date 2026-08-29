import './TopBar.css'

export default function TopBar({ location, marineData, loading }) {
  const now = new Date()
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const dateStr = now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })

  const fmt = (val, unit, digits = 1) =>
    loading || val === null || val === undefined ? '--' : `${val.toFixed(digits)}${unit}`

  return (
    <header className="topbar">
      <div className="topbar__search">
        <span className="topbar__pin">📍</span>
        <span>{location}</span>
        <span className="topbar__target">⌖</span>
      </div>

      <div className="topbar__stats">
        <div className="topbar__stat">
          <span className="topbar__stat-icon">☁️</span>
          <div>
            <div className="topbar__stat-value">{fmt(marineData?.airTemp, ' °C', 0)}</div>
            <div className="topbar__stat-label">Air Temp</div>
          </div>
        </div>
        <div className="topbar__stat">
          <span className="topbar__stat-icon">🌬️</span>
          <div>
            <div className="topbar__stat-value">{fmt(marineData?.windSpeed, ' kn', 0)}</div>
            <div className="topbar__stat-label">Wind Speed</div>
          </div>
        </div>
        <div className="topbar__stat">
          <span className="topbar__stat-icon">🌊</span>
          <div>
            <div className="topbar__stat-value">{fmt(marineData?.waveHeight, ' m')}</div>
            <div className="topbar__stat-label">Wave Height</div>
          </div>
        </div>
      </div>

      <div className="topbar__time">
        <span className="topbar__stat-icon">☀️</span>
        <div>
          <div className="topbar__stat-value">{timeStr}</div>
          <div className="topbar__stat-label">{dateStr}</div>
        </div>
      </div>
    </header>
  )
}
