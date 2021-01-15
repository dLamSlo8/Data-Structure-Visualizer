import PropTypes from 'prop-types';
import { animated } from '@react-spring/web';

import { DEFAULT_NODE_RADIUS } from '@util/globals/tree';

function TreeNode({ x, y, value, gProps, circleProps, textProps }) {
    return (
        <g {...gProps}>
            <circle r={DEFAULT_NODE_RADIUS} fill="white" stroke="black" strokeWidth="2" cx={x} cy={y} {...circleProps} />
            <text textAnchor="middle" dy="6" x={x} y={y} {...textProps}>{value}</text>
        </g>
    )
}

TreeNode.propTypes = {

};

export default TreeNode;