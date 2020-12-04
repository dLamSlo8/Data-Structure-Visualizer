import { useState } from 'react';

import UpIcon from '../../public/icons/chevron-up.svg';
import DownIcon from '../../public/icons/chevron-down.svg';

import DropdownMenu from './DropdownMenu';
import DropdownMenuOpener from './DropdownMenuOpener';

// Responsibility: Handle rendering and keeping local state for dropdown select
export default function DropdownSelect({ title, defaultValue, children: listChildren }) {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(defaultValue);

    return (
        <>
            <h4 className="text-gray-500 mb-3">{title}</h4>
            <button 
            className="flex justify-between items-center w-full py-3 px-5 border-2 border-gray-500 rounded-lg"
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
                <DropdownMenu>
                    {listChildren({ selectedItem, setSelectedItem })}
                </DropdownMenu>
            </DropdownMenuOpener>
        </>
    )
}