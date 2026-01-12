const formatMoney = (value) => {
    if (value == null || !Number.isFinite(Number(value))) return "-";
    return `$${Number(value).toFixed(2)}`;
};

function ReceiptPanel({ items, isActive = false, embedded = false }) {
    const totalQty = items.reduce((sum, item) => sum + (item.qty || 0), 0);
    const totalCost = items.reduce(
        (sum, item) => sum + (Number(item.unitCost) || 0) * (item.qty || 0),
        0
    );
    const totalSales = items.reduce(
        (sum, item) => sum + (Number(item.unitSales) || 0) * (item.qty || 0),
        0
    );
    const profit = totalSales - totalCost;

    const panelClassName = [
        "receipt-panel",
        !embedded && isActive ? "active" : "",
        embedded ? "receipt-panel-embedded" : "panel",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <section className={panelClassName}>
            <div className="receipt-header">
                <div>
                    <h2>Receipt</h2>
                    <p>Items marked as bought in this run</p>
                </div>
                <div className="receipt-actions">
                    <button className="ghost-button" type="button">
                        Copy for Sheets
                    </button>
                    <button className="ghost-button" type="button">
                        Download CSV
                    </button>
                </div>
            </div>

            <div className="receipt-totals">
                <div className="receipt-total-card">
                    <span>Items</span>
                    <strong>{items.length}</strong>
                </div>
                <div className="receipt-total-card">
                    <span>Total Qty</span>
                    <strong>{totalQty}</strong>
                </div>
                <div className="receipt-total-card">
                    <span>Total Cost</span>
                    <strong>{formatMoney(totalCost)}</strong>
                </div>
                <div className="receipt-total-card">
                    <span>Est. Sales</span>
                    <strong>{formatMoney(totalSales)}</strong>
                </div>
                <div className="receipt-total-card">
                    <span>Est. Profit</span>
                    <strong>{formatMoney(profit)}</strong>
                </div>
            </div>

            {items.length ? (
                <div className="receipt-table-wrapper">
                    <table className="receipt-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Store</th>
                                <th className="num">Qty</th>
                                <th className="num">Unit Cost</th>
                                <th className="num">Cost</th>
                                <th className="num">Unit Sales</th>
                                <th className="num">Sales</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.itemId}</td>
                                    <td>{item.storeLine}</td>
                                    <td className="num">{item.qty}</td>
                                    <td className="num">
                                        {formatMoney(item.unitCost)}
                                    </td>
                                    <td className="num">
                                        {formatMoney(item.unitCost * item.qty)}
                                    </td>
                                    <td className="num">
                                        {formatMoney(item.unitSales)}
                                    </td>
                                    <td className="num">
                                        {formatMoney(item.unitSales * item.qty)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="receipt-empty">No items bought yet.</p>
            )}
        </section>
    );
}

export default ReceiptPanel;
