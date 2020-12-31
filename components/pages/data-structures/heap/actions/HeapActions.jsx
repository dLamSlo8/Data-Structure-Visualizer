import PropTypes from 'prop-types';

import ActionSubsection from '@components/ActionSubsection';

// reuse initsection from tree traversal
import InitSection from '@components/pages/algorithms/tree-traversal/actions/InitSection';
import ManageSection from './ManageSection';

import Heap from '@classes/heap';
import TreeNode from '@classes/tree-node';



/**
 * @param {Heap} heap- Heap 
 * @param {function} setHeap - function to set Heap
 */
function HeapActions({heap, setHeap}){

    /**
     * Initialize Heap
     * @param {number} value - Value to initialize heap with
     */
    const handleInit = (value) => {
        let heap = new Heap(new TreeNode(parseInt(value)));
        setHeap(heap);
    }

    /**
     * Inserts a new node into the heap. Makes copy of heap and sets heap to 
     * new copy.
     * @param {int} value - The value of the heapNode to delete 
     * @return {Array} - an Array of uuid of nodes taken to get to specified TreeNode
     */
    const handleInsert = (value) => {
        value = parseInt(value);
        let moves = heap.insert(value);
        setHeap(new Heap(null, null, null, heap));
        return moves;
    }

    /**
     * Deletes the first TreeNode of the heap
     */
    const handleDelete = () => {
        // store moves as local var not sure what next
        let moves = heap.remove();
        setHeap(new Heap(null, null, null, heap));
        return moves;
    }

    return (
        <>
            <ActionSubsection
            sectionTitle="Manage Tree"
            sectionDescription="Here you can create and delete tree nodes of a Heap"
            propagateCollapsed>
                {
                    ({ collapsed }) => (
                        <ManageSection
                        heap = {heap}
                        handleInsert={handleInsert}
                        handleDelete={handleDelete} />
                        
                    )
                }
            </ActionSubsection>
        </>
    )
    
}

HeapActions.propTypes = {
  heap: PropTypes.instanceOf(Heap),
  setHeap: PropTypes.func.isRequired
};

export default HeapActions;