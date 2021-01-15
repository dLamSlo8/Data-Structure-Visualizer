import Text from '@components/animations/elements/Text';
import TraversalAnimationElement from '@components/animations/elements/TraversalAnimationElement';

export default function getElementGenerator(traversalType, tree) {
    let nodes = Object.values(tree.getNodeMapping());

    return () => {
        let nonDataStructureArr = [{
            id: 'traversal-ring',
            component: TraversalAnimationElement,
        }];

        if (traversalType !== 'Level-order') {
            let textContent;

            switch (traversalType) {
                case 'Preorder':
                    textContent = ['root', 'left', 'right'];
                    break;
                case 'Inorder':
                    textContent = ['left', 'root', 'right'];
                    break;
                case 'Postorder':
                    textContent = ['left', 'right', 'root'];
                    break;
                default: 
                    break;
            }

            nodes.filter((node) => node.name !== null).forEach((node) => {
                const toTextNode = (text, idx) => ({
                    id: `${node.uuid}-${text}`,
                    component: Text,
                    componentProps: {
                        value: `${text[0].toUpperCase()}${text.slice(1)}`,
                        x: idx === 0 ? node.x - 50 : (idx === 1 ? node.x : node.x + 50),
                        y: node.y - 30
                    }
                });

                nonDataStructureArr = nonDataStructureArr.concat(textContent.map((val, idx) => toTextNode(val, idx)));
            });
        }
        
        return {
            nonDataStructure: nonDataStructureArr
        };
    };
}