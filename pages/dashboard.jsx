import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateGoalSIP } from '../utils/financeCalculations';
import CalculatorForm from '../components/CalculatorForm';
import Results from '../components/Results';
import GrowthChart from '../components/GrowthChart';
import { useRouter } from 'next/router';
import {
    HomeIcon, AcademicCapIcon, TruckIcon, GlobeAltIcon,
    BriefcaseIcon, HeartIcon, ShieldExclamationIcon,
    ArrowLeftOnRectangleIcon, ChartPieIcon
} from '@heroicons/react/24/outline';
import { AlertCircle, Clock, Moon, Sun } from 'lucide-react';
import { formatCurrency } from '../utils/financeCalculations';

const GOALS = [
    { id: 'house', title: 'Buy a House', icon: HomeIcon, defaultCost: 5000000, defaultYears: 10, color: 'emerald' },
    { id: 'education', title: 'Child Education', icon: AcademicCapIcon, defaultCost: 2000000, defaultYears: 15, color: 'blue' },
    { id: 'retirement', title: 'Retirement Fund', icon: ChartPieIcon, defaultCost: 20000000, defaultYears: 25, color: 'purple' },
    { id: 'car', title: 'Buy a Car', icon: TruckIcon, defaultCost: 1000000, defaultYears: 5, color: 'sky' },
    { id: 'business', title: 'Start a Business', icon: BriefcaseIcon, defaultCost: 3000000, defaultYears: 8, color: 'amber' },
    { id: 'wedding', title: 'Dream Wedding', icon: HeartIcon, defaultCost: 2000000, defaultYears: 4, color: 'rose' },
    { id: 'travel', title: 'Travel Fund', icon: GlobeAltIcon, defaultCost: 500000, defaultYears: 3, color: 'teal' },
    { id: 'emergency', title: 'Emergency Fund', icon: ShieldExclamationIcon, defaultCost: 300000, defaultYears: 1, color: 'red' },
];

export default function Dashboard() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [activeGoal, setActiveGoal] = useState(null);
    const [formValues, setFormValues] = useState(null);
    const [results, setResults] = useState(null);
    const [showChangesPanel, setShowChangesPanel] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Re-calculate when values change
    useEffect(() => {
        if (formValues) {
            const res = calculateGoalSIP(formValues);
            setResults(res);
        }
    }, [formValues]);

    // Apply dark mode to document body
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const handleSelectGoal = (goal) => {
        setActiveGoal(goal);
        setFormValues({
            presentCost: goal.defaultCost,
            years: goal.defaultYears,
            expectedReturn: 12,
            inflation: 6,
        });
        setStep(2);
    };

    const handleNext = () => {
        setShowChangesPanel(false);
        setStep(3);
        // Scroll to top smoothly if we transition views
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Head>
                <title>Dashboard | FinCal.io</title>
            </Head>

            <div className="min-h-screen relative font-sans text-slate-900 pb-20 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
                {/* Navbar */}
                <nav className="flex items-center justify-between px-6 sm:px-10 py-6 max-w-7xl mx-auto w-full z-10 relative">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100 cursor-pointer" onClick={() => router.push('/')}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-sky-500 flex items-center justify-center shadow-inner shrink-0">
                            <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                        FinCal
                    </div>

                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/')}
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-slate-500 hover:bg-white hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors font-semibold text-sm"
                        >
                            <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">Exit</span>
                        </motion.button>
                    </div>
                </nav>

                <main className="relative z-0">
                    {/* Subtle background glow */}
                    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
                    <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-sky-400/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

                    <div className="px-6 sm:px-10 pb-10 pt-0 max-w-7xl mx-auto w-full">
                        <AnimatePresence mode="wait">

                            {/* STEP 1: SELECT GOAL */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="max-w-4xl mx-auto mt-6 md:mt-16 text-center"
                                >
                                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">What are you saving for?</h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-lg mb-12">Select a financial goal to start planning your wealth trajectory.</p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                                        {GOALS.map((goal) => (
                                            <motion.button
                                                key={goal.id}
                                                whileHover={{ scale: 1.03, y: -4 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => handleSelectGoal(goal)}
                                                className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-[2rem] shadow-sm hover:shadow-xl border border-slate-100/60 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-500/50 transition-all group"
                                            >
                                                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-4 transition-colors">
                                                    <goal.icon className="w-8 h-8 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                                                </div>
                                                <span className="font-bold text-slate-700 dark:text-slate-300">{goal.title}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: INPUT VALUES */}
                            {step === 2 && activeGoal && formValues && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="max-w-[500px] mx-auto mt-4 sm:mt-10"
                                >
                                    <motion.button
                                        whileHover={{ x: -4 }}
                                        onClick={() => setStep(1)}
                                        className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-2 mb-8 font-semibold transition-colors"
                                    >
                                        ← Back to Goals
                                    </motion.button>

                                    <div className="flex items-center gap-4 mb-8 pl-2">
                                        <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/50 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                                            <activeGoal.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">{activeGoal.title}</h2>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">Configure your target timeline</p>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <CalculatorForm values={formValues} onChange={setFormValues} />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleNext}
                                        className="w-full mt-6 bg-slate-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 dark:shadow-emerald-900/20 flex items-center justify-center gap-2"
                                    >
                                        Calculate Magic ✨
                                    </motion.button>
                                </motion.div>
                            )}

                            {/* STEP 3: RESULTS & GRAPH */}
                            {step === 3 && activeGoal && results && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="max-w-7xl mx-auto mt-4"
                                >
                                    <motion.button
                                        whileHover={{ x: -4 }}
                                        onClick={() => setStep(2)}
                                        className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-2 mb-6 font-semibold transition-colors"
                                    >
                                        ← Back to Setup
                                    </motion.button>

                                    <motion.header
                                        initial={{ y: -10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="flex items-center gap-3 sm:gap-4 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 mb-8"
                                    >
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-800/20 rounded-lg sm:rounded-xl flex items-center justify-center shadow-inner border border-emerald-100/50 dark:border-emerald-800/50 shrink-0">
                                            <activeGoal.icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div>
                                            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none mb-1">
                                                {activeGoal.title} Plan
                                            </h1>
                                            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                                                Your financial trajectory is mapped out below.
                                            </p>
                                        </div>
                                    </motion.header>

                                    {/* Stacked View Container */}
                                    <div className="flex flex-col gap-8 w-full mt-4">
                                        <div className="w-full">
                                            <GrowthChart data={results?.chartData} />
                                        </div>

                                        <div className="w-full mt-2">
                                            <Results results={results} />
                                        </div>

                                        {/* Bonus Feature: Delaying Investment Comparison */}
                                        {results?.delayedSip > results?.sip && (
                                            <div className="w-full">
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                                                    className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/50 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] cursor-default transition-all group relative overflow-hidden"
                                                >
                                                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/10 dark:bg-orange-500/10 rounded-full blur-[80px] -z-10 pointer-events-none group-hover:bg-orange-400/20 transition-colors duration-700" />
                                                    <div className="flex gap-4 relative z-10">
                                                        <div className="hidden sm:flex bg-gradient-to-br from-orange-100 to-red-50 dark:from-orange-500/20 dark:to-red-500/10 p-4 rounded-2xl items-center justify-center text-orange-600 dark:text-orange-400 h-16 w-16 shadow-inner border border-orange-200/50 dark:border-orange-500/20">
                                                            <Clock size={28} />
                                                        </div>
                                                        <div className="flex flex-col flex-1">
                                                            <h4 className="flex items-center gap-2 font-extrabold text-slate-800 dark:text-slate-100 text-lg sm:text-xl tracking-tight">
                                                                The Cost of Delay <AlertCircle size={18} className="text-orange-500" />
                                                            </h4>
                                                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base mt-2">
                                                                If you wait <strong className="text-slate-800 dark:text-slate-100">{results.delayedYears} years</strong> before investing, your required monthly SIP to hit this goal jumps to <strong className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400 text-lg tabular-nums font-black">{formatCurrency(results.delayedSip)}</strong>.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Advanced Settings Revealer */}
                                    <div className="mt-16 flex flex-col items-center">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setShowChangesPanel(!showChangesPanel);
                                                // Wait for render then scroll bottom
                                                setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 50);
                                            }}
                                            className="bg-white dark:bg-slate-800 border text-lg border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-8 py-4 rounded-full font-bold shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-500 transition-all inline-flex items-center gap-3 relative"
                                        >
                                            Want changes? ⚙️
                                        </motion.button>

                                        <AnimatePresence>
                                            {showChangesPanel && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0, y: -20 }}
                                                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                                                    exit={{ opacity: 0, height: 0, y: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="w-full overflow-hidden mt-8 max-w-[500px] mx-auto"
                                                >
                                                    <CalculatorForm values={formValues} onChange={setFormValues} />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                </motion.div>
                            )}

                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </>
    );
}
