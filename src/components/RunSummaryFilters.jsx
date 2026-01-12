const viewOptions = [
    { id: "walmart", label: "Walmart" },
    { id: "amazon", label: "Amazon" },
];

function RunSummaryFilters({
    dataView,
    onDataViewChange,
    filters,
    onFiltersChange,
    aisleOptions,
    storeOptions,
    defaultFilters = {
        minDiscount: "30",
        minFloor: "2",
        minBack: "2",
        aisle: "all",
        store: "all",
        fulfillment: "all",
    },
}) {
    const handleChange = (key) => (event) => {
        const value = event.target.value;
        onFiltersChange((prev) => ({ ...prev, [key]: value }));
    };

    const handleReset = () => {
        onFiltersChange({ ...defaultFilters });
    };

    const isResetDisabled = Object.keys(defaultFilters).every(
        (key) =>
            String(filters[key] ?? "") === String(defaultFilters[key] ?? "")
    );

    return (
        <section className="panel run-filters">
            <div className="filter-header">
                <span className="material-icons-outlined" aria-hidden="true">
                    tune
                </span>
                <h2>Filters</h2>
            </div>
            <div className="filter-view">
                <span className="filter-title">Data View</span>
                <div
                    className="view-toggle"
                    role="group"
                    aria-label="Data view"
                >
                    {viewOptions.map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            className={`view-toggle-button${
                                dataView === option.id ? " active" : ""
                            }`}
                            onClick={() => onDataViewChange(option.id)}
                            aria-pressed={dataView === option.id}
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
                        placeholder="30"
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
            <div className="filter-actions">
                <button
                    className="ghost-button filter-reset-button"
                    type="button"
                    onClick={handleReset}
                    disabled={isResetDisabled}
                >
                    Reset filters
                </button>
            </div>
        </section>
    );
}

export default RunSummaryFilters;
