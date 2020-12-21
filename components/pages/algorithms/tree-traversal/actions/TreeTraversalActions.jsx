import PropTypes from 'prop-types';

import { Node, addNode, replaceNodeValue, deleteSubtree } from '@functions/algorithms/helper/tree';

import InitSection from './InitSection';
import ManageSection from './ManageSection';
import TraversalSection from './TraversalSection';
import ActionSubsection from '@components/ActionSubsection';

// Responsibility: Render and handle actions for custom binary tree.
function TreeTraversalActions({ rootNode, activeNode, setRootNode, setActiveNode }) {
    console.log(activeNode);
    const handleInit = (value) => {
        let root = new Node(parseInt(value));

        setRootNode(root);
    }

    const handleUpdateValue = (value) => {
        setRootNode(replaceNodeValue(rootNode, parseInt(value), activeNode.uuid));
    }

    const generateHandleAddChildren = ({ isLeft }) => {
        return (value) => {
            let childValue = parseInt(value);
        
            setRootNode(addNode(rootNode, childValue, isLeft, activeNode.uuid));
            setActiveNode((activeNode) => ({ ...activeNode, ...(isLeft ? { left: childValue } : { right: childValue })}));
        }
    }

    const handleDeleteNode = () => {
        let rootCopy = new Node(0, 0, rootNode);

        setActiveNode(null);
        setRootNode(deleteSubtree(rootCopy, activeNode.uuid));
    }


    return (
        <>
            <ActionSubsection 
            sectionTitle="Manage Tree"
            sectionDescription="Here you can create, update, and delete tree nodes.">
                {
                    rootNode ? (
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
            sectionDescription="Here you can select a traversal to run and use the following controls to step through the animation.">
                {
                    rootNode ? (
                        <TraversalSection rootNode={rootNode} />
                    ) : (
                        <div className="mt-8">
                            <h4 className="font-semibold text-xl text-primary">No Tree Found!</h4>
                            <p className="font-semibold text-gray-500">Tree must be non-empty in order to simulate traversals.</p>
                        </div>
                    )
                }
            </ActionSubsection>
        </>
    )
}

TreeTraversalActions.propTypes = {
    rootNode: PropTypes.instanceOf(Node),
    setRootNode: PropTypes.func.isRequired,
    activeNode: PropTypes.exact({
        uuid: PropTypes.string.isRequired,
        current: PropTypes.number.isRequired,
        left: PropTypes.number,
        right: PropTypes.number
    }),
    setActiveNode: PropTypes.func.isRequired
};

export default TreeTraversalActions;