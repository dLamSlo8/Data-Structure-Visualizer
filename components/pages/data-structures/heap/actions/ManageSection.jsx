import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Form from '@components/forms/Form';
import FormInput from '@components/forms/FormInput';
import Button from '@components/Button';

import Heap from '@classes/heap';

function ManageSection({heap, setHeap, handleInsert, handleDelete}) {
    const [isMin, setIsMin] = useState(heap.isMin);

    const toggleHeap = () => {
        setIsMin((isMin) => !isMin);
    }

    useEffect(() =>{
       setHeap(new Heap(null, isMin ? "min": "max"));
    }, [isMin])


    return (
        <>
            {/* form input and button for inserting a TreeNode*/}
            <Form
            initValues={{insert: ''}}
            handleSuccess={(formData) => formData.insert && handleInsert(formData.insert)}>
                {
                    ({ formData, handleChange, errorMapping }) => (
                        <>
                            <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3">
                                <FormInput 
                                label="Insert a Node"
                                error={errorMapping.insert}
                                inputProps={{
                                    type: 'number',
                                    name: 'insert',
                                    value: formData.insert,
                                    onChange: handleChange,
                                }} 
                                rootClass="min-w-0 w-full" />
                                <Button
                                btnStyle={formData.insert ? 'primary' : 'disabled'}
                                rootClass="w-full lg:self-end">Insert</Button>
                            </div>
                        </>
                    )
                }
            </Form>
            
            <Button
            onClick={handleDelete}
            btnStyle={ heap.elements.length === 0 ? 'disabled':'primary'}
            rootClass="w-full lg:self-end">Remove</Button>

            <Button
            onClick={toggleHeap}
            btnStyle='primary'
            rootClass="w-full lg:self-end">Convert to {isMin ? "Max" : "Min"}</Button>

        </>
    )
}

ManageSection.propTypes = {
    heap: PropTypes.instanceOf(Heap),
    handleInsert: PropTypes.func.isRequired, // Callback for inserting node
    handleDelete: PropTypes.func.isRequired // Callback for deleting node
};


export default ManageSection;