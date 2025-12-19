const statusClassMap = {
  Working: 'status-working',
  Paused: 'status-paused',
  Error: 'status-error',
}

function BotRow({ name, website, status, runtime, icon, tone }) {
  const statusClass = statusClassMap[status] || 'status-working'
  const isWorking = status === 'Working'
  const isPaused = status === 'Paused'

  return (
    <div className="bot-row">
      <div className="bot-name bot-cell">
        <div className={`icon-chip tone-${tone}`}>
          <span className="material-icons-round" aria-hidden="true">
            {icon}
          </span>
        </div>
        <span>{name}</span>
      </div>
      <div className="bot-cell">
        <div className="bot-info-group">
          <span className="bot-cell-label">Website</span>
          <span className="bot-website">{website}</span>
        </div>
      </div>
      <div className="bot-cell">
        <div className="bot-info-group">
          <span className="bot-cell-label">Status</span>
          <span className={`bot-status ${statusClass}`}>{status}</span>
        </div>
      </div>
      <div className="bot-cell">
        <div className="bot-info-group">
          <span className="bot-cell-label">Runtime</span>
          <span className="bot-runtime">{runtime}</span>
        </div>
      </div>
      <div className="bot-actions bot-cell">
        <span className="bot-cell-label">Actions</span>
        <button className="ghost-button" type="button" disabled={isPaused}>
          Pause
        </button>
        <button className="ghost-button" type="button" disabled={isWorking}>
          Resume
        </button>
        <button className="danger-button" type="button">
          Stop
        </button>
      </div>
    </div>
  )
}

export default BotRow
