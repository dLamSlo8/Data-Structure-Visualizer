import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import AnimationContext from '@contexts/AnimationContext';
import D3Context from '@contexts/D3Context';

import getStepGenerator from '@util/algorithms/tree-traversal/animation/steps';
import getElementGenerator from '@util/algorithms/tree-traversal/animation/elements';

import DropdownSelect from '@components/dropdown/DropdownSelect';
import ControlSection from '@components/animations/controls/ControlSection';


/**
 * Action section for tree traversal
 * Responsibility: Render tree traversal section and handle changes to traversal function
 * @state traversalType - Type of tree traversal
 */ 
function TraversalSection({ tree, sectionCollapsed }) { 
    const { stepGeneratorRef, updateStepsRef, animationStepGeneratorRef, animationElementGeneratorRef } = useContext(AnimationContext);
    const { d3StructureRef } = useContext(D3Context);
    const [traversalType, setTraversalType] = useState('Preorder');

    /**
     * Effect
     * Updates step generator function based on traversal type.
     * The result what is passed into the animationElementsGenerator and
     * animationStepsGenerator functions, as more often than not, both the elements required
     * for animation and the steps generated for animation rely on what is 
     * returned from the algorithm we are working on. 
     */
    useEffect(() => { 
        if (tree) {
            stepGeneratorRef.current = () => {
                console.log('generating traversal steps!');
                let traversalRes = null;
    
                switch (traversalType) {
                    case 'Preorder':
                        traversalRes = tree.preOrderTraversal();
                        break;
                    case 'Inorder':
                        traversalRes = tree.inOrderTraversal();
                        break;
                    case 'Postorder':
                        traversalRes = tree.postOrderTraversal();
                        break;
                    case 'Level-order':
                        traversalRes = tree.levelOrderTraversal();
                        break;
                    default:
                        break;
                }
    
                return traversalRes;
            };
    
            updateStepsRef.current = true; // Make sure to enable updating steps on next animating mode toggle.
            animationStepGeneratorRef.current = getStepGenerator(traversalType, tree);
            animationElementGeneratorRef.current = getElementGenerator(traversalType, tree);
        }
    }, [traversalType, tree]);

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
            }, { 
                title: 'Level-order'
            }]}
            value={traversalType}
            setValue={setTraversalType}
            dropdownWrapperClass="mt-1 w-full"
            closeTrigger={sectionCollapsed} />
            <ControlSection rootClass="mt-3" triggersAnimatingMode />
        </>
    )
}

TraversalSection.propTypes = {
    sectionCollapsed: PropTypes.bool // Whether the section is collapsed or not
};

export default TraversalSection;