import '../styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
    return (
        <main className={`${inter.className} min-h-screen bg-slate-50 text-slate-900`}>
            <Component {...pageProps} />
        </main>
    );
}
