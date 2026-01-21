import { useEffect, useRef, useState } from "react";
import BotSection from "../components/BotSection";
import RunsList from "../components/RunsList";
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
const runSummaries = [
    {
        id: "run-0920",
        label: "Morning clearance run",
        passed: 6,
        avgDiscount: "56.6%",
        gambles: 4,
        stores: 9,
        bought: 3,
    },
    {
        id: "run-0921",
        label: "Lunch rush scan",
        passed: 6,
        avgDiscount: "53.4%",
        gambles: 4,
        stores: 8,
        bought: 2,
    },
    {
        id: "run-0922",
        label: "After hours test",
        passed: 2,
        avgDiscount: "56.9%",
        gambles: 1,
        stores: 3,
        bought: 1,
    },
    {
        id: "run-0923",
        label: "Weekend sweep",
        passed: 6,
        avgDiscount: "54.1%",
        gambles: 4,
        stores: 10,
        bought: 4,
    },
    {
        id: "run-0924",
        label: "Quick spot check",
        passed: 6,
        avgDiscount: "50.2%",
        gambles: 4,
        stores: 7,
        bought: 2,
    },
];
const devOptionalGroups = [
    {
        id: "core",
        label: "Core run config",
        fields: [
            {
                id: "MAX_LINKS",
                label: "MAX LINKS",
                placeholder: "20",
                type: "number",
                defaultValue: "20",
            },
            {
                id: "KEEP_OPEN",
                label: "KEEP OPEN",
                placeholder: "1",
                type: "number",
                defaultValue: "1",
            },
        ],
    },
    {
        id: "state",
        label: "Save/load login state",
        fields: [
            {
                id: "SAVE_MERGED_STATE",
                label: "SAVE MERGED STATE",
                placeholder: "1",
                type: "number",
                defaultValue: "1",
            },
            {
                id: "AUTO_LOGIN_SAVE_STATE",
                label: "AUTO LOGIN SAVE STATE",
                placeholder: "1",
                type: "number",
                defaultValue: "1",
            },
            {
                id: "AUTO_LOGIN_WAIT_MINUTES",
                label: "AUTO LOGIN WAIT MINUTES",
                placeholder: "5",
                type: "number",
                defaultValue: "5",
            },
        ],
    },
    {
        id: "pages",
        label: "GitHub Pages export",
        fields: [
            {
                id: "GITHUB_PAGES_EXPORT",
                label: "GITHUB PAGES EXPORT",
                placeholder: "1",
                type: "number",
                defaultValue: "1",
            },
            {
                id: "GITHUB_REPO_DIR",
                label: "GITHUB REPO DIR",
                placeholder: ".",
                type: "text",
                fullWidth: true,
                defaultValue: ".",
            },
            {
                id: "GITHUB_PAGES_DIR",
                label: "GITHUB PAGES DIR",
                placeholder: "docs",
                type: "text",
                defaultValue: "docs",
            },
            {
                id: "PUBLIC_SUMMARY_BASE_URL",
                label: "PUBLIC SUMMARY BASE URL",
                placeholder: "https://<user>.github.io/<repo>",
                type: "url",
                fullWidth: true,
            },
        ],
    },
    {
        id: "autopush",
        label: "GitHub auto-push",
        fields: [
            {
                id: "GITHUB_AUTOPUSH",
                label: "GITHUB AUTOPUSH",
                placeholder: "1",
                type: "number",
                defaultValue: "1",
            },
            {
                id: "GITHUB_AUTOPUSH_MODE",
                label: "GITHUB AUTOPUSH MODE",
                placeholder: "pass",
                type: "text",
                defaultValue: "pass",
            },
            {
                id: "GITHUB_AUTOPUSH_DEBOUNCE_MS",
                label: "GITHUB AUTOPUSH DEBOUNCE MS",
                placeholder: "60000",
                type: "number",
                defaultValue: "60000",
            },
            {
                id: "GITHUB_AUTOPUSH_REMOTE",
                label: "GITHUB AUTOPUSH REMOTE",
                placeholder: "origin",
                type: "text",
                defaultValue: "origin",
            },
            {
                id: "GITHUB_AUTOPUSH_BRANCH",
                label: "GITHUB AUTOPUSH BRANCH",
                placeholder: "main",
                type: "text",
                defaultValue: "main",
            },
        ],
    },
    {
        id: "email",
        label: "Email notifications",
        fields: [
            {
                id: "EMAIL_ON_FIRST_RESULT",
                label: "EMAIL ON FIRST RESULT",
                placeholder: "0",
                type: "number",
                defaultValue: "0",
            },
            {
                id: "EMAIL_TO",
                label: "EMAIL TO",
                placeholder: "you@example.com",
                type: "email",
            },
            {
                id: "EMAIL_FROM",
                label: "EMAIL FROM",
                placeholder: "bot@example.com",
                type: "email",
            },
            {
                id: "EMAIL_FROM_NAME",
                label: "EMAIL FROM NAME",
                placeholder: "TurboSearch Bot",
                type: "text",
            },
            {
                id: "SMTP_HOST",
                label: "SMTP HOST",
                placeholder: "smtp.example.com",
                type: "text",
            },
            {
                id: "SMTP_PORT",
                label: "SMTP PORT",
                placeholder: "587",
                type: "number",
                defaultValue: "587",
            },
            {
                id: "SMTP_SECURE",
                label: "SMTP SECURE",
                placeholder: "0",
                type: "number",
                defaultValue: "0",
            },
            {
                id: "SMTP_USER",
                label: "SMTP USER",
                placeholder: "",
                type: "text",
            },
            {
                id: "SMTP_PASS",
                label: "SMTP PASS",
                placeholder: "",
                type: "password",
                fullWidth: true,
            },
        ],
    },
    {
        id: "alert",
        label: "Discount alert email",
        fields: [
            {
                id: "ALERT_DEFAULT_QTY",
                label: "ALERT DEFAULT QTY",
                placeholder: "1",
                type: "number",
                defaultValue: "1",
            },
        ],
    },
    {
        id: "sellerboard",
        label: "Sellerboard COGS automation",
        fields: [
            {
                id: "SHEET_URL",
                label: "SHEET URL",
                placeholder:
                    "https://docs.google.com/spreadsheets/d/<id>/edit?gid=0#gid=0",
                type: "url",
                fullWidth: true,
            },
            {
                id: "GOOGLE_SHEET_TAB",
                label: "GOOGLE SHEET TAB",
                placeholder: "Sheet1",
                type: "text",
                defaultValue: "Sheet1",
            },
            {
                id: "GOOGLE_SHEET_RANGE_A1",
                label: "GOOGLE SHEET RANGE A1",
                placeholder: "Sheet1!A1:ZZ",
                type: "text",
                defaultValue: "Sheet1!A1:ZZ",
            },
            {
                id: "GOOGLE_SERVICE_ACCOUNT_JSON",
                label: "GOOGLE SERVICE ACCOUNT JSON",
                placeholder: "/abs/path/to/service-account.json",
                type: "text",
                fullWidth: true,
            },
        ],
    },
];
const devOptionalFields = devOptionalGroups.flatMap((group) => group.fields);
const scouterRows = [
    {
        id: "scout-1",
        name: "TS Scout",
        website: "TurboSearch",
        status: "Working",
        runtime: "01:24:06",
        icon: "travel_explore",
        tone: "peach",
    },
    {
        id: "scout-2",
        name: "TS Scout",
        website: "TurboSearch",
        status: "Paused",
        runtime: "01:24:06",
        icon: "travel_explore",
        tone: "peach",
    },
    {
        id: "scout-3",
        name: "TS Scout",
        website: "TurboSearch",
        status: "Error",
        runtime: "01:24:06",
        icon: "travel_explore",
        tone: "peach",
    },
];

function Scouters() {
    const [runMode, setRunMode] = useState("normal");
    const [isModeMenuOpen, setIsModeMenuOpen] = useState(false);
    const modeMenuRef = useRef(null);
    const [isAddFieldMenuOpen, setIsAddFieldMenuOpen] = useState(false);
    const addFieldMenuRef = useRef(null);
    const [optionalFieldIds, setOptionalFieldIds] = useState([]);
    const [optionalFieldValues, setOptionalFieldValues] = useState({});
    const [accountId, setAccountId] = useState("");
    const [tripName, setTripName] = useState("");
    const [discountPercent, setDiscountPercent] = useState("50");
    const [alertThreshold, setAlertThreshold] = useState("65");
    const [alertEmail, setAlertEmail] = useState("cnc.onlinedeals@gmail.com");
    const [itemLinks, setItemLinks] = useState("");
    const [selectedListId, setSelectedListId] = useState("");
    const modeLabel = runMode === "dev" ? "Dev Mode" : "Normal Mode";
    const modeDescription =
        runMode === "dev" ? "Dev run configuration" : "Normal run configuration";

    useEffect(() => {
        if (!isModeMenuOpen) return;
        const handleClick = (event) => {
            if (
                modeMenuRef.current &&
                !modeMenuRef.current.contains(event.target)
            ) {
                setIsModeMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [isModeMenuOpen]);

    useEffect(() => {
        if (!isAddFieldMenuOpen) return;
        const handleClick = (event) => {
            if (
                addFieldMenuRef.current &&
                !addFieldMenuRef.current.contains(event.target)
            ) {
                setIsAddFieldMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [isAddFieldMenuOpen]);

    useEffect(() => {
        if (runMode !== "dev") {
            setIsAddFieldMenuOpen(false);
        }
    }, [runMode]);

    const handleListChange = (event) => {
        const listId = event.target.value;
        setSelectedListId(listId);

        const selectedList = savedLists.find((list) => list.id === listId);
        if (selectedList) {
            setItemLinks(selectedList.links.join("\n"));
        }
    };

    const handleOptionalFieldChange = (fieldId) => (event) => {
        const value = event.target.value;
        setOptionalFieldValues((prev) => ({ ...prev, [fieldId]: value }));
    };

    const handleToggleOptionalField = (fieldId) => {
        const isAdded = optionalFieldIds.includes(fieldId);
        const field = devOptionalFields.find((item) => item.id === fieldId);
        setOptionalFieldIds((prev) =>
            isAdded ? prev.filter((id) => id !== fieldId) : [...prev, fieldId]
        );
        setOptionalFieldValues((prev) => {
            const hasValue = Object.prototype.hasOwnProperty.call(prev, fieldId);
            if (isAdded) {
                if (!hasValue) return prev;
                const next = { ...prev };
                delete next[fieldId];
                return next;
            }
            if (hasValue) return prev;
            if (field?.defaultValue != null) {
                return { ...prev, [fieldId]: String(field.defaultValue) };
            }
            return prev;
        });
    };

    const addedOptionalFields = optionalFieldIds
        .map((fieldId) =>
            devOptionalFields.find((field) => field.id === fieldId)
        )
        .filter(Boolean);
    const getOptionalFieldValue = (field) => {
        if (Object.prototype.hasOwnProperty.call(optionalFieldValues, field.id)) {
            return optionalFieldValues[field.id];
        }
        return field.defaultValue ?? "";
    };
    const isOptionalFieldFilled = (field) =>
        String(getOptionalFieldValue(field) ?? "").trim().length > 0;
    const baseReady =
        accountId.trim().length > 0 &&
        tripName.trim().length > 0 &&
        itemLinks.trim().length > 0 &&
        alertEmail.trim().length > 0 &&
        discountPercent.trim().length > 0 &&
        alertThreshold.trim().length > 0;
    const optionalReady =
        runMode === "dev"
            ? addedOptionalFields.every((field) => isOptionalFieldFilled(field))
            : true;
    const isReadyToRun = baseReady && optionalReady;

    return (
        <main className="dashboard scouters-page">
            <div className="page-title-row">
                <span className="icon-chip tone-peach page-title-icon">
                    <span className="material-icons-round" aria-hidden="true">
                        travel_explore
                    </span>
                </span>
                <h1 className="page-title page-title-large">Scouters</h1>
            </div>

            <section className="stats-grid scouters-stats">
        <StatToggleCard
          label="Items Found"
          value={itemsFound.value}
          note={itemsFound.note}
          accent="mint"
        />
        <StatToggleCard
          label="Estimated Sales Profit"
          value={profit.value}
          note={profit.note}
          accent="gold"
        />
        <StatCard
          label="Avg Discount % (Bot Runs)"
          value="18.4%"
          accent="mint"
          meta="Across all scouter runs"
          variant="stacked"
          showMenu
        />
        <StatCard
          label="Avg Discount % (Receipts)"
          value="22.1%"
          accent="gold"
          meta="All receipts scanned"
          variant="stacked"
          showMenu
        />
            </section>

            <section className="bot-area">
                <BotSection
                    title="Active Bots"
                    accent="peach"
                    rows={scouterRows}
                    newLabel="New Scouter"
                    showHeader
                    showHeaderIcon={false}
                    showNewButton={false}
                />
            </section>

            <section className="panel launch-panel">
                <div className="launch-header">
                    <div>
                        <h2>Launch New Bot</h2>
                        <p>{modeDescription}</p>
                    </div>
                    <div className="mode-select" ref={modeMenuRef}>
                        <button
                            className={`mode-button${
                                isModeMenuOpen ? " open" : ""
                            }`}
                            type="button"
                            aria-haspopup="menu"
                            aria-expanded={isModeMenuOpen}
                            onClick={() =>
                                setIsModeMenuOpen((prev) => !prev)
                            }
                        >
                            <span>{modeLabel}</span>
                            <span
                                className="material-icons-round"
                                aria-hidden="true"
                            >
                                expand_more
                            </span>
                        </button>
                        {isModeMenuOpen ? (
                            <div className="mode-menu" role="menu">
                                {[
                                    { id: "normal", label: "Normal Mode" },
                                    { id: "dev", label: "Dev Mode" },
                                ].map((option) => (
                                    <button
                                        key={option.id}
                                        className={`mode-menu-item${
                                            runMode === option.id
                                                ? " active"
                                                : ""
                                        }`}
                                        type="button"
                                        role="menuitemradio"
                                        aria-checked={runMode === option.id}
                                        onClick={() => {
                                            setRunMode(option.id);
                                            setIsModeMenuOpen(false);
                                        }}
                                    >
                                        <span>{option.label}</span>
                                        <span className="mode-menu-icon">
                                            {runMode === option.id ? (
                                                <span
                                                    className="material-icons-round"
                                                    aria-hidden="true"
                                                >
                                                    check
                                                </span>
                                            ) : null}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
                <form
                    className="launch-form"
                    onSubmit={(event) => event.preventDefault()}
                >
                    <label className="form-field">
                        <span>Account ID</span>
                        <input
                            type="text"
                            placeholder="Account ID"
                            value={accountId}
                            onChange={(event) =>
                                setAccountId(event.target.value)
                            }
                            required
                        />
                    </label>
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
                    {runMode === "dev"
                        ? addedOptionalFields.map((field) => (
                              <label
                                  key={field.id}
                                  className={`form-field optional-field${
                                      field.fullWidth ? " field-span-2" : ""
                                  }`}
                              >
                                  <span>{field.label}</span>
                                  <input
                                      type={field.type}
                                      placeholder={field.placeholder}
                                      value={getOptionalFieldValue(field)}
                                      onChange={handleOptionalFieldChange(
                                          field.id
                                      )}
                                  />
                              </label>
                          ))
                        : null}
                    {runMode === "dev" ? (
                        <div className="form-field field-span-2 add-field-row">
                            <span>Add Optional Field</span>
                            <div className="add-field" ref={addFieldMenuRef}>
                                <button
                                    className={`add-field-button${
                                        isAddFieldMenuOpen ? " open" : ""
                                    }`}
                                    type="button"
                                    aria-haspopup="menu"
                                    aria-expanded={isAddFieldMenuOpen}
                                    onClick={() =>
                                        setIsAddFieldMenuOpen((prev) => !prev)
                                    }
                                >
                                    <span
                                        className="material-icons-outlined"
                                        aria-hidden="true"
                                    >
                                        add
                                    </span>
                                    <span className="add-field-button-label">
                                        Add field
                                    </span>
                                    <span
                                        className="material-icons-outlined"
                                        aria-hidden="true"
                                    >
                                        expand_more
                                    </span>
                                </button>
                                {isAddFieldMenuOpen ? (
                                    <div className="add-field-menu" role="menu">
                                        {devOptionalGroups.map((group) => (
                                            <div
                                                key={group.id}
                                                className="add-field-group"
                                            >
                                                <p className="add-field-group-label">
                                                    {group.label}
                                                </p>
                                                {group.fields.map((field) => {
                                                    const isAdded =
                                                        optionalFieldIds.includes(
                                                            field.id
                                                        );
                                                    return (
                                                        <button
                                                            key={field.id}
                                                            className={`add-field-item${
                                                                isAdded
                                                                    ? " added"
                                                                    : ""
                                                            }`}
                                                            type="button"
                                                            role="menuitemcheckbox"
                                                            aria-checked={isAdded}
                                                            onClick={() =>
                                                                handleToggleOptionalField(
                                                                    field.id
                                                                )
                                                            }
                                                        >
                                                            <span className="add-field-item-label">
                                                                {field.label}
                                                            </span>
                                                            <span className="add-field-item-state">
                                                                {isAdded ? (
                                                                    <span
                                                                        className="material-icons-outlined"
                                                                        aria-hidden="true"
                                                                    >
                                                                        check
                                                                    </span>
                                                                ) : null}
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ) : null}
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

            <section className="panel runs-panel">
                <div className="runs-header">
                    <div>
                        <h2>Recent Runs</h2>
                        <p>Summaries from your latest scouter sessions</p>
                    </div>
                    <button className="ghost-button" type="button">
                        View all
                    </button>
                </div>
                <RunsList runs={runSummaries} />
            </section>
        </main>
    );
}

export default Scouters;
