import { useContext } from 'react';
import PropTypes from 'prop-types';

import AnimationContext from '@contexts/AnimationContext';
import ActionSubsection from '@components/ActionSubsection';

// reuse initsection from tree traversal
import InitSection from '@components/pages/algorithms/tree-traversal/actions/InitSection';
import ManageSection from './ManageSection';
import TraversalAnimationElement from '@components/animations/elements/TraversalAnimationElement';
import AnimatedTreeNode from '@components/animations/elements/AnimatedTreeNode';
import AnimatedNodeMask from '@components/animations/elements/AnimatedNodeMask';

import BinarySearchTree from '@classes/binary-search-tree';
import TreeNode from '@classes/tree-node';
import D3Context from '@contexts/D3Context';
import { mapTraversalToPosition, mapInorderSuccessorTraversalToPosition } from '@d3/binary-search-tree';
import { axisRight } from 'd3';

/**
 * @param {BinarySearchTree} - Binary Search Tree
 * @param {function} - function to set state of tree
 */
function BinarySearchTreeActions({tree, setTree}){
    const { d3StructureRef, updateD3Structure } = useContext(D3Context);
    const { isAnimatingMode, setAnimatingMode, updateStepsRef, algorithmStepsRef, animationStepGeneratorRef, animationElementGeneratorRef } = useContext(AnimationContext);

    const handleTreeUpdate = () => {
        updateStepsRef.current = true;
        setAnimatingMode(true);
    }

    /**
     * Initialize BST
     * @param {number} value Value to initialize tree with
     */
    const handleInit = (value) => {
        let tree = new BinarySearchTree(new TreeNode(parseInt(value)));
        setTree(tree);
    }

    /**
     * Deletes the first instance of a TreeNode with a specified value. Makes
     * copy of tree and sets tree to new copy.
     * @param {int} value - The value of the TreeNode to delete 
     */
    const handleDelete = (value, animationsOff) => {
        value = parseInt(value);

        const res = tree.deleteNode(value);
        const moves = res['moves'];

        let newTree = new BinarySearchTree(null, tree)
        console.log(newTree)
        console.log(algorithmStepsRef.current);
        console.log(moves)

        let isError = false;
        if (moves[0][moves[0].length - 1].error) {
            isError = true;
        }
    

        if (!isError) {
            console.log("running tree")
            setTree(newTree);
        }
        
        if (!animationsOff) {
            algorithmStepsRef.current = res; 
            animationElementGeneratorRef.current = ({ type, moves }) => {
                const nodes = d3StructureRef.current.descendants();

                let resArr = [{
                    id: 'traversal-ring',
                    component: TraversalAnimationElement,
                }];
                const deletedNode = nodes.find((node) => node.data.uuid === moves[0][moves[0].length - 1].uuid);

                resArr.push({
                    id: 'deleted-node-mask',
                    component: AnimatedNodeMask,
                    componentProps: {
                        initPosition: {
                            x: deletedNode.x,
                            y: deletedNode.y
                        }
                    }
                })

                // Add inorder successor node
                if (type === 2) {
                    const inOrderNode = nodes.find((node) => node.data.uuid === moves[1][moves[1].length - 1].uuid);

                    resArr.push({
                        id: 'inorder-successor-node-mask',
                        component: AnimatedNodeMask,
                        componentProps: {
                            initPosition: {
                                x: inOrderNode.x,
                                y: inOrderNode.y
                            }
                        }
                    })
                    resArr.push({
                        id: 'inorder-successor-node',
                        component: AnimatedTreeNode,
                        componentProps: {
                            value: inOrderNode.data.name,
                        }
                    });
                    resArr.push({
                        id: 'deleted-node', 
                        component: AnimatedTreeNode,
                        componentProps: {
                            value: deletedNode.data.name,
                        }
                    });
                }
    
                return resArr;
            };


            animationStepGeneratorRef.current = ({ type, moves }, elements) => {
                let deleteTraversalMoves = moves[0];
                // exclude last element if error because last element is error message
                if (isError) {
                    deleteTraversalMoves.pop();
                }

                // Get steps to deleted node.
                let steps = mapTraversalToPosition(deleteTraversalMoves, d3StructureRef.current, 'traversal-ring');
                const deletedNodePosition = steps[steps.length - 1]['traversal-ring']['state']['xy'];
                
                // Create map of uuid to node name/value.
                let uuidMap = {};
                let treeNodes = d3StructureRef.current.descendants();
                
                for (let idx = 0; idx < treeNodes.length; idx++) {
                    uuidMap[treeNodes[idx].data.uuid] = treeNodes[idx].data.name;
                }

                const deletedNodeValue = uuidMap[deleteTraversalMoves[deleteTraversalMoves.length - 1].uuid];

                steps[0].log = `Looking for node ${value}.`;
                
                // Add step logs for initial traversal to deleted element.
                for (let idx = 1; idx < steps.length; idx++) {
                    let move = deleteTraversalMoves[idx];
    
                    steps[idx].log = `Moving ${move.type} to node.`;
                }

                // If type === 2, add inorder successor traversal steps and handle swap.
                if (type === 2) {
                    const inOrderMoves = moves[1];
                    const inOrderNodeValue = uuidMap[inOrderMoves[inOrderMoves.length - 1].uuid];

                    steps[steps.length] = { ...steps[steps.length - 1], log: `Finding inorder successor for node ${value}.` };

                    let inOrderSteps = mapTraversalToPosition(moves[1], d3StructureRef.current, 'traversal-ring');
                    console.log(inOrderSteps);
                    console.log(inOrderSteps[inOrderSteps.length - 1])
                    const inOrderNodePosition = inOrderSteps[inOrderSteps.length - 1]['traversal-ring']['state']['xy'];
                    console.log(inOrderNodePosition);
                    let stepIdx = steps.length;

                    steps = steps.concat(inOrderSteps); // Add inorder successor traversal steps to original traversal steps.
                    steps[stepIdx++].log = `Moving right to node ${uuidMap[inOrderMoves[0].uuid]}.`; // Add 

                    for (let idx = 1; idx < inOrderSteps.length; idx++) {
                        steps[stepIdx].log = `Moving left to node ${uuidMap[inOrderMoves[idx].uuid]}`;
                    }

                    // Handle swapping once we reach the end of traversal
                    for (let idx = 0; idx < steps.length; idx++) {
                        steps[idx]['deleted-node'] = {
                            state: {
                                animatedPosition: deletedNodePosition
                            }
                        };

                        steps[idx]['inorder-successor-node'] = {
                            state: {
                                animatedPosition: inOrderNodePosition
                            }
                        };
                    }

                    steps[steps.length] = { 
                        ...steps[steps.length - 1], 
                        'deleted-node': {
                            state: {
                                animatedPosition: inOrderNodePosition
                            }
                        },
                        'inorder-successor-node': {
                            state: {
                                animatedPosition: deletedNodePosition
                            }
                        },
                        log: `Found inorder successor node ${inOrderNodeValue}. Swapping node ${deletedNodeValue} with node ${inOrderNodeValue}.`
                    };


                }

                console.log(steps);
                return steps;
            }
            handleTreeUpdate();
        }
    }

    /**
     * Inserts a new node into the tree. Makes copy of tree and sets tree to 
     * new copy.
     * @param {int} value - The value of the TreeNode to delete 
     * @param {boolean} animationsOff - Whether or not we should run animations
     * @return {Array} - an Array of uuid of nodes taken to get to specified TreeNode
     */
    const handleInsert = (value, animationsOff) => {
        value = parseInt(value);
        const moves = tree.insertNode(value);
        updateD3Structure(tree.root);

        //animation
        if (!animationsOff) {
            algorithmStepsRef.current = moves; 
            animationElementGeneratorRef.current = (algorithmRes) => {
                let resArr = [{
                    id: 'traversal-ring',
                    component: TraversalAnimationElement,
                }];
    
                return resArr;
            };
            animationStepGeneratorRef.current = (moves , elements) => {
                let steps = mapTraversalToPosition(moves, d3StructureRef.current, 'traversal-ring');

                steps[0].log = `Looking for space to insert node ${value}.`;
                
                let uuidMap = {};
                let treeNodes = d3StructureRef.current.descendants();
                
                for (let idx = 0; idx < treeNodes.length; idx++) {
                    uuidMap[treeNodes[idx].data.uuid] = treeNodes[idx].data.name;
                }

                for (let idx = 1; idx < moves.length; idx++) {
                    let move = moves[idx];
                    // get the value of the previous node
                    let currVal = uuidMap[moves[idx - 1].uuid];
                    // check if condition
                    steps[idx].log = `${value} ${(move.type === "right") ? '>' : '<='} ${currVal}; Moving ${move.type}`;
                    console.log(steps[idx].log)
                }
                // steps[steps.length] = { ...steps[steps.length - 1], log: `Finding inorder successor for node ${value}.` };
                console.log(steps);
                return steps;
            }
            handleTreeUpdate();
        }
    }

    /**
     * Finds the first instance of a TreeNode with a specified value
     * @param {int} value - The value of the TreeNode to find 
     * @param {}
     * @return {Array} - an Array of uuid of nodes taken to get to specified TreeNode
     */
    const handleFind = (value, animationsOff) => {
        value = parseInt(value);
        const moves = tree.findNode(value);

        //animation
        if (!animationsOff) {
            algorithmStepsRef.current = moves; 
            animationElementGeneratorRef.current = (algorithmRes) => {
                let resArr = [{
                    id: 'traversal-ring',
                    component: TraversalAnimationElement,
                }];
    
                return resArr;
            };
            animationStepGeneratorRef.current = (moves , elements) => {
                let steps = mapTraversalToPosition(moves, d3StructureRef.current, 'traversal-ring');

                steps[0].log = `Looking for node ${value}.`;
                
                let uuidMap = {};
                let treeNodes = d3StructureRef.current.descendants();
                
                for (let idx = 0; idx < treeNodes.length; idx++) {
                    uuidMap[treeNodes[idx].data.uuid] = treeNodes[idx].data.name;
                }

                for (let idx = 1; idx < moves.length; idx++) {
                    let move = moves[idx];
                    // get the value of the previous node
                    let currVal = uuidMap[moves[idx - 1].uuid];
                    // check if condition
                    steps[idx].log = `${value} ${(move.type === "right") ? '>' : '<='} ${currVal}; Moving ${move.type}`;
                    console.log(steps[idx].log)
                }
                // steps[steps.length] = { ...steps[steps.length - 1], log: `Finding inorder successor for node ${value}.` };
                console.log(steps);
                return steps;
            }
            handleTreeUpdate();
        }
    }

    return (
        <>
            <ActionSubsection
            sectionTitle="Manage Tree"
            sectionDescription="Here you can create, delete, and find tree nodes of a Binary Search Tree."
            propagateCollapsed>
                {
                    ({ collapsed }) => (
                        
                            <ManageSection
                            tree = {tree}
                            handleInsert={handleInsert}
                            handleFind={handleFind}
                            handleDelete={handleDelete}
                            isAnimatingMode={isAnimatingMode} />
                        
                    )
                }
            </ActionSubsection>
        </>
    )
}

BinarySearchTreeActions.propTypes = {
    tree: PropTypes.instanceOf(BinarySearchTree),
    setTree: PropTypes.func.isRequired
};

export default BinarySearchTreeActions;