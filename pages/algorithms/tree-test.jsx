import { useState } from 'react';

import { D3ContextProvider } from '@contexts/D3Context';
import { AnimationContextProvider } from '@contexts/AnimationContext';

import TreeNode from '@classes/tree-node';

import Button from '@components/Button';
import DSAPageLayout from '@components/layouts/DSAPageLayout';
import TreeTestVisualization from '@components/pages/algorithms/tree-test/TreeTestVisualization';
import BinarySearchTree from 'pages/data-structures/binary-search-tree';


export default function TreeTest() {


    return (
        <D3ContextProvider>
            <AnimationContextProvider>
                <DSAPageLayout 
                actions={
                    null
                }
                visualization={
                    <TreeTestVisualization />
                }/>
            </AnimationContextProvider>
        </D3ContextProvider>
    )
}