import {useState} from 'react';
import PropTypes from 'prop-types';

import Form from '@components/forms/Form';
import FormInput from '@components/forms/FormInput';
import Button from '@components/Button';

import Heap from '@classes/heap';

function ManageSection({heap, handleInsert, handleDelete}) {

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
            
            {/* form input and button for deleting a TreeNode, shouldn't need form input to remove.*/}
            <Form
            initValues={{delete: ''}}
            handleSuccess={(formData) => formData.delete && handleDelete()}>
                {
                    ({ formData, handleChange, errorMapping }) => (
                        <>
                            <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3">
                                <FormInput 
                                label="Delete a Node"
                                error={errorMapping.delete}
                                inputProps={{
                                    type: 'number',
                                    name: 'delete',
                                    value: formData.delete,
                                    onChange: handleChange,
                                }} 
                                rootClass="min-w-0 w-full" />
                                <Button
                                btnStyle={formData.delete ? 'primary' : 'disabled'}
                                rootClass="w-full lg:self-end">Remove</Button>
                            </div>
                        </>
                    )
                }
            </Form>
        </>
    )
}

ManageSection.propTypes = {
    heap: PropTypes.instanceOf(Heap),
    handleInsert: PropTypes.func.isRequired, // Callback for inserting node
    handleDelete: PropTypes.func.isRequired // Callback for deleting node
};


export default ManageSection;