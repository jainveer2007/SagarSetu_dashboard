# SETU Dashboard

React + Vite dashboard for the ORCA marine AI assistant.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Structure

```
src/
  App.jsx                     Composes the 3 zones: sidebar, map+cards, chat panel
  components/
    Sidebar/                  Brand + "New chat" + chat history list only
    TopBar/                   Location search + live condition badges
    MapSection/                Live Leaflet map (OpenStreetMap tiles, no key needed)
    TopicCards/                The 4 fixed cards: Weather, Wind, Waves, Tide
      ChartMini.jsx             Reusable SVG sparkline used by Waves & Tide
      TopicCard.jsx             Shared card shell
    ChatPanel/                 Right-side ORCA AI Assistant chat UI
  data/
    mockData.js                 Chat history, quick prompts, tide points (mock)
    useMarineData.js            Hook: fetches live weather + wave data
```

## Live data

`useMarineData` calls the free **Open-Meteo** API — no API key required:
- Weather: `api.open-meteo.com` (air temp, humidity, wind)
- Marine: `marine-api.open-meteo.com` (wave height, period, 24h trend)

Tide values are currently mocked in `mockData.js` (real tide-station APIs
usually need a paid key / station ID) — swap `TideCard.jsx` for a live
source whenever you have one.

## Notes / next steps

- Sidebar is intentionally minimal per spec — chat history only, no nav.
- The map circle overlay size scales with live wave height as a simple
  visual cue; swap for a proper heatmap/vector layer if you get real
  gridded wind/wave field data.
- Chat replies are canned locally in `ChatPanel.jsx` (`buildReply`) —
  point this at a real backend/LLM endpoint when ready.
# SagarSetu_dashboard
