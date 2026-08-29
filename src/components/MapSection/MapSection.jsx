import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './MapSection.css'

// Default Leaflet marker icons point at CDN assets; wire them explicitly
// so the pin renders correctly under Vite's bundler.
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

export default function MapSection({ location, coords, marineData, loading }) {
  return (
    <section className="map-section">
      <div className="map-section__header">
        <div>
          <h2 className="map-section__title">Live Map</h2>
          <p className="map-section__subtitle">Wind · Waves · Fishing zones near {location}</p>
        </div>
        <div className="map-section__badge">
          {loading ? 'Syncing…' : 'Live'}
          <span className={`map-section__dot${loading ? ' map-section__dot--pulse' : ''}`} />
        </div>
      </div>

      <div className="map-section__map-wrap">
        <MapContainer
          center={coords}
          zoom={8}
          scrollWheelZoom={false}
          className="map-section__map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={coords} icon={markerIcon}>
            <Popup>
              {location}
              <br />
              {loading
                ? 'Fetching live conditions…'
                : `Wave ${marineData?.waveHeight ?? '--'} m · Wind ${marineData?.windSpeed ?? '--'} kn`}
            </Popup>
          </Marker>
          {!loading && marineData?.waveHeight != null && (
            <Circle
              center={coords}
              radius={35000 + marineData.waveHeight * 8000}
              pathOptions={{
                color: '#35c9e8',
                fillColor: '#35c9e8',
                fillOpacity: 0.08,
                weight: 1,
              }}
            />
          )}
        </MapContainer>

        <div className="map-section__legend">
          <span className="map-section__legend-title">Wave Height (m)</span>
          <div className="map-section__legend-bar" />
          <div className="map-section__legend-scale">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4+</span>
          </div>
        </div>
      </div>
    </section>
  )
}
