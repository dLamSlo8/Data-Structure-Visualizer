import { useState } from 'react';


import DataStructureLayout from '../../layouts/DataStructureLayout';
import BinaryTreeActionLayout from './actions/BinaryTreeActionLayout';
import CustomBinaryTreeActions from './actions/CustomBinaryTreeActions';
import CustomBinaryTreeVisualization from './visualization/CustomBinaryTreeVisualization';

// Responsibility: Render the actions and visualization component, allowing for communication through coupled state.
// Does not interfere with logic. Lets actions and visualization do the work.
export default function CustomBinaryTreeMode({ mode, setMode }) {
    const [rootNode, setRootNode] = useState(null);
    const [activeNode, setActiveNode] = useState(null);

    return (
        <DataStructureLayout
        propagateDimensions
        actions={
            <BinaryTreeActionLayout mode={mode} setMode={setMode}>
                <CustomBinaryTreeActions rootNode={rootNode} activeNode={activeNode} setRootNode={setRootNode} setActiveNode={setActiveNode} />
            </BinaryTreeActionLayout>
        }
        visualization={({ width, height}) => (
            <CustomBinaryTreeVisualization 
            rootNode={rootNode} 
            activeUuid={activeNode?.uuid} 
            width={width} 
            height={height} 
            setActiveNode={setActiveNode} />)}
        visualizationDescription="Select a node to edit its current, left, and right values on the “Actions” tab. 
        The selected node is highlighted blue. ">
        </DataStructureLayout>
    )
}