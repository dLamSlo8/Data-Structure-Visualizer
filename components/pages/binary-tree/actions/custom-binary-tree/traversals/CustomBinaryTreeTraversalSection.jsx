import { useState, useEffect, memo } from 'react';

import { preOrderTraversalD3, generateD3Tree, addAnimationElement } from '../../../../../../functions/tree';
import useAnimationControl from '../../../../../../hooks/useAnimationControl';

import DropdownSelect from '../../../../../dropdown/DropdownSelect';
import SelectableDropdownItem from '../../../../../dropdown/SelectableDropdownItem';
import ControlSection from '../../../../../animations/controls/ControlSection';
import CustomBinaryTreeAnimationElement from './CustomBinaryTreeAnimationElement';

export default memo(function CustomBinaryTreeTraversalSection({ sectionCollapsed, d3Tree }) {
    const [traversalType, setTraversalType] = useState('Preorder');

    const { animationProps, animationState, setAnimationState, handleRun, handlePause, handleSkipToEnd, handleReset, config, setConfig } = useAnimationControl({
        stepGenerator: () => preOrderTraversalD3(d3Tree),
        initialProps: { xy: [50, 50] }
    });

    console.log(animationProps);



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
            <ControlSection rootClass="mt-3" running={animationState === 'running'} handleRun={handleRun} handlePause={handlePause} handleSkipToEnd={handleSkipToEnd} handleReset={handleReset} config={config} setConfig={setConfig} />
            {
                animationState ? (
                    <CustomBinaryTreeAnimationElement animationProps={animationProps} />
                ) : null
            }
        </>
    )
}, (prev, next) => {
    console.log(prev);
    console.log(next);
    return prev.sectionCollapsed === next.sectionCollapsed && 
            compareTrees(prev.d3Tree?.descendants(), next.d3Tree.descendants());

})

function compareTrees(prev, next) {
    if (!prev) {
        return false;
    }

    if (prev.length !== next.length) { 
        return false;
    }
    let prevData = prev.map((node) => node.data);
    let nextData = next.map((node) => node.data);

    for (let idx = 0; idx < prevData.length; idx++) {
        if (prevData[idx].name !== nextData[idx].name) {
            return false;
        }
    }

    return true;
}