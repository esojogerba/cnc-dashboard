const viewOptions = [
    { id: "walmart", label: "Walmart view" },
    { id: "amazon", label: "Amazon view" },
    { id: "receipt", label: "Receipt" },
];

function RunSummaryFilters({
    view,
    onViewChange,
    filters,
    onFiltersChange,
    aisleOptions,
    storeOptions,
}) {
    const handleChange = (key) => (event) => {
        const value = event.target.value;
        onFiltersChange((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <section className="panel run-filters">
            <div className="filter-view">
                <span className="filter-title">View</span>
                <div className="view-toggle" role="group" aria-label="Summary view">
                    {viewOptions.map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            className={`view-toggle-button${
                                view === option.id ? " active" : ""
                            }`}
                            onClick={() => onViewChange(option.id)}
                            aria-pressed={view === option.id}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="filter-fields">
                <label className="filter-field">
                    <span>Min Discount (%)</span>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={filters.minDiscount}
                        onChange={handleChange("minDiscount")}
                        placeholder="20"
                    />
                </label>
                <label className="filter-field">
                    <span>Min Floor Stock</span>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={filters.minFloor}
                        onChange={handleChange("minFloor")}
                        placeholder="2"
                    />
                </label>
                <label className="filter-field">
                    <span>Min Back Stock</span>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={filters.minBack}
                        onChange={handleChange("minBack")}
                        placeholder="2"
                    />
                </label>
                <label className="filter-field">
                    <span>Aisle</span>
                    <select
                        value={filters.aisle}
                        onChange={handleChange("aisle")}
                    >
                        {aisleOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="filter-field">
                    <span>Store</span>
                    <select
                        value={filters.store}
                        onChange={handleChange("store")}
                    >
                        {storeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="filter-field">
                    <span>Fulfillment</span>
                    <select
                        value={filters.fulfillment}
                        onChange={handleChange("fulfillment")}
                    >
                        <option value="all">All</option>
                        <option value="pickup">Pickup</option>
                        <option value="delivery">Delivery</option>
                        <option value="both">Pickup + Delivery</option>
                    </select>
                </label>
            </div>
        </section>
    );
}

export default RunSummaryFilters;
