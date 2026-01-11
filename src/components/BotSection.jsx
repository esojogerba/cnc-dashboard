import BotRow from './BotRow'

function BotSection({
  title,
  accent,
  rows,
  newLabel,
  showHeader = true,
  showHeaderIcon = true,
  showNewButton = true,
}) {
  return (
    <section className="bot-section">
      {showHeader ? (
        <div className="bot-header">
          <h2 className={`bot-title accent-${accent}`}>{title}</h2>
          {showHeaderIcon ? (
            <span className="panel-icon" aria-hidden="true">
              <span className="material-icons-round">open_in_new</span>
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="bot-table">
        <div className="bot-table-header">
          <span>Name</span>
          <span>Website</span>
          <span>Status</span>
          <span>Runtime</span>
          <span className="bot-actions-label">Actions</span>
        </div>
        {rows.map((row) => (
          <BotRow key={row.id} {...row} />
        ))}
      </div>
      {showNewButton ? (
        <button className={`new-button accent-${accent}`} type="button">
          <span className="material-icons-round" aria-hidden="true">
            add_circle
          </span>
          {newLabel}
        </button>
      ) : null}
    </section>
  )
}

export default BotSection
