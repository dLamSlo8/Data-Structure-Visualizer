import { useState } from "react";

import DSAPageLayout from '@components/layouts/DSAPageLayout';
import HeapActions from '@components/pages/data-structures/heap/actions/HeapActions';
import HeapVisualization from '@components/pages/data-structures/heap/visualization/HeapVisualization';

import BinaryHeap from '@classes/heap'


export default function Heap() {
    const [heap, setHeap] = useState(new BinaryHeap(null));

    return (
        <DSAPageLayout 
            actions={
                <HeapActions
                heap={heap}
                setHeap={setHeap}/>
            }
            visualization={({ width, height }) => (
                <HeapVisualization 
                heap={heap} 
                width={width} 
                height={height} />
            )}
            visualizationDescription="Initialize a heap in the “Actions” tab and then perform operations
            such as insert, delete."
        />
    )
}