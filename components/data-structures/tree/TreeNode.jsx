import PropTypes from 'prop-types';
import { animated } from '@react-spring/web';

function TreeNode({ isAnimated, x, y, value }) {
    return (
        <g>
            {
                isAnimated ? (
                    <>
                        <animated.circle r={20} fill="white" stroke="black" strokeWidth="2" cx={x} cy={y} />
                        <animated.text textAnchor="middle" dy="6" x={x} y={y}>{value}</animated.text>
                    </>
                ) : (
                    <>
                        <circle r={20} fill="white" stroke="black" strokeWidth="2" cx={x} cy={y} />
                        <text textAnchor="middle" dy="6" x={x} y={y}>{value}</text>
                    </>
                )
            }

        </g>
    )
}

TreeNode.propTypes = {
    isAnimated: PropTypes.bool,

};

export default TreeNode;