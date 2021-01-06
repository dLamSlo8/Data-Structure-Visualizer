import { useState } from "react";

import { D3ContextProvider } from '@contexts/D3Context';
import { AnimationContextProvider } from '@contexts/AnimationContext';

import DSAPageLayout from '@components/layouts/DSAPageLayout';
import BinarySearchTreeActions from '@components/pages/data-structures/binary-search-tree/actions/BinarySearchTreeActions';
import BinarySearchTreeVisualization from '@components/pages/data-structures/binary-search-tree/visualization/BinarySearchTreeVisualization';

import BST from '@classes/binary-search-tree';
import { generateD3Tree } from "@d3/tree";

export default function BinarySearchTree() {
    const [tree, setTree] = useState(new BST());

    return (
        <D3ContextProvider structureUpdater={generateD3Tree}>
            <AnimationContextProvider>
                <DSAPageLayout
                    actions={
                        <BinarySearchTreeActions
                        tree={tree}
                        setTree={setTree}/>
                    }
                    visualization={
                        <BinarySearchTreeVisualization 
                        tree={tree} />
                    }
                    visualizationDescription="Initialize a tree in the “Actions” tab and then perform operations
                    such as insert, find, delete."
                />
            </AnimationContextProvider>
        </D3ContextProvider>
    )
}