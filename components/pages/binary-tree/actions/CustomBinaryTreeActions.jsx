import { Node, addNode, replaceNodeValue, deleteSubtree } from '../../../../functions/tree';

import CustomBinaryTreeInitForm from './CustomBinaryTreeInitForm';
import CustomBinaryTreeManageForm from './CustomBinaryTreeManageForm';
import CustomBinaryTreeTraversalSection from './custom-binary-tree/traversals/CustomBinaryTreeTraversalSection';
import ActionSubsection from '../../../ActionSubsection';

// Responsibility: Render and handle actions for custom binary tree.
export default function CustomBinaryTreeActions({ rootNode, activeNode, setRootNode, setActiveNode }) {
    const handleInit = (value) => {
        let root = new Node(parseInt(value));

        setRootNode(root);
        setActiveNode({
            uuid: root.uuid,
            current: root.value,
            left: '',
            right: ''
        });
    }

    const handleUpdateValue = (value) => {
        console.log(value);
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
                        <CustomBinaryTreeManageForm 
                        activeNode={activeNode}
                        handleUpdateValue={handleUpdateValue}
                        handleAddLeft={generateHandleAddChildren({ isLeft: true })}
                        handleAddRight={generateHandleAddChildren({ isLeft: false })}
                        handleDeleteNode={handleDeleteNode} />
                    ) : (
                        <CustomBinaryTreeInitForm handleInit={handleInit} />
                    )
                }
            </ActionSubsection>
            <ActionSubsection
            sectionTitle="Simulate Traversals"
            sectionDescription="Here you can select a traversal to run and use the following controls to step through the animation.">
                {
                    rootNode ? (
                        <CustomBinaryTreeTraversalSection />
                    ) : (
                        <div className="mt-8">
                            <h4 className="font-semibold text-xl text-primary">No Tree Found!</h4>
                            <p className="font-semibold text-gray-500">You must have initialized the tree to simulate traversals.</p>
                        </div>
                    )
                }
            </ActionSubsection>
        </>
    )
}