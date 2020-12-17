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

    /**
     * Effect
     * Whenever animating mode is turned on and iff there is a new tree to be drawn,
     * generate the steps for this new tree and toggle off drewTree such that if animating
     * mode is toggled on and off and the tree hasn't changed, nothing will happen (as
     * the steps are the exact same. This is great for performance as we don't need
     * to do expensive calculations each time we turn on animating mode.)
     */
    useEffect(() => {
        if (drewTree && isAnimatingMode) {
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