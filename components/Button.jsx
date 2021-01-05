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
        case 'light-primary':
            return 'btn btn--light-primary';
        default: 
            return '';
    }
}

function Button({ btnStyle, children, rootClass, onClick, isMouse, ...btnProps }) {
    return (
        <button 
        className={`${getStyleClass(btnStyle)} ${rootClass ? rootClass : ''}`} 
        {
            ...(onClick && { onClick(e) {
                onClick(e);

                if (isMouse) { // If using a mouse, manually remove focus when clicked.
                    e.currentTarget.blur();
                }
            }})
        }
        {...btnProps}>
            {children}
        </button>
    )
}

Button.propTypes = {
    btnStyle: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    isMouse: PropTypes.bool,
    rootClass: PropTypes.string,
    btnProps: PropTypes.object
}

// Memoize for performance. Never really want this to rerender
export default memo(Button);
