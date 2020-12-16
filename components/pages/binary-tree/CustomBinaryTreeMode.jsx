import { useState, useEffect } from 'react';

import { resetD3Tree } from '../../../functions/tree';

import DataStructureLayout from '../../layouts/DataStructureLayout';
import BinaryTreeActionLayout from './actions/BinaryTreeActionLayout';
import CustomBinaryTreeActions from './actions/CustomBinaryTreeActions';
import CustomBinaryTreeVisualization from './visualization/CustomBinaryTreeVisualization';

// Responsibility: Render the actions and visualization component, allowing for communication through coupled state.
// Does not interfere with logic. Lets actions and visualization do the work.
export default function CustomBinaryTreeMode({ mode, setMode }) {
    const [rootNode, setRootNode] = useState(null);
    const [activeNode, setActiveNode] = useState(null);
    const [d3Tree, setD3Tree] = useState(null);

    useEffect(() => {

        return () => {
            console.log('leaving custom binary tree mode. resetting tree');
            resetD3Tree();
        }
    }, []);
    
    return (
        <DataStructureLayout
        propagateDimensions
        actions={
            <BinaryTreeActionLayout mode={mode} setMode={setMode}>
                <CustomBinaryTreeActions rootNode={rootNode} activeNode={activeNode} setRootNode={setRootNode} setActiveNode={setActiveNode} d3Tree={d3Tree} />
            </BinaryTreeActionLayout>
        }
        visualization={({ width, height}) => (
            <CustomBinaryTreeVisualization 
            rootNode={rootNode} 
            activeUuid={activeNode?.uuid} 
            width={width} 
            height={height} 
            d3Tree={d3Tree}
            setD3Tree={setD3Tree}
            setActiveNode={setActiveNode} />)}
            visualizationDescription="Select a node to edit its current, left, and right values on the “Actions” tab. 
            The selected node is highlighted blue. ">
        </DataStructureLayout>
    )
}