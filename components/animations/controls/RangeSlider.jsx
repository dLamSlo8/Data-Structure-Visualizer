import { useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

export default function RangeSlider({ value, setValue, min, max }) {
    const sliderRef = useRef(null);

    useEffect(() => {
        console.log(sliderRef.current.offsetWidth);
    }, []);


    return (
        <div className="relative cursor-grab" ref={sliderRef}>
            <div className="w-full h-px-1/2 absolute top-1/2 transform -translate-y-1/2 bg-gray-400" />
            <Draggable
            axis="x"
            position={null}
            grid={[sliderRef.current ? sliderRef.current.offsetWidth / (max - min) : 0, sliderRef.current ? sliderRef.current.offsetWidth / (max - min) : 0]}
            bounds="parent">
                <div className="w-2 h-6 bg-gray-400 rounded-sm">
                    
                </div>
            </Draggable>
        </div>
    )
}