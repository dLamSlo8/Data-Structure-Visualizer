// import { DEFAULT_NODE_RADIUS, DEFAULT_NODE_SPACING } from '@util/globals/tree';
import { v4 as uuidv4 } from 'uuid';
import Edge from './edge.js';

/**
 * TreeNode helper class used for tree data structures.
 * 
 * @property {int} name - value of node
 * @property {string} uuid - uuid of node
 * @property {Array} children - children nodes (i.e. index 0 is left, index 1 is right)
 * @property {Array} edges - list of edges to children nodes
 */
export default class TreeNode {

    /**
     * When value and uuid are null, then it is copy constructor.
     * @param {int} [value = null] - (optional) value of node
     * @param {string} [uuid = null] - (optional) uuid of node
     * @param {TreeNode} [node = null] - (optional) node to make copy of 
     */
    constructor(value, uuid, node) {
        this.edges = [null, null];
        if (node) {
            let { name, uuid, children, edges } = node;
            this.name = name;
            this.uuid = uuid;
            this.children = children;
            this.edges = edges;

            // if (children !== null) {
            //     // need to check if children is a null treenode
            //     if (children[0].isNull()) {
            //         this.setRight(children[1]);
            //     }
            //     else if (children[1].isNull()) {
            //         this.setLeft(children[0]);
            //     } 
            //     else {
            //         this.children = children;
            //     }
                
            // }
            // else {
            //     this.children = null;
            // }
        } else {
            this.name = value;
            // if uuid and value null, the node should be null
            if (uuid === null && value === null) {
                this.uuid = null;
            }
            else {
                // if no uuid, use our own, used for testing
                this.uuid = uuid || uuidv4(); 
            }

            this.children = null;
        }
    }

    /**
     * Sets the left child of node
     * @param {TreeNode} node - node to set as left child 
     */
    setLeft(node) {
        if (this.children !== null && this.children !== undefined) {
            this.children[0] = node;
        } else {
            this.children = [node, NullTreeNode];
        }
        // set the edge of this node to point to the left child 
        this.edges[0] = new Edge(this.uuid + "l"); 
    }

    /**
     * Sets the right child of node
     * @param {TreeNode} node - node to set as right child 
     */
    setRight(node) {
        if (this.children !== null && this.children !== undefined) {
            this.children[1] = node;
        } else {
            this.children = [NullTreeNode, node];
        }
        // set the edge of this node to point to the right child 
        this.edges[1] = new Edge(this.uuid + "r"); 
    }

    /**
     * Checks if current node is null
     * @return {boolean} - whether or not this node is null
     */
    isNull() {
        if (this.name === null && this.uuid === null && this.children === null) {
            return true;
        }
        return false;
    }

    /**
     * Generates grid representation of node positions
     */
    generateGridPosition() {
        /**
         * Sets x grid position of node positions
         * @param {TreeNode} node - root node of tree structure
         * @param {lastX} lastX - last X coordinate, meaning that the xcoordinate
         * that has the furthest expanded left subtree
         */
        function helper(node, lastX) {
            // if you don't have left children, set your x coordinate
            // bc you can't expand anymore
            if (node.children === null || node.children[0].isNull()) {
                node.x = lastX + 1;
            }
            else {
                node.x = helper(node.children[0], lastX) + 1;
            }
            
            //checks to see if there are any right children (need to assign thosse position first)
            if (node.children === null || node.children[1].isNull()) {
                return node.x;
            }
            else {
                // if you have right child, that means this node, is furthest left of all the nodes
                // in the right subtree
                return helper(node.children[1], node.x);
            }
        }

        helper(this, 0);
        
    }

    /**
     * Sets all the (x,y) coordinates in binary tree structure
     * @param {float} rootXPos - x coordinate of the root node
     * @param {float} rootYPos - y coordinate of the root node
     * @param {float} size - radius of the nodes in pixels
     * @param {float} baseLineWidth - base width of line that connects nodes in pixels
     * @param {float} baseLineHeight - base height of line that connects nodes in pixels 
     */
    generateBinaryTreePositions(rootXPos, rootYPos, size=DEFAULT_NODE_RADIUS, baseLineWidth=DEFAULT_NODE_SPACING, baseLineHeight=DEFAULT_NODE_SPACING) {
        this.generateGridPosition();
        /**
         * Sets x and y position of each node
         * @param {TreeNode} node - root node of tree structure
         * @param {int} depth - depth level of current node
         * @param {int} rootXGrid - x grid position
         * @param {float} rootXPos - x coordinate of the root node
         * @param {float} rootYPos - y coordinate of the root node
         * @param {float} baseLineWidth - base width of line that connects nodes in pixels
         * @param {float} baseLineHeight - base height of line that connects nodes in pixels 
         */
        function helper (node, depth, rootXGrid, rootXPos, rootYPos, baseLineWidth, baseLineHeight) {
            if (node === null || node.isNull()) {
                return;
            }   
            
            // update left and right subtree
            if (node.children) {
                helper(node.children[0], depth + 1, rootXGrid, rootXPos, rootYPos, baseLineWidth, baseLineHeight);
                helper(node.children[1], depth + 1, rootXGrid, rootXPos, rootYPos, baseLineWidth, baseLineHeight);
            }

            node.x = (node.x - rootXGrid) * baseLineWidth + rootXPos;
            node.y = (depth * baseLineHeight) + rootYPos;

            // sets the edge positions
            if (node.children) {
                // sets left edge position
                if (!node.children[0].isNull()) {
                    let leftChild = node.children[0]
                    let leftEdge = node.edges[0]
                    if (leftEdge !== null) {
                        leftEdge.setPosition(node.x, leftChild.x, node.y, leftChild.y);
                    }
                }

                // sets right edge position
                if (!node.children[1].isNull()) {
                    let rightChild = node.children[1]
                    let rightEdge = node.edges[1]
                    if (rightEdge !== null) {
                        rightEdge.setPosition(node.x, rightChild.x, node.y, rightChild.y);
                    }
                }
            }

        }

        helper(this, 0, this.x, rootXPos, rootYPos, baseLineWidth, baseLineHeight);

    }

}

export const NullTreeNode = new TreeNode(null, null);
export const LineWidth = 50;
export const LineHeight = 50;