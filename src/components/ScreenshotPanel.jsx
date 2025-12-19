function ScreenshotPanel({ items }) {
  return (
    <section className="panel screenshot-panel">
      <div className="panel-header">
        <h2>Screenshots</h2>
        <span className="panel-icon" aria-hidden="true">
          <span className="material-icons-round">open_in_new</span>
        </span>
      </div>
      <div className="screenshot-list">
        {items.map((item) => (
          <div key={item.id} className="screenshot-row">
            <div className={`icon-chip tone-${item.tone}`}>
              <span className="material-icons-round" aria-hidden="true">
                {item.icon}
              </span>
            </div>
            <p className="screenshot-name">{item.bot}</p>
            <span className="screenshot-count">{item.count}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ScreenshotPanel
