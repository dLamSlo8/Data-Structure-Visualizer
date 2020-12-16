import { useEffect, useContext } from 'react';

import AnimationContext from '../../../../contexts/AnimationContext';
import { initD3Tree, generateD3Tree, drawD3Tree, styleActiveNode, setClickHandlers, removeClickHandlers } from '../../../../functions/tree';

import VisualizationLayout from '../../../layouts/VisualizationLayout';

function CustomBinaryTreeVisualization({ rootNode, activeUuid, width, height, d3Tree, setD3Tree, setActiveNode }) {
    const { isAnimatingMode } = useContext(AnimationContext);

    const handleActiveNodeChange = (node) => {
        setActiveNode(node);
    }
    
    useEffect(() => {
        if (rootNode) {
            generateD3Tree(rootNode, width, height);
            drawD3Tree(width, height);
            setClickHandlers(handleActiveNodeChange);

            if (rootNode.left === null && rootNode.right === null) {
                styleActiveNode(rootNode.uuid);
            }
        }
    }, [rootNode]);

    useEffect(() => {
        if (activeUuid) { 
            styleActiveNode(activeUuid);
        }
    }, [rootNode, activeUuid]);

    useEffect(() => {
        if (isAnimatingMode) {
            console.log('is animation mode!');
            removeClickHandlers();
        }
    }, [isAnimatingMode]);

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