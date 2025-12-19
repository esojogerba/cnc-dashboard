function StatCard({ label, value, accent }) {
  return (
    <article className="stat-card">
      <div>
        <p className="stat-label">{label}</p>
        <p className={`stat-value accent-${accent}`}>{value}</p>
      </div>
      <div className="stat-icon" aria-hidden="true">
        <span className="material-icons-round">open_in_new</span>
      </div>
    </article>
  )
}

export default StatCard
