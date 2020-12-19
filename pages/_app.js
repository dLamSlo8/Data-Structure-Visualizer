import NavHeader from '../components/navigation/NavHeader';
import { AnimationContextProvider } from '../contexts/AnimationContext';
import '../styles/index.css';
import '../styles/react-transition-group.css';

function MyApp({ Component, pageProps, router }) {
    return (
        router.pathname === '/' || router.pathname === '/algorithms' || router.pathname === '/data-structures' || router.pathname === '/_error' ? (
            <Component {...pageProps} />
        ) : (
            <AnimationContextProvider>
                <div className="flex flex-col min-h-screen">
                    <NavHeader />
                    <Component {...pageProps} />
                </div>
            </AnimationContextProvider>

        )
    )
}

export default MyApp
