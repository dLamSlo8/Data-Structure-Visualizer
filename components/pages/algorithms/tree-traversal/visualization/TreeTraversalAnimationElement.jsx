import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { animated } from '@react-spring/web';

// Responsibility: Render animation element
function TreeTraversalAnimationElement({ attachRef, animationProps }) {
    return (
        ReactDOM.createPortal(
        <g id="animate-indicator">
            <animated.circle r="24" cx={animationProps?.x} cy={animationProps?.y} fillOpacity="0" strokeWidth="2" stroke="#0062FF"></animated.circle>
        </g>, attachRef)
    )
}

TreeTraversalAnimationElement.propTypes = {
    animationProps: PropTypes.object, // Represents the react-spring generated props that hold the [xy] values
    transform: PropTypes.object // Represents the current transform of the canvas such that any zoom or pan gets applied to this element
};

export default TreeTraversalAnimationElement;