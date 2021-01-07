/**
 * Maps the uuids of bst traversal array (i.e. when deleting/inserting/finding) to their node positions
 * @param {Array} traversalArray - Result of bst algorithm
 * @param {node} d3TreeRef - Current d3 representation of tree 
 * @param {string} animationElementID - id of animation element
 * 
 * NOTE: This function currently assumes that we haven't gotten rid of the duplicate 
 * id's yet (referring to recent Slack issue). Once that is implemented, we don't need 
 * foundNodes or the filter at the end. We simply map uuid to node.
 */
export const mapTraversalToPosition = (traversalArray, d3TreeRef, animationElementID) => {
    const nodes = d3TreeRef.descendants();
    let foundNodes = {};
    console.log(traversalArray);


    // return traversalArray.map(({ uuid }) => {
    //     let node;

    //     if (foundNodes[uuid]) {
    //         return null;
    //     }
    //     else {
    //         node = nodes.find((node) => node.data.uuid === uuid);
    //         foundNodes[uuid] = node;
    //     }

    //     return { 
    //         [animationElementID]: {
    //             state: {
    //                 xy: [node?.x, node?.y] 
    //             }
    //         }
    //     }
    // }).filter((val) => val !== null);
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
