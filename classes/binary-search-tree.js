import TreeNode, { NullTreeNode } from "./tree-node.js";


/**
 * Binary Search Tree class. Maintains property that left subtree of each node
 * is less than or equal to root and right subtree is greater than root.
 * @property {TreeNode} root - root node of binary search tree
 */

export default class BinarySearchTree {
    /**
     * Creates new binary search tree
     * @param {TreeNode} [root = null] - root node of tree structure
     */
    constructor(root, tree) {
        if (tree) {
            this.root = tree.root ? new TreeNode(null, null, tree.root) : null;
        }
        else {
            this.root = root || null;
        }
    }
    
    /**
     * Inserts a new node into the tree. Break ties by inserting into left subtree.
     * @param {int} value - value of node to insert
     * @param {string} [uuid = null] - (optional) uuid of node to create
     * @return {Array} - Array of uuid of nodes visited to insert node. Includes
     *                 UUID of node inserted
     */
    insertNode(value, uuid) {
        // need to discuss how to handle root node

        /**
         * Inserts a new node into the tree. Break ties by inserting into left subtree.
         * @param {TreeNode} node - root node of tree structure
         * @param {int} value - value of node to insert
         * @param {string} [uuid = null] - (optional) uuid of node to insert
         * @param {Array} moves - array to store moves we took
         */
        function helper(node, value, uuid, moves) {
            if (node === null || node.isNull()) {
                let newNode = new TreeNode(value, uuid);
                return newNode;
            }
            if (moves.length === 0) {
                moves.push({"type": "visit", uuid: node.uuid});
            }
            
            if (value <= node.name) {
                // make sure children exists
                if (node.children !== null) {
                    if (node.children[0].uuid !== null) {
                        moves.push({"type": "left", uuid: node.children[0].uuid});
                        node.setLeft(helper(node.children[0], value, uuid, moves));
                    }
                    else {
                        let newNode = helper(node.children[0], value, uuid, moves);
                        moves.push({"type": "left", uuid: newNode.uuid});
                        node.setLeft(newNode);
                    }
                } else {
                    // pass in null as node so we insert at left
                    let newNode = helper(null, value, uuid, moves)
                    node.setLeft(newNode);
                    moves.push({"type": "left", uuid: newNode.uuid});
                }
            } else {
                // makes sure children exists
                if (node.children !== null) {
                    if (node.children[1].uuid !== null) {
                        moves.push({"type": "right", uuid: node.children[1].uuid});
                        node.setRight(helper(node.children[1], value, uuid, moves));
                    }
                    else {
                        let newNode = helper(node.children[1], value, uuid, moves);
                        moves.push({"type": "right", uuid: newNode.uuid});
                        node.setRight(newNode);
                    }
                    
                } else {
                    // pass in null as node so we insert at right
                    let newNode = helper(null, value, uuid, moves)
                    node.setRight(newNode);
                    moves.push({"type": "right", uuid: newNode.uuid});
                } 
            }
            return node;
        }

        
        // if tree doesn't exist create a new node;
        if (this.root === null) {
            this.root = new TreeNode(value, uuid);
            return [{"type": "visit", "uuid": uuid}];
        }

        let moves = [];
        helper(this.root, value, uuid, moves);
        return moves;
    }

    /**
     * Returns array of steps that occur from finding a node in the tree
     * @param {int} value - value of node to find
     * @return {Array} - Array of uuid of nodes that we took to find node
     */
    findNode(value) {
        /**
         * Finds node in tree
         * @param {TreeNode} node - root node of tree structure
         * @param {int} value - value of node to insert
         * @param {Array} moves - array to store moves we took
         */
        function helper(node, value, moves) {
            if (node === null || node.isNull()) {
                moves.push({"error": "A node with this value does not exist in the tree"});
                return;
            }

            if (moves.length === 0) {
                moves.push({"type": "visit", "uuid": node.uuid});
            }
            

            if (node.name === value) {
                return;
            }
            else if (value <= node.name) {
                if (node.children) {
                    if (!node.children[0].isNull()) {
                        moves.push({"type": "left", "uuid": node.children[0].uuid});
                    }
                    helper(node.children[0], value, moves);
                } else {
                    helper(null, value, moves);
                }
            }
            else {
                if (node.children) {
                    if (!node.children[1].isNull()) {
                        moves.push({"type": "right", "uuid": node.children[1].uuid});
                    }
                    helper(node.children[1], value, moves);
                } else {
                    helper(null, value, moves);
                }
            }
        }


        let moves = [];
        helper(this.root, value, moves);
        return moves;
    }
    

    /**
     * Returns array of steps that occur from deleting a node in the tree
     * as well as the new tree. Delete first node reached when duplicate value.
     * @param {int} value - value of node to delete
     * @return {Array} - array of uuid that occur from deleting a node. If need to move
     *                 a node, last index in array is object of {id: id}
     */
    deleteNode(value) {
        let type = {};
        /**
         * Deletes node in tree
         * @param {TreeNode} node - root node of tree structure
         * @param {int} value - value of node to insert
         * @param {Array} moves - array to store moves we took
         */
        function helper(node, value, moves) {
            if (node === null || node.isNull() || value === null || value === undefined) {
                // treat as error if it doesn't exist for now, might change need to discuss
                moves[0].push({"error": "A node with this value does not exist in the tree"});
                return NullTreeNode;
            }
            
            if (moves[0].length === 0) {
                moves[0].push({"type": "visit", "uuid": node.uuid});
            }
            

            if (value === node.name) {
                if (node.children == null) {
                    type['type'] = 0;
                    return NullTreeNode;
                }
                else if (node.children[0] === null || node.children[0].isNull()) {
                    moves[1].push(node.children[1].uuid);
                    type['type'] = 1;
                    return node.children[1];
                }
                else if (node.children[1] === null || node.children[1].isNull()) {
                    moves[1].push(node.children[0].uuid);
                    type['type'] = 1;
                    return node.children[0];
                }
                else {
                    let tmp = inorderSuccessor(node, moves);
                    //moves[1].push(tmp.uuid);
                    tmp.children = [];
                    tmp.children[0] = node.children[0];
                    tmp.children[1] = node.children[1];
                    node.children = null;
                    type['type'] = 2;
                    return tmp;
                }
            }
            else if (value < node.name) {
                if (node.children !== null) {
                    // when deleting a value that doesn't exist and this node has valid child, add it to moves
                    if (node.children[0].uuid !== null) {
                        moves[0].push({"type": "left", "uuid": node.children[0].uuid});
                    }
                    
                    let newNode = helper(node.children[0], value, moves);
                    
                    // checks if delete this node should result in children being null or NullTreeNode
                    if (node.children[1].isNull() && newNode.isNull()) {
                        node.children = null;
                    } else {
                        node.setLeft(newNode);
                    }
                    
                } else {
                    // node.setLeft(helper(null, value, moves));
                    moves[0].push({"error": "A node with this value does not exist in the tree"});
                }
            }
            else {
                if (node.children !== null) {
                    // when deleting a value that doesn't exist and this node has valid child, add it to moves
                    if (node.children[1].uuid !== null) {
                        moves[0].push({"type": "right", "uuid": node.children[1].uuid});
                    }
                    
                    let newNode = helper(node.children[1], value, moves);
                    
                    // checks if delete this node should result in children being null or NullTreeNode
                    if (node.children[0].isNull() && newNode.isNull()) {
                        node.children = null;
                    } else {
                        node.setRight(newNode);
                    }
                } else {
                    // node.setRight(helper(null, value, moves));
                    moves[0].push({"error": "A node with this value does not exist in the tree"});
                }
            }

            return node;
        }

        /**
         * Returns node of inorder successor of node and removes that node from
         * tree
         * @param {TreeNode} nodeForSuccessor - node that we want to find succesor for
         * @param {Array} moves - an array that holds the direction of uuid to get to a node
         * @return {TreeNode} - inorder successor of node
         */
        function inorderSuccessor(nodeForSuccessor, moves) {
            /**
             * Finds the minimum node and removes that node from tree
             * @param {TreeNode} node - node we want to find min of
             * @param {TreeNode} isRightChild - Parent of node if node is a right child
             * @param {TreeNode} isLeftChild - Parent of node if node is a left child
             */
            function findMin(node, isRightChild, isLeftChild) {
                moves[1].push(node.uuid);
                if (node.children !== null) {
                    // if this is the direct right child of node to delete, do not add
                    // moves[1].push(node.uuid);
                    
                    // found last node in left branch
                    if (node.children[0] === null || node.children[0].isNull()) {
                        // successor has a right child, transfer successor's right child to parent

                        if (isRightChild !== null && isLeftChild === null) {
                            // successor has a right child, which means it's right child must be set to successor's right child
                            if (!node.children[1].isNull()) {
                                //attach this node's right children to its parent
                                isRightChild.children[1] = node.children[1];
                            }
                        }
                        else if (isRightChild === null && isLeftChild !== null) {
                            // a left child can have right have right children it needs to attach to parent
                            if (!node.children[1].isNull()) {
                                //attach this node's right children to its parent
                                isLeftChild.children[0] = node.children[1];
                            }
                        }
                        return node;
                    }
                    return findMin(node.children[0], null, node)
                }
                //node has no children, which means it is the left most leaf node or the direct right node of node we want to delete

                // remove the node from parent node
                if (isRightChild != null && isLeftChild == null) {
                    /* 
                        the commented out if statemnet can never occur. The reason the if statement exist in the 
                        first place is because it needs to check the successors's parent to see if it has another
                        child. If it does not, the parent's children value should be set to null rather than 
                        [NullTreeNode, NullTreeNode]. Since we only ever call inOrderSuccessor when the node to
                        delete has two nodes, we never actually need to check if there is a left child because it is
                        guaranteed by the fact that the node has 2 children

                    */
                    //check if parent does not have a left child
                    // if (isRightChild.children[0] == NullTreeNode) {
                    //     isRightChild.children = null;
                    // } else{
                        isRightChild.children[1] = NullTreeNode;
                    // }
                }
                else if (isRightChild === null && isLeftChild !== null) {
                    //check if parent does not have a left child
                    if (isLeftChild.children[1].isNull()) {
                        isLeftChild.children = null;
                    } else{
                        isLeftChild.children[0] = NullTreeNode;
                    }
                }

                return node
            }

            return findMin(nodeForSuccessor.children[1], nodeForSuccessor, null);
        }

        let moves = [[],[]];
        let result = helper(this.root, value, moves);
        this.root = ( result.isNull()) ? null: result;
        
        type['moves'] = moves;
        return type;
    }
}