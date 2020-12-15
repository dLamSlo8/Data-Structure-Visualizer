import { createContext, useState } from 'react';

const AnimationContext = createContext();

/**
 * @state animating - Whether or not we are in animating mode.
 */
export function AnimationContextProvider({ children }) {
    const [isAnimatingMode, setAnimatingMode] = useState(false);

    return (
        <AnimationContext.Provider value={{ isAnimatingMode, setAnimatingMode }}>
            {children}
        </AnimationContext.Provider>
    )
}

export default AnimationContext;