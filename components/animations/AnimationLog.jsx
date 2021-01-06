import ReactDOM from 'react-dom';
import { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import DragIcon from '@icons/drag.svg';

import Button from '@components/Button';

// Responsibility: Render the animation log with the currentStep as the active step.
/**
 * @state {boolean} dragging - Whether or not we're dragging the log
 * @state {ref} dragHandleRef - Ref containing drag handle element. Used to persistently style drag handle while dragging
 * @state {ref} logRef - Ref containing the log list. Used to scroll to the bottom after every update (we want to see the most recent steps!)
 */
function AnimationLog({ log, currentStep }) {
    const [dragging, setDragging] = useState(false);
    const dragHandleRef = useRef(null);
    const logRef = useRef(null);

    const handleStartDrag = () => {
        setDragging(true);

        if (dragHandleRef.current) {
            dragHandleRef.current.classList.add('bg-gray-300');
            document.body.style.cursor = 'grab';
        }
    }

    const handleStopDrag = () => {
        setDragging(false);

        if (dragHandleRef.current) {
            dragHandleRef.current.classList.remove('bg-gray-300');
            document.body.style.cursor = '';
        }
    }

    return (
        <>
            {
                ReactDOM.createPortal(
                    <Draggable
                    bounds="parent"
                    handle=".drag-handle"
                    onStart={handleStartDrag}
                    onStop={handleStopDrag}>
                        <div className="fixed bottom-8 right-10 min-w-mobile rounded-lg bg-white shadow-main z-50 overflow-hidden">
                            <header className="flex justify-between border-b border-gray-300">
                                <h1 className="font-bold text-xl p-3 pr-0">Animation Log</h1>
                                <div className="p-3 cursor-grab hover:bg-gray-300 drag-handle" ref={dragHandleRef}>
                                    <DragIcon />
                                </div>
                            </header>
                            <ul className="h-72 p-3 pb-0 overflow-y-auto">
                                {
                                    log.map((step, idx) => (
                                        step ? (<li key={idx} className={`group relative flex justify-between items-between px-2 py-3 rounded-lg border hover:border-primary focus:border-primary text-sm mb-3
                                        ${idx === currentStep ? 'border-primary' : 'border-gray-300'}`}> 
                                            {step}
                                            {
                                                idx !== currentStep && (
                                                    <Button 
                                                    btnStyle="secondary"
                                                    rootClass="absolute right-2 top-1/2 transform -translate-y-1/2 hidden group-hover:block px-2 py-1 rounded-md">
                                                        Go to step
                                                    </Button>
                                                )
                                            }
                                        </li>) : null
                                    )

                                    )
                                }
                            </ul>
                        </div>
                    </Draggable>
                , document.body)
            }
            { // This will prevent any pointer events being captured when dragging.
                dragging && (
                    ReactDOM.createPortal(
                        <div className="fixed inset-0" aria-hidden="true" />
                    , document.body)
                )
            }
            
        </>
    )
}

AnimationLog.propTypes = {
    log: PropTypes.arrayOf(PropTypes.string),
    currentStep: PropTypes.number.isRequired
};

export default AnimationLog;