import { formatCurrencySimple } from '../utils/financeCalculations';

export default function CalculatorForm({ values, onChange }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        let pVal = parseFloat(value);
        if (isNaN(pVal)) pVal = '';
        onChange({ ...values, [name]: value === '' ? '' : pVal });
    };

    return (
        <div className="bg-white/80 backdrop-blur-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 rounded-3xl p-6 sm:p-8 w-full max-w-[500px]">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center tracking-tight">Set Your Targets</h2>

            <div className="space-y-8">
                {/* Goal Cost Slider */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-1">
                        <label className="flex flex-col text-sm font-semibold text-slate-500 uppercase tracking-wider">
                            Goal Cost Today
                            <span className="text-xs text-emerald-600 font-bold normal-case mt-0.5">
                                {formatCurrencySimple(values.presentCost || 0)}
                            </span>
                        </label>
                        <div className="flex items-center gap-1 bg-slate-100/50 hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/50 transition-all px-3 py-1.5 rounded-xl border border-slate-200">
                            <span className="text-slate-400 font-bold text-sm">₹</span>
                            <input
                                type="number"
                                name="presentCost"
                                value={values.presentCost}
                                onChange={handleChange}
                                className="w-24 bg-transparent text-lg font-bold text-slate-800 tabular-nums focus:outline-none text-right"
                            />
                        </div>
                    </div>
                    <input
                        type="range"
                        name="presentCost"
                        min="100000"
                        max="100000000"
                        step="100000"
                        value={values.presentCost}
                        onChange={handleChange}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                </div>

                {/* Years Slider */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Years to Achieve</label>
                        <div className="flex items-center gap-1 bg-slate-100/50 hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/50 transition-all px-3 py-1.5 rounded-xl border border-slate-200">
                            <input
                                type="number"
                                name="years"
                                value={values.years}
                                onChange={handleChange}
                                className="w-16 bg-transparent text-lg font-bold text-slate-800 tabular-nums focus:outline-none text-right"
                            />
                            <span className="text-slate-400 font-semibold text-sm">Yrs</span>
                        </div>
                    </div>
                    <input
                        type="range"
                        name="years"
                        min="1"
                        max="40"
                        step="1"
                        value={values.years}
                        onChange={handleChange}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                </div>

                {/* Expected Return Slider */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Expected Return</label>
                        <div className="flex items-center gap-1 bg-slate-100/50 hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/50 transition-all px-3 py-1.5 rounded-xl border border-slate-200">
                            <input
                                type="number"
                                name="expectedReturn"
                                step="0.5"
                                value={values.expectedReturn}
                                onChange={handleChange}
                                className="w-16 bg-transparent text-lg font-bold text-slate-800 tabular-nums focus:outline-none text-right"
                            />
                            <span className="text-slate-400 font-semibold text-sm">% p.a.</span>
                        </div>
                    </div>
                    <input
                        type="range"
                        name="expectedReturn"
                        min="1"
                        max="30"
                        step="0.5"
                        value={values.expectedReturn}
                        onChange={handleChange}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                </div>

                {/* Inflation Slider */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Inflation Rate</label>
                        <div className="flex items-center gap-1 bg-slate-100/50 hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/50 transition-all px-3 py-1.5 rounded-xl border border-slate-200">
                            <input
                                type="number"
                                name="inflation"
                                step="0.5"
                                value={values.inflation}
                                onChange={handleChange}
                                className="w-16 bg-transparent text-lg font-bold text-slate-800 tabular-nums focus:outline-none text-right"
                            />
                            <span className="text-slate-400 font-semibold text-sm">% p.a.</span>
                        </div>
                    </div>
                    <input
                        type="range"
                        name="inflation"
                        min="1"
                        max="15"
                        step="0.5"
                        value={values.inflation}
                        onChange={handleChange}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                </div>
            </div>
        </div>
    );
}
