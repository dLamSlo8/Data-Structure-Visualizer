import PropTypes from 'prop-types';

import BinaryTree from '@classes/binary-tree';
import TreeNode from '@classes/tree-node';

import InitSection from './InitSection';
import ManageSection from './ManageSection';
import TraversalSection from './TraversalSection';
import ActionSubsection from '@components/ActionSubsection';

// Responsibility: Render and handle actions for custom binary tree.
function TreeTraversalActions({ tree, activeNode, setTree, setActiveNode }) {
    /**
     * Initialize tree and update active node
     * @param {number} value Value to initialize tree with
     */
    const handleInit = (value) => {
        let tree = new BinaryTree(new TreeNode(parseInt(value)));

        setTree(tree);
        setActiveNode({
            uuid: tree.root.uuid,
            current: tree.root.name,
            left: null,
            right: null
        });
    }

    /**
     * Update current node's value
     * @param {number} value Value to update the current node to
     */
    const handleUpdateValue = (value) => {
        tree.replaceNodeValue(parseInt(value), activeNode.uuid);
        setTree(new BinaryTree(null, tree)); // Makes a copy of current tree (look at BinaryTree constructor for more info)
    }

    /**
     * Generates a function to add child node based on left or right child
     * @param {bool} isLeft Whether the node we are adding is the left child
     */
    const generateHandleAddChildren = ({ isLeft }) => {
        return (value) => {
            let childValue = parseInt(value);
            
            tree.addNode(childValue, isLeft, activeNode.uuid)
            setTree(new BinaryTree(null, tree)); 
            setActiveNode((activeNode) => ({ ...activeNode, ...(isLeft ? { left: childValue } : { right: childValue })}));
        }
    }

    /**
     * Deletes tree node and updates state (i.e. reset active node and tree)
     */
    const handleDeleteNode = () => {
        tree.deleteSubtree(activeNode.uuid);

        setActiveNode(null);
        if (tree.root === null) {
            setTree(null);
        }
        else {
            setTree(new BinaryTree(null, tree));
        }
    }


    return (
        <>
            <ActionSubsection 
            sectionTitle="Manage Tree"
            sectionDescription="Here you can create, update, and delete tree nodes.">
                {
                    tree ? (
                        <ManageSection
                        activeNode={activeNode}
                        handleUpdateValue={handleUpdateValue}
                        handleAddLeft={generateHandleAddChildren({ isLeft: true })}
                        handleAddRight={generateHandleAddChildren({ isLeft: false })}
                        handleDeleteNode={handleDeleteNode} />
                    ) : (
                        <InitSection handleInit={handleInit} />
                    )
                }
            </ActionSubsection>
            <ActionSubsection
            sectionTitle="Simulate Traversals"
            sectionDescription="Here you can select a traversal to run and use the following controls to step through the animation."
            propagateCollapsed>
                {
                    ({ collapsed }) => (
                        tree ? (
                            <TraversalSection tree={tree} sectionCollapsed={collapsed} />
                        ) : (
                            <div className="mt-8">
                                <h4 className="font-semibold text-xl text-primary">No Tree Found!</h4>
                                <p className="font-semibold text-gray-500">Tree must be non-empty in order to simulate traversals.</p>
                            </div>
                        )
                    )
                }
            </ActionSubsection>
        </>
    )
}

TreeTraversalActions.propTypes = {
    tree: PropTypes.instanceOf(BinaryTree),
    activeNode: PropTypes.exact({
        uuid: PropTypes.string,
        current: PropTypes.number.isRequired,
        left: PropTypes.number,
        right: PropTypes.number
    }),
    setActiveNode: PropTypes.func.isRequired
};

export default TreeTraversalActions;