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
        autoPlay: true
    });
    // const spring = new Controller({
    //     ...initialProps
    // });

    

    const [animationProps, setAnimation, stopAnimation] = useSpring(() => ({ 
        from: initialProps,
    }));




    const handleAutoRun = async (next, cancel) => {
        console.log(steps);
        console.log(currentStep);
        for (let idx = currentStep; idx < steps.length; idx++) {
            let { x, y } = steps[idx];
            await next({ xy: [x, y], config: { duration: undefined } });      
            setCurrentStep((step) => step + 1);

        }
        // setAnimationState(null);
        setAnimationState('finished');
        setCurrentStep(0);
    }

    const handleSkipRun = async (next, cancel) => {
        let { x, y } = steps[steps.length - 1];

        await next({ xy: [x, y], config: { duration: 0 }});
    }

    const handleResetScript = async (next, cancel) => {
        await next({ to: initialProps, config: { duration: 0 } });
    };

    const handleResetAndPlayScript = async (next, cancel) => {
        await next({ to: initialProps, config: { duration: 0 }});
        await next({ to: handleAutoRun, delay: 500 });
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
        if (!steps) { // Steps will be cached, so no need to do redo expensive calculations.
            let steps = stepGenerator();
            
            setSteps(steps);
        }
        else {
            if (animationState === 'finished') {
                setAnimation({ to: handleResetAndPlayScript });
            }
            else {
                setAnimation({ to: handleAutoRun, delay: 500 });
            }
            console.log('yes!');
        }
        setAnimationState('running');
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
            setAnimation({ to: handleAutoRun, delay: 500 });
        }
    }, [steps]);

    // useEffect(() => {
    //     if (currentStep === steps.length - 1) {
            
    //     }
    // }, [currentStep]);

    

    // const animationProps = useSpring({
    //     to: config.autoPlay ? (steps ? handleAutoRun : initialProps) : (steps ? steps[currentStep] : initialProps), 
    //     from: animationState === 'paused' ? steps[currentStep] : initialProps,
    //     onStart: (animation) => console.log(animation)
    // });

    // console.log(animationProps);



    return { animationProps, config, setConfig, animationState, setAnimationState, handleRun, handleAutoRun, handlePause, handleSkipToEnd, handleReset };
}                