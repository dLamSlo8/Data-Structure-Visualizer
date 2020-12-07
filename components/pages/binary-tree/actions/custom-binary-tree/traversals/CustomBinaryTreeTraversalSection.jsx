import { useState, useEffect } from 'react';

import DropdownSelect from '../../../../../dropdown/DropdownSelect';
import SelectableDropdownItem from '../../../../../dropdown/SelectableDropdownItem';

export default function CustomBinaryTreeTraversalSection({ sectionCollapsed }) {
    const [traversalType, setTraversalType] = useState('Preorder');

    return (
        <DropdownSelect
        title="Traversal Type"
        defaultValue="Preorder"
        dropdownWrapperClass="mt-1 w-full"
        >
            {
                ({ selectedItem, setSelectedItem, setOpen }) => {
                    useEffect(() => {
                        if (sectionCollapsed) {
                            setOpen(false);
                        }
                    }, [sectionCollapsed]);

                    const handleClick = (item) => {
                        setSelectedItem(item);
                        setTraversalType(item);
                        setOpen(false);
                    }

                    return (
                        <>
                            <SelectableDropdownItem
                            isSelected={selectedItem === 'Preorder'}
                            title="Preorder"
                            handleClick={() => handleClick('Preorder')} />
                            <SelectableDropdownItem
                            isSelected={selectedItem === 'Inorder'}
                            title="Inorder"
                            handleClick={() => handleClick('Inorder')} />
                            <SelectableDropdownItem
                            isSelected={selectedItem === 'Postorder'}
                            title="Postorder"
                            handleClick={() => handleClick('Postorder')} />
                        </>
                    )
                }
            }
        </DropdownSelect>
    )
}