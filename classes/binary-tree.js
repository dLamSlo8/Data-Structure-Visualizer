import {TreeNode} from "./tree-node.js";

/**
 * Binary Tree class
 * 
 * @property {TreeNode} root - root node of tree structure
 */
export class BinaryTree {
    /**
     * 
     * @param {TreeNode} [root = null] - root node of tree structure
     */
    constructor(root) {
        this.root = root || null;
    }

    preOrderTraversal = () => {
        function helper(node) {
            
        }

        helper(this.root)
    }
}