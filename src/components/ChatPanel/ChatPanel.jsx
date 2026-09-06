import { useEffect, useRef, useState } from 'react'
import { INITIAL_MESSAGES, QUICK_PROMPTS } from '../../data/mockData'
import ShinyText from './ShinyText'
import GradientText from './GradientText'
import GhostCursor from '../ui/GhostCursor'
import './ChatPanel.css'

function timeNow() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Very small canned-response generator so the chat feels alive without a
// real backend. Swap this out for a real API call later.
function buildReply(question, marineData) {
  const q = question.toLowerCase()

  if (q.includes('wave')) {
    return marineData?.waveHeight != null
      ? `Current wave height near your location is about ${marineData.waveHeight.toFixed(1)} m, period ${marineData.wavePeriod?.toFixed(1) ?? '--'} s.`
      : "I couldn't reach live wave data just now — please try again in a moment."
  }
  if (q.includes('wind')) {
    return marineData?.windSpeed != null
      ? `Wind is currently ${Math.round(marineData.windSpeed)} kn. Conditions look manageable for most vessels.`
      : "I couldn't reach live wind data just now — please try again in a moment."
  }
  if (q.includes('tide')) {
    return 'Low tide is around 06:15 AM (0.7 m) and high tide around 12:35 PM (2.8 m) today.'
  }
  if (q.includes('weather') || q.includes('tomorrow')) {
    return 'Tomorrow morning looks favourable — light clouds, no rain expected, moderate wind and waves. Best window is 05:30–09:30 AM.'
  }
  if (q.includes('alert')) {
    return 'No active alerts — no cyclone, storm or lightning warnings in your area right now.'
  }
  if (q.includes('pfz') || q.includes('fishing') || q.includes('zone')) {
    return 'Nearest potential fishing zone is PFZ 1 at 22 nm, rated Good. PFZ 2 at 35 nm is rated Very Good.'
  }
  return "Here's what I found for that — sea conditions look stable right now. Ask me about wind, waves, tides or fishing zones for more detail."
}

export default function ChatPanel({ marineData }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg = { id: crypto.randomUUID(), role: 'user', text: trimmed, time: timeNow() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const reply = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: buildReply(trimmed, marineData),
        time: timeNow(),
      }
      setMessages((prev) => [...prev, reply])
      setTyping(false)
    }, 700)
  }

  return (
    <aside className="chat-panel">
      <GhostCursor
        color="#B497CF"
        brightness={0.3}
        edgeIntensity={0}
        trailLength={10}
        inertia={0.04}
        grainIntensity={0.02}
        bloomStrength={0.05}
        bloomRadius={0.4}
        bloomThreshold={0.05}
        fadeDelayMs={1000}
        fadeDurationMs={1500}
        zIndex={0}
      />
      <div className="chat-panel__header">
        <div className="chat-panel__title-row">
          <span className="chat-panel__whale">🐋</span>
          <ShinyText
            text="ORCA AI Assistant"
            className="chat-panel__title"
            color="#a7b3c4"
            shineColor="#35c9e8"
            speed={2.5}
            spread={100}
          />
          <span className="chat-panel__beta">SETU</span>
        </div>
      </div>

      <div className="chat-panel__messages" ref={scrollRef}>
        {messages.map((m) => (
          <div key={m.id} className={`chat-msg chat-msg--${m.role}`}>
            
            <div className="chat-msg__bubble">
              <p>{m.text}</p>
              <span className="chat-msg__time">{m.time}</span>
            </div>
          </div>
        ))}

        {typing && (
          <div className="chat-msg chat-msg--assistant">
            <div className="chat-msg__bubble chat-msg__bubble--typing">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}
      </div>

      <div className="chat-panel__quick">
        {QUICK_PROMPTS.map((p) => (
          <button key={p} className="chat-panel__quick-chip" onClick={() => sendMessage(p)}>
            {p}
          </button>
        ))}
      </div>

      <form
        className="chat-panel__input-row"
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage(input)
        }}
      >
        <div className="chat-panel__input-wrap">
          {input.length === 0 && (
            <GradientText
              className="chat-panel__input-placeholder"
              colors={['#35c9e8', '#1fd1a8', '#35c9e8']}
              animationSpeed={4}
              showBorder={false}
            >
              Ask SETU anything...
            </GradientText>
          )}
          <input
            className="chat-panel__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button type="submit" className="chat-panel__send" aria-label="Send message">
          ➤
        </button>
      </form>
    </aside>
  )
}