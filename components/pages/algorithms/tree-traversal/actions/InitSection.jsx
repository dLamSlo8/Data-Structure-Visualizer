import PropTypes from 'prop-types';

import Form from '@components/forms/Form';
import FormInput from '@components/forms/FormInput';
import Button from '@components/Button';

// Responsibility: Render and handle initialization form data. 
function InitSection({ handleInit }) {
    return (
        <Form
        initValues={{ rootValue: '' }}
        handleSuccess={(formData) => formData.rootValue && handleInit(formData.rootValue)}>
            {
                ({ formData, handleChange, errorMapping }) => (
                    <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3">
                        <FormInput 
                        label="Root Node"
                        error={errorMapping.rootValue}
                        inputProps={{
                            type: "number",
                            name: "rootValue",
                            value: formData.rootValue,
                            onChange: handleChange
                        }} 
                        rootClass="w-full min-w-0" />
                        <Button
                        btnStyle={formData.rootValue ? 'primary' : 'disabled'}
                        rootClass="w-full lg:self-end">Initialize Tree</Button>
                    </div>
                )
            }

        </Form>
    )
}

InitSection.propTypes = {
    handleInit: PropTypes.func.isRequired // Callback for initializing tree with current node value
};

export default InitSection;