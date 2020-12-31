import ReactDOM from 'react-dom';
import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSprings } from '@react-spring/web';


import AnimationContext from '@contexts/AnimationContext';

function AnimationManagerInnerTest({ steps, animationElements, attachElementsRef }) {
    const { isAnimatingMode, animationState, setAnimationState, config, animationMethodsRef, updateStepsRef } = useContext(AnimationContext);
    const [currentStep, setCurrentStep] = useState(0);

    const [springs, setAnimation, stopAnimation] = useSprings(animationElements.length, index => {
        let elementObj = animationElements[index];

        return { 
            from: { [elementObj.id]: elementObj.initialAnimationProp ?? elementObj.defaultAnimationProp},
            config: { friction: 150 }
        };
    });

    /**
     * Effect
     * Clears and resets animation when animating mode is turned off. When turned on
     * and steps are fully updated, run animation. 
     */
    useEffect(() => {
        let func = async () => {
            if (isAnimatingMode && steps && !updateStepsRef.current) { 
                // setAnimation({ ...steps[0], config: { duration: 0 } }); // Account for resetting animation props. Don't need this anymore b/c we now have the correct initial props.
                await setAnimation((index) => {
                    let elementObj = animationElements[index];

                    if (steps[1][elementObj.id]) {
                        return { [elementObj.id]: steps[1][elementObj.id] };
                    }
                });  

                setAnimationState('running');
            }
        }

        func();
        console.log('called func');
    }, [isAnimatingMode, steps]);

    console.log(springs);
    return (
            ReactDOM.createPortal(
                <>
                {
                    animationElements.map(({ id, component: AnimationComponent, componentProps, animationProp }, idx) => {
                            return <AnimationComponent
                            key={id}
                            {...{ [animationProp]: springs[idx][id] }}
                            {...componentProps} /> 
                    })
                }
                </>
            , attachElementsRef)
    )
}

export default AnimationManagerInnerTest;