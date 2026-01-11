const formatMoney = (value) => {
    if (value == null || !Number.isFinite(Number(value))) return "-";
    return `$${Number(value).toFixed(2)}`;
};

const formatPct = (value) => {
    if (value == null || !Number.isFinite(Number(value))) return "-";
    return `${Number(value).toFixed(1)}%`;
};

function RunItemCard({ item }) {
    const storeTitle =
        item.storeLine ||
        (item.storeId ? `Store #${item.storeId}` : "Store");
    const address = item.address || "Address unavailable";
    const keepaFound = Boolean(item.keepa && item.keepa.found);

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

    const priceFields = [
        { label: "Turbo price", value: formatMoney(item.price) },
        { label: "Marter price", value: formatMoney(item.marterPrice) },
        {
            label: "Keepa price",
            value: keepaFound ? formatMoney(item.keepa.price) : "-",
        },
        { label: "Discount", value: formatPct(item.discountPct) },
    ];

    const stockFields = [
        { label: "Floor stock", value: item.floor ?? "-" },
        { label: "Back stock", value: item.back ?? "-" },
        { label: "Aisles", value: item.aisles || "N/A" },
        { label: "Item ID", value: item.itemId || "-" },
    ];

    const keepaFields = keepaFound
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
        : [{ label: "UPC", value: item.upc || "-" }];

    return (
        <article className="run-item-card">
            <div className="run-item-header">
                <div>
                    <h3 className="run-item-title">{storeTitle}</h3>
                    <p className="run-item-subtitle">{address}</p>
                </div>
                <div className="run-item-tags">
                    {tags.map((tag) => (
                        <span key={tag.label} className={`tag tag-${tag.tone}`}>
                            {tag.label}
                        </span>
                    ))}
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

            <div className="run-item-grid run-item-grid-compact">
                {keepaFields.map((field) => (
                    <div key={field.label} className="run-item-field">
                        <span>{field.label}</span>
                        <strong>{field.value}</strong>
                    </div>
                ))}
            </div>

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
