import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

function calcSliderRange(elementWidth, min, max) {
    if (elementWidth) {
        let resArr = [];
        let stepLength = elementWidth / (max - min);

        for (let idx = 0; idx < max - min; idx++) {
            resArr.push(stepLength * idx);
        }

        return resArr;
    }
    else {
        return null;
    }
}

function RangeSlider({ value, setValue, min, max }) {
    const sliderRef = useRef(null);
    const slideRef = useRef(null);
    const gridOffset = sliderRef.current ? sliderRef.current.offsetWidth / (max - min) : 0;
    const [initPosition, setInitPosition] = useState({ x: 0, y: 0 });

    const handleClick = (e) => {
        
        let xOffset = e.clientX - e.currentTarget.getBoundingClientRect().x;
        setInitPosition({x: Math.round(xOffset / gridOffset) * gridOffset, y: 0 });
    }
    return (
        <div className="relative cursor-grab" ref={sliderRef} onMouseDown={handleClick}>
            <div className="w-full h-px absolute top-1/2 transform -translate-y-1/2 bg-gray-400" />
            <Draggable
            axis="x"
            position={initPosition}
            grid={[sliderRef.current ? sliderRef.current.offsetWidth / (max - min) : 0, sliderRef.current ? sliderRef.current.offsetWidth / (max - min) : 0]}
            bounds="parent"
            >
                <div className="w-2 h-6 bg-gray-400 rounded-sm" ref={slideRef} />
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