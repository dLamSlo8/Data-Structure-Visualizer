import TreeNode, { NullTreeNode } from "./tree-node.js";

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

    /**
     * @return {Array} array of inorder traversal, 0 index includes array of 
     *                 values, 1 index includes array of uuid
     */
    inOrderTraversal = () => {
        function helper(node, res) {
            if (node === null || node === NullTreeNode) {
                return;
            }

            if (node.children) {
                helper(node.children[0], res);
            }
            
            res[0].push(node.name);
            res[1].push(node.uuid);

            if (node.children) {
                helper(node.children[1], res);
            }
        }

        if (this.root === null) {
            throw ("Please insert a node into the tree.")
        }

        var res = [[], []];
        helper(this.root, res);
        return res;
    }

    /**
     * @return {Array} array of preorder traversal, 0 index includes array of 
     *                 values, 1 index includes array of uuid
     */
    preOrderTraversal = () => {
        function helper(node, res) {
            if (node === null || node === NullTreeNode) {
                return;
            }
            
            res[0].push(node.name);
            res[1].push(node.uuid);

            if (node.children) {
                helper(node.children[0], res);
                helper(node.children[1], res);
            }

        }
        if (this.root === null) {
            throw ("Please insert a node into the tree.")
        }

        var res = [[], []];
        helper(this.root, res);
        return res;
    }

    /**
     * @return {Array} array of postorder traversal, 0 index includes array of 
     *                 values, 1 index includes array of uuid
     */
    postOrderTraversal = () => {
        function helper(node, res) {
            if (node === null || node === NullTreeNode) {
                return;
            }

            if (node.children) {
                helper(node.children[0], res);
                helper(node.children[1], res);
            }

            res[0].push(node.name);
            res[1].push(node.uuid);
        }

        if (this.root === null) {
            throw ("Please insert a node into the tree.")
        }

        var res = [[], []];
        helper(this.root, res);
        return res;
    }

    /**
     * @return {Array} array of levelorder traversal, 0 index includes array of 
     *                 values, 1 index includes array of uuid
     */
    levelOrderTraversal = () => {
        if (this.root === null) {
            throw ("Please insert a node into the tree.")
        }

        var node = this.root;
        var res = [[], []];
        
        var q = []
        q.push(node);
        while (q.length > 0) {
            let first = q.shift();
            res[0].push(first.name);
            res[1].push(first.uuid);
            if (first.children) {
                if (first.children[0] !== NullTreeNode) {
                    q.push(first.children[0]);
                }
    
                if (first.children[1] !== NullTreeNode) {
                    q.push(first.children[1]);
                }
            }
        }
        return res;
    }

    /**
     * Deletes subtree of specified node
     * @param {string} uuid - uuid of root node of subtree to delete
     */
    deleteSubtree = (uuid) => {
        function helper(node, uuid) {
            if (node === null) {
                return null;
            }

            // if nulltree, return the nulltree node
            if (node === NullTreeNode) {
                return node;
            }

            if (node.uuid === uuid) {
                return NullTreeNode;
            }

            // if child exists
            if (node.children) {
                // go through left and right
                var left = helper(node.children[0], uuid);
                var right = helper(node.children[1], uuid);

                // if no child left, set children back to null
                if ((left === null || left === NullTreeNode) && (right === null || right === NullTreeNode)) {
                    node.children = null;
                } else {
                    // add set left and right child
                    node.children[0] = left;
                    node.children[1] = right;
                }
            }
            
            return node;
        }

        if (this.root === null) {
            throw ("Please insert a node into the tree.")
        }

        this.root = helper(this.root, uuid);

        this.root = this.root !== NullTreeNode ? this.root : null;
    }

    /**
     * Inserts a node at specified location of tree structure
     * @param {int} value - value new node should have
     * @param {boolean} isLeft - whether to add to left or right subtree
     * @param {string} matchUUID - uuid of node we want to add to
     * @param {string} createUUID - (optional) uuid of node created
     */
    addNode = (value, isLeft, matchUUID, createUUID) => {
        function helper(node, value, isLeft, matchUUID, createUUID) {
            if (node === null || node === NullTreeNode) {
                return;
            }

            if (node.uuid === matchUUID) {
                if (isLeft) {
                    if (node.children) {
                        if (node.children[0] && node.children[0].name !== null) {
                            throw ("A left child for this node already exists.")
                        }
    
                        node.children[0] = new TreeNode(value, createUUID);
                    }
                    else {
                        node.children = [new TreeNode(value, createUUID), new TreeNode(null, null)];
                    }
                } else {
                    if (node.children) {
                        if (node.children[1] && node.children[1].name !== null) {
                            throw ("A right child for this node already exists.")
                        }

                        node.children[1] = new TreeNode(value, createUUID);
                    }
                    else {
                        node.children = [new TreeNode(null, null), new TreeNode(value, createUUID)];
                    }
                }
                return;
            }
            if (node.children) {
                helper(node.children[0], value, isLeft, matchUUID, createUUID);
                helper(node.children[1], value, isLeft, matchUUID, createUUID);
            }
        }

        if (this.root === null) {
            throw ("Please insert a node into the tree.")
        }

        helper(this.root, value, isLeft, matchUUID, createUUID);
    }

    /**
     * Updates node with new value
     * @param {int} value - value to replace node with
     * @param {string} uuid - uuid of node we want to update value for
     */
    replaceNodeValue = (value, uuid) => {
        function helper(node, value, uuid) {
            if (node === null || node === NullTreeNode) {
                return;
            }

            if (node.uuid === uuid) {
                node.name = value;
                return;
            }

            if (node.children) {
                helper(node.children[0], value, uuid);
                helper(node.children[1], value, uuid);
            }
        }

        if (this.root === null) {
            throw ("Please insert a node into the tree.")
        }

        helper(this.root, value, uuid);
    }
}