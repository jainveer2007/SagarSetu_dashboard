export default function TopicCard({ icon, title, children, footer }) {
  return (
    <div className="topic-card">
      <div className="topic-card__header">
        <span className="topic-card__icon">{icon}</span>
        <span className="topic-card__title">{title}</span>
      </div>
      <div className="topic-card__body">{children}</div>
      {footer && <div className="topic-card__footer">{footer}</div>}
    </div>
  )
}
