import { v4 as uuidv4 } from 'uuid';


/**
 * TreeNode helper class used for tree data structures.
 * 
 * @property {int} name - value of node
 * @property {string} uuid - uuid of node
 * @property {Array} children - children nodes (i.e. index 0 is left, index 1 is right)
 */
export default class TreeNode {

    /**
     * @param {int} value - value of node
     * @param {string} [uuid] - uuid of node
     * @param {TreeNode} [node] - node to make copy of 
     */
    constructor(value, uuid, node) {
        if (node) {
            let { name, uuid, children } = node;
            this.name = name;
            this.uuid = uuid;
            if (children) {
                this.children = [new TreeNode(null, null, node.children[0]), new TreeNode(null, null, node.children[1])];
            }
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
        if (this.children !== null) {
            this.children[0] = node;
        } else {
            this.children = [node, NullTreeNode];
        }
    }

    /**
     * Sets the right child of node
     * @param {TreeNode} node - node to set as right child 
     */
    setRight(node) {
        if (this.children !== null) {
            this.children[1] = node;
        } else {
            this.children = [NullTreeNode, node];
        }
    }

}

export const NullTreeNode = new TreeNode(null, null);