import {useState} from "react";


import DSAPageLayout from '@components/layouts/DSAPageLayout';
import BinarySearchTreeActions from '@components/pages/data-structures/binary-search-tree/actions/BinarySearchTreeActions'
import TreeTraversalVisualization from '@components/pages/algorithms/tree-traversal/visualization/TreeTraversalVisualization';

export default function BinarySearchTree() {
    const [tree, setTree] = useState(null);

    return (
        <DSAPageLayout
            actions={
                <BinarySearchTreeActions
                tree={tree}
                setTree={setTree}/>
            }
            visualization={({ width, height }) => (
                <TreeTraversalVisualization 
                tree={tree} 
                activeUuid="activeNode?.uuid"
                width={width} 
                height={height} 
                setActiveNode={NullTreeNode} />)}
            visualizationDescription="Select a node to edit its current, left, and right values on the “Actions” tab. 
            The selected node is highlighted blue."
        />
    )
}