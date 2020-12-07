import { memo } from 'react';

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
            return 'btn--primary';
        case 'secondary':
            return 'btn--secondary';
        case 'warning':
            return 'btn--warning';
        case 'disabled':
            return 'btn--disabled';
        default: 
            return '';
    }
}

// Memoize for performance. Never really want this to rerender
export default memo(function Button({ btnStyle, children, rootClass, ...btnProps }) {
    
    return (
        <button className={`btn ${getStyleClass(btnStyle)} ${rootClass ?? ''}`} {...btnProps}>
            {children}
        </button>
    )
})