import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { animated } from '@react-spring/web';

// Responsibility: Render animation element
function TreeTraversalAnimationElement({ animationProps, transform }) {
    return (
        ReactDOM.createPortal(
        <g id="animate-indicator" transform={transform ?? 'translate(0, 30)'}>
            <animated.circle r="24" cx={animationProps?.xy?.interpolate((x, y) => `${x}`)} cy={animationProps?.xy?.interpolate((x, y) => `${y}`)} fillOpacity="0" strokeWidth="2" stroke="#0062FF"></animated.circle>
        </g>, document.querySelector('#tree-svg'))
    )
}

TreeTraversalAnimationElement.propTypes = {
    animationProps: PropTypes.object, // Represents the react-spring generated props that hold the [xy] values
    transform: PropTypes.object // Represents the current transform of the canvas such that any zoom or pan gets applied to this element
};

export default TreeTraversalAnimationElement;