import { useEffect, useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import BinaryTree from '@classes/binary-tree';
import AnimationContext from '@contexts/AnimationContext';
import D3Context from '@contexts/D3Context';
import { generateD3Tree, drawD3Tree, styleActiveNode, setClickHandlers, removeClickHandlers } from '@d3/tree';

import VisualizationLayout from '@components/layouts/VisualizationLayout';
import AnimationManager from '@components/animations/AnimationManager';
import BaseTree from '@components/data-structures/tree/BaseTree';
import ClickableTree from '@components/data-structures/tree/ClickableTree';

import * as d3 from 'd3';

/**
 * Visualization section of tree traversal page
 * Responsibility: Render any visuals (i.e. tree and animation element) and animations
 * @ref attachTreeRef - Ref passed to d3 to know where to attach tree visualization
 */ 
function TreeTraversalVisualization({ tree, activeUuid, setActiveNode }) {
    const { isAnimatingMode, animationState, updateStepsRef, animationElementGeneratorRef } = useContext(AnimationContext); // ANIMATION
    const { d3StructureRef, visualizationRef, updateD3Structure } = useContext(D3Context);
    const [nodes, setNodes] = useState(null);

    const svgTreeRef = useRef(null);
    const gRef = useRef(null);

    /**
     * Sets active node based on selected node
     * @param {Object} node Currently selected node
     */
    const handleActiveNodeChange = (node) => {
        setActiveNode(node);
    }
    
    useEffect(() => {

        if (tree) {
            d3.select(svgTreeRef.current).call(d3.zoom()
            .extent([[0, 0], [visualizationRef.current.offsetWidth, visualizationRef.current.offsetHeight + 50]])
            .scaleExtent([0.5, 8])
            .filter(function filter(event) { // Only allows zoom and pan when holding down shift key (on non-mobile screens!)
                return document.documentElement.clientWidth <= 640 || event.shiftKey;
            })
            .on('zoom', function zoomed({transform}) {
                d3.select(svgTreeRef.current).select('g').attr('transform', transform);
            }));
        }

    }, [tree]);
    
    /**
     * Effect 
     * Draws the tree with d3 and applies appropriate click handlers, 
     * and handles the initial node case
     */
    useEffect(() => {
        if (tree) {
            tree.root.generateBinaryTreePositions(visualizationRef.current.offsetWidth / 2, 0);
            console.log(tree.getNodeMapping());
            setNodes(Object.values(tree.getNodeMapping()));
            // updateD3Structure(tree.root);
            // // Draw tree
            // drawD3Tree(svgTreeRef.current, d3StructureRef.current, visualizationRef.current.offsetWidth, visualizationRef.current.offsetHeight);

            // // Apply click handlers for active node change
            // setClickHandlers(d3StructureRef.current, handleActiveNodeChange);

            // // Initial node case. When there is only the rootNode, it is set to active for ease-of-use
            // if (tree.root.children && tree.root.children[0].name === null && tree.root.children[1].name === null) {
            //     setActiveNode({
            //         uuid: tree.root.uuid,
            //         current: tree.root.name,
            //         left: null,
            //         right: null
            //     });
            // }

            // // ANIMATION - Indicates that steps need to be updated when isAnimatingMode is toggled
            // if (!updateStepsRef.current) {
            //     updateStepsRef.current = true;
            // }
        }
        else {
            setNodes(null);
        }
    }, [tree]);

    // /**
    //  * Effect
    //  * Removes click handlers when in animating mode
    //  */
    // useEffect(() => {
    //     // isAnimatingMode is initially null, so we avoid hitting the inner false case on mount
    //     if (isAnimatingMode !== null) {
    //         if (isAnimatingMode) {
    //             removeClickHandlers();
    //         }
    //         else {
    //             setClickHandlers(d3StructureRef.current, handleActiveNodeChange);
    //         }
    //     }
    // }, [isAnimatingMode]);

    return (
        tree ? (
            <VisualizationLayout>
                <div id="tree"> 
                    <svg cursor="grab" width={visualizationRef.current.offsetWidth} height={visualizationRef.current.offsetHeight} ref={svgTreeRef}>
                        <g transform="translate(0, 60)" ref={gRef}>
                            { nodes && (
                                <BaseTree nodes={nodes}>
                                    {
                                        ({ links }) => (
                                            <ClickableTree nodes={nodes} links={links} activeUuid={activeUuid} setActiveNode={setActiveNode} isAnimatingMode={isAnimatingMode} />
                                        )
                                    }
                                </BaseTree>
                            )}
                        </g>
                    </svg>
                </div>
                <AnimationManager attachElementsRef={gRef.current} />

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
    setActiveNode: PropTypes.func.isRequired
};

export default TreeTraversalVisualization;