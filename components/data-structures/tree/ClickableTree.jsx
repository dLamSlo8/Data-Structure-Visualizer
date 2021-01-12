import PropTypes from 'prop-types';

import TreeNode from '@classes/tree-node';

import { default as Node } from './TreeNode';
import TreeLink from './TreeLink';

function ClickableTree({ nodes, links, setActiveNode, activeUuid }) {
    console.log(links);
    return (
        <>
        { // Links before the nodes b/c we want them to be stacked lower (remember stacking is based on order in svg)
            links.length && links.map(({ ...lineProps }) => (
                <TreeLink {...lineProps} />
            ))
        }
        { 
            nodes.map(({ uuid, x, y, name: value, children }) => (
                <Node 
                x={x} 
                y={y} 
                value={value} 
                gProps={{
                    onClick: () => setActiveNode({
                        uuid,
                        current: value,
                        left: children ? (children[0].name) : null,
                        right: children ? (children[1].name) : null
                    })
                }}
                {
                    ...(activeUuid === uuid && 
                        { 
                            circleProps: { 
                                fill: '#0062FF', 
                                strokeWidth: '0',
                            },
                            textProps: {
                                fill: '#FFFFFF'
                            } 
                        })
                } />
            ))
        }
        </>
    )
}

ClickableTree.propTypes = {
    nodes: PropTypes.arrayOf(TreeNode).isRequired,
    links: PropTypes.arrayOf(PropTypes.object), // Will soon be an Edge class!
    setActiveNode: PropTypes.func.isRequired
};

export default ClickableTree;