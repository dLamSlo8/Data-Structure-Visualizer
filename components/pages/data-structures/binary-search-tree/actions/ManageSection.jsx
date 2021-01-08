import { useState } from 'react';
import PropTypes from 'prop-types';

import XCircleIcon from '@icons/x-circle.svg';
import CheckCircleIcon from '@icons/check-circle.svg';

import Form from '@components/forms/Form';
import FormInput from '@components/forms/FormInput';
import Button from '@components/Button';

import BinarySearchTree from '@classes/binary-search-tree';
import ControlSection from '@components/animations/controls/ControlSection';


function ManageSection({tree, handleInsert, handleFind, handleDelete, isAnimatingMode }) {
    const [insertAnimationsOff, setInsertAnimationsOff] = useState(false);
    const [deleteAnimationsOff, setDeleteAnimationsOff] = useState(false);
    const [findAnimationsOff, setFindAnimationsOff] = useState(false);

    return (
        <div className="relative">
            {/* form input and button for inserting a TreeNode*/}
            <Form
            initValues={{insert: ''}}
            handleSuccess={(formData) => formData.insert && handleInsert(formData.insert, insertAnimationsOff)}>
                {
                    ({ formData, handleChange, errorMapping }) => (
                        <>
                            <div className="relative flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3">
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
                                type="button"
                                btnStyle={insertAnimationsOff ? 'light-primary' : 'warning'}
                                rootClass="absolute top-0 right-0 py-1 pb-0 px-2 text-sm"
                                onClick={() => setInsertAnimationsOff((insertAnimationsOff) => !insertAnimationsOff)}>
                                    <span className="inline-flex items-center space-x-2">
                                        {
                                            insertAnimationsOff ? <CheckCircleIcon /> : <XCircleIcon />
                                        }
                                        <span>Turn {insertAnimationsOff ? 'on' : 'off'} animations</span>
                                    </span>
                                </Button>
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
            handleSuccess={(formData) => formData.delete && handleDelete(formData.delete, deleteAnimationsOff)}
            rootClass="mt-5">
                {
                    ({ formData, handleChange, errorMapping }) => (
                            <div className="relative flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3">
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
                                type="button"
                                btnStyle={deleteAnimationsOff ? 'light-primary' : 'warning'}
                                rootClass="absolute top-0 right-0 py-1 pb-0 px-2 text-sm"
                                onClick={() => setDeleteAnimationsOff((deleteAnimationsOff) => !deleteAnimationsOff)}>
                                    <span className="inline-flex items-center space-x-2">
                                        {
                                            deleteAnimationsOff ? <CheckCircleIcon /> : <XCircleIcon />
                                        }
                                        <span>Turn {deleteAnimationsOff ? 'on' : 'off'} animations</span>
                                    </span>
                                </Button>
                                <Button
                                btnStyle={formData.delete ? 'primary' : 'disabled'}
                                rootClass="w-full lg:self-end">Delete</Button>
                            </div>
                    )
                }
            </Form>
            
            {/* form input and button for finding a TreeNode*/}
            <Form
            initValues={{find: ''}}
            handleSuccess={(formData) => formData.find && handleFind(formData.find, findAnimationsOff)}
            rootClass="my-5">
                {
                    ({ formData, handleChange, errorMapping }) => (
                        <>
                            <div className="relative flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3">
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
                                type="button"
                                btnStyle={findAnimationsOff ? 'light-primary' : 'warning'}
                                rootClass="absolute top-0 right-0 py-1 pb-0 px-2 text-sm"
                                onClick={() => setFindAnimationsOff((findAnimationsOff) => !findAnimationsOff)}>
                                    <span className="inline-flex items-center space-x-2">
                                        {
                                            findAnimationsOff ? <CheckCircleIcon /> : <XCircleIcon />
                                        }
                                        <span>Turn {findAnimationsOff ? 'on' : 'off'} animations</span>
                                    </span>
                                </Button>
                                <Button
                                btnStyle={formData.find ? 'primary' : 'disabled'}
                                rootClass="w-full lg:self-end">Find</Button>
                            </div>
                        </>
                    )
                }
            </Form>
            {
                isAnimatingMode && (
                    <div className="absolute top-full mt-3 w-full">
                        <ControlSection />
                    </div>
                )
            }
        </div>
    )
}

ManageSection.propTypes = {
    tree: PropTypes.instanceOf(BinarySearchTree),
    handleInsert: PropTypes.func.isRequired, // Callback for inserting node
    handleFind: PropTypes.func.isRequired, // Callback for finding node
    handleDelete: PropTypes.func.isRequired // Callback for deleting node
};


export default ManageSection;