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

/**
 * @param {BinarySearchTree} - Binary Search Tree
 * @param {function} - function to set state of tree
 */
function BinarySearchTreeActions({tree, setTree}){
    const { d3StructureRef } = useContext(D3Context);
    const { setAnimatingMode, updateStepsRef, algorithmStepsRef, animationStepGeneratorRef, animationElementGeneratorRef } = useContext(AnimationContext);

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
    const handleDelete = (value) => {
        value = parseInt(value);

        algorithmStepsRef.current = tree.deleteNode(value);
        animationElementGeneratorRef.current = (algorithmRes) => {
            let resArr = [{
                id: 'traversal-ring',
                component: TraversalAnimationElement,
            }];
        };
        animationStepGeneratorRef.current = (algorithmRes, elements) => {
            console.log(d3StructureRef.current);
        }
        console.log(tree)
        let newTree = new BinarySearchTree(null, tree)
        console.log(algorithmStepsRef.current);
        setTree(newTree);
        handleTreeUpdate();
    }

    /**
     * Inserts a new node into the tree. Makes copy of tree and sets tree to 
     * new copy.
     * @param {int} value - The value of the TreeNode to delete 
     * @return {Array} - an Array of uuid of nodes taken to get to specified TreeNode
     */
    const handleInsert = (value) => {
        value = parseInt(value);
        algorithmStepsRef.current = tree.insertNode(value);
        // animationElementGeneratorRef.current = (algorithmRes) => {

        // };
        // animationStepGeneratorRef.current = (algorithmRes, elements) => {
        //     console.log(d3StructureRef.current);
        // }
        setTree(new BinarySearchTree(null, tree));
        // handleTreeUpdate();
    }

    /**
     * Finds the first instance of a TreeNode with a specified value
     * @param {int} value - The value of the TreeNode to find 
     * @return {Array} - an Array of uuid of nodes taken to get to specified TreeNode
     */
    const handleFind = (value) => {
        value = parseInt(value);
        let moves = tree.findNode(value);
        // the find input in form only deletes when state changes
        //setTree(new BinarySearchTree(null, tree));
        return moves;
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
                            handleDelete={handleDelete} />
                        
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