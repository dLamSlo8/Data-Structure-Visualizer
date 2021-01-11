import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import AnimationContext from '@contexts/AnimationContext';
import D3Context from '@contexts/D3Context';
import { mapTraversalToPosition } from '@d3/tree-traversal';

import DropdownSelect from '@components/dropdown/DropdownSelect';
import ControlSection from '@components/animations/controls/ControlSection';
import Text from '@components/animations/elements/Text';
import TraversalAnimationElement from '@components/animations/elements/TraversalAnimationElement';

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
    }, [traversalType, tree]);

    /**
     * Effect
     * When a new traversal type is selected, we update the animation step and elements
     * generator functions to match. 
     */
    useEffect(() => {
        animationStepGeneratorRef.current = (algorithmRes, animationElements) => { 
            let steps = mapTraversalToPosition(algorithmRes[1], d3StructureRef.current, traversalType);
            let textAnimationElements = animationElements.nonDataStructure.slice(1);

            if (traversalType !== 'Level-order') { // If level order, we don't need to add text element steps.
                let traversalArray = algorithmRes[1];

                let currentUuid = d3StructureRef.current.descendants()[0].data.uuid; // Always begin with root uuid.
                let positionsIdx = 1;
                let activeTextElements = {}; // Mark where every text element becomes active

                for (let idx = 0; idx < traversalArray.length; idx++) {
                    let { uuid, type } = traversalArray[idx];

                    if (type !== 'parent') {
                        let id = `${currentUuid}-${type === 'visit' ? 'root' : type}`;
                        
                        if (!activeTextElements[id]) {
                            activeTextElements[id] = positionsIdx;
                        }
                        steps[positionsIdx].log = `Mark ${type === 'visit' ? 'root' : type}.`
                    }

                    currentUuid = uuid;
                    positionsIdx++;
                }

                // For every text element, fill in steps array with state depending on when they become active.
                for (let { id } of textAnimationElements) {
                    let activeIdx = activeTextElements[id];

                    for (let idx = 0; idx < activeIdx; idx++) {
                        steps[idx][id] = {
                            state: {
                                fill: 'black'
                            },
                            config: {
                                duration: 0
                            }
                        };
                    }

                    for (let idx = activeIdx; idx < steps.length; idx++) {
                        steps[idx][id] = {
                            state: {
                                fill: 'red'
                            },
                            config: {
                                duration: 0
                            }
                        }
                    }
                }
            }
            steps[0].log = 'Beginning traversal';
            return steps;
        };
        animationElementGeneratorRef.current = (algorithmRes) => {
            let nonDataStructureArr = [{
                id: 'traversal-ring',
                component: TraversalAnimationElement,
            }];

            if (traversalType !== 'Level-order') {
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

                d3StructureRef.current.descendants().filter((node) => node.data.name !== null).forEach((node) => {
                    const toTextNode = (text, idx) => ({
                        id: `${node.data.uuid}-${text}`,
                        component: Text,
                        componentProps: {
                            value: `${text[0].toUpperCase()}${text.slice(1)}`,
                            x: idx === 0 ? node.x - 50 : (idx === 1 ? node.x : node.x + 50),
                            y: node.y - 30
                        }
                    });
    
                    nonDataStructureArr = nonDataStructureArr.concat(textContent.map((val, idx) => toTextNode(val, idx)));
                });
            }
            
            return {
                nonDataStructure: nonDataStructureArr
            };
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
            <ControlSection rootClass="mt-3" triggersAnimatingMode />
        </>
    )
}

TraversalSection.propTypes = {
    sectionCollapsed: PropTypes.bool // Whether the section is collapsed or not
};

export default TraversalSection;