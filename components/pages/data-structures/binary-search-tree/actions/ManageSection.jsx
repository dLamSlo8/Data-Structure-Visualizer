import {useState} from "react";
import PropTypes from 'prop-types';

import Form from '@components/forms/Form';
import FormInput from '@components/forms/FormInput';
import Button from '@components/Button';


function ManageSection({tree, handleInsert, handleFind, handleDelete}) {
    const [insertInput, setInsertInput] = useState("");
    const [findInput, setFindInput] = useState("");
    const [deleteInput, setDeleteInput] = useState("");

    return (
        <>
            {/* form input and button for inserting a TreeNode*/}
            <Form
            handleSuccess={(formData) => formData.insert && handleInsert(formData.insert)}>
                {
                    ({ formData, handleChange, errorMapping }) => (
                        <>
                            <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3">
                                <FormInput 
                                label="Insert Value"
                                error={errorMapping.current}
                                inputProps={{
                                    type: 'number',
                                    name: 'insert',
                                    value: formData.insert,
                                    onChange: handleChange,
                                }} 
                                rootClass="min-w-0 w-full" />
                                <Button
                                btnStyle={formData.current ? 'primary' : 'disabled'}
                                rootClass="w-full lg:self-end">Insert</Button>
                            </div>
                        </>
                    )
                }
            </Form>

            {/* form input and button for finding a TreeNode */}
            <Form>

            </Form>

            {/* form input and button for deleting a TreeNode */}
            <Form>

            </Form>
        </>
    )
}

ManageSection.propTypes = {
    // tree: not sure what should be tree because it a BinarySearchTree which is our own data type
    handleInsert: PropTypes.func.isRequired, // Callback for inserting node
    handleFind: PropTypes.func.isRequired, // Callback for finding node
    handleDelete: PropTypes.func.isRequired // Callback for deleting node
};


export default ManageSection;