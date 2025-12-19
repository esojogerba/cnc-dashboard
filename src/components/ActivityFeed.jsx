function ActivityFeed({ items }) {
  return (
    <section className="panel activity-panel">
      <div className="panel-header">
        <h2>Bot Activity Feed</h2>
        <span className="panel-icon" aria-hidden="true">
          <span className="material-icons-round">open_in_new</span>
        </span>
      </div>
      <div className="activity-list">
        {items.map((item) => (
          <div
            key={item.id}
            className={`activity-row${item.variant === 'error' ? ' error' : ''}`}
          >
            <div className={`icon-chip tone-${item.tone}`}>
              <span className="material-icons-round" aria-hidden="true">
                {item.icon}
              </span>
            </div>
            <div className="activity-main">
              <p className="activity-title">{item.bot}</p>
              <p className="activity-message">{item.message}</p>
            </div>
            <p className="activity-time">{item.time}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ActivityFeed
