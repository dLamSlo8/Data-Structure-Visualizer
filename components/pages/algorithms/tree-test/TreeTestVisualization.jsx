import { useContext, useRef } from 'react';

import D3Context from '@contexts/D3Context';

import VisualizationLayout from '@components/layouts/VisualizationLayout';
import Tree from '@components/data-structures/tree/Tree';

export default function TreeTestVisualization({ tree }) {
    const { visualizationRef } = useContext(D3Context);

    /**
     * Expects an array of nodes. Use tree method for getting mapping of uuid to node, then call Object.values on it.
     */
    const nodeArray = tree ? Object.values(tree) : [];
    
    return (
        <VisualizationLayout>
        <div id="tree"> 
            <svg cursor="grab" width={visualizationRef.current.offsetWidth} height={visualizationRef.current.offsetHeight}>
                <g transform="translate(0, 60)">
                    <Tree nodes={nodeArray} />
                </g>
            </svg>
        </div>
    </VisualizationLayout>
    )
}