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
import { AlertCircle, Clock } from 'lucide-react';
import { formatCurrency } from '../utils/financeCalculations';

const GOALS = [
    { id: 'house',      title: 'Buy a House',        icon: HomeIcon,              defaultCost: 5000000,  defaultYears: 10 },
    { id: 'education',  title: 'Child Education',     icon: AcademicCapIcon,       defaultCost: 2000000,  defaultYears: 15 },
    { id: 'retirement', title: 'Retirement Fund',     icon: ChartPieIcon,          defaultCost: 20000000, defaultYears: 25 },
    { id: 'car',        title: 'Buy a Car',           icon: TruckIcon,             defaultCost: 1000000,  defaultYears: 5  },
    { id: 'business',   title: 'Start a Business',    icon: BriefcaseIcon,         defaultCost: 3000000,  defaultYears: 8  },
    { id: 'wedding',    title: 'Wedding Fund',        icon: HeartIcon,             defaultCost: 2000000,  defaultYears: 4  },
    { id: 'travel',     title: 'Travel Fund',         icon: GlobeAltIcon,          defaultCost: 500000,   defaultYears: 3  },
    { id: 'emergency',  title: 'Emergency Fund',      icon: ShieldExclamationIcon, defaultCost: 300000,   defaultYears: 1  },
];

export default function Dashboard() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [activeGoal, setActiveGoal] = useState(null);
    const [formValues, setFormValues] = useState(null);
    const [results, setResults] = useState(null);
    const [showChangesPanel, setShowChangesPanel] = useState(false);

    useEffect(() => {
        if (formValues) {
            const res = calculateGoalSIP(formValues);
            setResults(res);
        }
    }, [formValues]);

    const handleSelectGoal = (goal) => {
        setActiveGoal(goal);
        setFormValues({
            presentCost:    goal.defaultCost,
            years:          goal.defaultYears,
            expectedReturn: 12,
            inflation:      6,
        });
        setStep(2);
    };

    const handleNext = () => {
        setShowChangesPanel(false);
        setStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Head>
                <title>Dashboard | GoalFi</title>
                <meta name="description" content="Calculate your monthly SIP for any financial goal, adjusted for inflation." />
            </Head>

            <div className="min-h-screen relative font-sans text-slate-900 pb-20 bg-slate-50 transition-colors duration-300">

                {/* Navbar */}
                <nav className="flex items-center justify-between px-6 sm:px-10 py-5 max-w-7xl mx-auto w-full z-10 relative border-b border-slate-200 bg-white" aria-label="Dashboard navigation">
                    <button
                        className="flex items-center gap-2.5 font-bold text-xl tracking-tight focus-visible:outline-2"
                        style={{ color: '#224c87' }}
                        onClick={() => router.push('/')}
                        aria-label="Go to home page"
                    >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: '#224c87' }}>
                            <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                        GoalFi
                    </button>

                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                        aria-label="Exit to home"
                    >
                        <ArrowLeftOnRectangleIcon className="w-4 h-4" aria-hidden="true" />
                        <span className="hidden sm:inline">Exit</span>
                    </button>
                </nav>

                <main className="relative z-0">
                    <div className="px-6 sm:px-10 pb-10 pt-6 max-w-7xl mx-auto w-full">
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
                                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">What are you saving for?</h1>
                                    <p className="text-slate-500 text-lg mb-12">Select a financial goal to begin your SIP projection.</p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6" role="list" aria-label="Goal options">
                                        {GOALS.map((goal) => (
                                            <motion.button
                                                key={goal.id}
                                                role="listitem"
                                                whileHover={{ scale: 1.02, y: -3 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => handleSelectGoal(goal)}
                                                className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-200 hover:border-[#224c87]/40 transition-all group"
                                                aria-label={`Select goal: ${goal.title}`}
                                            >
                                                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:bg-[#224c87]/10" style={{ background: '#f1f5f9' }}>
                                                    <goal.icon className="w-7 h-7 text-slate-400 group-hover:text-[#224c87] transition-colors" aria-hidden="true" />
                                                </div>
                                                <span className="font-semibold text-slate-700 text-sm">{goal.title}</span>
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
                                    <button
                                        onClick={() => setStep(1)}
                                        className="text-slate-500 hover:text-slate-800 flex items-center gap-2 mb-8 font-semibold transition-colors text-sm"
                                        aria-label="Back to goal selection"
                                    >
                                        ← Back to Goals
                                    </button>

                                    <div className="flex items-center gap-4 mb-8 pl-2">
                                        <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border border-slate-200" style={{ background: 'rgba(34,76,135,0.07)' }}>
                                            <activeGoal.icon className="w-7 h-7" style={{ color: '#224c87' }} aria-hidden="true" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">{activeGoal.title}</h2>
                                            <p className="text-slate-500 text-sm mt-1">Adjust the parameters to match your goal.</p>
                                        </div>
                                    </div>

                                    <CalculatorForm values={formValues} onChange={setFormValues} />

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleNext}
                                        className="w-full mt-6 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md flex items-center justify-center gap-2"
                                        style={{ background: '#224c87' }}
                                        aria-label="Calculate SIP projection"
                                    >
                                        Calculate Projection
                                    </motion.button>
                                </motion.div>
                            )}

                            {/* STEP 3: RESULTS & GRAPH */}
                            {step === 3 && activeGoal && results && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="max-w-7xl mx-auto mt-4"
                                >
                                    <button
                                        onClick={() => setStep(2)}
                                        className="text-slate-500 hover:text-slate-800 flex items-center gap-2 mb-6 font-semibold transition-colors text-sm"
                                        aria-label="Back to setup"
                                    >
                                        ← Back to Setup
                                    </button>

                                    {/* Goal Header */}
                                    <header className="flex items-center gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-slate-200 mb-8">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0 border border-slate-200" style={{ background: 'rgba(34,76,135,0.07)' }}>
                                            <activeGoal.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#224c87' }} aria-hidden="true" />
                                        </div>
                                        <div>
                                            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">
                                                {activeGoal.title} — SIP Projection
                                            </h1>
                                            <p className="text-slate-500 text-xs">
                                                Your inflation-adjusted financial trajectory is mapped below.
                                            </p>
                                        </div>
                                    </header>

                                    {/* Charts + Results */}
                                    <div className="flex flex-col gap-8 w-full">
                                        <div className="w-full">
                                            <GrowthChart data={results?.chartData} />
                                        </div>

                                        <div className="w-full">
                                            <Results results={results} />
                                        </div>

                                        {/* Cost of Delay Warning */}
                                        {results?.delayedSip > results?.sip && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.97 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="bg-white rounded-2xl p-6 md:p-8 border shadow-sm"
                                                style={{ borderColor: '#da3832' + '33' }}
                                                role="alert"
                                                aria-label="Investment delay warning"
                                            >
                                                <div className="flex gap-4">
                                                    <div className="hidden sm:flex p-3 rounded-xl items-center justify-center h-14 w-14 shrink-0 border" style={{ background: 'rgba(218,56,50,0.07)', borderColor: '#da3832' + '33' }}>
                                                        <Clock size={24} style={{ color: '#da3832' }} aria-hidden="true" />
                                                    </div>
                                                    <div className="flex flex-col flex-1">
                                                        <h4 className="flex items-center gap-2 font-bold text-slate-800 text-lg tracking-tight">
                                                            Cost of Delay
                                                            <AlertCircle size={16} style={{ color: '#da3832' }} aria-hidden="true" />
                                                        </h4>
                                                        <p className="text-slate-600 leading-relaxed text-sm sm:text-base mt-2">
                                                            Waiting <strong className="text-slate-800">{results.delayedYears} years</strong> before starting increases your required monthly SIP to{' '}
                                                            <strong className="font-bold tabular-nums" style={{ color: '#da3832' }}>{formatCurrency(results.delayedSip)}</strong>.
                                                            Early action is the most powerful lever in long-term wealth planning.
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Adjust Parameters */}
                                    <div className="mt-12 flex flex-col items-center">
                                        <button
                                            onClick={() => {
                                                setShowChangesPanel(!showChangesPanel);
                                                setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 50);
                                            }}
                                            className="border border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold text-sm hover:shadow-sm hover:border-[#224c87]/50 hover:text-[#224c87] transition-all"
                                            aria-expanded={showChangesPanel}
                                            aria-controls="adjust-panel"
                                        >
                                            Adjust Parameters
                                        </button>

                                        <AnimatePresence>
                                            {showChangesPanel && (
                                                <motion.div
                                                    id="adjust-panel"
                                                    initial={{ opacity: 0, height: 0, y: -10 }}
                                                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                                                    exit={{ opacity: 0, height: 0, y: -10 }}
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
