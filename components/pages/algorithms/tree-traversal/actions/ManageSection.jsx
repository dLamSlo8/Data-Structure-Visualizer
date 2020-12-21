import { useMemo } from 'react';
import PropTypes from 'prop-types';

import Form from '@components/forms/Form';
import FormInput from '@components/forms/FormInput';
import Button from '@components/Button';

// Responsibility: Render and handle form data. Doesn't care about the parent. Just calls the callbacks. Remember, Actions will handle data.
function ManageSection({ activeNode, handleUpdateValue, handleAddLeft, handleAddRight, handleDeleteNode }) {    
    const currentFormValue = useMemo(() => (activeNode ? {
        current: `${activeNode.current}`,
    } : null), [activeNode]);

    return (
        activeNode ? (
            <>
                <Form
                initValues={currentFormValue}
                handleSuccess={(formData) => formData.current && handleUpdateValue(formData.current)}>
                    {
                        ({ formData, handleChange, errorMapping }) => (
                            <>
                                <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3">
                                    <FormInput 
                                    label="Current Value"
                                    error={errorMapping.current}
                                    inputProps={{
                                        type: 'number',
                                        name: 'current',
                                        value: formData.current,
                                        onChange: handleChange,
                                    }} 
                                    rootClass="min-w-0 w-full" />
                                    <Button
                                    btnStyle={formData.current ? 'primary' : 'disabled'}
                                    rootClass="w-full lg:self-end">Update Value</Button>
                                </div>
                            </>
                        )
                    }
                </Form>
                {
                    !activeNode.left && (
                        <Form
                        initValues={{left: ''}}
                        handleSuccess={(formData) => formData.left && handleAddLeft(formData.left)}>
                            {
                                ({ formData, handleChange, errorMapping}) => (
                                    <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3 mt-3">
                                        <FormInput 
                                        label="Left Value"
                                        error={errorMapping.left}
                                        inputProps={{
                                            type: 'number',
                                            name: 'left',
                                            value: formData.left,
                                            onChange: handleChange,
                                        }} 
                                        rootClass="min-w-0 w-full" />
                                        <Button
                                        btnStyle={formData.left ? 'primary' : 'disabled'}
                                        rootClass="w-full lg:self-end">Add Left Value</Button>
                                    </div>
                                )
                            }
                        </Form>
                    )
                }
                {
                    !activeNode.right && (
                        <Form
                        initValues={{right: ''}}
                        handleSuccess={(formData) => formData.right && handleAddRight(formData.right)}>
                            {
                                ({ formData, handleChange, errorMapping }) => (
                                    <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3 mt-3">
                                    <FormInput 
                                    label="Right Value"
                                    error={errorMapping.right}
                                    inputProps={{
                                        type: 'number',
                                        name: 'right',
                                        value: formData.right,
                                        onChange: handleChange,
                                    }} 
                                    rootClass="min-w-0 w-full" />
                                    <Button 
                                    btnStyle={formData.right ? 'primary' : 'disabled'}
                                    rootClass="w-full lg:self-end">Add Right Value</Button>
                                </div>
                                )
                            }
                        </Form>
                    )
                }
                <Button
                type="button"
                btnStyle="warning"
                rootClass="mt-5 w-full"
                onClick={() => handleDeleteNode()}>Delete Current Node</Button>
            </>
        ) : (
            <div className="mt-8">
                <h4 className="font-semibold text-xl text-primary">No Active Node!</h4>
                <p className="font-semibold text-gray-500">Select a node from the tree to modify it.</p>
            </div>
        )
        
    )
}

ManageSection.propTypes = {
    activeNode: PropTypes.exact({
        uuid: PropTypes.string.isRequired,
        current: PropTypes.number.isRequired,
        left: PropTypes.number,
        right: PropTypes.number
    }),
    handleUpdateValue: PropTypes.func.isRequired,
    handleAddLeft: PropTypes.func.isRequired,
    handleAddRight: PropTypes.func.isRequired,
    handleDeleteNode: PropTypes.func.isRequired
};

export default ManageSection;