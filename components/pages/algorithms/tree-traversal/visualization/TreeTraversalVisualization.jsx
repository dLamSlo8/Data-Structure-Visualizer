import { useEffect, useContext, useRef } from 'react';

import useAnimationControl from '@hooks/useAnimationControl';
import AnimationContext from '@contexts/AnimationContext';
import { generateD3Tree, drawD3Tree, styleActiveNode, setClickHandlers, removeClickHandlers, preOrderTraversalD3 } from '@functions/tree';

import VisualizationLayout from '@components/layouts/VisualizationLayout';
import TreeTraversalAnimationElement from './TreeTraversalAnimationElement';

export default function TreeTraversalVisualization({ rootNode, activeUuid, width, height, setActiveNode, drewTree, setDrewTree }) {
    const { isAnimatingMode, animationState, updateStepsRef } = useContext(AnimationContext);
    const animationElementRef = useRef(null);
    const { animationProps } = useAnimationControl({
        initialProps: { xy: [50, 50] },
    }); // TO-DO: Maintain initialProps through a ref that will change based on pan and zoom of canvas! There's currently a bug where when we pan and zoom, then reset the animation, it will always be at [50, 50]!


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
            drawD3Tree(width, height, animationElementRef);
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
            if (!updateStepsRef.current) {
                updateStepsRef.current = true;
            }
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
                removeClickHandlers();
            }
            else {
                setClickHandlers(handleActiveNodeChange);
            }
        }
    }, [isAnimatingMode]);



    return (
        rootNode ? (
            <VisualizationLayout>
                <div id="tree">
                </div>
                {
                    animationState ? (
                        <TreeTraversalAnimationElement animationProps={animationProps} transform={animationElementRef.current} />
                    ) : null
                }
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

