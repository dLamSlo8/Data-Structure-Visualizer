import { useState, useEffect, useContext } from 'react';

import AnimationContext from '@contexts/AnimationContext';
import { preOrderTraversalD3, inOrderTraversalD3, postOrderTraversalD3 } from '@functions/tree';

import DropdownSelect from '@components/dropdown/DropdownSelect';
import SelectableDropdownItem from '@components/dropdown/SelectableDropdownItem';
import ControlSection from '@components/animations/controls/ControlSection';

export default function TreeTraversalSection({ sectionCollapsed }) {
    const { stepGeneratorRef, updateStepsRef } = useContext(AnimationContext);
    const [traversalType, setTraversalType] = useState('Preorder');
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        if (traversalType === 'Preorder') {
            stepGeneratorRef.current = preOrderTraversalD3;
        }
        else if (traversalType === 'Inorder') {
            stepGeneratorRef.current = inOrderTraversalD3;
        }
        else {
            stepGeneratorRef.current = postOrderTraversalD3;
        }
        updateStepsRef.current = true;
    }, [traversalType]);

    return (
        <>
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
            <ControlSection rootClass="mt-3" />
        </>
    )
}