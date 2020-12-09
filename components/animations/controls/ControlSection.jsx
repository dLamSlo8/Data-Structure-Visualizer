import StopIcon from '../../../public/icons/stop-circle.svg';
import LeftIcon from '../../../public/icons/chevron-left.svg';
import PlayIcon from '../../../public/icons/play-circle.svg';
import PauseIcon from '../../../public/icons/pause-circle.svg';
import RightIcon from '../../../public/icons/chevron-right.svg';
import RightsIcon from '../../../public/icons/chevrons-right.svg';

import Button from '../../Button';

export default function ControlSection({ running, handleReset, handleStepBack, handlePause, handleRun, handleStepForward, handleSkipToEnd, rootClass }) {
    return (
        <section className={`${rootClass ?? ''}`}>
            <h4 className="font-semibold text-lg text-gray-500 mb-1">Controls</h4>
            <div className="py-5 px-10 border border-gray-400 rounded-lg">
                <div className="flex justify-between">
                    <Button type="button" onClick={handleReset}><StopIcon /></Button>
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
                </div>
            </div>
        </section>

    )
}