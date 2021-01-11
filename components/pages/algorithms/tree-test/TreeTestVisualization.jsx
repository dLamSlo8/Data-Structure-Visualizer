import { useContext, useState } from 'react';

import D3Context from '@contexts/D3Context';

import TreeNode from '@classes/tree-node';

import Button from '@components/Button';
import VisualizationLayout from '@components/layouts/VisualizationLayout';
import Tree from '@components/data-structures/tree/Tree';
import TestTreeNode from '@components/data-structures/tree/TestTreeNode';

export default function TreeTestVisualization({ root }) {
    console.log(root);
    const { visualizationRef } = useContext(D3Context);
    const [rootNode, setRootNode] = useState(null);

    /**
     * CREATE TREE HERE
     */
    const drawTree = () => {
        let root = new TreeNode(20, 100, 100);

        setRootNode(root);
    }   

    return (
        <>
            <Button btnStyle="primary" onClick={() => drawTree()} rootClass="mt-2 ml-2">Draw Tree</Button>
            <VisualizationLayout>
                <div id="tree" className="border  border-red-600"> 
                    <svg cursor="grab" width={visualizationRef.current.offsetWidth} height={visualizationRef.current.offsetHeight}>
                        <g transform="translate(0, 60)">
                            <TestTreeNode node={rootNode} />
                        </g>
                    </svg>
                </div>
            </VisualizationLayout>
        </>
    )
}