import TreeNode, { NullTreeNode } from "./tree-node.js";
import Edge from "./edge.js";


/**
 * Binary Tree class
 * 
 * @property {TreeNode} root - root node of tree structure
 * @property {Map} uuidToNodeMap - map of uuid to nodes in tree
 */
export default class BinaryTree {
    /**
     * 
     * @param {TreeNode} [root = null] - (optional) root node of tree structure
     * @param {BinaryTree} - (optional) tree structure to copy
     */
    constructor(root, tree) {
        this.uuidToNodeMap = {};
        // if you have a tree, do copy constructor
        if (tree) {
            this.root = new TreeNode(null, null, tree.root);
            this.uuidToNodeMap = tree.uuidToNodeMap;
        }
        else {
            this.root = root || null;

            // if root element exists, set node mapping
            if (root) {
                let q = [];
                q.push(root);
                while (q.length > 0) {
                    let first = q.shift();
                    
                    this.uuidToNodeMap[first.uuid] = first;
                    if (first.children) {
                        if (!first.children[0].isNull()) {
                            q.push(first.children[0]);
                        }
            
                        if (!first.children[1].isNull()) {
                            q.push(first.children[1]);
                        }
                    }
                }

            }
        }
    }


    /**
     * @return {Array} array of inorder traversal, 0 index includes array of 
     *                 values, 1 index includes array of uuid
     */
    inOrderTraversal = () => {
        /**
         * @param {TreeNode} node - root node of tree structure
         * @param {Array} res - array to store inorder traversal
         */
        function helper(node, res) {
            if (node === null || node.isNull()) {
                return null;
            }

            if (node.children) {
                //if left child exist, branch there
                if (node.children[0].uuid !== null) {
                    res[1].push({"uuid": node.children[0].uuid, "type":"left"});
                }
                
                let leftChild = helper(node.children[0], res);
                // if leftChild is null, that means we do not need to add it
                if (leftChild !== null) {
                    res[1].push({"uuid": node.uuid, "type": "parent"});
                }
                else {
                    res[1].push({"uuid": node.uuid, "type": "left"});
                }  
            }
            // signal we are at leaf node
            else {
                res[1].push({"uuid": node.uuid, "type": "left"});
            }  
            

            res[0].push(node.name);
            res[1].push({"uuid": node.uuid, "type": "visit"});

            if (node.children) {
                //if right child exist, branch there
                if (node.children[1].uuid !== null) {
                    res[1].push({"uuid": node.children[1].uuid, "type":"right"});
                }

                let rightChild = helper(node.children[1], res);
                // if rightChild is null, that means we do not need to add it
                if (rightChild !== null) {
                    res[1].push({"uuid": node.uuid, "type": "parent"});
                }
                else {
                    res[1].push({"uuid": node.uuid, "type": "right"});
                }
            }
            // signal we are at leaf node
            else {
                res[1].push({"uuid": node.uuid, "type": "right"});
            }
        }

        if (this.root === null) {
            throw ("Please insert a node into the tree.")
        }

        let res = [[], []];
        helper(this.root, res);

        // strips the last few moves in the result that just parents up to the top
        for (let i = res[1].length-1; i >=0; i--) {
            let obj = res[1][i];
            if (obj['type'] === "visit" || obj['type'] === "left" || obj['type'] === "right") {
                break;
            }
            res[1].pop();
        }
        return res;
    }

    /**
     * @return {Array} array of preorder traversal, 0 index includes array of 
     *                 values, 1 index includes array of uuid
     */
    preOrderTraversal = () => {
        /**
         * @param {TreeNode} node - root node of tree structure
         * @param {Array} res - array to store preorder traversal
         */
        function helper(node, res) {
            if (node === null || node.isNull()) {
                return null;
            }
            
            res[0].push(node.name);
            res[1].push({"uuid":node.uuid, "type":"visit"});

            if (node.children) {
                //if left child exist, branch there
                if (node.children[0].uuid) {
                    res[1].push({"uuid": node.children[0].uuid, "type":"left"});
                }
                let leftChild = helper(node.children[0], res);
                // if leftChild is null, that means we do not need to add it
                if (leftChild !== null) {
                    res[1].push({"uuid": node.uuid, "type": "parent"});
                }
                else {
                    res[1].push({"uuid": node.uuid, "type": "left"});
                }
            }
            else {
                res[1].push({"uuid": node.uuid, "type": "left"});
            }


            if (node.children) {
                if (node.children[1].uuid) {
                    res[1].push({"uuid":node.children[1].uuid, "type":"right"});
                }

                let rightChild = helper(node.children[1], res);
                 // if rightChild is null, that means we do not need to add it
                if (rightChild !== null) {
                    res[1].push({"uuid": node.uuid, "type": "parent"});
                }
                else {
                    res[1].push({"uuid": node.uuid, "type": "right"});
                }
            }
            else {
                res[1].push({"uuid": node.uuid, "type": "right"});
            }

        }
        if (this.root === null) {
            throw ("Please insert a node into the tree.")
        }

        let res = [[], []];
        helper(this.root, res);

        // strips the last few moves in the result that just parents up to the top
        for (let i = res[1].length-1; i >=0; i--) {
            let obj = res[1][i];
            if (obj['type'] === "visit" || obj['type'] === "left" || obj['type'] === "right") {
                break;
            }

            res[1].pop();
        }
        return res;
    }

    /**
     * @return {Array} array of postorder traversal, 0 index includes array of 
     *                 values, 1 index includes array of uuid
     */
    postOrderTraversal = () => {
        /**
         * @param {TreeNode} node - root node of tree structure
         * @param {Array} res - array to store postorder traversal
         */
        function helper(node, res) {
            if (node === null || node.isNull()) {
                return null;
            }

            if (node.children) {

                //if left child exist, branch there
                if (node.children[0].uuid) {
                    res[1].push({"uuid": node.children[0].uuid, "type":"left"});
                }
                let leftChild = helper(node.children[0], res);
                // if leftChild is null, that means we do not need to add it
                if (leftChild !== null) {
                    if (node.children[1].isNull()) {
                        res[1].push({"uuid": node.uuid, "type": "parent"});
                    }
                    
                }
                else {
                    res[1].push({"uuid": node.uuid, "type": "left"});
                }
            }
            else{
                res[1].push({"uuid": node.uuid, "type": "left"});
            }

            if (node.children) {

                if (node.children[1].uuid) {
                    res[1].push({"uuid": node.children[1].uuid, "type": "right"});
                }

                let rightChild = helper(node.children[1], res);
                 // if rightChild is null, that means we do not need to add it
                 if (rightChild !== null) {
                    res[1].push({"uuid": node.uuid, "type": "parent"});
                }
                else {
                    res[1].push({"uuid": node.uuid, "type": "right"});
                }
            }
            else {
                res[1].push({"uuid": node.uuid, "type": "right"});
            }

            res[0].push(node.name);
            res[1].push({"uuid": node.uuid, "type": "visit"});
        }

        if (this.root === null) {
            throw ("Please insert a node into the tree.")
        }

        let res = [[], []];
        helper(this.root, res);

        // strips the last few moves in the result that just parents up to the top
        for (let i = res[1].length-1; i >=0; i--) {
            let obj = res[1][i];
            if (obj['type'] === "visit" || obj['type'] === "left" || obj['type'] === "right") {
                break;
            }
            res[1].pop();
        }
        return res;
    }

    /**
     * @return {Array} - array of levelorder traversal, 0 index includes array of 
     *                 values, 1 index includes array of uuid
     */
    levelOrderTraversal() {
        if (this.root === null) {
            throw ("Please insert a node into the tree.")
        }

        let node = this.root;
        let res = [[], []];
        
        let q = []
        q.push(node);
        while (q.length > 0) {
            let first = q.shift();
            res[0].push(first.name);
            res[1].push(first.uuid);
            if (first.children) {
                if (!first.children[0].isNull()) {
                    q.push(first.children[0]);
                }
    
                if (!first.children[1].isNull()) {
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
        /**
         * Deletes the subtree of node with given uuid
         * @param {TreeNode} node - root node of tree structure
         * @param {string} uuid - uuid of root node of subtree to delete
         * @param {BinaryTree} tree - the binary tree we are working with
         */
        function helper(node, uuid, tree) {
            if (node === null) {
                return null;
            }

            // if nulltree, return the nulltree node
            if (node.isNull()) {
                return node;
            }

            if (node.uuid === uuid) {
                // removes this node and all its children from the uuidToNodeMap
                let q = []
                q.push(node);
                while (q.length > 0) {
                    let first = q.shift();
                    let firstUuid = first.uuid;
                    delete tree.uuidToNodeMap.firstUuid
                    if (first.children) {
                        if (!first.children[0].isNull()) {
                            q.push(first.children[0]);
                        }
            
                        if (!first.children[1].isNull()) {
                            q.push(first.children[1]);
                        }
                    }
                }

                
                return NullTreeNode;
            }

            // if child exists
            if (node.children) {
                
                // go through left and right
                let left = helper(node.children[0], uuid, tree);
                let right = helper(node.children[1], uuid, tree);

                // set edges to null if we removed
                if (left.isNull()) {
                    node.edges[0] = null;
                }
                if (right.isNull()) {
                    node.edges[1] = null;
                }

                // if no child left, set children back to null
                if ((left === null || left.isNull()) && (right === null || right.isNull())) {
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

        this.root = helper(this.root, uuid, this);

        this.root = !this.root.isNull() ? this.root : null;

    }

    /**
     * Inserts a node at specified location of tree structure
     * @param {int} value - value new node should have
     * @param {boolean} isLeft - whether to add to left or right subtree
     * @param {string} matchUUID - uuid of node we want to add to
     * @param {string} [createUUID = null] - (optional) uuid of node created
     */
    addNode = (value, isLeft, matchUUID, createUUID) => {
        /**
         * Inserts a node at specified location of tree structure
         * @param {TreeNode} node - root node of tree structure
         * @param {int} value - value new node should have
         * @param {boolean} isLeft - whether to add to left or right subtree
         * @param {string} matchUUID - uuid of node we want to add to
         * @param {string} [createUUID = null] - (optional) uuid of node created
         * @param {BinaryTree} tree - tree to update node mapping for
         */
        function helper(node, value, isLeft, matchUUID, createUUID, tree) {
            if (node === null || node.isNull()) {
                return;
            }

            if (node.uuid === matchUUID) {
                // add node to uuid mapping
                let newNode = new TreeNode(value, createUUID);
                tree.uuidToNodeMap[newNode.uuid] = newNode;
                if (isLeft) {
                    node.edges[0] = new Edge(node.uuid + "left");
                    if (node.children) {
                        if (node.children[0] && node.children[0].name !== null) {
                            throw ("A left child for this node already exists.")
                        }
    
                        node.children[0] = newNode;
                    }
                    else {
                        node.children = [newNode, new TreeNode(null, null)];
                    }
                } else {
                    node.edges[1] = new Edge(node.uuid + "right");
                    if (node.children) {
                        if (node.children[1] && node.children[1].name !== null) {
                            throw ("A right child for this node already exists.")
                        }

                        node.children[1] = newNode;
                    }
                    else {
                        node.children = [new TreeNode(null, null), newNode];
                    }
                }
                return;
            }
            if (node.children) {
                helper(node.children[0], value, isLeft, matchUUID, createUUID, tree);
                helper(node.children[1], value, isLeft, matchUUID, createUUID, tree);
            }
        }

        if (this.root === null) {
            throw ("Please insert a node into the tree.")
        }

        helper(this.root, value, isLeft, matchUUID, createUUID, this);
    }

    /**
     * Updates node with new value
     * @param {int} value - value to replace node with
     * @param {string} uuid - uuid of node we want to update value for
     */
    replaceNodeValue(value, uuid) {
        function helper(node, value, uuid) {
            if (node === null || node.isNull()) {
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