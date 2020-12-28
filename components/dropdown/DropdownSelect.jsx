import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import UpIcon from '../../public/icons/chevron-up.svg';
import DownIcon from '../../public/icons/chevron-down.svg';

import DropdownMenu from './DropdownMenu';
import DropdownMenuOpener from './DropdownMenuOpener';
import SelectableDropdownItem from'./SelectableDropdownItem';

/**
 * Custom select element
 * Responsibility: Renders dropdown and handles open and active item state
 * @state open - Whether the dropdown is opened
 */ 
function DropdownSelect({ title, values, value, setValue, closeTrigger, dropdownWrapperClass, dropdownDirection }) {
    const [open, setOpen] = useState(false);
    const elementRef = useRef(null);
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
        <div className="relative" ref={elementRef}>
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
            {
                    <DropdownMenuOpener open={open}>
                        <div className={`dropdown-wrapper ${dropdownWrapperClass ?? ''}`}>
                            <DropdownMenu>
                                {
                                    values.map(({ title, ...restItemProps }) => (
                                        <SelectableDropdownItem 
                                        key={title}
                                        isSelected={value === title}
                                        title={title}
                                        handleClick={() => handleClick(title)}
                                        {...restItemProps} />
                                    ))
                                }
                            </DropdownMenu>
                        </div>
                    </DropdownMenuOpener>
            }

        </div>
    )
}

DropdownSelect.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    setValue: PropTypes.func.isRequired,
    values: PropTypes.arrayOf(PropTypes.object).isRequired,
    dropdownWrapperClass: PropTypes.string,
    closeTrigger: PropTypes.bool
};

export default DropdownSelect;