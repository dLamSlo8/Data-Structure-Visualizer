import { useState, useEffect } from 'react';

import { resetD3Tree } from '@functions/algorithms/d3/tree';

import DataStructureLayout from '@components/layouts/DataStructureLayout';
import TreeTraversalActions from '@components/pages/algorithms/tree-traversal/actions/TreeTraversalActions'
import TreeTraversalVisualization from '@components/pages/algorithms/tree-traversal/visualization/TreeTraversalVisualization';

// Responsibility: Render the actions and visualization component, allowing for communication through coupled state.
// Does not interfere with logic. Lets actions and visualization do the work.
export default function TreeTraversal() {
    const [rootNode, setRootNode] = useState(null);
    const [drewTree, setDrewTree] = useState(false);
    const [activeNode, setActiveNode] = useState(null);
    
    useEffect(() => {
        return () => {
            resetD3Tree();
        }
    }, []);
    
    return (
        <DataStructureLayout
        propagateDimensions
        actions={
            <TreeTraversalActions 
            rootNode={rootNode} 
            activeNode={activeNode} 
            setRootNode={setRootNode} 
            setActiveNode={setActiveNode} 
            drewTree={drewTree}
            setDrewTree={setDrewTree} />
        }
        visualization={({ width, height }) => (
            <TreeTraversalVisualization 
            rootNode={rootNode} 
            activeUuid={activeNode?.uuid} 
            width={width} 
            height={height} 
            setActiveNode={setActiveNode}
            drewTree={drewTree}
            setDrewTree={setDrewTree} />)}
            visualizationDescription="Select a node to edit its current, left, and right values on the “Actions” tab. 
            The selected node is highlighted blue." />
    )
}