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
     * When value and uuid are null, then it is copy constructor.
     * @param {int} [value = null] - (optional) value of node
     * @param {string} [uuid = null] - (optional) uuid of node
     * @param {TreeNode} [node = null] - (optional) node to make copy of 
     */
    constructor(value, uuid, node) {
        if (node) {
            let { name, uuid, children } = node;
            this.name = name;
            this.uuid = uuid;

            if (children !== null) {
                // need to check if children is a null treenode
                if (children[0].isNull()) {
                    this.setRight(children[1]);
                }
                else if (children[1].isNull()) {
                    this.setLeft(children[0]);
                } 
                else {
                    this.children = children;
                }
                
            }
            else {
                this.children = null;
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
        if (this.children !== null && this.children !== undefined) {
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
        if (this.children !== null && this.children !== undefined) {
            this.children[1] = node;
        } else {
            this.children = [NullTreeNode, node];
        }
    }

<<<<<<< HEAD
=======

>>>>>>> 456a7f47a0b6b0f44912f7958b5236d6e40c8f46
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
<<<<<<< HEAD

=======
>>>>>>> 456a7f47a0b6b0f44912f7958b5236d6e40c8f46
}

export const NullTreeNode = new TreeNode(null, null);