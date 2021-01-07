import PropTypes from 'prop-types';
import { animated, to } from '@react-spring/web';

function AnimatedSubtree({ subTree, xy }) {
    return (
        <animated.g style={{ transform: xy?.to((x, y) => `translate(${x}px, ${y}px)`)}}>

        </animated.g>
    )
}

AnimatedSubtree.propTypes = {
    subTree: PropTypes.array.isRequired // Array of nodes from descendants() 
};

export default AnimatedSubtree;