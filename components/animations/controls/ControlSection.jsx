import { useContext } from 'react';
import PropTypes from 'prop-types';

import AnimationContext from '@contexts/AnimationContext';

import ResetIcon from '@icons/rotate-ccw.svg';
import LeftIcon from '@icons/chevron-left.svg';
import PlayIcon from '@icons/play-circle.svg';
import PauseIcon from '@icons/pause-circle.svg';
import RightIcon from '@icons/chevron-right.svg';
import RightsIcon from '@icons/chevrons-right.svg';

import Button from '@components/Button';
import RangeSlider from './RangeSlider';

function ControlSection({ extraSettings, rootClass }) {
    const { isAnimatingMode, setAnimatingMode, animationMethodsRef, animationState, config, setConfig } = useContext(AnimationContext);

    const running = animationState === 'running';

    const updateConfig = (e, customProps) => {
        if (running) { // Ensure that any change is void if running. Enforces no modification of settings during auto-animation!
            return ;
        }

        let { name, value, checked, type } = e.target;

        if (e) { 
            setConfig((config) => ({ ...config, [e.target.name]: (type === 'checkbox' ? checked : value )}));
        }
        else { // For more custom values, pass in directly.
            setConfig((config) => ({ ...config, [customProps.prop]: customProps.propValue }));
        }
    }

    const handlePlayPauseClick = () => {
        setAnimatingMode(true);

        if (running) {
            animationMethodsRef.current.handlePause();
        }
        else {
            animationMethodsRef.current.handleRun();
        }
    }

    return (
        <section className={`relative ${rootClass ?? ''} ${isAnimatingMode ? 'z-40' : ''}`}>
            {
                isAnimatingMode && (
                    <div className="absolute z-negative bg-white rounded-lg shadow-lg"></div>
                )
            }
            <h4 className={` font-semibold text-lg ${isAnimatingMode ? 'text-white' : 'text-gray-500'} mb-1`}>Controls</h4>
            <div className={`p-5 border border-gray-400 rounded-lg ${isAnimatingMode ? 'bg-white' : ''}`}>
                <section className="flex justify-between pb-5 px-8 border-b border-gray-400">
                    <Button type="button" onClick={animationMethodsRef.current.handleReset}><ResetIcon /></Button>
                    {/* <Button type="button" onClick={handleStepBack}><LeftIcon /></Button> */}
                    <Button type="button" onClick={handlePlayPauseClick}>
                        {
                            running ? (
                                <PauseIcon />
                            ) : (
                                <PlayIcon />
                            )
                        }
                    </Button>
                    {/* <Button type="button" onClick={handleStepForward}><RightIcon /></Button> */}
                    <Button type="button" onClick={animationMethodsRef.current.handleSkipToEnd}><RightsIcon /></Button>
                </section>
                <section className="relative mt-3">

                    <header className="flex items-center space-x-3 mb-3">
                        <h5 className="font-semibold">Settings</h5>
                    </header>
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0">
                        <div className="w-full flex items-start space-x-3">
                            <input 
                            name="animationsOff" 
                            id="animationOffCheckbox" 
                            type="checkbox" 
                            checked={config.animationsOff} 
                            onChange={updateConfig} />
                            <label htmlFor="animationOffCheckbox" className="relative bottom-1 text-sm">Turn animations off<br /><span className="text-gray-500">(For reduced-motion users)</span></label>
                        </div>
                        <div className="w-full flex items-start space-x-3">
                            <input 
                            name="autoPlay"
                            id="autoPlayCheckbox" 
                            type="checkbox" 
                            checked={config.autoPlay}
                            onChange={updateConfig} />
                            <label htmlFor="autoPlayCheckbox" className="relative bottom-1 text-sm">Auto-play</label>
                        </div>
                        {
                            running && (
                                <p className="absolute top-0 w-full h-full flex items-center p-4 rounded-lg bg-white bg-opacity-95 shadow-main font-bold text-sm">You may only modify settings when auto-animation is paused/reset.</p>
                            )
                        }
                    </div>
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0">
                        <div className="w-1/2 md:pr-5">
                            <h6>Animation Speed</h6>
                            <RangeSlider 
                            min={0}
                            max={5} />
                        </div>
                        <div className="w-1/2">
                            <h6>Current Step</h6>
                            
                        </div>
                    </div>
                    {extraSettings ? extraSettings({ config, setConfig }) : null}
                </section>  
            </div>
        </section>

    )
}

ControlSection.propTypes = {
    extraSettings: PropTypes.func,
    rootClass: PropTypes.string
};

export default ControlSection;