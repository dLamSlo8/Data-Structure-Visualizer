import PropTypes from 'prop-types';

import DropdownItem from '../dropdown/DropdownItem';

// DropdownItem with extra styling based on whether it is selected/active
function SelectableDropdownItem({ isSelected, ...props }) {
    return (
        <li className="relative"> 
            <DropdownItem {...props} handleClick={!isSelected ? props.handleClick : (e) => e.preventDefault()} rootClass={isSelected && 'border-2 border-primary pointer-events-none'} />
            {
                isSelected && (
                    <div className="absolute top-2 right-2 py-1 px-2 rounded-lg bg-green-200 font-bold text-sm text-green-700 pointer-events-none shadow-main">
                        <p>Selected</p>
                    </div>
                )
            }
        </li>
    )
}

SelectableDropdownItem.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    props: PropTypes.object
};

export default SelectableDropdownItem;