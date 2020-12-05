import { useEffect } from 'react';
import { generateD3Tree } from '../../../../functions/tree';

function BinarysearchTreeVisualization({ rootNode, width, height }) {
    useEffect(() => {
        if (rootNode) {
            generateD3Tree(rootNode, width, height);
        }
    }, [rootNode]);

    return (
            rootNode ? (
                <>
                    <div id="tree">
                    </div>
                    <div className="absolute inset-0 border border-gray-400 rounded-lg pointer-events-none" aria-hidden="true" />
                </>
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