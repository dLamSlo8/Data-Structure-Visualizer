import { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * Function that returns the appropriate tailwind style class for the button.
 * NOTE: Doesn't use string interpolation b/c purgeCSS requires full class names as it 
 * statically checks for classes in the entire file.
 * 
 * @param {String} style - Button style represented as a string
 */
const getStyleClass = (style) => {
    switch (style) {
        case 'primary':
            return 'btn btn--primary';
        case 'secondary':
            return 'btn btn--secondary';
        case 'warning':
            return 'btn btn--warning';
        case 'disabled':
            return 'btn btn--disabled';
        default: 
            return '';
    }
}

function Button({ btnStyle, children, rootClass, ...btnProps }) {
    return (
        <button className={`${getStyleClass(btnStyle)} ${rootClass ? rootClass : ''}`} {...btnProps}>
            {children}
        </button>
    )
}

Button.propTypes = {
    btnStyle: PropTypes.string,
    children: PropTypes.node.isRequired,
    rootClass: PropTypes.string,
    btnProps: PropTypes.object
}

// Memoize for performance. Never really want this to rerender
export default memo(Button);
