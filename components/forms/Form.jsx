import { useEffect } from 'react';
import PropTypes from 'prop-types';

import useForm from '../../hooks/useForm';

// Responsibility: Handles rendering a form and passing appropriate data to let the children implement UI.
function Form({ initValues, validationRules, handleSuccess, rootClass, children: formContent }) {
    const { formData, setFormData, handleChange, errorMapping, handleSubmit } = useForm({
        initValues,
        validationRules
    });

    /**
     * Effect
     * If new initial values are passed in, 
     * update the form data accordingly.
     */
    useEffect(() => {
        setFormData({ ...initValues });
    }, [initValues]);

    return (
        <form className={rootClass ?? ''} onSubmit={(e) => handleSubmit(e, () => handleSuccess(formData))}>
            {
                formContent({ formData, handleChange, errorMapping, handleSubmit })
            }
        </form>
    )
}

Form.propTypes = {
    initValues: PropTypes.object.isRequired, // Initial form values 
    validationRules: PropTypes.object, /** Validation rules in the following form:
                                        *  {
                                                inputName: [{
                                                    test: (value) => <bool>,
                                                    error: "<error msg>"
                                                }, ...],
                                                ...
                                            }
                                        */
    handleSuccess: PropTypes.func.isRequired, // Callback for when form is successfully submitted/validated
    rootClass: PropTypes.string, // Custom styling for form element
    children: PropTypes.func.isRequired // Form children (this is where the inputs and submit button go)
}; 

export default Form;