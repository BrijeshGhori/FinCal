import { formatCurrencySimple } from '../utils/financeCalculations';

export default function CalculatorForm({ values, onChange }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        let pVal = parseFloat(value);
        if (isNaN(pVal)) pVal = '';
        onChange({ ...values, [name]: value === '' ? '' : pVal });
    };

    const inputBoxClass = "flex items-center gap-1 bg-slate-50 hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 transition-all px-3 py-1.5 rounded-lg border border-slate-200";
    const inputStyle = { '--tw-ring-color': '#224c87' };

    return (
        <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8 w-full max-w-[500px] border border-slate-200 transition-colors">
            <h2 className="text-xl font-bold text-slate-800 mb-6 text-center tracking-tight">Configure Your Goal</h2>

            <div className="space-y-8">
                {/* Goal Cost */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <label htmlFor="input-presentCost" className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                            Goal Cost Today
                            <span className="block text-xs font-bold normal-case mt-0.5" style={{ color: '#224c87' }}>
                                {formatCurrencySimple(values.presentCost || 0)}
                            </span>
                        </label>
                        <div className={inputBoxClass} style={inputStyle}>
                            <span className="text-slate-400 font-bold text-sm" aria-hidden="true">₹</span>
                            <input
                                id="input-presentCost"
                                type="number"
                                name="presentCost"
                                value={values.presentCost}
                                onChange={handleChange}
                                aria-label="Goal cost today in rupees"
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
                        aria-label="Goal cost slider"
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Years to Achieve */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <label htmlFor="input-years" className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Years to Achieve</label>
                        <div className={inputBoxClass} style={inputStyle}>
                            <input
                                id="input-years"
                                type="number"
                                name="years"
                                value={values.years}
                                onChange={handleChange}
                                aria-label="Number of years"
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
                        aria-label="Years to achieve slider"
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Expected Return */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <label htmlFor="input-return" className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Expected Annual Return</label>
                        <div className={inputBoxClass} style={inputStyle}>
                            <input
                                id="input-return"
                                type="number"
                                name="expectedReturn"
                                step="0.5"
                                value={values.expectedReturn}
                                onChange={handleChange}
                                aria-label="Expected annual return percentage"
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
                        aria-label="Expected return rate slider"
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Inflation Rate */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <label htmlFor="input-inflation" className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Inflation Rate</label>
                        <div className={inputBoxClass} style={inputStyle}>
                            <input
                                id="input-inflation"
                                type="number"
                                name="inflation"
                                step="0.5"
                                value={values.inflation}
                                onChange={handleChange}
                                aria-label="Inflation rate percentage"
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
                        aria-label="Inflation rate slider"
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
}
