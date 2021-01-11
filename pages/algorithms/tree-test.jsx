import { useState } from 'react';

import { D3ContextProvider } from '@contexts/D3Context';
import { AnimationContextProvider } from '@contexts/AnimationContext';

import Button from '@components/Button';
import DSAPageLayout from '@components/layouts/DSAPageLayout';
import TreeTestVisualization from '@components/pages/algorithms/tree-test/TreeTestVisualization';


export default function TreeTest() {
    const [tree, setTree] = useState(null);

    /**
     * CREATE TREE HERE
     */
    const drawTree = () => {
        let tree;

        setTree(tree);
    }   
    
    return (
        <D3ContextProvider>
            <AnimationContextProvider>
                <DSAPageLayout 
                actions={
                    <Button btnStyle="primary" onClick={() => drawTree()}>Draw Tree</Button>
                }
                visualization={
                    <TreeTestVisualization tree={tree} />
                }/>
            </AnimationContextProvider>
        </D3ContextProvider>
    )
}