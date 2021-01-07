import PropTypes from 'prop-types';

import { animated, to } from '@react-spring/web';

// Responsibility: Render animation element
function TreeTraversalAnimationElement({ xy }) {
    return (
        <g id="animate-indicator">
            <animated.circle r="24" cx={xy?.to((x, y) => `${x}`)} cy={xy?.to((x, y) => `${y}`)} fillOpacity="0" strokeWidth="2" stroke="#0062FF"></animated.circle>
        </g>
    )
}

TreeTraversalAnimationElement.propTypes = {
    animationProps: PropTypes.object, // Represents the react-spring generated props that hold the [xy] values
    transform: PropTypes.object // Represents the current transform of the canvas such that any zoom or pan gets applied to this element
};

export default TreeTraversalAnimationElement;