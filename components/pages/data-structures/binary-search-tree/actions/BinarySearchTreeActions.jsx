import PropTypes from 'prop-types';

import ActionSubsection from '@components/ActionSubsection';

// reuse initsection from tree traversal
import InitSection from '@components/pages/algorithms/tree-traversal/actions/InitSection';
import ManageSection from './ManageSection';

import BinarySearchTree from '@classes/binary-search-tree';
import TreeNode from '@classes/tree-node';

/**
 * @param {BinarySearchTree} - Binary Search Tree
 * @param {function} - function to set statea of tree
 */
function BinarySearchTreeActions({tree, setTree}){

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
        // store moves as local var not sure what next
        let moves = tree.deleteNode(value);
        setTree(tree.root !== null ? new BinarySearchTree(null, tree) : null);
        return moves;
    }

    /**
     * Inserts a new node into the tree. Makes copy of tree and sets tree to 
     * new copy.
     * @param {int} value - The value of the TreeNode to delete 
     * @return {Array} - an Array of uuid of nodes taken to get to specified TreeNode
     */
    const handleInsert = (value) => {
        value = parseInt(value);
        let moves = tree.insertNode(value);
        setTree(new BinarySearchTree(null, tree));
        return moves;
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
                        tree ? (
                            <ManageSection
                            tree = {tree}
                            handleInsert={handleInsert}
                            handleFind={handleFind}
                            handleDelete={handleDelete} />
                        ) : (
                            <InitSection handleInit={handleInit} />
                        )
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