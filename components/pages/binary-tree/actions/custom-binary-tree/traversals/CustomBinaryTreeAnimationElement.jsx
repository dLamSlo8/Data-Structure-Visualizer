import ReactDOM from 'react-dom';

import { animated, interpolate } from '@react-spring/web';

export default function CustomBinaryTreeAnimationElement({ animationProps }) {
    console.log(animationProps);
    return (
        ReactDOM.createPortal(
        <g transform="translate(0, 30)">
            <animated.circle r="24" cx={animationProps?.xy?.interpolate((x, y) => `${x}`)} cy={animationProps?.xy?.interpolate((x, y) => `${y}`)} fillOpacity="0" strokeWidth="2" stroke="#0062FF"></animated.circle>
        </g>, document.querySelector('#tree-svg'))
    )
}