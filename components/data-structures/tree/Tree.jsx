import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import TreeNode from '@classes/tree-node';

import {default as Node} from './TreeNode';
import TreeLink from './TreeLink';


function Tree({ nodes }) {
    const [links, setLinks] = useState([]);

    /**
     * Effect
     * Generate links based on root node
     */
    // useEffect(() => {
    //     let links = [];

    //     function getLinks(root) {
    //         if (root.children[0]) {
    //             links.push({
    //                 id: root.links[0],
    //                 x1: root.x,
    //                 y1: root.y,
    //                 x2: root.children[0].x,
    //                 y2: root.children[0].y
    //             });
    //             getLinks(root.children[0]);
    //         }

    //         if (root.children[1]) {
    //             links.push({
    //                 id: root.links[0],
    //                 x1: root.x,
    //                 y1: root.y,
    //                 x2: root.children[1].x,
    //                 y2: root.children[1].y
    //             });
    //             getLinks(root.children[1]);
    //         }
    //     }

    //     getLinks(root);
    //     setLinks(links);
    // }, [root]);

    return (
        <>
            {/* {
                links.map(({ id, ...lineProps }) => (
                    <TreeLink isAnimated={} {...lineProps} />
                ))
            } */}
            {
                nodes.map(({ name: value, x, y }) => (
                    <Node value={value} x={x} y={y} />
                ))
            }
        </>
    )
}

Tree.propTypes = {
    nodes: PropTypes.arrayOf(TreeNode).isRequired
};

export default Tree;