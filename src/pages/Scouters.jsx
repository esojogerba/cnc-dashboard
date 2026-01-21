import { useEffect, useRef, useState } from "react";
import BotSection from "../components/BotSection";
import RunsList from "../components/RunsList";
import StatCard from "../components/StatCard";
import StatToggleCard from "../components/StatToggleCard";
import scouterBotTypes from "../data/scouter_bot_types.json";

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

const botTypes = scouterBotTypes?.botTypes ?? [];

const buildBaseDefaults = (botType) => {
    const defaults = {};
    if (!botType) return defaults;
    const fields = [
        ...(botType.primaryFields || []),
        ...(botType.linkFields || []),
    ];
    fields.forEach((field) => {
        if (!field?.id) return;
        defaults[field.id] =
            field.defaultValue != null ? String(field.defaultValue) : "";
    });
    return defaults;
};

function Scouters() {
    const [runMode, setRunMode] = useState("normal");
    const [isModeMenuOpen, setIsModeMenuOpen] = useState(false);
    const modeMenuRef = useRef(null);
    const [isAddFieldMenuOpen, setIsAddFieldMenuOpen] = useState(false);
    const addFieldMenuRef = useRef(null);
    const [optionalFieldIds, setOptionalFieldIds] = useState([]);
    const [optionalFieldValues, setOptionalFieldValues] = useState({});
    const initialBotType = botTypes[0] || null;
    const [selectedBotTypeId, setSelectedBotTypeId] = useState(
        () => initialBotType?.id ?? ""
    );
    const [formValues, setFormValues] = useState(() =>
        buildBaseDefaults(initialBotType)
    );
    const modeLabel = runMode === "dev" ? "Dev Mode" : "Normal Mode";
    const modeDescription =
        runMode === "dev" ? "Dev run configuration" : "Normal run configuration";
    const activeBotType =
        botTypes.find((botType) => botType.id === selectedBotTypeId) ||
        initialBotType;
    const primaryFields = activeBotType?.primaryFields ?? [];
    const linkFields = activeBotType?.linkFields ?? [];
    const baseFields = [...primaryFields, ...linkFields];
    const devOptionalGroups = activeBotType?.devOptionalGroups ?? [];
    const devOptionalFields = devOptionalGroups.flatMap(
        (group) => group.fields || []
    );

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

    useEffect(() => {
        setFormValues(buildBaseDefaults(activeBotType));
        setOptionalFieldIds([]);
        setOptionalFieldValues({});
        setIsAddFieldMenuOpen(false);
    }, [activeBotType?.id]);

    const handleFieldChange = (fieldId) => (event) => {
        const value = event.target.value;
        setFormValues((prev) => ({ ...prev, [fieldId]: value }));
    };

    const handleListChange = (field) => (event) => {
        const listId = event.target.value;
        const selectedList = savedLists.find((list) => list.id === listId);
        setFormValues((prev) => {
            const next = { ...prev, [field.id]: listId };
            if (selectedList && field.targetFieldId) {
                next[field.targetFieldId] = selectedList.links.join("\n");
            }
            return next;
        });
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
    const isRequiredFieldFilled = (field) => {
        if (!field?.required) return true;
        return String(formValues[field.id] ?? "").trim().length > 0;
    };
    const baseReady = activeBotType
        ? baseFields.every((field) => isRequiredFieldFilled(field))
        : false;
    const optionalReady =
        runMode === "dev"
            ? addedOptionalFields.every((field) => isOptionalFieldFilled(field))
            : true;
    const isReadyToRun = baseReady && optionalReady;

    const renderBaseField = (field) => {
        if (!field?.id) return null;
        const value = formValues[field.id] ?? "";
        const fieldClassName = `form-field${
            field.fullWidth ? " field-span-2" : ""
        }`;

        if (field.type === "savedList") {
            return (
                <label key={field.id} className={fieldClassName}>
                    <span>{field.label}</span>
                    <select
                        value={value}
                        onChange={handleListChange(field)}
                        required={field.required}
                    >
                        <option value="">
                            {field.emptyLabel || "Select a saved list"}
                        </option>
                        {savedLists.map((list) => (
                            <option key={list.id} value={list.id}>
                                {list.name}
                            </option>
                        ))}
                    </select>
                </label>
            );
        }

        if (field.type === "textarea") {
            return (
                <label key={field.id} className={fieldClassName}>
                    <span>{field.label}</span>
                    <textarea
                        rows={field.rows || 4}
                        placeholder={field.placeholder || ""}
                        value={value}
                        onChange={handleFieldChange(field.id)}
                        required={field.required}
                    />
                </label>
            );
        }

        const inputProps = {
            type: field.type || "text",
            placeholder: field.placeholder || "",
            value,
            onChange: handleFieldChange(field.id),
            required: field.required,
        };
        if (field.min != null) inputProps.min = field.min;
        if (field.max != null) inputProps.max = field.max;
        if (field.step != null) inputProps.step = field.step;

        if (field.suffix) {
            return (
                <label key={field.id} className={fieldClassName}>
                    <span>{field.label}</span>
                    <div className="input-suffix">
                        <input {...inputProps} />
                        <span>{field.suffix}</span>
                    </div>
                </label>
            );
        }

        return (
            <label key={field.id} className={fieldClassName}>
                <span>{field.label}</span>
                <input {...inputProps} />
            </label>
        );
    };

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
                    <label className="form-field field-span-2 bot-type-field">
                        <span>Bot Type</span>
                        <div className="bot-type-row">
                            <select
                                value={selectedBotTypeId}
                                onChange={(event) =>
                                    setSelectedBotTypeId(event.target.value)
                                }
                                disabled={!botTypes.length}
                            >
                                {botTypes.length ? (
                                    botTypes.map((botType) => (
                                        <option
                                            key={botType.id}
                                            value={botType.id}
                                        >
                                            {botType.label}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">
                                        No bot types available
                                    </option>
                                )}
                            </select>
                            <button
                                className="ghost-button bot-type-button"
                                type="button"
                            >
                                <span
                                    className="material-icons-outlined"
                                    aria-hidden="true"
                                >
                                    add
                                </span>
                                <span>New Bot Type</span>
                            </button>
                        </div>
                    </label>
                    {primaryFields.map((field) => renderBaseField(field))}
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
                    {linkFields.map((field) => renderBaseField(field))}
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
