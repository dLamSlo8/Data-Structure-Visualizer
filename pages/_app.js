import '../styles/index.css';
import NavHeader from '../components/navigation/NavHeader';
import DataStructureLayout from '../components/layouts/DataStructureLayout';

function MyApp({ Component, pageProps, router }) {
    return (
        router.pathname === '/' ? (
            <Component {...pageProps} />
        ) : (
            <div className="flex flex-col min-h-screen">
                <NavHeader />
                <DataStructureLayout>
                    <Component {...pageProps} />
                </DataStructureLayout>
            </div>
        )
    )
}

export default MyApp
