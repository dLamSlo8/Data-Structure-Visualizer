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
     * @param {string} [mode = null] - (optional) "min" or "max" heap
     * @param {function} [comparator = null] - (optional) function used to determine heap priority
     */
    constructor(root, mode, comparator) {
        // if going to do copy constructor or null stuff, make sure elements array match
        this.elements = [];

        if (root !== null && root !== undefined) {
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
        if ((mode === "min" || mode === undefined || mode === null) && (comparator === undefined || comparator === null)) {
            this.comparator = minComparator;
        }
        else if (mode === "max") {
            this.comparator = maxComparator;
        }
        else {
            this.comparator = comparator;
        }
    }

    /**
     * Removes top element from heap and moves elements to maintain heap
     * property
     * @return {TreeNode} - highest priority node
     */
    remove() {
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
        
        // keep check of how many null children there are
        let nullCount = 0;

        // make sure original top was not parent of last element
        for (let i = 0; i < priorityNode.children.length; i++) {
            if (priorityNode.children[i] === lastElement) {
                priorityNode.children[i] = NullTreeNode;
            }
            if (priorityNode.children[i] === NullTreeNode) {
                nullCount += 1;
            }
        }

        // if both children are null, then set children to null
        lastElement.children = nullCount === 2 ? null: priorityNode.children;

        // update parent of last element to be nothing
        // get parent of length since elements has one less element because we removed,
        // so length should have been index where last element used to be
        let parent = this.elements[this.parentIndex(this.elements.length)];

        // make sure parent no longer points to last element since last element
        // is now root node
        this.clearParentChildren(parent, lastElement);

        let moves = [lastElement.uuid];
        this.bubbleDown(0, moves);

        // empty out children
        priorityNode.children = null;
        return [priorityNode, moves];
    }

    /**
     * Moves node down to maintain heap property after removal
     * @param {int} index - index of node we are visiting
     * @param {Array} moves - array to store moves we took
     */
    bubbleDown(index, moves) {
        if (index >= this.elements.length) {
            return;
        }

        // leaf node so no where else to go
        if (this.elements[index].children === null) {
            return;
        }

        let greaterIdx = this.leftIndex(index);
        let rightIdx = this.rightIndex(index);

        // make sure element exists
        if (greaterIdx < this.elements.length) {
            // if right side has higher priority, then need to move right
            if (rightIdx < this.elements.length && this.comparator(this.elements[rightIdx], this.elements[greaterIdx])) {
                greaterIdx = rightIdx;
            }

            // if higher child has greater priority, then swap
            if (this.comparator(this.elements[greaterIdx], this.elements[index])) {
                this.swap(index, greaterIdx, moves);
                moves.push(this.elements[index].uuid);
                this.bubbleDown(greaterIdx, moves);
            } else {
                // if curr is highest priority then don't bubble anymore
                return;
            }
        }
    }

    /**
     * Adds element to heap while maintaining heap property
     * @param {int} value - value of node to add
     * @param {string} [uuid = null] - (optional) uuid of node to create
     */
    insert(value, uuid) {
        // need to discuss for insert if we want to show how we reached last element
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
     * Moves node up to maintain heap property after insertion
     * @param {int} index - index of node we are visiting
     * @param {Array} moves - array to store moves we took
     */
    bubbleUp(index, moves) {
            
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
     * Swaps two elements in heap. Updates TreeNode values and sets moves array. Element at idx1 will be
     * child and element at idx2 will be parent of idx2.
     * @param {int} idx1 - index of first node to swap, should be parent node that we are moving
     * @param {int} idx2 - index of second node to swap, should be child node
     */
    swap(idx1, idx2) {
        // to swap children, need to make sure that we dont have circular children dependencies
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

        // console.log(this.elements[idx1]);
        // console.log(this.elements[idx2]);
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
    
    /**
     * Set parent's child to be null
     * @param {TreeNode} parent - parent node
     * @param {TreeNode} child - former child of parent 
     */
    clearParentChildren(parent, child) {
        if (parent.children === null) {
            return;
        }
        let nullCount = 0;
        for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i] === child) {
                parent.children[i] = NullTreeNode;
            }
            if (parent.children[i] === NullTreeNode) {
                nullCount += 1;
            }
        }
        
        // if both children are null, then it is leaf so no children
        parent.children = nullCount === 2 ? null: parent.children;
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
}

/**
 * Determines priority between two nodes. Higher priority for smaller node
 * @param {TreeNode} node1 - first node to compare
 * @param {TreeNode} node2 - second node to compare
 * @return {boolean} - whether node1 has higher priority than node2 
 */
export function minComparator(node1, node2) {
    if (node1.name < node2.name) {
        return true;
    }
    return false;
}

/**
 * Determines priority between two nodes. Higher priority for larger node
 * @param {TreeNode} node1 - first node to compare
 * @param {TreeNode} node2 - second node to compare
 * @return {boolean} - whether node1 has higher priority than node2 
 */
export function maxComparator(node1, node2) {
    if (node1.name > node2.name) {
        return true;
    }
    return false;
}