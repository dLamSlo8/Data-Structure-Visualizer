import useForm, { ValidationTypes } from '../../../../hooks/useForm';

import FormInput from '../../../forms/FormInput';

export default function BinarysearchTreeForm() {
    const formValidationRules = {
        binarysearchInput: [ValidationTypes.required]
    };

    const { formData, handleChange, errorMapping, handleSubmit } = useForm({
        initValues: {
            binarysearchInput: ''
        },
        validationRules: formValidationRules
    });

    const handleSubmitSuccess = () => {
        console.log(formData.binarysearchInput);
    } 

    
    return (
        <form className="mt-5" onSubmit={(e) => handleSubmit(e, handleSubmitSuccess)}>
            <FormInput 
            label="Binarysearch Input"
            error={errorMapping.binarysearchInput}
            inputProps={{
                name: 'binarysearchInput',
                type: 'text',
                value: formData.binarysearchInput,
                onChange: handleChange
            }} />
            <button type="submit" className="btn btn--primary w-full mt-10">Visualize Tree</button>
        </form>
    )
}