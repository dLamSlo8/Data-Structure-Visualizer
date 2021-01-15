import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import TreeNode from '@classes/tree-node';

function TreeWrapper({ nodes, children: render }) {
    const [links, setLinks] = useState([]);

    /**
     * Effect
     * Generate links based on root node
     */
    useEffect(() => {
        let root = nodes[0];
        let links = [];

        function getLinks(root) {
            if (root.children) {
                if (root.children[0] && !root.children[0].isNull()) {
                    links.push({
                        // id: root.links[0],
                        x1: root.x,
                        y1: root.y,
                        x2: root.children[0].x,
                        y2: root.children[0].y
                    });
                    getLinks(root.children[0]);
                }
    
                if (root.children[1] && !root.children[1].isNull()) {
                    links.push({
                        // id: root.links[0],
                        x1: root.x,
                        y1: root.y,
                        x2: root.children[1].x,
                        y2: root.children[1].y
                    });
                    getLinks(root.children[1]);
                }
            }
        }

        if (root.children) {
            getLinks(root);
        }
        setLinks(links);
    }, [nodes]);
    
    return render({ links });
}

TreeWrapper.propTypes = {
    nodes: PropTypes.arrayOf(TreeNode).isRequired,
    children: PropTypes.node.isRequired
};

export default TreeWrapper;