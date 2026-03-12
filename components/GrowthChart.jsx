import { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { formatCurrencySimple } from '../utils/financeCalculations';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white/95 backdrop-blur-xl p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100/50">
                <span className="text-xs uppercase font-bold tracking-wider" style={{ color: data.fill }}>
                    {data.name}
                </span>
                <span className="block font-bold text-slate-900 tabular-nums text-2xl mt-1">
                    {formatCurrencySimple(data.value)}
                </span>
            </div>
        );
    }
    return null;
};

export default function GrowthChart({ data }) {
    const [selectedYearIndex, setSelectedYearIndex] = useState(0);

    // Reset the slider to the max year whenever the goal timeline changes
    useEffect(() => {
        if (data && data.length > 0) {
            setSelectedYearIndex(data.length - 1);
        }
    }, [data]);

    if (!data || data.length === 0) return null;

    // Safety bounds
    const safeIndex = Math.min(Math.max(selectedYearIndex, 0), data.length - 1);
    const yearData = data[safeIndex];

    const chartData = [
        { name: "Money You Put In", value: yearData.invested, fill: "#3b82f6" },     // Blue
        { name: "Magic Money", value: yearData.portfolioValue, fill: "#10b981" },    // Green
        { name: "Target Price", value: yearData.goalCost, fill: "#f43f5e" }          // Red
    ];

    return (
        <div className="w-full h-[450px] mt-2 bg-white/50 rounded-3xl p-4 sm:p-6 backdrop-blur-md shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="font-bold text-slate-800 tracking-tight flex items-center gap-2">
                    <span className="text-xl">🚀</span> Time Machine
                </h3>

                {/* Time Travel Selector */}
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 w-full sm:w-auto">
                    <label htmlFor="year-select" className="text-sm font-semibold text-slate-500 whitespace-nowrap">Explore Year:</label>
                    <div className="relative">
                        <select
                            id="year-select"
                            value={safeIndex}
                            onChange={(e) => setSelectedYearIndex(parseInt(e.target.value))}
                            className="appearance-none w-full sm:w-32 bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200/60 text-emerald-700 text-sm font-bold rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block px-4 py-2 pr-8 outline-none cursor-pointer transition-colors"
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

            <div className="flex-1 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                        />
                        <YAxis
                            tickFormatter={(value) => formatCurrencySimple(value)}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                        />
                        <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={800}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
