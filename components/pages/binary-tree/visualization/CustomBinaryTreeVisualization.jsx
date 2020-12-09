import { useEffect } from 'react';

import { generateD3Tree, drawD3Tree, styleActiveNode, setClickHandlers } from '../../../../functions/tree';

import VisualizationLayout from '../../../VisualizationLayout';

function CustomBinaryTreeVisualization({ rootNode, activeUuid, width, height, d3Tree, setD3Tree, setActiveNode }) {
    const handleActiveNodeChange = (node) => {
        setActiveNode(node);
    }
    
    useEffect(() => {
        if (rootNode) {
            setD3Tree(generateD3Tree(rootNode, width, height));
        }
    }, [rootNode]);

    useEffect(() => {
        if (d3Tree) {
            drawD3Tree(d3Tree, width, height);
            setClickHandlers(d3Tree, handleActiveNodeChange);
        }
    }, [d3Tree]);

    useEffect(() => {
        if (d3Tree?.height === 0) { // Will retry style if tree was just initialized. Kind of a hack. Don't know how to handle initial styling.
            styleActiveNode(activeUuid);
            return ;
        }
        if (activeUuid) { 
            styleActiveNode(activeUuid);
        }
    }, [activeUuid, d3Tree]);

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