import { useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';

import Heap from '@classes/heap';
import AnimationContext from '@contexts/AnimationContext';
import D3Context from '@contexts/D3Context';
import { generateD3Tree, drawD3Tree, styleActiveNode, setClickHandlers, removeClickHandlers } from '@d3/tree';

import VisualizationLayout from '@components/layouts/VisualizationLayout';

/**
 * @param {Heap} heap - heap
 */
function HeapVisualization({ heap }) {
    const animationElementRef = useRef(null);
    const { d3StructureRef, visualizationRef, updateD3Structure } = useContext(D3Context);
    const gRef = useRef(null);
    const svgTreeRef = useRef(null);

    /**
     * Effect 
     * Draws the tree with d3 and applies appropriate click handlers, 
     * and handles the initial node case
     */
    useEffect(() => {
        if (heap) {
            // Draw tree
            let root = heap.elements.length === 0 ? null : heap.elements[0]; 

            updateD3Structure(root);
            drawD3Tree(svgTreeRef.current, d3StructureRef.current, visualizationRef.current.offsetWidth, visualizationRef.current.offsetHeight, animationElementRef);

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
    }, [heap]);

    return (
        heap ? (
            <VisualizationLayout>
                <div id="tree"> 
                    <svg cursor="grab" width={visualizationRef.current.offsetWidth} height={visualizationRef.current.offsetHeight} ref={svgTreeRef}>
                        <g transform="translate(0, 60)" ref={gRef}>

                        </g>
                    </svg>
                </div>
            </VisualizationLayout>
        ) : (
            <div className="h-full flex flex-col justify-center items-center px-20">
                <div>
                    <h3 className="font-bold text-3xl mb-3">Your heap is empty.</h3>
                    <p className="font-semibold text-lg leading-6 text-gray-500">Add a root value in the 'Actions' tab to begin.</p>
                </div>
            </div>
        )
    )
}

HeapVisualization.propTypes = {
    heap: PropTypes.instanceOf(Heap),
}

export default HeapVisualization;