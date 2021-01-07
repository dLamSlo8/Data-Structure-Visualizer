import { useState } from "react";

import { D3ContextProvider } from '@contexts/D3Context';
import { AnimationContextProvider } from '@contexts/AnimationContext';

import DSAPageLayout from '@components/layouts/DSAPageLayout';
import HeapActions from '@components/pages/data-structures/heap/actions/HeapActions';
import HeapVisualization from '@components/pages/data-structures/heap/visualization/HeapVisualization';

import BinaryHeap from '@classes/heap'
import { generateD3Tree } from "@d3/tree";


export default function Heap() {
    const [heap, setHeap] = useState(new BinaryHeap(null));

    return (
        <D3ContextProvider structureUpdater={generateD3Tree}>
            <AnimationContextProvider>
                <DSAPageLayout 
                    actions={
                        <HeapActions
                        heap={heap}
                        setHeap={setHeap}/>
                    }
                    visualization={
                        <HeapVisualization 
                        heap={heap} />
                    }
                    visualizationDescription="Initialize a heap in the “Actions” tab and then perform operations
                    such as insert, delete."
                />
            </AnimationContextProvider>
        </D3ContextProvider>
    )
}