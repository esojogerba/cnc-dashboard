function RunSummarySection({
    title,
    subtitle,
    count,
    children,
    scroll,
    embedded = false,
}) {
    const sectionClassName = embedded
        ? "summary-section summary-section-embedded"
        : "panel summary-section";

    return (
        <section className={sectionClassName}>
            <div className="summary-section-header">
                <div>
                    <h2>{title}</h2>
                    {subtitle ? <p>{subtitle}</p> : null}
                </div>
                {typeof count === "number" ? (
                    <span className="summary-count">{count} items</span>
                ) : null}
            </div>
            <div
                className={`summary-section-body${scroll ? " scrollable" : ""}`}
            >
                {children}
            </div>
        </section>
    );
}

export default RunSummarySection;
