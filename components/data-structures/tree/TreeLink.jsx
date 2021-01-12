import PropTypes from 'prop-types';
import { animated } from '@react-spring/web';

function TreeLink({ isAnimated, ...lineProps }) {
    console.log(lineProps);
    return (
        isAnimated ? (
            <animated.line {...lineProps} />
        ) : (
            <line stroke="black" strokeWidth="1" {...lineProps} />
        )
    )
};

TreeLink.propTypes = {
    lineProps: PropTypes.shape({
        x1: PropTypes.number.isRequired,
        x2: PropTypes.number.isRequired,
        y1: PropTypes.number.isRequired,
        y2: PropTypes.number.isRequired
    })
}

export default TreeLink;