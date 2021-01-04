/**
 * Maps the uuids of the tree traversal to their node positions
 * @param {Array} traversalArray - Result of traversal algorithm
 * @param {node} d3TreeRef - Current d3 representation of tree 
 * @param {string} type - Type of traversal
 */
export const mapTraversalToPosition = (traversalArray, d3TreeRef, type) => {
    const nodes = d3TreeRef.descendants();
    if (type !== 'Level-order') {
        let foundNodes = {};

        let res = traversalArray.map(({ uuid }) => {
            let node;
    
            if (foundNodes[uuid]) {
                node = foundNodes[uuid];
            }
            else {
                node = nodes.find((node) => node.data.uuid === uuid);
                foundNodes[uuid] = node;
            }
    
            return { 
                'traversal-ring': {
                    state: {
                        xy: [node?.x, node?.y] 
                    }
                }
            }
        });
        res.unshift({ 
            'traversal-ring': {
                state: {
                    xy: [nodes[0].x, nodes[0].y] 
                }
            }
        });

        return res;
    }
    else {
        return traversalArray.map((uuid) => {
            let node = nodes.find((node) => node.data.uuid === uuid);

            return {
                'traversal-ring': {
                    state: {
                        xy: [node?.x, node?.y]
                    }
                }
            }
        })
    }
};