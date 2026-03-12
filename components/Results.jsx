import { formatCurrency, formatCurrencySimple } from '../utils/financeCalculations';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, AlertCircle, Clock } from 'lucide-react';

export default function Results({ results }) {
    if (!results) return null;

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* SIP Result Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-[0_20px_40px_rgba(16,185,129,0.3)] bg-gradient-to-br from-emerald-500 to-teal-700 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="relative z-10 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-emerald-100 font-medium tracking-wide uppercase text-sm mb-2">
                            <TrendingUp size={18} />
                            Required Monthly SIP
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter tabular-nums drop-shadow-sm">
                            {formatCurrency(results.sip)}
                        </h2>
                        <div className="mt-6 flex flex-col sm:flex-row gap-4">
                            <div className="bg-white/10 p-4 rounded-2xl flex-1 backdrop-blur-md border border-white/20">
                                <div className="text-emerald-100 text-xs uppercase tracking-wider mb-1">Target Wealth</div>
                                <div className="text-xl sm:text-2xl font-semibold tabular-nums">
                                    {formatCurrencySimple(results.fv)}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Investment Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-200/60 flex flex-col justify-center"
                    >
                        <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Investment</div>
                        <div className="text-2xl font-bold text-slate-800 tabular-nums">
                            {formatCurrencySimple(results.totalInvestment)}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-200/60 flex flex-col justify-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                        <div className="relative z-10">
                            <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Wealth Created (Magic!)</div>
                            <div className="text-2xl font-bold text-blue-600 tabular-nums flex items-center gap-2">
                                + {formatCurrencySimple(results.wealthCreated)}
                                <ArrowUpRight strokeWidth={3} className="text-blue-500" size={20} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bonus Feature: Delaying Investment Comparison */}
            {results.delayedSip > results.sip && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-6 border border-orange-100 shadow-sm"
                >
                    <div className="flex gap-4">
                        <div className="hidden sm:flex bg-orange-100/50 p-4 rounded-full items-center justify-center text-orange-600 h-16 w-16 shadow-inner">
                            <Clock size={28} />
                        </div>
                        <div className="flex flex-col flex-1">
                            <h4 className="flex items-center gap-2 font-bold text-slate-800 text-lg sm:text-xl">
                                The Cost of Delay <AlertCircle size={18} className="text-orange-500" />
                            </h4>
                            <p className="text-slate-600 leading-relaxed text-sm sm:text-base mt-2">
                                If you wait <strong>{results.delayedYears} years</strong> before investing, your required monthly SIP to hit this goal jumps to <strong className="text-red-600 text-lg tabular-nums">{formatCurrency(results.delayedSip)}</strong>.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Educational Insights */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-2 text-sm text-slate-500 flex flex-wrap gap-4 items-center justify-center bg-slate-100 p-4 rounded-2xl h-fit flex-none w-full"
            >
                <span className="bg-white px-3 py-1.5 rounded-full shadow-sm text-xs font-medium border border-slate-200">
                    💡 Starting earlier reduces the SIP required!
                </span>
                <span className="bg-white px-3 py-1.5 rounded-full shadow-sm text-xs font-medium border border-slate-200">
                    📈 Inflation increases the future cost of your goals.
                </span>
            </motion.div>
        </div>
    );
}
