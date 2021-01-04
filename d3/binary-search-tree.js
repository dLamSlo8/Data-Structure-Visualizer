export const mapTraversalToPosition = (traversalArray, d3TreeRef, animationElementID) => {
    const nodes = d3TreeRef.descendants();
    let foundNodes = {};

    return traversalArray.map(({ uuid }) => {
        let node;

        if (foundNodes[uuid]) {
            node = foundNodes[uuid];
        }
        else {
            node = nodes.find((node) => node.data.uuid === uuid);
            foundNodes[uuid] = node;
        }

        return { 
            [animationElementID]: {
                state: {
                    xy: [node?.x, node?.y] 
                }
            }
        }
    });
}
