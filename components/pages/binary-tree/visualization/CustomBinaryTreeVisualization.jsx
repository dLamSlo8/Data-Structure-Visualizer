import { useEffect } from 'react';

import { generateCustomizableD3Tree } from '../../../../functions/tree';

import VisualizationLayout from '../../../VisualizationLayout';

function CustomBinaryTreeVisualization({ rootNode, activeUuid, width, height, setActiveNode }) {
    const handleActiveNodeChange = (node) => {
        setActiveNode(node);
    }
    
    useEffect(() => {
        if (rootNode) {
            generateCustomizableD3Tree(rootNode, width, height, activeUuid, handleActiveNodeChange);
        }
    }, [rootNode, activeUuid]);

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
                    <p className="font-semibold text-lg leading-6 text-gray-500">Add a root value in the 'Actions' tab to begin.</p>
                </div>
            </div>
        )
    )
}

export default CustomBinaryTreeVisualization;