import { v4 as uuidv4 } from 'uuid';


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
        return JSON.stringify([]);
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