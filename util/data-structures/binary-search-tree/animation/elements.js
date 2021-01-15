import TraversalAnimationElement from '@components/animations/elements/TraversalAnimationElement';

export const getDeleteElementsGenerator = (tree) => {
    let nodeMapping = tree.getNodeMapping();

    return ({ type, moves }) => {
        let nonDataStructureArr = [{
            id: 'traversal-ring',
            component: TraversalAnimationElement
        }];
        let dataStructureArr = [nodeMapping[moves[moves.length - 1]].uuid]; // Initialize with deleted element

        return {
            nonDataStructure: nonDataStructureArr,
            dataStructure: dataStructureArr
        };
    };
};