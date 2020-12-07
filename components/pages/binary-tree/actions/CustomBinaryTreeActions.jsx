import { Node, addNode, replaceNodeValue, deleteSubtree } from '../../../../functions/tree';

import CustomBinaryTreeInitForm from './CustomBinaryTreeInitForm';
import CustomBinaryTreeManageForm from './CustomBinaryTreeManageForm';
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
        </>
    )
}