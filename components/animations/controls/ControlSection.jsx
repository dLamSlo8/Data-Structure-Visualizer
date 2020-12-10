import ResetIcon from '../../../public/icons/rotate-ccw.svg';
import LeftIcon from '../../../public/icons/chevron-left.svg';
import PlayIcon from '../../../public/icons/play-circle.svg';
import PauseIcon from '../../../public/icons/pause-circle.svg';
import RightIcon from '../../../public/icons/chevron-right.svg';
import RightsIcon from '../../../public/icons/chevrons-right.svg';
import SettingsIcon from '../../../public/icons/settings.svg';

import Button from '../../Button';

export default function ControlSection({ running, handleReset, handleStepBack, handlePause, handleRun, handleStepForward, handleSkipToEnd, config, setConfig, extraSettings, rootClass }) {
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

    return (
        <section className={`${rootClass ?? ''}`}>
            <h4 className="font-semibold text-lg text-gray-500 mb-1">Controls</h4>
            <div className="p-5 border border-gray-400 rounded-lg">
                <section className="flex justify-between pb-5 px-8 border-b border-gray-400">
                    <Button type="button" onClick={handleReset}><ResetIcon /></Button>
                    <Button type="button" onClick={handleStepBack}><LeftIcon /></Button>
                    <Button type="button" onClick={running ? handlePause : handleRun}>
                        {
                            running ? (
                                <PauseIcon />
                            ) : (
                                <PlayIcon />
                            )
                        }
                    </Button>
                    <Button type="button" onClick={handleStepForward}><RightIcon /></Button>
                    <Button type="button" onClick={handleSkipToEnd}><RightsIcon /></Button>
                </section>
                <section className="relative mt-3">

                    <header className="flex items-center space-x-3 mb-3">
                        <h5 className="font-semibold">Settings</h5>
                    </header>
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0">
                        <div className="w-full flex space-x-3">
                            <input 
                            name="animationsOff" 
                            id="animationOffCheckbox" 
                            type="checkbox" 
                            checked={config.animationsOff} 
                            onChange={updateConfig} />
                            <label htmlFor="animationOffCheckbox" className="relative bottom-1 text-sm">Turn animations off<br /><span className="text-gray-500">(For reduced-motion users)</span></label>
                        </div>
                        <div className="w-full flex space-x-3">
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
                    {extraSettings}
                </section>  
            </div>
        </section>

    )
}