import ReactDOM from 'react-dom';
import { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import DragIcon from '@icons/drag.svg';

import Button from '@components/Button';

function AnimationLog({ log, currentStep }) {
    const [dragging, setDragging] = useState(false);
    const dragHandleRef = useRef(null);

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
                            <ul className="max-h-animation-log p-3 space-y-3 overflow-y-auto">
                                {
                                    log.map((step, idx) => (
                                        <li className={`group flex justify-between items-between p-2 rounded-lg border hover:border-primary focus:border-primary
                                        ${idx === currentStep - 1 ? 'border-primary' : 'border-gray-300'}`}> 
                                            {step}
                                            {
                                                idx !== currentStep - 1 && (
                                                    <Button 
                                                    btnStyle="secondary"
                                                    rootClass="hidden group-hover:block">
                                                        Go to step
                                                    </Button>
                                                )
                                            }
                                        </li>
                                    ))
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

};

export default AnimationLog;