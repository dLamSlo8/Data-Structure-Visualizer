import PropTypes from 'prop-types';

import Button from './Button';

function IconButton({ icon, rootClass, ...btnProps }) {
    return (
        <button 
        className={rootClass ?? ''}
        {...btnProps}>
            {icon}
        </button>
    )
}

IconButton.propTypes = {
    icon: PropTypes.element.isRequired,
    rootClass: PropTypes.string,
    btnProps: PropTypes.shape({
        "aria-label": PropTypes.string.isRequired
    })
};

export default IconButton;