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
    BriefcaseIcon, HeartIcon, ShieldExclamationIcon, CurrencyRupeeIcon,
    ArrowLeftOnRectangleIcon, ChartPieIcon, ChevronLeftIcon, ChevronRightIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

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
    const [activeGoal, setActiveGoal] = useState(GOALS[0]);
    const [currentView, setCurrentView] = useState('report');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [formValues, setFormValues] = useState({
        presentCost: GOALS[0].defaultCost,
        years: GOALS[0].defaultYears,
        expectedReturn: 12,
        inflation: 6,
    });

    const [results, setResults] = useState(null);

    // Re-calculate when values change
    useEffect(() => {
        const res = calculateGoalSIP(formValues);
        setResults(res);
    }, [formValues]);

    // Update form when a new goal is selected
    const handleSelectGoal = (goal) => {
        setActiveGoal(goal);
        setFormValues((prev) => ({
            ...prev,
            presentCost: goal.defaultCost,
            years: goal.defaultYears,
        }));
    };

    return (
        <>
            <Head>
                <title>Dashboard | FinCal.io</title>
            </Head>

            <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">

                {/* --- SIDEBAR --- */}
                <aside className={`bg-white border-r border-slate-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col z-20 shrink-0 transition-all duration-300 relative ${isSidebarCollapsed ? 'w-[5rem]' : 'w-64 sm:w-80'}`}>

                    {/* Toggle Collapse Button */}
                    <button
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="absolute top-7 -right-3.5 bg-white border border-slate-200 text-slate-400 hover:text-emerald-500 shadow-sm rounded-full p-1 z-50 transition-colors"
                    >
                        {isSidebarCollapsed ? <ChevronRightIcon className="w-4 h-4" /> : <ChevronLeftIcon className="w-4 h-4" />}
                    </button>

                    <div className={`p-6 pb-4 border-b border-slate-100 flex items-center transition-all ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between'}`}>
                        {!isSidebarCollapsed && (
                            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-800">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-sky-500 flex items-center justify-center shadow-inner shrink-0">
                                    <div className="w-3 h-3 bg-white rounded-full" />
                                </div>
                                FinCal
                            </div>
                        )}
                        {isSidebarCollapsed && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-sky-500 flex items-center justify-center shadow-inner shrink-0">
                                <div className="w-3 h-3 bg-white rounded-full" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide flex flex-col items-center">
                        <div className="w-full">
                            <h3 className={`text-xs font-bold text-slate-400 uppercase tracking-widest pl-2 mb-4 whitespace-nowrap overflow-hidden transition-all ${isSidebarCollapsed ? 'opacity-0 h-0 hidden' : 'opacity-100'}`}>Select Target</h3>
                        </div>

                        <nav className="space-y-1.5 flex flex-col w-full">
                            {GOALS.map((goal) => {
                                const isActive = activeGoal.id === goal.id;
                                const Icon = goal.icon;
                                return (
                                    <button
                                        key={goal.id}
                                        onClick={() => handleSelectGoal(goal)}
                                        className={`w-full flex items-center gap-3 py-3 rounded-2xl transition-all duration-200 text-left relative overflow-hidden group ${isSidebarCollapsed ? 'justify-center px-0' : 'px-3'} ${isActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}`}
                                    >
                                        {isActive && (
                                            <motion.div layoutId="sidebar-active" className="absolute inset-0 bg-slate-900 z-0" />
                                        )}
                                        <div className={`p-1.5 rounded-xl z-10 transition-colors shrink-0 ${isActive ? 'bg-white/10' : 'bg-slate-100 group-hover:bg-white'}`}>
                                            <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-emerald-500'}`} />
                                        </div>
                                        {!isSidebarCollapsed && (
                                            <span className={`font-semibold text-sm z-10 tracking-wide whitespace-nowrap ${isActive ? 'text-white' : ''}`}>
                                                {goal.title}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="p-4 border-t border-slate-100">
                        <button
                            onClick={() => router.push('/')}
                            className={`w-full flex items-center gap-3 py-3 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 font-semibold text-sm transition-colors group ${isSidebarCollapsed ? 'justify-center px-0' : 'px-3'}`}
                        >
                            {isSidebarCollapsed ? (
                                <ArrowRightOnRectangleIcon className="w-6 h-6 text-slate-400 group-hover:text-rose-500 transition-colors" />
                            ) : (
                                <>
                                    <ArrowLeftOnRectangleIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    <span className="whitespace-nowrap">Exit Dashboard</span>
                                </>
                            )}
                        </button>
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <main className="flex-1 overflow-y-auto relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[length:200px] before:absolute before:inset-0 before:bg-slate-50/90 before:-z-10 z-0 pb-20">
                    {/* Subtle background glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

                    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8 mt-4">

                        {/* Header Area */}
                        <motion.header
                            key={activeGoal.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-5 bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100/50">
                                <activeGoal.icon className="w-8 h-8 text-emerald-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none mb-2">
                                    {activeGoal.title}
                                </h1>
                                <p className="text-slate-500 text-sm font-medium">
                                    Adjust the sliders to calibrate your goal targets.
                                </p>
                            </div>
                        </motion.header>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                            {/* Left Column: Form Settings */}
                            <div className="lg:col-span-5 h-full">
                                <div className="sticky top-10">
                                    <CalculatorForm values={formValues} onChange={setFormValues} />
                                </div>
                            </div>

                            {/* Right Column: Outcomes & Metrics */}
                            <div className="lg:col-span-7 flex flex-col">

                                {/* Custom Tab Switcher */}
                                <div className="flex items-center gap-2 p-1.5 bg-slate-200/50 backdrop-blur-md rounded-full w-fit mb-8 border border-slate-200 shadow-inner">
                                    <button
                                        onClick={() => setCurrentView('report')}
                                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${currentView === 'report' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        Report Card 📝
                                    </button>
                                    <button
                                        onClick={() => setCurrentView('graph')}
                                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${currentView === 'graph' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        Magic Graph 🚀
                                    </button>
                                </div>

                                <AnimatePresence mode="popLayout">
                                    {currentView === 'report' && (
                                        <motion.div
                                            key={`report-${activeGoal.id}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                        >
                                            <Results results={results} />
                                        </motion.div>
                                    )}

                                    {currentView === 'graph' && (
                                        <motion.div
                                            key={`graph-${activeGoal.id}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                        >
                                            <GrowthChart data={results?.chartData} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                        </div>
                    </div>
                </main>

            </div>
        </>
    );
}
