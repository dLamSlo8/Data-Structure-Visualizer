import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

function RangeSlider({ value, setValue, min, max }) {
    const sliderRef = useRef(null);

    return (
        <div className="relative cursor-grab" ref={sliderRef}>
            <div className="w-full h-px absolute top-1/2 transform -translate-y-1/2 bg-gray-400" />
            <Draggable
            axis="x"
            position={null}
            grid={[sliderRef.current ? sliderRef.current.offsetWidth / (max - min) : 0, sliderRef.current ? sliderRef.current.offsetWidth / (max - min) : 0]}
            bounds="parent">
                <div className="w-2 h-6 bg-gray-400 rounded-sm" />
            </Draggable>
        </div>
    )
}

RangeSlider.propTypes = {
    value: PropTypes.number,
    setValue: PropTypes.func,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
};

export default RangeSlider;