import { useState, useEffect } from 'react';
import { Controller, useSpring, config } from '@react-spring/web';

/**
 * 
 * @param stepGenerator - Generator function for animation steps
 * @param initialProps - Initial properties for the spring 
 * @param initConfig - Initial config for animation sequence. May either extend default configs or assign completely new ones.
 *                      Extend syntax: initConfig: { extends: { ... } }
 *                      Assign syntax: initConfig: { ... }
 *                      TO-DO: Extend functionality of initConfig to match these requirements!
 */
export default function useAnimationControl({ stepGenerator, initialProps, initConfig }) {
    const [steps, setSteps] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [animationState, setAnimationState] = useState(null);
    const [config, setConfig] = useState(initConfig ?? { 
        animationsOff: !window.matchMedia('(prefers-reduced-motion: no-preference)').matches,
        autoPlay: true, 
        animationSpeed: 1000
    });

    const [animationProps, setAnimation, stopAnimation] = useSpring(() => ({ 
        from: initialProps
    }));


    /**
     * React-spring script for running an animation from its current step to the end.
     */
    const handleRunScript = async (next) => {
        for (let idx = currentStep; idx < steps.length; idx++) {
            let { x, y } = steps[idx];
            
            await next({ xy: [x, y], config: { duration: undefined }, delay: config.animationSpeed, ...(config.animationsOff && { immediate: true }) });      
            setCurrentStep((step) => step + 1);
        }

        setAnimationState('finished');
        setCurrentStep(0);
    }

    /**
     * React-spring script that skips to the end of an animation (i.e. the last step of the animation)
     */
    const handleSkipRun = async (next) => {
        let { x, y } = steps[steps.length - 1];

        await next({ xy: [x, y], config: { duration: 0 }});
    }

    /**
     * React-spring script that instantly resets the animation to its original position (from initialProps)
     */
    const handleResetScript = async (next) => {
        await next({ to: initialProps, config: { duration: 0 } });
    };

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

    const handleRun = () => {
        if (steps) {
            if (animationState === 'finished') { // If we're at the end of an animation, make sure to reset it before running again.
            setAnimation({ to: handleResetAndRunScript });
            }
            else {
                setAnimation({ to: handleRunScript, delay: config.animationSpeed - 500 });
            }
            setAnimationState('running');
        }

    }


    const handlePause = () => {
        stopAnimation();
        setAnimationState('paused');
    }


    
    useEffect(() => {
        if (steps) {
            // for (let idx = 0; idx < steps.length; idx++) {
            //     console.log(steps[idx]);
            //     let { x, y } = steps[idx];

            //     setAnimation({ xy: [x, y], delay: 1000 * idx });
            // }        }
            setAnimation({ to: handleRunScript, delay: config.animationSpeed - 500 });  
            setAnimationState('running');

        }
    }, [steps]);

    // useEffect(() => {
    //     console.log(stepDependencies);
    //     if (stepDependencies.every((dependency) => dependency)) {
    //         setSteps(stepGenerator());
    //     }
    // }, [...stepDependencies]);

    // useEffect(() => {
    //     if (currentStep === steps.length - 1) {
            
    //     }
    // }, [currentStep]);

    

    // const animationProps = useSpring({
    //     to: config.autoPlay ? (steps ? handleRunScript : initialProps) : (steps ? steps[currentStep] : initialProps), 
    //     from: animationState === 'paused' ? steps[currentStep] : initialProps,
    //     onStart: (animation) => console.log(animation)
    // });

    // console.log(animationProps);



    return { animationProps, setSteps, config, setConfig, animationState, setAnimationState, handleRun, handleRunScript, handlePause, handleSkipToEnd, handleReset };
}                