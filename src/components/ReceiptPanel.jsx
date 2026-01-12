import { useEffect, useState } from "react";

const formatMoney = (value) => {
    if (value == null || !Number.isFinite(Number(value))) return "-";
    return `$${Number(value).toFixed(2)}`;
};

const formatPct = (value) => {
    if (value == null || !Number.isFinite(Number(value))) return "-";
    return `${Number(value).toFixed(1)}%`;
};

function ReceiptPanel({
    items,
    isActive = false,
    embedded = false,
    onItemsChange,
}) {
    const safeItems = Array.isArray(items) ? items : [];
    const [localItems, setLocalItems] = useState(safeItems);
    const [draftQtyById, setDraftQtyById] = useState({});

    useEffect(() => {
        if (!onItemsChange) {
            setLocalItems(safeItems);
        }
    }, [onItemsChange, safeItems]);

    const lineItems = onItemsChange ? safeItems : localItems;
    const setItems = (nextItems) => {
        if (onItemsChange) {
            onItemsChange(nextItems);
        } else {
            setLocalItems(nextItems);
        }
    };

    useEffect(() => {
        setDraftQtyById((prev) => {
            const next = {};
            lineItems.forEach((item) => {
                if (prev[item.id] === "") {
                    next[item.id] = "";
                } else {
                    next[item.id] = String(item.qty ?? 1);
                }
            });
            return next;
        });
    }, [lineItems]);

    const totalQty = lineItems.reduce(
        (sum, item) => sum + (item.qty || 0),
        0
    );
    const totalCost = lineItems.reduce(
        (sum, item) => sum + (Number(item.unitCost) || 0) * (item.qty || 0),
        0
    );
    const totalSales = lineItems.reduce(
        (sum, item) => sum + (Number(item.unitSales) || 0) * (item.qty || 0),
        0
    );
    const profit = totalSales - totalCost;

    const handleQtyChange = (id, value) => {
        setDraftQtyById((prev) => ({ ...prev, [id]: value }));
        if (value === "") return;
        const parsed = Number.parseInt(value, 10);
        if (!Number.isFinite(parsed)) return;
        if (parsed <= 0) {
            setItems(lineItems.filter((item) => item.id !== id));
            return;
        }
        const nextQty = Math.max(1, parsed);
        setItems(
            lineItems.map((item) =>
                item.id === id ? { ...item, qty: nextQty } : item
            )
        );
    };

    const handleQtyCommit = (id, value) => {
        const currentQty = lineItems.find((item) => item.id === id)?.qty ?? 1;
        if (value === "") {
            setDraftQtyById((prev) => ({
                ...prev,
                [id]: String(currentQty),
            }));
            return;
        }
        const parsed = Number.parseInt(value, 10);
        if (!Number.isFinite(parsed)) {
            setDraftQtyById((prev) => ({
                ...prev,
                [id]: String(currentQty),
            }));
            return;
        }
        if (parsed <= 0) {
            setItems(lineItems.filter((item) => item.id !== id));
            return;
        }
        const nextQty = Math.max(1, parsed);
        setDraftQtyById((prev) => ({
            ...prev,
            [id]: String(nextQty),
        }));
        setItems(
            lineItems.map((item) =>
                item.id === id ? { ...item, qty: nextQty } : item
            )
        );
    };

    const handleRemove = (id) => {
        setItems(lineItems.filter((item) => item.id !== id));
    };

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
                    <strong>{lineItems.length}</strong>
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

            {lineItems.length ? (
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
                                <th className="num">Profit</th>
                                <th className="num">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lineItems.map((item) => {
                                const unitCost = Number(item.unitCost) || 0;
                                const unitSales = Number(item.unitSales) || 0;
                                const lineQty = item.qty || 0;
                                const lineCost = unitCost * lineQty;
                                const lineSales = unitSales * lineQty;
                                const lineProfit = lineSales - lineCost;
                                const qtyValue = Object.prototype.hasOwnProperty.call(
                                    draftQtyById,
                                    item.id
                                )
                                    ? draftQtyById[item.id]
                                    : String(item.qty ?? 1);
                                const discountPct =
                                    unitSales > 0
                                        ? (1 - unitCost / unitSales) * 100
                                        : null;

                                return (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="receipt-item-cell">
                                                <strong>{item.itemId}</strong>
                                                <span>
                                                    Discount{" "}
                                                    {formatPct(discountPct)}
                                                </span>
                                            </div>
                                        </td>
                                        <td>{item.storeLine}</td>
                                        <td className="num">
                                            <input
                                                className="receipt-qty-input"
                                                type="number"
                                                min="1"
                                                step="1"
                                                value={qtyValue}
                                                onChange={(event) =>
                                                    handleQtyChange(
                                                        item.id,
                                                        event.target.value
                                                    )
                                                }
                                                onBlur={(event) =>
                                                    handleQtyCommit(
                                                        item.id,
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="num">
                                            {formatMoney(unitCost)}
                                        </td>
                                        <td className="num">
                                            {formatMoney(lineCost)}
                                        </td>
                                        <td className="num">
                                            {formatMoney(unitSales)}
                                        </td>
                                        <td className="num">
                                            {formatMoney(lineSales)}
                                        </td>
                                        <td className="num">
                                            {formatMoney(lineProfit)}
                                        </td>
                                        <td className="num">
                                            <button
                                                className="receipt-remove-button"
                                                type="button"
                                                onClick={() =>
                                                    handleRemove(item.id)
                                                }
                                                aria-label={`Remove ${item.itemId}`}
                                            >
                                                <span
                                                    className="material-icons-outlined"
                                                    aria-hidden="true"
                                                >
                                                    delete
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
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
