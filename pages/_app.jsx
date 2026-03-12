import '../styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <main className="font-sans antialiased min-h-screen">
            <Component {...pageProps} />
        </main>
    );
}
