import { useEffect } from 'react';

import useForm from '../../hooks/useForm';

// Responsibility: Handles rendering a form and passing appropriate data to let the child implement UI.
export default function Form({ initValues, validationRules, children, handleSuccess }) {
    const { formData, setFormData, handleChange, errorMapping, handleSubmit } = useForm({
        initValues,
        validationRules
    });

    useEffect(() => {
        console.log('updating initValues');
        setFormData({ ...initValues });
    }, [initValues]);

    return (
        <form onSubmit={(e) => handleSubmit(e, () => handleSuccess(formData))}>
            {
                children({ formData, handleChange, errorMapping, handleSubmit })
            }
        </form>
    )
}