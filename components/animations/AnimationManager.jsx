import { useState, useEffect, useContext } from 'react';

import AnimationContext from '@contexts/AnimationContext';

import AnimationRenderer from './AnimationRenderer';

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
 *                      TODO: Extend functionality of initConfig to match these requirements!
 */
export default function AnimationManager({ attachElementsRef, initConfig }) {
    const { isAnimatingMode, setAnimationState, algorithmStepsRef, stepGeneratorRef, animationStepGeneratorRef, updateStepsRef, animationElementGeneratorRef } = useContext(AnimationContext);

    const [steps, setSteps] = useState(null);
    const [animationElements, setAnimationElements] = useState(null);

    /**
     * Effect
     * Whenever animating mode is turned on and iff there is a new tree to be drawn,
     * generate the steps for this new tree. This is great for performance as we don't need
     * to do expensive calculations each time we turn on animating mode.)
     * 
     * When animating mode is turned off make sure to reset animation state.
     */
    useEffect(() => {
        if (isAnimatingMode !== null && !isAnimatingMode) { // Reset animation state if turned off.
            setAnimationState(null);
        }
        else if (updateStepsRef.current && isAnimatingMode) { 
            /**
             * If new steps need to be generated, do so here. Currently we're assuming that
             * whenever steps need to be updated, there probably need to be new elements with 
             * different initial animation props.
             */
            const steps = algorithmStepsRef.current ?? stepGeneratorRef.current();
            let animationElements = animationElementGeneratorRef.current(steps);
            const animationSteps = animationStepGeneratorRef.current(steps, animationElements);

            /**
             * Add initial props based on the first animation step.
             */ 
            animationElements.forEach((elementObj) => {
                if (animationSteps[0][elementObj.id]) {
                    elementObj.initialAnimationProps = animationSteps[0][elementObj.id].state;
                }
            })

            console.log(animationSteps);
            setAnimationElements(animationElements);
            setSteps(animationSteps);
            
            /**
             * Make sure that we have consumed the last step update by setting this variable to false.
             * This will ensure that the next time we trigger isAnimatingMode, we don't go through
             * this process of updating steps and animation elements if it doesn't need to be updated!
             */
            updateStepsRef.current = false; 
        }
    }, [isAnimatingMode]);

    return (
        isAnimatingMode && steps && animationElements && !updateStepsRef.current && (
            <AnimationRenderer steps={steps} animationElements={animationElements} attachElementsRef={attachElementsRef} />
        )
    )
}                