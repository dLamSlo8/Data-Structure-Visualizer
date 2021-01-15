import PropTypes from 'prop-types';

import TreeNode from '@classes/tree-node';

import {default as Node} from './tree-node/TreeNode';
import TreeLink from './TreeLink';


function BaseTree({ nodes, links }) {
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
                        onClick: () => !isAnimatingMode && setActiveNode({
                            uuid,
                            current: value,
                            left: children ? (children[0].name) : null,
                            right: children ? (children[1].name) : null
                        })
                    }} />
                ))
            }
        </>
    )
}

BaseTree.propTypes = {
    nodes: PropTypes.arrayOf(TreeNode).isRequired
};

export default BaseTree;