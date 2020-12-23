import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import UpIcon from '../../public/icons/chevron-up.svg';
import DownIcon from '../../public/icons/chevron-down.svg';

import DropdownMenu from './DropdownMenu';
import DropdownMenuOpener from './DropdownMenuOpener';
import SelectableDropdownItem from'./SelectableDropdownItem';

// Responsibility: Handle rendering and keeping local state for dropdown select
function DropdownSelect({ title, values, value, setValue, closeTrigger, dropdownWrapperClass }) {
    const [open, setOpen] = useState(false);

    /**
     * Effect
     * Automatically closes dropdown when trigger is activated.
     */
    useEffect(() => {
        if (closeTrigger) {
            setOpen(false);
        }
    }, [closeTrigger]);

    const handleClick = (title) => {
        setOpen(false);
        setValue(title);
    };

    return (
        <>
            <h4 className="font-semibold text-lg text-gray-500 mb-1">{title}</h4>
            <button 
            className="flex justify-between items-center w-full py-3 px-5 border border-gray-500 rounded-lg"
            onClick={() => setOpen((open) => !open)}>
                {value}
                {
                    open ? (
                        <UpIcon />
                    ) : (
                        <DownIcon />
                    )
                }
            </button>
            <DropdownMenuOpener open={open}>
                <div className={`dropdown-wrapper ${dropdownWrapperClass ?? ''}`}>
                    <DropdownMenu>
                        {
                            values.map(({ title, ...restItemProps }) => (
                                <SelectableDropdownItem 
                                isSelected={value === title}
                                title={title}
                                handleClick={() => handleClick(title)}
                                {...restItemProps} />
                            ))
                        }
                    </DropdownMenu>
                </div>
            </DropdownMenuOpener>
        </>
    )
}

DropdownSelect.propTypes = {
    title: PropTypes.string.isRequired,
    defaultValue: PropTypes.any,
    dropdownWrapperClass: PropTypes.string,
    children: PropTypes.func.isRequired
};

export default DropdownSelect;