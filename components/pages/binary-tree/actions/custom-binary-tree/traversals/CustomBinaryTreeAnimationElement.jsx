import ReactDOM from 'react-dom';

import { animated } from 'react-spring';

export default function CustomBinaryTreeAnimationElement({ animationProps }) {
    return (
        ReactDOM.createPortal(
        <g transform="translate(0, 30)">
            <animated.circle r="24" cx={animationProps?.x} cy={animationProps?.y} fillOpacity="0" strokeWidth="2" stroke="#0062FF"></animated.circle>
        </g>, document.querySelector('#tree-svg'))
    )
}