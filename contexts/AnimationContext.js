import { createContext, useState, useRef, useEffect } from 'react';

const AnimationContext = createContext();

/**
 * @state isAnimatingMode - Whether or not we are in animating mode.
 * @state 
 */
export function AnimationContextProvider({ children }) {
    const [isAnimatingMode, setAnimatingMode] = useState(null);
    const [animationState, setAnimationState] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const [config, setConfig] = useState({});
    const animationMethodsRef = useRef(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            setConfig({
                animationsOff: !window.matchMedia('(prefers-reduced-motion: no-preference)').matches,
                autoPlay: true, 
                animationSpeed: 1000
            });
        }
    }, [isMounted]);
     
    return (
        <AnimationContext.Provider value={{ isAnimatingMode, setAnimatingMode, animationMethodsRef, animationState, setAnimationState, config, setConfig }}>
            {children}
        </AnimationContext.Provider>
    )
}

export default AnimationContext;