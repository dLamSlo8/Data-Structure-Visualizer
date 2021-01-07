import { useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';

import BinarySearchTree from '@classes/binary-search-tree';
import AnimationContext from '@contexts/AnimationContext';
import D3Context from '@contexts/D3Context';
import { generateD3Tree, drawD3Tree, styleActiveNode, setClickHandlers, removeClickHandlers } from '@d3/tree';

import VisualizationLayout from '@components/layouts/VisualizationLayout';
import AnimationManager from '@components/animations/AnimationManager';
/**
 * @param {BinarySearchTree} tree - Binary Search Tree
 * @param {number} width - width of tree
 * @param {number} height- height of tree
 */
function BinarySearchTreeVisualization({ tree }) {
    const { d3StructureRef, visualizationRef, updateD3Structure } = useContext(D3Context);
    const { isAnimatingMode } = useContext(AnimationContext); 
    const svgTreeRef = useRef(null);
    const gRef = useRef(null);
    /**
     * Effect 
     * Draws the tree with d3 and applies appropriate click handlers, 
     * and handles the initial node case
     */
    useEffect(() => {
        if (tree) {
            updateD3Structure(tree.root);
            // Draw tree
            if (!isAnimatingMode) {
                drawD3Tree(svgTreeRef.current, d3StructureRef.current, visualizationRef.current.offsetWidth, visualizationRef.current.offsetHeight);
            }

            /*
            //Apply click handlers for active node change
            setClickHandlers(d3StructureRef.current, handleActiveNodeChange);
            d3StructureRef.current = generateD3Tree(tree.root, width, height);
            // Draw tree
            drawD3Tree(attachTreeRef.current, d3StructureRef.current, width, height, animationElementRef);

            /*
            //Apply click handlers for active node change
            setClickHandlers(d3StructureRef.current, handleActiveNodeChange);
            d3StructureRef.current = generateD3Tree(tree.root, width, height);
            // Draw tree
            drawD3Tree(attachTreeRef.current, d3StructureRef.current, width, height, animationElementRef);

            /*
            //Apply click handlers for active node change
            setClickHandlers(d3StructureRef.current, handleActiveNodeChange);
            d3StructureRef.current = generateD3Tree(tree.root, width, height);
            // Draw tree
            drawD3Tree(attachTreeRef.current, d3StructureRef.current, width, height, animationElementRef);

            /*
            //Apply click handlers for active node change
            setClickHandlers(d3StructureRef.current, handleActiveNodeChange);
            d3StructureRef.current = generateD3Tree(tree.root, width, height);
            // Draw tree
            drawD3Tree(attachTreeRef.current, d3StructureRef.current, width, height, animationElementRef);

            /*
            //Apply click handlers for active node change
            setClickHandlers(d3StructureRef.current, handleActiveNodeChange);
            d3StructureRef.current = generateD3Tree(tree.root, width, height);
            // Draw tree
            drawD3Tree(attachTreeRef.current, d3StructureRef.current, width, height, animationElementRef);

            /*
            //Apply click handlers for active node change
            setClickHandlers(d3StructureRef.current, handleActiveNodeChange);
            d3StructureRef.current = generateD3Tree(tree.root, width, height);
            // Draw tree
            drawD3Tree(attachTreeRef.current, d3StructureRef.current, width, height, animationElementRef);

            /*
            //Apply click handlers for active node change
            setClickHandlers(d3StructureRef.current, handleActiveNodeChange);
            d3StructureRef.current = generateD3Tree(tree.root, width, height);
            // Draw tree
            drawD3Tree(attachTreeRef.current, d3StructureRef.current, width, height, animationElementRef);

            /*
            //Apply click handlers for active node change
            setClickHandlers(d3StructureRef.current, handleActiveNodeChange);

            //Initial node case. When there is only the rootNode, it is set to active for ease-of-use
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
            */
        }
    }, [tree, isAnimatingMode]);

    return (
        tree ? (
            <VisualizationLayout>
                <div id="tree"> 
                    <svg cursor="grab" width={visualizationRef.current.offsetWidth} height={visualizationRef.current.offsetHeight} ref={svgTreeRef}>
                        <g transform="translate(0, 60)" ref={gRef}>

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

BinarySearchTreeVisualization.propTypes = {
    tree: PropTypes.instanceOf(BinarySearchTree),
}

export default BinarySearchTreeVisualization;