import { useEffect, useContext } from 'react';

import AnimationContext from '@contexts/AnimationContext';
import { initD3Tree, generateD3Tree, drawD3Tree, styleActiveNode, setClickHandlers, removeClickHandlers } from '@functions/tree';

import VisualizationLayout from '@components/layouts/VisualizationLayout';

export default function TreeTraversalVisualization({ rootNode, activeUuid, width, height, setActiveNode, setDrewTree }) {
    const { isAnimatingMode } = useContext(AnimationContext);

    const handleActiveNodeChange = (node) => {
        setActiveNode(node);
    }
    
    /**
     * Effect 
     * Draws the tree with d3 and applies appropriate click handlers, 
     * and handles the initial node case
     */
    useEffect(() => {
        if (rootNode) {
            generateD3Tree(rootNode, width, height);
            drawD3Tree(width, height);
            setClickHandlers(handleActiveNodeChange);

            if (rootNode.left === null && rootNode.right === null) {
                styleActiveNode(rootNode.uuid);
                setActiveNode({
                    uuid: rootNode.uuid,
                    current: rootNode.value,
                    left: '',
                    right: ''
                });
            }
            setDrewTree(true);
        }
    }, [rootNode]);

    /**
     * Effect
     * Styles the currently active node.
     * 
     * Dependency Reasoning
     * rootNode - When the tree re-renders, active node is redrawn so it doesn't get overriden by re-render
     */
    useEffect(() => {
        if (activeUuid) { 
            styleActiveNode(activeUuid);
        }
    }, [rootNode, activeUuid]);

    /**
     * Effect
     * Removes click handlers when in animating mode
     */
    useEffect(() => {
        if (isAnimatingMode !== null) {
            if (isAnimatingMode) {
                console.log('animating, so removing click handlers');
                removeClickHandlers();
            }
            else {
                console.log('no longer animating, so add click handlers');
                setClickHandlers(handleActiveNodeChange);
            }
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

