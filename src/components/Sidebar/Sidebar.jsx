import { CHAT_HISTORY } from '../../data/mockData'
import SpecularButton from '../ui/SpecularButton'
import './Sidebar.css'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo">🐋</div>
        <div>
          <div className="sidebar__brand-name">SAGAR SETU</div>
          <div className="sidebar__brand-sub"></div>
        </div>
      </div>

      <SpecularButton
        size="md"
        radius={18}
        tint="#ffffff"
        tintOpacity={0}
        blur={0}
        textColor="#f5f5f5"
        lineColor="#ffffff"
        baseColor="#525252"
        intensity={1}
        shineSize={10}
        shineFade={40}
        thickness={1}
        speed={0.35}
        followMouse
        proximity={250}
        autoAnimate={false}
        className="sidebar__new-chat-specular"
      >
        + New Chat
      </SpecularButton>

      <div className="sidebar__section-label">Chat History</div>

      <nav className="sidebar__history">
        {CHAT_HISTORY.map((item) => (
          <button
            key={item.id}
            className={`sidebar__history-item${item.active ? ' sidebar__history-item--active' : ''}`}
          >
            <span className="sidebar__history-title">{item.title}</span>
            <span className="sidebar__history-time">{item.time}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__avatar">S</div>
        <div>
          <div className="sidebar__footer-name">Skipper 7</div>
          <div className="sidebar__footer-plan">Premium Plan</div>
        </div>
      </div>
    </aside>
  )
}
