import PropTypes from 'prop-types';

import BinarySearchTree from '@classes/binary-search-tree';

/**
 * @param {BinarySearchTree} tree - Binary Search Tree
 * @param {number} width - width of tree
 * @param {number} height- height of tree
 */
function BinarySearchTreeVisualization({tree, width, height}) {
    return (
        tree ? (
            <VisualizationLayout>
                <div id="tree" ref={attachTreeRef}> 

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

BinarySearchTreeVisualization.propTypes = {
    tree: PropTypes.instanceOf(BinarySearchTree),
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
}

export default BinarySearchTreeVisualization;