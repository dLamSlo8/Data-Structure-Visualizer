import NavHeader from '@components/navigation/NavHeader';
import { AnimationContextProvider } from '@contexts/AnimationContext';
import { D3ContextProvider } from '@contexts/D3Context';

import '../styles/index.css';
import '../styles/react-transition-group.css';

function MyApp({ Component, pageProps, router }) {
    return (
        router.pathname === '/' || router.pathname === '/algorithms' || router.pathname === '/data-structures' || router.pathname === '/_error' ? (
            <Component {...pageProps} />
        ) : (
            <D3ContextProvider>
                <AnimationContextProvider>
                    <div className="flex flex-col min-h-screen">
                        <NavHeader />
                        <Component {...pageProps} />
                    </div>
                </AnimationContextProvider>
            </D3ContextProvider>
        )
    )
}

export default MyApp
