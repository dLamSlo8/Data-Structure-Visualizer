import { node } from "prop-types";

export default function getStepGenerator(traversalType, tree) {
    let nodeMapping = tree.getNodeMapping();

    return (algorithmRes, animationElements) => { 
        const traversalUuidSteps = algorithmRes[1];
        // Get initial steps for traversal ring
        
        // Set default first step to root position. For level-order, this is done for us.
        let steps = traversalType !== 'Level-order' ? ([{
            'traversal-ring': {
                state: {
                    x: tree.root.x,
                    y: tree.root.y
                }
            }
        }]) : [];
        
        // Add all steps for traversal ring based on traversal
        if (traversalType === 'Level-order') {
            steps = steps.concat(traversalUuidSteps.map((uuid) => {
                let node = nodeMapping[uuid];
    
                return ({
                    'traversal-ring': {
                        state: {
                            x: node.x,
                            y: node.y
                        }
                    }
                });
            }));
        }
        else {
            steps = steps.concat(traversalUuidSteps.map(({ uuid }) => {
                let node = nodeMapping[uuid];
    
                return ({
                    'traversal-ring': {
                        state: {
                            x: node.x,
                            y: node.y
                        }
                    }
                });
            }));
        }

        let textAnimationElements = animationElements.nonDataStructure.slice(1);

        if (traversalType !== 'Level-order') { // If level order, we don't need to add text element steps.

            let currentUuid = tree.root.uuid; // Always begin with root uuid.
            let positionsIdx = 1;
            let activeTextElements = {}; // Mark where every text element becomes active

            for (let idx = 0; idx < traversalUuidSteps.length; idx++) {
                let { uuid, type } = traversalUuidSteps[idx];

                if (type !== 'parent') {
                    let id = `${currentUuid}-${type === 'visit' ? 'root' : type}`;
                    
                    if (!activeTextElements[id]) {
                        activeTextElements[id] = positionsIdx;
                    }
                    steps[positionsIdx].log = `Mark ${type === 'visit' ? 'root' : type}.`
                }

                currentUuid = uuid;
                positionsIdx++;
            }

            // For every text element, fill in steps array with state depending on when they become active.
            for (let { id } of textAnimationElements) {
                let activeIdx = activeTextElements[id];

                for (let idx = 0; idx < activeIdx; idx++) {
                    steps[idx][id] = {
                        state: {
                            fill: 'black'
                        },
                        config: {
                            duration: 0
                        }
                    };
                }

                for (let idx = activeIdx; idx < steps.length; idx++) {
                    steps[idx][id] = {
                        state: {
                            fill: 'red'
                        },
                        config: {
                            duration: 0
                        }
                    }
                }
            }
        }
        steps[0].log = 'Beginning traversal';
        console.log(steps);
        return steps;
    };
}