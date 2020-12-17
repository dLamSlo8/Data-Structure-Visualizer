import { useState, useEffect, useContext } from 'react';

import AnimationContext from '@contexts/AnimationContext';
import { preOrderTraversalD3, generateD3Tree, addAnimationElement } from '@functions/tree';
import useAnimationControl from '@hooks/useAnimationControl';

import DropdownSelect from '@components/dropdown/DropdownSelect';
import SelectableDropdownItem from '@components/dropdown/SelectableDropdownItem';
import ControlSection from '@components/animations/controls/ControlSection';
import TreeTraversalAnimationElement from '../visualization/TreeTraversalAnimationElement';

export default function TreeTraversalSection({ sectionCollapsed, drewTree, setDrewTree }) {
    const [traversalType, setTraversalType] = useState('Preorder');
    const { isAnimatingMode } = useContext(AnimationContext);
    const { animationProps, animationState, setAnimationState, handleRun, handlePause, handleSkipToEnd, handleReset, config, setConfig, setSteps } = useAnimationControl({
        initialProps: { xy: [50, 50] },
    });

    useEffect(() => {
        if (drewTree && isAnimatingMode) {
            console.log('Recalculating steps!');
            setSteps(preOrderTraversalD3());
            setDrewTree(false);
        }
    }, [drewTree, isAnimatingMode]);


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
                    <TreeTraversalAnimationElement animationProps={animationProps} />
                ) : null
            }
        </>
    )
}