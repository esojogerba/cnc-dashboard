function RunSummaryTabs({ activeTab, onTabChange, counts }) {
    const tabs = [
        {
            id: "passed",
            label: "Passed",
            count: counts?.passed,
        },
        {
            id: "gambles",
            label: "Gambles",
            count: counts?.gambles,
        },
        {
            id: "receipt",
            label: "Receipt",
            count: counts?.receipt,
        },
    ];

    return (
        <div className="summary-tabs">
            <div className="summary-tabs-meta">
                <p className="summary-tabs-label">Browse</p>
                <h2 className="summary-tabs-title">Run Results</h2>
            </div>
            <div className="summary-tabs-row">
                <div className="summary-tabs-controls" role="tablist">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            className={`summary-tab-button summary-tab-${tab.id}${
                                activeTab === tab.id ? " active" : ""
                            }`}
                            aria-selected={activeTab === tab.id}
                            onClick={() => onTabChange(tab.id)}
                        >
                            <span>{tab.label}</span>
                            {typeof tab.count === "number" ? (
                                <span className="summary-tab-count">{tab.count}</span>
                            ) : null}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RunSummaryTabs;
