import { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrencySimple } from '../utils/financeCalculations';

const WealthMilestoneRings = ({ safeIndex, totalYears, yearData }) => {
    const progress = totalYears > 1 ? safeIndex / (totalYears - 1) : 0;

    const targetGoal = yearData.goalCost;
    const invested = yearData.invested;
    const magicMoney = Math.max(0, yearData.portfolioValue - yearData.invested);
    const totalWealth = yearData.portfolioValue;

    // Fractions for Stacked Donut Chart (Capped at 1 for visual ring)
    const i_f = Math.min(1, invested / targetGoal);
    const m_f = Math.min(1 - i_f, magicMoney / targetGoal);
    const totalPercent = Math.min(100, (totalWealth / targetGoal) * 100);

    // SVG and Ring parameters
    const size = 180;
    const strokeWidth = 18;
    const center = size / 2;
    const radius = center - strokeWidth;

    const circumference = 2 * Math.PI * radius;

    const dashOffsetInvested = circumference - (i_f * circumference);
    const dashOffsetMagic = circumference - (m_f * circumference);

    // Magic money circle rotates to start exactly where the Invested circle ends
    const rotationMagic = i_f * 360;

    return (
        <div className="w-full h-full relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 overflow-hidden border border-white/50 dark:border-slate-700/50 flex flex-col items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-colors group">

            {/* Top Info */}
            <div className="flex flex-col w-full text-center z-10 mb-4 md:mb-8">
                <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 drop-shadow-sm">Year {safeIndex + 1} Status</span>
                <span className="text-4xl font-black bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent tabular-nums tracking-tight">
                    {formatCurrencySimple(totalWealth)}
                </span>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2">
                    of {formatCurrencySimple(targetGoal)} Goal
                </span>
            </div>

            {/* Center Rings */}
            <div className="relative flex justify-center items-center w-full z-10 mb-6 md:mb-10">
                <svg width={size} height={size} className="transform -rotate-90 origin-center drop-shadow-lg">
                    <defs>
                        <linearGradient id="investedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" /> {/* sky-400 */}
                            <stop offset="100%" stopColor="#2563eb" /> {/* blue-600 */}
                        </linearGradient>
                        <linearGradient id="magicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#34d399" /> {/* emerald-400 */}
                            <stop offset="100%" stopColor="#059669" /> {/* emerald-600 */}
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Background Track */}
                    <circle
                        cx={center} cy={center} r={radius}
                        className="stroke-slate-200/50 dark:stroke-slate-800"
                        strokeWidth={strokeWidth} fill="transparent"
                    />

                    {/* Invested Progress */}
                    {i_f > 0 && (
                        <motion.circle
                            cx={center} cy={center} r={radius}
                            stroke="url(#investedGradient)"
                            className="transition-colors drop-shadow-sm"
                            strokeWidth={strokeWidth} fill="transparent"
                            strokeLinecap="round"
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: dashOffsetInvested }}
                            transition={{ type: "spring", bounce: 0, duration: 1 }}
                            strokeDasharray={circumference}
                        />
                    )}

                    {/* Magic Money Progress */}
                    {m_f > 0 && (
                        <motion.circle
                            cx={center} cy={center} r={radius}
                            stroke="url(#magicGradient)"
                            className="transition-colors drop-shadow-sm"
                            strokeWidth={strokeWidth} fill="transparent"
                            strokeLinecap="round"
                            initial={{ strokeDashoffset: circumference, rotate: 0 }}
                            animate={{ strokeDashoffset: dashOffsetMagic, rotate: rotationMagic }}
                            transition={{ type: "spring", bounce: 0, duration: 1 }}
                            style={{ transformOrigin: `${center}px ${center}px` }}
                            strokeDasharray={circumference}
                            filter="url(#glow)"
                        />
                    )}
                </svg>

                {/* Center Text */}
                <div className="absolute flex flex-col items-center justify-center mt-1 scale-100 group-hover:scale-105 transition-transform duration-500">
                    <motion.span
                        key={totalPercent.toFixed(0)}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl font-black bg-gradient-to-br from-emerald-600 to-sky-500 dark:from-emerald-400 dark:to-sky-400 bg-clip-text text-transparent tabular-nums drop-shadow-sm"
                    >
                        {totalPercent.toFixed(0)}%
                    </motion.span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Reached</span>
                </div>
            </div>

            {/* Bottom Legend */}
            <div className="flex flex-row justify-center gap-6 md:gap-10 w-full z-10">
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 shadow-sm shrink-0"></div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Money</span>
                        <span className="text-base font-bold text-slate-800 dark:text-slate-200 tabular-nums leading-tight">
                            {formatCurrencySimple(invested)}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-sm relative shrink-0">
                        {magicMoney > invested && (
                            <motion.span
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -inset-1 bg-emerald-400 rounded-full blur-sm -z-10"
                            />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">Magic Money ✨</span>
                        <span className="text-base font-bold text-slate-800 dark:text-slate-200 tabular-nums leading-tight">
                            + {formatCurrencySimple(magicMoney)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Background Flair */}
            {progress > 0.05 && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0 transition-opacity duration-1000" style={{ opacity: progress }}>
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-400/20 dark:bg-emerald-500/10 blur-[60px] rounded-full"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-sky-400/20 dark:bg-sky-500/10 blur-[60px] rounded-full"></div>
                </div>
            )}
        </div>
    );
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100/50 dark:border-slate-700/50 transition-colors">
                <span className="text-xs uppercase font-bold tracking-wider" style={{ color: data.textColor || '#64748b' }}>
                    {data.name}
                </span>
                <span className="block font-bold text-slate-900 dark:text-white tabular-nums text-2xl mt-1">
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

    // Initial animation when data loads/changes
    useEffect(() => {
        if (!data || data.length === 0) return;

        // Start animation sequence
        setIsAnimating(true);
        setSelectedYearIndex(0); // Start at year 0

        let currentYear = 0;
        const maxYear = data.length - 1;

        const intervalId = setInterval(() => {
            currentYear++;
            if (currentYear <= maxYear) {
                setSelectedYearIndex(currentYear);
            } else {
                clearInterval(intervalId);
                setIsAnimating(false); // Done animating
            }
        }, 300); // 300ms per year jump

        return () => clearInterval(intervalId);
    }, [data]);

    if (!data || data.length === 0) return null;

    // Safety bounds
    const safeIndex = Math.min(Math.max(selectedYearIndex, 0), data.length - 1);
    const yearData = data[safeIndex];

    const magicMoney = Math.max(0, yearData.portfolioValue - yearData.invested);

    const chartData = [
        { name: "Your Money", value: yearData.invested, fillId: "url(#barInvested)", textColor: "#3b82f6" },
        { name: "Magic Money", value: magicMoney, fillId: "url(#barMagic)", textColor: "#10b981" },
        { name: "Total Wealth", value: yearData.portfolioValue, fillId: "url(#barTotal)", textColor: "#6366f1" },
        { name: "Target Goal", value: yearData.goalCost, fillId: "url(#barTarget)", textColor: "#f43f5e" }
    ];

    return (
        <div className="w-full mt-2 flex flex-col gap-6 relative">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/60 dark:bg-slate-900/60 rounded-3xl p-4 sm:px-6 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/50 dark:border-slate-700/50 transition-colors gap-4 z-10">
                <h3 className="font-extrabold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
                    <span className="text-xl drop-shadow-sm">🚀</span> Time Machine
                </h3>

                {/* Time Travel Selector */}
                <div className={`flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 w-full sm:w-auto transition-all ${isAnimating ? 'opacity-50 grayscale select-none' : ''}`}>
                    {isAnimating ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">Year {safeIndex + 1}...</span>
                        </div>
                    ) : (
                        <label htmlFor="year-select" className="text-sm font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">Explore Year:</label>
                    )}
                    <div className="relative">
                        <select
                            id="year-select"
                            value={safeIndex}
                            disabled={isAnimating}
                            onChange={(e) => setSelectedYearIndex(parseInt(e.target.value))}
                            className="appearance-none w-full sm:w-32 bg-slate-100/80 hover:bg-slate-200/80 dark:bg-slate-900/80 dark:hover:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-emerald-700 dark:text-emerald-400 text-sm font-bold rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block px-4 py-2 pr-8 outline-none cursor-pointer transition-colors disabled:cursor-not-allowed"
                        >
                            {data.map((_, idx) => (
                                <option key={idx} value={idx}>
                                    Year {idx + 1}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-emerald-600">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 w-full">
                {/* Donut Chart (Left Side on large screens) */}
                <div className="w-full lg:w-1/2 min-h-[400px]">
                    <WealthMilestoneRings safeIndex={safeIndex} totalYears={data.length} yearData={yearData} />
                </div>

                {/* Bar Graph (Right Side on large screens) */}
                <div className="flex-1 w-full lg:w-1/2 h-[400px] lg:h-[450px] bg-white/60 dark:bg-slate-900/60 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/50 dark:border-slate-700/50 flex flex-col transition-colors relative overflow-hidden group">
                    {/* Background glow for chart */}
                    <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-emerald-400/5 dark:bg-emerald-500/5 rounded-full blur-[80px] -z-10 pointer-events-none group-hover:bg-emerald-400/10 transition-colors duration-700" />

                    <h3 className="font-extrabold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2 tracking-tight">
                        <span className="drop-shadow-sm text-lg">📈</span> Growth Breakdown
                    </h3>
                    <div className="w-full h-64 lg:h-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="barInvested" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#38bdf8" />
                                        <stop offset="100%" stopColor="#2563eb" />
                                    </linearGradient>
                                    <linearGradient id="barMagic" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#34d399" />
                                        <stop offset="100%" stopColor="#059669" />
                                    </linearGradient>
                                    <linearGradient id="barTarget" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#fb7185" />
                                        <stop offset="100%" stopColor="#e11d48" />
                                    </linearGradient>
                                    <linearGradient id="barTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#818cf8" />
                                        <stop offset="100%" stopColor="#4f46e5" />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    interval={0}
                                    tick={{ fill: '#64748b', fontSize: 13, fontWeight: 600 }}
                                />
                                <YAxis
                                    tickFormatter={(value) => formatCurrencySimple(value)}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                />
                                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                                <Bar dataKey="value" radius={[12, 12, 0, 0]} animationDuration={1000}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fillId} className="drop-shadow-md" />
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
