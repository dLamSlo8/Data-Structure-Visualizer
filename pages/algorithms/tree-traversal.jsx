import { useState } from 'react';

import DataStructureLayout from '@components/layouts/DataStructureLayout';
import TreeTraversalActions from '@components/pages/algorithms/tree-traversal/actions/TreeTraversalActions'
import TreeTraversalVisualization from '@components/pages/algorithms/tree-traversal/visualization/TreeTraversalVisualization';

// Responsibility: Render the actions and visualization component, allowing for communication through coupled state.
// Does not interfere with logic. Lets actions and visualization do the work.
export default function TreeTraversal() {
    const [rootNode, setRootNode] = useState(null);
    const [activeNode, setActiveNode] = useState(null);

    
    return (
        <DataStructureLayout
        actions={
            <TreeTraversalActions 
            rootNode={rootNode} 
            activeNode={activeNode} 
            setRootNode={setRootNode} 
            setActiveNode={setActiveNode} />
        }
        visualization={({ width, height }) => (
            <TreeTraversalVisualization 
            rootNode={rootNode} 
            activeUuid={activeNode?.uuid} 
            width={width} 
            height={height} 
            setActiveNode={setActiveNode} />)}
            visualizationDescription="Select a node to edit its current, left, and right values on the “Actions” tab. 
            The selected node is highlighted blue." />
    )
}