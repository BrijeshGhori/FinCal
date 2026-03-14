import { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { formatCurrencySimple } from '../utils/financeCalculations';

// Brand colours
const BRAND_BLUE  = '#224c87';
const BRAND_RED   = '#da3832';
const BRAND_GREY  = '#919090';
const BRAND_BLUE2 = '#3a6db5'; // lighter shade for second ring / bars

const WealthMilestoneRings = ({ safeIndex, yearData }) => {
    const targetGoal  = yearData.goalCost;
    const invested    = yearData.invested;
    const returns     = Math.max(0, yearData.portfolioValue - yearData.invested);
    const totalWealth = yearData.portfolioValue;

    const i_f = Math.min(1, invested / targetGoal);
    const m_f = Math.min(1 - i_f, returns / targetGoal);
    const totalPercent = Math.min(100, (totalWealth / targetGoal) * 100);

    const size        = 180;
    const strokeWidth = 18;
    const center      = size / 2;
    const radius      = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;

    const dashOffsetInvested = circumference - (i_f * circumference);
    const dashOffsetReturns  = circumference - (m_f * circumference);
    const rotationReturns    = i_f * 360;

    return (
        <div className="w-full h-full relative bg-white rounded-2xl p-6 md:p-8 overflow-hidden border border-slate-200 flex flex-col items-center justify-between shadow-sm transition-colors">

            {/* Top Info */}
            <div className="flex flex-col w-full text-center z-10 mb-4 md:mb-8">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Year {safeIndex + 1} Status</span>
                <span className="text-4xl font-bold text-slate-800 tabular-nums tracking-tight">
                    {formatCurrencySimple(totalWealth)}
                </span>
                <span className="text-sm text-slate-500 mt-1.5">
                    of {formatCurrencySimple(targetGoal)} target
                </span>
            </div>

            {/* Donut Chart */}
            <div className="relative flex justify-center items-center w-full z-10 mb-6 md:mb-10" role="img" aria-label={`Goal progress: ${totalPercent.toFixed(0)}% reached`}>
                <svg width={size} height={size} className="transform -rotate-90 origin-center" aria-hidden="true">
                    <defs>
                        <linearGradient id="ringInvested" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={BRAND_BLUE2} />
                            <stop offset="100%" stopColor={BRAND_BLUE} />
                        </linearGradient>
                        <linearGradient id="ringReturns" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4a8fd4" />
                            <stop offset="100%" stopColor={BRAND_BLUE} />
                        </linearGradient>
                    </defs>

                    {/* Background Track */}
                    <circle cx={center} cy={center} r={radius} stroke="#e2e8f0" strokeWidth={strokeWidth} fill="transparent" />

                    {/* Capital Invested arc */}
                    {i_f > 0 && (
                        <motion.circle
                            cx={center} cy={center} r={radius}
                            stroke="url(#ringInvested)"
                            strokeWidth={strokeWidth} fill="transparent"
                            strokeLinecap="round"
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: dashOffsetInvested }}
                            transition={{ type: "spring", bounce: 0, duration: 1.2 }}
                            strokeDasharray={circumference}
                        />
                    )}

                    {/* Compounded Returns arc */}
                    {m_f > 0 && (
                        <motion.circle
                            cx={center} cy={center} r={radius}
                            stroke="url(#ringReturns)"
                            strokeWidth={strokeWidth} fill="transparent"
                            strokeLinecap="round"
                            initial={{ strokeDashoffset: circumference, rotate: 0 }}
                            animate={{ strokeDashoffset: dashOffsetReturns, rotate: rotationReturns }}
                            transition={{ type: "spring", bounce: 0, duration: 1.2 }}
                            style={{ transformOrigin: `${center}px ${center}px` }}
                            strokeDasharray={circumference}
                        />
                    )}
                </svg>

                {/* Center Text */}
                <div className="absolute flex flex-col items-center justify-center">
                    <motion.span
                        key={totalPercent.toFixed(0)}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl font-bold tabular-nums"
                        style={{ color: BRAND_BLUE }}
                        aria-label={`${totalPercent.toFixed(0)} percent reached`}
                    >
                        {totalPercent.toFixed(0)}%
                    </motion.span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest mt-1" style={{ color: BRAND_GREY }}>Reached</span>
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-row justify-center gap-6 md:gap-10 w-full z-10" role="list" aria-label="Chart legend">
                <div className="flex items-center gap-2" role="listitem">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: BRAND_BLUE2 }} aria-hidden="true" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: BRAND_GREY }}>Capital Invested</span>
                        <span className="text-sm font-bold text-slate-800 tabular-nums">{formatCurrencySimple(invested)}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2" role="listitem">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: BRAND_BLUE }} aria-hidden="true" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: BRAND_GREY }}>Compounded Returns</span>
                        <span className="text-sm font-bold text-slate-800 tabular-nums">+ {formatCurrencySimple(returns)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200">
                <span className="text-xs uppercase font-semibold tracking-wider block mb-1" style={{ color: BRAND_GREY }}>
                    {data.name}
                </span>
                <span className="block font-bold text-slate-900 tabular-nums text-xl">
                    {formatCurrencySimple(data.value)}
                </span>
            </div>
        );
    }
    return null;
};

export default function GrowthChart({ data }) {
    const [selectedYearIndex, setSelectedYearIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (!data || data.length === 0) return;
        setIsAnimating(true);
        setSelectedYearIndex(0);

        let currentYear = 0;
        const maxYear = data.length - 1;
        const intervalId = setInterval(() => {
            currentYear++;
            if (currentYear <= maxYear) {
                setSelectedYearIndex(currentYear);
            } else {
                clearInterval(intervalId);
                setIsAnimating(false);
            }
        }, 300);

        return () => clearInterval(intervalId);
    }, [data]);

    if (!data || data.length === 0) return null;

    const safeIndex = Math.min(Math.max(selectedYearIndex, 0), data.length - 1);
    const yearData  = data[safeIndex];
    const returns   = Math.max(0, yearData.portfolioValue - yearData.invested);

    const chartData = [
        { name: "Capital Invested",    value: yearData.invested,       fillId: "url(#barInvested)", textColor: BRAND_BLUE2 },
        { name: "Compounded Returns",  value: returns,                  fillId: "url(#barReturns)",  textColor: BRAND_BLUE  },
        { name: "Total Portfolio",     value: yearData.portfolioValue,  fillId: "url(#barTotal)",    textColor: BRAND_BLUE  },
        { name: "Inflation-Adj. Goal", value: yearData.goalCost,        fillId: "url(#barGoal)",     textColor: BRAND_RED   },
    ];

    return (
        <div className="w-full mt-2 flex flex-col gap-6">

            {/* Header bar with year selector */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-2xl p-4 sm:px-6 shadow-sm border border-slate-200 gap-4">
                <h3 className="font-bold text-slate-800 tracking-tight">Yearly Projection</h3>

                <div className={`flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 w-full sm:w-auto transition-all ${isAnimating ? 'opacity-50 select-none' : ''}`}>
                    {isAnimating ? (
                        <div className="flex items-center gap-2" role="status" aria-live="polite">
                            <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: BRAND_BLUE, borderTopColor: 'transparent' }} />
                            <span className="text-sm font-semibold whitespace-nowrap" style={{ color: BRAND_BLUE }}>Year {safeIndex + 1}…</span>
                        </div>
                    ) : (
                        <label htmlFor="year-select" className="text-sm font-semibold text-slate-500 whitespace-nowrap">View Year:</label>
                    )}
                    <div className="relative">
                        <select
                            id="year-select"
                            value={safeIndex}
                            disabled={isAnimating}
                            onChange={(e) => setSelectedYearIndex(parseInt(e.target.value))}
                            className="appearance-none w-full sm:w-32 bg-white border border-slate-200 text-sm font-bold rounded-lg block px-4 py-2 pr-8 outline-none cursor-pointer transition-colors disabled:cursor-not-allowed focus:ring-2"
                            style={{ color: BRAND_BLUE }}
                            aria-label="Select year to view projection"
                        >
                            {data.map((_, idx) => (
                                <option key={idx} value={idx}>Year {idx + 1}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2" style={{ color: BRAND_BLUE }} aria-hidden="true">
                            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts side by side */}
            <div className="flex flex-col lg:flex-row gap-6 w-full">
                {/* Donut Chart */}
                <div className="w-full lg:w-1/2 min-h-[380px]">
                    <WealthMilestoneRings safeIndex={safeIndex} totalYears={data.length} yearData={yearData} />
                </div>

                {/* Bar Chart */}
                <div className="flex-1 w-full lg:w-1/2 h-[400px] lg:h-[450px] bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 flex flex-col">
                    <h3 className="font-bold text-slate-800 mb-6 tracking-tight" id="bar-chart-heading">Portfolio Breakdown</h3>
                    <div className="w-full h-64 lg:h-full" role="img" aria-labelledby="bar-chart-heading">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="barInvested" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={BRAND_BLUE2} />
                                        <stop offset="100%" stopColor={BRAND_BLUE} />
                                    </linearGradient>
                                    <linearGradient id="barReturns" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#3a6db5" />
                                        <stop offset="100%" stopColor={BRAND_BLUE} />
                                    </linearGradient>
                                    <linearGradient id="barTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#2a5a9f" />
                                        <stop offset="100%" stopColor="#1a3c6a" />
                                    </linearGradient>
                                    <linearGradient id="barGoal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#e35550" />
                                        <stop offset="100%" stopColor={BRAND_RED} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    interval={0}
                                    tick={{ fill: BRAND_GREY, fontSize: 11, fontWeight: 600 }}
                                />
                                <YAxis
                                    tickFormatter={(v) => formatCurrencySimple(v)}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: BRAND_GREY, fontSize: 11 }}
                                />
                                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(34,76,135,0.04)' }} />
                                <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={900}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fillId} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
