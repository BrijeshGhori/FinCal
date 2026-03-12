import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ArrowRight, BarChart2, TrendingUp, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>FinCal | Plan Your Financial Future</title>
            </Head>

            <div className="min-h-screen bg-[#0f172a] text-slate-50 overflow-hidden relative font-sans selection:bg-emerald-500/30">

                {/* Background Gradients & Orbs */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-10000" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-sky-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[15000ms]" />

                    {/* subtle grid overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 mix-blend-overlay"></div>
                </div>

                {/* Navbar */}
                <nav className="relative z-20 flex items-center justify-between px-6 sm:px-12 py-6 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 font-bold text-2xl tracking-tighter"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-sky-500 flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                        FinCal.<span className="text-emerald-400">io</span>
                    </motion.div>
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push('/dashboard')}
                        className="bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2"
                    >
                        Dashboard
                        <ArrowRight size={16} />
                    </motion.button>
                </nav>

                {/* Hero Section */}
                <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32 max-w-5xl mx-auto">

                    {/* Pill Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm font-medium tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-xl"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        FinCal Innovation Hackathon 2026
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-6xl sm:text-8xl font-extrabold tracking-[-0.04em] leading-[1.1] mb-8"
                    >
                        Build wealth with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">mathematical clarity.</span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-slate-400 text-lg sm:text-2xl font-medium max-w-2xl mb-12 leading-relaxed"
                    >
                        Interactive goal-based calculators for your financial future. No brand biases, just pure 100% educational insights.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/dashboard')}
                            className="group relative bg-white text-slate-900 px-10 py-5 rounded-[2.5rem] text-lg font-bold tracking-tight overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-sky-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                            <span className="relative flex items-center gap-3">
                                Start Planning Free
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.button>
                    </motion.div>

                    {/* Floating Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-24 max-w-4xl w-full">
                        {[
                            { icon: TrendingUp, title: "Smart SIP Engine", desc: "Calculate exact monthly needed inclusive of inflation." },
                            { icon: BarChart2, title: "Growth Trajectory", desc: "Interactive charts showing portfolio growth vs actual goal cost." },
                            { icon: ShieldCheck, title: "Unbiased Education", desc: "No mutual fund promotion. Strictly for planning." }
                        ].map((feat, idx) => (
                            <motion.div
                                key={feat.title}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 + (idx * 0.1) }}
                                whileHover={{ y: -5, scale: 1.02, rotate: 1 }}
                                drag
                                dragConstraints={{ top: -20, bottom: 20, left: -20, right: 20 }}
                                className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 text-left cursor-grab active:cursor-grabbing hover:bg-white/10 transition-colors"
                            >
                                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-4">
                                    <feat.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white">{feat.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                </main>
            </div>
        </>
    );
}
