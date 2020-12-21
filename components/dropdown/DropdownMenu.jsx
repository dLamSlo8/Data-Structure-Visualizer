import PropTypes from 'prop-types';

function DropdownMenu({ rootClass, children }) {
    return (
        <ul className={`space-y-3 w-full p-3 ${rootClass ?? ''}`}>
            {children}
        </ul>
    )
}

DropdownMenu.propTypes = {
    rootClass: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default DropdownMenu;