import { createContext, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const AnimationContext = createContext();

/**
 * @state isAnimatingMode - Whether or not we are in animating mode.
 * @state animationState - String representing what animation state we're in (e.g. 'running', 'paused', 'finished', 'reset', null)
 * @state config - Current animation config (default properties are animationsOff, autoPlay, animationSpeed)
 * @state animationMethodsRef - Ref value that holds an object containing all updated animation methods to be used in various locations on the page.
 *                              This is set in useAnimationControl hook.
 * @state stepGeneratorRef - Ref value that holds the function that generates steps.
 * @state algorithmStepsRef - Ref value that represents the steps generated from the algorithm (use this over stepGeneratorRef if we are generating steps immediately.)
 * @state updateStepsRef - Ref value that represents whether steps should be updated.
 * @state animationElementsGeneratorRef - Ref value that holds function that generates all necessary elements for animation.
 */
export function AnimationContextProvider({ children }) {
    const [isAnimatingMode, setAnimatingMode] = useState(null); 
    const [animationState, setAnimationState] = useState(null); 
    const [isMounted, setIsMounted] = useState(false);
    const [config, setConfig] = useState({});
    const animationMethodsRef = useRef(null);
    const animationStepGeneratorRef = useRef(null);
    const updateStepsRef = useRef(false); 
    const animationElementGeneratorRef = useRef(null);
    const stepGeneratorRef = useRef(null);
    const algorithmStepsRef = useRef(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => { // Need to wait for component to be mounted to check window, otherwise window is undefined!
        if (isMounted) {
            setConfig({
                motionOff: !window.matchMedia('(prefers-reduced-motion: no-preference)').matches,
                autoPlay: true, 
                animationSpeed: 1000
            });
        }
    }, [isMounted]);
     
    return (
        <AnimationContext.Provider value={{ isAnimatingMode, setAnimatingMode, animationElementGeneratorRef, animationMethodsRef, algorithmStepsRef, stepGeneratorRef, animationStepGeneratorRef, updateStepsRef, animationState, setAnimationState, config, setConfig }}>
            {children}
        </AnimationContext.Provider>
    )
}

AnimationContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AnimationContext;
