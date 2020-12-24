import { useState, useEffect, useContext, useCallback } from 'react';
import { Controller, useSpring, config } from '@react-spring/web';

import AnimationContext from '@contexts/AnimationContext';
/**
 * 
 * @param stepGenerator - Generator function for animation steps
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

    const [steps, setSteps] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);

    const [animationProps, setAnimation, stopAnimation] = useSpring(() => ({ 
        from: initialProps
    }));
    /**
     * React-spring script for running an animation from its current step to the end.
     */
    const handleRunScript = async (next) => {
        for (let idx = currentStep; idx < steps.length; idx++) {            
            await next({ ...steps[idx], config: { duration: undefined }, delay: config.animationSpeed, ...(config.animationsOff && { immediate: true }) });      
            setCurrentStep((step) => step + 1);
        }
        setAnimationState('finished');
        setCurrentStep(0);
    }

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
        await next({ ...initialProps, config: { duration: 0 } });
    };

    /**
     * React-spring script that skips to next step in animation.
     */
    const handleStepForwardScript = async (next) => {
        let { x, y } = steps[currentStep]; 
        console.log(currentStep);
        setCurrentStep((step) => step + 1);

        await next({ xy: [x, y], config: { duration: 0 } });
    }

    /**
     * React-spring script that goes to previous step in animation. 
     */
    const handleStepBackwardScript = async (next) => {
        let { x, y } = steps[currentStep === 0 ? currentStep : currentStep - 1];
        console.log(currentStep);

        await next({ to: currentStep === 0 ? initialProps : { xy: [x, y] }, config: { duration: 0 } });
        setCurrentStep((step) => step - 1);

    }

    /**
     * React-spring script that resets an animation to its initial state before running to completion
     */
    const handleResetAndRunScript = async (next) => {
        await next({ to: handleResetScript });
        await next({ to: handleRunScript, delay: config.animationSpeed - 500 });
    }

    const handleSkipToEnd = () => {
        setAnimation({ to: handleSkipRun });
        setCurrentStep(0);
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

            setAnimation({ ...steps[currentStep], config: { duration: 0 } });
            setCurrentStep((step) => step + 1);
        }
    }

    const handleStepBack = () => {
        // Only step back if not on first step.
        if (currentStep >= 0) {
            if (currentStep > 0) {
                setAnimation({ ...steps[currentStep - 1], config: { duration: 0 } });
            }
            else {
                setAnimation({ ...initialProps, config: { duration: 0 }});
            }
            setCurrentStep((step) => step - 1);
        }
    }

    const handleRun = () => {
        if (isAnimatingMode && steps) { // TO-DO: Issue where after opening and closing animating mode, we now have steps, and so it will run both handleRun AND the useEffect!
            if (animationState === 'finished') { // If we're at the end of an animation, make sure to reset it before running again.
                setAnimation({ to: handleResetAndRunScript });
            }
            else {
                setAnimation({ to: handleRunScript, delay: config.animationSpeed - 500 });
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
            setAnimation({ to: initialProps, config: { duration: 0 } })
            setAnimation({ to: handleRunScript, delay: config.animationSpeed - 500 });  
            setAnimationState('running');
        }
    }, [isAnimatingMode, steps]);
    
    // Update animation methods to be used elsewhere.
    animationMethodsRef.current = { handleRun, handlePause, handleStepForward, handleStepBack, handleSkipToEnd, handleReset, setSteps };
    console.log(animationMethodsRef.current);
    return (
        children({ animationProps })
    )
}                