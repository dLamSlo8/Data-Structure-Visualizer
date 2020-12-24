import { useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';

import BinaryTree from '@classes/binary-tree';
import useAnimationControl from '@hooks/useAnimationControl';
import AnimationContext from '@contexts/AnimationContext';
import D3Context from '@contexts/D3Context';
import { generateD3Tree, drawD3Tree, styleActiveNode, setClickHandlers, removeClickHandlers } from '@d3/tree';
import {  } from '@functions/algorithms/d3/tree';

import VisualizationLayout from '@components/layouts/VisualizationLayout';
import TreeTraversalAnimationElement from './TreeTraversalAnimationElement';
import AnimationManager from '@components/animations/AnimationManager';

/**
 * Visualization section of tree traversal page
 * Responsibility: Render any visuals (i.e. tree and animation element) and animations
 * @ref attachTreeRef - Ref passed to d3 to know where to attach tree visualization
 */ 
function TreeTraversalVisualization({ tree, activeUuid, width, height, setActiveNode }) {
    const { isAnimatingMode, animationState, updateStepsRef } = useContext(AnimationContext); // ANIMATION
    const { d3StructureRef } = useContext(D3Context);
    const svgTreeRef = useRef(null);
    const gRef = useRef(null);

    /**
     * Sets active node based on selected node
     * @param {Object} node Currently selected node
     */
    const handleActiveNodeChange = (node) => {
        setActiveNode(node);
    }
    
    /**
     * Effect 
     * Draws the tree with d3 and applies appropriate click handlers, 
     * and handles the initial node case
     */
    useEffect(() => {
        if (tree) {
            // Draw tree
            d3StructureRef.current = generateD3Tree(tree.root, width, height);
            drawD3Tree(svgTreeRef.current, d3StructureRef.current, width, height);

            // Apply click handlers for active node change
            setClickHandlers(d3StructureRef.current, handleActiveNodeChange);

            // Initial node case. When there is only the rootNode, it is set to active for ease-of-use
            if (tree.root.children && tree.root.children[0].name === null && tree.root.children[1].name === null) {
                setActiveNode({
                    uuid: tree.root.uuid,
                    current: tree.root.name,
                    left: null,
                    right: null
                });
            }

            // ANIMATION - Indicates that steps need to be updated when isAnimatingMode is toggled
            if (!updateStepsRef.current) {
                updateStepsRef.current = true;
            }
        }
    }, [tree]);

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
    }, [tree, activeUuid]);

    /**
     * Effect
     * Removes click handlers when in animating mode
     */
    useEffect(() => {
        // isAnimatingMode is initially null, so we avoid hitting the inner false case on mount
        if (isAnimatingMode !== null) {
            if (isAnimatingMode) {
                removeClickHandlers();
            }
            else {
                setClickHandlers(d3StructureRef.current, handleActiveNodeChange);
            }
        }
    }, [isAnimatingMode]);



    return (
        tree ? (
            <VisualizationLayout>
                <div id="tree"> 
                    <svg cursor="grab" width={width} height={height} ref={svgTreeRef}>
                        <g transform="translate(0, 30)" ref={gRef}>

                        </g>
                    </svg>
                </div>
                <AnimationManager initialProps={{ x: 0, y: 0 }}>
                    {
                        ({ animationProps }) => (
                            animationState ? (
                                <TreeTraversalAnimationElement attachRef={gRef.current} animationProps={animationProps} />
                            ) : null
                        )
                    }
                </AnimationManager>
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

TreeTraversalVisualization.propTypes = {
    tree: PropTypes.instanceOf(BinaryTree),
    activeUuid: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    setActiveNode: PropTypes.func.isRequired
};

export default TreeTraversalVisualization;