import PropTypes from 'prop-types';

import { animated, to } from '@react-spring/web';

function AnimatedTreeNode({ animatedPosition, value }) {
    return (
            <>
                <g>
                    <animated.circle cx={animatedPosition.to((x, y) => `${x}`)} cy={animatedPosition.to((x, y) => `${y}`)} r="20" fill="white" stroke="black" strokeWidth="2" />
                    <animated.text x={animatedPosition.to((x, y) => `${x}`)} y={animatedPosition.to((x, y) => `${y}`)} dy="6" textAnchor="middle">{value}</animated.text>
                </g>
            </>
    )
}

AnimatedTreeNode.propTypes = {
    animatedPosition: PropTypes.any.isRequired,
    value: PropTypes.number.isRequired,
    initPosition: PropTypes.object.isRequired
}

export default AnimatedTreeNode;