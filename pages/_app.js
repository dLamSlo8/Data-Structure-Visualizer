import NavHeader from '../components/navigation/NavHeader';
import DataStructureLayout from '../components/layouts/DataStructureLayout';

import '../styles/index.css';
import '../styles/react-transition-group.css';

function MyApp({ Component, pageProps, router }) {
    return (
        router.pathname === '/' || router.pathname === '/_error' ? (
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
