import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ReceiptPanel from "../components/ReceiptPanel";
import RunItemCard from "../components/RunItemCard";
import RunSummaryFilters from "../components/RunSummaryFilters";
import RunSummarySection from "../components/RunSummarySection";
import StatCard from "../components/StatCard";

const baseRunItems = {
    passedItems: [
        {
            id: "pass-1",
            storeId: "123",
            storeLine: "Walmart #123 - McAllen",
            address: "McAllen, TX 78501",
            itemId: "123456789",
            upc: "012345678901",
            price: 14.99,
            marterPrice: 44.99,
            discountPct: 66.7,
            floor: 3,
            back: 6,
            aisles: "A12",
            pass: true,
            lowNAGamble: false,
            sourceLink: "https://www.walmart.com/ip/123456789",
            walmartLink: "https://www.walmart.com/ip/123456789",
            keepa: {
                found: true,
                price: 39.99,
                asin: "B0ABC12345",
                rank: 12500,
                boughtPastMonth: "240+",
                keepaUrl: "https://keepa.com/#!product/1-B0ABC12345",
            },
            fulfillment: { status: "OK", pickup: true, delivery: false },
        },
        {
            id: "pass-2",
            storeId: "402",
            storeLine: "Walmart #402 - Mission",
            address: "Mission, TX 78572",
            itemId: "9988776655",
            upc: "889900112233",
            price: 22.49,
            marterPrice: 52.0,
            discountPct: 56.7,
            floor: 4,
            back: 2,
            aisles: "C03",
            pass: true,
            lowNAGamble: false,
            sourceLink: "https://www.walmart.com/ip/9988776655",
            walmartLink: "https://www.walmart.com/ip/9988776655",
            keepa: {
                found: false,
            },
            fulfillment: { status: "OK", pickup: true, delivery: true },
        },
        {
            id: "pass-3",
            storeId: "615",
            storeLine: "Walmart #615 - Edinburg",
            address: "Edinburg, TX 78539",
            itemId: "7744112200",
            upc: "776655443322",
            price: 18.0,
            marterPrice: 40.0,
            discountPct: 55.0,
            floor: 2,
            back: 3,
            aisles: "B07",
            pass: true,
            lowNAGamble: false,
            sourceLink: "https://www.walmart.com/ip/7744112200",
            walmartLink: "https://www.walmart.com/ip/7744112200",
            keepa: {
                found: true,
                price: 36.5,
                asin: "B0DEF67890",
                rank: 9800,
                boughtPastMonth: "120+",
                keepaUrl: "https://keepa.com/#!product/1-B0DEF67890",
            },
            fulfillment: { status: "OK", pickup: false, delivery: true },
        },
        {
            id: "pass-4",
            storeId: "710",
            storeLine: "Walmart #710 - Pharr",
            address: "Pharr, TX 78577",
            itemId: "6600112233",
            upc: "334455667788",
            price: 9.99,
            marterPrice: 28.0,
            discountPct: 64.3,
            floor: 2,
            back: 4,
            aisles: "D18",
            pass: true,
            lowNAGamble: false,
            sourceLink: "https://www.walmart.com/ip/6600112233",
            walmartLink: "https://www.walmart.com/ip/6600112233",
            keepa: {
                found: true,
                price: 26.0,
                asin: "B0GHI13579",
                rank: 22000,
                boughtPastMonth: "80+",
                keepaUrl: "https://keepa.com/#!product/1-B0GHI13579",
            },
            fulfillment: { status: "OK", pickup: true, delivery: false },
        },
    ],
    gambleItems: [
        {
            id: "gamble-1",
            storeId: "221",
            storeLine: "Walmart #221 - McAllen",
            address: "McAllen, TX 78504",
            itemId: "4477889900",
            upc: "554433221100",
            price: 13.5,
            marterPrice: 27.0,
            discountPct: 50.0,
            floor: 1,
            back: 1,
            aisles: "N/A",
            pass: false,
            lowNAGamble: true,
            sourceLink: "https://www.walmart.com/ip/4477889900",
            walmartLink: "https://www.walmart.com/ip/4477889900",
            keepa: { found: false },
            fulfillment: { status: "NOT_CHECKED", pickup: false, delivery: false },
        },
        {
            id: "gamble-2",
            storeId: "310",
            storeLine: "Walmart #310 - Mission",
            address: "Mission, TX 78573",
            itemId: "1100223344",
            upc: "110022334455",
            price: 7.99,
            marterPrice: 21.5,
            discountPct: 62.8,
            floor: 1,
            back: 0,
            aisles: "N/A",
            pass: false,
            lowNAGamble: true,
            sourceLink: "https://www.walmart.com/ip/1100223344",
            walmartLink: "https://www.walmart.com/ip/1100223344",
            keepa: { found: false },
            fulfillment: { status: "NOT_CHECKED", pickup: false, delivery: false },
        },
    ],
    receiptItems: [
        {
            id: "receipt-1",
            itemId: "123456789",
            storeLine: "Walmart #123 - McAllen",
            qty: 2,
            unitCost: 14.99,
            unitSales: 39.99,
        },
        {
            id: "receipt-2",
            itemId: "7744112200",
            storeLine: "Walmart #615 - Edinburg",
            qty: 1,
            unitCost: 18.0,
            unitSales: 36.5,
        },
        {
            id: "receipt-3",
            itemId: "6600112233",
            storeLine: "Walmart #710 - Pharr",
            qty: 1,
            unitCost: 9.99,
            unitSales: 26.0,
        },
    ],
};

const afterHoursItems = {
    passedItems: [
        {
            id: "pass-5",
            storeId: "804",
            storeLine: "Walmart #804 - Brownsville",
            address: "Brownsville, TX 78520",
            itemId: "9001122334",
            upc: "667788990011",
            price: 28.5,
            marterPrice: 64.0,
            discountPct: 55.5,
            floor: 2,
            back: 5,
            aisles: "E04",
            pass: true,
            lowNAGamble: false,
            sourceLink: "https://www.walmart.com/ip/9001122334",
            walmartLink: "https://www.walmart.com/ip/9001122334",
            keepa: {
                found: true,
                price: 58.0,
                asin: "B0JKL24680",
                rank: 15200,
                boughtPastMonth: "60+",
                keepaUrl: "https://keepa.com/#!product/1-B0JKL24680",
            },
            fulfillment: { status: "OK", pickup: true, delivery: true },
        },
    ],
    gambleItems: [],
    receiptItems: [
        {
            id: "receipt-4",
            itemId: "9001122334",
            storeLine: "Walmart #804 - Brownsville",
            qty: 1,
            unitCost: 28.5,
            unitSales: 58.0,
        },
    ],
};

const runDataById = {
    "run-0920": {
        id: "run-0920",
        name: "Morning clearance run",
        tripName: "McAllen clearance run",
        generatedAt: "Sep 20, 2024 9:41 AM",
        threshold: 20,
        totalLinks: 18,
        ...baseRunItems,
    },
    "run-0921": {
        id: "run-0921",
        name: "Lunch rush scan",
        tripName: "Midday storefront scan",
        generatedAt: "Sep 21, 2024 1:05 PM",
        threshold: 18,
        totalLinks: 14,
        ...baseRunItems,
    },
    "run-0922": {
        id: "run-0922",
        name: "After hours test",
        tripName: "TurboSearch night run",
        generatedAt: "Sep 22, 2024 11:18 PM",
        threshold: 25,
        totalLinks: 12,
        ...afterHoursItems,
    },
    "run-0923": {
        id: "run-0923",
        name: "Weekend sweep",
        tripName: "Saturday sweep",
        generatedAt: "Sep 23, 2024 8:22 AM",
        threshold: 22,
        totalLinks: 20,
        ...baseRunItems,
    },
    "run-0924": {
        id: "run-0924",
        name: "Quick spot check",
        tripName: "Quick spot check",
        generatedAt: "Sep 24, 2024 4:10 PM",
        threshold: 15,
        totalLinks: 9,
        ...baseRunItems,
    },
};

const defaultRun = runDataById["run-0920"];

function RunSummary() {
    const { id } = useParams();
    const run = runDataById[id] || defaultRun;
    const runId = id || run?.id || "run";

    const [view, setView] = useState("walmart");
    const [filters, setFilters] = useState({
        minDiscount: "",
        minFloor: "",
        minBack: "",
        aisle: "all",
        store: "all",
        fulfillment: "all",
    });

    const aisleOptions = useMemo(() => {
        const letters = new Set();
        run.passedItems.forEach((item) => {
            const aisle = (item.aisles || "").trim();
            if (!aisle || /^n\/?a$/i.test(aisle)) return;
            letters.add(aisle[0].toUpperCase());
        });
        return [
            { value: "all", label: "All aisles" },
            { value: "has", label: "Has aisle" },
            { value: "na", label: "N/A only" },
            ...Array.from(letters).sort().map((letter) => ({
                value: letter,
                label: `Starts with ${letter}`,
            })),
        ];
    }, [run.passedItems]);

    const storeOptions = useMemo(() => {
        const stores = new Map();
        run.passedItems.forEach((item) => {
            const label =
                item.storeLine ||
                (item.storeId ? `Store #${item.storeId}` : "Store");
            stores.set(label, label);
        });
        return [
            { value: "all", label: "All stores" },
            ...Array.from(stores.values()).map((label) => ({
                value: label,
                label,
            })),
        ];
    }, [run.passedItems]);

    const filteredPassed = useMemo(() => {
        const minDiscount = Number.parseFloat(filters.minDiscount);
        const minFloor = Number.parseInt(filters.minFloor, 10);
        const minBack = Number.parseInt(filters.minBack, 10);
        const aisleFilter = filters.aisle;
        const storeFilter = filters.store;
        const fulfillmentFilter = filters.fulfillment;

        return run.passedItems.filter((item) => {
            if (
                Number.isFinite(minDiscount) &&
                (!Number.isFinite(item.discountPct) ||
                    item.discountPct < minDiscount)
            ) {
                return false;
            }

            const floorValue = Number(item.floor);
            const backValue = Number(item.back);
            if (Number.isFinite(minFloor) && Number.isFinite(minBack)) {
                const floorOk = Number.isFinite(floorValue)
                    ? floorValue >= minFloor
                    : false;
                const backOk = Number.isFinite(backValue)
                    ? backValue >= minBack
                    : false;
                if (!floorOk && !backOk) return false;
            } else if (Number.isFinite(minFloor)) {
                if (!Number.isFinite(floorValue) || floorValue < minFloor) {
                    return false;
                }
            } else if (Number.isFinite(minBack)) {
                if (!Number.isFinite(backValue) || backValue < minBack) {
                    return false;
                }
            }

            const aisle = (item.aisles || "").trim();
            const isNA = !aisle || /^n\/?a$/i.test(aisle);
            if (aisleFilter === "na" && !isNA) return false;
            if (aisleFilter === "has" && isNA) return false;
            if (
                aisleFilter.length === 1 &&
                aisleFilter !== "all" &&
                (!aisle || !aisle.toUpperCase().startsWith(aisleFilter))
            ) {
                return false;
            }

            if (storeFilter !== "all") {
                const storeLabel =
                    item.storeLine ||
                    (item.storeId ? `Store #${item.storeId}` : "");
                if (storeLabel !== storeFilter) return false;
            }

            if (fulfillmentFilter !== "all") {
                if (!item.fulfillment) return false;
                const pickup = item.fulfillment.pickup;
                const delivery = item.fulfillment.delivery;
                if (fulfillmentFilter === "pickup" && !pickup) return false;
                if (fulfillmentFilter === "delivery" && !delivery) return false;
                if (
                    fulfillmentFilter === "both" &&
                    !(pickup && delivery)
                ) {
                    return false;
                }
            }

            return true;
        });
    }, [filters, run.passedItems]);

    const visiblePassed = useMemo(() => {
        if (view !== "amazon") return filteredPassed;
        return filteredPassed.filter((item) => item.keepa && item.keepa.found);
    }, [filteredPassed, view]);

    const stats = useMemo(() => {
        const passedCount = run.passedItems.length;
        const avgDiscount =
            passedCount === 0
                ? 0
                : run.passedItems.reduce(
                      (sum, item) => sum + (item.discountPct || 0),
                      0
                  ) / passedCount;
        const storeCount = new Set(
            run.passedItems.map(
                (item) => item.storeId || item.storeLine || "Store"
            )
        ).size;
        const boughtCount = run.receiptItems.reduce(
            (sum, item) => sum + (item.qty || 0),
            0
        );
        return {
            passedCount,
            avgDiscount,
            gamblesCount: run.gambleItems.length,
            storeCount,
            boughtCount,
        };
    }, [run.gambleItems, run.passedItems, run.receiptItems]);

    return (
        <main className="dashboard run-summary">
            <header className="run-summary-header">
                <div>
                    <p className="run-summary-kicker">Run Summary</p>
                    <h1 className="page-title">{run.name}</h1>
                    <div className="run-summary-meta">
                        <span>Run ID: {runId}</span>
                        <span>Trip: {run.tripName}</span>
                        <span>Generated: {run.generatedAt}</span>
                        <span>Threshold: {run.threshold}%</span>
                        <span>Total links: {run.totalLinks}</span>
                    </div>
                </div>
                <div className="run-summary-actions">
                    <button className="ghost-button" type="button">
                        Copy summary
                    </button>
                    <button className="ghost-button" type="button">
                        Download
                    </button>
                </div>
            </header>

            <section className="stats-grid summary-stats">
                <StatCard
                    label="Passed"
                    value={String(stats.passedCount)}
                    accent="mint"
                    meta="Items that met threshold"
                />
                <StatCard
                    label="Avg Discount"
                    value={`${stats.avgDiscount.toFixed(1)}%`}
                    accent="gold"
                    meta="Across passed items"
                />
                <StatCard
                    label="Low/N/A Gambles"
                    value={String(stats.gamblesCount)}
                    accent="rose"
                    meta="Low stock + N/A aisles"
                />
                <StatCard
                    label="Total Stores"
                    value={String(stats.storeCount)}
                    accent="neutral"
                    meta="Unique store locations"
                />
                <StatCard
                    label="Items Bought"
                    value={String(stats.boughtCount)}
                    accent="mint"
                    meta="From receipt list"
                />
            </section>

            <RunSummaryFilters
                view={view}
                onViewChange={setView}
                filters={filters}
                onFiltersChange={setFilters}
                aisleOptions={aisleOptions}
                storeOptions={storeOptions}
            />

            <section className="summary-grid">
                <RunSummarySection
                    title="Passed Items"
                    subtitle="All items that passed the discount threshold"
                    count={visiblePassed.length}
                    scroll
                >
                    {visiblePassed.length ? (
                        visiblePassed.map((item) => (
                            <RunItemCard key={item.id} item={item} />
                        ))
                    ) : (
                        <p className="summary-empty">
                            No items match the current filters.
                        </p>
                    )}
                </RunSummarySection>

                <RunSummarySection
                    title="Low/N/A Gambles"
                    subtitle="Low stock or missing aisle details"
                    count={run.gambleItems.length}
                    scroll
                >
                    {run.gambleItems.length ? (
                        run.gambleItems.map((item) => (
                            <RunItemCard key={item.id} item={item} />
                        ))
                    ) : (
                        <p className="summary-empty">
                            No gambles captured in this run.
                        </p>
                    )}
                </RunSummarySection>
            </section>

            <ReceiptPanel
                items={run.receiptItems}
                isActive={view === "receipt"}
            />
        </main>
    );
}

export default RunSummary;
