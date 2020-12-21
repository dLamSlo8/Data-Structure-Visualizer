import { useState } from 'react';
import PropTypes from 'prop-types';

import UpIcon from '../../public/icons/chevron-up.svg';
import DownIcon from '../../public/icons/chevron-down.svg';

import DropdownMenu from './DropdownMenu';
import DropdownMenuOpener from './DropdownMenuOpener';

// Responsibility: Handle rendering and keeping local state for dropdown select
function DropdownSelect({ title, defaultValue, dropdownWrapperClass, children: listChildren }) {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(defaultValue);

    return (
        <>
            <h4 className="font-semibold text-lg text-gray-500 mb-1">{title}</h4>
            <button 
            className="flex justify-between items-center w-full py-3 px-5 border border-gray-500 rounded-lg"
            onClick={() => setOpen((open) => !open)}>
                {selectedItem}
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
                        {listChildren({ selectedItem, setSelectedItem, setOpen })}
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
    children: PropTypes.node.isRequired
};

export default DropdownSelect;