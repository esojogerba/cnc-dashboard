import { useId, useState } from 'react'

function StatCard({
  label,
  value,
  accent,
  meta,
  icon = 'open_in_new',
  variant = 'default',
  showMenu = false,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const menuId = useId()

  if (variant === 'stacked') {
    return (
      <article className="stat-card stat-card-stack">
        <div className="stat-card-top">
          <p className="stat-title">{label}</p>
          {showMenu ? (
            <div className="stat-menu">
              <button
                className="stat-menu-button"
                type="button"
                aria-label="Set date range"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-controls={menuId}
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <span className="material-icons-round" aria-hidden="true">
                  more_horiz
                </span>
              </button>
              {isOpen ? (
                <div
                  className="stat-menu-panel"
                  id={menuId}
                  role="dialog"
                  aria-label="Set date range"
                >
                  <p className="stat-menu-title">Date range</p>
                  <label className="stat-menu-field">
                    <span>From</span>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(event) => setFromDate(event.target.value)}
                    />
                  </label>
                  <label className="stat-menu-field">
                    <span>To</span>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(event) => setToDate(event.target.value)}
                    />
                  </label>
                  <div className="stat-menu-actions">
                    <button
                      type="button"
                      className="stat-menu-apply"
                      onClick={() => setIsOpen(false)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <span className="stat-card-top-spacer" aria-hidden="true" />
          )}
        </div>
        <div className="stat-card-main">
          <div className="stat-card-body">
            <p className={`stat-value accent-${accent}`}>{value}</p>
            {meta ? <p className="stat-meta">{meta}</p> : null}
          </div>
          <div className="stat-icon stat-icon-large" aria-hidden="true">
            <span className="material-icons-round">{icon}</span>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="stat-card">
      <div className="stat-card-body">
        <p className="stat-label">{label}</p>
        <p className={`stat-value accent-${accent}`}>{value}</p>
        {meta ? <p className="stat-meta">{meta}</p> : null}
      </div>
      <div className="stat-icon" aria-hidden="true">
        <span className="material-icons-round">{icon}</span>
      </div>
    </article>
  )
}

export default StatCard
