import { useEffect } from 'react';

import { drawD3Tree, generateD3Tree } from '../../../../functions/tree';

import VisualizationLayout from '../../../VisualizationLayout';

function BinarysearchTreeVisualization({ rootNode, d3Tree, setD3Tree, width, height }) {
    useEffect(() => {
        if (rootNode) {
            setD3Tree(generateD3Tree(rootNode, width, height));
        }
    }, [rootNode]);

    useEffect(() => {
        if (d3Tree) {
            drawD3Tree(d3Tree, width, height);
        }   
    }, [d3Tree]);

    return (
            rootNode ? (
                <VisualizationLayout>
                    <div id="tree">
                    </div>
                </VisualizationLayout>
            ) : (
                <div className="h-full flex flex-col justify-center items-center px-20">
                    <div>
                        <h3 className="font-bold text-3xl mb-3">Your tree is empty.</h3>
                        <p className="font-semibold text-lg leading-6 text-gray-500">Enter the binarysearch input in the 'Actions' tab to visualize the tree.</p>
                    </div>
                </div>
            )
    )
}

export default BinarysearchTreeVisualization;