import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
export default function useAnimationControl({ stepGenerator, initialProps }) {
    const [steps, setSteps] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [willAutoRun, setWillAutoRun] = useState(true);
    const [running, setRunning] = useState(false);

    const handleRun = () => {
        setRunning(true);
        if (!steps) { // Steps will be cached, so no need to do redo expensive calculations.
            setSteps(stepGenerator());
        }
    }

    const handleAutoRun = async (next, cancel) => {
        for (let step of steps) {
            await next({ x: step.x, y: step.y });
        }
    }

    const animationProps = useSpring({to: willAutoRun ? (steps ? handleAutoRun : initialProps) : (steps ? steps[currentStep] : initialProps), from: initialProps });



    return { animationProps, running, setRunning, handleRun, handleAutoRun };
}