const formatMoney = (value) => {
    if (value == null || !Number.isFinite(Number(value))) return "-";
    return `$${Number(value).toFixed(2)}`;
};

const formatPct = (value) => {
    if (value == null || !Number.isFinite(Number(value))) return "-";
    return `${Number(value).toFixed(1)}%`;
};

function RunItemCard({
    item,
    dataView = "walmart",
    showReceiptToggle = false,
    isInReceipt = false,
    onReceiptToggle,
    receiptQty = 1,
    onReceiptQtyChange,
    onReceiptQtyCommit,
}) {
    const storeTitle =
        item.storeLine ||
        (item.storeId ? `Store #${item.storeId}` : "Store");
    const address = item.address || "Address unavailable";
    const keepaFound = Boolean(item.keepa && item.keepa.found);
    const keepaTitle = keepaFound ? item.keepa.title : null;
    const isAmazonView = dataView === "amazon";
    const headerTitle =
        isAmazonView && keepaTitle
            ? `${storeTitle} — ${keepaTitle}`
            : storeTitle;
    const qtyValue =
        receiptQty === null || receiptQty === undefined
            ? ""
            : String(receiptQty);

    const tags = [];
    if (item.pass) tags.push({ label: "Pass", tone: "pass" });
    if (item.lowNAGamble) tags.push({ label: "Low/N/A", tone: "gamble" });
    if (keepaFound) tags.push({ label: "Amazon", tone: "amazon" });

    if (item.fulfillment) {
        if (item.fulfillment.status === "BLOCKED") {
            tags.push({ label: "Blocked", tone: "blocked" });
        } else {
            if (item.fulfillment.pickup) {
                tags.push({ label: "Pickup", tone: "pickup" });
            }
            if (item.fulfillment.delivery) {
                tags.push({ label: "Delivery", tone: "delivery" });
            }
            if (!item.fulfillment.pickup && !item.fulfillment.delivery) {
                tags.push({ label: "Fulfillment?", tone: "unknown" });
            }
        }
    }

    const priceFields = isAmazonView
        ? [
              {
                  label: "Keepa price",
                  value: keepaFound ? formatMoney(item.keepa.price) : "-",
              },
              { label: "Turbo price", value: formatMoney(item.price) },
              { label: "Discount", value: formatPct(item.discountPct) },
              { label: "Marter price", value: formatMoney(item.marterPrice) },
          ]
        : [
              { label: "Turbo price", value: formatMoney(item.price) },
              { label: "Marter price", value: formatMoney(item.marterPrice) },
              { label: "Discount", value: formatPct(item.discountPct) },
              {
                  label: "Keepa price",
                  value: keepaFound ? formatMoney(item.keepa.price) : "-",
              },
          ];

    const stockFields = [
        { label: "Floor stock", value: item.floor ?? "-" },
        { label: "Back stock", value: item.back ?? "-" },
        { label: "Aisles", value: item.aisles || "N/A" },
        { label: "Item ID", value: item.itemId || "-" },
    ];

    const keepaFields = isAmazonView
        ? keepaFound
            ? [
                  {
                      label: "Keepa rank",
                      value: item.keepa.rank ? `#${item.keepa.rank}` : "-",
                  },
                  {
                      label: "Bought/mo",
                      value: item.keepa.boughtPastMonth || "-",
                  },
                  { label: "ASIN", value: item.keepa.asin || "-" },
                  { label: "UPC", value: item.upc || "-" },
              ]
            : [{ label: "Keepa", value: "Not found" }]
        : [];

    return (
        <article
            className={`run-item-card${
                isAmazonView ? " run-item-card-amazon" : ""
            }`}
        >
            <div className="run-item-header">
                <div className="run-item-heading">
                    <h3 className="run-item-title">{headerTitle}</h3>
                    <p className="run-item-subtitle">{address}</p>
                </div>
                <div className="run-item-controls">
                    {showReceiptToggle ? (
                        <label className="receipt-toggle">
                            <input
                                type="checkbox"
                                checked={isInReceipt}
                                onChange={(event) =>
                                    onReceiptToggle?.(item, event.target.checked)
                                }
                            />
                            <span
                                className="receipt-toggle-box"
                                aria-hidden="true"
                            >
                                <span className="material-icons-outlined">
                                    check
                                </span>
                            </span>
                            <input
                                className="receipt-toggle-qty"
                                type="number"
                                min="1"
                                step="1"
                                value={qtyValue}
                                onChange={(event) =>
                                    onReceiptQtyChange?.(
                                        item,
                                        event.target.value
                                    )
                                }
                                onBlur={(event) =>
                                    onReceiptQtyCommit?.(
                                        item,
                                        event.target.value
                                    )
                                }
                                onClick={(event) => event.stopPropagation()}
                                onMouseDown={(event) => event.stopPropagation()}
                                aria-label={`Quantity for ${storeTitle}`}
                            />
                            <span className="receipt-toggle-label">
                                {isInReceipt
                                    ? "In receipt"
                                    : "Add to receipt"}
                            </span>
                        </label>
                    ) : null}
                    <div className="run-item-tags">
                        {tags.map((tag) => (
                            <span key={tag.label} className={`tag tag-${tag.tone}`}>
                                {tag.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="run-item-grid">
                {priceFields.map((field) => (
                    <div key={field.label} className="run-item-field">
                        <span>{field.label}</span>
                        <strong>{field.value}</strong>
                    </div>
                ))}
            </div>

            <div className="run-item-grid">
                {stockFields.map((field) => (
                    <div key={field.label} className="run-item-field">
                        <span>{field.label}</span>
                        <strong>{field.value}</strong>
                    </div>
                ))}
            </div>

            {keepaFields.length ? (
                <div className="run-item-grid run-item-grid-compact">
                    {keepaFields.map((field) => (
                        <div key={field.label} className="run-item-field">
                            <span>{field.label}</span>
                            <strong>{field.value}</strong>
                        </div>
                    ))}
                </div>
            ) : null}

            <div className="run-item-actions">
                {item.walmartLink ? (
                    <a
                        className="ghost-button ghost-link"
                        href={item.walmartLink}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Walmart link
                    </a>
                ) : null}
                {item.keepa?.keepaUrl ? (
                    <a
                        className="ghost-button ghost-link"
                        href={item.keepa.keepaUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Keepa
                    </a>
                ) : null}
                {item.sourceLink ? (
                    <a
                        className="ghost-button ghost-link"
                        href={item.sourceLink}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Source link
                    </a>
                ) : null}
            </div>
        </article>
    );
}

export default RunItemCard;
