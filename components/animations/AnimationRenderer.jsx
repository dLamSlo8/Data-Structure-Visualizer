import ReactDOM from 'react-dom';
import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSprings } from '@react-spring/web';


import AnimationContext from '@contexts/AnimationContext';
import AnimationLog from './AnimationLog';

/**
 * @state {number} currentStep - Number that represents the step we are currently on.
 */
function AnimationRenderer({ steps, animationElements, attachElementsRef }) {
    const { isAnimatingMode, animationState, setAnimationState, config, animationMethodsRef, updateStepsRef } = useContext(AnimationContext);
    const [currentStep, setCurrentStep] = useState(0);
    const [toStep, setToStep] = useState(0); // R: The reason we have toStep is b/c we can't rely on currentStep as that changes when the animation ends.
    const [logIdx, setLogIdx] = useState(0);
    const [isAnimating, setAnimating] = useState(false);
    const [animationLog, setAnimationLog] = useState(steps[0].log ? [steps[0].log] : []);
    const [springs, setAnimation, stopAnimation] = useSprings(animationElements.length, index => {
        let elementObj = animationElements[index];

        return { 
            from: { ...(elementObj.initialAnimationProps ?? elementObj.defaultAnimationProps) },
        };
    });

    /**
     * Accesses the current step properties (i.e. state (and config if available)) for the current element.
     * @param {number} elementIdx - Index of current element in elements array
     * @param {number} stepIdx - Index of current step in step array
     */
    const getStep = (elementIdx, stepIdx) => {
        let elementObj = animationElements[elementIdx];
        let step = steps[stepIdx][elementObj.id];

        if (step) {
            return step.config ? {...step.state, config: step.config } : step.state;
        }
        else {
            return null;
        }
    };

    /**
     * Resets animation back to first step without animating.
     */
    const resetAnimation = async () => {
        return await setAnimation((idx) => ({
            ...getStep(idx, 0),
            config: { duration: 0 }
        }));
    }

    /**
     * Runs the animation depending on several states:
     * 1. If the animation is currently in the end state, will 
     * play from beginning.
     * 2. If playing after pausing, will continue animation from
     * current step.
     */
    const handleRun = async () => {
        console.log(isAnimatingMode);
        if (isAnimatingMode && steps) { 
            console.log('no way');
            if (animationState === 'finished') { // If we're at the end of an animation, make sure to reset it before running again.
                await resetAnimation();
                setCurrentStep(0);
            }
            setAnimationState('running');
        }
    };

    /**
     * Pauses the animation.
     */
    const handlePause = () => { 
        stopAnimation();
        setAnimationState('paused');
    };

    /**
     * Resets animation to beginning (i.e. first step)
     */
    const handleReset = async () => {
        let animationRes = await resetAnimation();
        
        if (animationRes.finished) {
            setCurrentStep(0);
            setAnimationState('reset');
            setToStep(0);
        }
    }

    /**
     * Moves the animation one step backward. If currently at the end,
     * change animation state from finished to paused.
     */
    const handleStepBack = async () => {
        if (currentStep > 0) {
            let animationRes = await setAnimation((idx) => ({
                ...getStep(idx, isAnimating ? currentStep : currentStep - 1),
                config: { duration: 0 }
            }));

            if (animationRes.finished) {
                if (currentStep === steps.length - 1) {
                    setAnimationState('paused');
                }
                if (!isAnimating) {
                    setCurrentStep((currentStep) => currentStep - 1);
                }
                else {
                    setAnimating(false);
                }
                setToStep((toStep) => toStep - 1);
            }
        }
    }

    /**
     * Moves the animation one step forward. If at the end after this move,
     * will set animation state appropriately. 
     */
    const handleStepForward = async () => {
        if (currentStep < steps.length - 1) {
            let animationRes = await setAnimation((idx) => ({
                ...getStep(idx, currentStep + 1),
                config: { duration: 0 }
            }))

            if (animationRes.finished) {
                if (currentStep + 1 === steps.length - 1) {
                    setAnimationState('finished');
                }
                if (isAnimating) {
                    setAnimating(false);
                }
                else {
                    setToStep((toStep) => toStep + 1);
                    if (toStep === logIdx) {
                        setAnimationLog((animationLog) => { // Write step into log when step ends (may change to before step starts if that makes more sense!)
                            return [...animationLog, steps[logIdx + 1].log]     
                        });
                        setLogIdx((logIdx) => logIdx + 1);
                    }
                }
                setCurrentStep((currentStep) => currentStep + 1);
            }
        }
    }

    /**
     * Moves animation to end (i.e. last step.)
     */
    const handleSkipToEnd = async () => {
        if (animationState !== 'finished') {
            let animationRes = await setAnimation((idx) => ({
                ...getStep(idx, steps.length - 1),
                config: { duration: 0 }
            }));

            if (animationRes.finished) {
                setAnimating(false);
                setAnimationState('finished');
                setCurrentStep(steps.length - 1);
                setToStep(steps.length - 1);
                setAnimationLog((animationLog) => {
                    if (animationLog.length === steps.length) {
                        return animationLog;
                    }
                    else {
                        return [...animationLog, ...steps.slice(animationLog.length).map((step) => step.log)]
                    }
                })
                setLogIdx(steps.length - 1);
                // Check whats in the animation log and just add the rest.
                // if (isAnimating) {
                //     setAnimationLog((animationLog) => { // Write step into log when step ends (may change to before step starts if that makes more sense!)
                //         return [...animationLog, steps[logIdx].log]     
                //     });
                // }
            }
        }
    }

    /**
     * Effect
     * Runs the current step. Should only work when animation
     * is running.
     * 
     * Dependency Reasoning
     * Don't need steps b/c we only get the steps on mount and when it does change, we would have had to
     * exit animating mode and enter again, thus remounting this component and providing the new steps.
     * Thus, we always only get steps on mount.
     */
    useEffect(() => {
        let stepFunc = async () => {
            if (animationState === 'running') {
                if (currentStep < steps.length - 1) { 
                    let animationRes = await setAnimation((idx) => {
                        let stepProperties = getStep(idx, currentStep + 1);
    
                        if (stepProperties) {
                            return {
                                ...stepProperties, 
                                ...(config.motionOff && { immediate: true }),
                                delay: config.animationSpeed - 250,
                                ...(stepProperties.config ? 
                                    (stepProperties.config.duration !== undefined ? false : { config: { duration: undefined, ...stepProperties.config } }) : 
                                    { config: { duration: undefined }}),
                                onDelayEnd: (_) => {
                                    setAnimating(true);
                                }
                            };
                        }
                        else {
                            return {};
                        }
                    });
    
                    if (animationRes.finished) { // If step goes through and finishes, we can move on to the next one.

                        setAnimating(false);
                        setCurrentStep((currentStep) => currentStep + 1);
                    }
                }
                else if (currentStep === steps.length - 1) { // If we're on the last one, we are finished.
                    setAnimationState('finished');
                }
            }
        }

        stepFunc();
    }, [currentStep, animationState]);

    useEffect(() => {
        if (isAnimating) {
            if (toStep === logIdx) {
                setAnimationLog((animationLog) => { // Write step into log when step ends (may change to before step starts if that makes more sense!)
                    return [...animationLog, steps[logIdx + 1].log]     
                });
                setLogIdx((logIdx) => logIdx + 1);
            }
            setToStep((toStep) => toStep + 1);
        }
    }, [isAnimating]);


    /**
     * Effect
     * On mount, begin animation. (This works b/c we mount the component when we turn animating mode on.
     * Thus it should automatically play the animation.)
     */
    useEffect(() => {
        setCurrentStep(0);
        setAnimationState('running');

        return () => {
            stopAnimation();
            animationMethodsRef.current = null;
        }
    }, []);

    animationMethodsRef.current = { handleRun, handlePause, handleReset, handleStepBack, handleStepForward, handleSkipToEnd };

    return (
        <>
            {
                ReactDOM.createPortal(
                    <>
                    {
                        animationElements.map(({ id, component: AnimationComponent, componentProps }, idx) => {
                                return <AnimationComponent
                                key={id}
                                {...springs[idx]}
                                {...componentProps} /> 
                        })
                    }
                    </>
                , attachElementsRef)
            }
            <AnimationLog log={animationLog} currentStep={toStep} />
        </>
    )
}

export default AnimationRenderer;