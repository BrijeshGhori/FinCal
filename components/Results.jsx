import { formatCurrency, formatCurrencySimple } from '../utils/financeCalculations';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

export default function Results({ results }) {
    if (!results) return null;

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* SIP Result Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
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

            {/* Investment Details Stack */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-white/50 dark:border-slate-700/50 flex flex-col justify-center cursor-default hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300"
            >
                <div className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Total Investment</div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white tabular-nums">
                    {formatCurrencySimple(results.totalInvestment)}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-white/50 dark:border-slate-700/50 flex flex-col justify-center relative overflow-hidden cursor-default hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 group"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="relative z-10">
                    <div className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Wealth Created (Magic!)</div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 tabular-nums flex items-center gap-2">
                        + {formatCurrencySimple(results.wealthCreated)}
                        <ArrowUpRight strokeWidth={3} className="text-blue-500 dark:text-blue-400" size={20} />
                    </div>
                </div>
            </motion.div>

        </div>
    );
}
