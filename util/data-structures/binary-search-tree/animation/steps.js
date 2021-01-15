export const getDeleteStepGenerator = (tree) => {
    let nodeMapping = tree.getNodeMapping();

    return ({ type, moves: [deleteTraversalMoves, inOrderMoves] }) => {
        let steps = [];
        let deletedNode = nodeMapping[deleteTraversalMoves[deleteTraversalMoves.length - 1].uuid];
        const isError = deleteTraversalMoves[deleteTraversalMoves.length - 1].error;

        // exclude last element if error because last element is error message
        if (isError) {
            deleteTraversalMoves.pop();
        }

        // Set traversal steps
        steps.concat(deleteTraversalMoves.map(({ type, uuid }, idx) => {
            let node = nodeMapping[uuid];

            return {
                'traversal-ring': {
                    state: {
                        x: node.x,
                        y: node.y
                    }
                },
                log: idx === 0 ? (
                    `Looking for node ${deletedNode.name}`
                ) : (
                    `Moving ${type} to node ${node.name}`
                )
            }
        }));

        switch (type) {
            case 0:
                steps[0][deletedNode.uuid] = {
                    state: {
                        gFill: 1
                    }
                };
                steps[steps.length - 1][deletedNode.uuid] = {
                    state: {
                        gFill: 0
                    }
                }
                break;
            default:
                break;
        }

    }
}