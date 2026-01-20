import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReceiptPanel from "../components/ReceiptPanel";
import RunItemCard from "../components/RunItemCard";
import RunSummaryFilters from "../components/RunSummaryFilters";
import RunSummarySection from "../components/RunSummarySection";
import RunSummaryTabs from "../components/RunSummaryTabs";
import StatCard from "../components/StatCard";

const baseRunItems = {
    passedItems: [
        {
            id: "pass-1",
            storeId: "3567",
            storeLine: "Walmart #3567 - Hidalgo (2.0 mi)",
            address: "3000 S Jackson Rd, 78557",
            itemId: "266290201",
            upc: "097512415392",
            price: 17.97,
            marterPrice: 37.99,
            discountPct: 52.7,
            floor: 2,
            back: 0,
            aisles: "I19-10",
            pass: true,
            lowNAGamble: false,
            sourceLink: "https://www.walmart.com/ip/266290201",
            walmartLink: "https://www.walmart.com/ip/266290201",
            keepa: {
                found: true,
                title: "Wilson Roger Federer 25 Junior Tennis Racquet",
                price: 39.99,
                asin: "B0892PY12R",
                rank: 919,
                boughtPastMonth: "90+",
                keepaUrl: "https://keepa.com/#!product/1-B0892PY12R",
            },
            fulfillment: { status: "OK", pickup: false, delivery: false },
        },
        {
            id: "pass-2",
            storeId: "397",
            storeLine: "Walmart #397 - McAllen (2.5 mi)",
            address: "1200 E Jackson Ave, 78503",
            itemId: "853112740",
            upc: "196123450011",
            price: 24.88,
            marterPrice: 58.0,
            discountPct: 57.1,
            floor: 5,
            back: 2,
            aisles: "L31-1",
            pass: true,
            lowNAGamble: false,
            sourceLink: "https://www.walmart.com/ip/853112740",
            walmartLink: "https://www.walmart.com/ip/853112740",
            keepa: {
                found: false,
            },
            fulfillment: { status: "OK", pickup: true, delivery: true },
        },
        {
            id: "pass-3",
            storeId: "452",
            storeLine: "Walmart #452 - McAllen (6.7 mi)",
            address: "2800 W Nolana Ave, 78504",
            itemId: "7744112200",
            upc: "776655443322",
            price: 18.0,
            marterPrice: 40.0,
            discountPct: 55.0,
            floor: 2,
            back: 3,
            aisles: "L37-30",
            pass: true,
            lowNAGamble: false,
            sourceLink: "https://www.walmart.com/ip/7744112200",
            walmartLink: "https://www.walmart.com/ip/7744112200",
            keepa: {
                found: true,
                title: "Sharpie S-Gel Black Gel Pens 4 Pack",
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
            storeId: "1000",
            storeLine: "Walmart #1000 - Brownsville (48.1 mi)",
            address: "2721 Boca Chica Blvd, 78521",
            itemId: "6600112233",
            upc: "334455667788",
            price: 9.99,
            marterPrice: 28.0,
            discountPct: 64.3,
            floor: 2,
            back: 4,
            aisles: "L22-6",
            pass: true,
            lowNAGamble: false,
            sourceLink: "https://www.walmart.com/ip/6600112233",
            walmartLink: "https://www.walmart.com/ip/6600112233",
            keepa: {
                found: true,
                title: "Contigo Autoseal Stainless Travel Mug 16oz",
                price: 26.0,
                asin: "B0GHI13579",
                rank: 22000,
                boughtPastMonth: "80+",
                keepaUrl: "https://keepa.com/#!product/1-B0GHI13579",
            },
            fulfillment: { status: "OK", pickup: true, delivery: false },
        },
        {
            id: "pass-5",
            storeId: "6098",
            storeLine: "Walmart #6098 - McAllen (5.8 mi)",
            address: "800 East Nolana Ave, 78501",
            itemId: "9053372211",
            upc: "847362555902",
            price: 14.98,
            marterPrice: 33.5,
            discountPct: 55.3,
            floor: 3,
            back: 1,
            aisles: "K14-7",
            pass: true,
            lowNAGamble: false,
            sourceLink: "https://www.walmart.com/ip/9053372211",
            walmartLink: "https://www.walmart.com/ip/9053372211",
            keepa: {
                found: false,
            },
            fulfillment: { status: "BLOCKED", pickup: false, delivery: false },
        },
        {
            id: "pass-6",
            storeId: "6159",
            storeLine: "Walmart #6159 - Weslaco (13.6 mi)",
            address: "1600 S Texas Blvd, 78596",
            itemId: "4930287711",
            upc: "714330112233",
            price: 21.5,
            marterPrice: 48.0,
            discountPct: 55.2,
            floor: 4,
            back: 2,
            aisles: "H08-2",
            pass: true,
            lowNAGamble: false,
            sourceLink: "https://www.walmart.com/ip/4930287711",
            walmartLink: "https://www.walmart.com/ip/4930287711",
            keepa: {
                found: true,
                title: "JBL Go 3 Portable Bluetooth Speaker",
                price: 46.0,
                asin: "B0KLM13555",
                rank: 5400,
                boughtPastMonth: "210+",
                keepaUrl: "https://keepa.com/#!product/1-B0KLM13555",
            },
            fulfillment: { status: "OK", pickup: true, delivery: true },
        },
    ],
    gambleItems: [
        {
            id: "gamble-1",
            storeId: "2765",
            storeLine: "Walmart #2765 - Los Fresnos (44.9 mi)",
            address: "1004 W Ocean Boulevard, 78566",
            itemId: "4477889900",
            upc: "554433221100",
            price: 5.0,
            marterPrice: 17.5,
            discountPct: 71.4,
            floor: 1,
            back: 0,
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
            storeId: "456",
            storeLine: "Walmart #456 - Brownsville (44.5 mi)",
            address: "3500 W Alton Gloor Blvd, 78520",
            itemId: "1100223344",
            upc: "110022334455",
            price: 8.5,
            marterPrice: 21.5,
            discountPct: 60.5,
            floor: 1,
            back: 1,
            aisles: "N/A",
            pass: false,
            lowNAGamble: true,
            sourceLink: "https://www.walmart.com/ip/1100223344",
            walmartLink: "https://www.walmart.com/ip/1100223344",
            keepa: {
                found: true,
                title: "Amazon Basics Microfiber Sheet Set Queen",
                price: 24.0,
                asin: "B0ZZX11223",
                rank: 42000,
                boughtPastMonth: "35+",
                keepaUrl: "https://keepa.com/#!product/1-B0ZZX11223",
            },
            fulfillment: { status: "NOT_CHECKED", pickup: false, delivery: false },
        },
        {
            id: "gamble-3",
            storeId: "4112",
            storeLine: "Walmart #4112 - Brownsville (47.3 mi)",
            address: "2205 Ruben Torres Sr Blvd, 78526",
            itemId: "9911223344",
            upc: "509998877661",
            price: 11.0,
            marterPrice: 26.0,
            discountPct: 57.7,
            floor: 1,
            back: 0,
            aisles: "N/A",
            pass: false,
            lowNAGamble: true,
            sourceLink: "https://www.walmart.com/ip/9911223344",
            walmartLink: "https://www.walmart.com/ip/9911223344",
            keepa: { found: false },
            fulfillment: { status: "NOT_CHECKED", pickup: false, delivery: false },
        },
        {
            id: "gamble-4",
            storeId: "3320",
            storeLine: "Walmart #3320 - Palmhurst (10.0 mi)",
            address: "215 E Mile 3 Rd, 78573",
            itemId: "3322110099",
            upc: "498002233445",
            price: 12.46,
            marterPrice: 30.0,
            discountPct: 58.5,
            floor: 1,
            back: 1,
            aisles: "N/A",
            pass: false,
            lowNAGamble: true,
            sourceLink: "https://www.walmart.com/ip/3322110099",
            walmartLink: "https://www.walmart.com/ip/3322110099",
            keepa: { found: false },
            fulfillment: { status: "NOT_CHECKED", pickup: false, delivery: false },
        },
    ],
    receiptItems: [
        {
            id: "receipt-1",
            itemId: "266290201",
            storeLine: "Walmart #3567 - Hidalgo (2.0 mi)",
            qty: 2,
            unitCost: 17.97,
            unitSales: 39.99,
        },
        {
            id: "receipt-2",
            itemId: "7744112200",
            storeLine: "Walmart #452 - McAllen (6.7 mi)",
            qty: 1,
            unitCost: 18.0,
            unitSales: 36.5,
        },
        {
            id: "receipt-3",
            itemId: "6600112233",
            storeLine: "Walmart #1000 - Brownsville (48.1 mi)",
            qty: 1,
            unitCost: 9.99,
            unitSales: 26.0,
        },
    ],
};

const afterHoursItems = {
    passedItems: [
        {
            id: "pass-7",
            storeId: "5809",
            storeLine: "Walmart #5809 - Edinburg (9.0 mi)",
            address: "2812 S Expressway 281, 78542",
            itemId: "8109241122",
            upc: "093807612244",
            price: 28.5,
            marterPrice: 64.0,
            discountPct: 55.5,
            floor: 2,
            back: 5,
            aisles: "E04",
            pass: true,
            lowNAGamble: false,
            sourceLink: "https://www.walmart.com/ip/8109241122",
            walmartLink: "https://www.walmart.com/ip/8109241122",
            keepa: {
                found: true,
                title: "Rubbermaid Brilliance Food Storage Set",
                price: 58.0,
                asin: "B0JKL24680",
                rank: 15200,
                boughtPastMonth: "60+",
                keepaUrl: "https://keepa.com/#!product/1-B0JKL24680",
            },
            fulfillment: { status: "OK", pickup: true, delivery: true },
        },
        {
            id: "pass-8",
            storeId: "1296",
            storeLine: "Walmart #1296 - San Benito (35.7 mi)",
            address: "1126 W Us Highway 77, 78586",
            itemId: "5522331144",
            upc: "761119901122",
            price: 16.25,
            marterPrice: 39.0,
            discountPct: 58.3,
            floor: 3,
            back: 2,
            aisles: "F12",
            pass: true,
            lowNAGamble: false,
            sourceLink: "https://www.walmart.com/ip/5522331144",
            walmartLink: "https://www.walmart.com/ip/5522331144",
            keepa: {
                found: false,
            },
            fulfillment: { status: "OK", pickup: false, delivery: true },
        },
    ],
    gambleItems: [
        {
            id: "gamble-5",
            storeId: "5808",
            storeLine: "Walmart #5808 - Elsa (16.5 mi)",
            address: "411 South Broadway Street, 78543",
            itemId: "1122334455",
            upc: "778899001122",
            price: 10.5,
            marterPrice: 27.5,
            discountPct: 61.8,
            floor: 1,
            back: 0,
            aisles: "N/A",
            pass: false,
            lowNAGamble: true,
            sourceLink: "https://www.walmart.com/ip/1122334455",
            walmartLink: "https://www.walmart.com/ip/1122334455",
            keepa: { found: false },
            fulfillment: { status: "NOT_CHECKED", pickup: false, delivery: false },
        },
    ],
    receiptItems: [
        {
            id: "receipt-4",
            itemId: "8109241122",
            storeLine: "Walmart #5809 - Edinburg (9.0 mi)",
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

const receiptStoragePrefix = "cnc-receipt:";
const defaultRunFilters = {
    minDiscount: "0",
    minFloor: "0",
    minBack: "0",
    aisle: "all",
    store: "all",
    fulfillment: "all",
};

const buildReceiptItem = (item, qty = 1) => {
    const storeLine =
        item.storeLine ||
        (item.storeId ? `Store #${item.storeId}` : item.address || "Store");
    const unitCostRaw = Number(item.price);
    const unitCost = Number.isFinite(unitCostRaw)
        ? unitCostRaw
        : Number(item.marterPrice) || 0;
    const keepaPrice = Number(item.keepa?.price);
    const unitSales = item.keepa?.found && Number.isFinite(keepaPrice)
        ? keepaPrice
        : Number(item.marterPrice) || 0;

    return {
        id: item.id,
        itemId: item.itemId || item.id,
        storeLine,
        qty: Math.max(1, Number.parseInt(qty, 10) || 1),
        unitCost,
        unitSales,
    };
};

const loadReceiptItems = (key) => {
    if (!key) return [];
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
};

function RunSummary() {
    const { id } = useParams();
    const run = runDataById[id] || defaultRun;
    const runId = id || run?.id || "run";

    const [dataView, setDataView] = useState("walmart");
    const [sectionView, setSectionView] = useState("passed");
    const [filters, setFilters] = useState(defaultRunFilters);
    const receiptKey = useMemo(
        () => `${receiptStoragePrefix}${runId}`,
        [runId]
    );
    const [receiptItems, setReceiptItems] = useState([]);
    const skipReceiptSaveRef = useRef(true);
    const [draftQtyById, setDraftQtyById] = useState({});

    useEffect(() => {
        skipReceiptSaveRef.current = true;
        setReceiptItems(loadReceiptItems(receiptKey));
    }, [receiptKey]);

    useEffect(() => {
        if (skipReceiptSaveRef.current) {
            skipReceiptSaveRef.current = false;
            return;
        }
        try {
            localStorage.setItem(receiptKey, JSON.stringify(receiptItems));
        } catch (error) {
            // Ignore storage failures (private mode, quota, etc).
        }
    }, [receiptKey, receiptItems]);

    useEffect(() => {
        setDraftQtyById((prev) => {
            const next = { ...prev };
            receiptItems.forEach((item) => {
                next[item.id] = String(item.qty || 1);
            });
            return next;
        });
    }, [receiptItems]);

    const allItems = useMemo(
        () => [...run.passedItems, ...run.gambleItems],
        [run.gambleItems, run.passedItems]
    );

    const aisleOptions = useMemo(() => {
        const letters = new Set();
        allItems.forEach((item) => {
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
    }, [allItems]);

    const storeOptions = useMemo(() => {
        const stores = new Map();
        allItems.forEach((item) => {
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
    }, [allItems]);

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
        if (dataView !== "amazon") return filteredPassed;
        return filteredPassed.filter((item) => item.keepa && item.keepa.found);
    }, [dataView, filteredPassed]);

    const filteredGambles = useMemo(() => {
        if (!run.gambleItems.length) return [];
        const minDiscount = Number.parseFloat(filters.minDiscount);
        const minFloor = Number.parseInt(filters.minFloor, 10);
        const minBack = Number.parseInt(filters.minBack, 10);
        const aisleFilter = filters.aisle;
        const storeFilter = filters.store;
        const fulfillmentFilter = filters.fulfillment;

        return run.gambleItems.filter((item) => {
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
    }, [filters, run.gambleItems]);

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
        return {
            passedCount,
            avgDiscount,
            gamblesCount: run.gambleItems.length,
            storeCount,
            boughtCount: receiptItems.length,
        };
    }, [receiptItems.length, run.gambleItems, run.passedItems]);

    const receiptIds = useMemo(
        () => new Set(receiptItems.map((item) => item.id)),
        [receiptItems]
    );

    const receiptItemMap = useMemo(() => {
        const map = new Map();
        receiptItems.forEach((item) => {
            map.set(item.id, item);
        });
        return map;
    }, [receiptItems]);

    const handleReceiptToggle = (item, isSelected) => {
        setReceiptItems((prev) => {
            const exists = prev.some((entry) => entry.id === item.id);
            const shouldAdd = isSelected ?? !exists;
            if (shouldAdd && !exists) {
                const qty = draftQtyById[item.id] || "1";
                return [...prev, buildReceiptItem(item, qty)];
            }
            if (!shouldAdd && exists) {
                return prev.filter((entry) => entry.id !== item.id);
            }
            return prev;
        });
    };

    const handleReceiptQtyChange = (item, value) => {
        setDraftQtyById((prev) => ({ ...prev, [item.id]: value }));
        if (value === "") return;
        const parsed = Number.parseInt(value, 10);
        if (!Number.isFinite(parsed)) return;
        if (parsed <= 0) {
            setReceiptItems((prev) =>
                prev.filter((entry) => entry.id !== item.id)
            );
            return;
        }
        const nextQty = Math.max(1, parsed);
        setReceiptItems((prev) => {
            if (!prev.some((entry) => entry.id === item.id)) return prev;
            return prev.map((entry) =>
                entry.id === item.id ? { ...entry, qty: nextQty } : entry
            );
        });
    };

    const handleReceiptQtyCommit = (item, value) => {
        if (value === "") {
            const fallbackQty = receiptItemMap.get(item.id)?.qty ?? 1;
            setDraftQtyById((prev) => ({
                ...prev,
                [item.id]: String(fallbackQty),
            }));
            return;
        }
        const parsed = Number.parseInt(value, 10);
        if (!Number.isFinite(parsed)) {
            const fallbackQty = receiptItemMap.get(item.id)?.qty ?? 1;
            setDraftQtyById((prev) => ({
                ...prev,
                [item.id]: String(fallbackQty),
            }));
            return;
        }
        if (parsed <= 0) {
            setDraftQtyById((prev) => ({ ...prev, [item.id]: "1" }));
            setReceiptItems((prev) =>
                prev.filter((entry) => entry.id !== item.id)
            );
            return;
        }
        const nextQty = parsed;
        setDraftQtyById((prev) => ({
            ...prev,
            [item.id]: String(nextQty),
        }));
        setReceiptItems((prev) => {
            if (!prev.some((entry) => entry.id === item.id)) return prev;
            return prev.map((entry) =>
                entry.id === item.id ? { ...entry, qty: nextQty } : entry
            );
        });
    };

    const getItemQtyValue = (itemId) => {
        if (Object.prototype.hasOwnProperty.call(draftQtyById, itemId)) {
            return draftQtyById[itemId];
        }
        const receiptQty = receiptItemMap.get(itemId)?.qty;
        return receiptQty != null ? String(receiptQty) : "1";
    };

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
                dataView={dataView}
                onDataViewChange={setDataView}
                filters={filters}
                onFiltersChange={setFilters}
                aisleOptions={aisleOptions}
                storeOptions={storeOptions}
                defaultFilters={defaultRunFilters}
            />

            <section className="summary-tabs-panel">
                <RunSummaryTabs
                    activeTab={sectionView}
                    onTabChange={setSectionView}
                    counts={{
                        passed: visiblePassed.length,
                        gambles: filteredGambles.length,
                        receipt: receiptItems.length,
                    }}
                />
                <div className="summary-tabs-body">
                    {sectionView === "passed" ? (
                        <RunSummarySection
                            title="Passed Items"
                            subtitle="All items that passed the discount threshold"
                            count={visiblePassed.length}
                            scroll
                            embedded
                        >
                            {visiblePassed.length ? (
                                <div className="summary-item-list">
                                    {visiblePassed.map((item) => (
                                        <div
                                            key={item.id}
                                            className="summary-item"
                                        >
                                            <RunItemCard
                                                item={item}
                                                dataView={dataView}
                                                showReceiptToggle
                                                isInReceipt={receiptIds.has(
                                                    item.id
                                                )}
                                                receiptQty={getItemQtyValue(
                                                    item.id
                                                )}
                                                onReceiptToggle={
                                                    handleReceiptToggle
                                                }
                                                onReceiptQtyChange={
                                                    handleReceiptQtyChange
                                                }
                                                onReceiptQtyCommit={
                                                    handleReceiptQtyCommit
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="summary-empty">
                                    No items match the current filters.
                                </p>
                            )}
                        </RunSummarySection>
                    ) : null}

                    {sectionView === "gambles" ? (
                        <RunSummarySection
                            title="Low/N/A Gambles"
                            subtitle="Low stock or missing aisle details"
                            count={filteredGambles.length}
                            scroll
                            embedded
                        >
                            {filteredGambles.length ? (
                                <div className="summary-item-list">
                                    {filteredGambles.map((item) => (
                                        <div
                                            key={item.id}
                                            className="summary-item"
                                        >
                                            <RunItemCard
                                                item={item}
                                                dataView={dataView}
                                                showReceiptToggle
                                                isInReceipt={receiptIds.has(
                                                    item.id
                                                )}
                                                receiptQty={getItemQtyValue(
                                                    item.id
                                                )}
                                                onReceiptToggle={
                                                    handleReceiptToggle
                                                }
                                                onReceiptQtyChange={
                                                    handleReceiptQtyChange
                                                }
                                                onReceiptQtyCommit={
                                                    handleReceiptQtyCommit
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="summary-empty">
                                    No gambles captured in this run.
                                </p>
                            )}
                        </RunSummarySection>
                    ) : null}

                    {sectionView === "receipt" ? (
                        <ReceiptPanel
                            items={receiptItems}
                            isActive
                            embedded
                            onItemsChange={setReceiptItems}
                        />
                    ) : null}
                </div>
            </section>
        </main>
    );
}

export default RunSummary;
