import ReactDOM from 'react-dom';
import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring } from '@react-spring/web';

import AnimationContext from '@contexts/AnimationContext';

function AnimationManagerInner({ steps, animationElements, initialAnimationProps, attachElementsRef }) {
    const { isAnimatingMode, animationState, setAnimationState, config, animationMethodsRef, updateStepsRef } = useContext(AnimationContext);
    const [animating, setAnimating] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    
    const [animationProps, setAnimation, stopAnimation] = useSpring(() => ({ 
        from: initialAnimationProps,
        onStart: (e) => {
            setAnimating(true);
        },
        onRest: (e) => {
            if (e.finished) {
                setAnimating(false);
            }
        }
    }));

    // console.log(animationProps);


    /**
     * React-spring script for running an animation from beginning to end.
     */
    const handleRunScript = async (next) => {
        setCurrentStep(0);
        for (let idx = 1; idx < steps.length; idx++) {            
            await next({ ...steps[idx], config: { duration: undefined }, delay: config.animationSpeed - 250, ...(config.animationsOff && { immediate: true }) });  
            setCurrentStep((step) => step + 1);
        }
        setAnimationState('finished');
    }

    /**
     * React-spring script for running an animation from its current step to the end.
     */
    const handleContinueScript = async (next) => {
        for (let idx = currentStep + 1; idx < steps.length; idx++) {    
            await next({ ...steps[idx], config: { duration: undefined }, delay: config.animationSpeed - 250, ...(config.animationsOff && { immediate: true }) });      
            setCurrentStep((step) => step + 1);
        }
        setAnimationState('finished');
    };

    /**
     * React-spring script that skips to the end of an animation (i.e. the last step of the animation)
     */
    const handleSkipRun = async (next) => {
        await next({ ...steps[steps.length - 1], config: { duration: 0 } });
    }

    /**
     * React-spring script that instantly resets the animation to its original position (from initialProps)
     */
    const handleResetScript = async (next) => {
        await next({ ...steps[0], config: { duration: 0 } });
    };


    /**
     * React-spring script that resets an animation to its initial state before running to completion
     */
    const handleResetAndRunScript = async (next) => {
        await next({ to: handleResetScript });
        await next({ to: handleRunScript });
    }

    const handleSkipToEnd = () => {
        setAnimation({ to: handleSkipRun });
        setCurrentStep(steps.length - 1);
        setAnimationState('finished');
    }

    const handleReset = () => {
        setAnimation({ to: handleResetScript });
        setCurrentStep(0);
        setAnimationState('reset');
    }

    const handleStepForward = () => {
        /**
         *  Only step forward if not on last step. Even though the UI should account for disabling this button, 
         *  we need to have this safeguard in case a user manually enables it through DevTools.
         */ 
        if (currentStep < steps.length - 1) {
            setAnimation({ ...steps[currentStep + 1], config: { duration: 0 } });
            if (currentStep + 1 === steps.length - 1) { // If next step is the last one, ensure that if play is pressed again, it will reset accordingly.
                setAnimationState('finished');
            }
            setCurrentStep((step) => step + 1);
        }
    }

    const handleStepBack = () => {
        if (currentStep >= 0) {
            if (currentStep === steps.length - 1) { // If we're at the end, we must switch animation state from finished to paused.
                setAnimationState('paused');
            }

            setAnimation({ ...steps[animating ? currentStep : currentStep - 1], config: { duration: 0 } });
            if (currentStep > 0 && !animating) {
                setCurrentStep((step) => step - 1);
            }
        }
    }

    const handleRun = () => {
        if (isAnimatingMode && steps) { 
            if (animationState === 'finished') { // If we're at the end of an animation, make sure to reset it before running again.
                setAnimation({ to: handleResetAndRunScript });
            }
            else {
                setAnimation({ to: handleContinueScript });
            }
            setAnimationState('running');
        }

    };

    const handlePause = () => {
        stopAnimation();
        setAnimationState('paused');
    }

    /**
     * Effect
     * Clears and resets animation when animating mode is turned off. When turned on
     * and steps are fully updated, run animation. This is assuming that the only way to turn
     * on animating mode is by 'playing' the animation.
     */
    useEffect(() => {
        if (isAnimatingMode && steps && !updateStepsRef.current) { 
            // setAnimation({ ...steps[0], config: { duration: 0 } }); // Account for resetting animation props. Don't need this anymore b/c we now have the correct initial props.
            setAnimation({ to: handleRunScript });  
            setAnimationState('running');
        }
    }, [isAnimatingMode, steps]);

    // Update animation methods to be used elsewhere.
    animationMethodsRef.current = { handleRun, handlePause, handleStepForward, handleStepBack, handleSkipToEnd, handleReset };

    return (
        animationState ? 
            ReactDOM.createPortal(
                <>
                {
                    animationElements.map(({ id, component: AnimationComponent, componentProps, animationProp }) => {
                            return <AnimationComponent
                            key={id}
                            {...{ [animationProp]: animationProps[id] }}
                            {...componentProps} /> 
                    })
                }
                </>
            , attachElementsRef) : null
    )
}

AnimationManagerInner.propTypes = {
    steps: PropTypes.array.isRequired,
    animationElements: PropTypes.arrayOf(PropTypes.object).isRequired,
    initialAnimationProps: PropTypes.object.isRequired,
    attachElementsRef: PropTypes.object.isRequired
}

export default AnimationManagerInner;