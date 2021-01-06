import { useState } from 'react';

import { D3ContextProvider } from '@contexts/D3Context';
import { AnimationContextProvider } from '@contexts/AnimationContext';

import DSAPageLayout from '@components/layouts/DSAPageLayout';
import TreeTraversalActions from '@components/pages/algorithms/tree-traversal/actions/TreeTraversalActions'
import TreeTraversalVisualization from '@components/pages/algorithms/tree-traversal/visualization/TreeTraversalVisualization';

import { generateD3Tree } from '@d3/tree';

// Responsibility: Render the actions and visualization component, allowing for communication through coupled state.
// Does not interfere with logic. Lets actions and visualization do the work.
export default function TreeTraversal() {
    const [tree, setTree] = useState(null);
    const [activeNode, setActiveNode] = useState(null);

    return (
        <D3ContextProvider structureUpdater={generateD3Tree}>
            <AnimationContextProvider>
                <DSAPageLayout
                actions={
                    <TreeTraversalActions 
                    tree={tree} 
                    activeNode={activeNode} 
                    setTree={setTree} 
                    setActiveNode={setActiveNode} />
                }
                visualization={
                    <TreeTraversalVisualization 
                    tree={tree} 
                    activeUuid={activeNode?.uuid} 
                    setActiveNode={setActiveNode} />}
                visualizationDescription="Select a node to edit its current, left, and right values on the “Actions” tab. 
                The selected node is highlighted blue." />
            </AnimationContextProvider>
        </D3ContextProvider>
    )
}