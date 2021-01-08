/**
 * Maps the uuids of bst traversal array (i.e. when deleting/inserting/finding) to their node positions
 * @param {Array} traversalArray - Result of bst algorithm
 * @param {node} d3TreeRef - Current d3 representation of tree 
 * @param {string} animationElementID - id of animation element
 *
 */
export const mapTraversalToPosition = (traversalArray, d3TreeRef, animationElementID) => {
    const nodes = d3TreeRef.descendants();

    return traversalArray.map(({ uuid }) => {
        let node;

        node = nodes.find((node) => node.data.uuid === uuid);
        return { 
            [animationElementID]: {
                state: {
                    xy: [node?.x, node?.y] 
                }
            }
        }
    });
}

export const mapInorderSuccessorTraversalToPosition = (traversalArray, d3TreeRef) => {
    const nodes = d3TreeRef.descendants();

    return traversalArray.map((uuid) => {
        let node;

        node = nodes.find((node) => node.data.uuid === uuid);
        return {
            'traversal-ring': {
                state: {
                    xy: [node?.x, node?.y]
                }
            }
        }
    });
}
