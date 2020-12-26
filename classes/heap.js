import TreeNode, { NullTreeNode } from "./tree-node.js";


/**
 * Binary Heap. Root node of tree structure is highest priority.
 * @property {function} comparator - function used to determine heap priority
 * @property {Array} elements - array of TreeNodes in heap
 */
export default class heap {
    /**
     * 
     * @param {TreeNode} root - root node of heap
     * @param {function} comparator - function used to determine heap priority
     */
    constructor(root, comparator) {
        // if going to do copy constructor or null stuff, make sure elements array match
        this.elements = [root];
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
     */
    insert() {
        if (this.root === null) {
            throw ("Please create a tree!");
        }
        return 0;
    }

    /**
     * Gets the highest priority element
     * @return {TreeNode} - highest priority node
     */
    top() {
        if (this.root === null) {
            throw ("Please create a tree!");
        }

        return this.root;
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
     * Swaps two elements in heap. Updates TreeNode values and sets moves array
     * @param {int} idx1 - index of first node to swap
     * @param {int} idx2 - index of second node to swap
     * @param {Array} moves - array of moves to keep track of
     */
    swap(idx1, idx2, moves) {
        moves.push(this.elements[idx2].uuid);
        [this.elements[idx1], this.elements[idx2]] = [this.elements[idx2], this.elements[idx1]];
        [this.elements[idx1].children, this.elements[idx2].children] = [this.elements[idx2].children, this.elements[idx1].children];

        // update parents child
        let parentIdx = this.parentIndex(idx1);
        // make sure we have a parent
        if (parentIdx >= 0) {
            // if odd, then it should be left of parent
            if (idx1 % 2 === 1) {
                this.elements[parentIdx].children[0] = this.elements[idx1];
            } else {
                this.elements[parentIdx].children[1] = this.elements[idx1];
            }
        }
        
    }
}