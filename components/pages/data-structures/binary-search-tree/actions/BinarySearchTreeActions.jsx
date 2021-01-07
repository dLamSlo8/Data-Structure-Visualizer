import { useContext } from 'react';
import PropTypes from 'prop-types';

import AnimationContext from '@contexts/AnimationContext';
import ActionSubsection from '@components/ActionSubsection';

// reuse initsection from tree traversal
import InitSection from '@components/pages/algorithms/tree-traversal/actions/InitSection';
import ManageSection from './ManageSection';
import TraversalAnimationElement from '@components/animations/elements/TraversalAnimationElement';

import BinarySearchTree from '@classes/binary-search-tree';
import TreeNode from '@classes/tree-node';
import D3Context from '@contexts/D3Context';
import { mapTraversalToPosition } from '@d3/binary-search-tree';
import { axisRight } from 'd3';

/**
 * @param {BinarySearchTree} - Binary Search Tree
 * @param {function} - function to set state of tree
 */
function BinarySearchTreeActions({tree, setTree}){
    const { d3StructureRef } = useContext(D3Context);
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
            animationElementGeneratorRef.current = (algorithmRes) => {
                let resArr = [{
                    id: 'traversal-ring',
                    component: TraversalAnimationElement,
                }];
    
                return resArr;
            };


            animationStepGeneratorRef.current = ({ type, moves }, elements) => {
                // exclude last element if error because last element is error message
                if (isError) {
                    moves[0].pop();
                }
                let steps = mapTraversalToPosition(moves[0], d3StructureRef.current, 'traversal-ring');
                let filteredMoves = moves[0].filter(({ uuid }, idx, arr) => idx === 0 ||  uuid !== arr[idx - 1].uuid);
                console.log(filteredMoves);
                steps[0].log = `Looking for node ${value}.`;
    
                for (let idx = 1; idx < filteredMoves.length; idx++) {
                    let move = filteredMoves[idx];
                    console.log(move);
    
                    steps[idx].log = `Moving ${move.type} to node.`;
                }
                steps[steps.length] = { ...steps[steps.length - 1], log: `Finding inorder successor for node ${value}.` };
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
        // animationElementGeneratorRef.current = (algorithmRes) => {

        // };
        // animationStepGeneratorRef.current = (algorithmRes, elements) => {
        //     console.log(d3StructureRef.current);
        // }
        setTree(new BinarySearchTree(null, tree));

        //animation
        // if (!animationsOff) {
        //     algorithmStepsRef.current = moves; 
        //     animationElementGeneratorRef.current = (algorithmRes) => {
        //         let resArr = [{
        //             id: 'traversal-ring',
        //             component: TraversalAnimationElement,
        //         }];
    
        //         return resArr;
        //     };
        //     animationStepGeneratorRef.current = ( moves , elements) => {
        //         console.log(elements);
        //         let steps = mapTraversalToPosition(moves, d3StructureRef.current, 'traversal-ring');
        //         let filteredMoves = moves.filter(({ uuid }, idx, arr) => idx === 0 ||  uuid !== arr[idx - 1].uuid);
        //         console.log(filteredMoves);
        //         steps[0].log = `Looking for node ${value}.`;
    
        //         // for (let idx = 1; idx < filteredMoves.length; idx++) {
        //         //     let move = filteredMoves[idx];
    
        //         //     steps[idx].log = `Moving ${move.type} to node.`;
        //         // }
        //         // steps[steps.length] = { ...steps[steps.length - 1], log: `Finding inorder successor for node ${value}.` };
        //         console.log(steps);
        //         return steps;
        //     }
        //     handleTreeUpdate();
        // }
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
            animationStepGeneratorRef.current = ( moves , elements) => {
                let steps = mapTraversalToPosition(moves, d3StructureRef.current, 'traversal-ring');

                steps[0].log = `Looking for node ${value}.`;
                
                let uuidMap = {};
                for (let i = 0; i < d3StructureRef.current.descendants().length; i++) {
                    uuidMap[d3StructureRef.current.descendants()[i].data.uuid] = d3StructureRef.current.descendants()[i].data.name;
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