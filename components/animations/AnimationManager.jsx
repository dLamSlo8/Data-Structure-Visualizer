import { useState, useEffect, useContext, useCallback } from 'react';
import { Controller, useSpring, config } from '@react-spring/web';

import AnimationContext from '@contexts/AnimationContext';
/**
 * 
 * @param initialProps - Initial properties for the spring 
 *                      Format: {
 *                          <name>: <value (i.e. array, number)>
*                          }
 * 
 * @param initConfig - Initial config for animation sequence. May either extend default configs or assign completely new ones.
 *                      Extend syntax: initConfig: { extends: { ... } }
 *                      Assign syntax: initConfig: { ... }
 *                      TO-DO: Extend functionality of initConfig to match these requirements!
 */
export default function AnimationManager({ initialProps, initConfig, children }) {
    const { isAnimatingMode, animationState, setAnimationState, config, animationMethodsRef, stepGeneratorRef, updateStepsRef } = useContext(AnimationContext);

    const [animating, setAnimating] = useState(false);
    const [steps, setSteps] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);

    const [animationProps, setAnimation, stopAnimation] = useSpring(() => ({ 
        from: initialProps,
        onStart: (e) => {
            setAnimating(true);
        },
        onRest: (e) => {
            console.log(e);
            if (e.finished) {
                console.log('finished!');
                setAnimating(false);
            }
        }
    }));

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
        console.log(currentStep);
        console.log(animating);
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
        if (isAnimatingMode && steps) { // TO-DO: Issue where after opening and closing animating mode, we now have steps, and so it will run both handleRun AND the useEffect!
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
     * Whenever animating mode is turned on and iff there is a new tree to be drawn,
     * generate the steps for this new tree and toggle off drewTree such that if animating
     * mode is toggled on and off and the tree hasn't changed, nothing will happen (as
     * the steps are the exact same. This is great for performance as we don't need
     * to do expensive calculations each time we turn on animating mode.)
     */
    useEffect(() => {
        if (updateStepsRef.current && isAnimatingMode) {
            setSteps(stepGeneratorRef.current());
            
            updateStepsRef.current = false;
        }
    }, [isAnimatingMode]);

    /**
     * Effect
     * Clears and resets animation when animating mode is turned off. When turned on
     * and steps are available, run animation. This is assuming that the only way to turn
     * on animating mode is by 'playing' the animation.
     */
    useEffect(() => {
        if (!isAnimatingMode) {
            stopAnimation();
            setAnimationState(null);
            setCurrentStep(0);
        }
        else if (isAnimatingMode && steps) {
            setAnimation({ ...steps[0], config: { duration: 0 } }); // Account for resetting animation props.
            setAnimation({ to: handleRunScript });  
            setAnimationState('running');
        }
    }, [isAnimatingMode, steps]);
    
    // Update animation methods to be used elsewhere.
    animationMethodsRef.current = { handleRun, handlePause, handleStepForward, handleStepBack, handleSkipToEnd, handleReset, setSteps };

    return (
        children({ animationProps })
    )
}                