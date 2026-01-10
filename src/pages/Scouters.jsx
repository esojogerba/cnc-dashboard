import { useState } from "react";
import StatCard from "../components/StatCard";
import StatToggleCard from "../components/StatToggleCard";

const itemsFound = { value: "69", note: "Today" };
const profit = { value: "$1,260", note: "Net after fees" };
const savedLists = [
    {
        id: "favorites",
        name: "Favorite Items",
        links: [
            "https://example.com/item/alpha",
            "https://example.com/item/bravo",
            "https://example.com/item/charlie",
        ],
    },
    {
        id: "recent-buys",
        name: "Previously Bought",
        links: [
            "https://example.com/item/delta",
            "https://example.com/item/echo",
            "https://example.com/item/foxtrot",
        ],
    },
    {
        id: "clearance",
        name: "Clearance Watchlist",
        links: [
            "https://example.com/item/golf",
            "https://example.com/item/hotel",
            "https://example.com/item/india",
        ],
    },
];

function Scouters() {
    const [tripName, setTripName] = useState("");
    const [discountPercent, setDiscountPercent] = useState("50");
    const [alertThreshold, setAlertThreshold] = useState("65");
    const [alertEmail, setAlertEmail] = useState("cnc.onlinedeals@gmail.com");
    const [itemLinks, setItemLinks] = useState("");
    const [selectedListId, setSelectedListId] = useState("");

    const isReadyToRun =
        tripName.trim().length > 0 &&
        itemLinks.trim().length > 0 &&
        alertEmail.trim().length > 0 &&
        discountPercent.trim().length > 0 &&
        alertThreshold.trim().length > 0;

    const handleListChange = (event) => {
        const listId = event.target.value;
        setSelectedListId(listId);

        const selectedList = savedLists.find((list) => list.id === listId);
        if (selectedList) {
            setItemLinks(selectedList.links.join("\n"));
        }
    };

    return (
        <main className="dashboard">
            <h1 className="page-title">Scouters</h1>

            <section className="stats-grid scouters-stats">
                <StatToggleCard
                    label="Items Found"
                    value={itemsFound.value}
                    note={itemsFound.note}
                    accent="mint"
                    icon="travel_explore"
                />
                <StatToggleCard
                    label="Estimated Sales Profit"
                    value={profit.value}
                    note={profit.note}
                    accent="gold"
                    icon="paid"
                />
                <StatCard
                    label="Avg Discount % (Bot Runs)"
                    value="18.4%"
                    accent="mint"
                    meta="Across all scouter runs"
                    icon="percent"
                    variant="stacked"
                    showMenu
                />
                <StatCard
                    label="Avg Discount % (Receipts)"
                    value="22.1%"
                    accent="gold"
                    meta="All receipts scanned"
                    icon="percent"
                    variant="stacked"
                    showMenu
                />
            </section>

            <section className="panel launch-panel">
                <div className="launch-header">
                    <div>
                        <h2>Launch New Bot</h2>
                        <p>Normal run configuration</p>
                    </div>
                    <span className="launch-badge">Normal Mode</span>
                </div>
                <form
                    className="launch-form"
                    onSubmit={(event) => event.preventDefault()}
                >
                    <label className="form-field">
                        <span>Trip Name</span>
                        <input
                            type="text"
                            placeholder="Trip YYYY-MM-DD"
                            value={tripName}
                            onChange={(event) =>
                                setTripName(event.target.value)
                            }
                            required
                        />
                    </label>
                    <label className="form-field">
                        <span>Discount Percentage</span>
                        <div className="input-suffix">
                            <input
                                type="number"
                                min="0"
                                max="100"
                                step="1"
                                value={discountPercent}
                                onChange={(event) =>
                                    setDiscountPercent(event.target.value)
                                }
                                required
                            />
                            <span>%</span>
                        </div>
                    </label>
                    <label className="form-field">
                        <span>Alert Discount Threshold</span>
                        <div className="input-suffix">
                            <input
                                type="number"
                                min="0"
                                max="100"
                                step="1"
                                value={alertThreshold}
                                onChange={(event) =>
                                    setAlertThreshold(event.target.value)
                                }
                                required
                            />
                            <span>%</span>
                        </div>
                    </label>
                    <label className="form-field">
                        <span>Alert Email</span>
                        <input
                            type="email"
                            value={alertEmail}
                            onChange={(event) =>
                                setAlertEmail(event.target.value)
                            }
                            required
                        />
                    </label>
                    <label className="form-field field-span-2">
                        <span>Saved Link List</span>
                        <select
                            value={selectedListId}
                            onChange={handleListChange}
                        >
                            <option value="">Select a saved list</option>
                            {savedLists.map((list) => (
                                <option key={list.id} value={list.id}>
                                    {list.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="form-field field-span-2">
                        <span>Item Links</span>
                        <textarea
                            rows="4"
                            placeholder={`Paste item links here, one per line.\nhttps://example.com/item-1`}
                            value={itemLinks}
                            onChange={(event) =>
                                setItemLinks(event.target.value)
                            }
                            required
                        />
                    </label>
                    <div className="launch-actions">
                        <button
                            className="run-button"
                            type="submit"
                            disabled={!isReadyToRun}
                        >
                            Run
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default Scouters;
