import PropTypes from 'prop-types';
import { animated } from '@react-spring/web';

import { DEFAULT_NODE_RADIUS } from '@util/globals/tree';

function TreeNode({ isAnimated, x, y, value, gProps, circleProps, textProps }) {
    return (
        <g>
            {
                isAnimated ? (
                    <g {...gProps}>
                        <animated.circle r={DEFAULT_NODE_RADIUS} fill="white" stroke="black" strokeWidth="2" cx={x} cy={y} {...circleProps} />
                        <animated.text textAnchor="middle" dy="6" x={x} y={y} {...textProps}>{value}</animated.text>
                    </g>
                ) : (
                    <g {...gProps}>
                        <circle r={DEFAULT_NODE_RADIUS} fill="white" stroke="black" strokeWidth="2" cx={x} cy={y} {...circleProps} />
                        <text textAnchor="middle" dy="6" x={x} y={y} {...textProps}>{value}</text>
                    </g>
                )
            }

        </g>
    )
}

TreeNode.propTypes = {
    isAnimated: PropTypes.bool,

};

export default TreeNode;