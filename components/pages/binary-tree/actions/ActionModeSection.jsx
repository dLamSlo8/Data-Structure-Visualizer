import { useEffect } from 'react';

import DropdownMenu from '../../../dropdown/DropdownMenu';
import SelectableDropdownItem from '../../../dropdown/SelectableDropdownItem';
import DropdownSelect from '../../../dropdown/DropdownSelect';

export default function ActionModeSection({ mode, setMode, sectionCollapsed }) {
    console.log(sectionCollapsed);
    console.log('rendering');
    return (
        <DropdownSelect title="Mode" defaultValue={mode} dropdownWrapperClass="mt-1 w-full">
            {
                ({ selectedItem, setSelectedItem, setOpen }) => {
                    useEffect(() => {
                        if (sectionCollapsed) {
                            setOpen(false);
                        }
                    }, [sectionCollapsed]);


                    const handleClick = (item) => {
                        setSelectedItem(item);
                        setMode(item);
                        setOpen(false);
                    }

                    return (
                        <>
                            <SelectableDropdownItem 
                            title="Binarysearch Input" 
                            description="Input the array representation of the tree given by binarysearch" 
                            isSelected={selectedItem === 'Binarysearch Input'}
                            handleClick={() => handleClick('Binarysearch Input')} />
                            <SelectableDropdownItem 
                            title="Build custom tree"
                            description="Create your own binary tree using interactive controls" 
                            isSelected={selectedItem === 'Custom Tree Input'}
                            handleClick={() => handleClick('Custom Tree Input')} />
                        </>
                    )

                }

            }
        </DropdownSelect>
    )
}