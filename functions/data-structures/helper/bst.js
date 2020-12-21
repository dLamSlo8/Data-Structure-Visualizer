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
 * Returns array of steps that occur from inserting a node into the tree
 * as well as the new tree. Break ties by inserting into left subtree.
 * @param node - root node of the tree
 * @param value - value of node to insert
 * @param uuid - uuid of node to create
 */
export const insertNode = (node, value, uuid = null) => {
    // need to discuss how to handle root node
    function helper(node, value, uuid, moves) {
        if (node == null) {
            var newNode = new Node(value, uuid);
            moves.push(newNode.uuid);
            return newNode;
        }
        moves.push(node.uuid);
        if (value <= node.value) {
            node.left = helper(node.left, value, uuid, moves);
        } 
        else {
            node.right = helper(node.right, value, uuid, moves)
        }

        return node;
    }

    
    // if tree doesn't exist create a new node;
    if (node == null) {
        var newNode = new Node(value, uuid);
        return [[newNode.uuid], newNode]
    }

    var rootCopy = new Node(0, 1, node);
    var moves = [];
    helper(rootCopy, value, uuid, moves);
    return [moves, rootCopy];
}

/**
 * Returns array of steps that occur from deleting a node in the tree
 * as well as the new tree. Delete first node reached when duplicate value.
 * @param node - root node of the tree
 * @param value - value of node to delete
 */
export const deleteNode = (node, value) => {
    function helper(node, value, rootCopy, moves) {
        if (node == null) {
            // treat as error if it doesn't exist for now, might change need to discuss
            throw "A node with this value does not exist in the tree";
        }
        moves.push(node.uuid);

        if (value === node.value) {
            if (node.left == null && node.right == null) {
                return null;
            }
            else if (node.left == null) {
                return node.right;
            }
            else if (node.right == null) {
                return node.left;
            }
            else {
                var tmp = inorderSuccessor(rootCopy, node);
                moves.push({"id": tmp.uuid});
                tmp.left = node.left;
                tmp.right = node.right;
                node.left = null;
                node.right = null;
                return tmp;
            }
        }
        else if (value < node.value) {
            // let left = helper(node.left, value, rootCopy, moves);
            // node.left = left ? left : node.left;
            node.left = helper(node.left, value, rootCopy, moves);
        }
        else {
            // let right = helper(node.right, value, rootCopy, moves);
            // node.right = right ? right : node.right;
            node.right = helper(node.right, value, rootCopy, moves);
        }

        return node;
    }

    /**
     * Returns node of inorder successor of node and removes that node from
     * tree
     * @param node - root node of the tree structure
     * @param nodeForSuccessor - node that we want to find succesor for
     */
    function inorderSuccessor(node, nodeForSuccessor) {
        function findMin(node, isRightChild, isLeftChild) {
            // found last node in left branch
            if (node.left == null) {
                // remove the node from parent node
                if (isRightChild != null && isLeftChild == null) {
                    isRightChild.right = null;
                }
                else if (isRightChild == null && isLeftChild != null) {
                    isLeftChild.left = null;
                }
                return node;
            }

            // var left = findMin(node.left, null, node);

            // // if left is a value, then it returned the node
            // // so need to remove it
            // if (left) {
            //     console.log("how screwed");
            //     node.left = null;
            //     return left;
            // }
            return findMin(node.left, null, node)
        }

        // function findMax(node, parent) {
        //     if (node.right == null) {
        //         if (parent) {
        //             parent.left = null;
        //         }
        //         return node;
        //     }

        //     var left = findMin(node.left, null);

        //     if (left) {
        //         node.left = null;
        //         return left;
        //     }
        // }

        // im not sure if we ever reach this condition
        // because if we do then that means one of the subtree is missing
        // which means we don't go this route
        // if (nodeForSuccessor.right == null) {
        //     let curr = node;
        //     let successor = node;
        //     // keep going through right subtree to get largest possible value
        //     while (curr && curr.value < nodeForSuccessor.value) {
        //         curr = curr.right;
        //     }
        //     return curr;

        // }

        return findMin(nodeForSuccessor.right, nodeForSuccessor, null);
    }

    var rootCopy = new Node(0, 1, node);
    var moves = [];

    return [moves, helper(rootCopy, value, rootCopy, moves)];
}

/**
 * Returns array of steps that occur from finding a node in the tree
 * @param node - root node of tree structure
 * @param value - value of node to find
 */
export const findNode = (node, value) => {
    function helper(node, value, moves) {
        if (node == null) {
            throw "A node with this value does not exist in the tree";
        }
        moves.push(node.uuid);

        if (node.value === value) {
            return;
        }
        else if (value <= node.value) {
            helper(node.left, value, moves);
        } 
        else {
            helper(node.right, value, moves);
        }
    }
    var moves = [];
    helper(node, value, moves);
    return moves;
}