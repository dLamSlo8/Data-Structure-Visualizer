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
    const [currentStep, setCurrentStep] = useState(-1);
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
        onRest: (e) => {
            console.log(e);
            if (e.finished) {
                setCurrentStep((step) => step + 1)
            }
        },
        config: config.molasses
    }));


    const runAnimation = () => {
        let idx = 0;

        for (let stepIdx = currentStep; stepIdx < steps.length; stepIdx++, idx++) {
            let { x, y } = steps[stepIdx];
            // console.log(steps[stepIdx]);
            // console.log(currentStep);
            setAnimation({ xy: [x, y], delay: 1000 * idx });
        }
    }

    const handleAutoRun = async (next, cancel) => {
        console.log(steps);
        console.log(currentStep);
        for (let idx = (currentStep === -1 ? currentStep + 1 : currentStep); idx < steps.length; idx++) {
            let { x, y } = steps[idx];
            await next({ xy: [x, y] });
        }
        // setAnimationState(null);
        setAnimationState('finished');
        setCurrentStep(0);
    }

    const handleSkipRun = async (next, cancel) => {
        let { x, y } = steps[steps.length - 1];

        await next({ xy: [x, y], immediate: true });
    }

    const handleResetScript = async (next, cancel) => {
        await next({ duration: 0 });
        await next({ to: initialProps });
    };

    const handleSkipToEnd = () => {
        setAnimation({ to: handleSkipRun });
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
                setAnimation({ to: handleAutoRun, reset: true });
            }
            else {
                setAnimation({ to: handleAutoRun });
            }
            console.log('yes!');
        }
        setAnimationState('running');
    }


    const handlePause = () => {
        console.log("huh");
        stopAnimation();
        setAnimationState('paused');

        // spring.update({ reset: true })
        // spring.start();
        // setAnimation({ ...steps[currentStep] });
        // setAnimation({ pause: true });
    }


    
    useEffect(() => {
        if (steps) {
            // for (let idx = 0; idx < steps.length; idx++) {
            //     console.log(steps[idx]);
            //     let { x, y } = steps[idx];

            //     setAnimation({ xy: [x, y], delay: 1000 * idx });
            // }        }
            setAnimation({ to: handleAutoRun });
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