import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { animated } from '@react-spring/web';

function AnimatedMaskedTreeNode({ animatedPosition, value, initPosition }) {
    return (
        ReactDOM.createPortal(
            <>
                <circle cx={initPosition.x} cy={initPosition.y} r="20" fill="white" /> {/** Mask circle */}
                <animated.g>
                    <circle cx={animatedPosition.x} cy={animatedPosition.y} r="20" fill="white" stroke="black" strokeWidth="2" />
                    <text x={animatedPosition.x} y={animatedPosition.y} dy="6" textAnchor="middle">{value}</text>
                </animated.g>
            </>, attachRef)

    )
}

export default AnimatedMaskedTreeNode;