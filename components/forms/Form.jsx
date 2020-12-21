import { useEffect } from 'react';
import PropTypes from 'prop-types';

import useForm from '../../hooks/useForm';

// Responsibility: Handles rendering a form and passing appropriate data to let the child implement UI.
function Form({ initValues, validationRules, handleSuccess, children: formContent }) {
    const { formData, setFormData, handleChange, errorMapping, handleSubmit } = useForm({
        initValues,
        validationRules
    });

    useEffect(() => {
        setFormData({ ...initValues });
    }, [initValues]);

    return (
        <form onSubmit={(e) => handleSubmit(e, () => handleSuccess(formData))}>
            {
                formContent({ formData, handleChange, errorMapping, handleSubmit })
            }
        </form>
    )
}

Form.propTypes = {
    initValues: PropTypes.object.isRequired,
    validationRules: PropTypes.object,
    handleSuccess: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default Form;