import { CHAT_HISTORY } from '../../data/mockData'
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

      <button className="sidebar__new-chat">
        <span className="sidebar__new-chat-icon">+</span>
        New chat
      </button>

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
