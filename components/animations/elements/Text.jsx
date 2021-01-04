import PropTypes from 'prop-types';

import { animated, interpolate } from '@react-spring/web';

function Text({ x, y, value, fill }) {
    return (
        <animated.text x={x} y={y} textAnchor="middle" fill={fill}>
            {value}
        </animated.text>
    )
}

Text.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    fill: PropTypes.any.isRequired
};

export default Text;