import { v4 as uuidv4 } from 'uuid';
import * as d3 from 'd3';

export class Node {
    constructor(value, uuid, node) {
        if (node) {
            this.value = node.value;
            this.left = node.left;
            this.right = node.right;
            this.uuid = node.uuid;
        }
        else {
            this.value = value;
            this.left = null;
            this.right = null;
            this.uuid = uuid || uuidv4();
        }
    }
}

/**
 * Converts string representation of binary tree to node
 * @param s - string representation of binary tree
 */
export const parseTree = (s) => {
    if (s === null) {
        return null;
    }

    if (s.length !== 3) {
        throw ("A binary tree must have 2 children per node.")
    }

    var node = new Node(s[0])

    node.left = parseTree(s[1]);
    node.right = parseTree(s[2]);
    return node;
}

export const printTree = (node) => {
    var q = [];

    q.push(node);
    while (q.length > 0) {
        var first = q.shift();
        if (first.left !== null) {
            q.push(first.left);
        }

        if (first.right !== null) {
            q.push(first.right);
        }
    }
}

/**
 * Converts root node of tree to string representation
 * @param node - root node of tree structure
 */
export const nodeToString = (node) => {
    if (node === null) {
        return ("null");
    }

    let s = "[";
    s += node.value + ", ";

    s += nodeToString(node.left) + ", ";
    s += nodeToString(node.right);

    s += "]";

    return s;
}

/**
 * Returns root node after updating node value
 * @param node - root node of tree structure
 * @param value - value to replace node value with
 * @param uuid - uuid of node we want to update value for
 */
// export const replaceNodeValue = (node, value, left, right, uuid) => {
//     if (node === null) {
//         return;
//     }
//     console.log(node);
//     console.log(uuid);
//     // Create new node to replace left
//     if (node.left !== null && node.left.uuid === uuid) {
//         console.log("found it left");
//         console.log(uuid);
//         let nextNode = new Node(value, uuid);
//         let prevNode = node.left;
//         // Update left and right values
//         if (prevNode.left) {
//             if (isNaN(left)) {
//                 prevNode.left = null;
//             }
//             else {
//                 prevNode.left.value = left;
//             }
//         }
//         else if (!isNaN(left)) {
//             prevNode.left = new Node(left);
//         }
//         if (prevNode.right) {
//             if (isNaN(right)) {
//                 prevNode.right = null;
//             }
//             else {
//                 prevNode.right.value = right;
//             }
//         }
//         else if (!isNaN(right)) {
//             prevNode.right = new Node(right);
//         }

//         node.left = nextNode;
//         nextNode.left = prevNode === null ? null : prevNode.left;
//         nextNode.right = prevNode === null ? null : prevNode.right;
//         return node.left;
//     }

//     // Create new node to replace right
//     if (node.right !== null && node.right.uuid === uuid) {
//         let nextNode = new Node(value, uuid);
//         let prevNode = node.right;
//         // Update left and right values
//         if (prevNode.left) {
//             if (isNaN(left)) {
//                 prevNode.left = null;
//             }
//             else {
//                 prevNode.left.value = left;
//             }
//         }
//         else if (!isNaN(left)) {
//             prevNode.left = new Node(left);
//         }
//         if (prevNode.right) {
//             if (isNaN(right)) {
//                 prevNode.right = null;
//             }
//             else {
//                 prevNode.right.value = right;
//             }
//         }
//         else if (!isNaN(right)) {
//             prevNode.right = new Node(right);
//         }
    
//         helper(node.left, value, left, right, uuid);
//         helper(node.right, value, left, right, uuid);
    
//         return node.right;
//     }

//     // make dummy node
//     var dummy = new Node(0);

//     // make new copy of tree
//     var rootCopy = new Node(0, 0, rootNode);
//     dummy.right = rootCopy;
//     return helper(dummy, value, left, right, uuid);
// }
export const replaceNodeValue = (node, value, uuid) => {
    function helper(node, value, uuid) {
        if (node === null) {
            return;
        }
        if (node.uuid === uuid) {
            node.value = value;
        }
    
        helper(node.left, value, uuid);
        helper(node.right, value, uuid);
    
        return node;
    }

    // make new copy of tree
    let rootCopy = new Node(0, 0, node);
    return helper(rootCopy, value, uuid);
}

/**
 * Updates the id of all nodes in subtree
 * @param node - root node of the tree structure
 * @param start = id to set the node to
 */
export const updateId = (node, start) => {
    if (node === null) {
        return start;
    }

    node.uuid = start;
    start = updateId(node.left, start + 1);
    start = updateId(node.right, start + 1);

    return start + 1;
}

/**
 * Returns the inorder traversal of a binary tree
 * @param node - root node of the tree structure
 * @param l - list that holds inorder traversal of binary tree
 */
export const inOrderTraversal = (node) => {
    function helper(node, l) {
        if (node === null) {
            return;
        }
    
        helper(node.left, l);
    
        l.push(node.value);
        helper(node.right, l);
    }
    let res = [];
    
    helper(node, res);
    return JSON.stringify(res);
}

/**
 * Returns the preorder traversal of a binary tree
 * @param node - root node of the tree structure
 * @param l - list that holds preorder traversal of binary tree
 */
export const preOrderTraversal = (node, l) => {
    function helper(node, l) {
        if (node === null) {
            return;
        }
    
        l.push(node.value);
        helper(node.left, l);
        helper(node.right, l);
    }
    
    var res = []
    helper(node, res);
    return JSON.stringify(res);
}


/**
 * Returns the postorder traversal of a binary tree
 * @param node - root node of the tree structure
 * @param l - list that holds postorder traversal of binary tree
 */
export const postOrderTraversal = (node, l) => {
    function helper(node, l) {
        if (node === null) {
            return;
        }
    
        helper(node.left, l);
        helper(node.right, l);
        l.push(node.value);
    }

    var res = []
    helper(node, res);
    return JSON.stringify(res);
    
}


/**
 * Returns the level order traversal of a binary tree
 * @param node - root node of the tree structure
 */
export const levelOrderTraversal = (node) => {
    if (node === null) {
        return [];
    }
    var q = [];
    var ans = [];
    q.push(node);
    while (q.length > 0) {
        var first = q.shift();
        ans.push(first.value);
        if (first.left !== null) {
            q.push(first.left);
        }

        if (first.right !== null) {
            q.push(first.right);
        }
    }

    return JSON.stringify(ans);
}

/**
 * Returns root node of tree after removing a subtree of specified node
 * @param node - root node of the tree structure
 * @param uuid - uuid of root node of subtree to delete
 */
export const deleteSubtree = (node, uuid) => {
    function helper(node, uuid) {
        if (node === null) {
            return null;
        }
    
        let left = helper(node.left, uuid);
        let right = helper(node.right, uuid);
    
        if (node.uuid === uuid) {
            return node;
        }
    
        // if left or right is not null, then its descendant is the required node
        if (left !== null) {
            node.left = null;
            return null;
        }
    
        if (right !== null) {
            node.right = null;
            return null;
        }
    
        return null;
    }
    
    let dummy = new Node(0);
    dummy.right = node;
    helper(dummy, uuid);
    return dummy.right;
}

/**
 * Returns root node after adding a new node to tree structure
 * @param node - root node of tree structure
 * @param value - value new node should have
 * @param isLeft - whether to add to left or right subtree
 * @param matchUUID - uuid of node we want to add to
 * @param createUUID - (optional) uuid of node created
 */
export const addNode = (node, value, isLeft, matchUUID, createUUID) => {
    function helper(node, value, isLeft, matchUUID, createUUID) {
        if (node === null) {
            return;
        }

        if (node.uuid === matchUUID) {
            if (isLeft) {
                if (node.left !== null) {
                    throw ("A left child for this node already exists.")
                }
                node.left = new Node(value, createUUID);
            } else {
                if (node.right !== null) {
                    throw ("A right child for this node already exists.")
                }
                node.right = new Node(value, createUUID);
            }
            return node;
        }

        helper(node.left, value, isLeft, matchUUID, createUUID);
        helper(node.right, value, isLeft, matchUUID, createUUID);
        return node;
    }

    var rootCopy = new Node(0, 0, node);
    return helper(rootCopy, value, isLeft, matchUUID, createUUID);
}

/**
 * Returns D3 representation of tree node.
 * @param node - root node of the tree structure
 */
export const nodeToD3 = (node) => {
    if (node === null) {
        return { name: null, uuid: null };
    }

    if (node.left === null && node.right === null) { // End case
        return { name: node.value, uuid: node.uuid };
    }

    let data = { name: node.value, uuid: node.uuid, children: [
        nodeToD3(node.left),
        nodeToD3(node.right)
    ] };
    
    return data;
}

/**
 * Generates tree for #tree selector.
 * @param node - root node of the tree structure
 * @param optimalWidth - width of frame (will be compared vs document width for mobile responsiveness)
 */
 export const generateD3Tree = (rootNode, optimalWidth) => {
    d3.select('#tree-svg').remove(); // Remove previous tree if any. 
    const data = nodeToD3(rootNode);

    // Generate binary tree using d3.

    const hierarchyNode = d3.hierarchy((data));
    const width = hierarchyNode.height ? hierarchyNode.height * 200 : 50;
    const height = hierarchyNode.height * 100;

    const tree = d3.tree().size([width, height])(d3.hierarchy(data));
    const canvas = d3.select('#tree')
        .append('svg')
        .attr('id', 'tree-svg')
        .attr('cursor', 'grab')
        .attr('width', Math.min(width, optimalWidth - 50))
        .attr('height', height + 50)
        .append('g')
        .attr('transform', 'translate(0, 22)');

    d3.select('#tree-svg').call(d3.zoom()
        .extent([[0, 0], [width, height + 50]])
        .scaleExtent([0.5, 8])
        .filter(function filter(event) {
            return document.documentElement.clientWidth <= 640 || event.shiftKey;
        })
        .on('zoom', function zoomed({transform}) {
            d3.select('#tree-svg g')
                .attr('transform', transform);
        }))


    canvas.append('g')
        .attr('class', 'links');

    canvas.append('g')
        .attr('class', 'nodes');

    const nodes = tree.descendants().filter((node) => node.data.name !== null);
    console.log(nodes)
    const links = tree.links().filter((link) => link.source.data.name !== null && link.target.data.name !== null);

    canvas.select('g.links')
        .selectAll('.link')
        .data(links)
        .enter()
        .append('line')
        .attr('class', 'link')
        .attr('stroke', 'black')
        .attr('class', 'link')
        .attr('x1', function(d) {return d.source.x;})
        .attr('y1', function(d) {return d.source.y;})
        .attr('x2', function(d) {return d.target.x;})
        .attr('y2', function(d) {return d.target.y;});
    // Create individual nodes
    const node = canvas.select('g.nodes')
        .selectAll('.node') 
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'node');

    node.append('circle')
        .attr('r', 20)
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('stroke-width', '2');

    node.append('text')
        .text(function(d) { return d.data.name; })
        .attr('x', function(d) { return d.x; })
        .attr('y', function(d) { return d.y; })
        .attr('text-anchor', 'middle')
        .attr('dy', '6')
        .attr('font-family', '"Lora", serif');
    // canvas.select('g.nodes')
    //     .selectAll('.text')
    //     .data(nodes)
    //     .enter()
    //     .append('text')


    return { nodes };
 }

/**
 * Generates tree for #tree selector with customizability.
 * @param node - root node of the tree structure
 * @param optimalWidth - width of frame (will be compared vs document width for mobile responsiveness)
 * @param activeUuid - Uuid of active node. Will be styled accordingly
 * @param handleActiveNodeChange - Callback function for when the active node changes (circle selected).
 */
export const generateCustomizableD3Tree = (node, optimalWidth, activeUuid, handleActiveNodeChange) => {
    const { nodes } = generateD3Tree(node, optimalWidth); // Generates initial tree

    const circleNodes = d3.select('g.nodes') // Adds onClick listener!
        .selectAll('g.node')
        .data(nodes)
        .on('click', function (_, datum) {
            console.log(datum);
            let activeNode = { 
                uuid: datum.data.uuid,
                current: datum.data.name    
            };

            if (datum.children) {
                activeNode.left = datum.children[0].data.name;
                activeNode.right = datum.children[1].data.name;
            }
            else {
                activeNode.left = '';
                activeNode.right = '';
            }

            handleActiveNodeChange(activeNode);
        })
        
    circleNodes // Styles active circle
        .attr('class', (datum) => datum.data.uuid === activeUuid ? 'ct__active-node' : '');


}