import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import AnimationContext from '@contexts/AnimationContext';
import D3Context from '@contexts/D3Context';
import { mapTraversalToPosition } from '@d3/tree';

import DropdownSelect from '@components/dropdown/DropdownSelect';
import ControlSection from '@components/animations/controls/ControlSection';
import Text from '@components/animations/elements/tree-traversal/Text';
import TreeTraversalAnimationElement from '../visualization/TreeTraversalAnimationElement';

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
     * This is what is passed into the animationElementsGenerator and
     * animationStepsGenerator functions, as more often than not, both the elements required
     * for animation and the steps generated for animation rely on what is 
     * returned from the algorithm we are working on. 
     */
    useEffect(() => { 

        stepGeneratorRef.current = () => {
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
    }, [traversalType, tree]);

    useEffect(() => {
        animationStepGeneratorRef.current = (algorithmRes) => { // TODO: Change according to new format (i.e. { uuid: <uuid>, type: <type> }) when it is ready
            let positions = mapTraversalToPosition(algorithmRes, d3StructureRef.current, traversalType);

            let traversalArray = algorithmRes[1];

            for (let idx = 0; idx < positions.length; idx++) {
                let traversalObj = traversalArray[idx];
                let uuid = Object.values(traversalObj)[0];
                let textValue = Object.keys(traversalObj)[0];

                if (textValue !== 'parent') {
                    positions[idx][`${uuid}-${textValue === 'visit' ? 'root' : textValue}`] = 'red';
                }
            }
            console.log(traversalArray);

            console.log(positions);
            return positions;
        };
        animationElementGeneratorRef.current = () => {
            let resArr = [{
                id: 'xy',
                component: TreeTraversalAnimationElement,
                initialAnimationProp: [0, 0],
                animationProp: 'xy'
            }];

            if (traversalType !== 'Level-order') {
                d3StructureRef.current.descendants().filter((node) => node.data.name !== null).forEach((node) => {
                    const toTextNode = (text, idx) => ({
                        id: `${node.data.uuid}-${text}`,
                        component: Text,
                        componentProps: {
                            value: `${text[0].toUpperCase()}${text.slice(1)}`,
                            x: idx === 0 ? node.x - 50 : (idx === 1 ? node.x : node.x + 50),
                            y: node.y - 30
                        },
                        initialAnimationProp: 'black',
                        animationProp: 'fill'
                    });
    
                    let textContent;
    
                    switch (traversalType) {
                        case 'Preorder':
                            textContent = ['root', 'left', 'right'];
                            break;
                        case 'Inorder':
                            textContent = ['left', 'root', 'right'];
                            break;
                        case 'Postorder':
                            textContent = ['left', 'right', 'root'];
                            break;
                        default: 
                            break;
                    }
    
                    resArr = resArr.concat(textContent.map((val, idx) => toTextNode(val, idx)));
                });
            }
            
            return resArr;
        };
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
            }, { 
                title: 'Level-order'
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