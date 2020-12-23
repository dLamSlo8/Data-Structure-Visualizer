import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import AnimationContext from '@contexts/AnimationContext';
import { preOrderTraversalD3, inOrderTraversalD3, postOrderTraversalD3 } from '@functions/algorithms/d3/tree';

import DropdownSelect from '@components/dropdown/DropdownSelect';
import SelectableDropdownItem from '@components/dropdown/SelectableDropdownItem';
import ControlSection from '@components/animations/controls/ControlSection';

/**
 * Action section for tree traversal
 * Responsibility: Render tree traversal section and handle changes to traversal function
 * @state traversalType - Type of tree traversal
 */ 
function TraversalSection({ sectionCollapsed }) { // TO-DO: sectionCollapsed is not being passed!
    const { stepGeneratorRef, updateStepsRef } = useContext(AnimationContext);
    const [traversalType, setTraversalType] = useState('Preorder');

    /**
     * Effect
     * Updates step generator function based on traversal type selection.
     */
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
            values={[{
                title: 'Preorder'
            }, {
                title: 'Inorder'
            }, {
                title: 'Postorder'
            }]}
            value={traversalType}
            setValue={setTraversalType}
            dropdownWrapperClass="mt-1 w-full"
            closeTrigger={sectionCollapsed} />
            <ControlSection rootClass="mt-3" />
        </>
    )
}

TraversalSection.propTypes = {
    sectionCollapsed: PropTypes.bool // Whether the section is collapsed or not
};

export default TraversalSection;