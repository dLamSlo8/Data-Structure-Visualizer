import PropTypes from 'prop-types';
import { animated } from '@react-spring/web';

import { DEFAULT_NODE_RADIUS } from '@util/globals/tree';

function AnimatedTreeNode({ x, y, value, gProps, circleProps, textProps, gOpacity }) {
    return (
        <animated.g {...gProps} fillOpacity={gOpacity}>
            <animated.circle r={DEFAULT_NODE_RADIUS} fill="white" stroke="black" strokeWidth="2" cx={x} cy={y} {...circleProps} />
            <animated.text textAnchor="middle" dy="6" x={x} y={y} {...textProps}>{value}</animated.text>
        </animated.g>
    )
}

AnimatedTreeNode.propTypes = {
};

export default AnimatedTreeNode;