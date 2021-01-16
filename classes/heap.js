import TreeNode, { NullTreeNode } from "./tree-node.js";
import Edge from "./edge.js";


/**
 * Binary Heap. Root node of tree structure is highest priority.
 * @property {function} comparator - function used to determine heap priority
 * @property {Array} elements - array of TreeNodes in heap
 * @property {Map} uuidToNodeMap - map of uuid to nodes in tree
 */
export default class Heap {
    /**
     * 
     * @param {TreeNode} root - root node of heap
     * @param {string} [mode = null] - (optional) "min" or "max" heap
     * @param {function} [comparator = null] - (optional) function used to determine heap priority
     * @param {Heap} [heap = null]- heap to make a copy of
     */
    constructor(root, mode, comparator, heap) {
        // copy constructor
        if (heap) {
            this.elements = heap.elements;
            this.comparator = heap.comparator;
            this.isMin = heap.isMin;
            this.uuidToNodeMap = heap.uuidToNodeMap;
        }
        else {
            this.elements = [];
            this.uuidToNodeMap = {};

            if (root !== null && root !== undefined) {
                let idx = 0;
                this.elements = [root];
                this.uuidToNodeMap[root.uuid] = root;
                // make !sure heap is com.isNull()
                // go through level order
                while (idx < this.elements.length) {
                    let curr = this.elements[idx];
                    // add index field into node
                    this.elements[idx].idx = idx;
                    if (curr.children) {
                        this.elements.push(curr.children[0]);
                        this.uuidToNodeMap[curr.children[0].uuid] = curr.children[0];
                        if (!curr.children[1].isNull()) {
                            this.uuidToNodeMap[curr.children[1].uuid] = curr.children[1];
                            this.elements.push(curr.children[1]);
                        }
                    }
                    idx += 1;
                }
            }

            if ((mode === "min" || mode === undefined || mode === null) && (comparator === undefined || comparator === null)) {
                this.comparator = minComparator;
                this.isMin = true;
            }
            else if (mode === "max") {
                this.comparator = maxComparator;
                this.isMin = false;
            }
            else {
                this.comparator = comparator;
            }

        } 
        
    }

    /**
     * Removes top element from heap and moves elements to maintain heap
     * property
     * @return {Array} - Array of priority TreeNode and moves taken to remove
     */
    remove() {
        if (this.elements.length === 0) {
            throw ("Please insert a node into the tree!");
        }

        // priority element
        let priorityNode = this.elements[0];

        let lastElement = this.elements.pop();

        // removes the node from uuidToNodeMap
        let uuidNode = priorityNode.uuid;
        delete this.uuidToNodeMap.uuidNode;

        // if root has no children, only one element in heap, so root should be empty
        if (priorityNode.children === null) {
            priorityNode.edges = [null, null];
            return [priorityNode, [[], []]];
        }        

        // reassign lastElement to root and set its children
        this.elements[0] = lastElement;
        
        // set idx to end
        lastElement.idx = 0;

        // keep check of how many null children there are
        let nullCount = 0;

        // make sure original top was not parent of last element
        for (let i = 0; i < priorityNode.children.length; i++) {
            if (priorityNode.children[i] === lastElement) {
                priorityNode.children[i] = NullTreeNode;
            }
            if (priorityNode.children[i].isNull()) {
                nullCount += 1;
            }
        }

        // if both children are null, then set children to null
        lastElement.children = nullCount === 2 ? null: priorityNode.children;

        // update edges of new root
        if (lastElement.children !== null) {
            lastElement.edges[0] = lastElement.children[0].isNull() ? null : new Edge(lastElement.uuid + "l");
            lastElement.edges[1] = lastElement.children[1].isNull() ? null : new Edge(lastElement.uuid + "r");
        }
        else{
            lastElement.edges = [null, null];
        }
    

        // update parent of last element to be nothing
        // get parent of length since elements has one less element because we removed,
        // so length should have been index where last element used to be
        let parent = this.elements[this.parentIndex(this.elements.length)];

        // make sure parent no longer points to last element since last element
        // is now root node
        this.clearParentChildren(parent, lastElement);

        let moves = [
            [{"uuid": lastElement.uuid}],
            [this.elements.length]
        ];
        this.bubbleDown(0, moves);

        // empty out children
        priorityNode.children = null;

        // removed node shouldn't have edges anymore
        priorityNode.edges = [null, null];
        return [priorityNode, moves];
    }

    /**
     * Moves node down to maintain heap property after removal
     * @param {int} index - index of node we are visiting
     * @param {Array} moves - array to store moves we took
     */
    bubbleDown(index, moves) {
        // console.log(this.elements);
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
                moves[0].push({"uuid": this.elements[index].uuid});
                moves[1].push(greaterIdx);
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
     * @return {Array} - uuid of steps that we took
     */
    insert(value, uuid) {
        // need to discuss for insert if we want to show how we reached last element

        let newNode = new TreeNode(value, uuid);
        newNode.idx = this.elements.length;

        // add new node to end
        this.elements.push(newNode);
        this.uuidToNodeMap[newNode.uuid] = newNode;


        this.updateParentChildren(this.elements.length - 1);

        // right now moves array is only updated from bubble up operation
        let moves = [[], []];

        this.bubbleUp(this.elements.length - 1, moves);
        return moves;
    }

    /**
     * Moves node up to maintain heap property after insertion
     * @param {int} index - index of node we are visiting
     * @param {Array} moves - array to store moves we took
     */
    bubbleUp(index, moves) {
        // no more up to go
        if (index <= 0) {
            return;
        }

        let parentIdx = this.parentIndex(index);

        // if this node has more priority than its parent, bubble up
        if (this.comparator(this.elements[index], this.elements[parentIdx])) {
            // update moves
            moves[0].push({"uuid": this.elements[parentIdx].uuid});
            moves[1].push(this.elements[parentIdx].idx);
            // swap then see if we can bubble up still
            this.swap(parentIdx, index);
            this.bubbleUp(parentIdx, moves);
        }
        else {
            return;
        }
    }

    /**
     * Gets the highest priority element
     * @return {TreeNode} - highest priority node
     */
    top() {
        if (this.elements.length === 0) {
            throw ("Please insert a node into the tree!");
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

        // swap edges
        [this.elements[idx1].edges, this.elements[idx2].edges] = [this.elements[idx2].edges, this.elements[idx1].edges];

        // update uuid of edges
        this.elements[idx1].edges[0] = this.elements[idx1].edges[0] === null ? null : new Edge(this.elements[idx1].uuid + "l");
        this.elements[idx1].edges[1] = this.elements[idx1].edges[1] === null ? null : new Edge(this.elements[idx1].uuid + "r");

        this.elements[idx2].edges[0] = this.elements[idx2].edges[0] === null ? null : new Edge(this.elements[idx2].uuid + "l");
        this.elements[idx2].edges[1] = this.elements[idx2].edges[1] === null ? null : new Edge(this.elements[idx2].uuid + "r");

        // update
        this.elements[idx1].children = childrenForParent;
        this.elements[idx2].children = childrenForChild;
        
        // update parents child
        this.updateParentChildren(idx1);

        // update idx of node's position after swap
        this.elements[idx1].idx = idx1;
        this.elements[idx2].idx = idx2;
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
    clearParentChildren(parent, child){
        if (parent.children === null) {
            return;
        }
        let nullCount = 0;
        for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i] === child) {
                parent.edges[i] = null;
                parent.children[i] = NullTreeNode;
            }
            if (parent.children[i].isNull()) {
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
    return (node1.name < node2.name);
}

/**
 * Determines priority between two nodes. Higher priority for larger node
 * @param {TreeNode} node1 - first node to compare
 * @param {TreeNode} node2 - second node to compare
 * @return {boolean} - whether node1 has higher priority than node2 
 */
export function maxComparator(node1, node2) {
    return (node1.name > node2.name);
}

/**
 * Updates index in level-order fashion of root node. Use only for testing
 * @param {TreeNode} node - root node of structure
 */
export function updateIdx(node) {
    let idx = 0;
    let q = [];
    q.push(node);
    while (q.length > 0) {
        let curr = q.shift();
        curr.idx = idx;
        idx++;
        
        if (curr.children) {
            if (!curr.children[0].isNull()) {
                q.push(curr.children[0]);
            }

            if (!curr.children[1].isNull()) {
                q.push(curr.children[1]);
            }
        }
    }
}