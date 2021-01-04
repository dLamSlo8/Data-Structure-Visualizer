import {useState} from 'react';
import PropTypes from 'prop-types';

import Form from '@components/forms/Form';
import FormInput from '@components/forms/FormInput';
import Button from '@components/Button';

import BinarySearchTree from '@classes/binary-search-tree';


function ManageSection({tree, handleInsert, handleFind, handleDelete}) {

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
            
            {/* form input and button for deleting a TreeNode*/}
            <Form
            initValues={{delete: ''}}
            handleSuccess={(formData) => formData.delete && handleDelete(formData.delete)}>
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
                                rootClass="w-full lg:self-end">Delete</Button>
                            </div>
                        </>
                    )
                }
            </Form>
            
            {/* form input and button for finding a TreeNode*/}
            <Form
            initValues={{find: ''}}
            handleSuccess={(formData) => formData.find && handleFind(formData.find)}>
                {
                    ({ formData, handleChange, errorMapping }) => (
                        <>
                            <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3">
                                <FormInput 
                                label="Find a Node"
                                error={errorMapping.find}
                                inputProps={{
                                    type: 'number',
                                    name: 'find',
                                    value: formData.find,
                                    onChange: handleChange,
                                }} 
                                rootClass="min-w-0 w-full" />
                                <Button
                                btnStyle={formData.find ? 'primary' : 'disabled'}
                                rootClass="w-full lg:self-end">Find</Button>
                            </div>
                        </>
                    )
                }
            </Form>

        </>
    )
}

ManageSection.propTypes = {
    tree: PropTypes.instanceOf(BinarySearchTree),
    handleInsert: PropTypes.func.isRequired, // Callback for inserting node
    handleFind: PropTypes.func.isRequired, // Callback for finding node
    handleDelete: PropTypes.func.isRequired // Callback for deleting node
};


export default ManageSection;