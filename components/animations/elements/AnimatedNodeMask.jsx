import PropTypes from 'prop-types';

function AnimatedNodeMask({ initPosition }) {
    return <circle cx={initPosition.x} cy={initPosition.y} r="22" fill="white" />;
}

export default AnimatedNodeMask;