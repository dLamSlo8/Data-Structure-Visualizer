import { useState } from "react";


import DSAPageLayout from '@components/layouts/DSAPageLayout';
import BinarySearchTreeActions from '@components/pages/data-structures/binary-search-tree/actions/BinarySearchTreeActions';
import BinarySearchTreeVisualization from '@components/pages/data-structures/binary-search-tree/visualization/BinarySearchTreeVisualization';
import TreeTraversalVisualization from '@components/pages/algorithms/tree-traversal/visualization/TreeTraversalVisualization';

import BST from '@classes/binary-search-tree';

export default function BinarySearchTree() {
    const [tree, setTree] = useState(new BST());

    return (
        <DSAPageLayout
            actions={
                <BinarySearchTreeActions
                tree={tree}
                setTree={setTree}/>
            }
            visualization={({ width, height }) => (
                <BinarySearchTreeVisualization 
                tree={tree} 
                width={width} 
                height={height} />
            )}
            visualizationDescription="Initialize a tree in the “Actions” tab and then perform operations
            such as insert, find, delete."
        />
    )
}