import TreeNode, { NullTreeNode } from "./tree-node.js";


/**
 * Binary Heap. Root node of tree structure is highest priority.
 * @property {function} comparator - function used to determine heap priority
 * @property {Array} elements - array of TreeNodes in heap
 */
export default class Heap {
    /**
     * 
     * @param {TreeNode} root - root node of heap
     * @param {function} comparator - function used to determine heap priority
     */
    constructor(root, comparator) {
        // if going to do copy constructor or null stuff, make sure elements array match
        this.elements = [];
        if (root !== null) {
            let idx = 0;
            this.elements = [root];
            // make sure heap is completely balanced
            // go through level order
            while (idx < this.elements.length) {
                let curr = this.elements[idx];
                if (curr.children) {
                    this.elements.push(curr.children[0]);
                    if (curr.children[1] !== NullTreeNode) {
                        this.elements.push(curr.children[1]);
                    }
                }
                idx += 1;
            }
        }
        this.comparator = comparator;
    }

    /**
     * Removes top element from heap and moves elements to maintain heap
     * property
     * @return {TreeNode} - highest priority node
     */
    remove() {
        /**
         * Moves node down to maintain heap property after removal
         * @param {int} index - index of node we are visiting
         * @param {Array} moves - array to store moves we took
         */
        function bubbleDown(index, moves) {
            if (index >= this.elements.length) {
                return;
            }

            // leaf node so no where else to go
            if (this.elements[index].children === null) {
                return;
            }

            let greaterIdx = this.leftIndex(index);
            let rightIdx = this.rightIndex(index);

            if (rightIdx < this.elements.length && this.comparator(greaterIdx, rightIdx)) {
                greaterIdx = rightIdx;
            }

            if (this.comparator(index, greaterIdx)) {
                this.swap(index, greaterIdx, moves);
                bubbleDown(index, moves);

            } else {
                // if curr is highest priority then don't bubble anymore
                return;
            }
        }

        if (this.elements.length === 0) {
            throw ("Please create a tree!");
        }

        // priority element
        let priorityNode = this.elements[0];

        let lastElement = this.elements.pop();

        // if root has no children, only one element in heap, so root should be empty
        if (priorityNode.children === null) {
            return [priorityNode, []];
        }

        // reassign lastElement to root and set its children
        this.elements[0] = lastElement;
        lastElement.children = priorityNode.children;

        let moves = [];
        bubbleDown(moves);

        return [priorityNode, moves];
    }

    /**
     * Adds element to heap while maintaining heap property
     * @param {int} value - value of node to add
     * @param {string} [uuid = null] - (optional) uuid of node to create
     */
    insert(value, uuid) {
        // need to discuss for insert if we want to show how we reached last element
        function bubbleUp(index, moves) {
            
        }
        if (this.elements.length === 0) {
            throw ("Please create a tree!");
        }

        let newNode = TreeNode(value, uuid);

        // add new node to end
        this.elements.push(newNode);

        this.updateParentChildren(this.elements.length - 1);

        let moves = [];

        return 0;
    }

    /**
     * Gets the highest priority element
     * @return {TreeNode} - highest priority node
     */
    top() {
        if (this.elements.length === 0) {
            throw ("Please create a tree!");
        }

        return this.elements[0];
    }

    /**
     * 
     * @param {int} index - index of node you want to get parent for
     * @return {int} index of node's parent
     */
    parentIndex(index) {
        return Math.floor((index - 1) / 2)
    }

    /**
     * 
     * @param {int} index - index of node you want to get left child for
     * @return {int} index of node's left child
     */
    leftIndex(index) {
        return (index * 2) + 1
    }

    /**
     * 
     * @param {int} index - index of node you want to get right child for
     * @return {int} index of node's right child
     */
    rightIndex(index) {
        return (index * 2) + 2
    }

    /**
     * Swaps two elements in heap. Updates TreeNode values and sets moves array. Element at idx1 will be
     * child and element at idx2 will be parent of idx2.
     * @param {int} idx1 - index of first node to swap, should be node that we are moving
     * @param {int} idx2 - index of second node to swap, should be node we are putting into moves
     * @param {Array} moves - array of moves to keep track of
     */
    swap(idx1, idx2, moves) {
        moves.push(this.elements[idx2].uuid);

        // swap children, need to make sure that we dont have circular children dependencies
        // bc original parent is going to be child of original child
        let childrenForChild = this.elements[idx2].children;
        let childrenForParent = this.elements[idx1].children;

        // find child that is refering to node at idx2, change this to be
        // node at idx1 because the node at idx1 will be child after swap
        for (let i = 0; i < childrenForParent.length; i++) {
            if (childrenForParent[i] === this.elements[idx2]) {
                childrenForParent[i] = this.elements[idx1];
            }
        }
        

        // swap nodes
        [this.elements[idx1], this.elements[idx2]] = [this.elements[idx2], this.elements[idx1]];

        // update
        this.elements[idx1].children = childrenForParent;
        this.elements[idx2].children = childrenForChild;
        
        // update parents child
        this.updateParentChildren(idx1);
    }

    /**
     * Update parent children to be this node
     * @param {int} idx - index of node for parent children to point to 
     */
    updateParentChildren(idx) {
        let parentIdx = this.parentIndex(idx);
        // make sure we have a parent
        if (parentIdx >= 0) {
            // if odd, then it should be left of parent
            if (idx % 2 === 1) {
                this.elements[parentIdx].setLeft(this.elements[idx]);
            } else {
                this.elements[parentIdx].setRight(this.elements[idx]);
            }
        }
    }
}