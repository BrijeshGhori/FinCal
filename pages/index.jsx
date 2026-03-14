import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ArrowRight, BarChart2, ShieldCheck, Calculator } from 'lucide-react';

export default function LandingPage() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>GoalFi | Goal-Based Financial Planner</title>
                <meta name="description" content="Interactive goal-based SIP calculator. Pure educational financial planning." />
            </Head>

            <div className="min-h-screen bg-white text-slate-900 overflow-hidden relative font-sans">

                {/* Subtle brand-blue background accent */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-5%] right-[-5%] w-[40vw] h-[40vw] rounded-full blur-[140px]" style={{ background: 'rgba(34,76,135,0.06)' }} />
                    <div className="absolute bottom-[-5%] left-[-5%] w-[40vw] h-[40vw] rounded-full blur-[140px]" style={{ background: 'rgba(34,76,135,0.04)' }} />
                </div>

                {/* Navbar */}
                <nav className="relative z-20 flex items-center justify-between px-6 sm:px-12 py-6 max-w-7xl mx-auto border-b border-slate-100" aria-label="Main navigation">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2.5 font-bold text-2xl tracking-tight"
                        style={{ color: '#224c87' }}
                    >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#224c87' }}>
                            <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                        GoalFi
                    </motion.div>
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => router.push('/dashboard')}
                        className="border px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
                        style={{ borderColor: '#224c87', color: '#224c87' }}
                    >
                        Launch Planner
                    </motion.button>
                </nav>

                {/* Hero Section */}
                <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32 max-w-5xl mx-auto">



                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-slate-900"
                    >
                        Plan your financial goals<br />
                        <span style={{ color: '#224c87' }}>with mathematical clarity.</span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-slate-500 text-lg sm:text-xl max-w-2xl mb-12 leading-relaxed"
                    >
                        Interactive, goal-based SIP calculators accounting for inflation and compounded returns.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => router.push('/dashboard')}
                            className="text-white px-10 py-4 rounded-xl text-lg font-bold tracking-tight shadow-md flex items-center gap-3"
                            style={{ background: '#224c87' }}
                        >
                            Start Planning
                            <ArrowRight size={20} />
                        </motion.button>
                    </motion.div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-24 max-w-4xl w-full" role="list">
                        {[
                            { icon: Calculator, title: "SIP Calculator", desc: "Calculate the exact monthly investment needed, adjusted for inflation, to reach your goal." },
                            { icon: BarChart2, title: "Projection Charts", desc: "Visualise your invested capital versus compounded returns year-by-year." },
                            { icon: ShieldCheck, title: "Unbiased Insights", desc: "No mutual fund promotion. Purely educational financial planning tool." }
                        ].map((feat, idx) => (
                            <motion.div
                                key={feat.title}
                                role="listitem"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
                                whileHover={{ y: -4 }}
                                className="bg-white border rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition-shadow"
                                style={{ borderColor: '#e2e8f0' }}
                            >
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(34,76,135,0.08)' }}>
                                    <feat.icon size={22} style={{ color: '#224c87' }} />
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-slate-800">{feat.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                </main>
            </div>
        </>
    );
}
